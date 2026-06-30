"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = {
  onClose?: () => void;
};

const TopBanner = ({ onClose }: Props) => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div className="bg-black text-white py-2.5 px-4 xl:px-0">
      <div className="relative max-w-frame mx-auto flex items-center justify-center">
        <p className="text-xs sm:text-sm text-center pr-8 sm:pr-0">
          {t("bannerSignup")}{" "}
          <Link href="#" className="underline font-medium">
            {t("signUpNow")}
          </Link>
        </p>
        <Button
          variant="ghost"
          className="hover:bg-transparent absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 p-0 flex items-center justify-center text-white/70 hover:text-white"
          size="icon"
          type="button"
          aria-label={t("closeBanner")}
          onClick={handleClose}
        >
          <Image
            priority
            src="/icons/times.svg"
            height={12}
            width={12}
            alt="close banner"
            className="invert opacity-70"
          />
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
