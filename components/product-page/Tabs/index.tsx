"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import FaqContent from "./FaqContent";
import ProductDetailsContent from "./ProductDetailsContent";
import ReviewsContent from "./ReviewsContent";
import { useLanguage } from "@/lib/LanguageContext";

type TabBtn = {
  id: number;
  labelKey: string;
};

const Tabs = () => {
  const [active, setActive] = useState<number>(1);
  const { t } = useLanguage();

  const tabBtnData: TabBtn[] = [
    {
      id: 1,
      labelKey: "productDetails",
    },
    {
      id: 2,
      labelKey: "ratingAndReviews",
    },
    {
      id: 3,
      labelKey: "faq",
    },
  ];

  return (
    <div>
      <div className="flex items-center mb-6 sm:mb-8 overflow-x-auto scrollbar-hide">
        {tabBtnData.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            type="button"
            className={cn([
              active === tab.id
                ? "border-black border-b-2 font-medium"
                : "border-b border-black/10 text-black/60 font-normal",
              "p-3 sm:p-5 md:p-6 rounded-none flex-1 text-xs sm:text-sm md:text-base whitespace-nowrap",
            ])}
            onClick={() => setActive(tab.id)}
          >
            {t(tab.labelKey)}
          </Button>
        ))}
      </div>
      <div className="mb-12 sm:mb-16">
        {active === 1 && <ProductDetailsContent />}
        {active === 2 && <ReviewsContent />}
        {active === 3 && <FaqContent />}
      </div>
    </div>
  );
};

export default Tabs;
