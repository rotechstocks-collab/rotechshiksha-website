// Level 1 Lesson Content - Bilingual (Hindi default + English)
// Proper nouns NOT to translate: Rohit, Priya, Stock Market, Share, Nifty, Sensex

import { BilingualLessonContent } from "./types";

export const level1Bilingual: BilingualLessonContent = {
  hi: {
    level: 1,
    lessonId: "level-1-introduction",
    title: "Level 1: Stock Market ki Shuruaat – Dar se Samajh Tak",
    subtitle: "Apni investment journey ki pehli seedhi",
    scenes: [
      {
        id: "scene-1",
        type: "scene",
        title: "Rohit ki Kahani",
        speaker: "narrator",
        content: [
          "Rohit ek normal private job karta tha.",
          "Salary aati thi, kharch ho jaati thi.",
          "Savings bank me padi rehti thi, lekin wo badh nahi rahi thi.",
          "Ek din usne office me suna:",
        ],
      },
      {
        id: "scene-1-dialogue",
        type: "scene",
        speaker: "narrator",
        content: [
          "\"Maine stock market me invest kiya aur achha return mila.\"",
        ],
      },
      {
        id: "scene-1-rohit-thoughts",
        type: "scene",
        speaker: "rohit",
        content: [
          "Stock market hota kya hai?",
          "Kya ye sirf ameer logon ke liye hota hai?",
          "Paise doob gaye to kya hoga?",
        ],
      },
      {
        id: "scene-2",
        type: "scene",
        title: "Priya ki Salah",
        speaker: "narrator",
        content: [
          "Rohit ne Priya se poocha.",
          "Priya ne shaant aur simple shabdon me kaha:",
        ],
      },
      {
        id: "scene-2-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Stock market koi gambling nahi hai.",
          "Ye companies ke business me hissa lene ka tareeqa hai.",
        ],
      },
      {
        id: "concept-1",
        type: "concept",
        title: "Stock Market kya hota hai?",
        content: [
          "Stock market wo jagah hai jahan companies apne business ko badhane ke liye shares logon ko bechti hain.",
          "Jab aap share kharidte ho, aap company ke chhote se malik ban jaate ho.",
        ],
      },
      {
        id: "concept-2",
        type: "concept",
        title: "Share ka matlab",
        content: [
          "Share ka matlab hota hai company ke business ka ek chhota sa hissa.",
          "Jaise-jaise company grow karti hai, share ki value badh sakti hai.",
        ],
      },
      {
        id: "concept-3",
        type: "concept",
        title: "Share price upar–neeche kyun hoti hai?",
        content: [
          "Agar company achha kaam karti hai aur log us par bharosa karte hain, to share ki demand badhti hai aur price upar jaati hai.",
          "Agar company ka performance kharab ho, to price gir sakti hai.",
        ],
      },
      {
        id: "concept-4",
        type: "concept",
        title: "Risk ka matlab",
        content: [
          "Risk ka matlab paisa khona nahi hota.",
          "Risk ka matlab hota hai bina samjhe decision lena.",
          "Jab hum seekh kar aur planning ke saath decision lete hain, to risk kam ho jaata hai.",
        ],
      },
      {
        id: "scene-3",
        type: "scene",
        title: "Rohit ka Realization",
        speaker: "rohit",
        content: [
          "Stock market mushkil nahi hai, bas mujhe iske basics samajhne the.",
        ],
      },
      {
        id: "scene-3-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Isliye hum step-by-step seekhenge.",
        ],
      },
      {
        id: "summary",
        type: "summary",
        title: "Is Level me Aapne Seekha",
        content: [
          "Stock market kya hota hai",
          "Share ka matlab",
          "Share price kaise change hoti hai",
          "Investment aur gambling ka difference",
          "Risk ka real meaning",
        ],
      },
      {
        id: "next-cta",
        type: "cta",
        title: "Aage Badhein",
        content: [
          "Next: Level 2 – Stock, Index aur IPO kya hote hain?",
        ],
      },
    ],
  },
  en: {
    level: 1,
    lessonId: "level-1-introduction",
    title: "Level 1: Getting Started with Stock Market – From Fear to Understanding",
    subtitle: "The first step of your investment journey",
    scenes: [
      {
        id: "scene-1",
        type: "scene",
        title: "Rohit's Story",
        speaker: "narrator",
        content: [
          "Rohit had a regular private job.",
          "Salary would come in, expenses would go out.",
          "Savings were sitting in the bank, but they weren't growing.",
          "One day he heard someone at office say:",
        ],
      },
      {
        id: "scene-1-dialogue",
        type: "scene",
        speaker: "narrator",
        content: [
          "\"I invested in the stock market and got good returns.\"",
        ],
      },
      {
        id: "scene-1-rohit-thoughts",
        type: "scene",
        speaker: "rohit",
        content: [
          "What exactly is the stock market?",
          "Is it only for rich people?",
          "What if I lose my money?",
        ],
      },
      {
        id: "scene-2",
        type: "scene",
        title: "Priya's Advice",
        speaker: "narrator",
        content: [
          "Rohit asked Priya about it.",
          "Priya explained in calm, simple words:",
        ],
      },
      {
        id: "scene-2-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "The stock market is not gambling.",
          "It's a way to own a piece of companies' businesses.",
        ],
      },
      {
        id: "concept-1",
        type: "concept",
        title: "What is Stock Market?",
        content: [
          "The stock market is a place where companies sell shares to people to grow their business.",
          "When you buy a share, you become a small owner of that company.",
        ],
      },
      {
        id: "concept-2",
        type: "concept",
        title: "What is a Share?",
        content: [
          "A share means a small piece of a company's business.",
          "As the company grows, the value of the share can increase.",
        ],
      },
      {
        id: "concept-3",
        type: "concept",
        title: "Why do share prices go up and down?",
        content: [
          "If a company performs well and people trust it, demand for shares increases and the price goes up.",
          "If the company's performance is poor, the price can fall.",
        ],
      },
      {
        id: "concept-4",
        type: "concept",
        title: "What does Risk really mean?",
        content: [
          "Risk doesn't mean losing money.",
          "Risk means making decisions without understanding.",
          "When we learn and plan before deciding, risk becomes manageable.",
        ],
      },
      {
        id: "scene-3",
        type: "scene",
        title: "Rohit's Realization",
        speaker: "rohit",
        content: [
          "The stock market isn't difficult, I just needed to understand the basics.",
        ],
      },
      {
        id: "scene-3-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "That's why we'll learn step by step.",
        ],
      },
      {
        id: "summary",
        type: "summary",
        title: "What You Learned in This Level",
        content: [
          "What is the stock market",
          "What a share means",
          "How share prices change",
          "Difference between investment and gambling",
          "The real meaning of risk",
        ],
      },
      {
        id: "next-cta",
        type: "cta",
        title: "Continue Learning",
        content: [
          "Next: Level 2 – What are Stock, Index and IPO?",
        ],
      },
    ],
  },
};
