"use client";

import { integralCF } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { Clock, Gem, ShoppingBag, Watch, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AccessoriesPage() {
  const { t } = useLanguage();

  const categories = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      titleKey: "accessoriesBags",
      image: "/images/pic12.png",
      href: "/shop",
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      titleKey: "accessoriesWallets",
      image: "/images/pic13.png",
      href: "/shop",
    },
    {
      icon: <Watch className="w-8 h-8" />,
      titleKey: "accessoriesBelts",
      image: "/images/pic14.png",
      href: "/shop",
    },
    {
      icon: <Gem className="w-8 h-8" />,
      titleKey: "accessoriesBracelets",
      image: "/images/pic15.png",
      href: "/shop",
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-frame mx-auto px-4 xl:px-8 pt-5 sm:pt-6">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <nav className="flex items-center text-sm text-black/60 mb-8">
          <Link href="/" className="hover:text-black">{t("home")}</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{t("accessories")}</span>
        </nav>
      </div>

      <main className="pb-20">
        <div className="max-w-frame mx-auto px-4 xl:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className={cn([
                integralCF.className,
                "text-[32px] md:text-[40px] font-bold text-black uppercase mb-4",
              ])}
            >
              {t("accessoriesTitle")}
            </h1>
            <p className="text-black/60 text-sm sm:text-base max-w-xl mx-auto">
              {t("accessoriesDesc")}
            </p>
          </div>

          {/* Accessory Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-16">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group relative overflow-hidden rounded-[20px] bg-[#F0F0F0] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                  {cat.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl sm:text-2xl text-black mb-1 sm:mb-2">
                    {t(cat.titleKey)}
                  </h3>
                  <p className="text-sm text-black/60">
                    {t("shop")} &rarr;
                  </p>
                </div>
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={cat.image}
                    alt={t(cat.titleKey)}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] bg-black text-white text-center px-6 sm:px-12 py-12 sm:py-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h2
                className={cn([
                  integralCF.className,
                  "text-2xl sm:text-3xl md:text-4xl font-bold mb-4",
                ])}
              >
                {t("accessoriesComingSoon")}
              </h2>
              <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto mb-8">
                {t("accessoriesStayTuned")}
              </p>
              <Link
                href="/shop"
                className="inline-block bg-white text-black px-8 py-3 rounded-full text-sm font-medium hover:bg-white/90 transition-all"
              >
                {t("shop")}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

