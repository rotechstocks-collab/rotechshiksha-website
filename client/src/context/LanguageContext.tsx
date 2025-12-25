import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import enTranslations from "../translations/en.json";

export type Language = "en" | "hi" | "mr" | "ta" | "kn" | "gu" | "te" | "ml" | "fr" | "es" | "ar" | "de" | "ru" | "ur";

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  isRTL?: boolean;
}

export const languages: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "ar", name: "Arabic", nativeName: "العربية", isRTL: true },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "ru", name: "Russian", nativeName: "Русский" },
  { code: "ur", name: "Urdu", nativeName: "اردو", isRTL: true },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getLanguageInfo: () => LanguageOption;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "rotech-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && languages.some(l => l.code === saved)) {
        return saved as Language;
      }
    }
    return "en";
  });

  const [translations, setTranslations] = useState<Record<string, string>>(enTranslations);

  const isRTL = language === "ar" || language === "ur";

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
    
    if (isRTL) {
      document.documentElement.dir = "rtl";
      document.body.classList.add("rtl");
    } else {
      document.documentElement.dir = "ltr";
      document.body.classList.remove("rtl");
    }
    
    if (language === "en") {
      setTranslations(enTranslations);
    } else {
      import(`../translations/${language}.json`)
        .then((module) => {
          setTranslations(module.default);
        })
        .catch(() => {
          setTranslations(enTranslations);
        });
    }
  }, [language, isRTL]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[key] || enTranslations[key as keyof typeof enTranslations] || key;
  };

  const getLanguageInfo = (): LanguageOption => {
    return languages.find(l => l.code === language) || languages[0];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLanguageInfo, isRTL }}>
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
