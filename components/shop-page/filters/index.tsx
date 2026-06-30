"use client";

import CategoriesSection from "@/components/shop-page/filters/CategoriesSection";
import ColorsSection from "@/components/shop-page/filters/ColorsSection";
import DressStyleSection from "@/components/shop-page/filters/DressStyleSection";
import PriceSection from "@/components/shop-page/filters/PriceSection";
import SizeSection from "@/components/shop-page/filters/SizeSection";
import { Button } from "@/components/ui/button";

type FiltersProps = {
  activeCategory?: string;
  activeStyle?: string;
  onCategoryClick?: (category: string) => void;
  onStyleClick?: (style: string) => void;
  priceRange?: [number, number];
  onPriceChange?: (range: [number, number]) => void;
  onClearFilters?: () => void;
  hasActiveFilters?: boolean;
};

const Filters = ({
  activeCategory = "",
  activeStyle = "",
  onCategoryClick,
  onStyleClick,
  priceRange,
  onPriceChange,
  onClearFilters,
  hasActiveFilters = false,
}: FiltersProps) => {
  return (
    <>
      <hr className="border-t-black/10" />
      <CategoriesSection
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
      />
      <hr className="border-t-black/10" />
      <PriceSection
        priceRange={priceRange}
        onPriceChange={onPriceChange}
      />
      <hr className="border-t-black/10" />
      <ColorsSection />
      <hr className="border-t-black/10" />
      <SizeSection />
      <hr className="border-t-black/10" />
      <DressStyleSection
        activeStyle={activeStyle}
        onStyleClick={onStyleClick}
      />
      <Button
        type="button"
        className="bg-black w-full rounded-full text-sm font-medium py-4 h-12"
        onClick={onClearFilters}
      >
        {hasActiveFilters ? "Clear Filters" : "Apply Filter"}
      </Button>
    </>
  );
};

export default Filters;
