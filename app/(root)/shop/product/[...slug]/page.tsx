import ProductListSec from "@/components/common/ProductListSec";
import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import Tabs from "@/components/product-page/Tabs";
import { fetchProductById, fetchAllProducts } from "@/lib/supabase-queries-server";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (!slug || !slug[0]) {
    notFound();
  }

  const productId = Number(slug[0]);
  if (isNaN(productId)) {
    notFound();
  }

  // Fetch product from Supabase
  const productData = await fetchProductById(productId);

  if (!productData?.title) {
    notFound();
  }

  // Fetch related products (exclude current product)
  const allProducts = await fetchAllProducts();
  const relatedProducts = allProducts.filter((p) => p.id !== productId).slice(0, 4);

  return (
    <main>
      <div className="max-w-frame mx-auto px-4 sm:px-6 xl:px-8">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs productId={productId} />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductListSec title="You might also like" data={relatedProducts} />
      </div>
    </main>
  );
}
