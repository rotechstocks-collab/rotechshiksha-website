// Lesson Content Types - Structured for multi-language support
// Proper nouns NOT to translate: Rohit, Priya, Stock, Share, Index, Nifty, Sensex, IPO

export type LessonLanguage = "hi" | "en";

export interface LessonScene {
  id: string;
  type: "scene" | "concept" | "summary" | "cta";
  title?: string;
  speaker?: "rohit" | "priya" | "narrator"; // For dialogue attribution
  content: string[];
}

export interface LessonContent {
  level: number;
  lessonId: string;
  title: string;
  subtitle?: string;
  scenes: LessonScene[];
}

export interface LessonLabels {
  levelBadge: string;
  freeLabel: string;
  readingTime: string;
  languageSelector: string;
  startLearning: string;
  nextLevel: string;
  previousLevel: string;
  backToCourses: string;
  conceptLabel: string;
  storyLabel: string;
  summaryLabel: string;
  rohitSays: string;
  priyaSays: string;
}

export interface BilingualLessonContent {
  hi: LessonContent;
  en: LessonContent;
}

export interface BilingualLabels {
  hi: LessonLabels;
  en: LessonLabels;
}

// Default labels for Hindi and English
export const lessonLabels: BilingualLabels = {
  hi: {
    levelBadge: "Level",
    freeLabel: "Free",
    readingTime: "min padhai",
    languageSelector: "Bhasha",
    startLearning: "Seekhna Shuru Karein",
    nextLevel: "Agla Level",
    previousLevel: "Pichla Level",
    backToCourses: "Courses par Wapas",
    conceptLabel: "Concept",
    storyLabel: "Kahani",
    summaryLabel: "Summary",
    rohitSays: "Rohit:",
    priyaSays: "Priya:",
  },
  en: {
    levelBadge: "Level",
    freeLabel: "Free",
    readingTime: "min read",
    languageSelector: "Language",
    startLearning: "Start Learning",
    nextLevel: "Next Level",
    previousLevel: "Previous Level",
    backToCourses: "Back to Courses",
    conceptLabel: "Concept",
    storyLabel: "Story",
    summaryLabel: "Summary",
    rohitSays: "Rohit:",
    priyaSays: "Priya:",
  },
};
