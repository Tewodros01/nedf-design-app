import CollectionList from "@/components/common/CollectionList";
import ProductGridList from "@/components/common/ProductGridList";
import Brands from "@/components/homepage/Brands";
import Header from "@/components/homepage/Header";
import { Product } from "@/types/product.types";
import { Review } from "@/types/review.types";

export const reviewsData: Review[] = [
  {
    id: 1,
    user: "Sarah M.",
    content:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    rating: 5,
    date: "August 14, 2023",
  },
  {
    id: 2,
    user: "Alex K.",
    content:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    rating: 5,
    date: "August 15, 2023",
  },
  {
    id: 3,
    user: "James L.",
    content:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 5,
    date: "August 16, 2023",
  },
  {
    id: 4,
    user: "Mooen",
    content:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    rating: 5,
    date: "August 17, 2023",
  },
];

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: "T-shirt with Tape Details",
    srcUrl: "/images/image27.png",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 120,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 2,
    title: "Skinny Fit Jeans",
    srcUrl: "/images/image28.png",
    gallery: ["/images/pic2.png"],
    price: 260,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 3.5,
  },
  {
    id: 3,
    title: "Chechered Shirt",
    srcUrl: "/images/image29.png",
    gallery: ["/images/pic3.png"],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 4,
    title: "Sleeve Striped T-shirt",
    srcUrl: "/images/image29.png",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 160,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
  },
  {
    id: 5,
    title: "Sleeve Striped T-shirt",
    srcUrl: "/images/image28.png",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 160,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
  },
  {
    id: 6,
    title: "Sleeve Striped T-shirt",
    srcUrl: "/images/image27.png",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 160,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
  },
];

export const topSellingData: Product[] = [
  {
    id: 5,
    title: "Vertical Striped Shirt",
    srcUrl: "/images/image27.png",
    gallery: ["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"],
    price: 232,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 5.0,
  },
  {
    id: 6,
    title: "Courage Graphic T-shirt",
    srcUrl: "/images/pic6.png",
    gallery: ["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.0,
  },
  {
    id: 7,
    title: "Loose Fit Bermuda Shorts",
    srcUrl: "/images/pic7.png",
    gallery: ["/images/pic7.png"],
    price: 80,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.0,
  },
  {
    id: 8,
    title: "Faded Skinny Jeans",
    srcUrl: "/images/pic8.png",
    gallery: ["/images/pic8.png"],
    price: 210,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
];

export const relatedProductData: Product[] = [
  {
    id: 12,
    title: "Polo with Contrast Trims",
    srcUrl: "/images/pic12.png",
    gallery: ["/images/pic12.png", "/images/pic10.png", "/images/pic11.png"],
    price: 242,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 4.0,
  },
  {
    id: 13,
    title: "Gradient Graphic T-shirt",
    srcUrl: "/images/pic13.png",
    gallery: ["/images/pic13.png", "/images/pic10.png", "/images/pic11.png"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.5,
  },
  {
    id: 14,
    title: "Polo with Tipping Details",
    srcUrl: "/images/pic14.png",
    gallery: ["/images/pic14.png"],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
  },
  {
    id: 15,
    title: "Black Striped T-shirt",
    srcUrl: "/images/pic15.png",
    gallery: ["/images/pic15.png"],
    price: 150,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 5.0,
  },
];

export const collectionsData = [
  {
    id: 1,
    title: "BALENCIAGA",
    description: "Luxury fashion collection",
    imageUrl: "/images/collection-balenciaga.png",
    viewAllLink: "/collections/balenciaga",
  },
  {
    id: 2,
    title: "ZENDAYA",
    description: "Celebrity inspired collection",
    imageUrl: "/images/collection-zendaya.png",
    viewAllLink: "/collections/zendaya",
  },
  {
    id: 3,
    title: "BURBERRY",
    description: "British luxury fashion",
    imageUrl: "/images/collection-burberry.png",
    viewAllLink: "/collections/burberry",
  },
  {
    id: 4,
    title: "BALENCIAGA",
    description: "Luxury fashion collection",
    imageUrl: "/images/collection-balenciaga.png",
    viewAllLink: "/collections/balenciaga",
  },
  {
    id: 5,
    title: "ZENDAYA",
    description: "Celebrity inspired collection",
    imageUrl: "/images/collection-zendaya.png",
    viewAllLink: "/collections/zendaya",
  },
  {
    id: 6,
    title: "BURBERRY",
    description: "British luxury fashion",
    imageUrl: "/images/collection-burberry.png",
    viewAllLink: "/collections/burberry",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductGridList
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
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
