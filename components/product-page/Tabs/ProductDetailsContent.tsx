"use client";

import { useLanguage } from "@/lib/LanguageContext";
import ProductDetails from "./ProductDetails";

const ProductDetailsContent = () => {
  const { t } = useLanguage();

  return (
    <section>
      <h3 className="text-xl sm:text-2xl font-bold text-black mb-5 sm:mb-6">
        {t("productSpecifications")}
      </h3>
      <ProductDetails />
    </section>
  );
};

export default ProductDetailsContent;
