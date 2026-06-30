"use client";

import { integralCF } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { Target, Eye, Award, Sparkles, Shirt, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    {
      icon: <Award className="w-6 h-6" />,
      titleKey: "aboutValueQuality",
      descKey: "aboutValueQualityDesc",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      titleKey: "aboutValueSustainability",
      descKey: "aboutValueSustainabilityDesc",
    },
    {
      icon: <Shirt className="w-6 h-6" />,
      titleKey: "aboutValueInnovation",
      descKey: "aboutValueInnovationDesc",
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
          <span className="text-black">{t("about")}</span>
        </nav>
      </div>

      <main className="pb-20">
        <div className="max-w-frame mx-auto px-4 xl:px-8">
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-[20px] sm:rounded-[28px] bg-[#f7f6f4] mb-12 sm:mb-16">
            <div className="relative z-10 px-6 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-24 text-center">
              <h1
                className={cn([
                  integralCF.className,
                  "text-[32px] sm:text-[40px] lg:text-[56px] font-bold text-black leading-[1.1] mb-6",
                ])}
              >
                {t("aboutTitle")}
              </h1>
              <p className="text-lg sm:text-xl text-black/60 max-w-2xl mx-auto">
                {t("aboutSubtitle")}
              </p>
            </div>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 sm:mb-16">
            <div className="bg-[#F0F0F0] rounded-[20px] overflow-hidden aspect-[4/3] lg:aspect-auto">
              <Image
                src="/images/header-homepage.png"
                alt="NEDF Design"
                width={600}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2
                className={cn([
                  integralCF.className,
                  "text-2xl sm:text-3xl font-bold text-black mb-6",
                ])}
              >
                {t("aboutStory")}
              </h2>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div className="bg-[#F0F0F0] rounded-[20px] p-6 sm:p-8 lg:p-10">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className={cn([integralCF.className, "text-xl sm:text-2xl font-bold text-black mb-4"])}>
                {t("aboutMission")}
              </h3>
              <p className="text-black/60 text-sm sm:text-base leading-relaxed">
                {t("aboutMissionText")}
              </p>
            </div>
            <div className="bg-[#F0F0F0] rounded-[20px] p-6 sm:p-8 lg:p-10">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-5">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className={cn([integralCF.className, "text-xl sm:text-2xl font-bold text-black mb-4"])}>
                {t("aboutVision")}
              </h3>
              <p className="text-black/60 text-sm sm:text-base leading-relaxed">
                {t("aboutVisionText")}
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-12 sm:mb-16">
            <h2
              className={cn([
                integralCF.className,
                "text-2xl sm:text-3xl font-bold text-black text-center mb-8 sm:mb-10",
              ])}
            >
              {t("aboutValues")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="border border-black/10 rounded-[20px] p-6 sm:p-8 hover:bg-[#F0F0F0] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-5">
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl text-black mb-3">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-black/60 text-sm sm:text-base leading-relaxed">
                    {t(value.descKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="bg-[#F0F0F0] rounded-[20px] p-8 sm:p-12 lg:p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h2
              className={cn([
                integralCF.className,
                "text-2xl sm:text-3xl font-bold text-black mb-4",
              ])}
            >
              {t("aboutTeam")}
            </h2>
            <p className="text-black/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
              {t("aboutTeamDesc")}
            </p>
            <Link
              href="/contact"
              className="inline-block bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-black/80 transition-all"
            >
              {t("contact")}
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

