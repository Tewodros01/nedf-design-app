"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import ProductCard from "@/components/common/ProductCard";
import Filters from "@/components/shop-page/filters";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, SlidersHorizontal } from "lucide-react";
import { fetchAllProductsClient } from "@/lib/supabase-queries";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import type { Product } from "@/types/product.types";

const ITEMS_PER_PAGE = 6;

const categoriesData = [
  { title: "New Arrivals", slug: "new-arrivals" },
  { title: "Men", slug: "men" },
  { title: "Women", slug: "women" },
  { title: "Kids", slug: "kids" },
  { title: "T-shirts", slug: "t-shirts" },
  { title: "Shorts", slug: "shorts" },
  { title: "Shirts", slug: "shirts" },
  { title: "Hoodie", slug: "hoodie" },
  { title: "Jeans", slug: "jeans" },
];

const dressStylesData = [
  { title: "Casual", slug: "casual" },
  { title: "Formal", slug: "formal" },
  { title: "Party", slug: "party" },
  { title: "Gym", slug: "gym" },
];

// Map category slugs to tag-based or flag-based filters
const categoryFilterMap: Record<string, (p: Product) => boolean> = {
  "new-arrivals": (p) => p.title.toLowerCase().includes("t-shirt") || p.title.toLowerCase().includes("jeans") || p.title.toLowerCase().includes("shirt"),
  men: () => true,
  women: () => true,
  kids: () => true,
  "t-shirts": (p) => p.title.toLowerCase().includes("t-shirt"),
  shorts: (p) => p.title.toLowerCase().includes("shorts"),
  shirts: (p) => p.title.toLowerCase().includes("shirt") && !p.title.toLowerCase().includes("t-shirt"),
  hoodie: () => false,
  jeans: (p) => p.title.toLowerCase().includes("jeans"),
};

function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const activeCategory = searchParams.get("category") || "";
  const activeStyle = searchParams.get("style") || "";
  const currentPage = Math.max(1, Number(searchParams.get("page")) || 1);
  const sortBy = searchParams.get("sort") || "most-popular";
  const activeFilter = activeCategory || activeStyle;

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Fetch all products from Supabase on mount
  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchAllProductsClient();
      // Remove duplicates by id
      const unique = products.filter(
        (p, i, self) => i === self.findIndex((x) => x.id === p.id)
      );
      setAllProducts(unique);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const SORT_OPTIONS = [
    { value: "most-popular", label: t("mostPopular") },
    { value: "low-price", label: t("lowPrice") },
    { value: "high-price", label: t("highPrice") },
  ] as const;

