"use client";

import { integralCF } from "@/app/fonts";
import BreadcrumbCart from "@/components/cart-page/BreadcrumbCart";
import ProductCard from "@/components/cart-page/ProductCard";
import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ArrowRight, ShoppingBasket, Tag } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function CartPage() {
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );
  const { t } = useLanguage();

  return (
    <main className="pb-16 sm:pb-20">
      <div className="max-w-frame mx-auto px-4 sm:px-6">
        {cart && cart.items.length > 0 ? (
          <>
            <BreadcrumbCart />
            <h2
              className={cn([
                integralCF.className,
                "font-bold text-2xl sm:text-[32px] md:text-[40px] text-black uppercase mb-4 sm:mb-6",
              ])}
            >
              {t("yourCart")}
            </h2>

            {/* Main layout — stacked on mobile, side-by-side on lg */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-start">
              {/* Cart items */}
              <div className="w-full p-3 sm:p-4 md:px-6 flex flex-col gap-4 sm:gap-5 rounded-2xl border border-black/10">
                {cart?.items.map((product, idx, arr) => (
                  <React.Fragment key={idx}>
                    <ProductCard data={product} />
                    {arr.length - 1 !== idx && (
                      <hr className="border-t-black/10" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Order summary — full width on mobile, fixed width on desktop */}
              <div className="w-full lg:w-auto lg:min-w-[360px] lg:max-w-[505px] p-4 sm:p-5 md:px-6 flex flex-col gap-4 sm:gap-5 rounded-2xl border border-black/10">
                <h6 className="text-lg sm:text-xl md:text-2xl font-bold text-black">
                  {t("orderSummary")}
                </h6>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-black/60">{t("subtotal")}</span>
                    <span className="text-sm sm:text-base font-bold">${totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-black/60">
                      {t("discount")} (-
                      {totalPrice > 0
                        ? Math.round(
                            ((totalPrice - adjustedTotalPrice) / totalPrice) * 100
                          )
                        : 0}
                      %)
                    </span>
                    <span className="text-sm sm:text-base font-bold text-red-600">
                      -${Math.round(totalPrice - adjustedTotalPrice)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-black/60">
                      {t("deliveryFee")}
                    </span>
                    <span className="text-sm sm:text-base font-bold">{t("free")}</span>
                  </div>
                  <hr className="border-t-black/10" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base text-black">{t("total")}</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold">
                      ${Math.round(adjustedTotalPrice)}
                    </span>
                  </div>
                </div>

                {/* Promo code */}
                <div className="flex gap-2">
                  <InputGroup className="bg-[#F0F0F0] flex-1">
                    <InputGroup.Text>
                      <Tag className="text-black/40 text-xl" />
                    </InputGroup.Text>
                    <InputGroup.Input
                      type="text"
                      name="code"
                      placeholder={t("addPromoCode")}
                      className="bg-transparent placeholder:text-black/40 text-sm"
                    />
                  </InputGroup>
                  <Button
                    type="button"
                    className="bg-black rounded-full w-[100px] sm:w-[119px] h-[48px] shrink-0 text-sm"
                  >
                    {t("apply")}
                  </Button>
                </div>

                {/* Checkout button */}
                <Button
                  type="button"
                  className="text-sm sm:text-base font-medium bg-black rounded-full w-full py-4 h-[52px] sm:h-[60px] group"
                >
                  {t("checkout")}{" "}
                  <ArrowRight className="text-lg ml-2 group-hover:translate-x-1 transition-all" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* Empty cart */
          <div className="flex items-center flex-col text-gray-300 mt-24 sm:mt-32 px-4 text-center">
            <ShoppingBasket strokeWidth={1} className="w-16 h-16 mb-4" />
            <p className="text-gray-400 mb-6 text-sm sm:text-base">{t("emptyCart")}</p>
            <Button className="rounded-full px-8" asChild>
              <Link href="/shop">{t("shopLink")}</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
