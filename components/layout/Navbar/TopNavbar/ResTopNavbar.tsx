"use client";

import { integralCF } from "@/app/fonts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NavMenu } from "../navbar.types";
import { useLanguage } from "@/lib/LanguageContext";

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  const { lang, setLang, t } = useLanguage();

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* 44px minimum touch target */}
        <button
          type="button"
          aria-label="Open menu"
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Image
            priority
            src="/icons/menu.svg"
            height={20}
            width={20}
            alt="menu"
          />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto w-[300px] sm:w-[360px] p-0">
        <SheetHeader className="px-5 pt-5 pb-4 border-b border-black/5">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link
                href="/"
                className={cn([integralCF.className, "text-xl font-bold"])}
              >
                NEDF DESIGN
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        {/* Nav links */}
        <div className="flex flex-col px-5 py-4">
          {data.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === "MenuItem" && (
                <SheetClose asChild>
                  <Link
                    href={item.url ?? "/"}
                    className="flex items-center py-3.5 text-base font-medium text-black/80 hover:text-black border-b border-black/5 last:border-0"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              )}
              {item.type === "MenuList" && (
                <div className="border-b border-black/5 last:border-0">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={item.label} className="border-none">
                      <AccordionTrigger className="text-left py-3.5 font-medium text-base text-black/80 hover:text-black hover:no-underline">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="pb-2 pl-4">
                        <div className="flex flex-col border-l border-black/10">
                          {item.children.map((itemChild) => (
                            <SheetClose key={itemChild.id} asChild>
                              <Link
                                href={itemChild.url ?? "/"}
                                className="py-3 pl-4 text-sm text-black/60 hover:text-black"
                              >
                                {itemChild.label}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Language switcher at bottom */}
        <div className="px-5 py-4 mt-auto border-t border-black/5">
          <p className="text-xs text-black/40 uppercase tracking-wider mb-3">Language</p>
          <div className="flex gap-3">
            <button
              onClick={() => setLang("en")}
              className={cn(
                "flex-1 py-2.5 rounded-full text-sm font-medium transition-all border",
                lang === "en"
                  ? "bg-black text-white border-black"
                  : "border-black/10 text-black/60 hover:border-black/30"
              )}
            >
              {t("english")}
            </button>
            <button
              onClick={() => setLang("am")}
              className={cn(
                "flex-1 py-2.5 rounded-full text-sm font-medium transition-all border",
                lang === "am"
                  ? "bg-black text-white border-black"
                  : "border-black/10 text-black/60 hover:border-black/30"
              )}
            >
              {t("amharic")}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
