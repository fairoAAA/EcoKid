import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Language } from "./types";
import { translations, TranslationKey } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** UI matnini joriy tilda qaytaradi */
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "ecokids:language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "uz";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "uz" || stored === "ru" || stored === "en") return stored;
  } catch {
    // localStorage mavjud bo'lmasa (masalan, xususiy rejim) - standart tilga qaytamiz
  }
  return "uz";
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // saqlab bo'lmasa ham ilova ishlashda davom etsin
    }
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const t = (key: TranslationKey): string => {
    return translations[language][key] ?? translations.uz[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage LanguageProvider ichida ishlatilishi kerak");
  return ctx;
};
