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
import { Loader2 } from "lucide-react";
import type { Product } from "@/types/product.types";
import type { Collection } from "@/lib/data";

export default function Home() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [newArrivals, allProducts, cols] = await Promise.all([
        fetchNewArrivalsClient(),
        fetchAllProductsClient(),
        fetchCollectionsClient(),
      ]);
      // Use new arrivals for the grid; fall back to all products if none
      setProducts(newArrivals.length > 0 ? newArrivals : allProducts.slice(0, 6));
      setCollections(cols);
      setLoading(false);
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

  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductGridList
          data={products}
          viewAllLink="/shop?category=new-arrivals"
        />
        <CollectionList
          title={t("collectionListTitle")}
          description={t("collectionListDesc")}
          data={collections}
        />
      </main>
    </>
  );
}