// Map style slugs to title-based filters
const styleFilterMap: Record<string, (p: Product) => boolean> = {
  casual: (p) =>
    ["T-shirt with Tape Details", "Loose Fit Bermuda Shorts", "Sleeve Striped T-shirt"].includes(p.title),
  formal: (p) =>
    [
      "Vertical Striped Shirt",
      "Chechered Shirt",
      "Polo with Contrast Trims",
      "Polo with Tipping Details",
    ].includes(p.title),
  party: (p) =>
    ["Gradient Graphic T-shirt", "Black Striped T-shirt"].includes(p.title),
  gym: (p) =>
    ["Courage Graphic T-shirt", "Skinny Fit Jeans"].includes(p.title),
};

  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Filter by category
    if (activeCategory && categoryFilterMap[activeCategory]) {
      products = products.filter(categoryFilterMap[activeCategory]);
    }

    // Filter by dress style
    if (activeStyle && styleFilterMap[activeStyle]) {
      products = products.filter(styleFilterMap[activeStyle]);
    }

    // Filter by price
    products = products.filter((p) => {
      const effectivePrice =
        p.discount.percentage > 0
          ? Math.round(p.price - (p.price * p.discount.percentage) / 100)
          : p.discount.amount > 0
            ? p.price - p.discount.amount
            : p.price;
      return effectivePrice >= priceRange[0] && effectivePrice <= priceRange[1];
    });

    // Sort
    switch (sortBy) {
      case "low-price":
        products.sort((a, b) => a.price - b.price);
        break;
      case "high-price":
        products.sort((a, b) => b.price - a.price);
        break;
      case "most-popular":
      default:
        products.sort((a, b) => b.rating - a.rating);
        break;
    }

    return products;
  }, [activeCategory, activeStyle, allProducts, sortBy, priceRange]);

  if (loading) {
    return (
      <main className="pb-20">
        <div className="max-w-frame mx-auto px-4 sm:px-6 xl:px-0">
          <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
          <BreadcrumbShop />
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-black/40" />
          </div>
        </div>
      </main>
    );
  }

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  const updateURL = (params: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    router.push(`/shop${newParams.toString() ? `?${newParams.toString()}` : ""}`, { scroll: false });
  };

  const handleCategoryClick = (category: string) => {
    updateURL({ category, style: "", page: "1" });
  };

  const handleStyleClick = (style: string) => {
    updateURL({ style, category: "", page: "1" });
  };

  const handlePageChange = (page: number) => {
    updateURL({ page: page > 1 ? String(page) : "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (value: string) => {
    updateURL({ sort: value !== "most-popular" ? value : "", page: "1" });
  };

  const clearFilters = () => {
    router.push("/shop", { scroll: false });
    setPriceRange([0, 250]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const headerTitle = activeCategory
    ? categoriesData.find((c) => c.slug.includes(activeCategory))?.title || t("shop")
    : activeStyle
      ? dressStylesData.find((s) => s.slug.includes(activeStyle))?.title || t("shop")
      : t("allProducts");

  // Generate pagination items
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safePage > 3) pages.push("...");
      for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) {
        pages.push(i);
      }
      if (safePage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const startItem = (safePage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(safePage * ITEMS_PER_PAGE, filteredProducts.length);

  return (
    <>
      <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 sm:px-6 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex flex-col md:flex-row md:gap-5 items-start">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-full md:w-[240px] lg:w-[280px] shrink-0 border border-black/10 rounded-[20px] px-4 md:px-5 py-4 space-y-4 md:space-y-5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">{t("filters")}</span>
              <SlidersHorizontal className="text-2xl text-black/40" />
            </div>
            <Filters
              activeCategory={activeCategory}
              activeStyle={activeStyle}
              onCategoryClick={handleCategoryClick}
              onStyleClick={handleStyleClick}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onClearFilters={clearFilters}
              hasActiveFilters={!!activeFilter}
            />
          </div>

          {/* Main Content */}
          <div className="flex flex-col w-full space-y-4 sm:space-y-5">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-xl sm:text-2xl md:text-[32px] capitalize">
                  {headerTitle}
                </h1>
                <MobileFilters>
                  <Filters
                    activeCategory={activeCategory}
                    activeStyle={activeStyle}
                    onCategoryClick={handleCategoryClick}
                    onStyleClick={handleStyleClick}
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    onClearFilters={clearFilters}
                    hasActiveFilters={!!activeFilter}
                  />
                </MobileFilters>
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-0">
                <span className="text-xs sm:text-sm md:text-base text-black/60 mr-0 xs:mr-3">
                  {t("showing")} {startItem}-{endItem} {t("of")} {filteredProducts.length} {t("products")}
                </span>
                <div className="flex items-center">
                  {t("sortBy")}:{" "}
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="font-medium text-xs sm:text-sm px-1 sm:px-1.5 md:text-base w-fit text-black bg-transparent shadow-none border-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Active Filter Tags */}
            {activeFilter && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm text-black/60">{t("activeFilters")}</span>
                {activeCategory && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/5 rounded-full text-xs sm:text-sm">
                    {categoriesData.find((c) => c.slug.includes(activeCategory))?.title}
                    <button onClick={clearFilters} className="ml-1 hover:text-black" aria-label={t("removeFilter")}>
                      ×
                    </button>
                  </span>
                )}
                {activeStyle && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-black/5 rounded-full text-xs sm:text-sm">
                    {dressStylesData.find((s) => s.slug.includes(activeStyle))?.title}
                    <button onClick={clearFilters} className="ml-1 hover:text-black" aria-label={t("removeFilter")}>
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-xs sm:text-sm text-black/40 hover:text-black underline ml-2"
                >
                  {t("clearAll")}
                </button>
              </div>
            )}

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-black/40">
                <p className="text-lg mb-2">{t("noProducts")}</p>
                <p className="text-sm">{t("tryAdjusting")}</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-full text-sm"
                >
                  {t("clearAllFilters")}
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && paginatedProducts.length > 0 && (
              <>
                <hr className="border-t-black/10" />
                <Pagination className="flex flex-col xs:flex-row items-center justify-between gap-4 xs:gap-0">
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (safePage > 1) handlePageChange(safePage - 1);
                    }}
                    className={cn(
                      "border border-black/10 text-sm",
                      safePage <= 1 && "opacity-30 pointer-events-none"
                    )}
                  />
                  <PaginationContent className="flex-wrap justify-center">
                    {getPageNumbers().map((page, idx) =>
                      page === "..." ? (
                        <PaginationItem key={`ellipsis-${idx}`}>
                          <PaginationEllipsis className="text-black/50 font-medium text-sm" />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePageChange(page);
                            }}
                            className={cn(
                              "text-black/50 font-medium text-sm min-w-[32px] sm:min-w-[36px]",
                              safePage === page && "!text-black bg-black/5"
                            )}
                            isActive={safePage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                  </PaginationContent>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (safePage < totalPages) handlePageChange(safePage + 1);
                    }}
                    className={cn(
                      "border border-black/10 text-sm",
                      safePage >= totalPages && "opacity-30 pointer-events-none"
                    )}
                  />
                </Pagination>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-black/40" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
