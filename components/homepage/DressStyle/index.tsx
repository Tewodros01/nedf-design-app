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
      <section className="max-w-frame mx-auto bg-[#F0F0F0] px-4 sm:px-6 pb-6 pt-8 sm:pt-10 md:p-[70px] rounded-[20px] sm:rounded-[40px] text-center">
        <motion.h2
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn([
            integralCF.className,
            "text-[24px] leading-[28px] sm:text-[32px] sm:leading-[36px] md:text-5xl mb-6 sm:mb-8 md:mb-14 capitalize",
          ])}
        >
          {t("browseDressStyle")}
        </motion.h2>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-[289px] space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5"
        >
          <DressStyleCard
            title={t("casual")}
            url="/shop?style=casual"
            className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/dress-style-1.png')]"
          />
          <DressStyleCard
            title={t("formal")}
            url="/shop?style=formal"
            className="md:max-w-[684px] h-[190px] bg-[url('/images/dress-style-2.png')]"
          />
        </motion.div>
        <motion.div
          initial={{ y: "100px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row md:h-[289px] space-y-5 sm:space-y-0 sm:space-x-5"
        >
          <DressStyleCard
            title={t("party")}
            url="/shop?style=party"
            className="md:max-w-[684px] h-[190px] bg-[url('/images/dress-style-3.png')]"
          />
          <DressStyleCard
            title={t("gym")}
            url="/shop?style=gym"
            className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/dress-style-4.png')]"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default DressStyle;
