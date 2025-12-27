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
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "share-market-kya-hota-hai",
    title: "Share Market kya hota hai? (Beginner Guide)",
    shortDescription: "Share market basics Hindi me samjho. Bilkul shuruwat se, bina kisi confusion ke.",
    content: `Share market ek aisi jagah hai jahan companies apne shares (hissa) bechti hain aur log unhe khareedte hain. Jab aap kisi company ka share khareedte ho, toh aap us company ke chhote se hisse ke maalik ban jaate ho.

Isko simple example se samjho: Agar ek dukaan hai jiska 100 hissa hai, aur aap 1 hissa khareedte ho, toh aap us dukaan ke 1% maalik ho. Agar dukaan ka profit hota hai, toh aapko bhi profit milta hai.

Share market me do main exchanges hain India me:
• NSE (National Stock Exchange)
• BSE (Bombay Stock Exchange)

Yahan pe companies listed hoti hain aur log shares khareed aur bech sakte hain. Ye sab SEBI (Securities and Exchange Board of India) ki nigrani me hota hai jo investors ko protect karta hai.

Important baat: Share market sirf trading nahi hai. Ye long-term wealth creation ka ek tarika hai jab sahi knowledge aur patience ke saath use kiya jaye.`,
    rohitPriyaStory: `Rohit ne pehli baar jab "share market" suna, toh usse laga ye sirf ameer logon ke liye hai. Par Priya ne use samjhaya ki ye ek learning journey hai jo koi bhi start kar sakta hai – bas sahi guidance chahiye.`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 1 dekhiye",
    ctaLink: "/learn/level-1",
    relatedLevel: 1,
    publishedDate: "2024-12-27",
  },
  {
    id: "2",
    slug: "stock-aur-share-me-difference",
    title: "Stock aur Share me kya difference hai?",
    shortDescription: "Stock aur share – dono same lagte hain par thoda difference hai. Simple Hindi me samjho.",
    content: `Bahut log "stock" aur "share" ko same samajhte hain, aur mostly ye sahi bhi hai. Par thoda technical difference hai:

Share: Jab aap kisi specific company ka hissa khareedte ho, use share kehte hain. Jaise "Maine Reliance ke 10 shares khareedे."

Stock: Ye ek broader term hai jo general ownership ko define karta hai. Jaise "Mere paas Indian stocks hain" – matlab multiple companies ke shares.

Simple rule yaad rakho:
• Share = Specific company ka hissa
• Stock = General term for ownership in companies

India me mostly dono words interchangeably use hote hain, toh zyada confuse hone ki zarurat nahi hai.

Ek aur important term hai: Equity. Ye bhi same concept hai – company me aapka ownership stake.`,
    rohitPriyaStory: `Rohit initially confused tha ki "stock" aur "share" alag hain ya same. Priya ne haste hue kaha, "Rohit, India me dono same hai. Technical difference chhodo, concept samjho!"`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 2 dekhiye",
    ctaLink: "/learn/level-2",
    relatedLevel: 2,
    publishedDate: "2024-12-27",
  },
  {
    id: "3",
    slug: "sip-kya-hai-beginners-ke-liye",
    title: "SIP kya hai aur beginners ke liye kyun best hai?",
    shortDescription: "SIP se investing kaise shuru karein? Beginners ke liye simple guide Hindi me.",
    content: `SIP ka full form hai Systematic Investment Plan. Ye ek tarika hai jisme aap regular intervals pe (monthly, weekly) fixed amount invest karte ho mutual funds me.

SIP kyun best hai beginners ke liye:

1. Chhoti amount se start kar sakte ho: Rs. 500/month se bhi SIP start ho sakta hai.

2. Discipline develop hota hai: Har month ek fixed date pe automatically paisa invest hota hai.

3. Rupee Cost Averaging: Market upar ho ya neeche, aap regular invest karte ho, toh average cost balance hota hai.

4. Compounding ka fayda: Long term me chhote amounts bhi bade ho jaate hain.

5. No need to time the market: Beginners ko market timing ki tension nahi rehti.

Example: Agar aap Rs. 5000/month 10 saal tak invest karo 12% return pe, toh:
• Total investment: Rs. 6,00,000
• Approximate value: Rs. 11,60,000+

Important disclaimer: Returns guaranteed nahi hote. Market risk hota hai. Par long-term consistent investing historically kaam kiya hai.`,
    rohitPriyaStory: `Rohit ko lagta tha ki investing ke liye lakhs chahiye. Priya ne use dikhaya ki Rs. 500/month se bhi start ho sakta hai. "Pehle habit banao, amount baad me badhao" – ye Priya ki advice thi.`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 5 dekhiye",
    ctaLink: "/learn/level-5",
    relatedLevel: 5,
    publishedDate: "2024-12-27",
  },
  {
    id: "4",
    slug: "risk-management-kya-hota-hai",
    title: "Risk management kya hota hai?",
    shortDescription: "Share market me risk se kaise bachein? Simple Hinglish me risk management samjho.",
    content: `Risk management ka matlab hai – apne paison ko protect karna jab market me uncertainty ho.

Har investment me risk hota hai. Par smart investors risk ko manage karte hain, eliminate nahi (kyunki wo possible nahi hai).

Risk management ke basic rules:

1. Kabhi bhi ek jagah sara paisa mat lagao: Diversification zaroori hai. Different stocks, sectors, aur asset classes me invest karo.

2. Sirf wahi paisa invest karo jo afford kar sako lose karne ka: Emergency fund alag rakho.

3. Stop loss use karo: Decide karo ki maximum kitna loss accept karoge aur us point pe exit karo.

4. Position sizing: Ek trade me portfolio ka 5-10% se zyada risk mat lo.

5. Emotions pe control rakho: Greed aur fear sabse bade enemies hain.

6. Regular review karo: Market conditions change hote hain, toh portfolio bhi adjust karna padta hai.

Remember: "Capital protection > Capital appreciation" – Pehle paisa bachao, phir badhao.`,
    rohitPriyaStory: `Rohit ne pehli loss ke baad panic kiya. Priya ne samjhaya, "Loss hona normal hai. Important ye hai ki aap kitna lose kar sakte ho wo pehle decide karo aur us limit pe ruko."`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 4 dekhiye",
    ctaLink: "/learn/level-4",
    relatedLevel: 4,
    publishedDate: "2024-12-27",
  },
  {
    id: "5",
    slug: "long-term-investing-kyun-important-hai",
    title: "Long-term investing beginners ke liye kyun important hai?",
    shortDescription: "Long-term investing ka power kya hai? Compounding aur patience ka magic samjho.",
    content: `Long-term investing ka matlab hai shares ya mutual funds ko 5, 10, 20 saal ya zyada time ke liye hold karna.

Kyun important hai long-term investing:

1. Compounding ka magic: Albert Einstein ne compounding ko "8th wonder of the world" bola tha. Jab aapka profit bhi profit generate kare, tab real wealth banti hai.

2. Market volatility se bachav: Short-term me market upar-neeche hota hai. Par historically, long-term me market generally upar gaya hai.

3. Tax benefits: India me 1 saal se zyada hold karne pe Long Term Capital Gains (LTCG) tax kam lagta hai.

4. Emotional mistakes kam: Daily market dekh ke panic decisions lene ka chance kam ho jata hai.

5. Time in market > Timing the market: Market time karna mushkil hai. Par zyada time invest rehna almost always better results deta hai.

Example: Sensex 1979 me ~100 points tha. 2024 me 70,000+ hai. Jo log invested rahe, unka wealth multiply hua.

Important: Long-term matlab "ignore karo" nahi hai. Regular review zaroori hai, par har dip pe panic selling galat hai.`,
    rohitPriyaStory: `Rohit initially quick profits chahta tha. Par jab Priya ne compounding ka power dikhaya aur bola ki "Patience sabse bada skill hai investing me," tab Rohit samjha ki wealth overnight nahi banti.`,
    ctaText: "Is topic ko detail me samajhne ke liye Level 8 dekhiye",
    ctaLink: "/learn/level-8",
    relatedLevel: 8,
    publishedDate: "2024-12-27",
  },
];
