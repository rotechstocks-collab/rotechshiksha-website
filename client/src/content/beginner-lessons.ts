import { LessonData } from "@/components/BeginnerLessonLayout";

// All 13 lessons for the Beginner Stock Market Course

export const beginnerLessons: Record<string, LessonData> = {
  // Module 1: Stock Market ki Shuruaat

  "paise-invest-kyu": {
    slug: "paise-invest-kyu",
    moduleNumber: 1,
    lessonNumber: 1,
    title: "Paise ko invest kyu karna chahiye?",
    duration: "10 min",
    prevLesson: undefined,
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
          "Priya didi, main ek cheez se confuse hun. Main har mahine apni salary me se kuch paisa bacha leta hun. Bank me daal deta hun. Par sab log kehte hain 'invest karo, invest karo'. Kya bank me rakhna kaafi nahi hai?",
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
          "Rohit, is cheez ko log 'mehangai' ya 'inflation' kehte hain. Sunne me boring lagta hai, par samajhna bahut zaroori hai. Main tujhe bilkul simple tarike se samjhati hun.",
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
          "Didi, mujhe laga tha ye sab bahut complicated hoga. Par ab thoda clear ho raha hai. Aage bhi aise hi simple samjhaana!",
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
    lessonNumber: 2,
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
          "Didi, stock market stock market sunne me aata hai news me. Par mujhe actually samajh nahi aata ki ye hai kya. Koi building hai? Website hai? Ya kuch aur?",
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
          "Ek doubt hai didi. Log kehte hain stock market me paisa doob jaata hai. Toh kya ye safe nahi hai?",
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
          "Samajh gaya didi. Toh stock market khud bura nahi hai – bas bina samjhe use karna risky hai.",
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
