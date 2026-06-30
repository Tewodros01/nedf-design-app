"use client";

import { integralCF } from "@/app/fonts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/LanguageContext";
import { HiLocationMarker, HiMail, HiPhone } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError(t("fillAllFields"));
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-frame mx-auto px-4 xl:px-0 pt-5 sm:pt-6">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <nav className="flex items-center text-sm text-black/60 mb-8">
          <Link href="/" className="hover:text-black">{t("home")}</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{t("contact")}</span>
        </nav>
      </div>

      <main className="pb-20">
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className={cn([
                integralCF.className,
                "text-[32px] md:text-[40px] font-bold text-black uppercase mb-4",
              ])}
            >
              {t("contactTitle")}
            </h1>
            <p className="text-black/60 text-sm sm:text-base max-w-xl mx-auto">
              {t("contactDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div className="bg-[#F0F0F0] rounded-[20px] p-6 sm:p-8">
                <h3 className="font-bold text-lg sm:text-xl text-black mb-6">
                  {t("contact")}
                </h3>

                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 flex-shrink-0">
                      <HiLocationMarker className="w-5 h-5 text-black/60" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-black mb-1">{t("address")}</p>
                      <p className="text-sm text-black/60 leading-relaxed">
                        {t("addressLine1")}
                        <br />
                        {t("addressLine2")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 flex-shrink-0">
                      <HiMail className="w-5 h-5 text-black/60" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-black mb-1">Email</p>
                      <a
                        href="mailto:nedf@nedfmanagement.com"
                        className="text-sm text-black/60 hover:text-black"
                      >
                        {t("emailUs")}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-4 flex-shrink-0">
                      <HiPhone className="w-5 h-5 text-black/60" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-black mb-1">Phone</p>
                      <p className="text-sm text-black/60">
                        {t("phone")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F0F0F0] rounded-[20px] p-6 sm:p-8">
                <h3 className="font-bold text-lg sm:text-xl text-black mb-4">
                  {t("language")}
                </h3>
                <div className="flex items-center space-x-3">
                  <Link
                    href="#"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-[#F0F0F0] rounded-[20px] p-8 sm:p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl text-black mb-3">
                    {t("contactSuccess")}
                  </h3>
                  <Button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="bg-black text-white rounded-full px-8 py-3 mt-4"
                  >
                    {t("contactSend")}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-[#F0F0F0] rounded-[20px] p-6 sm:p-8 space-y-5">
                  {error && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-black/70 mb-1.5">
                        {t("contactName")}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t("contactNamePlaceholder")}
                        className="w-full px-4 py-3 bg-white border border-transparent rounded-full focus:outline-none focus:border-black/30 text-sm placeholder:text-black/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black/70 mb-1.5">
                        {t("contactEmail")}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t("contactEmailPlaceholder")}
                        className="w-full px-4 py-3 bg-white border border-transparent rounded-full focus:outline-none focus:border-black/30 text-sm placeholder:text-black/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1.5">
                      {t("contactSubject")}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t("contactSubjectPlaceholder")}
                      className="w-full px-4 py-3 bg-white border border-transparent rounded-full focus:outline-none focus:border-black/30 text-sm placeholder:text-black/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black/70 mb-1.5">
                      {t("contactMessage")}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t("contactMessagePlaceholder")}
                      rows={5}
                      className="w-full px-4 py-3 bg-white border border-transparent rounded-[20px] focus:outline-none focus:border-black/30 text-sm placeholder:text-black/30 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white rounded-full py-3 h-12 font-medium text-sm hover:bg-black/80 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send size={16} />
                        {t("contactSend")}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
