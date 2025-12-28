export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  channelName: string;
  category: "Basics" | "Trading" | "Investing" | "IPO" | "Mutual Funds" | "Psychology" | "Technical Analysis";
  playlistName?: string;
  duration?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

export interface Playlist {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  videos: string[];
}

export const videos: Video[] = [
  {
    id: "v1",
    title: "Stock Market Kya Hai? – Complete Beginner Guide",
    description: "Stock market ki complete jankari Hindi mein. Share bazaar mein paise kaise lagate hain aur kaise kaam karta hai.",
    youtubeId: "p7HKvqRI_Bo",
    channelName: "Zerodha Varsity",
    category: "Basics",
    playlistName: "Beginner Series",
    duration: "15:24",
    level: "Beginner",
  },
  {
    id: "v2",
    title: "Demat Account Kya Hota Hai? – Step by Step Samjho",
    description: "Demat account kholne ka tarika aur ye kaam kaise karta hai. Trading shuru karne se pehle ye samjhna zaroori hai.",
    youtubeId: "gBpCGYpSfkA",
    channelName: "CA Rachana Ranade",
    category: "Basics",
    playlistName: "Beginner Series",
    duration: "12:30",
    level: "Beginner",
  },
  {
    id: "v3",
    title: "IPO Kya Hota Hai? – Initial Public Offering Explained",
    description: "IPO mein invest kaise karein aur company public kyu hoti hai. Grey market premium bhi samjho.",
    youtubeId: "DRKQXL5l1TE",
    channelName: "Pranjal Kamra",
    category: "IPO",
    playlistName: "IPO Series",
    duration: "18:45",
    level: "Beginner",
  },
  {
    id: "v4",
    title: "Candlestick Patterns for Beginners – Chart Reading",
    description: "Technical analysis ki shuruaat. Candlestick patterns ko samjho aur trading decisions lo.",
    youtubeId: "SB35I3jL5vM",
    channelName: "Market Gurukul",
    category: "Technical Analysis",
    playlistName: "Technical Series",
    duration: "22:10",
    level: "Intermediate",
  },
  {
    id: "v5",
    title: "Mutual Funds Sahi Hai? – Complete Guide Hindi Mein",
    description: "Mutual funds mein invest kaise karein. SIP kya hota hai aur best funds kaise choose karein.",
    youtubeId: "0zj6zQ5O9P4",
    channelName: "Asset Yogi",
    category: "Mutual Funds",
    playlistName: "Investing Series",
    duration: "25:30",
    level: "Beginner",
  },
  {
    id: "v6",
    title: "Trading Psychology – Emotions Ko Kaise Control Karein",
    description: "Fear aur greed se kaise bachen. Successful traders ka mindset samjho.",
    youtubeId: "hM3E2V_9FLU",
    channelName: "Finology",
    category: "Psychology",
    playlistName: "Psychology Series",
    duration: "16:20",
    level: "Intermediate",
  },
  {
    id: "v7",
    title: "Intraday Trading Kaise Karein? – Day Trading Basics",
    description: "Intraday trading ki shuruaat. Same din buy aur sell kaise karein aur kya risks hain.",
    youtubeId: "2WmcrT-YjgU",
    channelName: "Pushkar Raj Thakur",
    category: "Trading",
    playlistName: "Trading Series",
    duration: "20:15",
    level: "Intermediate",
  },
  {
    id: "v8",
    title: "Sensex aur Nifty Kya Hai? – Index Explained Simply",
    description: "Indian stock market ke main indices ko samjho. Sensex 30 aur Nifty 50 mein kya difference hai.",
    youtubeId: "PzVxZdAQVvE",
    channelName: "Groww",
    category: "Basics",
    playlistName: "Beginner Series",
    duration: "10:45",
    level: "Beginner",
  },
  {
    id: "v9",
    title: "Support and Resistance – Technical Analysis Basics",
    description: "Charts pe support aur resistance levels kaise dhundhein. Entry aur exit points decide karo.",
    youtubeId: "qIcNp-BOVBE",
    channelName: "Trade Brains",
    category: "Technical Analysis",
    playlistName: "Technical Series",
    duration: "18:30",
    level: "Intermediate",
  },
  {
    id: "v10",
    title: "Long Term Investing vs Trading – Kya Sahi Hai?",
    description: "Investing aur trading mein difference. Apne goals ke hisaab se decide karo kya karna chahiye.",
    youtubeId: "aKj5zDnZvfE",
    channelName: "Zerodha Varsity",
    category: "Investing",
    playlistName: "Investing Series",
    duration: "14:20",
    level: "Beginner",
  },
  {
    id: "v11",
    title: "IPO Allotment Kaise Badhaye? – Tips & Tricks",
    description: "IPO mein allotment chances kaise improve karein. Multiple Demat accounts aur other strategies.",
    youtubeId: "YFqOp6wBDuo",
    channelName: "CA Rachana Ranade",
    category: "IPO",
    playlistName: "IPO Series",
    duration: "11:15",
    level: "Intermediate",
  },
  {
    id: "v12",
    title: "Options Trading Basics – Call aur Put Samjho",
    description: "Options trading ki shuruaat. Call options, put options aur basic strategies Hindi mein.",
    youtubeId: "SD7sw0bf1ms",
    channelName: "Pranjal Kamra",
    category: "Trading",
    playlistName: "Trading Series",
    duration: "28:40",
    level: "Advanced",
  },
  {
    id: "v13",
    title: "Risk Management in Trading – Loss Se Kaise Bachein",
    description: "Stop loss kaise lagayein aur position sizing samjho. Capital protect karna seekho.",
    youtubeId: "cqT7ug0WbcU",
    channelName: "Market Gurukul",
    category: "Psychology",
    playlistName: "Psychology Series",
    duration: "19:55",
    level: "Intermediate",
  },
  {
    id: "v14",
    title: "SIP vs Lumpsum – Kahan Invest Karein?",
    description: "Monthly SIP better hai ya ek baar mein invest karna? Dono methods compare karo.",
    youtubeId: "PXblJqKmLyg",
    channelName: "Asset Yogi",
    category: "Mutual Funds",
    playlistName: "Investing Series",
    duration: "13:30",
    level: "Beginner",
  },
  {
    id: "v15",
    title: "PE Ratio Kya Hai? – Company Valuation Basics",
    description: "Price to Earnings ratio samjho. Overvalued aur undervalued stocks kaise identify karein.",
    youtubeId: "JlZxpq7DPDU",
    channelName: "Finology",
    category: "Investing",
    playlistName: "Investing Series",
    duration: "15:10",
    level: "Intermediate",
  },
  {
    id: "v16",
    title: "Moving Averages – Trading Signal Kaise Milta Hai",
    description: "SMA aur EMA kya hote hain. Golden cross aur death cross patterns samjho.",
    youtubeId: "4R2CDbw4g88",
    channelName: "Trade Brains",
    category: "Technical Analysis",
    playlistName: "Technical Series",
    duration: "21:25",
    level: "Advanced",
  },
];

