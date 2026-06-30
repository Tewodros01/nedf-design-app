"use client";

import { setSizeSelection } from "@/lib/features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";

const SizeSelection = () => {
  const { sizeSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col">
      <span className="text-sm sm:text-base text-black/60 mb-4">
        {t("chooseSize")}
      </span>
      <div className="flex items-center flex-wrap lg:space-x-3">
        {[t("small"), t("medium"), t("large"), t("xLarge")].map((size, index) => (
          <button
            key={index}
            type="button"
            className={cn([
              "bg-[#F0F0F0] flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base rounded-full m-1 lg:m-0 max-h-[46px]",
              sizeSelection === size && "bg-black font-medium text-white",
            ])}
            onClick={() => dispatch(setSizeSelection(size))}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
