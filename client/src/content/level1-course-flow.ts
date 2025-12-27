// Level 1: Stock Market ki Shuruaat
// Complete 8-Lesson Flow
// Focus: Building beginner confidence

export interface LessonFlow {
  lessonNumber: number;
  slug: string;
  title: string;
  goal: string;
  duration: string;
  keyOutcome: string;
}

export const level1Flow: LessonFlow[] = [
  {
    lessonNumber: 1,
    slug: "stock-market-introduction",
    title: "Stock Market ka Introduction – Bina Darr ke",
    goal: "Darr kam karo, myths clear karo, confidence build karo",
    duration: "7 min",
    keyOutcome: "Beginner ko pata chale ki stock market scary nahi hai",
  },
  {
    lessonNumber: 2,
    slug: "share-kya-hota-hai",
    title: "Share kya hota hai?",
    goal: "Share = company ka chhota hissa – chai dukaan story se samjhao",
    duration: "6 min",
    keyOutcome: "Share khareedna = company ka thoda owner banna",
  },
  {
    lessonNumber: 3,
    slug: "paise-invest-kyu",
    title: "Paise ko invest kyu karna chahiye?",
    goal: "Samjhao ki sirf bachana kaafi nahi – paisa grow hona chahiye",
    duration: "10 min",
    keyOutcome: "Inflation aur purchasing power ka basic concept clear",
  },
  {
    lessonNumber: 4,
    slug: "stock-market-kya-hai",
    title: "Stock market kya hota hai?",
    goal: "Stock market ka simple definition – bazaar jaisa concept",
    duration: "10 min",
    keyOutcome: "Beginner ko pata chale ki stock market ek organized marketplace hai",
  },
  {
    lessonNumber: 5,
    slug: "sensex-nifty",
    title: "Sensex aur Nifty simple samjhaav",
    goal: "Market indicators samjho – thermometer jaisa concept",
    duration: "8 min",
    keyOutcome: "Sensex/Nifty = market ki health report",
  },
  {
    lessonNumber: 6,
    slug: "risk-types",
    title: "Stock market me risk kya hai?",
    goal: "Risk ko samjho – daro mat, manage karo",
    duration: "8 min",
    keyOutcome: "Risk = uncertainty, manage ho sakti hai",
  },
  {
    lessonNumber: 7,
    slug: "investor-vs-trader",
    title: "Investor aur Trader me farak",
    goal: "Long term investing vs short term trading – difference clear",
    duration: "8 min",
    keyOutcome: "Beginners ke liye investing better hai, trading risky",
  },
  {
    lessonNumber: 8,
    slug: "level1-conclusion",
    title: "Level 1 Complete – Ab aage kya?",
    goal: "Summary, motivation, aur Level 2 preview",
    duration: "5 min",
    keyOutcome: "Confidence build, ready for practical learning in Level 2",
  },
];

// Note: The lesson flow now includes 8 lessons with the new "Share kya hota hai?" 
// lesson added as Lesson 2, replacing the previous share-kya-hai (Lesson 4).
// Old structure: Intro → Why Invest → What is Stock Market → Share & Ownership → ...
// New structure: Intro → Share kya hai → Why Invest → What is Stock Market → ...

// Level 1 Overview
export const level1Overview = {
  levelNumber: 1,
  title: "Stock Market ki Shuruaat",
  subtitle: "Basics samjho – Bilkul zero se",
  totalLessons: 8,
  totalDuration: "~66 minutes",
  targetAudience: "Complete beginners with zero stock market knowledge",
  mainGoal: "Remove fear, build confidence, establish foundation",
  prerequisites: "None – sirf padhne ki himmat chahiye",
  outcomes: [
    "Stock market ka darr khatam",
    "Basic concepts clear – share, market, index",
    "Myths debunked – ye jua nahi hai",
    "Expectations set – no tips, sirf knowledge",
    "Ready for Level 2 – practical learning",
  ],
  teachingApproach: [
    "Story-based learning with Rohit and Priya",
    "Simple Hindi, no jargon",
    "Daily life examples",
    "Short lessons (5-10 min each)",
    "One concept per lesson",
    "Reassuring, calm tone",
  ],
};

// Lesson-by-Lesson Summary for Quick Reference
export const level1LessonSummary = [
  {
    lesson: 1,
    oneLineSummary: "Darr kam karo – stock market scary nahi hai",
  },
  {
    lesson: 2,
    oneLineSummary: "Share khareedna = company ka thoda owner banna",
  },
  {
    lesson: 3,
    oneLineSummary: "Sirf bachana kaafi nahi – inflation beats savings",
  },
  {
    lesson: 4,
    oneLineSummary: "Stock market = shares ka organized bazaar",
  },
  {
    lesson: 5,
    oneLineSummary: "Sensex/Nifty = market ka thermometer",
  },
  {
    lesson: 6,
    oneLineSummary: "Risk samjho, manage karo, daro mat",
  },
  {
    lesson: 7,
    oneLineSummary: "Investing = long term, Trading = short term (risky)",
  },
  {
    lesson: 8,
    oneLineSummary: "Foundation ready – ab practical seekhne chalo",
  },
];

// Suggested Additional Content for Each Lesson
export const lessonEnhancements = {
  quizzes: "Each lesson ends with 3-5 simple MCQs to test understanding",
  keyTakeaways: "3-5 bullet points summarizing the lesson",
  nextLessonPreview: "Brief teaser for what's coming next",
  realWorldExamples: "Relatable Indian examples (chai shop, sabzi mandi)",
  mythBusters: "Clear common misconceptions in each lesson",
  progressTracking: "Visual progress bar showing Level 1 completion %",
};
