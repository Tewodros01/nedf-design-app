import { integralCF } from "@/app/fonts";
import { cn } from "@/lib/utils";
import * as motion from "framer-motion/client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="py-6 sm:py-10">
      <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] bg-[#f7f6f4] shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:shadow-[0_40px_120px_rgba(0,0,0,0.08)]">
          <div className="hidden sm:block absolute -left-20 bottom-0 w-[320px] h-[480px] rotate-[-6deg] bg-[url('/images/fabric-left.png')] bg-cover opacity-90" />

          <div className="hidden sm:block absolute -right-20 -top-32 w-[360px] h-[520px] rotate-[7deg] bg-[url('/images/fabric-right.png')] bg-cover opacity-85" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center">
            <section className="px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 lg:pt-24 pb-16 sm:pb-20 lg:pb-32">
              <motion.h2
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={cn(
                  integralCF.className,
                  "text-[32px] sm:text-[40px] lg:text-[56px] leading-[1.1] tracking-wide mb-4 sm:mb-6"
                )}
              >
                CRAFTING <br /> YOUR IMAGINATION
              </motion.h2>

              <motion.p
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-[520px] text-black/60 mb-6 sm:mb-10 text-sm sm:text-base"
              >
                NEDF DESIGN creates leather goods that tell stories stitched
                with purpose, carried with pride.
              </motion.p>

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative inline-block"
              >
                <span className="absolute inset-[-6px] rounded-full border border-dashed border-[#b77a45]" />
                <Link
                  href="/shop"
                  className="relative z-10 inline-flex items-center gap-2 sm:gap-3 rounded-full bg-[#b77a45] px-6 sm:px-10 py-3 sm:py-4 text-white font-medium text-sm sm:text-base"
                >
                  <ShoppingCart size={16} className="sm:size-[18px]" />
                  Shop Now
                </Link>
              </motion.div>
            </section>

            <motion.section
              initial={{ opacity: 0, scale: 0.96, rotate: 4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9 }}
              className="relative z-5 flex justify-center items-center"
            >
              <Image
                src="/images/header-homepage.png"
                alt="Leather Bag"
                width={760}
                height={860}
                priority
                className="object-contain drop-shadow-[0_50px_80px_rgba(0,0,0,0.18)]"
              />
            </motion.section>
          </div>

          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30 flex justify-center gap-4 sm:gap-10 text-[10px] sm:text-xs tracking-[0.35em] text-black/30 overflow-hidden px-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="whitespace-nowrap">NEDF.</span>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-[28px] shadow-[inset_0_0_120px_rgba(0,0,0,0.08)]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
