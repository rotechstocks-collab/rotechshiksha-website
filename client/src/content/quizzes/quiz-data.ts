// Quiz Data for Level 1 and Level 2
// Language: Hinglish (same tone as lessons)

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface QuizData {
  levelId: number;
  topic: string;
  questions: QuizQuestion[];
  successMessage: {
    title: string;
    rohitText: string;
    priyaQuote: string;
  };
  retryMessage: string;
  nextLevelPath: string;
  nextLevelText: string;
}

export const level1Quiz: QuizData = {
  levelId: 1,
  topic: "Share Market Basics",
  questions: [
    {
      id: 1,
      question: "Rohit share market me kyun interest lene laga?",
      options: [
        "Jaldi ameer banne ke liye",
        "Doston ke kehne par",
        "Paisa grow karna samajhne ke liye",
        "Gambling ke liye",
      ],
      correctIndex: 2,
    },
    {
      id: 2,
      question: "Share ka matlab kya hota hai?",
      options: [
        "Company ka loan",
        "Company ka ek chhota hissa",
        "Fixed income scheme",
        "Daily profit plan",
      ],
      correctIndex: 1,
    },
    {
      id: 3,
      question: "Share market ka main purpose kya hai?",
      options: [
        "Risk-free income",
        "Company ko paisa dena aur growth me hissa lena",
        "Lottery system",
        "Sirf traders ke liye",
      ],
      correctIndex: 1,
    },
    {
      id: 4,
      question: "Rohit ko sabse pehla lesson kya mila?",
      options: [
        "Tips follow karo",
        "Risk ignore karo",
        "Samajh ke invest karo",
        "Zyada paisa lagao",
      ],
      correctIndex: 2,
    },
    {
      id: 5,
      question: "Share market beginners ke liye kaisa ho sakta hai?",
      options: [
        "Dangerous",
        "Confusing",
        "Samajhne layak agar basics clear ho",
        "Sirf experts ke liye",
      ],
      correctIndex: 2,
    },
  ],
  successMessage: {
    title: "🎉 Mubarak ho!",
    rohitText: "Rohit ko pehli baar laga ki share market itna mushkil nahi hai.",
    priyaQuote: "Jab basics clear ho jaate hain, dar khatam ho jaata hai.",
  },
  retryMessage: "Thoda aur revise kar lo, Priya kehti hai practice se clarity aati hai.",
  nextLevelPath: "/learn/level-2",
  nextLevelText: "➡ Go to Level 2",
};

export const level2Quiz: QuizData = {
  levelId: 2,
  topic: "Stock, Index & Market Structure",
  questions: [
    {
      id: 1,
      question: "Stock aur share me kya relation hai?",
      options: [
        "Dono alag cheez hai",
        "Share hi stock hota hai",
        "Stock sirf traders ke liye",
        "Stock bond hota hai",
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      question: "Index ka kaam kya hota hai?",
      options: [
        "Company profit dikhana",
        "Market ki overall direction batana",
        "Fixed return dena",
        "Trading signal dena",
      ],
      correctIndex: 1,
    },
    {
      id: 3,
      question: "Nifty aur Sensex kya hai?",
      options: [
        "Companies",
        "Mutual funds",
        "Market index",
        "Government schemes",
      ],
      correctIndex: 2,
    },
    {
      id: 4,
      question: "Priya Rohit ko index se kya samjhati hai?",
      options: [
        "Market hamesha upar jaata hai",
        "Index market ka health check hota hai",
        "Index me risk nahi hota",
        "Sirf experts samajh sakte hain",
      ],
      correctIndex: 1,
    },
    {
      id: 5,
      question: "Beginners ke liye index samajhna kyun zaroori hai?",
      options: [
        "Tips ke liye",
        "Market trend samajhne ke liye",
        "Fast profit ke liye",
        "News ignore karne ke liye",
      ],
      correctIndex: 1,
    },
  ],
  successMessage: {
    title: "🎉 Excellent!",
    rohitText: "Ab Rohit market ko sirf numbers nahi, ek system ki tarah dekh pa raha hai.",
    priyaQuote: "Market ko samajhne wala hi long-term me jeet ta hai.",
  },
  retryMessage: "Thoda aur revise kar lo, Priya kehti hai practice se clarity aati hai.",
  nextLevelPath: "/learn/level-3",
  nextLevelText: "➡ Go to Level 3",
};
