import { LessonData } from "@/components/BeginnerLessonLayout";

// All lessons for the Beginner Stock Market Course

export const beginnerLessons: Record<string, LessonData> = {
  // Module 1: Stock Market ki Shuruaat

  "stock-market-introduction": {
    slug: "stock-market-introduction",
    moduleNumber: 1,
    lessonNumber: 1,
    title: "Stock Market ka Introduction – Bina Darr ke",
    duration: "7 min",
    prevLesson: undefined,
    nextLesson: { slug: "paise-invest-kyu", title: "Paise ko invest kyu karna chahiye?" },
    scenes: [
      {
        id: "intro-welcome",
        type: "concept",
        title: "Aapka Swagat Hai",
        content: [
          "Stock market ke baare me sunke darr lagta hai? Lagta hai ye bahut mushkil hai? Ya socho ki 'ye sirf ameer logon ke liye hai'?",
          "Agar aisa lagta hai – toh ekdum normal hai. Bahut logon ko lagta hai. Par sach ye hai ki stock market utna mushkil nahi jitna lagta hai.",
          "Is course me hum bilkul zero se shuru karenge. Koi pehle se kuch jaanna zaroori nahi. Bas padhne ki thodi himmat chahiye – baaki hum sambhal lenge.",
        ],
      },
      {
        id: "intro-rohit-story",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Main Rohit hun. Ek normal job karta hun, thodi savings hai. Stock market ke baare me bahut suna hai – par samajh kuch nahi aata.",
          "News me dekhta hun 'Sensex gira', 'Nifty badha' – par matlab kya hai? Pata nahi. Log kehte hain invest karo – par kaise? Kya guarantee? Sab confusing lagta hai.",
          "Kya main bhi stock market seekh sakta hun? Ya ye sirf un logon ke liye hai jo already ameer hain?",
        ],
      },
      {
        id: "intro-priya-response",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, main Priya hun. Chal saath me stock market basics samajhte hain – ekdum simple Hindi me. Koi mushkil words nahi, koi jargon nahi.",
          "Pehle baat – tu akela nahi hai. Bahut log aise hi confuse hote hain. Aur ye confusion isliye hoti hai kyunki sahi jagah se seekha nahi.",
          "Doosri baat – stock market koi jua nahi hai. Aur na hi ye sirf ameer logon ke liye hai. Koi bhi seekh sakta hai – bas patience chahiye aur sahi guidance.",
          "Hum saath me step by step chalenge. Pehle basics, phir thoda deep, phir practical. Par jaldi mat kar – seekhne me time le.",
        ],
      },
      {
        id: "intro-myths-title",
        type: "concept",
        title: "3 Galat Baatein Jo Log Mante Hain",
        content: [
          "Stock market ke baare me bahut si galat baatein log mante hain. Chalo teen sabse common myths clear karte hain – taaki tumhare mann ka darr thoda kam ho.",
        ],
      },
      {
        id: "intro-myth-1",
        type: "concept",
        title: "Myth 1: 'Stock Market Jua Hai'",
        content: [
          "Ye sabse badi galat soch hai. Jua me luck chalti hai – koi control nahi. Par stock market me companies ka business hota hai.",
          "Jab tu share khareedte hai, tu ek real business me paisa laga raha hai. Company accha kaam karegi toh tujhe fayda. Bura karegi toh nuksaan.",
          "Soch – kya Reliance ya TCS jua khel rahi hain? Nahi. Wo business kar rahi hain. Tu sirf un businesses me invest kar raha hai.",
          "Haan, bina samjhe paisa lagana jua jaisa hai. Par samajh ke, research karke invest karna – wo informed decision hai.",
        ],
      },
      {
        id: "intro-myth-2",
        type: "concept",
        title: "Myth 2: 'Stock Market Sirf Ameer Logon Ke Liye Hai'",
        content: [
          "Pehle zamaane me shayad ye sach tha – jab shares kharidne ke liye lakhs rupaye chahiye hote the.",
          "Par ab zamana badal gaya. Aaj tu Rs. 100 se bhi start kar sakta hai. Bahut si acchi companies ke shares 500-1000 rupaye me milte hain.",
          "Aur agar wo bhi nahi afford kar sakta, toh Mutual Funds hain – jahan Rs. 100 monthly SIP se bhi shuru ho sakta hai.",
          "Paisa kam hai toh bhi tu seekh sakta hai, samajh sakta hai. Jab ready ho – chhote amount se shuru karna. Bade amount ki zaroorat nahi.",
        ],
      },
      {
        id: "intro-myth-3",
        type: "concept",
        title: "Myth 3: 'Bahut Padhna Padta Hai, Bahut Mushkil Hai'",
        content: [
          "Sach ye hai ki basics samajhna itna mushkil nahi hai. Mushkil tab lagta hai jab galat jagah se seekho – jahan complicated words use hote hain.",
          "Hum yahan simple Hindi me, daily life examples se samjhayenge. Koi MBA degree nahi chahiye. Koi finance background nahi chahiye.",
          "Bas thoda time do – har din 10-15 minute bhi kaafi hai. Dheere dheere sab samajh aa jayega.",
          "Aur yaad rakh – seekhna ek baar ka kaam hai. Ek baar samajh gaya toh zindagi bhar kaam aayega.",
        ],
      },
      {
        id: "intro-what-is-stock-market",
        type: "concept",
        title: "Stock Market Kya Hai – Ekdum Simple Me",
        content: [
          "Stock market ek bazaar hai jahan companies ke chhote chhote hisse (shares) kharide aur beche jaate hain. Jab tu ek share khareedte hai, toh tu us company ka thoda sa maalik ban jaata hai. Company accha perform kare toh tere share ki value badhti hai, bura kare toh girti hai. Bas itna simple hai.",
          "Isko aur detail me hum aage ke lessons me samjhenge. Abhi bas itna yaad rakho: Stock market koi mysterious jagah nahi hai – ye ek organized marketplace hai jahan businesses me invest hota hai.",
        ],
      },
      {
        id: "intro-what-course-wont-do",
        type: "concept",
        title: "Ye Course Kya NAHI Karega",
        content: [
          "Ye bahut important hai ki tu clear rahe ki is course se kya expect karna hai aur kya nahi.",
          "Hum tujhe tips NAHI denge. 'Ye share kharido', 'wo becho' – aisi baat yahan nahi hogi. Tips dena galat hai aur mostly scam hota hai.",
          "Hum tujhe jaldi ameer banne ka raasta NAHI dikhayenge. Stock market se raat-o-raat ameer nahi bante. Jo ye promise kare – wo jhooth bol raha hai.",
          "Hum koi trading signals ya 'secret formula' NAHI denge. Aisi koi cheez exist nahi karti.",
          "Hum sirf ek kaam karenge: Tujhe basics samjhana – seedhi Hindi me. Taaki tu KHUD samajhdar ban sake aur apne decisions le sake.",
        ],
      },
      {
        id: "intro-reassurance",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, main jaanti hun abhi bahut kuch naya lag raha hai. Par tension mat le.",
          "Is course me hum ek ek step chalenge. Har lesson chhota hai – 5-10 minute ka. Daily thoda padh, samajh, phir aage badh.",
          "Koi jaldi nahi hai. Koi competition nahi hai. Tu apni speed se seekh. Main har step pe saath hun.",
          "Aur sabse important baat – galti karna allowed hai. Sawaal poochna allowed hai. Confusion hona allowed hai. Yahi se seekhna shuru hota hai.",
        ],
      },
      {
        id: "intro-closing",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, sach me thoda confidence aaya. Lagta hai main bhi seekh sakta hun.",
          "Chalo shuru karte hain. Agle lesson me kya hai?",
        ],
      },
      {
        id: "intro-next-preview",
        type: "concept",
        title: "Aage Kya Hai?",
        content: [
          "Bahut accha Rohit! Agle lesson me hum samjhenge: Paise ko invest kyu karna chahiye?",
          "Hum dekhenge ki sirf bank me paisa rakhna kyu kaafi nahi hai, aur kaise tumhara paisa time ke saath kamzor pad sakta hai agar sahi jagah invest na karo.",
          "Ye ek bahut important foundation lesson hai. Iske baad sab cheezein aur clear hone lagenge.",
          "Tab tak ke liye – congratulations! Tumne pehla step le liya. Bahut logon me ye himmat nahi hoti. Tu aage badh raha hai.",
        ],
      },
      {
        id: "intro-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Stock market koi jua nahi hai – ye organized businesses me invest karna hai",
          "Stock market sirf ameer logon ke liye nahi hai – Rs. 100 se bhi shuru ho sakta hai",
          "Basics samajhna mushkil nahi hai – bas sahi guidance chahiye",
          "Ye course tips ya trading signals nahi dega – sirf basics samjhayega",
          "Dheere dheere seekho, patience rakho, galti karna allowed hai",
        ],
      },
    ],
  },

  "paise-invest-kyu": {
    slug: "paise-invest-kyu",
    moduleNumber: 1,
    lessonNumber: 2,
    title: "Paise ko invest kyu karna chahiye?",
    duration: "10 min",
    prevLesson: { slug: "stock-market-introduction", title: "Stock Market ka Introduction" },
    nextLesson: { slug: "stock-market-kya-hai", title: "Stock market kya hota hai?" },
    scenes: [
      {
        id: "m1l1-intro",
        type: "concept",
        title: "Shuru Karte Hain – Bilkul Aasan Tarike Se",
        content: [
          "Agar tumne kabhi socha hai 'investing bahut mushkil hai' ya 'ye ameer logon ke liye hai' – toh relax karo. Ye sirf ek galat soch hai jo bahut logon ke mann me hoti hai.",
          "Sach toh ye hai ki investing koi rocket science nahi hai. Jaise tum cooking seekh sakte ho, driving seekh sakte ho – bilkul waise hi paise ko samajhdaari se lagana bhi seekh sakte ho.",
          "Is lesson me hum sabse pehla aur sabse important sawaal samjhenge: Aakhir paise ko invest kyu karna chahiye?",
          "Koi tips nahi denge. Koi scheme nahi batayenge. Bas seedhi baat karenge – jo samajh aaye.",
        ],
      },
      {
        id: "m1l1-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, main ek cheez se confuse hun. Main har mahine apni salary me se kuch paisa bacha leta hun. Bank me daal deta hun. Par sab log kehte hain 'invest karo, invest karo'. Kya bank me rakhna kaafi nahi hai?",
        ],
      },
      {
        id: "m1l1-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, bahut accha sawaal hai. Dekho, bank me paisa rakhna galat nahi hai – wo safe hai. Par ek problem hai jo bahut log nahi samajhte.",
          "Maan lo tere paas aaj 1 lakh rupaye hain. Aur tu sochta hai '10 saal baad bhi mere paas 1 lakh rahega.' Par sach ye hai ki 10 saal baad wohi 1 lakh utna kaam nahi karega jitna aaj karta hai.",
        ],
      },
      {
        id: "m1l1-s3",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Matlab? Paisa toh same hi rahega na? 1 lakh toh 1 lakh hai!",
        ],
      },
      {
        id: "m1l1-s4",
        type: "concept",
        title: "Sirf Save Karna Kyu Kaafi Nahi Hai?",
        content: [
          "Dekho, paise ki value time ke saath badlti rehti hai. Jo cheez aaj 100 rupaye ki hai, wo 5-10 saal baad 150 ya 200 rupaye ki ho jaati hai.",
          "Iska matlab ye nahi ki tumhari salary badh gayi. Iska matlab hai ki cheezon ke daam badh gaye.",
          "Agar tumhara paisa bank me pade pade sirf 3-4% grow ho raha hai, lekin baaki cheezon ke daam 6-7% badh rahe hain – toh actually tum peeche chal rahe ho.",
          "Isliye sirf bachana kaafi nahi hai. Tumhe apne paise ko aise jagah lagana hoga jahan wo thoda better grow kare.",
        ],
      },
      {
        id: "m1l1-s5",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, is cheez ko log 'mehangai' ya 'inflation' kehte hain. Sunne me boring lagta hai, par samajhna bahut zaroori hai. Chal simple tarike se samajhte hain.",
        ],
      },
      {
        id: "m1l1-s6",
        type: "concept",
        title: "Mehangai (Inflation) – Ekdum Simple Explanation",
        content: [
          "Soch, tu bachpan me 5 rupaye ki Pepsi peeta tha. Ab wohi Pepsi 20 rupaye ki hai. Kya company ne size chhota kar diya? Nahi. Bas daam badh gaye.",
          "Ye isliye hota hai kyunki har saal economy me paisa zyada ho jaata hai, cheezon ki demand badhti hai, aur dhire dhire sab mehenga hota jaata hai.",
          "Tumhe is baat se darne ki zaroorat nahi. Par samajhna zaroori hai ki tumhara paisa bhi isi speed se badhna chahiye – warna tum peeche reh jaoge.",
          "Inflation usually har saal 5-7% hota hai India me. Agar tumhara paisa usse zyada nahi badh raha – toh effectively tum loss me ho.",
        ],
      },
      {
        id: "m1l1-s7",
        type: "example",
        title: "Chhotu Ki Chai Ki Dukaan",
        content: [
          "Chhotu gaon me chai bechta tha. 2015 me uski chai 10 rupaye ki thi. 2024 me wohi chai 20 rupaye ki hai.",
          "Chhotu ke paas 2015 me 10,000 rupaye the. Usne bank me rakh diye. 9 saal baad interest ke saath uske paas lagbhag 13,000-14,000 rupaye hue.",
          "Par ab us 10,000 se jo 1000 chai kharid sakta tha – ab sirf 650-700 chai kharid sakta hai!",
          "Paisa badha, par uski buying power kam ho gayi. Isi problem se bachne ke liye log invest karte hain.",
        ],
      },
      {
        id: "m1l1-s8",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Oh! Toh investing ka matlab ye nahi ki main ameer ban jaunga. Balki ye hai ki meri purchasing power kam na ho?",
        ],
      },
      {
        id: "m1l1-s9",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bilkul sahi samjhe! Investing ka pehla goal hai: Mehangai ko beat karna. Ameer banna toh ek bonus hai – par pehle ye ensure karo ki tumhara paisa time ke saath kamzor na pade.",
          "Aur ha, investing me risk bhi hota hai. Isliye pehle seekho, samjho, phir slowly start karo. Jaldi ameer banne ke chakkar me mat pado.",
        ],
      },
      {
        id: "m1l1-s10",
        type: "concept",
        title: "Ek Common Galti Jo Log Karte Hain",
        content: [
          "Bahut log sochte hain: 'Investing matlab stock market. Stock market matlab jua. Main nahi karunga.'",
          "Par ye galat soch hai. Investing ke bahut tarike hain – Fixed Deposits, PPF, Mutual Funds, Gold, Real Estate, aur haan Stock Market bhi.",
          "Stock market sirf EK option hai – aur wo bhi tabhi risky hai jab tum bina samjhe kood pado. Agar samajh ke, patience se karo – toh wo ek powerful tool hai.",
          "Hum isi course me step by step sab samjhenge. Filhaal bas itna yaad rakho: Investing = Samajhdaari se paisa lagana. Jua nahi.",
        ],
      },
      {
        id: "m1l1-s11",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, mujhe laga tha ye sab bahut complicated hoga. Par ab thoda clear ho raha hai. Aage bhi aise hi simple samjhaana!",
        ],
      },
      {
        id: "m1l1-s12",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Haan Rohit, bilkul. Pehle basic samjho, phir dhire dhire deep jaayenge. Koi jaldi nahi hai. Pehle foundation strong karo.",
          "Remember: Jo log jaldi ameer banne ke chakkar me bina seekhe invest karte hain – wo aksar paisa gawa dete hain. Tum smart ban ke seekho, samjho, phir action lo.",
        ],
      },
      {
        id: "m1l1-conclusion",
        type: "concept",
        title: "Aaj Ka Takeaway",
        content: [
          "Tumne aaj ek bahut important concept samjha: Sirf bachana kaafi nahi – paisa grow bhi hona chahiye.",
          "Mehangai tumhare paise ki value dheere dheere kha jaati hai. Isliye investing zaroori hai – taaki tum peeche na reh jao.",
          "Par yaad rakho: Jaldi mat karo. Pehle seekho. Ye course tumhe step by step le jaayega. Bas learning mindset rakho aur patience rakho.",
          "Achha, ye toh samajh aa gaya. Ab aage dekhte hain stock market exactly kya hota hai!",
        ],
      },
      {
        id: "m1l1-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Bank me paisa safe hai – par wo grow nahi hota inflation ke hisaab se",
          "Mehangai har saal cheezon ko 5-7% mehengi karti hai",
          "Agar tumhara paisa usse kam grow ho raha hai – toh tum effectively loss me ho",
          "Investing ka matlab hai samajhdaari se paisa lagana – jua nahi",
          "Pehle seekho, samjho, phir invest karo – jaldi mat karo",
        ],
      },
    ],
  },

  "stock-market-kya-hai": {
    slug: "stock-market-kya-hai",
    moduleNumber: 1,
    lessonNumber: 3,
    title: "Stock market kya hota hai?",
    duration: "10 min",
    prevLesson: { slug: "paise-invest-kyu", title: "Paise ko invest kyu karna chahiye?" },
    nextLesson: { slug: "share-kya-hai", title: "Share kya hota hai?" },
    scenes: [
      {
        id: "m1l2-intro",
        type: "concept",
        title: "Aaj Ka Topic – Stock Market Samjho",
        content: [
          "Bahut logon ke mann me stock market ka naam sunte hi ek picture aati hai – computers, numbers, tension, aur 'paisa doobna'. Par ye sab galat dharna hai.",
          "Stock market actually ek simple concept hai. Aaj hum isko bilkul basic level pe samjhenge – bina kisi technical word ke.",
          "Pichle lesson me humne seekha ki investing kyu zaroori hai. Ab dekhte hain ki stock market actually kya cheez hai.",
        ],
      },
      {
        id: "m1l2-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, stock market stock market sunne me aata hai news me. Par mujhe actually samajh nahi aata ki ye hai kya. Koi building hai? Website hai? Ya kuch aur?",
        ],
      },
      {
        id: "m1l2-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, bahut simple hai. Stock market ek bazaar hai – bilkul waise jaise tere mohalle me sabzi mandi hoti hai.",
          "Farq bas itna hai ki sabzi mandi me tamatar, pyaaz bikte hain. Stock market me companies ke shares bikte hain.",
        ],
      },
      {
        id: "m1l2-s3",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Companies ke shares? Matlab company bech dete hain log?",
        ],
      },
      {
        id: "m1l2-s4",
        type: "concept",
        title: "Stock Market Ka Simple Matlab",
        content: [
          "Nahi nahi, poori company nahi bechte. Companies apna chhota chhota hissa bechti hain – jise 'share' kehte hain.",
          "Jab tu ek share khareedte hai kisi company ka – toh tu us company ka thoda sa maalik ban jaata hai.",
          "Stock market wo jagah hai jahan ye shares kharide aur beche jaate hain. Buyers aur sellers dono yahan milte hain.",
          "Pehle ye sab physically hota tha – ek building me traders cheekh cheekh ke deal karte the. Ab ye sab online ho gaya hai – tu ghar baithe phone se bhi kar sakta hai.",
        ],
      },
      {
        id: "m1l2-s5",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Accha! Toh share matlab company ka chhota hissa. Par ye share concept thoda aur clearly samjhao na.",
        ],
      },
      {
        id: "m1l2-s6",
        type: "example",
        title: "Ramu Ki Chai Ki Dukaan",
        content: [
          "Soch, Ramu ne ek chai ki dukaan kholni hai. Uske paas 50,000 rupaye hain, par dukaan ke liye 1 lakh chahiye.",
          "Toh Ramu ne kya kiya? Usne apne 4 doston ko bola – 'Tum log 12,500-12,500 rupaye lagao. Badme jo bhi profit hoga, wo hum sab milke baatenge.'",
          "Ab Ramu ki dukaan ke 5 hissedar hain – Ramu + 4 dost. Har ek ke paas 20% ownership hai.",
          "Ye '20% ownership' hi ek tarah ka share hai. Bas bade companies me ye hisse crores me bante hain – lakhs of shares.",
          "Jab tu Reliance ka 1 share khareedte hai – tu Reliance ka thoda sa owner ban jaata hai. Bahut chhota hissa, par owner zaroor.",
        ],
      },
      {
        id: "m1l2-s7",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Oh wow! Toh agar main TCS ka share khareedte hun – toh main TCS ka thoda owner hun?",
        ],
      },
      {
        id: "m1l2-s8",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Haan bilkul! Legally tu us company ka part-owner hai. Company profit karti hai toh tujhe bhi fayda ho sakta hai. Company ka share price badhta hai toh teri investment ki value bhi badhti hai.",
          "Par dhyan rakh – agar company ka kaam theek nahi chalta, toh share price gir bhi sakta hai. Isliye samajh ke invest karna zaroori hai.",
        ],
      },
      {
        id: "m1l2-s9",
        type: "concept",
        title: "India Ke Do Main Stock Exchanges",
        content: [
          "India me shares kharidne-bechne ke liye do main jagah hain – inhe 'Stock Exchanges' kehte hain.",
          "NSE (National Stock Exchange): Ye India ka sabse bada stock exchange hai. Yahan 'Nifty 50' track hota hai – jo top 50 companies ka group hai.",
          "BSE (Bombay Stock Exchange): Ye duniya ke sabse purane stock exchanges me se ek hai. Yahan 'Sensex' track hota hai – jo top 30 companies ka group hai.",
          "Dono exchanges pe almost same companies available hoti hain. Tu dono me se kisi pe bhi trade kar sakta hai.",
        ],
      },
      {
        id: "m1l2-s10",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Ek doubt hai Priya. Log kehte hain stock market me paisa doob jaata hai. Toh kya ye safe nahi hai?",
        ],
      },
      {
        id: "m1l2-s11",
        type: "concept",
        title: "Ek Common Confusion Clear Karo",
        content: [
          "Dekho Rohit, stock market ek tool hai – bilkul knife jaisa. Knife se tum sabzi kaat sakte ho ya apne aap ko hurt kar sakte ho. Tool galat nahi hai – use karna aana chahiye.",
          "Jo log bina samjhe, bina seekhe, sirf 'tip' sunke paisa lagaate hain – wo aksar loss karte hain. Ye unki galti hai, stock market ki nahi.",
          "Jo log pehle seekhte hain, research karte hain, patience rakhte hain – wo stock market se ache returns kama sakte hain.",
          "Isliye hum pehle poora basics samjh rahe hain. Jaldi nahi karni. Pehle foundation strong karo.",
        ],
      },
      {
        id: "m1l2-s12",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Samajh gaya. Toh stock market khud bura nahi hai – bas bina samjhe use karna risky hai.",
        ],
      },
      {
        id: "m1l2-s13",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Exactly! Tu samajhdar hai Rohit. Ye course isi liye banaya gaya hai – taaki tum basics clear karo aur jab kabhi invest karo toh informed decision lo.",
          "Remember: Knowledge hi sabse bada investment hai. Pehle ye invest karo, baaki sab baad me aayega.",
        ],
      },
      {
        id: "m1l2-conclusion",
        type: "concept",
        title: "Aaj Ka Takeaway",
        content: [
          "Stock market ek bazaar hai jahan companies ke shares – matlab chhote chhote ownership hisse – kharide aur beche jaate hain.",
          "Jab tu share khareedte hai, toh tu company ka thoda maalik ban jaata hai. Company accha karti hai toh tujhe fayda, nahi karti toh nuksaan bhi ho sakta hai.",
          "India me NSE aur BSE do main exchanges hain jahan ye sab hota hai. Ab ye sab online hai – phone se bhi ho jaata hai.",
          "Ab basic idea ho gaya! Agle lesson me hum 'share' concept ko aur deep me samjhenge.",
        ],
      },
      {
        id: "m1l2-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Stock market ek bazaar hai jahan companies ke shares bikte hain",
          "Share matlab company ka chhota ownership hissa",
          "Share kharidne se tu company ka thoda maalik ban jaata hai",
          "India me NSE aur BSE do main stock exchanges hain",
          "Stock market risky tabhi hai jab bina samjhe use karo – seekhna zaroori hai",
        ],
      },
    ],
  },

  "share-kya-hai": {
    slug: "share-kya-hai",
    moduleNumber: 1,
    lessonNumber: 4,
    title: "Share, Company aur Ownership ka simple matlab",
    duration: "10 min",
    prevLesson: { slug: "stock-market-kya-hai", title: "Stock market kya hota hai?" },
    nextLesson: { slug: "sensex-nifty", title: "Sensex aur Nifty simple samjhaav" },
    scenes: [
      {
        id: "m1l3-intro",
        type: "concept",
        title: "Aaj Ka Topic – Company, Share aur Ownership",
        content: [
          "Pichle lesson me humne samjha ki stock market ek bazaar hai jahan shares bikte hain. Par abhi tak hum 'share' word use kar rahe the bina usse properly samjhe.",
          "Aaj hum teen important cheezein clear karenge: Company kya hoti hai? Share kya hota hai? Aur ownership ka matlab kya hai?",
          "Ye sab bahut simple concepts hain – bas daily life examples se samjhna hai. Koi heavy words nahi, koi legal gyaan nahi. Seedha samjho.",
        ],
      },
      {
        id: "m1l3-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, ye company exactly kya hoti hai? Matlab Reliance company hai, Tata company hai – par company ka matlab kya hai?",
        ],
      },
      {
        id: "m1l3-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Dekh Rohit, company ek business hai – jo kuch banata hai ya kuch service deta hai, aur usse paisa kamata hai.",
          "Jaise tu sochle – Parle-G biscuit banata hai, Airtel network service deta hai, Zomato khana deliver karta hai. Ye sab companies hain.",
        ],
      },
      {
        id: "m1l3-s3",
        type: "concept",
        title: "Company Ka Simple Matlab",
        content: [
          "Company ek organized business hai jo legally registered hota hai. Iska ek naam hota hai, kaam hota hai, aur goal hota hai – paisa kamana aur grow karna.",
          "Chhoti company ho ya badi – sab ka basic idea same hai: Kuch karo, paisa kamao, aur business ko aage badhao.",
          "Jab company bahut badi ho jaati hai aur usse aur paisa chahiye grow karne ke liye – toh wo public se paisa maangti hai. Iske badle wo apna hissa deti hai – jise share kehte hain.",
        ],
      },
      {
        id: "m1l3-s4",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Accha, toh share matlab company ka hissa hai. Par ye hissa exactly kaise kaam karta hai?",
        ],
      },
      {
        id: "m1l3-s5",
        type: "example",
        title: "Shyam Ki Mithai Ki Dukaan",
        content: [
          "Soch, Shyam ne ek mithai ki dukaan kholi. Usne 2 lakh rupaye lagaye – poori dukaan uski hai. 100% ownership.",
          "Ek saal baad dukaan acchi chali. Ab Shyam ek aur branch kholna chahta hai. Par uske paas sirf 1 lakh hai, aur 1 lakh aur chahiye.",
          "Toh Shyam ne apne dost Raju ko bola – 'Tu 1 lakh laga. Badme jo profit hoga, uska 33% tujhe milega. Tu bhi dukaan ka hissedar banega.'",
          "Raju maan gaya. Ab dukaan ke 2 owners hain – Shyam (67%) aur Raju (33%). Raju ka ye 33% hissa hi ek tarah ka 'share' hai.",
          "Bade companies me ye hissa crores chhote chhote pieces me bant jaata hai – jinhe shares kehte hain. Tu 1 share bhi khareed sakta hai.",
        ],
      },
      {
        id: "m1l3-s6",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Oh! Toh jab main ek share khareedte hun, main basically us company ka chhota sa hissedar ban jaata hun?",
        ],
      },
      {
        id: "m1l3-s7",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bilkul sahi! Legally tu us company ka part-owner hai. Bahut chhota hissa – shayad 0.00001% – par owner zaroor hai.",
          "Aur is ownership ke saath kuch cheezein aati hain. Chalo wo bhi samajh lete hain.",
        ],
      },
      {
        id: "m1l3-s8",
        type: "concept",
        title: "Ownership Se Kya Milta Hai?",
        content: [
          "Jab tu kisi company ka share khareedte hai, toh tu 'shareholder' ban jaata hai. Iska matlab kuch basic cheezein tujhe milti hain:",
          "1. Company ki Growth ka Fayda: Agar company accha kaam kare aur grow kare, toh share ki value badh sakti hai. Teri investment ki value bhi badhti hai.",
          "2. Dividend (Bonus Profit): Kuch companies apne profit ka thoda hissa shareholders ko deti hain. Ise 'dividend' kehte hain – ye ek tarah ka bonus hai.",
          "3. Voting Rights: Bade decisions me shareholders ki vote hoti hai. Par ye mostly bade investors ke liye relevant hai – abhi tujhe isse zyada concern nahi lena.",
          "Par yaad rakh – agar company ka kaam theek na chale, toh share ki value gir bhi sakti hai. Ownership ka matlab hai – fayda bhi tera, nuksaan bhi tera.",
        ],
      },
      {
        id: "m1l3-s9",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Ek doubt hai Priya. Agar main share khareedte hun aur company doob gayi – toh kya mujhe uska karza bhi chukana padega?",
        ],
      },
      {
        id: "m1l3-s10",
        type: "concept",
        title: "Ek Common Galat Soch Clear Karo",
        content: [
          "Nahi Rohit! Ye ek bahut common confusion hai. Share kharidne se tu company ka limited owner hai – matlab teri liability sirf utni hai jitna tune invest kiya.",
          "Agar company doob bhi gayi, toh maximum tere share ki value zero ho jayegi. Par tujhe company ka koi karza nahi chukana padega.",
          "Isliye shares ko 'limited liability' kehte hain. Tu sirf wohi kho sakta hai jo tune lagaya – usse zyada nahi.",
          "Ye actually ek protection hai investors ke liye. Par phir bhi – hamesha soch samajh ke invest karo. Bina research ke paisa mat lagao.",
        ],
      },
      {
        id: "m1l3-s11",
        type: "example",
        title: "Factory Ka Example",
        content: [
          "Soch ek factory hai jo mobile covers banati hai. Factory ki value 10 crore hai. Owner ne decide kiya ki wo 50% public ko bechega.",
          "Toh 5 crore ki value ke shares market me aaye – 10 lakh shares of 50 rupaye each.",
          "Tu agar 100 shares khareedte hai (5000 rupaye lagake), toh tu us factory ka 0.001% owner hai.",
          "Factory acchi chale toh tere shares 60-70 rupaye ke ho sakte hain. Kharab chale toh 30-40 ke bhi ho sakte hain. Ye market hai – up-down hota rehta hai.",
        ],
      },
      {
        id: "m1l3-s12",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Samajh gaya! Company matlab business, share matlab uska chhota hissa, aur ownership matlab main bhi us business ka thoda maalik hun.",
        ],
      },
      {
        id: "m1l3-s13",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Perfect summary Rohit! Ab tera basic clear hai. Aage hum Sensex aur Nifty samjhenge – jo market ke health indicators hain.",
          "Dhire dhire sab clear hota jayega. Bas learning mindset rakho aur patience rakho.",
        ],
      },
      {
        id: "m1l3-conclusion",
        type: "concept",
        title: "Aaj Ka Takeaway",
        content: [
          "Company ek registered business hai jo kuch banata ya service deta hai aur paisa kamata hai.",
          "Share company ka chhota ownership hissa hai. Jab tu share khareedte hai, toh tu us company ka thoda maalik ban jaata hai.",
          "Ownership ke saath growth ka fayda bhi milta hai aur risk bhi hota hai. Company acchi chale toh fayda, buri chale toh nuksaan.",
          "Par teri liability limited hai – sirf jo tune lagaya wo kho sakta hai, usse zyada nahi.",
          "Ab company aur share ka basic idea ho gaya! Agle lesson me Sensex aur Nifty samjhenge.",
        ],
      },
      {
        id: "m1l3-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Company ek organized business hai jo legally registered hota hai",
          "Share matlab company ka chhota ownership hissa",
          "Share kharidne se tu shareholder ban jaata hai – company ka partial owner",
          "Ownership ke saath fayda bhi milta hai aur risk bhi – dono tera",
          "Teri liability limited hai – sirf invested amount kho sakta hai",
        ],
      },
    ],
  },

  "sensex-nifty": {
    slug: "sensex-nifty",
    moduleNumber: 1,
    lessonNumber: 5,
    title: "Sensex aur Nifty simple samjhaav",
    duration: "8 min",
    prevLesson: { slug: "share-kya-hai", title: "Share kya hota hai?" },
    nextLesson: { slug: "demat-account", title: "Demat Account kya hota hai?" },
    scenes: [
      {
        id: "m1l4-intro",
        type: "concept",
        title: "Aaj Ka Topic – Sensex aur Nifty",
        content: [
          "News me roz sunta hai: 'Sensex 500 points gira', 'Nifty naye high pe'. Par matlab kya hai? Ye numbers kya batate hain?",
          "Aaj hum bilkul simple me samjhenge ki Sensex aur Nifty kya hain, kaise kaam karte hain, aur tujhe inse kya lena dena hai.",
        ],
      },
      {
        id: "m1l4-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, ye Sensex aur Nifty sunne me lagta hai koi secret code hai. Kya hai ye actually?",
        ],
      },
      {
        id: "m1l4-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, bilkul simple hai. Soch India me hazaron companies listed hain stock market me. Agar har company ko individually track karo – toh bohot mushkil ho jayega.",
          "Isliye ek shortcut banaya – kuch top companies ko milake ek 'group' banao aur us group ka average track karo. Ye group hi Sensex ya Nifty hai.",
        ],
      },
      {
        id: "m1l4-s3",
        type: "concept",
        title: "Sensex Kya Hai?",
        content: [
          "Sensex ka full form hai 'Sensitive Index'. Ye BSE (Bombay Stock Exchange) ka index hai.",
          "Isme India ki top 30 companies hain – Reliance, TCS, HDFC Bank, Infosys jaise bade names.",
          "Jab ye 30 companies overall accha perform karti hain, Sensex upar jaata hai. Jab bura karti hain, neeche aata hai.",
          "Sensex ek tarah se puri market ki 'health report' hai. Agar Sensex badh raha hai matlab overall market accha chal raha hai.",
        ],
      },
      {
        id: "m1l4-s4",
        type: "concept",
        title: "Nifty Kya Hai?",
        content: [
          "Nifty ka full form hai 'National Fifty'. Ye NSE (National Stock Exchange) ka index hai.",
          "Isme India ki top 50 companies hain. Sensex se thoda zyada broad hai.",
          "Sensex aur Nifty dono almost same cheez batate hain – overall market kaise chal raha hai. Bas dono alag exchanges ke hain.",
          "Aam taur pe log Nifty zyada use karte hain kyunki ye thoda zyada comprehensive hai (50 companies vs 30).",
        ],
      },
      {
        id: "m1l4-s5",
        type: "example",
        title: "School Ka Example",
        content: [
          "Soch teri school me 5000 students hain. Principal ko jaanna hai ki overall school ka result kaisa raha.",
          "Har student ka individually dekhna mushkil hai. Toh principal ne kya kiya? Top 50 students ka average nikala.",
          "Agar top 50 ka average badha – matlab school overall accha perform kar raha hai. Ye 'top 50 average' hi ek tarah ka Nifty hai!",
          "Same concept – stock market me hazaron companies hain. Top 50 ya 30 ka average dekhlo – pata chal jaata hai market kaisa chal raha hai.",
        ],
      },
      {
        id: "m1l4-s6",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Oh accha! Toh ye market ke thermometer jaisa hai. Agar Sensex ya Nifty badh raha hai matlab market 'healthy' hai?",
        ],
      },
      {
        id: "m1l4-s7",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bilkul sahi analogy! Thermometer jaise body ka temperature batata hai, waise Sensex/Nifty market ka mood batate hain.",
          "Par ek baat yaad rakh – ye sirf top companies ka average hai. Chhoti companies isme include nahi hain. Toh ye 100% picture nahi deta, par ek idea zaroor deta hai.",
        ],
      },
      {
        id: "m1l4-s8",
        type: "concept",
        title: "Points Ka Matlab Kya Hai?",
        content: [
          "Jab news me bolta hai 'Sensex 500 points badha' – toh ye sirf ek number hai jo overall movement batata hai.",
          "Agar Sensex 60,000 se 60,500 ho gaya – matlab 500 points badha. Ye approximately 0.8% ki growth hai.",
          "Points ke saath percentage bhi dekho. 500 points jab Sensex 60,000 pe ho aur 500 points jab 30,000 pe ho – dono me bahut farak hai.",
          "Percentage growth zyada relevant hai. Par news me points zyada bola jaata hai kyunki wo dramatic lagta hai.",
        ],
      },
      {
        id: "m1l4-s9",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Samajh gaya! Par mujhe personally Sensex/Nifty se kya lena dena? Main toh individual shares khareedta hun na?",
        ],
      },
      {
        id: "m1l4-s10",
        type: "concept",
        title: "Tujhe Isse Kya Lena Dena?",
        content: [
          "Accha sawaal. Sensex/Nifty directly tera portfolio nahi hai. Par ye overall market trend batate hain.",
          "Jab market overall accha chal raha hai (Sensex/Nifty badh raha hai) – toh zyaadatar shares acche perform karte hain.",
          "Jab market gir raha hai – toh acchi companies ke shares bhi gir sakte hain temporarily.",
          "Isliye ye important hai track karna – taaki tu samjhe ki market ka overall mood kaisa hai. Par individual company research bhi zaroori hai.",
        ],
      },
      {
        id: "m1l4-s11",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Aur haan Rohit, ek aur option hai – tu Nifty ya Sensex me directly bhi invest kar sakta hai through Index Funds ya ETFs.",
          "Iska matlab tu ek hi investment me top 50 companies me paisa laga deta hai. Ye beginners ke liye simple aur safe option hai.",
          "Par wo aage samjhenge. Abhi bas itna yaad rakh – Sensex aur Nifty market ke health indicators hain.",
        ],
      },
      {
        id: "m1l4-conclusion",
        type: "concept",
        title: "Aaj Ka Takeaway",
        content: [
          "Sensex = Top 30 companies ka group (BSE). Nifty = Top 50 companies ka group (NSE).",
          "Dono market ke overall mood batate hain – thermometer jaisa.",
          "Points ke saath percentage bhi dekho – wo zyada meaningful hai.",
          "Ab basic market indicators samajh gaye! Agle lesson me dekhenge ki actually trading kaise hoti hai.",
        ],
      },
      {
        id: "m1l4-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Sensex = BSE ka index with top 30 companies",
          "Nifty = NSE ka index with top 50 companies",
          "Dono market ka overall health batate hain",
          "Points ke saath percentage bhi dekho",
          "Index Funds se directly Nifty/Sensex me invest kar sakte ho",
        ],
      },
    ],
  },

  "demat-account": {
    slug: "demat-account",
    moduleNumber: 2,
    lessonNumber: 6,
    title: "Demat Account kya hota hai?",
    duration: "8 min",
    prevLesson: { slug: "sensex-nifty", title: "Sensex aur Nifty simple samjhaav" },
    nextLesson: { slug: "broker-selection", title: "Broker kaise choose karein?" },
    scenes: [
      {
        id: "m2l1-intro",
        type: "concept",
        title: "Aaj Ka Topic – Demat Account Samjho",
        content: [
          "Ab tak humne samjha ki stock market kya hai, shares kya hain, aur Sensex/Nifty kya hain. Par actually shares khareedne ke liye kya chahiye?",
          "Sabse pehle chahiye – Demat Account. Aaj hum samjhenge ki ye kya hai aur kaise kaam karta hai.",
        ],
      },
      {
        id: "m2l1-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, Demat Account ka naam toh suna hai. Par ye exactly kya hai? Kya ye bank account jaisa kuch hai?",
        ],
      },
      {
        id: "m2l1-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Haan Rohit, kuch kuch bank account jaisa hi hai. Bank account me tere paise rehte hain, na? Demat account me tere shares rehte hain.",
          "Demat ka full form hai 'Dematerialized' – matlab jo cheez physical nahi hai, digital hai.",
        ],
      },
      {
        id: "m2l1-s3",
        type: "concept",
        title: "Demat Account Kya Hai?",
        content: [
          "Pehle zamaane me shares paper form me milte the – physical certificates. Inhe sambhalna mushkil tha, kho sakte the, damage ho sakte the.",
          "Ab sab digital ho gaya hai. Tere shares electronic form me store hote hain – ek online account me. Isi account ko Demat Account kehte hain.",
          "Jab tu share khareedte hai – wo tere Demat account me aa jaata hai. Jab bechta hai – wahaan se chala jaata hai.",
          "Ye bilkul bank balance jaisa hai – bas yahan paisa nahi, shares hain.",
        ],
      },
      {
        id: "m2l1-s4",
        type: "example",
        title: "Digital Locker Ka Example",
        content: [
          "Soch tu online shopping karta hai. Orders track karne ke liye ek account hota hai – Amazon, Flipkart, etc.",
          "Demat account bhi teri shares ki 'inventory' hai. Kitne shares hain, konsi company ke hain, kitni value hai – sab yahan dikhta hai.",
          "Jaise Google Drive me tere files safe rehte hain, waise Demat me tere shares safe rehte hain. Kahi bhi access kar sakta hai.",
        ],
      },
      {
        id: "m2l1-s5",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Accha! Toh ye meri shares ki digital tijori hai. Par ye kahan open hota hai? Bank me?",
        ],
      },
      {
        id: "m2l1-s6",
        type: "concept",
        title: "Demat Account Kahan Open Hota Hai?",
        content: [
          "Demat account banks ya stockbrokers ke through open hota hai. Inhe 'Depository Participants' (DP) kehte hain.",
          "India me do main depositories hain: CDSL aur NSDL. Ye tere shares ko safe rakhti hain.",
          "Popular options: Zerodha, Groww, Upstox, Angel One, ICICI Direct, HDFC Securities, etc.",
          "Inme se kisi bhi broker ke through Demat account open kar sakta hai. Process mostly online hai – 10-15 minute me ho jaata hai.",
        ],
      },
      {
        id: "m2l1-s7",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Toh broker aur Demat account connected hain? Dono alag cheez hain ya same?",
        ],
      },
      {
        id: "m2l1-s8",
        type: "concept",
        title: "Demat vs Trading Account",
        content: [
          "Accha sawaal! Actually teen cheezein connected hain: Bank Account + Demat Account + Trading Account.",
          "Bank Account: Yahan tera paisa rehta hai.",
          "Demat Account: Yahan tere shares rehte hain.",
          "Trading Account: Ye wo platform hai jahan tu buy/sell karta hai. Broker provide karta hai ye.",
          "Jab tu share khareedte hai: Paisa bank se jaata hai → Trading account se order hota hai → Share Demat me aata hai.",
          "Mostly broker sab ek saath open karta hai – tujhe alag alag nahi karna padta.",
        ],
      },
      {
        id: "m2l1-s9",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, abhi ye sab complicated lag sakta hai. Par jab tu actually account open karega, toh sab automatically ho jaayega.",
          "Broker ki app install karo, KYC karo, aur tum ready ho. Baaki sab backend me ho jaata hai.",
        ],
      },
      {
        id: "m2l1-s10",
        type: "concept",
        title: "Documents Kya Chahiye?",
        content: [
          "Demat account open karne ke liye ye documents chahiye:",
          "PAN Card: Sabse zaroori. Bina PAN ke account nahi ban sakta.",
          "Aadhaar Card: Address proof aur eKYC ke liye.",
          "Bank Account Details: Cancelled cheque ya bank statement.",
          "Passport Size Photo: Digital photo bhi chalti hai.",
          "Signature: Digital signature ya physical scan.",
          "Process mostly 100% online hai. 10-15 minute me complete ho jaata hai agar documents ready hain.",
        ],
      },
      {
        id: "m2l1-conclusion",
        type: "concept",
        title: "Aaj Ka Takeaway",
        content: [
          "Demat account tere shares ki digital locker hai. Jab share khareedte ho, wo yahan store hota hai.",
          "Trading account wo platform hai jahan tu buy/sell karta hai. Broker deta hai ye.",
          "Dono mostly ek saath open hote hain broker ke through. Process simple aur online hai.",
          "Agle lesson me dekhenge ki broker kaise choose karein – kyunki sab brokers same nahi hain.",
        ],
      },
      {
        id: "m2l1-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Demat account = Shares ki digital storage (electronic locker)",
          "Trading account = Buy/sell karne ka platform",
          "Dono broker ke through open hote hain",
          "PAN, Aadhaar, Bank details chahiye account ke liye",
          "Process 100% online hai – 10-15 minute me ho jaata hai",
        ],
      },
    ],
  },

  "broker-selection": {
    slug: "broker-selection",
    moduleNumber: 2,
    lessonNumber: 7,
    title: "Broker kaise choose karein?",
    duration: "8 min",
    prevLesson: { slug: "demat-account", title: "Demat Account kya hota hai?" },
    nextLesson: { slug: "first-share-purchase", title: "Pehla share kaise khareedein?" },
    scenes: [
      {
        id: "m2l2-intro",
        type: "concept",
        title: "Aaj Ka Topic – Broker Selection",
        content: [
          "Ab tu jaanta hai ki Demat aur Trading account kya hain. Par ye kahan open karein? Itne saare brokers hain – konsa choose karein?",
          "Aaj hum samjhenge ki broker kya karta hai aur beginner ke liye konsa best hai.",
        ],
      },
      {
        id: "m2l2-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, Zerodha, Groww, Upstox – itne names hain. Kya farak hai inme? Koi bhi choose kar lun?",
        ],
      },
      {
        id: "m2l2-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Nahi Rohit, thoda soch samajh ke choose karna chahiye. Har broker ke apne pros-cons hain. Par beginners ke liye kuch basic cheezein dekhni chahiye.",
        ],
      },
      {
        id: "m2l2-s3",
        type: "concept",
        title: "Broker Kya Karta Hai?",
        content: [
          "Broker tere aur stock exchange ke beech me middleman hai. Tu directly NSE/BSE me jaake share nahi khareed sakta.",
          "Broker tera order leke exchange me bhejta hai, transaction complete karta hai, aur tere account me share deliver karta hai.",
          "Iske badle wo fees leta hai – jo different brokers me different hoti hai.",
        ],
      },
      {
        id: "m2l2-s4",
        type: "concept",
        title: "Broker Choose Karte Waqt Kya Dekho?",
        content: [
          "1. Charges: Account opening fee, annual maintenance, brokerage per trade. Kam ho toh better.",
          "2. App/Platform: Easy to use hona chahiye. Beginners ke liye simple interface important hai.",
          "3. Customer Support: Problem ho toh koi help kare. Reviews dekho iske baare me.",
          "4. Safety: SEBI registered hona chahiye. Ye non-negotiable hai.",
          "5. Features: Research tools, learning content, etc. Nice to have, par zaroori nahi.",
        ],
      },
      {
        id: "m2l2-s5",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Toh beginners ke liye specifically kya recommend karoge?",
        ],
      },
      {
        id: "m2l2-s6",
        type: "concept",
        title: "Beginners Ke Liye Options",
        content: [
          "Zerodha: India ka sabse bada broker. Low charges, simple app, accha learning content (Varsity). Recommended.",
          "Groww: Bahut simple app, beginners ke liye easy. Mutual funds ke liye especially accha.",
          "Upstox: Low charges, decent app. Zerodha jaisa hi hai mostly.",
          "Angel One: Free account, accha for beginners. Thoda zyada calls/notifications aate hain.",
          "Koi bhi ek choose kar sakta hai. Sab SEBI registered hain, safe hain. Personal preference ki baat hai.",
        ],
      },
      {
        id: "m2l2-s7",
        type: "concept",
        title: "Ek Important Baat",
        content: [
          "Ye course kisi bhi broker ko recommend nahi karta. Hum sirf options bata rahe hain.",
          "Tu apni research kar, reviews padh, aur jo tujhe accha lage wo choose kar.",
          "Sab SEBI registered hain toh tere paise safe hain. Baaki features personal choice hai.",
          "Ek tip: Pehle ek hi broker se shuru kar. Baad me chahiye toh switch kar sakta hai.",
        ],
      },
      {
        id: "m2l2-conclusion",
        type: "concept",
        title: "Aaj Ka Takeaway",
        content: [
          "Broker tere aur exchange ke beech middleman hai. Inke through tu shares khareedta hai.",
          "Choose karte waqt charges, app quality, aur SEBI registration dekho.",
          "Beginners ke liye Zerodha, Groww, Upstox acche options hain. Par apni research kar.",
          "Agle lesson me dekhenge ki actually pehla share kaise khareedte hain step by step.",
        ],
      },
      {
        id: "m2l2-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Broker = Tere aur exchange ke beech middleman",
          "Charges, app quality, SEBI registration check karo",
          "Popular options: Zerodha, Groww, Upstox, Angel One",
          "Sab safe hain – personal preference ki baat hai",
          "Apni research karke choose karo",
        ],
      },
    ],
  },

  "first-share-purchase": {
    slug: "first-share-purchase",
    moduleNumber: 2,
    lessonNumber: 8,
    title: "Pehla share kaise khareedein?",
    duration: "10 min",
    prevLesson: { slug: "broker-selection", title: "Broker kaise choose karein?" },
    nextLesson: { slug: "investment-mistakes", title: "Beginner mistakes se kaise bachein?" },
    scenes: [
      {
        id: "m2l3-intro",
        type: "concept",
        title: "Aaj Ka Topic – Pehla Share Khareedna",
        content: [
          "Ab account ready hai, broker select ho gaya. Ab actual me share kaise khareedein? Aaj hum step by step dekhenge.",
          "Ye lesson padh ke tujhe pata chal jayega ki process kitna simple hai. Darr lagta hai bas – karna actually easy hai.",
        ],
      },
      {
        id: "m2l3-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, account toh ban gaya. Ab app me jaake kya karun? Bahut confusing lagta hai!",
        ],
      },
      {
        id: "m2l3-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, relax. Chal step by step dekhte hain. Ek baar kar lega toh doosri baar bahut easy lagega.",
        ],
      },
      {
        id: "m2l3-s3",
        type: "concept",
        title: "Step 1: Add Money",
        content: [
          "Pehle apne trading account me paisa daalo. Ye bank account se transfer hota hai.",
          "Broker app me 'Add Funds' ya 'Add Money' option hota hai. UPI, Net Banking, ya Bank Transfer se kar sakta hai.",
          "Jitna invest karna hai utna hi daalo. Pehli baar Rs. 500-1000 se bhi start kar sakta hai.",
        ],
      },
      {
        id: "m2l3-s4",
        type: "concept",
        title: "Step 2: Search Company",
        content: [
          "App me search bar hota hai. Wahaan company ka naam type karo – jaise 'Reliance' ya 'TCS'.",
          "Company mil jaayegi. Uske upar click karo. Tujhe share ka current price dikhega.",
          "Yahan pe price charts bhi dikhte hain – par abhi unme mat pado. Simple se shuru karo.",
        ],
      },
      {
        id: "m2l3-s5",
        type: "concept",
        title: "Step 3: Place Order",
        content: [
          "'Buy' button pe click karo. Ek form khulega jisme pucha jayega:",
          "Quantity: Kitne shares chahiye? 1 se bhi start kar sakta hai.",
          "Order Type: 'Market Order' select karo – matlab current price pe kharidna hai.",
          "'Limit Order' bhi hota hai jisme tu apna price set karta hai – par beginners ke liye market order easy hai.",
          "Quantity daalo, review karo, aur 'Place Order' dabao.",
        ],
      },
      {
        id: "m2l3-s6",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Bas itna? Phir kya hoga?",
        ],
      },
      {
        id: "m2l3-s7",
        type: "concept",
        title: "Step 4: Order Execution",
        content: [
          "Tera order exchange pe jayega (NSE ya BSE). Wahaan match hoga aur execute ho jayega.",
          "Ye sab seconds me hota hai. Order complete hone pe notification aa jayega.",
          "Share tere Demat account me aa jayega. App me 'Portfolio' ya 'Holdings' section me dikhega.",
          "Congratulations – tu ab officially shareholder hai!",
        ],
      },
      {
        id: "m2l3-s8",
        type: "example",
        title: "Practical Example",
        content: [
          "Maan le tu ITC ka 1 share kharidna chahta hai. Current price Rs. 450 hai.",
          "App me 'ITC' search kar. 'Buy' click kar. Quantity: 1. Order Type: Market.",
          "'Place Order' click kar. Rs. 450 + small brokerage tera account se katega.",
          "2 seconds baad – ITC ka 1 share tere Demat me. Done!",
        ],
      },
      {
        id: "m2l3-s9",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, pehli baar darr lagta hai – ye normal hai. Par ek baar kar lo, phir confidence aa jayega.",
          "Chhote amount se shuru karo. Rs. 500-1000 se. Jab comfortable ho jao, phir amount badhao.",
        ],
      },
      {
        id: "m2l3-s10",
        type: "concept",
        title: "Kab Khareedein?",
        content: [
          "Stock market Monday-Friday, 9:15 AM to 3:30 PM open rehta hai. Saturday-Sunday band.",
          "Is time me hi orders execute hote hain. Baaki time pe order place kar sakta hai – par execute next day hoga.",
          "Beginners ke liye tip: Jaldi ameer banne ke chakkar me mat pado. Slowly samajho, slowly invest karo.",
        ],
      },
      {
        id: "m2l3-conclusion",
        type: "concept",
        title: "Aaj Ka Takeaway",
        content: [
          "Share kharidna actually bahut simple hai: Add Money → Search → Buy → Done.",
          "Pehli baar chhote amount se start karo. Confidence badhega toh amount badhao.",
          "Market 9:15 AM - 3:30 PM, Monday-Friday open hai.",
          "Agle lesson me dekhenge ki common beginner mistakes kya hain aur unse kaise bachein.",
        ],
      },
      {
        id: "m2l3-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Step 1: Trading account me paisa add karo",
          "Step 2: Company search karo app me",
          "Step 3: Buy button pe click karke order place karo",
          "Step 4: Order execute hoga aur share Demat me aayega",
          "Chhote amount se start karo – Rs. 500-1000 kaafi hai",
        ],
      },
    ],
  },

  "investment-mistakes": {
    slug: "investment-mistakes",
    moduleNumber: 2,
    lessonNumber: 9,
    title: "Beginner mistakes se kaise bachein?",
    duration: "10 min",
    prevLesson: { slug: "first-share-purchase", title: "Pehla share kaise khareedein?" },
    nextLesson: { slug: "stock-selection", title: "Accha stock kaise chunein?" },
    scenes: [
      {
        id: "m2l4-intro",
        type: "concept",
        title: "Aaj Ka Topic – Common Mistakes",
        content: [
          "Ab tu jaanta hai share kaise khareedte hain. Par ruk – investing me bahut log galti karte hain jo unhe nuksaan pahunchati hai.",
          "Aaj hum top 5 beginner mistakes dekhenge aur unse kaise bachein ye samjhenge.",
        ],
      },
      {
        id: "m2l4-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, mujhe darr lagta hai ki main koi badi galti kar dunga aur paisa doob jayega.",
        ],
      },
      {
        id: "m2l4-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, darr accha hai – iska matlab tu careful hai. Par zyada darr bhi theek nahi. Chalo common mistakes samjhte hain taaki tu prepared rahe.",
        ],
      },
      {
        id: "m2l4-s3",
        type: "concept",
        title: "Mistake 1: Tips Pe Invest Karna",
        content: [
          "Ye sabse badi galti hai. WhatsApp pe koi bole 'XYZ stock lelo, double hoga' – mat lo.",
          "Telegram groups, YouTube tips, dost ki baat – sab pe blindly trust mat karo.",
          "Agar tips itne acche hote toh wo khud ameer kyun nahi? Mostly ye log commission ya scam ke liye karte hain.",
          "Rule: Khud samjho, khud research karo, phir invest karo. Tips pe nahi.",
        ],
      },
      {
        id: "m2l4-s4",
        type: "concept",
        title: "Mistake 2: Jaldi Ameer Banne Ki Soch",
        content: [
          "Stock market se 1 mahine me double paisa – ye fantasy hai, reality nahi.",
          "Jo log ye promise karte hain wo jhooth bol rahe hain ya extremely risky cheezein karte hain.",
          "Real wealth building slow process hai. 10-15 saal ka journey hai. Patience chahiye.",
          "Rule: Realistic expectations rakho. 12-15% annual return accha hai. 100% monthly nahi milta.",
        ],
      },
      {
        id: "m2l4-s5",
        type: "concept",
        title: "Mistake 3: Bina Samjhe Invest Karna",
        content: [
          "Share khareed liya par company kya karti hai ye nahi pata – ye problem hai.",
          "Pehle samjho company ka business kya hai, profit kaise aata hai, future kya hai.",
          "Bilkul detailed analysis nahi chahiye – par basic idea toh hona chahiye.",
          "Rule: Jis company me invest karo, wo kya karti hai ye at least ek line me bata sako.",
        ],
      },
      {
        id: "m2l4-s6",
        type: "concept",
        title: "Mistake 4: Emergency Fund Use Karna",
        content: [
          "Jo paisa 6 months ke expenses ke liye rakha hai – wo stock market me mat lagao.",
          "Emergency fund liquid aur safe chahiye. Stock market up-down hota hai.",
          "Agar suddenly paisa chahiye aur market down hai – toh loss book karna padega.",
          "Rule: Sirf wo paisa invest karo jo tujhe 5-10 saal tak chahiye nahi.",
        ],
      },
      {
        id: "m2l4-s7",
        type: "concept",
        title: "Mistake 5: Panic Me Bechna",
        content: [
          "Market gira – dar gaya – sab bech diya. Ye bahut common mistake hai.",
          "Market short term me up-down hota rehta hai. Panic sell karne se loss lock ho jaata hai.",
          "Agar company acchi hai toh market girne pe bhi mat becho. Patience rakho.",
          "Rule: Invest karne se pehle soch lo ki 2-3 saal market down bhi rahe toh bhi hold kar paoge?",
        ],
      },
      {
        id: "m2l4-s8",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Ye sab sunke lagta hai investing bahut risky hai. Kya fayda hai fir?",
        ],
      },
      {
        id: "m2l4-s9",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, risky tab hai jab bina samjhe karo. Samajh ke karo toh manageable hai.",
          "In mistakes se bachne ka simple formula: Seekho → Samjho → Slowly Invest Karo → Patience Rakho.",
          "Jaldi ameer banna chhodo. Dheere dheere financially strong bano – wo bhi bahut badi achievement hai.",
        ],
      },
      {
        id: "m2l4-conclusion",
        type: "concept",
        title: "Aaj Ka Takeaway",
        content: [
          "Tips pe invest mat karo – khud samjho.",
          "Jaldi ameer banne ki fantasy chhodo – realistic expectations rakho.",
          "Company ka basic business samjho invest karne se pehle.",
          "Emergency fund alag rakho – sirf surplus invest karo.",
          "Panic me mat becho – patience sabse important hai.",
        ],
      },
      {
        id: "m2l4-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Tips pe invest = Big mistake",
          "Jaldi ameer banne ki soch = Fantasy",
          "Bina samjhe invest = Risky",
          "Emergency fund invest = Wrong",
          "Panic selling = Loss lock",
        ],
      },
    ],
  },

  "stock-selection": {
    slug: "stock-selection",
    moduleNumber: 2,
    lessonNumber: 10,
    title: "Accha stock kaise chunein?",
    duration: "10 min",
    prevLesson: { slug: "investment-mistakes", title: "Beginner mistakes se kaise bachein?" },
    nextLesson: { slug: "portfolio-basics", title: "Portfolio kya hai aur kaise banayein?" },
    scenes: [
      {
        id: "m2l5-intro",
        type: "concept",
        title: "Aaj Ka Topic – Stock Selection Basics",
        content: [
          "Ab tu jaanta hai kya nahi karna chahiye. Par accha stock kaise chunein? Aaj hum basic framework samjhenge.",
          "Ye koi magic formula nahi hai – par ek starting point zaroor hai beginners ke liye.",
        ],
      },
      {
        id: "m2l5-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, itni saari companies hain. Kaise pata chalega konsi acchi hai?",
        ],
      },
      {
        id: "m2l5-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, puri detailed analysis beginners ke liye mushkil hai. Par kuch basic cheezein dekh sakta hai jo helpful hain.",
        ],
      },
      {
        id: "m2l5-s3",
        type: "concept",
        title: "1. Company Ka Business Samjho",
        content: [
          "Pehla sawaal: Company kya karti hai? Agar tu ek line me nahi bata sakta – mat invest kar.",
          "Example: 'TCS software services deti hai.' 'Asian Paints paint banati hai.' Simple.",
          "Jo business samajh na aaye – usse door raho. Warren Buffett bhi yahi kehte hain.",
        ],
      },
      {
        id: "m2l5-s4",
        type: "concept",
        title: "2. Brand Recognition Dekho",
        content: [
          "Kya company ka naam tune suna hai? Kya uske products/services tu use karta hai?",
          "Reliance, TCS, HDFC Bank, Infosys – ye sab famous names hain. Market leaders hain.",
          "Famous companies zyaadatar safe hoti hain – proven business model hai.",
          "Par famous = always good nahi. Ye sirf ek filter hai, guarantee nahi.",
        ],
      },
      {
        id: "m2l5-s5",
        type: "concept",
        title: "3. Profit Dekho",
        content: [
          "Company profit kama rahi hai ya nahi? Ye bahut basic cheez hai.",
          "Broker apps me company profile me 'Net Profit' ya 'PAT' dikhta hai.",
          "Agar company consistently profit kama rahi hai – good sign. Agar loss me hai – careful raho.",
          "Beginners ke liye: Profitable companies me invest karo. Loss-making companies avoid karo initially.",
        ],
      },
      {
        id: "m2l5-s6",
        type: "concept",
        title: "4. Karz (Debt) Dekho",
        content: [
          "Company pe kitna karza hai? Zyada karza = zyada risk.",
          "Debt-to-Equity ratio dekho. Agar ye 1 se kam hai – generally safe.",
          "Banking companies ko chhodo isme – unka business hi karza dena hai.",
          "Zyada karz wali companies avoid karo as beginners.",
        ],
      },
      {
        id: "m2l5-s7",
        type: "concept",
        title: "5. Diversify Karo",
        content: [
          "Ek hi company me sab paisa mat lagao. Alag alag sectors me invest karo.",
          "Example: Agar IT sector me invest kiya, toh Banking ya FMCG me bhi dekho.",
          "Agar ek sector down jaaye toh poora portfolio down nahi jaayega.",
          "Rule: Minimum 5-10 different stocks rakho different sectors me.",
        ],
      },
      {
        id: "m2l5-s8",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Ye sab samajhna mushkil lag raha hai. Koi easy option nahi hai?",
        ],
      },
      {
        id: "m2l5-s9",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Hai na! Index Funds ya Mutual Funds. Inme tu directly stocks nahi chunte – experts chunte hain tere liye.",
          "Nifty 50 Index Fund lelo – automatically top 50 companies me invest ho jaata hai. Simple aur safe.",
          "Individual stocks baad me dekho jab confidence aaye. Pehle Index Funds se shuru karo.",
        ],
      },
      {
        id: "m2l5-conclusion",
        type: "concept",
        title: "Aaj Ka Takeaway",
        content: [
          "Company ka business samjho – ek line me explain ho sake.",
          "Famous, profitable, low-debt companies prefer karo.",
          "Diversify karo – ek company me sab mat lagao.",
          "Beginners ke liye: Index Funds safest starting point hai.",
        ],
      },
      {
        id: "m2l5-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Business samjho – jo samajh na aaye usse bachho",
          "Profitable companies prefer karo",
          "Low debt companies safer hain",
          "Diversification important hai",
          "Index Funds = Beginners ke liye easy option",
        ],
      },
    ],
  },

  "portfolio-basics": {
    slug: "portfolio-basics",
    moduleNumber: 3,
    lessonNumber: 11,
    title: "Portfolio kya hai aur kaise banayein?",
    duration: "8 min",
    prevLesson: { slug: "stock-selection", title: "Accha stock kaise chunein?" },
    nextLesson: { slug: "risk-management", title: "Risk management basics" },
    scenes: [
      {
        id: "m3l1-intro",
        type: "concept",
        title: "Aaj Ka Topic – Portfolio Building",
        content: [
          "Ab tak tune stocks, Demat account, buying process sab samjha. Par ye sab ek saath kaise manage karein?",
          "Aaj hum portfolio concept samjhenge – basically tere investments ka organized collection.",
        ],
      },
      {
        id: "m3l1-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, portfolio ka naam toh suna hai. Par exactly matlab kya hai?",
        ],
      },
      {
        id: "m3l1-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, simple hai. Portfolio matlab tere saare investments ka collection. Jaise teri almirah me alag alag kapde hain – waise tere account me alag alag investments hain.",
        ],
      },
      {
        id: "m3l1-s3",
        type: "concept",
        title: "Portfolio Kya Hai?",
        content: [
          "Portfolio = Tere saare investments ka group. Stocks + Mutual Funds + Bonds + Gold – sab milake portfolio hai.",
          "Abhi focus stocks pe hai. Toh stock portfolio matlab – tere paas jo bhi shares hain unka collection.",
          "Agar tere paas TCS, Reliance, HDFC Bank ke shares hain – ye teena milake tera portfolio hai.",
        ],
      },
      {
        id: "m3l1-s4",
        type: "concept",
        title: "Accha Portfolio Kaise Banaayein?",
        content: [
          "1. Diversify: Ek hi stock me sab mat lagao. 5-10 different stocks rakho.",
          "2. Different Sectors: IT, Banking, FMCG, Pharma – alag alag sectors me invest karo.",
          "3. Mix of Safe and Growth: Kuch safe stocks (large caps), kuch growth stocks (mid caps).",
          "4. Your Risk Tolerance: Zyada risk le sakta hai toh zyada growth stocks. Kam risk chahiye toh zyada stable stocks.",
        ],
      },
      {
        id: "m3l1-s5",
        type: "example",
        title: "Example Portfolio",
        content: [
          "Maan le tera budget 50,000 hai. Ek sample portfolio:",
          "IT Sector (20%): TCS ya Infosys – Rs. 10,000",
          "Banking (20%): HDFC Bank ya ICICI Bank – Rs. 10,000",
          "FMCG (20%): ITC ya HUL – Rs. 10,000",
          "Index Fund (40%): Nifty 50 Index Fund – Rs. 20,000",
          "Ye sirf example hai – actual allocation tujhe decide karna hai apni research ke baad.",
        ],
      },
      {
        id: "m3l1-s6",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Portfolio ko manage kaise karein? Roz dekhna padta hai kya?",
        ],
      },
      {
        id: "m3l1-s7",
        type: "concept",
        title: "Portfolio Management Tips",
        content: [
          "Roz mat dekho! Weekly ya monthly review kaafi hai. Roz dekhne se anxiety badhti hai.",
          "Long term soch: 5-10 saal ka perspective rakho. Short term up-down ignore karo.",
          "Rebalance yearly: Agar ek stock bahut badh gaya toh proportion theek karo.",
          "New money gradually lagao: SIP style me monthly invest karo. Ek baar me sab mat lagao.",
        ],
      },
      {
        id: "m3l1-conclusion",
        type: "concept",
        title: "Aaj Ka Takeaway",
        content: [
          "Portfolio = Tere saare investments ka organized collection.",
          "Diversify karo – different stocks, different sectors.",
          "Roz mat dekho – weekly/monthly review kaafi hai.",
          "Long term soch – 5-10 saal ka perspective.",
        ],
      },
      {
        id: "m3l1-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Portfolio = Investment collection",
          "5-10 stocks, multiple sectors = Good diversification",
          "Mix of safe + growth stocks",
          "Weekly/monthly review, not daily",
          "Long term perspective rakho",
        ],
      },
    ],
  },

  "risk-management": {
    slug: "risk-management",
    moduleNumber: 3,
    lessonNumber: 12,
    title: "Risk management basics",
    duration: "10 min",
    prevLesson: { slug: "portfolio-basics", title: "Portfolio kya hai aur kaise banayein?" },
    nextLesson: { slug: "long-term-wealth", title: "Long term wealth creation" },
    scenes: [
      {
        id: "m3l2-intro",
        type: "concept",
        title: "Aaj Ka Topic – Risk Management",
        content: [
          "Stock market me risk hai – ye toh humne shuru se bola hai. Par risk manage bhi toh hota hai.",
          "Aaj hum samjhenge ki risk kya hai, kitne types ke hain, aur kaise manage karein.",
        ],
      },
      {
        id: "m3l2-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, risk risk sunke darr lagta hai. Kaise samjhun ki kitna risk lena chahiye?",
        ],
      },
      {
        id: "m3l2-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, risk se darna nahi chahiye – samajhna chahiye. Risk = Uncertainty. Hum predict nahi kar sakte ki kya hoga – ye risk hai.",
        ],
      },
      {
        id: "m3l2-s3",
        type: "concept",
        title: "Risk Ke Types",
        content: [
          "Market Risk: Pura market gir jaaye – jaise COVID time pe gira tha. Ye sab stocks ko affect karta hai.",
          "Company Risk: Ek particular company me problem ho – jaise scam ya bad management.",
          "Sector Risk: Ek pura sector down jaaye – jaise IT sector global recession me gir sakta hai.",
          "In risks ko zero nahi kar sakte – par manage kar sakte hain.",
        ],
      },
      {
        id: "m3l2-s4",
        type: "concept",
        title: "Risk Management Strategies",
        content: [
          "1. Diversification: Alag alag stocks, alag sectors. Ek gira toh sab nahi gira.",
          "2. Invest Gradually: Ek baar me sab mat lagao. Monthly SIP style me invest karo.",
          "3. Emergency Fund: 6 months expenses alag rakho. Stock market me mat lagao.",
          "4. Only Surplus: Sirf wo paisa invest karo jo tujhe 5-10 saal tak chahiye nahi.",
        ],
      },
      {
        id: "m3l2-s5",
        type: "concept",
        title: "Apni Risk Capacity Samjho",
        content: [
          "Young hai (20-30)? Zyada risk le sakta hai. Recovery ke liye time hai.",
          "40+ hai? Kam risk lo. Retirement near hai, stability important hai.",
          "Job stable hai? Thoda zyada risk le sakta hai. Job risky hai? Kam risk lo.",
          "Ye personal decision hai – koi formula nahi. Apni situation dekho.",
        ],
      },
      {
        id: "m3l2-s6",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Agar market bahut gir jaaye toh kya karun?",
        ],
      },
      {
        id: "m3l2-s7",
        type: "concept",
        title: "Market Crash Me Kya Karein?",
        content: [
          "Panic mat karo! Ye sabse important hai. Crash = Opportunity for long term investors.",
          "Agar company fundamentals strong hain – hold karo. Market recover hoga.",
          "Agar extra paisa hai – crash me aur invest karo. 'Buy low' ka time hai.",
          "Kabhi bhi ek din me sab decisions mat lo. Soch samajh ke karo.",
        ],
      },
      {
        id: "m3l2-conclusion",
        type: "concept",
        title: "Aaj Ka Takeaway",
        content: [
          "Risk = Uncertainty. Samjho, daro mat.",
          "Diversify, invest gradually, emergency fund rakho.",
          "Apni age aur situation ke hisaab se risk lo.",
          "Market crash = Panic nahi, opportunity hai long term ke liye.",
        ],
      },
      {
        id: "m3l2-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Risk types: Market, Company, Sector",
          "Manage via: Diversification, gradual investment, emergency fund",
          "Young = more risk capacity, older = less risk",
          "Market crash = Hold or buy more if fundamentals strong",
          "Panic selling = Worst mistake",
        ],
      },
    ],
  },

  "long-term-wealth": {
    slug: "long-term-wealth",
    moduleNumber: 3,
    lessonNumber: 13,
    title: "Long term wealth creation",
    duration: "10 min",
    prevLesson: { slug: "risk-management", title: "Risk management basics" },
    nextLesson: undefined,
    scenes: [
      {
        id: "m3l3-intro",
        type: "concept",
        title: "Aaj Ka Topic – Long Term Wealth",
        content: [
          "Ye course ka last lesson hai. Yahan hum big picture samjhenge – actual wealth kaise banti hai.",
          "Ye short term trading ke baare me nahi hai. Ye life-long financial freedom ke baare me hai.",
        ],
      },
      {
        id: "m3l3-s1",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Priya, finally last lesson! Kya main ab invest karne ke liye ready hun?",
        ],
      },
      {
        id: "m3l3-s2",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, tu basics samajh gaya hai – ye bahut badi baat hai. Par learning kabhi khatam nahi hoti. Investing ek lifelong journey hai.",
        ],
      },
      {
        id: "m3l3-s3",
        type: "concept",
        title: "Compound Interest Ka Magic",
        content: [
          "Ye finance ka 8th wonder hai. Albert Einstein ne bhi yahi bola tha.",
          "Compound interest = Tere returns pe bhi returns aate hain. Paisa apne aap multiply hota hai time ke saath.",
          "Example: Rs. 10,000 @ 12% annually = Rs. 31,000 in 10 years, Rs. 97,000 in 20 years, Rs. 3 lakh in 30 years!",
          "Jitna jaldi shuru, utna zyada fayda. Time sabse powerful tool hai.",
        ],
      },
      {
        id: "m3l3-s4",
        type: "concept",
        title: "SIP Ka Power",
        content: [
          "SIP = Systematic Investment Plan. Har month fixed amount invest karo.",
          "Rs. 5000 monthly @ 12% for 20 years = Rs. 50 lakh! (Total invested: Rs. 12 lakh only)",
          "SIP ka fayda: Market up-down me average out ho jaata hai. Tension nahi lena.",
          "Beginners ke liye: Index Fund SIP se shuru karo. Simple aur effective.",
        ],
      },
      {
        id: "m3l3-s5",
        type: "concept",
        title: "Patience = Key",
        content: [
          "Real wealth 10-20 saal me banti hai. 1 saal me nahi.",
          "Warren Buffett ki 99% wealth 50 saal ki age ke baad aayi. Patience ka example.",
          "Market short term me crazy behave karta hai. Long term me companies ki real value reflect hoti hai.",
          "Rule: Invest and forget. Roz mat dekho. Saal me 2-3 baar review karo.",
        ],
      },
      {
        id: "m3l3-s6",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Toh basically patience aur consistency – ye do cheezein most important hain?",
        ],
      },
      {
        id: "m3l3-s7",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Bilkul sahi! Stock market me success ka secret ye nahi ki konsa stock liya. Secret ye hai ki kitne time tak hold kiya.",
          "Jaldi ameer banne ki soch chhodo. Dheere dheere, consistently, patiently – yehi formula hai.",
        ],
      },
      {
        id: "m3l3-s8",
        type: "concept",
        title: "Action Plan for Rohit (and You)",
        content: [
          "1. Emergency Fund: 6 months expenses alag rakho. Ye invest mat karo.",
          "2. Start SIP: Rs. 1000-5000 monthly in Nifty 50 Index Fund. Abhi se shuru karo.",
          "3. Learn More: Zerodha Varsity padho. Books padho. Learning chhodo mat.",
          "4. Slowly Add Stocks: Jab confidence aaye, 1-2 individual stocks add karo.",
          "5. Review Yearly: Saal me ek baar portfolio dekho. Zyada tamasha mat karo.",
        ],
      },
      {
        id: "m3l3-s9",
        type: "dialogue",
        speaker: "priya",
        content: [
          "Rohit, ye course tujhe starting point diya hai. Par asli learning yahan se shuru hoti hai.",
          "Market me paisa lagaoge toh real experience milega. Chhote amount se shuru karo, galti karo, seekho, grow karo.",
          "Main hamesha available hun questions ke liye. Par ultimate decision tujhe lena hai – apni research ke baad.",
        ],
      },
      {
        id: "m3l3-s10",
        type: "dialogue",
        speaker: "rohit",
        content: [
          "Thank you Priya! Mujhe lagta tha stock market mujh jaise logon ke liye nahi hai. Par ab confident feel ho raha hai.",
          "Chhote se shuru karunga aur dheere dheere seekhta rahunga. Ye journey toh abhi shuru hui hai!",
        ],
      },
      {
        id: "m3l3-conclusion",
        type: "concept",
        title: "Course Summary",
        content: [
          "Tumne bahut kuch seekha is course me: Stock market basics, shares, Sensex/Nifty, Demat account, broker selection, buying process, mistakes to avoid, stock selection, portfolio building, risk management, aur long term wealth.",
          "Ab action lene ka time hai. Sirf padhne se kuch nahi hoga – karna padega.",
          "Chhote se shuru karo. Rs. 500-1000 se bhi start ho sakta hai. Experience hi best teacher hai.",
          "Aur haan – ye sirf beginning hai. Learning kabhi khatam nahi hoti. Market hamesha kuch naya sikhata hai.",
        ],
      },
      {
        id: "m3l3-final",
        type: "concept",
        title: "Final Message",
        content: [
          "Stock market intimidating lagta hai – par actually simple hai jab samajh lo.",
          "Darr normal hai. Par darr ko decision mat banane do.",
          "Patience, consistency, aur continuous learning – yehi success ke pillars hain.",
          "Tumne ye course complete kiya – ye already ek bada step hai. Bahut logon me ye himmat nahi hoti.",
          "Ab aage badho. Invest karo. Learn karo. Grow karo. Tumhara financial future tumhare haath me hai.",
          "All the best, future investor! Aapka journey yahan se shuru hota hai.",
        ],
      },
      {
        id: "m3l3-summary",
        type: "summary",
        title: "Is Lesson Se Seekha",
        content: [
          "Compound interest = 8th wonder of finance",
          "SIP = Simple, powerful, stress-free investing",
          "Patience = Most important skill in investing",
          "Start small, stay consistent, keep learning",
          "Your financial future is in your hands",
        ],
      },
    ],
  },
};

// Helper function to get lesson by slug
export function getLessonBySlug(slug: string): LessonData | undefined {
  return beginnerLessons[slug];
}

// Module structure for navigation
export const moduleStructure = [
  {
    moduleNumber: 1,
    title: "Stock Market ki Shuruaat",
    lessons: [
      "stock-market-introduction",
      "paise-invest-kyu",
      "stock-market-kya-hai",
      "share-kya-hai",
      "sensex-nifty",
    ],
  },
  {
    moduleNumber: 2,
    title: "Investing Seekho",
    lessons: [
      "demat-account",
      "broker-selection",
      "first-share-purchase",
      "investment-mistakes",
      "stock-selection",
    ],
  },
  {
    moduleNumber: 3,
    title: "Smart Investor Bano",
    lessons: [
      "portfolio-basics",
      "risk-management",
      "long-term-wealth",
    ],
  },
];
