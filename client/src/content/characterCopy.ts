export const characterCopy = {
  homepage: {
    welcome: {
      priya: {
        name: "Priya se Milo",
        subtitle: "Tumhari Guide (Friend)",
      },
      rohit: {
        name: "Rohit se Milo", 
        subtitle: "Tumhare Saath Seekhne Wala (Friend)",
      },
    },
    heroConversation: [
      {
        character: "rohit" as const,
        message: "Yaar, mujhe trading seekhni hai par samajh nahi aa raha kahan se shuru karun?",
      },
      {
        character: "priya" as const,
        message: "Simple hai! Pehle basics samjho - stock kya hai, market kaise kaam karta hai. Fir step-by-step aage badho.",
      },
      {
        character: "rohit" as const,
        message: "Lekin kya yeh free hai? Aur Hindi mein milega?",
      },
      {
        character: "priya" as const,
        message: "Haan! Yahan sab kuch Hinglish mein hai aur beginners ke liye bilkul free. Chalo start karein!",
      },
    ],
    rohitTestimonial: {
      quote: "Main ek normal job karne wala banda hoon. Thodi savings thi, par stock market se darr lagta tha. Phir Priya se simple Hindi me seekha — bina jargon. Aaj main confident hoon.",
      tagline: "Shayad aap bhi",
      cta: "Aapki bhi baari hai.",
    },
  },
  
  calculators: {
    tipTitle: "SIP ya Lumpsum mein confuse ho?",
    tipMessage: "Investing mein sabse pehle yeh samjho ki aapka goal kya hai. SIP monthly investing ke liye hai, Lumpsum ek baar mein invest karne ke liye. Calculator use karo aur dekho!",
  },
  
  courses: {
    tipTitle: "Chinta mat karo, ek step mein shuru karo!",
    tipMessage: "Main tumhe har level mein guide karungi. Basics se start karo, fir slowly advanced topics pe jaao. Koi jaldi nahi hai!",
  },
  
  comicPanels: [
    {
      character: "rohit" as const,
      pose: "confused",
      text: "Main trading start karna chahta hoon, par kahan se shuru karun?",
    },
    {
      character: "priya" as const,
      pose: "point",
      text: "Pehle basics samjho - market kaise kaam karta hai, charts padhna seekho.",
    },
    {
      character: "priya" as const,
      pose: "clipboard",
      text: "Fir paper trading karo - bina paisa lagaye practice karo!",
    },
  ],
  
  learningPath: {
    priyaEncouragement: "Har step pe main tumhare saath hoon. Dhire dhire seekho, jaldi nahi hai!",
    rohitMotivation: "Dekho main bhi zero se shuru kiya tha. Tum bhi kar sakte ho!",
    completionMessage: "Bahut badiya! Tumne yeh level complete kar liya. Aage badho!",
  },
  
  buttons: {
    startLearning: "Seekhna Shuru Karo",
    tryCalculators: "Calculators Try Karo",
    continueLesson: "Aage Badho",
    goBack: "Peeche Jaao",
  },
} as const;
