import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LessonLanguage, lessonLabels, LessonLabels } from "@/content/lessons/types";

interface LessonLanguageContextType {
  lessonLang: LessonLanguage;
  setLessonLang: (lang: LessonLanguage) => void;
  labels: LessonLabels;
  toggleLanguage: () => void;
}

const LessonLanguageContext = createContext<LessonLanguageContextType | undefined>(undefined);

const STORAGE_KEY = "rotech-lesson-language";

interface LessonLanguageProviderProps {
  children: ReactNode;
}

export function LessonLanguageProvider({ children }: LessonLanguageProviderProps) {
  const [lessonLang, setLessonLangState] = useState<LessonLanguage>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "hi") {
        return saved;
      }
    }
    return "hi"; // Default to Hindi
  });

  const setLessonLang = (lang: LessonLanguage) => {
    setLessonLangState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const toggleLanguage = () => {
    const newLang = lessonLang === "hi" ? "en" : "hi";
    setLessonLang(newLang);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lessonLang);
  }, [lessonLang]);

  const labels = lessonLabels[lessonLang];

  return (
    <LessonLanguageContext.Provider value={{ lessonLang, setLessonLang, labels, toggleLanguage }}>
      {children}
    </LessonLanguageContext.Provider>
  );
}

export function useLessonLanguage() {
  const context = useContext(LessonLanguageContext);
  if (context === undefined) {
    throw new Error("useLessonLanguage must be used within a LessonLanguageProvider");
  }
  return context;
}
