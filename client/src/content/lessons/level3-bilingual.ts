// Level 3 Lesson Content - Bilingual (Hindi default + English)
// Proper nouns NOT to translate: Rohit, Priya, Stock, Share, Index, Nifty, Sensex, IPO

import { BilingualLessonContent } from "./types";

export const level3Bilingual: BilingualLessonContent = {
  hi: {
    level: 3,
    lessonId: "level-3-investment-plan",
    title: "Level 3: Investment ka Plan kaise banate hain?",
    subtitle: "Bina plan invest karna sabse badi galti hai",
    scenes: [
      {
        id: "scene-1",
        type: "scene",
        title: "Rohit ki Pehli Galti",
        speaker: "narrator",
        content: [
          "Rohit ne Level 1 aur Level 2 complete kar liye the.",
          "Usse stock, index, aur IPO ka basic idea aa gaya tha.",
          "Ek din usne news dekhi:",
          "\"Ye stock kal 10% upar gaya.\"",
          "Excitement me Rohit ne bina soche invest kar diya.",
        ],
      },
      {
        id: "scene-1-result",
        type: "scene",
        speaker: "narrator",
        content: [
          "2 din baad market thoda gira.",
          "Rohit ka portfolio red ho gaya.",
        ],
      },
      {
        id: "scene-1-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Mujhe stock ka naam pata tha...",
          "Par maine ye nahi socha ki kyun invest kar raha hoon.",
          "Kya maine galti kar di?",
        ],
      },
      {
        id: "scene-2",
        type: "scene",
        title: "Priya ka Entry",
        speaker: "priya",
        content: [
          "Rohit, stock lena galat nahi tha.",
          "Par bina plan invest karna hi sabse badi problem hai.",
        ],
      },
      {
        id: "concept-1",
        type: "concept",
        title: "Plan ka Importance",
        content: [
          "Knowledge milne ka matlab success nahi hota.",
          "Plan banaana zaroori hai.",
          "Plan = Safety + Confidence",
        ],
      },
      {
        id: "scene-3-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Soch, agar tu bina GPS ke travel karega, to kya hoga?",
          "Tu bhatak jayega.",
          "Investment bhi waise hi hai.",
        ],
      },
      {
        id: "concept-2",
        type: "concept",
        title: "Investment Plan kya hota hai?",
        content: [
          "Investment plan ka matlab hai khud se ye sawaal poochna:",
          "Main kyun invest kar raha hoon?",
          "Mera goal kya hai?",
          "Kitna time ke liye invest karunga?",
          "Kitna risk main le sakta hoon?",
        ],
      },
      {
        id: "concept-2-simple",
        type: "concept",
        title: "Simple Rule",
        content: [
          "Plan nahi hai to panic hogi.",
          "Plan hai to patience rahega.",
        ],
      },
      {
        id: "scene-4",
        type: "scene",
        title: "Rohit ki Samajh",
        speaker: "priya",
        content: [
          "Agar tu 5 saal baad ghar ke liye paise jod raha hai,",
          "to tera plan short-term trading jaisa nahi hoga.",
        ],
      },
      {
        id: "scene-4-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Matlab invest karna pehle, sochna baad me nahi hota...",
          "Pehle plan, phir investment hoti hai.",
        ],
      },
      {
        id: "scene-4-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Bilkul sahi! Ab tu investor ki tarah soch raha hai.",
        ],
      },
      {
        id: "concept-3",
        type: "concept",
        title: "Investment Planning ke 4 Pillars",
        content: [
          "1. Goal – Paise kyun chahiye? (Ghar, car, retirement?)",
          "2. Time – Kitne saal baad chahiye?",
          "3. Risk Capacity – Kitna loss afford kar sakte ho?",
          "4. Consistency – Regularly invest karte raho",
        ],
      },
      {
        id: "scene-5-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Ab mujhe dar nahi lag raha.",
          "Kyunki ab main blindly invest nahi kar raha.",
        ],
      },
      {
        id: "scene-5-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Perfect!",
          "Ab tum investor ki tarah soch rahe ho, gambler ki tarah nahi.",
        ],
      },
      {
        id: "summary",
        type: "summary",
        title: "Is Level me Aapne Kya Seekha",
        content: [
          "Investment plan ka matlab kya hota hai",
          "Goal-based investing ki importance",
          "Risk ko samajhna zaroori hai",
          "Emotional mistakes se kaise bachein",
        ],
      },
    ],
  },
  en: {
    level: 3,
    lessonId: "level-3-investment-plan",
    title: "Level 3: How to Make an Investment Plan?",
    subtitle: "Investing without a plan is the biggest mistake",
    scenes: [
      {
        id: "scene-1",
        type: "scene",
        title: "Rohit's First Mistake",
        speaker: "narrator",
        content: [
          "Rohit had completed Level 1 and Level 2.",
          "He understood the basics of stock, index, and IPO.",
          "One day he saw a news headline:",
          "\"This stock went up 10% yesterday.\"",
          "In excitement, Rohit invested without thinking.",
        ],
      },
      {
        id: "scene-1-result",
        type: "scene",
        speaker: "narrator",
        content: [
          "2 days later, the market dipped a bit.",
          "Rohit's portfolio turned red.",
        ],
      },
      {
        id: "scene-1-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "I knew the stock name...",
          "But I didn't think about why I was investing.",
          "Did I make a mistake?",
        ],
      },
      {
        id: "scene-2",
        type: "scene",
        title: "Priya's Entry",
        speaker: "priya",
        content: [
          "Rohit, buying a stock wasn't wrong.",
          "But investing without a plan is the biggest problem.",
        ],
      },
      {
        id: "concept-1",
        type: "concept",
        title: "Importance of a Plan",
        content: [
          "Having knowledge doesn't mean success.",
          "Making a plan is essential.",
          "Plan = Safety + Confidence",
        ],
      },
      {
        id: "scene-3-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Think about it – if you travel without GPS, what happens?",
          "You get lost.",
          "Investing works the same way.",
        ],
      },
      {
        id: "concept-2",
        type: "concept",
        title: "What is an Investment Plan?",
        content: [
          "An investment plan means asking yourself these questions:",
          "Why am I investing?",
          "What is my goal?",
          "For how long will I invest?",
          "How much risk can I take?",
        ],
      },
      {
        id: "concept-2-simple",
        type: "concept",
        title: "Simple Rule",
        content: [
          "No plan means panic.",
          "With a plan comes patience.",
        ],
      },
      {
        id: "scene-4",
        type: "scene",
        title: "Rohit's Understanding",
        speaker: "priya",
        content: [
          "If you're saving for a house in 5 years,",
          "your plan shouldn't be like short-term trading.",
        ],
      },
      {
        id: "scene-4-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "So investing first, thinking later doesn't work...",
          "First plan, then invest.",
        ],
      },
      {
        id: "scene-4-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Exactly! Now you're thinking like an investor.",
        ],
      },
      {
        id: "concept-3",
        type: "concept",
        title: "4 Pillars of Investment Planning",
        content: [
          "1. Goal – Why do you need the money? (House, car, retirement?)",
          "2. Time – How many years until you need it?",
          "3. Risk Capacity – How much loss can you afford?",
          "4. Consistency – Keep investing regularly",
        ],
      },
      {
        id: "scene-5-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Now I'm not scared anymore.",
          "Because I'm not investing blindly.",
        ],
      },
      {
        id: "scene-5-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Perfect!",
          "Now you're thinking like an investor, not a gambler.",
        ],
      },
      {
        id: "summary",
        type: "summary",
        title: "What You Learned in This Level",
        content: [
          "What an investment plan means",
          "Importance of goal-based investing",
          "Understanding risk is essential",
          "How to avoid emotional mistakes",
        ],
      },
    ],
  },
};
