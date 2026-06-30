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
import { fetchCollectionBySlug, fetchAllProducts } from "@/lib/supabase-queries-server";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch collection — may return null if not found or DB error
  let collection = null;
  try {
    collection = await fetchCollectionBySlug(slug);
  } catch {
    // Supabase .single() throws if 0 rows — treat as not found
  }

  if (!collection) {
    notFound();
  }

  // Fetch all products
  const allProducts = await fetchAllProducts();

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

        {/* Collection hero */}
        <div className="mb-8 sm:mb-12">
          {collection.imageUrl && (
            <div className="relative w-full h-48 sm:h-64 lg:h-80 rounded-[20px] overflow-hidden mb-6">
              <Image
                src={collection.imageUrl}
                alt={collection.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h1
                  className={cn([
                    integralCF.className,
                    "font-bold text-[28px] sm:text-[36px] lg:text-[48px] text-white uppercase",
                  ])}
                >
                  {collection.title}
                </h1>
              </div>
            </div>
          )}
          {!collection.imageUrl && (
            <h1
              className={cn([
                integralCF.className,
                "font-bold text-[28px] sm:text-[36px] lg:text-[48px] text-black uppercase mb-4",
              ])}
            >
              {collection.title}
            </h1>
          )}
          <p className="text-sm sm:text-base text-black/60 max-w-2xl">
            {collection.description}
          </p>
        </div>

        {allProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-black/40 text-sm mb-4">
              No products in this collection yet.
            </p>
            <Link
              href="/shop"
              className="px-8 py-3 bg-black text-white rounded-full text-sm hover:bg-black/80 transition-colors"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {allProducts.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
