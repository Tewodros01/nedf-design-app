"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { integralCF } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

type WishlistItem = {
  id: number;
  title: string;
  srcUrl: string;
  price: number;
  discount?: {
    amount: number;
    percentage: number;
  };
};

const WISHLIST_KEY = "nedf_wishlist";

export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
  } catch {
    return [];
  }
}

export function saveWishlist(items: WishlistItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
}

export function addToWishlist(item: WishlistItem) {
  const current = getWishlist();
  if (current.find((i) => i.id === item.id)) return;
  saveWishlist([...current, item]);
}

export function removeFromWishlist(id: number) {
  const current = getWishlist();
  saveWishlist(current.filter((i) => i.id !== id));
}

export default function WishlistPage() {
  const { t } = useLanguage();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(getWishlist());
    setMounted(true);
    const handleStorage = () => setItems(getWishlist());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleRemove = (id: number) => {
    removeFromWishlist(id);
    setItems(getWishlist());
  };

  if (!mounted) {
    return (
      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-frame mx-auto px-4 sm:px-6 pt-5 sm:pt-6">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <nav className="flex items-center text-sm text-black/60 mb-6 sm:mb-8">
          <Link href="/" className="hover:text-black transition-colors">
            {t("home")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-black">{t("wishlist")}</span>
        </nav>
      </div>

      <main className="pb-16 sm:pb-20">
        <div className="max-w-frame mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h1
              className={cn([
                integralCF.className,
                "text-2xl sm:text-3xl font-bold text-black",
              ])}
            >
              {t("wishlist")}
            </h1>
            {items.length > 0 && (
              <span className="text-sm text-black/40">
                {items.length} {items.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>

          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-16 sm:py-24 text-center px-4">
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#F0F0F0] flex items-center justify-center mb-5 sm:mb-6">
                <Heart className="w-8 sm:w-10 h-8 sm:h-10 text-black/20" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-black mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-sm text-black/50 mb-6 sm:mb-8 max-w-xs">
                Save items you love by clicking the heart icon on any product.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-colors"
              >
                <ShoppingBag size={16} />
                Browse Shop
              </Link>
            </div>
          ) : (
            /* Wishlist grid — 2 columns on mobile, 3 on sm, 4 on lg */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
              {items.map((item) => {
                const discountedPrice =
                  item.discount && item.discount.amount > 0
                    ? item.price - item.discount.amount
                    : item.discount && item.discount.percentage > 0
                    ? item.price * (1 - item.discount.percentage / 100)
                    : null;

                return (
                  <div
                    key={item.id}
                    className="bg-[#F0F0F0] rounded-xl sm:rounded-[20px] overflow-hidden group relative"
                  >
                    {/*
                      Remove button:
                      - Always visible on touch devices (no hover required)
                      - On desktop: only shows on group hover
                      We use a combination: visible on mobile, hover-only on md+
                    */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      title="Remove from wishlist"
                      className="absolute top-2.5 right-2.5 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm
                        md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-red-50 active:bg-red-50"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={13} className="text-red-400" />
                    </button>

                    {/* Product image */}
                    <Link href={`/shop/product/${item.id}`} className="block">
                      <div className="aspect-square flex items-center justify-center p-3 sm:p-4">
                        <Image
                          src={item.srcUrl}
                          alt={item.title}
                          width={200}
                          height={200}
                          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>
                    </Link>

                    {/* Product info */}
                    <div className="px-3 pb-3 sm:px-4 sm:pb-4">
                      <Link href={`/shop/product/${item.id}`}>
                        <h3 className="font-medium text-xs sm:text-sm text-black hover:underline line-clamp-2 mb-1.5 leading-snug">
                          {item.title}
                        </h3>
                      </Link>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {discountedPrice !== null ? (
                          <>
                            <span className="font-bold text-xs sm:text-sm text-black">
                              {discountedPrice.toLocaleString()} ETB
                            </span>
                            <span className="text-xs text-black/40 line-through">
                              {item.price.toLocaleString()} ETB
                            </span>
                          </>
                        ) : (
                          <span className="font-bold text-xs sm:text-sm text-black">
                            {item.price.toLocaleString()} ETB
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Continue shopping */}
          {items.length > 0 && (
            <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-black/10">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
              >
                <ArrowLeft size={16} />
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
