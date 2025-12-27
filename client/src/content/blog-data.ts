export type BlogCategory = "beginner-articles" | "market-basics" | "stock-faqs";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  rohitPriyaStory: string;
  ctaText: string;
  ctaLink: string;
  relatedLevel: number;
  publishedDate: string;
  category: BlogCategory;
}

export const blogCategories: { id: BlogCategory; name: string; hindiName: string; description: string }[] = [
  { id: "beginner-articles", name: "Beginner Articles", hindiName: "Shuruwat ke Articles", description: "Stock market ki pehli kadam" },
  { id: "market-basics", name: "Market Basics", hindiName: "Market ki Basic Baatein", description: "Important concepts samjho" },
  { id: "stock-faqs", name: "Stock FAQs", hindiName: "Aam Sawaal", description: "Beginners ke common questions" },
];

export const blogPosts: BlogPost[] = [
  // Beginner Articles
  {
    id: "1",
    slug: "share-market-kya-hota-hai",
    title: "Share Market kya hota hai?",
    shortDescription: "Share market basics Hindi me samjho. Bilkul shuruwat se, bina kisi confusion ke.",
    content: `Share market ek aisi jagah hai jahan companies apne shares (hissa) bechti hain aur log unhe khareedte hain. Jab aap kisi company ka share khareedte ho, toh aap us company ke chhote se hisse ke maalik ban jaate ho.

Isko simple example se samjho: Agar ek dukaan hai jiska 100 hissa hai, aur aap 1 hissa khareedte ho, toh aap us dukaan ke 1% maalik ho. Agar dukaan ka profit hota hai, toh aapko bhi profit milta hai.

Share market me do main exchanges hain India me:
- NSE (National Stock Exchange)
- BSE (Bombay Stock Exchange)

Yahan pe companies listed hoti hain aur log shares khareed aur bech sakte hain. Ye sab SEBI (Securities and Exchange Board of India) ki nigrani me hota hai jo investors ko protect karta hai.

Important baat: Share market sirf trading nahi hai. Ye long-term wealth creation ka ek tarika hai jab sahi knowledge aur patience ke saath use kiya jaye.`,
    rohitPriyaStory: `Rohit ne pehli baar jab "share market" suna, toh usse laga ye sirf ameer logon ke liye hai. Par Priya ne use samjhaya ki ye ek learning journey hai jo koi bhi start kar sakta hai – bas sahi guidance chahiye.`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 1 dekhiye",
    ctaLink: "/learn/level-1",
    relatedLevel: 1,
    publishedDate: "2024-12-27",
    category: "beginner-articles",
  },
  {
    id: "2",
    slug: "investing-shuru-kaise-karein",
    title: "Investing shuru kaise karein?",
    shortDescription: "Beginner ke liye first steps – demat account se lekar pehla investment tak.",
    content: `Investing shuru karna mushkil nahi hai, bas sahi steps follow karo:

Step 1: Basic knowledge lo
Pehle samjho ki share market kya hai, risk kya hota hai. Bina samjhe invest mat karo.

Step 2: Demat account kholo
Shares rakhne ke liye demat account zaroori hai. Ye banks ya brokers (Zerodha, Groww, etc.) ke through khulta hai.

Step 3: Emergency fund banao
Investing se pehle 3-6 months ka emergency fund rakho. Investment ka paisa locked samjho.

Step 4: Chhoti amount se shuru karo
Rs. 500-1000 se SIP shuru kar sakte ho. Pehle habit banao, amount baad me badhao.

Step 5: Patience rakho
Market me ups-downs normal hain. Long-term sochna zaroori hai.

Important: Kabhi bhi borrowed money se invest mat karo. Sirf wahi paisa lagao jo afford kar sako lose karne ka.`,
    rohitPriyaStory: `Rohit ko lagta tha ki investing ke liye lakhs chahiye. Priya ne use dikhaya ki Rs. 500/month se bhi start ho sakta hai. "Pehle habit banao, amount baad me badhao" – ye Priya ki advice thi.`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 1 dekhiye",
    ctaLink: "/learn/level-1",
    relatedLevel: 1,
    publishedDate: "2024-12-27",
    category: "beginner-articles",
  },
  {
    id: "3",
    slug: "sip-kya-hai-beginners-ke-liye",
    title: "SIP kya hai aur kaise kaam karta hai?",
    shortDescription: "SIP se investing kaise shuru karein? Beginners ke liye simple guide.",
    content: `SIP ka full form hai Systematic Investment Plan. Ye ek tarika hai jisme aap regular intervals pe (monthly, weekly) fixed amount invest karte ho mutual funds me.

SIP kyun best hai beginners ke liye:

1. Chhoti amount se start kar sakte ho: Rs. 500/month se bhi SIP start ho sakta hai.

2. Discipline develop hota hai: Har month ek fixed date pe automatically paisa invest hota hai.

3. Rupee Cost Averaging: Market upar ho ya neeche, aap regular invest karte ho, toh average cost balance hota hai.

4. Compounding ka fayda: Long term me chhote amounts bhi bade ho jaate hain.

5. No need to time the market: Beginners ko market timing ki tension nahi rehti.

Example: Agar aap Rs. 5000/month 10 saal tak invest karo 12% return pe, toh:
- Total investment: Rs. 6,00,000
- Approximate value: Rs. 11,60,000+

Important disclaimer: Returns guaranteed nahi hote. Market risk hota hai. Par long-term consistent investing historically kaam kiya hai.`,
    rohitPriyaStory: `Rohit ko lagta tha ki investing ke liye lakhs chahiye. Priya ne use dikhaya ki Rs. 500/month se bhi start ho sakta hai. "Pehle habit banao, amount baad me badhao" – ye Priya ki advice thi.`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 5 dekhiye",
    ctaLink: "/learn/level-5",
    relatedLevel: 5,
    publishedDate: "2024-12-27",
    category: "beginner-articles",
  },

  // Market Basics
  {
    id: "4",
    slug: "stock-aur-share-me-difference",
    title: "Stock aur Share me kya difference hai?",
    shortDescription: "Stock aur share – dono same lagte hain par thoda difference hai.",
    content: `Bahut log "stock" aur "share" ko same samajhte hain, aur mostly ye sahi bhi hai. Par thoda technical difference hai:

Share: Jab aap kisi specific company ka hissa khareedte ho, use share kehte hain. Jaise "Maine Reliance ke 10 shares khareede."

Stock: Ye ek broader term hai jo general ownership ko define karta hai. Jaise "Mere paas Indian stocks hain" – matlab multiple companies ke shares.

Simple rule yaad rakho:
- Share = Specific company ka hissa
- Stock = General term for ownership in companies

India me mostly dono words interchangeably use hote hain, toh zyada confuse hone ki zarurat nahi hai.

Ek aur important term hai: Equity. Ye bhi same concept hai – company me aapka ownership stake.`,
    rohitPriyaStory: `Rohit initially confused tha ki "stock" aur "share" alag hain ya same. Priya ne haste hue kaha, "Rohit, India me dono same hai. Technical difference chhodo, concept samjho!"`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 2 dekhiye",
    ctaLink: "/learn/level-2",
    relatedLevel: 2,
    publishedDate: "2024-12-27",
    category: "market-basics",
  },
  {
    id: "5",
    slug: "nifty-sensex-kya-hai",
    title: "Nifty aur Sensex kya hai?",
    shortDescription: "India ke do main market indices – simple explanation.",
    content: `Nifty aur Sensex dono market indices hain jo Indian stock market ki overall health batate hain.

Sensex kya hai:
- Full name: Sensitive Index
- BSE (Bombay Stock Exchange) ka index
- 30 badi companies ka group
- India ka sabse purana index (1986 se)

Nifty kya hai:
- Full name: National Fifty
- NSE (National Stock Exchange) ka index
- 50 badi companies ka group
- 1996 me start hua

Ye indices market ki direction batate hain:
- Index upar = Market overall achha perform kar raha hai
- Index neeche = Market overall gir raha hai

Important: Index sirf indicator hai. Individual stocks differently perform kar sakte hain.

Common galti: Log sochte hain "Nifty girega toh mera stock bhi girega." Zaruri nahi – aapka stock index se different move kar sakta hai.`,
    rohitPriyaStory: `Rohit ko lagta tha Nifty ek company hai. Priya ne samjhaya ki ye 50 companies ka group hai – market ka thermometer samjho.`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 2 dekhiye",
    ctaLink: "/learn/level-2",
    relatedLevel: 2,
    publishedDate: "2024-12-27",
    category: "market-basics",
  },
  {
    id: "6",
    slug: "risk-management-kya-hota-hai",
    title: "Risk management kya hota hai?",
    shortDescription: "Share market me risk se kaise bachein? Simple tips.",
    content: `Risk management ka matlab hai – apne paison ko protect karna jab market me uncertainty ho.

Har investment me risk hota hai. Par smart investors risk ko manage karte hain, eliminate nahi (kyunki wo possible nahi hai).

Risk management ke basic rules:

1. Kabhi bhi ek jagah sara paisa mat lagao: Diversification zaroori hai. Different stocks, sectors, aur asset classes me invest karo.

2. Sirf wahi paisa invest karo jo afford kar sako lose karne ka: Emergency fund alag rakho.

3. Position sizing: Ek trade me portfolio ka 5-10% se zyada risk mat lo.

4. Emotions pe control rakho: Greed aur fear sabse bade enemies hain.

5. Regular review karo: Market conditions change hote hain, toh portfolio bhi adjust karna padta hai.

Remember: "Capital protection > Capital appreciation" – Pehle paisa bachao, phir badhao.`,
    rohitPriyaStory: `Rohit ne pehli loss ke baad panic kiya. Priya ne samjhaya, "Loss hona normal hai. Important ye hai ki aap kitna lose kar sakte ho wo pehle decide karo aur us limit pe ruko."`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 4 dekhiye",
    ctaLink: "/learn/level-4",
    relatedLevel: 4,
    publishedDate: "2024-12-27",
    category: "market-basics",
  },

  // Stock FAQs
  {
    id: "7",
    slug: "kitne-paise-se-start-karein",
    title: "Share market me kitne paise se start karein?",
    shortDescription: "Minimum kitna chahiye? Honest answer bina kisi hype ke.",
    content: `Ye sabse common question hai beginners ka. Honest answer:

Technically: Rs. 100 se bhi start kar sakte ho. Kuch stocks Rs. 10-50 me available hain.

Practically: Rs. 500-1000/month se SIP better option hai beginners ke liye.

Kya galat hai:
- "Lakhs chahiye investing ke liye" – Galat
- "Rs. 100 me millionaire ban jaunga" – Bhi galat

Sahi approach:
1. Emergency fund pehle banao (3-6 months expenses)
2. Phir invest karo – chhoti amount se
3. Amount badhao jaise income badhe

Important: Paisa invest karne se zyada important hai KNOWLEDGE invest karna. Pehle seekho, phir lagao.

Disclaimer: Ye educational content hai. Koi specific investment advice nahi hai.`,
    rohitPriyaStory: `Rohit ko lagta tha 1 lakh chahiye start karne ke liye. Priya ne kaha, "Rs. 500 se shuru karo, consistency important hai, amount nahi."`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 1 dekhiye",
    ctaLink: "/learn/level-1",
    relatedLevel: 1,
    publishedDate: "2024-12-27",
    category: "stock-faqs",
  },
  {
    id: "8",
    slug: "kya-share-market-safe-hai",
    title: "Kya share market safe hai?",
    shortDescription: "Risk hai ya nahi? Seedhi baat, no sugarcoating.",
    content: `Seedhi baat: Share market me risk HAI. Koi bhi jo kehta hai "guaranteed returns" wo galat bol raha hai.

Par risk ka matlab "dangerous" nahi hai. Risk ka matlab hai uncertainty.

Risk types:
1. Market risk: Overall market gir sakta hai
2. Company risk: Specific company underperform kar sakti hai
3. Timing risk: Galat time pe entry/exit

Risk kam kaise karein:
- Diversification (alag-alag stocks/sectors)
- Long-term investing (short-term volatility ignore karo)
- Regular investing (SIP through rupee cost averaging)
- Education (samajh ke invest karo)

Kya safe hai:
- FD, PPF = Low risk, low return
- Stocks, MF = Higher risk, potential higher return

Important: "Safe" ka matlab "zero risk" nahi hota. Har cheez me kuch na kuch risk hai, including keeping cash (inflation risk).

Disclaimer: Ye educational content hai. Personal financial situation ke according decision lo.`,
    rohitPriyaStory: `Rohit initially dara hua tha. Priya ne samjhaya, "Risk manage karna seekho. Avoid karna impossible hai. Smart investing matlab informed decisions."`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 4 dekhiye",
    ctaLink: "/learn/level-4",
    relatedLevel: 4,
    publishedDate: "2024-12-27",
    category: "stock-faqs",
  },
  {
    id: "9",
    slug: "long-term-vs-short-term",
    title: "Long-term investing better hai ya short-term trading?",
    shortDescription: "Beginners ke liye kaunsa approach sahi hai?",
    content: `Bahut log confuse rehte hain – trading karein ya investing?

Long-term Investing:
- Stocks ko years tak hold karo
- Compounding ka benefit
- Less stress, less time required
- Historically better results for most people
- Tax benefit (LTCG lower than STCG)

Short-term Trading:
- Daily/weekly buy-sell
- Quick profits (ya losses) possible
- High skill, time, aur capital required
- Most traders lose money (studies show 90%+ traders loss me hain)

Beginners ke liye recommendation:
Long-term investing MUCH better hai because:
1. Kam knowledge se bhi start ho sakta hai
2. Mistakes recover hone ka time milta hai
3. Less stressful
4. Consistent returns historically

Trading sirf tab consider karo jab:
- 2-3 saal ka investing experience ho
- Risk afford kar sako
- Time aur dedication ho

Important: Ye educational perspective hai. Personal decision aap khud lo.`,
    rohitPriyaStory: `Rohit initially quick profits chahta tha. Par jab Priya ne compounding ka power dikhaya aur bola ki "Patience sabse bada skill hai investing me," tab Rohit samjha ki wealth overnight nahi banti.`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 8 dekhiye",
    ctaLink: "/learn/level-8",
    relatedLevel: 8,
    publishedDate: "2024-12-27",
    category: "stock-faqs",
  },
];

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}
