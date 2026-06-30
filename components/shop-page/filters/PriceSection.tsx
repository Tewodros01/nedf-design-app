"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/lib/LanguageContext";

type PriceSectionProps = {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
};

const PriceSection = ({ priceRange, onPriceChange }: PriceSectionProps) => {
  const { t } = useLanguage();

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          {t("price")}
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="mb-4">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceChange(value as [number, number])}
              min={0}
              max={250}
              step={1}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-black/60">${priceRange[0]}</span>
            <span className="text-sm text-black/60">${priceRange[1]}</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
