"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/lib/LanguageContext";
import CategoriesSection from "./CategoriesSection";
import ColorsSection from "./ColorsSection";
import DressStyleSection from "./DressStyleSection";
import PriceSection from "./PriceSection";
import SizeSection from "./SizeSection";

type FiltersProps = {
  activeCategory: string;
  activeStyle: string;
  onCategoryClick: (category: string) => void;
  onStyleClick: (style: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
};

const Filters = ({
  activeCategory,
  activeStyle,
  onCategoryClick,
  onStyleClick,
  priceRange,
  onPriceChange,
  onClearFilters,
  hasActiveFilters,
}: FiltersProps) => {
  const { t } = useLanguage();

  return (
    <>
      <hr className="h-[1px] border-t-black/10" />
      <CategoriesSection
        activeCategory={activeCategory}
        onCategoryClick={onCategoryClick}
      />
      <hr className="h-[1px] border-t-black/10" />
      <PriceSection priceRange={priceRange} onPriceChange={onPriceChange} />
      <hr className="h-[1px] border-t-black/10" />
      <ColorsSection />
      <hr className="h-[1px] border-t-black/10" />
      <SizeSection />
      <hr className="h-[1px] border-t-black/10" />
      <DressStyleSection
        activeStyle={activeStyle}
        onStyleClick={onStyleClick}
      />
      {hasActiveFilters && (
        <>
          <hr className="h-[1px] border-t-black/10" />
          <button
            type="button"
            onClick={onClearFilters}
            className="w-full py-3 text-sm font-medium text-black/60 hover:text-black transition-colors"
          >
            {t("clearFilter")}
          </button>
        </>
      )}
    </>
  );
};

export default Filters;
