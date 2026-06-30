"use client";

import { useLanguage } from "@/lib/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import { SocialNetworks } from "./footer.types";
import LayoutSpacing from "./LayoutSpacing";

const socialsData: SocialNetworks[] = [
  { id: 1, icon: <FaTwitter />, url: "https://twitter.com" },
  { id: 2, icon: <FaFacebookF />, url: "https://facebook.com" },
  { id: 3, icon: <FaInstagram />, url: "https://instagram.com" },
  { id: 4, icon: <FaGithub />, url: "https://github.com/" },
];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-8 sm:mt-10">
      <div className="pt-8 sm:pt-10 md:pt-[50px] px-4 sm:px-6 pb-4">
        <div className="max-w-frame mx-auto">
          {/* Main grid — single column on mobile, 2 on md, 4 on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16">

            {/* Newsletter + subscribe — spans 2 cols on lg */}
            <div className="sm:col-span-2 lg:col-span-2">
              <h3 className="text-base sm:text-lg font-semibold mb-1 text-black">
                {t("subscribeLatest")}
              </h3>
              <h3 className="text-base sm:text-lg font-semibold mb-5 text-black">
                {t("releases")}
              </h3>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">{t("enterYourEmail")}</p>
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-gray-600 bg-transparent text-sm placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-start mb-6">
                <input
                  type="checkbox"
                  id="privacy"
                  className="mt-1 mr-3 shrink-0 w-4 h-4"
                />
                <label
                  htmlFor="privacy"
                  className="text-sm text-gray-600 leading-relaxed"
                >
                  {t("privacyAgreement")}
                </label>
              </div>

              {/* Payment logo */}
              <div className="inline-block">
                <Image
                  priority
                  src="/images/chapa.png"
                  width={80}
                  height={32}
                  alt="Chapa"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Menu links */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-5 text-black">
                {t("menu")}
              </h3>
              <nav className="space-y-4">
                <Link
                  href="/wallet"
                  className="block text-sm text-gray-600 hover:text-black uppercase"
                >
                  {t("wallet")}
                </Link>
                <Link
                  href="/workbook"
                  className="block text-sm text-gray-600 hover:text-black uppercase"
                >
                  {t("workbook")}
                </Link>
                <Link
                  href="/belts"
                  className="block text-sm text-gray-600 hover:text-black uppercase"
                >
                  {t("belts")}
                </Link>
                <Link
                  href="/bracelets"
                  className="block text-sm text-gray-600 hover:text-black uppercase"
                >
                  {t("bracelets")}
                </Link>
              </nav>
            </div>

            {/* Address + socials */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-5 text-black">
                {t("address")}
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <HiLocationMarker className="w-5 h-5 text-gray-500 mr-3 mt-0.5 shrink-0" />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t("addressLine1")}
                    <br />
                    {t("addressLine2")}
                  </p>
                </div>
                <div className="flex items-center">
                  <HiMail className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                  <a
                    href="mailto:nedf@nedfmanagement.com"
                    className="text-sm text-gray-600 hover:text-black break-all"
                  >
                    {t("emailUs")}
                  </a>
                </div>
                <div className="flex items-center">
                  <HiPhone className="w-5 h-5 text-gray-500 mr-3 shrink-0" />
                  <span className="text-sm text-gray-600">{t("phone")}</span>
                </div>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-2 mb-6">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-black hover:text-white transition-all w-9 h-9 rounded-full border border-black/20 flex items-center justify-center"
                    aria-label={`Social link ${social.id}`}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>

              {/* Back to top */}
              <div>
                <Link
                  href="#top"
                  className="inline-block px-5 py-2.5 border border-gray-300 rounded-full text-sm text-gray-600 hover:text-black hover:border-gray-600 bg-transparent transition-colors"
                >
                  {t("backToTop")}
                </Link>
              </div>
            </div>
          </div>

          <hr className="h-[1px] border-t-black/10 mt-10 sm:mt-14 mb-5 sm:mb-6" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 mb-2">
            <p className="text-sm text-black/60 text-center sm:text-left">
              {t("allRightsReserved")}
            </p>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-black text-center"
            >
              {t("privacyPolicy")}
            </Link>
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
