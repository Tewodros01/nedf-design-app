"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import React from "react";
import { FiSliders } from "react-icons/fi";

type MobileFiltersProps = {
  children?: React.ReactNode;
};

const MobileFilters = ({ children }: MobileFiltersProps) => {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <button
            type="button"
            className="h-8 w-8 rounded-full bg-[#F0F0F0] text-black p-1 md:hidden flex items-center justify-center"
          >
            <FiSliders className="text-base" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[90%]">
          <DrawerHeader>
            <div className="flex items-center justify-between">
              <span className="font-bold text-black text-xl">Filters</span>
              <FiSliders className="text-2xl text-black/40" />
            </div>
            <DrawerTitle className="hidden">filters</DrawerTitle>
            <DrawerDescription className="hidden">filters</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto w-full px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileFilters;
