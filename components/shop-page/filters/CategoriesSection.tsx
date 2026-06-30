"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

type CategoriesSectionProps = {
  activeCategory: string;
  onCategoryClick: (category: string) => void;
};

const CategoriesSection = ({ activeCategory, onCategoryClick }: CategoriesSectionProps) => {
  const { t } = useLanguage();

  const categories = [
    { slug: "new-arrivals", labelKey: "newArrivals" },
    { slug: "men", labelKey: "men" },
    { slug: "women", labelKey: "women" },
    { slug: "kids", labelKey: "kids" },
    { slug: "t-shirts", labelKey: "products" },
    { slug: "shorts", labelKey: "products" },
    { slug: "shirts", labelKey: "products" },
    { slug: "hoodie", labelKey: "products" },
    { slug: "jeans", labelKey: "products" },
  ];

  return (
    <Accordion type="single" collapsible defaultValue="filter-category">
      <AccordionItem value="filter-category" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          {t("category")}
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col space-y-3">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                className={cn([
                  "text-left text-sm sm:text-base w-fit capitalize",
                  activeCategory === cat.slug
                    ? "font-medium text-black"
                    : "text-black/60 hover:text-black",
                ])}
                onClick={() => onCategoryClick(cat.slug)}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CategoriesSection;
