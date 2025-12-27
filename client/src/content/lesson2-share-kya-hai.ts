// Lesson 2: Share kya hota hai?
// Video Script and Storyboard
// Duration: 5-6 minutes
// Peer tone: Rohit and Priya are same-age friends

export interface VideoScene {
  sceneNumber: number;
  duration: string;
  title: string;
  visual: string;
  voiceover: string;
  onScreenText?: string;
}

export const lesson2VideoScript: VideoScene[] = [
  {
    sceneNumber: 1,
    duration: "0:00 - 0:40",
    title: "Opening – Rohit ka Sawaal",
    visual: "Rohit sitting with Priya in a casual setting (coffee shop or park bench style). Rohit has a curious expression. Simple, clean animation.",
    voiceover: `Pichle lesson me humne jaana ki stock market kya hai – ek organized bazaar jahan companies ke shares bikte hain.

Par Rohit ke mann me ek sawaal aaya:

"Priya, ye 'share' actually hota kya hai? Sab log bolte hain 'share kharido', 'share becho' – par matlab kya hai iska?"

Bahut accha sawaal hai. Aur aaj hum isi ko samjhenge – ekdum simple tarike se.`,
    onScreenText: "Share kya hota hai?",
  },
  {
    sceneNumber: 2,
    duration: "0:40 - 1:30",
    title: "Chai Wali Dukaan ka Example",
    visual: "Animation: A small chai shop opening. Shyam (owner) standing proudly. Shows ₹1 lakh investment, then shop growing with customers.",
    voiceover: `Samjhne ke liye ek simple example lete hain.

Soch, tere mohalle me Shyam naam ka ladka hai. Usne ₹1 lakh lagake ek chai ki dukaan kholi.

Dukaan acchi chali. Log aane lage. Shyam ko profit hone laga.

Ab Shyam sochta hai – "Ek aur branch kholu. Par mere paas sirf 50,000 bache hain. 50,000 aur chahiye."

Ab Shyam ke paas do options hain: Ya toh bank se loan le, ya phir kisi partner ko dukaan me hissa de.`,
    onScreenText: "Shyam ki chai dukaan = ₹1 lakh investment",
  },
  {
    sceneNumber: 3,
    duration: "1:30 - 2:30",
    title: "Partnership ka Concept",
    visual: "Animation: Shyam divides his shop into 100 equal pieces (like a pie chart). Then Rohit buys 10 pieces for ₹10,000. Shows 'Rohit = 10% owner'.",
    voiceover: `Shyam decide karta hai – main apni dukaan ko 100 equal hisson me baantunga.

Har hissa ₹1,000 ka. Matlab total value: ₹1 lakh.

Ab Rohit aata hai aur kehta hai – "Main 10 hisse khareedna chahta hun."

Rohit ne ₹10,000 diye. Usne 10 hisse le liye.

Ab Rohit us chai dukaan ka 10% maalik ban gaya!

Ye 10 hisse jo Rohit ne kharide – stock market ki bhasha me isko kehte hain "10 shares".

Share = Company ka chhota hissa. Bas itna simple hai.`,
    onScreenText: "Share = Company ka chhota hissa",
  },
  {
    sceneNumber: 4,
    duration: "2:30 - 3:30",
    title: "Ownership ka Fayda",
    visual: "Animation: Chai shop grows, profit increases. Shows ₹20,000 profit at year end. Rohit gets ₹2,000 as his 10% share. Happy faces.",
    voiceover: `Ab soch – ek saal baad dukaan ne ₹20,000 ka profit kamaya.

Kyunki Rohit 10% maalik hai, usse bhi 10% profit milega.

₹20,000 ka 10% = ₹2,000

Rohit ko ₹2,000 mile – bina kuch kaam kiye! Sirf isliye kyunki wo us dukaan ka hissa-daar hai.

Isko stock market me "dividend" kehte hain – jab company apna profit shareholders me baant ti hai.

Aur agar dukaan aur bhi famous ho gayi? Tab Rohit ke shares ki value bhi badh jayegi!`,
    onScreenText: "Profit me hissa = Dividend",
  },
  {
    sceneNumber: 5,
    duration: "3:30 - 4:30",
    title: "Share ki Value Badhna",
    visual: "Animation: Chai shop becomes famous chain. Share value increases from ₹1,000 to ₹2,000. Rohit's 10 shares now worth ₹20,000.",
    voiceover: `Soch – 2 saal baad Shyam ki dukaan bahut famous ho gayi. Ab 5 branches hain.

Pehle dukaan ki total value thi ₹1 lakh. Ab company ki value ho gayi ₹2 lakh!

Matlab har share jo ₹1,000 ka tha, ab ₹2,000 ka ho gaya.

Rohit ke 10 shares pehle ₹10,000 ke the. Ab wo ₹20,000 ke hain!

Rohit ne kuch nahi kiya – sirf wait kiya. Company badi hui, uske shares ki value bhi badhi.

Ye hai stock market ka basic principle: Company grow kare, share ki value badhe.`,
    onScreenText: "Company grow = Share value grow",
  },
  {
    sceneNumber: 6,
    duration: "4:30 - 5:15",
    title: "Real Companies me Same Concept",
    visual: "Chai shop transforms into logos of real companies – Reliance, TCS, HDFC. Shows 'Same concept, bigger scale'.",
    voiceover: `Ab ye chai dukaan ki jagah soch – Reliance, TCS, Infosys, HDFC Bank.

Ye sab badi companies hain. Par concept same hai!

Jab tu Reliance ka 1 share khareedte hai – tu Reliance ka thoda sa maalik ban jaata hai.

Company accha kaam kare – tere share ki value badhti hai.
Company profit baante – tujhe dividend milta hai.

Sirf difference ye hai ki ye companies bahut badi hain. 
Unke shares stock exchange pe listed hain.
Lakhs log inke shares khareedte-bechte hain.

Par basic concept same hai – share = company ka chhota hissa.`,
    onScreenText: "Reliance ka share = Reliance ka chhota maalik",
  },
  {
    sceneNumber: 7,
    duration: "5:15 - 5:50",
    title: "Closing – Rohit ka Confidence",
    visual: "Rohit looking confident and enlightened. Priya smiling. Simple, warm animation.",
    voiceover: `Rohit bola: "Priya, ye toh bahut simple hai! Matlab jab main share khareedte hun, main actually us company ka thoda owner ban jaata hun?"

Bilkul sahi! Share kharidna = Company me partnership lena.

Tu Tata ka share khareedega – tu Tata ka thoda maalik.
Tu HDFC ka share khareedega – tu HDFC ka thoda maalik.

Ye ownership feeling important hai. Jab tu samjhega ki tu real business me invest kar raha hai – tab sahi decisions le payega.

Agle lesson me hum samjhenge: Stock market actually kaise kaam karta hai? Ye shares kahan se khareedte hain? Kaun bechta hai?`,
    onScreenText: "Share khareedna = Company ka thoda owner banna",
  },
  {
    sceneNumber: 8,
    duration: "5:50 - 6:00",
    title: "CTA – Next Lesson",
    visual: "Lesson 3 preview card appears. CTA button: 'Continue to Lesson 3'. Clean design.",
    voiceover: `Bahut accha! Aaj ka lesson complete hua. 

Ab tu jaanta hai ki share kya hota hai. Ye foundation bahut important hai.

Agle lesson me milte hain – Stock market kaise kaam karta hai?`,
    onScreenText: "Continue to Lesson 3",
  },
];

// Storyboard Summary
export const lesson2StoryboardSummary = {
  totalDuration: "5-6 minutes",
  totalScenes: 8,
  style: "Clean, minimal animation with Hindi text overlays",
  colorPalette: "Professional fintech – warm tones for chai shop story, blues for corporate transition",
  voiceoverTone: "Calm, friendly, peer-to-peer – like explaining to a friend",
  musicStyle: "Soft, uplifting background music – not distracting",
  keyVisualElements: [
    "Rohit and Priya as same-age peers in casual setting",
    "Chai shop analogy with Shyam character",
    "Pie chart showing share division",
    "Profit and dividend visualization",
    "Transition from chai shop to real company logos",
  ],
  productionNotes: [
    "Keep visuals simple – chai shop story is the hero",
    "Use relatable Indian example (mohalla chai shop)",
    "Show share = ownership clearly with pie chart",
    "Transition smoothly from story to real companies",
    "End with confidence boost for viewer",
    "Mobile-friendly aspect ratio",
  ],
};
