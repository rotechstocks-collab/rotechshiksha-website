// Level 5 Lesson Content - Bilingual (Hindi default + English)
// Proper nouns NOT to translate: Rohit, Priya, Stock, Share, Index, Nifty, Sensex, IPO, SIP, Mutual Fund

import { BilingualLessonContent } from "./types";

export const level5Bilingual: BilingualLessonContent = {
  hi: {
    level: 5,
    lessonId: "level-5-mutual-funds-sip",
    title: "Level 5: Mutual Funds & SIP – Smart Investing",
    subtitle: "Bina daily tension ke invest karna seekho",
    scenes: [
      {
        id: "scene-1",
        type: "scene",
        title: "Rohit ka Stress",
        speaker: "narrator",
        content: [
          "Rohit daily market dekh kar thoda stressed feel karta hai.",
          "Roz Nifty upar, roz Nifty neeche...",
          "Usko samajh nahi aa raha ki kya kare.",
        ],
      },
      {
        id: "scene-1-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Priya, roz price dekhna thoda tiring lag raha hai.",
          "Kya har investor ko daily stocks choose karna padta hai?",
        ],
      },
      {
        id: "scene-2-priya",
        type: "scene",
        title: "Priya ka Calm Jawab",
        speaker: "priya",
        content: [
          "Nahi Rohit, har investor ko daily stocks choose karna zaroori nahi.",
          "Ek simple tarika hai jisme tu invest kar sakta hai,",
          "aur kisi expert pe trust kar sakta hai.",
        ],
      },
      {
        id: "concept-1",
        type: "concept",
        title: "Mutual Fund kya hota hai?",
        content: [
          "Socho 100 log apna paisa ek jagah jama karte hain.",
          "Ek expert (Fund Manager) is paisa ko alag-alag jagah invest karta hai.",
          "Jo profit hota hai, wo sab me baant diya jata hai.",
          "",
          "Is system ko Mutual Fund kehte hain.",
        ],
      },
      {
        id: "scene-3-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Matlab mujhe khud se har stock choose nahi karna padega?",
        ],
      },
      {
        id: "scene-3-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Bilkul sahi! Expert tumhari jagah decide karta hai.",
          "Tumhe bas invest karna hai.",
        ],
      },
      {
        id: "scene-4-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Ye toh mast hai! Lekin Mutual Fund me paisa kaise daalte hain?",
        ],
      },
      {
        id: "concept-2",
        type: "concept",
        title: "SIP kya hota hai?",
        content: [
          "SIP = Systematic Investment Plan",
          "",
          "Jaise tum har month mobile recharge ya bill bharte ho,",
          "waise hi har month thoda-thoda invest karna SIP hota hai.",
          "",
          "Ek fix date pe automatically paisa invest ho jata hai.",
        ],
      },
      {
        id: "scene-5-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "SIP ka fayda ye hai ki tumhe daily market follow nahi karni.",
          "Monthly thoda paisa daalo, baaki expert sambhal leta hai.",
        ],
      },
      {
        id: "concept-3",
        type: "concept",
        title: "Beginners ke liye SIP kyun achha hai?",
        content: [
          "1. Small amount se start hota hai (Rs. 500 bhi kafi hai)",
          "2. Daily tension kam hoti hai",
          "3. Saving ki habit banti hai",
          "4. Market upar-neeche ho, SIP chalta rehta hai",
        ],
      },
      {
        id: "scene-6-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Mere jaise beginner ke liye ye perfect start lag raha hai!",
        ],
      },
      {
        id: "scene-6-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Haan Rohit! Pehle habit banao, phir confidence aayega.",
          "SIP tumhe discipline sikhata hai.",
        ],
      },
      {
        id: "concept-4",
        type: "concept",
        title: "Simple Comparison: Mutual Fund vs Direct Stock",
        content: [
          "Direct Stock Buying:",
          "- Tum khud decide karte ho kaunsa stock lena hai",
          "- Daily market dekhna padta hai",
          "- Beginners ke liye thoda mushkil",
          "",
          "Mutual Fund (via SIP):",
          "- Expert tumhari jagah decide karta hai",
          "- Monthly invest karna hai, daily check nahi",
          "- Beginners ke liye easy start",
        ],
      },
      {
        id: "scene-7-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Samajh aa gaya! SIP se start karunga.",
          "Phir dheere-dheere stocks bhi samjhunga.",
        ],
      },
      {
        id: "scene-7-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Yahi sahi approach hai!",
          "Ek step uthao, confidence aayega, phir agla step.",
        ],
      },
      {
        id: "summary",
        type: "summary",
        title: "Is Level me Aapne Kya Seekha",
        content: [
          "Mutual Fund ka simple meaning – sab ka paisa ek jagah, expert invest kare",
          "SIP ka concept – har month thoda invest",
          "Beginners ke liye SIP kyun sahi hai",
          "Long-term soch ka start",
        ],
      },
      {
        id: "teaser",
        type: "scene",
        title: "Next Level Teaser",
        speaker: "narrator",
        content: [
          "Agar SIP start kar diya, to kaunsa fund type choose karein?",
          "Equity, Debt, ya Hybrid – kya farak hai?",
          "",
          "Level 6 me jaano: Types of Mutual Funds",
        ],
      },
    ],
  },
  en: {
    level: 5,
    lessonId: "level-5-mutual-funds-sip",
    title: "Level 5: Mutual Funds & SIP – Smart Investing",
    subtitle: "Learn to invest without daily stress",
    scenes: [
      {
        id: "scene-1",
        type: "scene",
        title: "Rohit's Stress",
        speaker: "narrator",
        content: [
          "Rohit feels a bit stressed checking the market daily.",
          "Nifty up one day, Nifty down the next...",
          "He doesn't understand what to do.",
        ],
      },
      {
        id: "scene-1-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Priya, checking prices daily feels a bit tiring.",
          "Does every investor need to pick stocks daily?",
        ],
      },
      {
        id: "scene-2-priya",
        type: "scene",
        title: "Priya's Calm Answer",
        speaker: "priya",
        content: [
          "No Rohit, not every investor needs to pick stocks daily.",
          "There's a simple method where you can invest,",
          "and trust an expert to manage it.",
        ],
      },
      {
        id: "concept-1",
        type: "concept",
        title: "What is a Mutual Fund?",
        content: [
          "Imagine 100 people pooling their money together.",
          "An expert (Fund Manager) invests this money in different places.",
          "The profit is then divided among everyone.",
          "",
          "This system is called a Mutual Fund.",
        ],
      },
      {
        id: "scene-3-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "So I don't have to pick every stock myself?",
        ],
      },
      {
        id: "scene-3-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Exactly right! The expert decides on your behalf.",
          "You just need to invest.",
        ],
      },
      {
        id: "scene-4-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "That's great! But how do we put money in Mutual Fund?",
        ],
      },
      {
        id: "concept-2",
        type: "concept",
        title: "What is SIP?",
        content: [
          "SIP = Systematic Investment Plan",
          "",
          "Just like you pay your mobile bill every month,",
          "investing a small amount every month is SIP.",
          "",
          "Money gets invested automatically on a fixed date.",
        ],
      },
      {
        id: "scene-5-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "The benefit of SIP is you don't need to follow the market daily.",
          "Invest a little monthly, the expert handles the rest.",
        ],
      },
      {
        id: "concept-3",
        type: "concept",
        title: "Why is SIP good for Beginners?",
        content: [
          "1. Start with a small amount (even Rs. 500 is enough)",
          "2. Less daily stress",
          "3. Builds saving habit",
          "4. SIP continues whether market goes up or down",
        ],
      },
      {
        id: "scene-6-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "This seems like the perfect start for a beginner like me!",
        ],
      },
      {
        id: "scene-6-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "Yes Rohit! Build the habit first, confidence will follow.",
          "SIP teaches you discipline.",
        ],
      },
      {
        id: "concept-4",
        type: "concept",
        title: "Simple Comparison: Mutual Fund vs Direct Stock",
        content: [
          "Direct Stock Buying:",
          "- You decide which stock to buy",
          "- Need to watch market daily",
          "- A bit difficult for beginners",
          "",
          "Mutual Fund (via SIP):",
          "- Expert decides on your behalf",
          "- Monthly invest, no daily checking needed",
          "- Easy start for beginners",
        ],
      },
      {
        id: "scene-7-rohit",
        type: "scene",
        speaker: "rohit",
        content: [
          "Got it! I'll start with SIP.",
          "Then slowly I'll also learn about stocks.",
        ],
      },
      {
        id: "scene-7-priya",
        type: "scene",
        speaker: "priya",
        content: [
          "That's the right approach!",
          "Take one step, build confidence, then the next step.",
        ],
      },
      {
        id: "summary",
        type: "summary",
        title: "What You Learned in This Level",
        content: [
          "Simple meaning of Mutual Fund – everyone's money pooled, expert invests",
          "SIP concept – invest a little every month",
          "Why SIP is right for beginners",
          "Start of long-term thinking",
        ],
      },
      {
        id: "teaser",
        type: "scene",
        title: "Next Level Teaser",
        speaker: "narrator",
        content: [
          "If you've started SIP, which fund type should you choose?",
          "Equity, Debt, or Hybrid – what's the difference?",
          "",
          "Find out in Level 6: Types of Mutual Funds",
        ],
      },
    ],
  },
};
