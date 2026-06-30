"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { MdKeyboardArrowRight } from "react-icons/md";

type DressStyle = {
  title: string;
  slug: string;
};

const dressStylesData: DressStyle[] = [
  {
    title: "Casual",
    slug: "casual",
  },
  {
    title: "Formal",
    slug: "formal",
  },
  {
    title: "Party",
    slug: "party",
  },
  {
    title: "Gym",
    slug: "gym",
  },
];

type DressStyleSectionProps = {
  activeStyle?: string;
  onStyleClick?: (style: string) => void;
};

const DressStyleSection = ({
  activeStyle = "",
  onStyleClick,
}: DressStyleSectionProps) => {
  return (
    <Accordion type="single" collapsible defaultValue="filter-style">
      <AccordionItem value="filter-style" className="border-none">
        <AccordionTrigger className="text-black font-bold text-xl hover:no-underline p-0 py-0.5">
          Dress Style
        </AccordionTrigger>
        <AccordionContent className="pt-4 pb-0">
          <div className="flex flex-col text-black/60 space-y-0.5">
            {dressStylesData.map((dStyle, idx) => (
              <button
                key={idx}
                onClick={() => onStyleClick?.(dStyle.slug)}
                className={cn(
                  "flex items-center justify-between py-2 w-full text-left transition-colors",
                  activeStyle === dStyle.slug
                    ? "text-black font-medium"
                    : "hover:text-black"
                )}
              >
                {dStyle.title} <MdKeyboardArrowRight />
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DressStyleSection;
