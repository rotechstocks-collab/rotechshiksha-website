// Level 1 Lesson Content - Hindi (Default)
// Structured for easy translation to all Indian languages
// Proper nouns NOT to translate: Rohit, Priya, Stock Market, Share, Nifty, Sensex

export interface LessonScene {
  id: string;
  type: "scene" | "concept" | "summary" | "cta";
  title?: string;
  content: string[];
}

export interface LessonContent {
  level: number;
  lessonId: string;
  title: string;
  subtitle?: string;
  scenes: LessonScene[];
}

// Hindi content for Level 1
export const level1Content: LessonContent = {
  level: 1,
  lessonId: "level-1-introduction",
  title: "Level 1: Stock Market ki Shuruaat – Dar se Samajh Tak",
  subtitle: "Apni investment journey ki pehli seedhi",
  scenes: [
    {
      id: "scene-1",
      type: "scene",
      title: "Rohit ki Kahani",
      content: [
        "Rohit ek normal private job karta tha.",
        "Salary aati thi, kharch ho jaati thi.",
        "Savings bank me padi rehti thi, lekin wo badh nahi rahi thi.",
        "Ek din usne office me suna:",
        "\"Maine stock market me invest kiya aur achha return mila.\"",
        "Rohit ke dimag me sawaal aaya:",
        "Stock market hota kya hai?",
        "Kya ye sirf ameer logon ke liye hota hai?",
        "Paise doob gaye to kya hoga?",
      ],
    },
    {
      id: "scene-2",
      type: "scene",
      title: "Priya ki Salah",
      content: [
        "Rohit ne Priya se poocha.",
        "Priya ne shaant aur simple shabdon me kaha:",
        "\"Stock market koi gambling nahi hai.",
        "Ye companies ke business me hissa lene ka tareeqa hai.\"",
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
        "Agar company achha kaam karti hai aur log us par bharosa karte hain,",
        "to share ki demand badhti hai aur price upar jaati hai.",
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
        "Jab hum seekh kar aur planning ke saath decision lete hain,",
        "to risk kam ho jaata hai.",
      ],
    },
    {
      id: "scene-3",
      type: "scene",
      title: "Rohit ka Realization",
      content: [
        "Rohit ne socha:",
        "\"Stock market mushkil nahi hai,",
        "bas mujhe iske basics samajhne the.\"",
        "Priya ne kaha:",
        "\"Isliye hum step-by-step seekhenge.\"",
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
};

// Labels for UI elements (for translation)
export const level1Labels = {
  levelBadge: "Level 1",
  freeLabel: "Free",
  readingTime: "5 min padhai",
  languagePlaceholder: "Bhasha Chunein",
  comingSoon: "Jaldi Aayega",
  startLearning: "Seekhna Shuru Karein",
  nextLevel: "Agla Level",
  backToCourses: "Courses par Wapas Jaayein",
  conceptLabel: "Concept",
  storyLabel: "Kahani",
  summaryLabel: "Summary",
};
