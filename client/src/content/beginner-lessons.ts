import { LessonData } from "@/components/BeginnerLessonLayout";

// All 13 lessons for the Beginner Stock Market Course

export const beginnerLessons: Record<string, LessonData> = {
  // Module 1: Stock Market ki Shuruaat

  "paise-invest-kyu": {
    slug: "paise-invest-kyu",
    moduleNumber: 1,
    lessonNumber: 1,
    title: "Paise ko invest kyu karna chahiye?",
    duration: "8 min",
    prevLesson: undefined,
    nextLesson: { slug: "stock-market-kya-hai", title: "Stock market kya hota hai?" },
    scenes: [
      {
        id: "m1l1-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya didi, main har mahine thoda paisa bacha leta hun. Par wo bank me pade pade same hi rehta hai. Kya kuch aur bhi kar sakte hain?",
        ],
      },
      {
        id: "m1l1-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, bahut accha sawaal hai. Bank me paisa safe rehta hai, lekin wo grow nahi hota. Ek simple example se samjho...",
        ],
      },
      {
        id: "m1l1-s3",
        type: "example",
        title: "Aam Wali Dukaan",
        content: [
          "Soch, tere paas 100 rupaye hain. Aaj ek kilo aam 100 rupaye ka hai.",
          "5 saal baad, wohi aam 150 rupaye ka ho gaya (mehangai ki wajah se).",
          "Agar tune bank me rakha aur uspe 3-4% interest mila, toh tere paas shayad 120 rupaye honge.",
          "Ab tu 1 kilo aam bhi nahi kharid sakta! Teri purchasing power kam ho gayi.",
        ],
      },
      {
        id: "m1l1-s4",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Oh! Toh mehangai mere paise ki value kam kar deti hai?",
        ],
      },
      {
        id: "m1l1-s5",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bilkul sahi samjhe! Isi liye hume apne paise ko aise jagah lagana chahiye jahan wo mehangai se zyada grow kare.",
          "Investing ka matlab hai – apne paise ko kaam pe lagana, taaki wo bade aur teri purchasing power bani rahe ya badhe.",
        ],
      },
      {
        id: "m1l1-s6",
        type: "concept",
        title: "Investing Ka Simple Matlab",
        content: [
          "Investing = Apne paise ko aise jagah lagana jahan wo time ke saath badhe.",
          "Ye FD, Mutual Funds, Stock Market, ya Real Estate – kuch bhi ho sakta hai.",
          "Goal hai: Mehangai se zyada return paana, taaki future me teri buying power kam na ho.",
        ],
      },
      {
        id: "m1l1-s7",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Bank me paisa safe hai, par wo grow nahi hota utna jitni mehangai badhti hai",
          "Mehangai (inflation) har saal cheezon ko mehangi karti hai",
          "Investing ka matlab hai paise ko kaam pe lagana taaki wo badhe",
          "Goal: Mehangai se zyada return paana",
        ],
      },
    ],
  },

  "stock-market-kya-hai": {
    slug: "stock-market-kya-hai",
    moduleNumber: 1,
    lessonNumber: 2,
    title: "Stock market kya hota hai?",
    duration: "10 min",
    prevLesson: { slug: "paise-invest-kyu", title: "Paise ko invest kyu karna chahiye?" },
    nextLesson: { slug: "share-kya-hai", title: "Share kya hota hai?" },
    scenes: [
      {
        id: "m1l2-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, stock market stock market sunne me aata hai. Par ye actually hai kya? Koi building hai ya online kuch?",
        ],
      },
      {
        id: "m1l2-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Soch aise – stock market ek bazaar hai. Lekin yahan sabzi nahi, companies ke shares bikte hain!",
        ],
      },
      {
        id: "m1l2-s3",
        type: "example",
        title: "Sabzi Mandi Jaisa Soch",
        content: [
          "Jaise tere gaon me sabzi mandi hoti hai – farmers apni sabzi laate hain, log khareedte hain.",
          "Stock market bhi aise hi hai, bas yahan pe companies apne shares bechti hain aur log unhe khareedte hain.",
          "Pehle ye sab ek building me hota tha (jaise Dalal Street, Mumbai). Ab sab online ho gaya hai.",
        ],
      },
      {
        id: "m1l2-s4",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Accha, toh main bhi ghar baithe khareed sakta hun?",
        ],
      },
      {
        id: "m1l2-s5",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Haan! Aaj kal mobile app se bhi ho jaata hai. Par pehle basics samjhna zaroori hai.",
          "India me do main stock exchanges hain: NSE (National Stock Exchange) aur BSE (Bombay Stock Exchange).",
        ],
      },
      {
        id: "m1l2-s6",
        type: "concept",
        title: "NSE aur BSE",
        content: [
          "NSE – National Stock Exchange: Sabse bada stock exchange hai India ka. Yahan Nifty 50 track hota hai.",
          "BSE – Bombay Stock Exchange: Duniya ka sabse purana stock exchange me se ek. Yahan Sensex track hota hai.",
          "Dono jagah same companies ke shares available hote hain. Tum dono me se kisi pe bhi trade kar sakte ho.",
        ],
      },
      {
        id: "m1l2-s7",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Stock market ek bazaar hai jahan companies ke shares bikte hain",
          "Pehle physical tha, ab online hai – mobile se bhi access ho sakta hai",
          "India me NSE aur BSE do main exchanges hain",
          "Dono pe same companies available hoti hain",
        ],
      },
    ],
  },

  "share-kya-hai": {
    slug: "share-kya-hai",
    moduleNumber: 1,
    lessonNumber: 3,
    title: "Share kya hota hai?",
    duration: "8 min",
    prevLesson: { slug: "stock-market-kya-hai", title: "Stock market kya hota hai?" },
    nextLesson: { slug: "sensex-nifty", title: "Sensex aur Nifty simple samjhaav" },
    scenes: [
      {
        id: "m1l3-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, ye share exactly kya hota hai? Log kehte hain 'maine Reliance ke share liye' – iska matlab kya hai?",
        ],
      },
      {
        id: "m1l3-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bahut simple hai! Share matlab hissa. Jab tu kisi company ka share khareedte hai, toh tu us company ka thoda sa owner ban jaata hai.",
        ],
      },
      {
        id: "m1l3-s3",
        type: "example",
        title: "Pizza Wala Example",
        content: [
          "Soch tu aur tere 3 dost milke ek pizza khareedte ho jo 400 rupaye ka hai.",
          "Har kisi ne 100 rupaye diye, toh har kisika 25% hissa hai us pizza me.",
          "Agar pizza ki jagah ek company hoti, toh har ek ke paas us company ka 25% share hota!",
        ],
      },
      {
        id: "m1l3-s4",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Oh! Toh jab main Reliance ka share leta hun, main Reliance ka thoda owner ban gaya?",
        ],
      },
      {
        id: "m1l3-s5",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Haan, bahut chhota hissa – maybe 0.000001% – par technically haan, tu shareholder hai!",
          "Aur agar company achha perform kare, toh tere share ki value badh sakti hai.",
        ],
      },
      {
        id: "m1l3-s6",
        type: "concept",
        title: "Share ka Matlab",
        content: [
          "Share = Company ka ek chhota hissa",
          "Jitne zyada shares, utna bada hissa tera",
          "Company profit kare toh share price badh sakta hai",
          "Company loss kare toh share price gir bhi sakta hai",
          "Share khareedte waqt hamesha soch samajh ke decision lo",
        ],
      },
      {
        id: "m1l3-s7",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Share ka matlab hai company ka ek chhota hissa",
          "Share khareedte hi tu us company ka partial owner ban jaata hai",
          "Company ka performance share price ko affect karta hai",
          "Share invest karna ek serious decision hai – soch samajh ke lo",
        ],
      },
    ],
  },

  "sensex-nifty": {
    slug: "sensex-nifty",
    moduleNumber: 1,
    lessonNumber: 4,
    title: "Sensex aur Nifty simple samjhaav",
    duration: "12 min",
    prevLesson: { slug: "share-kya-hai", title: "Share kya hota hai?" },
    nextLesson: { slug: "ipo-kya-hai", title: "IPO kya hota hai?" },
    scenes: [
      {
        id: "m1l4-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, news me roz kehte hain 'Sensex 500 points gira' ya 'Nifty all time high pe hai'. Ye dono cheezein kya hain?",
        ],
      },
      {
        id: "m1l4-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bahut accha sawaal! Sensex aur Nifty dono market ke health checkup jaisa hai. Ek simple example se samjhaati hun...",
        ],
      },
      {
        id: "m1l4-s3",
        type: "example",
        title: "Class Ka Average Marks",
        content: [
          "Soch teri class me 50 students hain. Teacher sabka marks count nahi kar sakte exam ke baad.",
          "Toh wo sirf top 30 ya 50 students ka average nikaale – isse pata chalta hai overall class kaisi perform kar rahi hai.",
          "Sensex aur Nifty bhi aise hi kaam karte hain – kuch select companies ka average dekh ke poore market ka andaaza lagate hain.",
        ],
      },
      {
        id: "m1l4-s4",
        type: "concept",
        title: "Sensex Kya Hai?",
        content: [
          "Sensex BSE (Bombay Stock Exchange) pe based hai",
          "Ye top 30 companies ka average hai",
          "Companies jaise TCS, Reliance, HDFC Bank isme hain",
          "Agar Sensex badha, matlab in top companies overall achha perform kar rahin hain",
        ],
      },
      {
        id: "m1l4-s5",
        type: "concept",
        title: "Nifty 50 Kya Hai?",
        content: [
          "Nifty NSE (National Stock Exchange) pe based hai",
          "Ye top 50 companies ka average hai",
          "Thoda broader picture deta hai Sensex se",
          "Trading aur mutual funds me Nifty zyada use hota hai",
        ],
      },
      {
        id: "m1l4-s6",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Toh agar Nifty upar gaya, matlab market achha chal raha hai?",
        ],
      },
      {
        id: "m1l4-s7",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Generally haan, par ye sirf top companies ka average hai. Chhoti companies ka haal alag ho sakta hai.",
          "Isi liye sirf Nifty dekh ke poora market mat judge karo. Par ek quick indicator zaroor hai.",
        ],
      },
      {
        id: "m1l4-s8",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Sensex = BSE ki top 30 companies ka average",
          "Nifty 50 = NSE ki top 50 companies ka average",
          "Ye market ki overall health batate hain",
          "Par ye sirf top companies hai – poori market ka picture nahi",
        ],
      },
    ],
  },

  "ipo-kya-hai": {
    slug: "ipo-kya-hai",
    moduleNumber: 1,
    lessonNumber: 5,
    title: "IPO kya hota hai?",
    duration: "10 min",
    prevLesson: { slug: "sensex-nifty", title: "Sensex aur Nifty simple samjhaav" },
    nextLesson: { slug: "demat-account", title: "Demat account kya hota hai?" },
    scenes: [
      {
        id: "m1l5-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, news me sunna tha 'XYZ company ka IPO aa raha hai'. IPO kya hota hai?",
        ],
      },
      {
        id: "m1l5-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "IPO matlab Initial Public Offering. Simple bhasha me – company pehli baar public ko apne shares bech rahi hai.",
        ],
      },
      {
        id: "m1l5-s3",
        type: "example",
        title: "Dukan Se Company Tak",
        content: [
          "Soch tu ek chhoti chai ki dukan chalata hai. Teri family aur kuch dost ne milke paisa lagaya.",
          "Ab teri dukan badi ho gayi, 50 outlets kholne hain. Itna paisa tere paas nahi hai.",
          "Toh tu decide karta hai – 'main apni company ke shares public ko bechuga, unse paisa leke expand karuga'.",
          "Ye pehli baar jab tu public ko shares bechta hai – isko IPO kehte hain!",
        ],
      },
      {
        id: "m1l5-s4",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Oh! Toh IPO ke baad hi log stock market pe us company ke shares khareed sakte hain?",
        ],
      },
      {
        id: "m1l5-s5",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bilkul sahi! IPO se pehle company 'private' hoti hai – sirf founders aur investors ke paas shares hote hain.",
          "IPO ke baad company 'public' ho jaati hai – koi bhi stock market pe uske shares khareed-bech sakta hai.",
        ],
      },
      {
        id: "m1l5-s6",
        type: "concept",
        title: "IPO Ka Process",
        content: [
          "Company decide karti hai ki use public paisa chahiye",
          "Wo SEBI (regulator) ke paas apply karti hai",
          "IPO date fix hoti hai – log apply karte hain",
          "Shares allot hote hain – company stock market pe list ho jaati hai",
          "Ab koi bhi us company ke shares khareed sakta hai",
        ],
      },
      {
        id: "m1l5-s7",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "IPO = Initial Public Offering – company pehli baar public ko shares bechti hai",
          "IPO se pehle company private hoti hai",
          "IPO ke baad koi bhi stock market pe shares khareed sakta hai",
          "IPO company ko expand karne ke liye paisa deta hai",
        ],
      },
    ],
  },

  // Module 2: Account aur Basics

  "demat-account": {
    slug: "demat-account",
    moduleNumber: 2,
    lessonNumber: 6,
    title: "Demat account kya hota hai?",
    duration: "8 min",
    prevLesson: { slug: "ipo-kya-hai", title: "IPO kya hota hai?" },
    nextLesson: { slug: "trading-account", title: "Trading account kya hota hai?" },
    scenes: [
      {
        id: "m2l1-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, maine suna share khareedte ke liye Demat account chahiye. Ye kya cheez hai?",
        ],
      },
      {
        id: "m2l1-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Simple hai! Demat account ek digital locker hai jahan tere shares safe rehte hain.",
        ],
      },
      {
        id: "m2l1-s3",
        type: "example",
        title: "Bank Account Jaisa",
        content: [
          "Jaise tera bank account hai jahan paisa digitally store hota hai...",
          "Waise hi Demat account hai jahan shares digitally store hote hain.",
          "Pehle shares physical paper certificates me aate the – wo kho jaate the, damage ho jaate the.",
          "Ab sab digital hai – safe aur easy to manage.",
        ],
      },
      {
        id: "m2l1-s4",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Accha! Toh jab main share khareedunga, wo is account me aa jayega?",
        ],
      },
      {
        id: "m2l1-s5",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Haan! Jab tu share khareedte hai, T+1 day me (ek din baad) wo tere Demat account me credit ho jaata hai.",
          "Aur jab bechta hai, toh Demat se debit ho jaata hai.",
        ],
      },
      {
        id: "m2l1-s6",
        type: "concept",
        title: "Demat Account Points",
        content: [
          "Demat = Dematerialized – matlab physical paper se digital form me",
          "Ye tera shares ka digital locker hai",
          "CDSL aur NSDL do depositories hain jo ye accounts manage karti hain",
          "Broker ke through Demat account khulta hai",
        ],
      },
      {
        id: "m2l1-s7",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Demat account shares ka digital locker hai",
          "Pehle paper certificates hote the, ab sab digital hai",
          "Shares buy karne pe Demat me credit, sell karne pe debit hota hai",
          "Broker ke through Demat account kholta hai",
        ],
      },
    ],
  },

  "trading-account": {
    slug: "trading-account",
    moduleNumber: 2,
    lessonNumber: 7,
    title: "Trading account kya hota hai?",
    duration: "8 min",
    prevLesson: { slug: "demat-account", title: "Demat account kya hota hai?" },
    nextLesson: { slug: "share-kaise-kharide", title: "Share kaise kharide-beche jaate hain?" },
    scenes: [
      {
        id: "m2l2-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, Demat account samajh aaya. Par trading account alag hota hai kya?",
        ],
      },
      {
        id: "m2l2-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Haan! Trading account aur Demat account dono different hain par dono chahiye.",
          "Ek simple example se samjhaati hun...",
        ],
      },
      {
        id: "m2l2-s3",
        type: "example",
        title: "Online Shopping Jaisa",
        content: [
          "Jab tu Amazon pe shopping karta hai, tera bank account paisa deta hai, aur order place hota hai.",
          "Stock market me Trading Account wahi kaam karta hai – buy/sell orders place karta hai.",
          "Aur Demat Account tera godown hai jahan delivery aati hai (shares store hote hain).",
        ],
      },
      {
        id: "m2l2-s4",
        type: "concept",
        title: "Trading Account Ka Kaam",
        content: [
          "Trading account se tu stock exchange pe buy/sell orders place karta hai",
          "Ye tere Demat aur Bank account ke beech ka link hai",
          "Broker ye account provide karta hai",
          "Aaj kal dono account saath me khul jaate hain (3-in-1 account)",
        ],
      },
      {
        id: "m2l2-s5",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Oh! Toh Teen account chahiye? Bank, Demat, aur Trading?",
        ],
      },
      {
        id: "m2l2-s6",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Technically haan! Par aaj kal brokers teeno saath me link kar dete hain.",
          "Ek app se sab manage ho jaata hai – bohot easy hai.",
        ],
      },
      {
        id: "m2l2-s7",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Trading account buy/sell orders place karne ke liye hai",
          "Demat account shares store karne ke liye hai",
          "Bank account paisa dene aur receive karne ke liye hai",
          "Aaj kal teeno linked hote hain – ek app se manage ho jaata hai",
        ],
      },
    ],
  },

  "share-kaise-kharide": {
    slug: "share-kaise-kharide",
    moduleNumber: 2,
    lessonNumber: 8,
    title: "Share kaise kharide-beche jaate hain?",
    duration: "12 min",
    prevLesson: { slug: "trading-account", title: "Trading account kya hota hai?" },
    nextLesson: { slug: "price-kaise-move", title: "Market me price kaise move karta hai?" },
    scenes: [
      {
        id: "m2l3-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, ab Demat aur Trading account samajh aa gaya. Par actually share kaise khareedu?",
        ],
      },
      {
        id: "m2l3-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bohot simple hai! Step by step samjhaati hun...",
        ],
      },
      {
        id: "m2l3-s3",
        type: "concept",
        title: "Share Khareedte Ka Process",
        content: [
          "Step 1: Broker ki app kholo (Zerodha, Groww, Angel One, etc.)",
          "Step 2: Jo company khareedte chahte ho, uska naam search karo",
          "Step 3: Buy button dabao, kitne shares chahiye wo daalo",
          "Step 4: Market Order ya Limit Order select karo",
          "Step 5: Order place karo – done!",
        ],
      },
      {
        id: "m2l3-s4",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Market Order aur Limit Order me kya farak hai?",
        ],
      },
      {
        id: "m2l3-s5",
        type: "example",
        title: "Sabzi Khareedte Jaisa",
        content: [
          "Market Order: 'Jo bhi rate chal raha hai, wo de do' – turant mil jaata hai.",
          "Limit Order: 'Mujhe 50 rupaye me chahiye, nahi toh nahi' – sirf teri price pe milega ya cancel.",
          "Beginners ke liye Market Order simple hai, par Limit Order pe zyada control milta hai.",
        ],
      },
      {
        id: "m2l3-s6",
        type: "concept",
        title: "Share Bechne Ka Process",
        content: [
          "Bilkul same hai – bas Buy ki jagah Sell button dabao",
          "Jo shares tere Demat me hain, wo dikhai denge",
          "Kitne bechne hain select karo, order place karo",
          "Sell hone pe paisa T+1 day me bank me aa jaata hai",
        ],
      },
      {
        id: "m2l3-s7",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Broker app se share khareedte aur bechte hain",
          "Market Order = current price pe turant buy/sell",
          "Limit Order = apni set ki hui price pe hi buy/sell",
          "Shares T+1 day me Demat me aate hain, paisa T+1 day me bank me",
        ],
      },
    ],
  },

  "price-kaise-move": {
    slug: "price-kaise-move",
    moduleNumber: 2,
    lessonNumber: 9,
    title: "Market me price kaise move karta hai?",
    duration: "10 min",
    prevLesson: { slug: "share-kaise-kharide", title: "Share kaise kharide-beche jaate hain?" },
    nextLesson: { slug: "long-term-investing", title: "Long term investing kya hota hai?" },
    scenes: [
      {
        id: "m2l4-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, ek baat samajh nahi aati. Share ka price roz upar neeche kyu hota hai?",
        ],
      },
      {
        id: "m2l4-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bahut basic sawaal hai aur samajhna zaroori hai! Isko demand-supply kehte hain.",
        ],
      },
      {
        id: "m2l4-s3",
        type: "example",
        title: "Cricket Match Ticket",
        content: [
          "Soch India vs Pakistan ka match hai. Sab ko ticket chahiye.",
          "Tickets limited hain, demand zyada hai – ticket ka price badh gaya!",
          "Ab soch – ek boring match hai jisko koi dekhna nahi chahta.",
          "Tickets bech nahi rahe – price kam karna padega.",
          "Stock market me bhi yahi hota hai!",
        ],
      },
      {
        id: "m2l4-s4",
        type: "concept",
        title: "Demand-Supply Ka Rule",
        content: [
          "Zyada log khareedte chahte hain (demand badhi) = Price upar jaata hai",
          "Zyada log bechte chahte hain (supply badhi) = Price neeche aata hai",
          "Har second lakho log buy/sell kar rahe hain – isliye price har second change hota hai",
        ],
      },
      {
        id: "m2l4-s5",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Par log kyu khareedte ya bechte hain? Kya trigger karta hai?",
        ],
      },
      {
        id: "m2l4-s6",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bohot saari cheezein! Company ka result, news, government policy, global events...",
          "Agar positive news aayi – log sochte hain 'ye company achha karegi' – buying badhti hai.",
          "Negative news – log bechte hain – selling badhti hai.",
        ],
      },
      {
        id: "m2l4-s7",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Share price demand aur supply se move hota hai",
          "Zyada buyers = price upar, zyada sellers = price neeche",
          "News, results, events – sab price ko affect karte hain",
          "Market har second change hota hai kyunki lakho log trade kar rahe hain",
        ],
      },
    ],
  },

  // Module 3: Beginner Investing Soch

  "long-term-investing": {
    slug: "long-term-investing",
    moduleNumber: 3,
    lessonNumber: 10,
    title: "Long term investing kya hota hai?",
    duration: "10 min",
    prevLesson: { slug: "price-kaise-move", title: "Market me price kaise move karta hai?" },
    nextLesson: { slug: "risk-ka-matlab", title: "Risk ka matlab kya hai?" },
    scenes: [
      {
        id: "m3l1-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, sab kehte hain 'long term me invest karo'. Ye long term matlab kitna time?",
        ],
      },
      {
        id: "m3l1-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Long term generally 5+ saal maana jaata hai. Par idea ye hai ki jaldi paise nikaalte ki soch se invest na karo.",
        ],
      },
      {
        id: "m3l1-s3",
        type: "example",
        title: "Aam Ka Ped",
        content: [
          "Tune aam ka ped lagaya. Kya kal fruit aayega? Nahi!",
          "3-4 saal lagenge pehle fruit aane me. Par jab aayega, har saal milega.",
          "Stock market bhi aise hi hai – achhi company me invest karo, time do, grow hone do.",
          "Jo log roz-roz dekh ke ghabra jaate hain, wo ped ukhad dete hain fruit aane se pehle!",
        ],
      },
      {
        id: "m3l1-s4",
        type: "concept",
        title: "Long Term Investing Ke Fayde",
        content: [
          "Compounding ka magic – paisa paisa se paisa banata hai time ke saath",
          "Short term ups-downs matter nahi karte zyada",
          "Tension kam – roz-roz dekhne ki zaroorat nahi",
          "Tax benefits – 1 saal se zyada hold karo toh tax kam lagta hai",
        ],
      },
      {
        id: "m3l1-s5",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Par agar company kharab ho gayi toh?",
        ],
      },
      {
        id: "m3l1-s6",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Isliye company achhi choose karo, aur ek jagah sab paisa mat lagao. Ye diversification kehlaata hai.",
          "Aur haan, kabhi bhi 100% sure mat ho – isliye sirf wo paisa lagao jo tum afford kar sako kho bhi dena.",
        ],
      },
      {
        id: "m3l1-s7",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Long term = 5+ saal – patience rakhna zaroori hai",
          "Compounding time ke saath kaam karta hai",
          "Roz-roz price dekh ke ghabrao mat",
          "Achhi companies choose karo, diversify karo, patience rakho",
        ],
      },
    ],
  },

  "risk-ka-matlab": {
    slug: "risk-ka-matlab",
    moduleNumber: 3,
    lessonNumber: 11,
    title: "Risk ka matlab kya hai?",
    duration: "8 min",
    prevLesson: { slug: "long-term-investing", title: "Long term investing kya hota hai?" },
    nextLesson: { slug: "beginner-mistakes", title: "Beginner common mistakes" },
    scenes: [
      {
        id: "m3l2-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, sab kehte hain stock market me 'risk' hai. Par risk exactly kya hai?",
        ],
      },
      {
        id: "m3l2-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Simple bhasha me – risk matlab ye chance ki tera paisa kam ho sakta hai ya loss ho sakta hai.",
        ],
      },
      {
        id: "m3l2-s3",
        type: "example",
        title: "Road Cross Karna",
        content: [
          "Jab tu busy road cross karta hai, risk hai ki accident ho sakta hai.",
          "Par tu left-right dekhta hai, zebra crossing use karta hai – risk manage karta hai.",
          "Stock market me bhi risk hai – par sahi knowledge se tu manage kar sakta hai.",
          "Risk se darna nahi, samajhna hai!",
        ],
      },
      {
        id: "m3l2-s4",
        type: "concept",
        title: "Stock Market Ke Risks",
        content: [
          "Market Risk: Poora market gir sakta hai (recession, crisis)",
          "Company Risk: Ek company kharab perform kar sakti hai",
          "Liquidity Risk: Kabhi-kabhi turant sell nahi ho paata",
          "Emotional Risk: Panic me galat decisions lena",
        ],
      },
      {
        id: "m3l2-s5",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Toh risk se bachne ka kya tarika hai?",
        ],
      },
      {
        id: "m3l2-s6",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Risk se 100% bachna possible nahi, par manage kar sakte ho:",
          "Diversify karo – ek jagah sab paisa mat lagao",
          "Sirf wo paisa lagao jo afford kar sako kho bhi dena",
          "Jaldi ameer banne ki scheme se door raho",
          "Seekho pehle, invest baad me",
        ],
      },
      {
        id: "m3l2-s7",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Risk = chance ki paisa kam ho sakta hai",
          "Risk se darna nahi, samajhna aur manage karna hai",
          "Diversification se risk kam hota hai",
          "Kabhi borrowed money se invest mat karo",
        ],
      },
    ],
  },

  "beginner-mistakes": {
    slug: "beginner-mistakes",
    moduleNumber: 3,
    lessonNumber: 12,
    title: "Beginner common mistakes",
    duration: "12 min",
    prevLesson: { slug: "risk-ka-matlab", title: "Risk ka matlab kya hai?" },
    nextLesson: { slug: "safe-learning-rules", title: "Safe learning rules" },
    scenes: [
      {
        id: "m3l3-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, beginners kya galtiyan karte hain jo mujhe avoid karni chahiye?",
        ],
      },
      {
        id: "m3l3-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bahut accha sawaal! Main common mistakes bataati hun jo almost har beginner karta hai...",
        ],
      },
      {
        id: "m3l3-s3",
        type: "concept",
        title: "Mistake 1: Tips Pe Invest Karna",
        content: [
          "WhatsApp group, YouTube, ya dost ne bola 'ye stock le lo' – aur tune le liya",
          "Ye sabse badi galti hai! Kisi aur ki tip pe kabhi invest mat karo",
          "Pehle khud samjho company kya karti hai, phir decision lo",
        ],
      },
      {
        id: "m3l3-s4",
        type: "concept",
        title: "Mistake 2: Jaldi Ameer Banne Ki Soch",
        content: [
          "'1 mahine me double paisa' – ye scheme hai, investment nahi",
          "Real wealth slowly banti hai, raat-o-raat nahi",
          "Jo jaldi ameer banne ka promise kare, usse door raho",
        ],
      },
      {
        id: "m3l3-s5",
        type: "concept",
        title: "Mistake 3: Panic Selling",
        content: [
          "Market gira, price 20% neeche aaya – tune ghabra ke bech diya",
          "Phir market wapas upar aaya – tune loss book kar liya tha",
          "Long term soch rakho, short term panic me react mat karo",
        ],
      },
      {
        id: "m3l3-s6",
        type: "concept",
        title: "Mistake 4: Sab Paisa Ek Jagah",
        content: [
          "Saari savings ek hi stock me laga di – bohot risky hai",
          "Agar wo stock gira, sab kuch gaya",
          "Diversify karo – alag-alag jagah thoda-thoda lagao",
        ],
      },
      {
        id: "m3l3-s7",
        type: "concept",
        title: "Mistake 5: Bina Seekhe Shuru Karna",
        content: [
          "Driving seekhe bina gaadi chalana risky hai",
          "Waise hi bina basics samjhe stock market me paisa lagana risky hai",
          "Pehle seekho, phir practice karo, phir invest karo",
        ],
      },
      {
        id: "m3l3-s8",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Tips pe invest mat karo – khud samjho",
          "Jaldi ameer banne ke chakkar me mat pado",
          "Market gire toh panic mat karo",
          "Sab paisa ek jagah mat lagao – diversify karo",
          "Pehle seekho, phir invest karo",
        ],
      },
    ],
  },

  "safe-learning-rules": {
    slug: "safe-learning-rules",
    moduleNumber: 3,
    lessonNumber: 13,
    title: "Safe learning rules",
    duration: "8 min",
    prevLesson: { slug: "beginner-mistakes", title: "Beginner common mistakes" },
    nextLesson: undefined,
    scenes: [
      {
        id: "m3l4-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Didi, ab basics samajh aa gaye. Safe tarike se aage kaise badhu?",
        ],
      },
      {
        id: "m3l4-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bahut accha! Ab main tujhe kuch golden rules deti hun jo hamesha yaad rakhna...",
        ],
      },
      {
        id: "m3l4-s3",
        type: "concept",
        title: "Rule 1: Emergency Fund Pehle",
        content: [
          "Invest karne se pehle 6 mahine ka kharcha savings me rakho",
          "Ye emergency fund hai – kabhi stock market me mat lagao",
          "Agar job gayi ya medical emergency aayi, ye kaam aayega",
        ],
      },
      {
        id: "m3l4-s4",
        type: "concept",
        title: "Rule 2: Sirf Extra Paisa Invest Karo",
        content: [
          "Rent, EMI, groceries ka paisa invest me mat lagao",
          "Sirf wo paisa lagao jo 5+ saal tak nahi chahiye",
          "Borrowed money se kabhi invest mat karo",
        ],
      },
      {
        id: "m3l4-s5",
        type: "concept",
        title: "Rule 3: Small Start Karo",
        content: [
          "Pehle chhoti amount se shuru karo – 500-1000 rupaye",
          "Samjho process kaise kaam karta hai",
          "Jab confidence aaye, slowly amount badhao",
        ],
      },
      {
        id: "m3l4-s6",
        type: "concept",
        title: "Rule 4: SIP Se Shuru Karo",
        content: [
          "Mutual Fund SIP ek safe starting point hai beginners ke liye",
          "Har mahine thoda-thoda invest karo automatically",
          "Market timing ki tension nahi – consistent investing",
        ],
      },
      {
        id: "m3l4-s7",
        type: "concept",
        title: "Rule 5: Seekhte Raho",
        content: [
          "Stock market ek subject hai – roz kuch naya seekhne milta hai",
          "Books padho, courses karo, par carefully",
          "Jo 'guaranteed returns' bole, usse door raho",
        ],
      },
      {
        id: "m3l4-s8",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, yaad rakh – stock market se paisa banana possible hai, par patience, knowledge, aur discipline chahiye.",
          "Jaldi ameer banne ke chakkar me bohot log paisa kho dete hain. Tu smart ban, patient ban.",
        ],
      },
      {
        id: "m3l4-s9",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Pehle emergency fund banao – 6 mahine ka kharcha",
          "Sirf extra paisa invest karo – borrowed money kabhi nahi",
          "Chhoti amount se shuru karo, slowly badhao",
          "SIP ek safe starting point hai beginners ke liye",
          "Seekhte raho, patient raho, smart decisions lo",
        ],
      },
    ],
  },
};

// Helper to get lesson by slug
export function getLessonBySlug(slug: string): LessonData | undefined {
  return beginnerLessons[slug];
}

// Get all lessons as array
export function getAllLessons(): LessonData[] {
  return Object.values(beginnerLessons);
}
