"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LanguageMode } from "@/types/curriculum";

type LanguageContextValue = {
  language: LanguageMode;
  setLanguage: (value: LanguageMode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageMode>(() => {
    if (typeof window === "undefined") {
      return "both";
    }

    const saved = window.localStorage.getItem("fp-language") as LanguageMode | null;
    return saved === "zh" || saved === "en" || saved === "both" ? saved : "both";
  });

  useEffect(() => {
    window.localStorage.setItem("fp-language", language);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
