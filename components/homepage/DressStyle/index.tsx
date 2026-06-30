"use client";

import { integralCF } from "@/app/fonts";
import { cn } from "@/lib/utils";
import * as motion from "framer-motion/client";
import DressStyleCard from "./DressStyleCard";
import { useLanguage } from "@/lib/LanguageContext";

const DressStyle = () => {
  const { t } = useLanguage();

  return (
    <div className="px-4 xl:px-0">
      <section className="max-w-frame mx-auto bg-[#F0F0F0] px-4 sm:px-6 pb-6 pt-7 sm:pt-10 md:p-[70px] rounded-[20px] sm:rounded-[40px] text-center">
        <motion.h2
          initial={{ y: "80px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            integralCF.className,
            "text-[22px] leading-[26px] sm:text-[32px] sm:leading-[36px] md:text-5xl mb-5 sm:mb-8 md:mb-14 capitalize",
          ])}
        >
          {t("browseDressStyle")}
        </motion.h2>

        {/* Row 1 */}
        <motion.div
          initial={{ y: "80px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-3 sm:mb-5"
        >
          <DressStyleCard
            title={t("casual")}
            url="/shop?style=casual"
            className="sm:max-w-[38%] lg:max-w-[260px] xl:max-w-[407px] h-[150px] sm:h-[190px] md:h-[289px] bg-[url('/images/dress-style-1.png')]"
          />
          <DressStyleCard
            title={t("formal")}
            url="/shop?style=formal"
            className="flex-1 h-[150px] sm:h-[190px] md:h-[289px] bg-[url('/images/dress-style-2.png')]"
          />
        </motion.div>

        {/* Row 2 */}
        <motion.div
          initial={{ y: "80px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-5"
        >
          <DressStyleCard
            title={t("party")}
            url="/shop?style=party"
            className="flex-1 h-[150px] sm:h-[190px] md:h-[289px] bg-[url('/images/dress-style-3.png')]"
          />
          <DressStyleCard
            title={t("gym")}
            url="/shop?style=gym"
            className="sm:max-w-[38%] lg:max-w-[260px] xl:max-w-[407px] h-[150px] sm:h-[190px] md:h-[289px] bg-[url('/images/dress-style-4.png')]"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default DressStyle;
