import { collectionsData, newArrivalsData, topSellingData, relatedProductData } from "@/lib/data";
import ProductCard from "@/components/common/ProductCard";
import { integralCF } from "@/app/fonts";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const collection = collectionsData.find(
    (c) => c.viewAllLink.split("/").pop() === slug
  );

  if (!collection) {
    notFound();
  }

  const allProducts = [
    ...newArrivalsData,
    ...topSellingData,
    ...relatedProductData,
  ];

  // Remove duplicates by id
  const uniqueProducts = allProducts.filter(
    (product, index, self) =>
      index === self.findIndex((p) => p.id === product.id)
  );

  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />

        <Breadcrumb className="mb-5 sm:mb-9">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{collection.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8 sm:mb-12">
          <h1
            className={cn([
              integralCF.className,
              "font-bold text-[28px] sm:text-[36px] lg:text-[48px] text-black uppercase mb-4",
            ])}
          >
            {collection.title}
          </h1>
          <p className="text-sm sm:text-base text-black/60 max-w-2xl">
            {collection.description}
          </p>
        </div>

        <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {uniqueProducts.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
