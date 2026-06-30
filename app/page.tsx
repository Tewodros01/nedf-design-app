"use client";

import CollectionList from "@/components/common/CollectionList";
import ProductGridList from "@/components/common/ProductGridList";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import {
  newArrivalsData,
  topSellingData,
  relatedProductData,
  collectionsData,
} from "@/lib/data";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductGridList
          data={newArrivalsData}
          viewAllLink="/shop?category=new-arrivals"
        />
        <CollectionList
          title={t("collectionListTitle")}
          description={t("collectionListDesc")}
          data={collectionsData}
        />
      </main>
    </>
  );
}
