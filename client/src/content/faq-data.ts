export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  relatedLink?: string;
  relatedLinkText?: string;
}

export const faqData: FAQItem[] = [
  {
    id: "1",
    question: "Kya ye website beginners ke liye hai?",
    answer: "Haan, bilkul! Rotech Shiksha specially un logon ke liye banaya gaya hai jinhe share market ki koi knowledge nahi hai. Humari saari content Hindi/Hinglish me hai aur bilkul zero se start hoti hai. Rohit aur Priya ke story-based lessons aapko step-by-step sikhate hain.",
    relatedLink: "/learn/level-1",
    relatedLinkText: "Level 1 se shuru karein",
  },
  {
    id: "2",
    question: "Kya yahan real paisa lagta hai?",
    answer: "Nahi! Ye ek pure educational platform hai. Yahan koi real trading nahi hoti. Aap sirf seekhte ho – concepts, strategies, aur market understanding. Jab aap ready feel karo, tab apne research ke baad real broker se invest kar sakte ho. Yahan sirf learning hai.",
  },
  {
    id: "3",
    question: "Kya share market risky hota hai?",
    answer: "Haan, share market me risk hota hai – ye sach hai. Par risk ko samajhna aur manage karna seekhna important hai. Bina knowledge ke invest karna gambling hai, par sahi knowledge ke saath ye informed decision making hai. Isliye humne Risk Management ka poora level banaya hai.",
    relatedLink: "/learn/level-4",
    relatedLinkText: "Risk Management seekhein (Level 4)",
  },
  {
    id: "4",
    question: "Kya main bina knowledge ke start kar sakta hoon?",
    answer: "Investing bina knowledge ke risky hai. Isliye pehle seekho, phir invest karo. Rotech Shiksha exactly isi liye hai – aapko zero se confident investor tak le jaana. 8 levels complete karo, quizzes do, aur phir real decisions lo. Patience rakho!",
    relatedLink: "/courses",
    relatedLinkText: "Poora learning path dekhein",
  },
  {
    id: "5",
    question: "Kya quizzes aur practice free hai?",
    answer: "Haan! Filhaal saare 8 levels, quizzes, aur calculators completely free hain. Hum chahte hain ki har beginner ko quality education mile bina paisa kharch kiye. Aage premium features aa sakte hain, par basic learning hamesha accessible rehni chahiye.",
    relatedLink: "/calculators",
    relatedLinkText: "Free calculators try karein",
  },
  {
    id: "6",
    question: "Kya mujhe certificate milega?",
    answer: "Filhaal official certificate feature nahi hai. Par aapka asli certificate hai – knowledge aur confidence jo aap gain karte ho. Future me hum certificate system add kar sakte hain. Abhi focus karo learning pe!",
  },
  {
    id: "7",
    question: "Kya ye trading platform hai?",
    answer: "Nahi! Rotech Shiksha ek EDUCATIONAL platform hai, trading platform nahi. Yahan aap invest nahi kar sakte. Sirf seekhte ho. Real trading ke liye Zerodha, Groww, Upstox jaise SEBI registered brokers use karo. Hum recommend karte hain ki seekhne ke baad research karke sahi broker choose karo.",
  },
  {
    id: "8",
    question: "Kya yeh SEBI registered hai?",
    answer: "Rotech Shiksha ek educational website hai, broker ya investment advisor nahi. Isliye SEBI registration applicable nahi hai. Hum koi investment advice nahi dete – sirf general education provide karte hain. Koi bhi investment decision lene se pehle SEBI registered advisor se consult karein.",
  },
];

export const disclaimerText = "This website is for educational purpose only. We do not provide investment advice. Invest at your own risk after proper research. Past performance does not guarantee future results.";
