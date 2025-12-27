// Level 1: Complete Video Scripts for All 8 Lessons
// Duration: 5-6 minutes each
// Style: Calm, peer-tone, reassuring, Hindi with English terms

export interface VideoScene {
  sceneNumber: number;
  duration: string;
  visualDescription: string;
  voiceover: string;
  textOverlay?: string;
}

export interface VideoScript {
  lessonNumber: number;
  slug: string;
  title: string;
  totalDuration: string;
  targetAudience: string;
  lessonGoal: string;
  scenes: VideoScene[];
  closingCTA: string;
}

export const level1VideoScripts: VideoScript[] = [
  // LESSON 1: Stock Market ka Introduction
  {
    lessonNumber: 1,
    slug: "stock-market-introduction",
    title: "Stock Market ka Introduction – Bina Darr ke",
    totalDuration: "5:30",
    targetAudience: "Complete beginners who fear stock market",
    lessonGoal: "Remove fear, bust myths, build initial confidence",
    scenes: [
      {
        sceneNumber: 1,
        duration: "0:40",
        visualDescription: "Calm blue gradient background. Animated Rohit appears looking worried, question marks floating around.",
        voiceover: "Stock market ka naam sunte hi darr lagta hai? Lagta hai ye bahut mushkil hai? Ya socho ki ye sirf ameer logon ke liye hai? Agar aisa lagta hai – toh ekdum normal hai. Main Rohit hun, aur mujhe bhi pehle aisa hi lagta tha.",
        textOverlay: "Stock Market = Darr? Nahi!"
      },
      {
        sceneNumber: 2,
        duration: "0:35",
        visualDescription: "Priya appears with friendly wave. Warm, welcoming animation.",
        voiceover: "Main Priya hun. Chal saath me stock market basics samajhte hain – ekdum simple Hindi me. Koi mushkil words nahi, koi jargon nahi. Pehle baat – tu akela nahi hai. Bahut log aise hi confuse hote hain.",
        textOverlay: "Saath me seekhenge!"
      },
      {
        sceneNumber: 3,
        duration: "0:50",
        visualDescription: "Split screen: Left shows casino/gambling imagery (crossed out), Right shows company buildings/businesses.",
        voiceover: "Myth number 1: Stock market jua hai. Ye sabse badi galat soch hai. Jua me luck chalti hai – koi control nahi. Par stock market me companies ka business hota hai. Jab tu share khareedte hai, tu ek real business me paisa laga raha hai.",
        textOverlay: "Myth 1: Stock Market = Jua? GALAT!"
      },
      {
        sceneNumber: 4,
        duration: "0:45",
        visualDescription: "Animation showing Rs.100 note transforming into stocks. Small investor icon happy.",
        voiceover: "Myth number 2: Ye sirf ameer logon ke liye hai. Pehle shayad sach tha. Par ab tu Rs. 100 se bhi start kar sakta hai. Bahut si acchi companies ke shares 500-1000 rupaye me milte hain.",
        textOverlay: "Myth 2: Sirf Ameer? GALAT! Rs.100 se start!"
      },
      {
        sceneNumber: 5,
        duration: "0:40",
        visualDescription: "Simple chart/diagram appearing piece by piece, looking easy to understand.",
        voiceover: "Myth number 3: Bahut mushkil hai, bahut padhna padta hai. Sach ye hai ki basics samajhna itna mushkil nahi hai. Hum yahan simple Hindi me, daily life examples se samjhayenge. Koi MBA degree nahi chahiye.",
        textOverlay: "Myth 3: Bahut Mushkil? GALAT!"
      },
      {
        sceneNumber: 6,
        duration: "0:50",
        visualDescription: "Animated marketplace/bazaar with company logos as products.",
        voiceover: "Stock market ek bazaar hai jahan companies ke chhote chhote hisse – shares – kharide aur beche jaate hain. Jab tu ek share khareedte hai, toh tu us company ka thoda sa maalik ban jaata hai. Bas itna simple hai.",
        textOverlay: "Stock Market = Bazaar jahan shares bikte hain"
      },
      {
        sceneNumber: 7,
        duration: "0:45",
        visualDescription: "Warning icons with crossed out 'TIPS', 'GET RICH QUICK' signs.",
        voiceover: "Ye course kya NAHI karega: Hum tujhe tips NAHI denge. Jaldi ameer banne ka raasta NAHI dikhayenge. Koi secret formula NAHI hai. Hum sirf ek kaam karenge: Tujhe basics samjhana – taaki tu KHUD samajhdar ban sake.",
        textOverlay: "No Tips. No Shortcuts. Sirf Knowledge."
      },
      {
        sceneNumber: 8,
        duration: "0:45",
        visualDescription: "Rohit and Priya side by side, both smiling. Progress bar showing 'Lesson 1 Complete'.",
        voiceover: "Congratulations! Tune pehla step le liya. Ab tu jaanta hai ki stock market koi monster nahi hai. Agle lesson me hum samjhenge ki share exactly kya hota hai – ek chai dukaan ki story se. Tab tak ke liye – all the best!",
        textOverlay: "Lesson 1 Complete! Aage: Share kya hai?"
      }
    ],
    closingCTA: "Agle lesson me milte hain! Share ka concept samjhenge – chai dukaan ki kahani se."
  },

  // LESSON 2: Share Kya Hota Hai?
  {
    lessonNumber: 2,
    slug: "share-kya-hota-hai",
    title: "Share kya hota hai?",
    totalDuration: "6:00",
    targetAudience: "Beginners who completed Lesson 1",
    lessonGoal: "Explain share concept through chai shop ownership story",
    scenes: [
      {
        sceneNumber: 1,
        duration: "0:35",
        visualDescription: "Welcome back animation. Rohit appears with notebook.",
        voiceover: "Wapas aaya! Bahut accha. Pichle lesson me humne darr kam kiya. Aaj samjhenge ki share exactly kya hota hai. Chal ek kahani sunte hain – Ramu ki chai dukaan ki.",
        textOverlay: "Lesson 2: Share Kya Hai?"
      },
      {
        sceneNumber: 2,
        duration: "0:50",
        visualDescription: "Animated chai shop with 'Ramu Ki Chai' signboard. Ramu character serving chai.",
        voiceover: "Ramu ne ek chai ki dukaan kholi. Usne 2 lakh rupaye lagaye – poori dukaan uski hai. 100% ownership. Dukaan acchi chal rahi hai. Ab Ramu ek aur branch kholna chahta hai. Par uske paas sirf 1 lakh hai, 1 lakh aur chahiye.",
        textOverlay: "Ramu Ki Chai = 100% Ownership"
      },
      {
        sceneNumber: 3,
        duration: "0:55",
        visualDescription: "Shyam character appears. Handshake animation. Dukaan splits into two parts visually.",
        voiceover: "Ramu ne apne dost Shyam ko bola – 'Tu 1 lakh laga. Badme jo profit hoga, uska 33% tujhe milega. Tu bhi dukaan ka hissedar banega.' Shyam maan gaya. Ab dukaan ke 2 owners hain – Ramu 67%, Shyam 33%.",
        textOverlay: "Shyam = 33% Owner (Partner)"
      },
      {
        sceneNumber: 4,
        duration: "0:50",
        visualDescription: "Priya explaining with diagram. Small pieces of a company pie chart.",
        voiceover: "Jo Shyam ne kiya – wo basically share khareedna hai! Share matlab company ka chhota hissa. Bade companies me ye hissa crores chhote chhote pieces me bant jaata hai – jinhe shares kehte hain. Tu 1 share bhi khareed sakta hai.",
        textOverlay: "Share = Company ka Chhota Hissa"
      },
      {
        sceneNumber: 5,
        duration: "0:45",
        visualDescription: "Happy Ramu character. Money bags appearing, profit distribution animation.",
        voiceover: "Chai dukaan acchi chali. 3 lakh profit hua. Ramu ko 2 lakh mile, Shyam ko 1 lakh. Ye hai dividend – company apna profit shareholders ko deti hai. Tera share hai toh tujhe bhi milega.",
        textOverlay: "Profit = Dividend milta hai!"
      },
      {
        sceneNumber: 6,
        duration: "0:50",
        visualDescription: "Dukaan growing bigger. Value meter going up. Shyam's share value increasing.",
        voiceover: "Aur suno. Jaise jaise dukaan famous ho rahi hai, uski value badh rahi hai. Pehle 3 lakh thi, ab 6 lakh hai. Shyam ka 33% hissa pehle 1 lakh ka tha, ab 2 lakh ka hai! Ye hai value growth.",
        textOverlay: "Company Grow = Share Value Grow"
      },
      {
        sceneNumber: 7,
        duration: "0:40",
        visualDescription: "Rohit nodding understanding. Lightbulb moment animation.",
        voiceover: "Toh share khareedne se do tarike se paisa ban sakta hai: Dividend – company profit baante, aur Value Growth – share ki price badhti hai. Par yaad rakh – company buri chale toh nuksaan bhi ho sakta hai.",
        textOverlay: "2 Ways: Dividend + Value Growth"
      },
      {
        sceneNumber: 8,
        duration: "0:35",
        visualDescription: "Progress bar updates. Preview of next lesson with inflation graphics.",
        voiceover: "Bahut accha! Ab tu jaanta hai ki share kya hai – company ka chhota ownership hissa. Agle lesson me dekhenge ki paise invest kyu karna chahiye. Tab tak – congratulations!",
        textOverlay: "Lesson 2 Complete! Aage: Invest Kyu Karein?"
      }
    ],
    closingCTA: "Agle lesson me samjhenge ki sirf bachana kyu kaafi nahi hai – inflation ki kahani!"
  },

  // LESSON 3: Paise Invest Kyu?
  {
    lessonNumber: 3,
    slug: "paise-invest-kyu",
    title: "Paise ko invest kyu karna chahiye?",
    totalDuration: "5:45",
    targetAudience: "Beginners who understand shares",
    lessonGoal: "Explain inflation and why saving alone isn't enough",
    scenes: [
      {
        sceneNumber: 1,
        duration: "0:35",
        visualDescription: "Rohit with piggy bank, looking proud. Bank building in background.",
        voiceover: "Main har mahine thoda paisa bachata hun. Bank me daal deta hun. Safe hai. Par sab log kehte hain 'Invest karo, invest karo'. Kya bank me rakhna kaafi nahi hai?",
        textOverlay: "Bachana vs Invest karna?"
      },
      {
        sceneNumber: 2,
        duration: "0:50",
        visualDescription: "Priya with timeline animation. Rs.100 note gradually shrinking in size over years.",
        voiceover: "Bank me paisa safe hai – ye sach hai. Par ek problem hai. Maan lo tere paas aaj 1 lakh hai. 10 saal baad wohi 1 lakh utna kaam nahi karega jitna aaj karta hai. Kyunki cheezein mehengi ho jaati hain.",
        textOverlay: "Paisa Same, Value Kam"
      },
      {
        sceneNumber: 3,
        duration: "0:55",
        visualDescription: "Pepsi bottle animation: Rs.5 in childhood, Rs.20 now. Same bottle, different prices.",
        voiceover: "Soch, tu bachpan me 5 rupaye ki Pepsi peeta tha. Ab wohi Pepsi 20 rupaye ki hai. Kya company ne size chhota kiya? Nahi. Bas daam badh gaye. Ise mehangai ya inflation kehte hain.",
        textOverlay: "Mehangai = Prices Badhna"
      },
      {
        sceneNumber: 4,
        duration: "0:50",
        visualDescription: "Race track animation. Savings growing slowly at 4%, Inflation running at 6-7%.",
        voiceover: "Bank tumhe 3-4% interest deta hai. Par inflation 6-7% hai. Matlab tumhara paisa inflation ke saath race haar raha hai. Effectively tum loss me ho – bina jaane.",
        textOverlay: "Bank Interest < Inflation = Loss"
      },
      {
        sceneNumber: 5,
        duration: "0:45",
        visualDescription: "Chhotu's chai shop example. 10,000 rupaye, years passing, chai cups reducing.",
        voiceover: "Chhotu ke paas 2015 me 10,000 the. Tab 1000 chai kharid sakta tha. 9 saal baad uske paas interest mila ke 14,000 hue. Par ab sirf 700 chai kharid sakta hai! Paisa badha, buying power giri.",
        textOverlay: "Chai Example: Buying Power Giri"
      },
      {
        sceneNumber: 6,
        duration: "0:40",
        visualDescription: "Rohit having realization. Lightbulb animation.",
        voiceover: "Toh investing ka matlab ye nahi ki main ameer ban jaunga. Pehla goal hai: Mehangai ko beat karna. Ameer banna bonus hai – par pehle ye ensure karo ki tumhara paisa kamzor na pade.",
        textOverlay: "Goal 1: Beat Inflation"
      },
      {
        sceneNumber: 7,
        duration: "0:35",
        visualDescription: "Options appearing: FD, PPF, Mutual Funds, Stocks, Gold.",
        voiceover: "Investing ke bahut tarike hain – FD, PPF, Mutual Funds, Gold, Real Estate, aur Stock Market. Stock market sirf EK option hai. Aur wo risky tabhi hai jab bina samjhe kood pado.",
        textOverlay: "Bahut Options Hain – Seekho Pehle"
      },
      {
        sceneNumber: 8,
        duration: "0:35",
        visualDescription: "Progress bar. Next lesson preview with bazaar graphics.",
        voiceover: "Ab samajh gaye ki investing kyu zaroori hai – inflation beat karne ke liye! Agle lesson me dekhenge ki stock market exactly kya hai – bazaar ki tarah. Tab tak ke liye – well done!",
        textOverlay: "Lesson 3 Complete! Aage: Stock Market Kya Hai?"
      }
    ],
    closingCTA: "Agle lesson me stock market ka simple definition samjhenge – sabzi mandi jaisa concept!"
  },

  // LESSON 4: Stock Market Kya Hai?
  {
    lessonNumber: 4,
    slug: "stock-market-kya-hai",
    title: "Stock market kya hota hai?",
    totalDuration: "5:30",
    targetAudience: "Beginners who understand why investing matters",
    lessonGoal: "Explain stock market as an organized marketplace",
    scenes: [
      {
        sceneNumber: 1,
        duration: "0:40",
        visualDescription: "News channel graphics with 'SENSEX GIRA' headlines. Rohit confused.",
        voiceover: "News me sunte ho – Sensex gira, Nifty badha. Par stock market exactly kya hai? Koi building hai? Website hai? Main bhi confuse tha pehle. Chal simple me samajhte hain.",
        textOverlay: "Stock Market = ???"
      },
      {
        sceneNumber: 2,
        duration: "0:50",
        visualDescription: "Animated sabzi mandi transforming into stock market. Vegetables become company logos.",
        voiceover: "Stock market ek bazaar hai – bilkul waise jaise tere mohalle me sabzi mandi hoti hai. Farq bas itna hai ki sabzi mandi me tamatar, pyaaz bikte hain. Stock market me companies ke shares bikte hain.",
        textOverlay: "Stock Market = Shares Ka Bazaar"
      },
      {
        sceneNumber: 3,
        duration: "0:45",
        visualDescription: "Company building breaking into small puzzle pieces. Each piece labeled 'Share'.",
        voiceover: "Companies apna chhota chhota hissa bechti hain – jise 'share' kehte hain. Jab tu ek share khareedte hai – toh tu us company ka thoda sa maalik ban jaata hai. Poori company nahi bechte, sirf hissa.",
        textOverlay: "Share = Company Ka Hissa"
      },
      {
        sceneNumber: 4,
        duration: "0:55",
        visualDescription: "Historical black and white footage of trading floor, then modern laptop/phone.",
        voiceover: "Pehle ye sab physically hota tha – ek building me traders cheekh cheekh ke deal karte the. Ab ye sab online ho gaya hai – tu ghar baithe phone se bhi kar sakta hai. Technology ne sab easy kar diya.",
        textOverlay: "Pehle Building, Ab Online!"
      },
      {
        sceneNumber: 5,
        duration: "0:45",
        visualDescription: "NSE and BSE building graphics with logos.",
        voiceover: "India me do main stock exchanges hain: BSE – Bombay Stock Exchange, aur NSE – National Stock Exchange. Ye wo jagah hain jahan shares kharide aur beche jaate hain. Dono me same companies listed hain mostly.",
        textOverlay: "India: BSE + NSE"
      },
      {
        sceneNumber: 6,
        duration: "0:40",
        visualDescription: "Buyer and seller animation meeting in the middle. Transaction happening.",
        voiceover: "Stock market me buyers aur sellers milte hain. Tu bechna chahta hai, koi kharidna chahta hai – dono ka price match hota hai, deal ho jaati hai. Ye exchange ye sab manage karta hai.",
        textOverlay: "Buyers + Sellers = Transaction"
      },
      {
        sceneNumber: 7,
        duration: "0:35",
        visualDescription: "Rohit smiling, nodding. Simple summary icons appearing.",
        voiceover: "Toh summary: Stock market ek organized bazaar hai jahan companies ke shares bikte hain. Tu phone se participate kar sakta hai. Koi rocket science nahi hai.",
        textOverlay: "Simple: Shares Ka Organized Bazaar"
      },
      {
        sceneNumber: 8,
        duration: "0:30",
        visualDescription: "Progress bar. Sensex/Nifty preview graphics.",
        voiceover: "Ab basic clear ho gaya! Agle lesson me samjhenge Sensex aur Nifty kya hain – market ke health indicators. Tab tak – keep learning!",
        textOverlay: "Lesson 4 Complete! Aage: Sensex & Nifty"
      }
    ],
    closingCTA: "Agle lesson me Sensex aur Nifty samjhenge – thermometer jaisa concept!"
  },

  // LESSON 5: Sensex aur Nifty
  {
    lessonNumber: 5,
    slug: "sensex-nifty",
    title: "Sensex aur Nifty simple samjhaav",
    totalDuration: "5:30",
    targetAudience: "Beginners who understand stock market basics",
    lessonGoal: "Explain market indices as health indicators",
    scenes: [
      {
        sceneNumber: 1,
        duration: "0:35",
        visualDescription: "News ticker showing 'Sensex up 500 points'. Rohit scratching head.",
        voiceover: "News me roz sunta hai: 'Sensex 500 points gira', 'Nifty naye high pe'. Par matlab kya hai? Ye numbers kya batate hain? Chal simple me samajhte hain.",
        textOverlay: "Sensex? Nifty? Kya hai ye?"
      },
      {
        sceneNumber: 2,
        duration: "0:50",
        visualDescription: "School building with 5000 students icon. Principal thinking. Top 50 students highlighted.",
        voiceover: "Soch teri school me 5000 students hain. Principal ko jaanna hai ki overall school ka result kaisa raha. Har student individually dekhna mushkil hai. Toh principal ne kya kiya? Top 50 students ka average nikala.",
        textOverlay: "School Example: Top 50 ka Average"
      },
      {
        sceneNumber: 3,
        duration: "0:45",
        visualDescription: "Top 50 students transforming into company logos. 'Nifty 50' text appearing.",
        voiceover: "Agar top 50 ka average badha – matlab school overall accha perform kar raha hai. Stock market me bhi same concept hai. Nifty = Top 50 companies ka average. Simple!",
        textOverlay: "Nifty = Top 50 Companies Ka Average"
      },
      {
        sceneNumber: 4,
        duration: "0:45",
        visualDescription: "BSE building graphic. Top 30 company logos appearing.",
        voiceover: "Sensex = Top 30 companies ka group, BSE ka index. Nifty = Top 50 companies ka group, NSE ka index. Dono almost same batate hain – overall market kaise chal raha hai.",
        textOverlay: "Sensex = 30 Companies (BSE)"
      },
      {
        sceneNumber: 5,
        duration: "0:40",
        visualDescription: "Thermometer animation. Market health meter going up and down.",
        voiceover: "Ye market ka thermometer hai. Agar Sensex/Nifty badh raha hai matlab overall market accha chal raha hai. Gir raha hai matlab market mood kharab hai. Simple indicator hai.",
        textOverlay: "Market Ka Thermometer"
      },
      {
        sceneNumber: 6,
        duration: "0:45",
        visualDescription: "Points vs percentage comparison. 500 points at 60,000 vs 500 points at 30,000.",
        voiceover: "Jab news me bolta hai '500 points badha' – percentage bhi dekho. 500 points jab Sensex 60,000 pe ho aur 500 points jab 30,000 pe ho – bahut farak hai. Percentage zyada meaningful hai.",
        textOverlay: "Points + Percentage Dono Dekho"
      },
      {
        sceneNumber: 7,
        duration: "0:35",
        visualDescription: "Index Fund graphic. Easy investment option showing.",
        voiceover: "Aur haan – tu Nifty me directly invest bhi kar sakta hai through Index Funds. Ek investment me top 50 companies. Beginners ke liye simple option hai.",
        textOverlay: "Bonus: Index Funds = Easy Investing"
      },
      {
        sceneNumber: 8,
        duration: "0:35",
        visualDescription: "Progress bar. Risk topic preview with shield icon.",
        voiceover: "Ab Sensex/Nifty samajh gaye! Agle lesson me dekhenge ki stock market me risk kya hai aur kaise manage karein. Risk samjhna bahut zaroori hai. Tab tak – great progress!",
        textOverlay: "Lesson 5 Complete! Aage: Risk Management"
      }
    ],
    closingCTA: "Agle lesson me risk samjhenge – darna nahi, samajhna hai!"
  },

  // LESSON 6: Risk Types
  {
    lessonNumber: 6,
    slug: "risk-types",
    title: "Stock market me risk kya hai?",
    totalDuration: "5:45",
    targetAudience: "Beginners who understand market basics",
    lessonGoal: "Explain risk as uncertainty, not guaranteed loss, and how to manage it",
    scenes: [
      {
        sceneNumber: 1,
        duration: "0:35",
        visualDescription: "Rohit looking worried. 'RISK' word appearing scary at first, then calming down.",
        voiceover: "Stock market ka naam sunte hi ek word yaad aata hai – Risk. Aur sab kehte hain risky hai. Kya sach me paisa doob jaata hai? Chal samajhte hain risk ka asli matlab.",
        textOverlay: "Risk = Darr? Ya Kuch Aur?"
      },
      {
        sceneNumber: 2,
        duration: "0:50",
        visualDescription: "Priya explaining with question mark. Uncertainty concept with multiple paths.",
        voiceover: "Risk matlab uncertainty – future me kya hoga, ye kisi ko pata nahi. Par iska ye matlab nahi ki hamesha bura hota hai. Price badh bhi sakti hai, gir bhi sakti hai. Dono possible hain.",
        textOverlay: "Risk = Uncertainty (Pata Nahi Kya Hoga)"
      },
      {
        sceneNumber: 3,
        duration: "0:55",
        visualDescription: "Chotu on bike with helmet, following rules. Safe riding animation.",
        voiceover: "Chotu ki bike dekho. Bike chalana risky hai – accident ho sakta hai. Par Chotu ne kya kiya? License liya, helmet pehenta hai, rules follow karta hai. Risk khatam nahi hua – par kam ho gaya. Stock market bhi aisi hi hai.",
        textOverlay: "Bike Example: Risk Manage Karo"
      },
      {
        sceneNumber: 4,
        duration: "0:50",
        visualDescription: "Four risk types appearing as icons: Market, Company, Timing, Emotional.",
        voiceover: "Stock market me 4 main risks hain: Market Risk – puri market gir sakti hai. Company Risk – specific company ka problem. Timing Risk – galat time pe buy/sell. Aur Emotional Risk – darr ya greed me galat decision. Ye sabse bada risk hai.",
        textOverlay: "4 Risks: Market, Company, Timing, Emotional"
      },
      {
        sceneNumber: 5,
        duration: "0:45",
        visualDescription: "See-saw animation showing risk and reward balancing. Higher risk = higher potential.",
        voiceover: "Interesting baat ye hai ki risk aur reward connected hain. Jahan zyada risk hai, wahan zyada return bhi possible hai. FD me risk kam hai, return bhi 6-7%. Stocks me risk zyada, return 12-15% bhi possible.",
        textOverlay: "Risk-Reward Connected Hain"
      },
      {
        sceneNumber: 6,
        duration: "0:50",
        visualDescription: "5 risk management tools appearing: Learn, Diversify, Long Term, Affordable Amount, Control Emotions.",
        voiceover: "Risk manage kaise karein? Seekho pehle, invest baad me. Diversify karo – sab ek jagah mat lagao. Long term socho. Utna hi lagao jitna afford kar sako. Aur emotions control karo – logic se chalo.",
        textOverlay: "5 Risk Management Tools"
      },
      {
        sceneNumber: 7,
        duration: "0:35",
        visualDescription: "Rohit confident now. Shield icon protecting investments.",
        voiceover: "Samajh gaya! Risk hamesha rahega, par agar main samajhdar hun toh wo handle ho sakta hai. Darna nahi, samajhna hai. Yehi smart investor ki pehchaan hai.",
        textOverlay: "Darna Nahi, Samajhna Hai!"
      },
      {
        sceneNumber: 8,
        duration: "0:35",
        visualDescription: "Progress bar. Investor vs Trader preview with two paths.",
        voiceover: "Bahut accha! Risk samajh gaye. Agle lesson me dekhenge Investor aur Trader me kya farak hai – ye bahut important decision hai. Tab tak – keep learning!",
        textOverlay: "Lesson 6 Complete! Aage: Investor vs Trader"
      }
    ],
    closingCTA: "Agle lesson me samjhenge ki Investor aur Trader me kya farak hai – tere liye kya better?"
  },

  // LESSON 7: Investor vs Trader
  {
    lessonNumber: 7,
    slug: "investor-vs-trader",
    title: "Investor aur Trader me farak",
    totalDuration: "5:45",
    targetAudience: "Beginners who understand risk",
    lessonGoal: "Explain difference and recommend investing for beginners",
    scenes: [
      {
        sceneNumber: 1,
        duration: "0:35",
        visualDescription: "Two paths diverging – one labeled 'Investor', other 'Trader'.",
        voiceover: "Stock market me do tarike ke log hote hain – Investors aur Traders. Dono paise kamate hain, par tarika bilkul alag hai. Aaj samjhenge ki tere liye kya suitable hai.",
        textOverlay: "2 Paths: Investor vs Trader"
      },
      {
        sceneNumber: 2,
        duration: "0:50",
        visualDescription: "House buying animation. One person living 20 years, another flipping in 6 months.",
        voiceover: "Soch tu ek ghar khareedte hai. Agar tu us ghar me 20 saal rehne ka plan hai – tu Investor hai. Agar tu wo ghar 6 mahine baad zyada price me bechne ke liye khareed raha hai – tu Trader hai. Simple!",
        textOverlay: "House Example: Long vs Short Term"
      },
      {
        sceneNumber: 3,
        duration: "0:50",
        visualDescription: "Investor character with calendar showing years. Company analysis icons.",
        voiceover: "Investor shares khareedte hai LONG TERM ke liye – years, sometimes decades. Investor company dekhta hai – 'Ye company acchi hai? Grow karegi?' Daily price check nahi karta. Warren Buffett, Rakesh Jhunjhunwala – ye investors the.",
        textOverlay: "Investor = Long Term, Company Focus"
      },
      {
        sceneNumber: 4,
        duration: "0:50",
        visualDescription: "Trader character with charts, multiple screens, stressed look.",
        voiceover: "Trader shares SHORT TERM me khareedte aur bechte hai – din, hafta, kuch mahine. Daily charts dekhta hai, price movement track karta hai. Bahut time lagta hai aur bahut risky hai. 90% traders paisa gawa dete hain – ye SEBI ka data hai.",
        textOverlay: "Trader = Short Term, 90% Lose Money"
      },
      {
        sceneNumber: 5,
        duration: "0:55",
        visualDescription: "Mango tree example. One uncle with tree (10 years), another at mandi daily.",
        voiceover: "Aam ka example: Ek uncle ne aam ka ped lagaya 10 saal pehle – ab har saal free me aam milte hain. Wo Investor hai. Doosre uncle roz mandi jaate hain – subah saste, shaam ko mehenga bechte hain. Wo Trader hai. Effort bahut alag hai.",
        textOverlay: "Aam Example: Passive vs Active"
      },
      {
        sceneNumber: 6,
        duration: "0:40",
        visualDescription: "Job person investing monthly vs full-time trader at desk.",
        voiceover: "Aur ek important baat – Trading ek FULL TIME JOB hai. Daily market dekhna padega. Investing PASSIVE hai. Tu apni regular job karte hue bhi kar sakta hai. Monthly invest karo, bhool jao.",
        textOverlay: "Trading = Full Time Job"
      },
      {
        sceneNumber: 7,
        duration: "0:40",
        visualDescription: "Social media 'GET RICH QUICK' posts crossed out. Real SEBI data showing.",
        voiceover: "Social media pe log dikhate hain – 'Maine 1 lakh se 10 lakh banaye trading se!' Ye mostly fake hai. Wo losses nahi dikhate. Real data: 90% retail traders lose money. Beginners ke liye investing hi sahi hai.",
        textOverlay: "Warning: Social Media Fake Hai"
      },
      {
        sceneNumber: 8,
        duration: "0:35",
        visualDescription: "Rohit choosing 'Investor' path. Happy, confident look.",
        voiceover: "Smart decision! Investing me bhi accha paisa banta hai – bas thoda time lagta hai. Slow and steady wins the race. Agle lesson me Level 1 summarize karenge aur Level 2 ka preview milega!",
        textOverlay: "Lesson 7 Complete! Aage: Level 1 Summary"
      }
    ],
    closingCTA: "Agle lesson me Level 1 complete karenge – summary aur Level 2 ka preview!"
  },

  // LESSON 8: Level 1 Conclusion
  {
    lessonNumber: 8,
    slug: "level1-conclusion",
    title: "Level 1 Complete – Ab aage kya?",
    totalDuration: "5:00",
    targetAudience: "Learners who completed all Level 1 lessons",
    lessonGoal: "Summarize learnings, build confidence, preview Level 2",
    scenes: [
      {
        sceneNumber: 1,
        duration: "0:35",
        visualDescription: "Celebration animation. Confetti, 'Level 1 Complete' banner.",
        voiceover: "Congratulations! Tune Level 1 complete kar liya! Ye ek bada step hai tere financial learning journey me. Bahut logon me ye himmat nahi hoti – tu alag hai. Tu seekh raha hai.",
        textOverlay: "Level 1 Complete! Bahut Badhiya!"
      },
      {
        sceneNumber: 2,
        duration: "0:40",
        visualDescription: "Rohit transformation – worried in Lesson 1, confident now.",
        voiceover: "Pehle stock market ka naam sunte hi darr lagta tha. Ab? Ab tu jaanta hai ki ye koi monster nahi hai. Ye ek organized marketplace hai jahan tu bhi participate kar sakta hai. Ye transformation bahut important hai.",
        textOverlay: "Darr Se Confidence Tak"
      },
      {
        sceneNumber: 3,
        duration: "0:55",
        visualDescription: "7 lesson icons appearing one by one with key takeaways.",
        voiceover: "Quick recap: Lesson 1 – Myths clear kiye. Lesson 2 – Share = company ka hissa. Lesson 3 – Investing beats inflation. Lesson 4 – Stock market = shares ka bazaar. Lesson 5 – Sensex/Nifty = market thermometer. Lesson 6 – Risk manage ho sakta hai. Lesson 7 – Investing better than trading for beginners.",
        textOverlay: "7 Lessons Ka Summary"
      },
      {
        sceneNumber: 4,
        duration: "0:40",
        visualDescription: "Checklist of learnings with green ticks.",
        voiceover: "Ab tu jaanta hai ki share kya hai, stock market kaise kaam karta hai, risk kya hai, aur investing kyu better hai. Ye foundation bahut strong hai. Ab tu ready hai practical cheezein seekhne ke liye!",
        textOverlay: "Strong Foundation Ready!"
      },
      {
        sceneNumber: 5,
        duration: "0:50",
        visualDescription: "Level 2 preview icons: Demat Account, Broker, First Purchase.",
        voiceover: "Level 2 me PRACTICAL sikhenge: Demat Account kya hai aur kaise open karein. Broker kaise choose karein – Zerodha, Groww, etc. Apna pehla share kaise kharidein – step by step. Level 2 ke baad tu actually trading app use karne laayak ho jayega!",
        textOverlay: "Level 2: Practical Learning"
      },
      {
        sceneNumber: 6,
        duration: "0:35",
        visualDescription: "Priya with advice. Slow and steady tortoise winning race.",
        voiceover: "Par yaad rakh – jaldi mat kar. Level 2 start karne se pehle Level 1 concepts clear hone chahiye. Agar koi doubt ho toh peeche jaake phir padh. Strong foundation = long term success.",
        textOverlay: "Patience = Success"
      },
      {
        sceneNumber: 7,
        duration: "0:40",
        visualDescription: "Rohit and Priya high-fiving. Motivational graphics.",
        voiceover: "Stock market teri financial freedom ka ek powerful tool hai. Tu seekh raha hai – ye already 90% logon se aage hai jo sirf sochte hain par kuch nahi karte. Patience rakh. Consistent reh. Har din thoda seekh.",
        textOverlay: "Tu 90% Se Aage Hai!"
      },
      {
        sceneNumber: 8,
        duration: "0:35",
        visualDescription: "Level 1 badge awarded. Level 2 door opening.",
        voiceover: "Level 2 me milte hain! All the best, future investor! Tera financial journey yahan se shuru hota hai. Aage badho. Invest karo. Learn karo. Grow karo.",
        textOverlay: "Level 1 Badge! Ready for Level 2!"
      }
    ],
    closingCTA: "Level 2 me milte hain – practical learning shuru! Demat Account se start karenge."
  }
];

// Video Production Guidelines
export const videoProductionGuidelines = {
  visualStyle: {
    colorPalette: "Calm blues, greens, and professional grays. Avoid red/alarming colors.",
    animation: "Smooth, slow transitions. No sudden movements. Reassuring feel.",
    characters: "Rohit and Priya as friendly animated peers. Same age, casual clothing.",
    textOverlays: "Large, readable Hindi/Hinglish text. Duration: minimum 3 seconds."
  },
  audioStyle: {
    voiceover: "Calm, friendly, peer-tone. Not preachy or lecturing.",
    pacing: "Slow and clear. Allow pauses for absorption.",
    music: "Soft background music. No dramatic sounds.",
    language: "Hindi with common English terms (share, market, investment, etc.)"
  },
  contentRules: {
    noElderTerms: "NEVER use didi, bhaiya, sir, madam. Peer language only.",
    dailyExamples: "Use chai shop, sabzi mandi, bike, school examples.",
    reassurance: "Every lesson should reduce fear and build confidence.",
    noJargon: "Explain every term. No assumed knowledge."
  }
};
