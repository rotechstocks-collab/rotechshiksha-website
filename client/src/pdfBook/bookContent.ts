// Premium Ebook Content - Stock Market Beginner Guide
// Hinglish storytelling format with Priya & Rohit

export interface Chapter {
  number: number;
  title: string;
  intro: string;
  takeaways: string[];
  comic: {
    speaker: 'priya' | 'rohit';
    text: string;
  };
  checklist: string[];
  hasWatermark?: boolean;
  hasChart?: 'pie' | 'risk';
}

export const bookContent = {
  title: "Stock Market Beginner Guide",
  subtitle: "Apna Pehla Investment Journey Shuru Karo",
  tagline: "Priya aur Rohit ke saath seekho, easy Hinglish mein!",
  
  chapters: [
    {
      number: 1,
      title: "Stock Market Kya Hai?",
      intro: "Stock market ek aisi jagah hai jahan companies apne shares bechti hain aur investors unhe khareedte hain. Jab tum share khareedte ho, tum us company ke chhote hisse ke maalik ban jaate ho. Simple hai na?",
      takeaways: [
        "Share = Company ka chhota hissa",
        "BSE aur NSE = India ke do main stock exchanges",
        "Sensex aur Nifty = Market ke health indicators"
      ],
      comic: {
        speaker: 'rohit',
        text: "Yaar Priya, stock market toh bahut risky lagta hai. Kya sach mein invest karna chahiye?"
      },
      checklist: [
        "Stock market basics samajh liya",
        "BSE vs NSE ka difference clear",
        "Index ka matlab pata chala"
      ],
      hasWatermark: true
    },
    {
      number: 2,
      title: "Demat Account Kaise Kholein?",
      intro: "Demat account ek digital locker hai jahan tumhare shares safely store hote hain. Bina Demat account ke tum shares khareed ya bech nahi sakte. Zerodha, Groww, ya Angel One se easily khol sakte ho.",
      takeaways: [
        "Demat = Dematerialized account (digital shares)",
        "Trading account bhi zaruri hai buying/selling ke liye",
        "KYC documents: Aadhaar, PAN, Bank details"
      ],
      comic: {
        speaker: 'priya',
        text: "Rohit, Demat account kholna sirf 10 minute ka kaam hai! Aaj kal toh mobile se bhi ho jaata hai. Main khud Zerodha use karti hoon."
      },
      checklist: [
        "PAN card ready hai",
        "Aadhaar link with mobile",
        "Bank account details available"
      ]
    },
    {
      number: 3,
      title: "IPO vs Direct Stock Buying",
      intro: "IPO (Initial Public Offering) tab hota hai jab company pehli baar apne shares public ko bechti hai. Direct buying mein tum already listed shares secondary market se khareedte ho.",
      takeaways: [
        "IPO = Company ki pehli public sale",
        "Listing gains possible but not guaranteed",
        "Direct buying = More control, instant execution"
      ],
      comic: {
        speaker: 'rohit',
        text: "Priya, IPO mein apply karna chahiye ya seedha shares khareed loon? Confused hoon!"
      },
      checklist: [
        "IPO calendar check karna seekha",
        "Company fundamentals dekhna important",
        "Grey market premium samjha"
      ],
      hasWatermark: true
    },
    {
      number: 4,
      title: "Market Timing: Kab Invest Karein?",
      intro: "Time in the market beats timing the market. Bahut log perfect time dhundne mein itna time waste karte hain ki invest hi nahi karte. Best time to invest is NOW, agar tumhara paisa long term ke liye hai.",
      takeaways: [
        "Perfect timing possible nahi hai",
        "SIP best hai regular investing ke liye",
        "Market crashes = Buying opportunities"
      ],
      comic: {
        speaker: 'priya',
        text: "Dekh Rohit, mere papa kehte hain - 'Time in market is more important than timing the market.' SIP kar aur tension mat le!"
      },
      checklist: [
        "Emergency fund ready (6 months expenses)",
        "Long term mindset set",
        "SIP date fixed monthly"
      ]
    },
    {
      number: 5,
      title: "SIP: Systematic Investment Plan",
      intro: "SIP matlab har mahine fixed amount invest karna. Rupee cost averaging se benefit milta hai - jab market girta hai toh zyada units milti hain, jab badhta hai toh kam. Long term mein average out ho jaata hai.",
      takeaways: [
        "SIP = Har mahine automatic investment",
        "Rupee cost averaging = Risk kam",
        "Compound interest ka magic long term mein"
      ],
      comic: {
        speaker: 'rohit',
        text: "Matlab agar main Rs 5000 monthly SIP karunga toh market ke ups-downs se itna affect nahi hoga?"
      },
      checklist: [
        "Monthly SIP amount decide kiya",
        "Bank auto-debit set up",
        "10+ years ka commitment"
      ],
      hasChart: 'pie'
    },
    {
      number: 6,
      title: "Risk Management: 60-30-10 Rule",
      intro: "Smart investors apna paisa 3 buckets mein divide karte hain: 60% safe investments (FD, bonds), 30% moderate risk (mutual funds), 10% high risk (direct stocks). Ye allocation tumhari age aur risk appetite pe depend karta hai.",
      takeaways: [
        "Diversification = Ande alag baskets mein",
        "Young investors can take more risk",
        "Never invest borrowed money"
      ],
      comic: {
        speaker: 'priya',
        text: "Rohit, hum dono 25 ke hain toh hum 70-20-10 bhi kar sakte hain. Young age mein thoda zyada risk affordable hai!"
      },
      checklist: [
        "Risk tolerance assess kiya",
        "Portfolio diversified hai",
        "Emergency fund alag rakha"
      ],
      hasChart: 'pie',
      hasWatermark: true
    },
    {
      number: 7,
      title: "Trading vs Long-term Investing",
      intro: "Trading = Short term buying-selling for quick profits. Investing = Long term wealth creation. 90% traders lose money, jabki 90% long-term investors make money. Choose wisely!",
      takeaways: [
        "Trading = High risk, requires full-time attention",
        "Investing = Patience pays, compound growth",
        "Start with investing, learn trading later"
      ],
      comic: {
        speaker: 'rohit',
        text: "Mujhe toh jaldi paisa chahiye! Trading se jaldi rich ho jaaunga na?"
      },
      checklist: [
        "Long term goals clear",
        "Trading myths busted",
        "Patience mindset adopted"
      ],
      hasChart: 'risk'
    },
    {
      number: 8,
      title: "Basic Chart Concepts",
      intro: "Charts price movements dikhate hain. Green candle = price up, Red candle = price down. Support level pe price rukta hai neeche jaane se, Resistance level pe price rukta hai upar jaane se.",
      takeaways: [
        "Candlestick = Price movement in timeframe",
        "Support = Floor, Resistance = Ceiling",
        "Volume = Trading activity indicator"
      ],
      comic: {
        speaker: 'priya',
        text: "Charts samajhna zaroori hai Rohit, lekin pehle fundamentals strong karo. Technical analysis baad mein seekhna."
      },
      checklist: [
        "Basic candlestick patterns samjhe",
        "Support-Resistance concept clear",
        "Free charting tools explore kiye"
      ]
    },
    {
      number: 9,
      title: "Common Beginner Mistakes",
      intro: "Har beginner ye galtiyan karta hai: FOMO se invest karna, tips pe trust karna, panic selling, aur portfolio check karne ka addiction. In mistakes se bach ke rahoge toh journey smooth hogi.",
      takeaways: [
        "FOMO = Fear Of Missing Out (avoid it!)",
        "WhatsApp/Telegram tips = Usually scams",
        "Patience is the real wealth creator"
      ],
      comic: {
        speaker: 'rohit',
        text: "Yaar, mera friend keh raha tha ye stock 10x jaayega! Invest kar doon kya?"
      },
      checklist: [
        "FOMO control seekha",
        "Free tips ignore karna",
        "Own research important"
      ],
      hasWatermark: true
    },
    {
      number: 10,
      title: "Your Action Plan",
      intro: "Ab action lene ka time hai! Ye 5 steps follow karo: 1) Demat account kholo, 2) Emergency fund ready karo, 3) SIP shuru karo Rs 500 se bhi, 4) Ek achhi book padho, 5) Community join karo seekhne ke liye.",
      takeaways: [
        "Start small, but start TODAY",
        "Consistency > Big one-time investments",
        "Learning never stops in market"
      ],
      comic: {
        speaker: 'priya',
        text: "Chalo Rohit, aaj hi Zerodha pe account khol lete hain! Main tujhe step-by-step guide karungi. Rotech Shiksha pe aur bhi courses hain!"
      },
      checklist: [
        "Demat account open kiya",
        "First SIP start kiya",
        "Rotech Shiksha bookmark kiya"
      ]
    }
  ] as Chapter[]
};