export const playlists: Playlist[] = [
  {
    id: "beginner",
    name: "Beginner Series",
    nameHi: "शुरुआती सीरीज़",
    description: "Stock market ki basic samajh ke liye perfect",
    videos: ["v1", "v2", "v8", "v5", "v10", "v14"],
  },
  {
    id: "trading",
    name: "Trading Series",
    nameHi: "ट्रेडिंग सीरीज़",
    description: "Active trading seekhne ke liye videos",
    videos: ["v7", "v12"],
  },
  {
    id: "investing",
    name: "Investing Series",
    nameHi: "इन्वेस्टिंग सीरीज़",
    description: "Long term wealth building ke tips",
    videos: ["v5", "v10", "v14", "v15"],
  },
  {
    id: "technical",
    name: "Technical Series",
    nameHi: "टेक्निकल सीरीज़",
    description: "Chart reading aur technical analysis",
    videos: ["v4", "v9", "v16"],
  },
  {
    id: "ipo",
    name: "IPO Series",
    nameHi: "IPO सीरीज़",
    description: "IPO investing complete guide",
    videos: ["v3", "v11"],
  },
  {
    id: "psychology",
    name: "Psychology Series",
    nameHi: "साइकोलॉजी सीरीज़",
    description: "Trading mindset aur emotions control",
    videos: ["v6", "v13"],
  },
];

export const categories = [
  "All",
  "Basics",
  "Trading",
  "Investing",
  "IPO",
  "Mutual Funds",
  "Psychology",
  "Technical Analysis",
] as const;

export const levels = ["All", "Beginner", "Intermediate", "Advanced"] as const;
