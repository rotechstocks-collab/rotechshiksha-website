// Level 2 Lesson Content - Bilingual (Hindi default + English)
// Proper nouns NOT to translate: Rohit, Priya, Stock, Share, Index, Nifty, Sensex, IPO

import { BilingualLessonContent } from "./types";

export const level2Bilingual: BilingualLessonContent = {
  hi: {
    level: 2,
    lessonId: "level-2-stock-index-ipo",
    title: "Level 2: Stock, Index aur IPO – Market ki Asli Tasveer",
    subtitle: "Market ke basic building blocks samjhein",
    scenes: [
      {
        id: "scene-1",
        type: "scene",
        title: "Rohit ki Nayi Curiosity",
        speaker: "narrator",
        content: [
          "Level 1 complete karne ke baad Rohit ka confidence badh gaya tha.",
          "Lekin jab wo news dekhta, to naye shabd sunai dete:",
          "\"Nifty aaj upar band hua\"",
          "\"Sensex gir gaya\"",
        ],
      },
      {
        id: "scene-1-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Ye Nifty aur Sensex kya hote hain?",
        ],
      },
      {
        id: "concept-1",
        type: "concept",
        title: "Stock kya hota hai?",
        speaker: "priya",
        content: [
          "Jab aap kisi company ka share kharidte ho, to use stock bhi kaha jata hai.",
          "Share aur stock beginner ke liye lagbhag ek jaise hote hain.",
          "Stock ka matlab hota hai company ka wo hissa jo market me trade hota hai.",
        ],
      },
      {
        id: "scene-2",
        type: "scene",
        title: "Market ka Matlab",
        speaker: "narrator",
        content: [
          "Rohit ne ek headline padhi:",
          "\"Market aaj strong rahi.\"",
        ],
      },
      {
        id: "scene-2-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Market ka matlab kaunsi company?",
        ],
      },
      {
        id: "scene-2-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Market ka matlab hota hai index.",
        ],
      },
      {
        id: "concept-2",
        type: "concept",
        title: "Index kya hota hai?",
        content: [
          "Index top companies ka ek group hota hai jo market ki overall direction dikhata hai.",
          "Examples:",
          "Nifty 50 – top 50 companies",
          "Sensex – top 30 companies",
          "Agar index upar jata hai, to market strong mani jaati hai.",
          "Agar index neeche jata hai, to market weak mani jaati hai.",
        ],
      },
      {
        id: "scene-3",
        type: "scene",
        title: "IPO ki Pehchaan",
        speaker: "narrator",
        content: [
          "Rohit ne ek aur shabd suna:",
          "\"IPO aa raha hai.\"",
        ],
      },
      {
        id: "scene-3-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "IPO kya hota hai?",
        ],
      },
      {
        id: "concept-3",
        type: "concept",
        title: "IPO kya hota hai?",
        content: [
          "IPO ka matlab hota hai jab koi company pehli baar stock market me aati hai.",
          "Company public se paisa leti hai aur apne shares logon ko offer karti hai.",
          "Is process ko IPO kaha jata hai.",
        ],
      },
      {
        id: "concept-4",
        type: "concept",
        title: "IPO me risk kyu hota hai?",
        speaker: "priya",
        content: [
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
  },
  en: {
    level: 2,
    lessonId: "level-2-stock-index-ipo",
    title: "Level 2: Stock, Index and IPO – The Real Picture of the Market",
    subtitle: "Understand the basic building blocks of the market",
    scenes: [
      {
        id: "scene-1",
        type: "scene",
        title: "Rohit's New Curiosity",
        speaker: "narrator",
        content: [
          "After completing Level 1, Rohit's confidence had grown.",
          "But when he watched the news, he heard new words:",
          "\"Nifty closed higher today\"",
          "\"Sensex fell\"",
        ],
      },
      {
        id: "scene-1-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "What are Nifty and Sensex?",
        ],
      },
      {
        id: "concept-1",
        type: "concept",
        title: "What is a Stock?",
        speaker: "priya",
        content: [
          "When you buy a share of any company, it's also called a stock.",
          "For beginners, share and stock mean almost the same thing.",
          "Stock means the portion of a company that is traded in the market.",
        ],
      },
      {
        id: "scene-2",
        type: "scene",
        title: "What Does 'Market' Mean?",
        speaker: "narrator",
        content: [
          "Rohit read a headline:",
          "\"Market remained strong today.\"",
        ],
      },
      {
        id: "scene-2-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Which company does 'market' refer to?",
        ],
      },
      {
        id: "scene-2-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "'Market' means the index.",
        ],
      },
      {
        id: "concept-2",
        type: "concept",
        title: "What is an Index?",
        content: [
          "An index is a group of top companies that shows the overall direction of the market.",
          "Examples:",
          "Nifty 50 – top 50 companies",
          "Sensex – top 30 companies",
          "If the index goes up, the market is considered strong.",
          "If the index goes down, the market is considered weak.",
        ],
      },
      {
        id: "scene-3",
        type: "scene",
        title: "Understanding IPO",
        speaker: "narrator",
        content: [
          "Rohit heard another word:",
          "\"An IPO is coming.\"",
        ],
      },
      {
        id: "scene-3-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "What is an IPO?",
        ],
      },
      {
        id: "concept-3",
        type: "concept",
        title: "What is an IPO?",
        content: [
          "IPO means when a company enters the stock market for the first time.",
          "The company raises money from the public and offers its shares to people.",
          "This process is called an IPO (Initial Public Offering).",
        ],
      },
      {
        id: "concept-4",
        type: "concept",
        title: "Why is there risk in IPOs?",
        speaker: "priya",
        content: [
          "Not every IPO is good.",
          "Before investing in an IPO:",
          "Understand the company's business",
          "Look at profits and future prospects",
          "Don't make hasty decisions",
          "All of this will be covered in detail in upcoming levels.",
        ],
      },
      {
        id: "summary",
        type: "summary",
        title: "What You Learned in This Level",
        content: [
          "What is a stock",
          "The relationship between share and stock",
          "The role of index (Nifty, Sensex)",
          "What market news means",
          "Basic concept of IPO",
        ],
      },
      {
        id: "next-cta",
        type: "cta",
        title: "Continue Learning",
        content: [
          "Next: Level 3 – How to make an investment plan?",
        ],
      },
    ],
  },
};
