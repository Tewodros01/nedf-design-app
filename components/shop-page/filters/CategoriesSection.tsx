"use client";

import { cn } from "@/lib/utils";
import { MdKeyboardArrowRight } from "react-icons/md";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "T-shirts",
    slug: "t-shirts",
  },
  {
    title: "Shorts",
    slug: "shorts",
  },
  {
    title: "Shirts",
    slug: "shirts",
  },
  {
    title: "Hoodie",
    slug: "hoodie",
  },
  {
    title: "Jeans",
    slug: "jeans",
  },
];

type CategoriesSectionProps = {
  activeCategory?: string;
  onCategoryClick?: (category: string) => void;
};

const CategoriesSection = ({
  activeCategory = "",
  onCategoryClick,
}: CategoriesSectionProps) => {
  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {categoriesData.map((category, idx) => (
        <button
          key={idx}
          onClick={() => onCategoryClick?.(category.slug)}
          className={cn(
            "flex items-center justify-between py-2 w-full text-left transition-colors",
            activeCategory === category.slug
              ? "text-black font-medium"
              : "hover:text-black"
          )}
        >
          {category.title} <MdKeyboardArrowRight />
        </button>
      ))}
    </div>
  );
};

export default CategoriesSection;
