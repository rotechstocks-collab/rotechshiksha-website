// Level 2 Lesson Content - Hindi (Default)
// Structured for easy translation to all Indian languages
// Proper nouns NOT to translate: Rohit, Priya, Stock, Share, Index, Nifty, Sensex, IPO

import { LessonContent } from "./level1";

// Hindi content for Level 2
export const level2Content: LessonContent = {
  level: 2,
  lessonId: "level-2-stock-index-ipo",
  title: "Level 2: Stock, Index aur IPO – Market ki Asli Tasveer",
  subtitle: "Market ke basic building blocks samjhein",
  scenes: [
    {
      id: "scene-1",
      type: "scene",
      title: "Rohit ki Nayi Curiosity",
      content: [
        "Level 1 complete karne ke baad Rohit ka confidence badh gaya tha.",
        "Lekin jab wo news dekhta, to naye shabd sunai dete:",
        "\"Nifty aaj upar band hua\"",
        "\"Sensex gir gaya\"",
        "Rohit ne Priya se poocha:",
        "\"Ye Nifty aur Sensex kya hote hain?\"",
      ],
    },
    {
      id: "concept-1",
      type: "concept",
      title: "Stock kya hota hai?",
      content: [
        "Priya ne samjhaya:",
        "Jab aap kisi company ka share kharidte ho,",
        "to use stock bhi kaha jata hai.",
        "Share aur stock beginner ke liye lagbhag ek jaise hote hain.",
        "Stock ka matlab hota hai company ka wo hissa jo market me trade hota hai.",
      ],
    },
    {
      id: "scene-2",
      type: "scene",
      title: "Market ka Matlab",
      content: [
        "Rohit ne ek headline padhi:",
        "\"Market aaj strong rahi.\"",
        "Rohit confuse ho gaya:",
        "\"Market ka matlab kaunsi company?\"",
        "Priya boli:",
        "\"Market ka matlab hota hai index.\"",
      ],
    },
    {
      id: "concept-2",
      type: "concept",
      title: "Index kya hota hai?",
      content: [
        "Index top companies ka ek group hota hai",
        "jo market ki overall direction dikhata hai.",
        "Examples:",
        "Nifty 50 – top 50 companies",
        "Sensex – top 30 companies",
        "Agar index upar jata hai,",
        "to market strong mani jaati hai.",
        "Agar index neeche jata hai,",
        "to market weak mani jaati hai.",
      ],
    },
    {
      id: "scene-3",
      type: "scene",
      title: "IPO ki Pehchaan",
      content: [
        "Rohit ne ek aur shabd suna:",
        "\"IPO aa raha hai.\"",
        "Rohit ne Priya se poocha:",
        "\"IPO kya hota hai?\"",
      ],
    },
    {
      id: "concept-3",
      type: "concept",
      title: "IPO kya hota hai?",
      content: [
        "IPO ka matlab hota hai jab koi company",
        "pehli baar stock market me aati hai.",
        "Company public se paisa leti hai",
        "aur apne shares logon ko offer karti hai.",
        "Is process ko IPO kaha jata hai.",
      ],
    },
    {
      id: "concept-4",
      type: "concept",
      title: "IPO me risk kyu hota hai?",
      content: [
        "Priya ne kaha:",
        "Har IPO achha ho, zaruri nahi.",
        "Isliye IPO me invest karne se pehle:",
        "Company ka business samajhna",
        "Profit aur future dekhna",
        "Jaldi decision nahi lena",
        "Ye sab aane wale levels me detail me seekha jayega.",
      ],
    },
    {
      id: "summary",
      type: "summary",
      title: "Is Level me Aapne Seekha",
      content: [
        "Stock kya hota hai",
        "Share aur stock ka relation",
        "Index ka role (Nifty, Sensex)",
        "Market news ka matlab",
        "IPO ka basic concept",
      ],
    },
    {
      id: "next-cta",
      type: "cta",
      title: "Aage Badhein",
      content: [
        "Next: Level 3 – Investment ka plan kaise banate hain?",
      ],
    },
  ],
};

// Labels for UI elements (for translation)
export const level2Labels = {
  levelBadge: "Level 2",
  freeLabel: "Free",
  readingTime: "7 min padhai",
  languagePlaceholder: "Bhasha Chunein",
  comingSoon: "Jaldi Aayega",
  startLearning: "Seekhna Shuru Karein",
  nextLevel: "Agla Level",
  previousLevel: "Pichla Level",
  backToCourses: "Courses par Wapas Jaayein",
  conceptLabel: "Concept",
  storyLabel: "Kahani",
  summaryLabel: "Summary",
};
