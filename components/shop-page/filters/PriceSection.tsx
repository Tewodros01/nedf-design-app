"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

type PriceSectionProps = {
  priceRange?: [number, number];
  onPriceChange?: (range: [number, number]) => void;
};

const PriceSection = ({
  priceRange: externalRange,
  onPriceChange,
}: PriceSectionProps) => {
  const [internalRange, setInternalRange] = useState<[number, number]>([50, 200]);
  const range = externalRange || internalRange;
  const setRange = onPriceChange || setInternalRange;

  return (
    <Accordion type="single" collapsible defaultValue="filter-price">
      <AccordionItem value="filter-price" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Price
        </AccordionTrigger>
        <AccordionContent className="pt-4">
          <Slider
            defaultValue={[range[0], range[1]]}
            value={[range[0], range[1]]}
            min={0}
            max={250}
            step={1}
            onValueChange={(value) => {
              if (value.length === 2) {
                setRange([value[0], value[1]]);
              }
            }}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-black/60">${range[0]}</span>
            <span className="text-sm text-black/60">${range[1]}</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
