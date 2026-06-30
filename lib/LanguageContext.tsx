"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Language, t, getLanguageLabel } from "./i18n";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  getLabel: () => string;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  const translate = useCallback(
    (key: string) => t(key, lang),
    [lang]
  );

  const getLabel = useCallback(() => getLanguageLabel(lang), [lang]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === "en" ? "am" : "en"));
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: translate,
        getLabel,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
