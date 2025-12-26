// Level 4 Lesson Content - Bilingual (Hindi default + English)
// Proper nouns NOT to translate: Rohit, Priya, Stock, Share, Index, Nifty, Sensex, IPO

import { BilingualLessonContent } from "./types";

export const level4Bilingual: BilingualLessonContent = {
  hi: {
    level: 4,
    lessonId: "level-4-risk-management",
    title: "Level 4: Risk Management – Loss se kaise bacha jaye?",
    subtitle: "Market gir bhi jaye, to panic nahi karunga",
    scenes: [
      {
        id: "scene-1",
        type: "scene",
        title: "Market Gir Gaya",
        speaker: "narrator",
        content: [
          "Subah Rohit phone uthata hai.",
          "Portfolio app open karta hai.",
          "Red color... loss dikh raha hai.",
        ],
      },
      {
        id: "scene-1-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Kal tak sab theek tha...",
          "Aaj achanak ye kya ho gaya?",
        ],
      },
      {
        id: "scene-1-panic",
        type: "scene",
        speaker: "narrator",
        content: [
          "Uske haath kaanp rahe hain.",
          "Dil me ek hi sawal: \"Bech du kya?\"",
        ],
      },
      {
        id: "scene-2",
        type: "scene",
        title: "Rohit ka Dar",
        speaker: "rohit",
        content: [
          "Agar aur gir gaya to?",
          "Mera paisa doob gaya to?",
          "Main galti to nahi kar raha?",
        ],
      },
      {
        id: "concept-fear",
        type: "concept",
        title: "Har Beginner ka Real Fear",
        content: [
          "Ye sawaal har naye investor ke mann me aate hain.",
          "Ye normal hai. Lekin panic me decision lena galat hai.",
        ],
      },
      {
        id: "scene-3",
        type: "scene",
        title: "Priya ka Calm Entry",
        speaker: "priya",
        content: [
          "Rohit, market ka girna normal hai.",
          "Problem loss nahi hota...",
          "Problem panic decision hota hai.",
        ],
      },
      {
        id: "scene-3-result",
        type: "scene",
        speaker: "narrator",
        content: [
          "Rohit thoda shaant hota hai.",
        ],
      },
      {
        id: "concept-1",
        type: "concept",
        title: "Risk kya hota hai?",
        content: [
          "Risk ka matlab ye NAHI:",
          "Paisa zaroor doobega",
          "",
          "Risk ka matlab HOTA HAI:",
          "Price ka upar-neeche hona",
        ],
      },
      {
        id: "scene-4-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Jis din tumne invest kiya,",
          "usi din tumne accept kiya",
          "ki market kabhi upar, kabhi neeche jayega.",
        ],
      },
      {
        id: "concept-2",
        type: "concept",
        title: "Risk Management kya hota hai?",
        content: [
          "Risk management ka matlab hai:",
          "Loss se bhagna nahi,",
          "Loss ke liye ready rehna.",
          "",
          "Simple shabdo me:",
          "Pehle socho agar galat hua to kya karna hai.",
        ],
      },
      {
        id: "scene-5-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Matlab problem market nahi,",
          "meri taiyari thi.",
        ],
      },
      {
        id: "scene-5-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Bilkul sahi!",
        ],
      },
      {
        id: "concept-3",
        type: "concept",
        title: "Beginner ke liye 4 Simple Risk Rules",
        content: [
          "1. Sirf wahi paisa lagao jo turant na chahiye",
          "2. Ek hi jagah sab paisa mat lagao",
          "3. Roz portfolio dekhkar panic mat karo",
          "4. Plan bana ke rakho – kab exit karna hai",
        ],
      },
      {
        id: "scene-6-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Market gire ya uthe,",
          "ab mujhe control me feel hota hai.",
        ],
      },
      {
        id: "scene-6-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Perfect!",
          "Ab tum sirf investor nahi,",
          "disciplined investor ban rahe ho.",
        ],
      },
      {
        id: "summary",
        type: "summary",
        title: "Is Level me Aapne Kya Seekha",
        content: [
          "Risk ka real meaning kya hai",
          "Panic decision se kaise bachein",
          "Loss se darna nahi, manage karna seekho",
          "Emotional control ka importance",
        ],
      },
    ],
  },
  en: {
    level: 4,
    lessonId: "level-4-risk-management",
    title: "Level 4: Risk Management – How to Avoid Losses?",
    subtitle: "Even if the market falls, I won't panic",
    scenes: [
      {
        id: "scene-1",
        type: "scene",
        title: "The Market Crashed",
        speaker: "narrator",
        content: [
          "Rohit picks up his phone in the morning.",
          "He opens the portfolio app.",
          "Red color everywhere... showing losses.",
        ],
      },
      {
        id: "scene-1-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Everything was fine yesterday...",
          "What happened suddenly today?",
        ],
      },
      {
        id: "scene-1-panic",
        type: "scene",
        speaker: "narrator",
        content: [
          "His hands are trembling.",
          "One question in his mind: \"Should I sell?\"",
        ],
      },
      {
        id: "scene-2",
        type: "scene",
        title: "Rohit's Fear",
        speaker: "rohit",
        content: [
          "What if it falls more?",
          "What if I lose all my money?",
          "Am I making a mistake?",
        ],
      },
      {
        id: "concept-fear",
        type: "concept",
        title: "Every Beginner's Real Fear",
        content: [
          "These questions come to every new investor's mind.",
          "This is normal. But making decisions in panic is wrong.",
        ],
      },
      {
        id: "scene-3",
        type: "scene",
        title: "Priya's Calm Entry",
        speaker: "priya",
        content: [
          "Rohit, markets falling is normal.",
          "Loss is not the problem...",
          "Panic decisions are the problem.",
        ],
      },
      {
        id: "scene-3-result",
        type: "scene",
        speaker: "narrator",
        content: [
          "Rohit calms down a bit.",
        ],
      },
      {
        id: "concept-1",
        type: "concept",
        title: "What is Risk?",
        content: [
          "Risk does NOT mean:",
          "You will definitely lose money",
          "",
          "Risk MEANS:",
          "Prices going up and down",
        ],
      },
      {
        id: "scene-4-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "The day you invested,",
          "that's when you accepted",
          "that markets will go up and down.",
        ],
      },
      {
        id: "concept-2",
        type: "concept",
        title: "What is Risk Management?",
        content: [
          "Risk management means:",
          "Not running away from losses,",
          "Being ready for losses.",
          "",
          "In simple words:",
          "Think first what to do if things go wrong.",
        ],
      },
      {
        id: "scene-5-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "So the problem wasn't the market,",
          "it was my preparation.",
        ],
      },
      {
        id: "scene-5-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Exactly right!",
        ],
      },
      {
        id: "concept-3",
        type: "concept",
        title: "4 Simple Risk Rules for Beginners",
        content: [
          "1. Only invest money you don't need immediately",
          "2. Don't put all money in one place",
          "3. Don't check portfolio daily and panic",
          "4. Have a plan ready – when to exit",
        ],
      },
      {
        id: "scene-6-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Whether the market falls or rises,",
          "now I feel in control.",
        ],
      },
      {
        id: "scene-6-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Perfect!",
          "Now you're not just an investor,",
          "you're becoming a disciplined investor.",
        ],
      },
      {
        id: "summary",
        type: "summary",
        title: "What You Learned in This Level",
        content: [
          "What risk really means",
          "How to avoid panic decisions",
          "Don't fear losses, learn to manage them",
          "Importance of emotional control",
        ],
      },
    ],
  },
};
