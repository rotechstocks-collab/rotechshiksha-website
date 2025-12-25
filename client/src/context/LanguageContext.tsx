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
const USER_SELECTED_KEY = "rotech-language-user-selected";

// Detect browser language and map to supported languages
function detectBrowserLanguage(): Language {
  if (typeof window === "undefined") return "en";
  
  const browserLang = navigator.language || (navigator as any).userLanguage || "en";
  const langCode = browserLang.split("-")[0].toLowerCase();
  
  // Map browser language codes to our supported languages
  const languageMap: Record<string, Language> = {
    en: "en",
    hi: "hi",
    mr: "mr",
    ta: "ta",
    kn: "kn",
    gu: "gu",
    te: "te",
    ml: "ml",
    fr: "fr",
    es: "es",
    ar: "ar",
    de: "de",
    ru: "ru",
    ur: "ur"
  };
  
  return languageMap[langCode] || "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      // Check if user has manually selected a language before
      const userSelected = localStorage.getItem(USER_SELECTED_KEY);
      const saved = localStorage.getItem(STORAGE_KEY);
      
      if (userSelected === "true" && saved && languages.some(l => l.code === saved)) {
        return saved as Language;
      }
      
      // Auto-detect from browser on first visit
      const detected = detectBrowserLanguage();
      return detected;
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
    // Mark that user has manually selected a language
    localStorage.setItem(USER_SELECTED_KEY, "true");
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (translation) return translation;
    
    // Fallback to English
    const englishFallback = enTranslations[key as keyof typeof enTranslations];
    if (englishFallback) {
      // Log warning for missing translation in development
      if (process.env.NODE_ENV === "development" && language !== "en") {
        console.warn(`[i18n] Missing translation for key "${key}" in language "${language}"`);
      }
      return englishFallback;
    }
    
    // Return key if no translation found
    console.warn(`[i18n] Translation key not found: "${key}"`);
    return key;
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
