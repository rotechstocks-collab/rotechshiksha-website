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

export const level3Quiz: QuizData = {
  levelId: 3,
  topic: "Investment vs Trading & Planning",
  questions: [
    {
      id: 1,
      question: "Rohit ko Level 3 me sabse badi seekh kya milti hai?",
      options: [
        "Daily trading karo",
        "Bina plan ke market dangerous hai",
        "Tips follow karo",
        "Zyada risk lo",
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      question: "Investment ka matlab kya hota hai?",
      options: [
        "Roz buy-sell",
        "Short-term profit",
        "Long-term soch ke paisa lagana",
        "Gambling",
      ],
      correctIndex: 2,
    },
    {
      id: 3,
      question: "Trading kis type ke logon ke liye hoti hai?",
      options: [
        "Har beginner ke liye",
        "Bina knowledge ke",
        "Jinke paas discipline aur plan ho",
        "Sirf luck ke liye",
      ],
      correctIndex: 2,
    },
    {
      id: 4,
      question: "Priya Rohit ko plan banane ke liye kya bolti hai?",
      options: [
        "Market suno",
        "News follow karo",
        "Goal clear rakho aur risk samjho",
        "Sab paisa ek jagah lagao",
      ],
      correctIndex: 2,
    },
    {
      id: 5,
      question: "Beginner ke liye sabse safe approach kya hai?",
      options: [
        "Trading",
        "Investment with planning",
        "Intraday",
        "Option buying",
      ],
      correctIndex: 1,
    },
  ],
  successMessage: {
    title: "🎉 Great Job!",
    rohitText: "Ab Rohit bina plan ke market me entry nahi karta.",
    priyaQuote: "Jeet unki hoti hai jo soch ke chalte hain, jaldi me nahi.",
  },
  retryMessage: "Koi baat nahi, Rohit bhi pehli baar me confuse hua tha. Thoda revise karke dobara try karo.",
  nextLevelPath: "/learn/level-4",
  nextLevelText: "➡ Go to Level 4",
};

export const level4Quiz: QuizData = {
  levelId: 4,
  topic: "Risk Management (Emotional Focus)",
  questions: [
    {
      id: 1,
      question: "Risk management ka matlab kya hota hai?",
      options: [
        "Risk ignore karna",
        "Risk ko samajhkar control me rakhna",
        "Zyada profit banana",
        "Dar ke market chhod dena",
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      question: "Market girne par Rohit kya seekhta hai?",
      options: [
        "Sab paisa nikal lo",
        "Ghabrana sahi hai",
        "Loss bhi learning ka hissa hota hai",
        "Dobara kabhi invest na karo",
      ],
      correctIndex: 2,
    },
    {
      id: 3,
      question: "Stop-loss ka main purpose kya hai?",
      options: [
        "Profit badhana",
        "Loss ko limit karna",
        "Market predict karna",
        "Trading fast karna",
      ],
      correctIndex: 1,
    },
    {
      id: 4,
      question: "Priya Rohit ko loss ke baad kya samjhati hai?",
      options: [
        "Revenge trade karo",
        "Market bekaar hai",
        "Discipline sabse zaroori hai",
        "Tips lo",
      ],
      correctIndex: 2,
    },
    {
      id: 5,
      question: "Successful investor ka sabse strong weapon kya hota hai?",
      options: [
        "Luck",
        "Capital",
        "Emotional control",
        "Speed",
      ],
      correctIndex: 2,
    },
  ],
  successMessage: {
    title: "🎉 Proud Moment!",
    rohitText: "Market girne ke baad bhi Rohit shaant rehta hai.",
    priyaQuote: "Jo apne emotions jeet leta hai, wahi market jeet paata hai.",
  },
  retryMessage: "Koi baat nahi, Rohit bhi pehli baar me confuse hua tha. Thoda revise karke dobara try karo.",
  nextLevelPath: "/learn/level-5",
  nextLevelText: "➡ Go to Level 5",
};

export const level5Quiz: QuizData = {
  levelId: 5,
  topic: "Mutual Funds & SIP (Beginner Friendly)",
  questions: [
    {
      id: 1,
      question: "Mutual Fund kya hota hai?",
      options: [
        "Direct stock trading",
        "Sabka paisa mila kar invest karna",
        "Fixed deposit",
        "Daily profit scheme",
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      question: "Mutual fund ka paisa kaun manage karta hai?",
      options: [
        "Government",
        "Investor khud",
        "Professional fund manager",
        "Broker",
      ],
      correctIndex: 2,
    },
    {
      id: 3,
      question: "SIP ka full form kya hai?",
      options: [
        "Safe Investment Plan",
        "Systematic Investment Plan",
        "Stock Income Program",
        "Simple Interest Plan",
      ],
      correctIndex: 1,
    },
    {
      id: 4,
      question: "SIP beginners ke liye kyun achha hota hai?",
      options: [
        "Ek saath zyada paisa lagta hai",
        "Discipline aur regular investment sikhata hai",
        "Guaranteed return deta hai",
        "Risk bilkul nahi hota",
      ],
      correctIndex: 1,
    },
    {
      id: 5,
      question: "Priya Rohit ko SIP ke baare me kya samjhati hai?",
      options: [
        "SIP se turant ameer ban jaoge",
        "SIP long-term habit banata hai",
        "SIP me risk nahi hota",
        "SIP sirf experts ke liye hai",
      ],
      correctIndex: 1,
    },
  ],
  successMessage: {
    title: "🎉 Fantastic!",
    rohitText: "Ab Rohit samajh gaya hai ki small steps se bhi big future banta hai.",
    priyaQuote: "Consistency hi SIP ka asli magic hai.",
  },
  retryMessage: "Thoda aur practice chahiye. Rohit bhi pehle confuse hota tha, par revise karke strong bana.",
  nextLevelPath: "/learn/level-6",
  nextLevelText: "➡ Go to Level 6",
};

export const level6Quiz: QuizData = {
  levelId: 6,
  topic: "Advanced Concepts & Market Awareness",
  questions: [
    {
      id: 1,
      question: "Diversification ka matlab kya hota hai?",
      options: [
        "Ek hi stock me paisa lagana",
        "Risk ko spread karna alag-alag investments me",
        "Sirf safe options choose karna",
        "Trading fast karna",
      ],
      correctIndex: 1,
    },
    {
      id: 2,
      question: "Portfolio ka matlab kya hai?",
      options: [
        "Trading app",
        "Saare investments ka collection",
        "Bank account",
        "Profit report",
      ],
      correctIndex: 1,
    },
    {
      id: 3,
      question: "News aur market ka kya relation hai?",
      options: [
        "News ka koi effect nahi",
        "News se short-term movement ho sakta hai",
        "News sirf traders ke liye hoti hai",
        "News ignore karni chahiye",
      ],
      correctIndex: 1,
    },
    {
      id: 4,
      question: "Rohit Level 6 me kya seekhta hai?",
      options: [
        "Har news pe trade karo",
        "Awareness rakho, panic mat karo",
        "Market perfect predict hota hai",
        "Risk ignore karo",
      ],
      correctIndex: 1,
    },
    {
      id: 5,
      question: "Smart investor ka next step kya hota hai?",
      options: [
        "Blind confidence",
        "Zyada trading",
        "Practice aur observation (paper trading)",
        "Tips follow karna",
      ],
      correctIndex: 2,
    },
  ],
  successMessage: {
    title: "🎉 Well Done!",
    rohitText: "Ab Rohit market ko sirf profit nahi, ek system ki tarah dekhta hai.",
    priyaQuote: "Awareness tumhara sabse strong armour hai.",
  },
  retryMessage: "Thoda aur practice chahiye. Rohit bhi pehle confuse hota tha, par revise karke strong bana.",
  nextLevelPath: "/learn/level-7",
  nextLevelText: "➡ Go to Level 7",
};
