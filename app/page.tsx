"use client";

import { useEffect, useState } from "react";
import CollectionList from "@/components/common/CollectionList";
import ProductGridList from "@/components/common/ProductGridList";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import {
  fetchNewArrivalsClient,
  fetchCollectionsClient,
  fetchAllProductsClient,
} from "@/lib/supabase-queries";
import { useLanguage } from "@/lib/LanguageContext";
import { Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/types/product.types";
import type { Collection } from "@/lib/data";

export default function Home() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [newArrivals, allProducts, cols] = await Promise.all([
          fetchNewArrivalsClient(),
          fetchAllProductsClient(),
          fetchCollectionsClient(),
        ]);
        // Use new arrivals for the grid; fall back to all products if none
        setProducts(newArrivals.length > 0 ? newArrivals : allProducts.slice(0, 6));
        setCollections(cols);
      } catch (err) {
        console.error("Failed to load homepage data:", err);
        setError("Failed to load data. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <Brands />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-black/40" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Brands />
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-sm text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-black/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        {products.length > 0 ? (
          <ProductGridList
            data={products}
            viewAllLink="/shop?category=new-arrivals"
          />
        ) : (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <ShoppingBag className="w-16 h-16 text-black/10" />
              <p className="text-black/40 text-sm">No products available yet.</p>
              <Link
                href="/shop"
                className="px-8 py-3 bg-black text-white rounded-full text-sm hover:bg-black/80 transition-colors"
              >
                Browse Shop
              </Link>
            </div>
          </section>
        )}
        {collections.length > 0 && (
          <CollectionList
            title={t("collectionListTitle")}
            description={t("collectionListDesc")}
            data={collections}
          />
        )}
      </main>
    </>
  );
}
