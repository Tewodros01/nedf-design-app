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
export default function Home() {
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
          title="Collection List"
          description="Get The Best Collection To Something From Behind The Scenes At These Things — And We Can't Wait For You To See Them."
          data={collectionsData}
        />
      </main>
    </>
  );
}
