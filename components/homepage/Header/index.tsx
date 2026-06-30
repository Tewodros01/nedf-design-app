"use client";

import { integralCF } from "@/app/fonts";
import { cn } from "@/lib/utils";
import * as motion from "framer-motion/client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

const Header = () => {
  const { t } = useLanguage();

  return (
    <header className="py-3 sm:py-6 sm:pt-8">
      <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-[28px] bg-[#f7f6f4] shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
          {/* Decorative fabric blobs — hidden on mobile to keep it clean */}
          <div className="hidden sm:block absolute -left-20 bottom-0 w-[320px] h-[480px] rotate-[-6deg] bg-[url('/images/fabric-left.png')] bg-cover opacity-90 pointer-events-none" />
          <div className="hidden sm:block absolute -right-20 -top-32 w-[360px] h-[520px] rotate-[7deg] bg-[url('/images/fabric-right.png')] bg-cover opacity-85 pointer-events-none" />

          {/* Grid: stacks vertically on mobile, side-by-side on lg */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* Text content — comes first so it shows at top on mobile */}
            <section className="px-5 sm:px-10 lg:px-14 pt-8 sm:pt-14 lg:pt-24 pb-6 sm:pb-10 lg:pb-32 text-center lg:text-left">
              <motion.h2
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={cn(
                  integralCF.className,
                  "text-[28px] sm:text-[40px] lg:text-[56px] leading-[1.1] tracking-wide mb-3 sm:mb-5"
                )}
              >
                {t("craftingImagination")}
              </motion.h2>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-black/60 mb-5 sm:mb-8 text-sm sm:text-base max-w-sm sm:max-w-[520px] mx-auto lg:mx-0"
              >
                {t("heroDescription")}
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative inline-block"
              >
                <span className="absolute inset-[-6px] rounded-full border border-dashed border-[#b77a45]" />
                <Link
                  href="/shop"
                  className="relative z-10 inline-flex items-center gap-2 rounded-full bg-[#b77a45] px-7 sm:px-10 py-3 sm:py-4 text-white font-medium text-sm sm:text-base"
                >
                  <ShoppingCart size={16} className="sm:size-[18px]" />
                  {t("shopNow")}
                </Link>
              </motion.div>
            </section>

            {/* Product image — shown below text on mobile, right side on desktop */}
            <motion.section
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="relative z-[5] flex justify-center items-end px-4 sm:px-0 pb-6 sm:pb-0"
            >
              <Image
                src="/images/header-homepage.png"
                alt="Featured Design"
                width={760}
                height={860}
                priority
                className="object-contain w-full max-w-[280px] sm:max-w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.14)] sm:drop-shadow-[0_50px_80px_rgba(0,0,0,0.18)]"
              />
            </motion.section>
          </div>

          {/* Scrolling brand watermark */}
          <div className="absolute bottom-3 sm:bottom-6 left-0 right-0 z-30 flex justify-center gap-4 sm:gap-10 text-[9px] sm:text-xs tracking-[0.3em] text-black/20 overflow-hidden px-4 pointer-events-none">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="whitespace-nowrap select-none">NEDF.</span>
            ))}
          </div>

          {/* Inner shadow overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-[28px] shadow-[inset_0_0_80px_rgba(0,0,0,0.06)]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
