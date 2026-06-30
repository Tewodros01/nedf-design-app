"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

type DressStyleSectionProps = {
  activeStyle: string;
  onStyleClick: (style: string) => void;
};

const DressStyleSection = ({ activeStyle, onStyleClick }: DressStyleSectionProps) => {
  const { t } = useLanguage();

  const styles = [
    { slug: "casual", labelKey: "casual" },
    { slug: "formal", labelKey: "formal" },
    { slug: "party", labelKey: "party" },
    { slug: "gym", labelKey: "gym" },
  ];

  return (
    <Accordion type="single" collapsible defaultValue="filter-dress-style">
      <AccordionItem value="filter-dress-style" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          {t("dressStyle")}
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col space-y-3">
            {styles.map((style) => (
              <button
                key={style.slug}
                type="button"
                className={cn([
                  "text-left text-sm sm:text-base w-fit capitalize",
                  activeStyle === style.slug
                    ? "font-medium text-black"
                    : "text-black/60 hover:text-black",
                ])}
                onClick={() => onStyleClick(style.slug)}
              >
                {t(style.labelKey)}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DressStyleSection;
