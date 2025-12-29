import jsPDF from 'jspdf';
import 'jspdf-autotable';

const COLORS = {
  primary: '#0B3B8C',
  primaryLight: '#1E40AF',
  accent: '#10B981',
  accentLight: '#34D399',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  warning: '#DC2626',
  priyaBubble: '#ECFDF5',
  rohitBubble: '#EFF6FF',
};

const MARGINS = { left: 18, right: 18, top: 20, bottom: 18 };

function addBrandingFooter(doc: jsPDF, pageNum: number) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  doc.setDrawColor(COLORS.border);
  doc.setLineWidth(0.3);
  doc.line(MARGINS.left, pageHeight - 14, pageWidth - MARGINS.right, pageHeight - 14);
  
  doc.setFontSize(8);
  doc.setTextColor(COLORS.textMuted);
  doc.text('Rotech Shiksha', MARGINS.left, pageHeight - 8);
  doc.text('rotechshiksha.com', pageWidth / 2, pageHeight - 8, { align: 'center' });
  doc.text(`Page ${pageNum}`, pageWidth - MARGINS.right, pageHeight - 8, { align: 'right' });
}

function addChapterHeading(doc: jsPDF, title: string, y: number): number {
  doc.setFontSize(20);
  doc.setTextColor(COLORS.primary);
  doc.setFont('helvetica', 'bold');
  doc.text(title, MARGINS.left, y);
  
  doc.setDrawColor(COLORS.accent);
  doc.setLineWidth(2);
  doc.line(MARGINS.left, y + 4, MARGINS.left + 50, y + 4);
  
  return y + 18;
}

function addParagraph(doc: jsPDF, text: string, y: number, maxWidth?: number): number {
  doc.setFontSize(11);
  doc.setTextColor(COLORS.text);
  doc.setFont('helvetica', 'normal');
  
  const width = maxWidth || doc.internal.pageSize.getWidth() - MARGINS.left - MARGINS.right;
  const lines = doc.splitTextToSize(text, width);
  doc.text(lines, MARGINS.left, y);
  
  return y + lines.length * 5 + 6;
}

function addPriyaBubble(doc: jsPDF, text: string, y: number): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const bubbleWidth = pageWidth - MARGINS.left - MARGINS.right - 10;
  
  doc.setFillColor('#ECFDF5');
  doc.setDrawColor(COLORS.accent);
  doc.setLineWidth(0.5);
  
  const lines = doc.splitTextToSize(text, bubbleWidth - 20);
  const bubbleHeight = lines.length * 5 + 18;
  
  doc.roundedRect(MARGINS.left, y, bubbleWidth, bubbleHeight, 4, 4, 'FD');
  
  doc.setFillColor(COLORS.accent);
  doc.circle(MARGINS.left + 12, y + 12, 8, 'F');
  doc.setFontSize(10);
  doc.setTextColor('#FFFFFF');
  doc.text('P', MARGINS.left + 9.5, y + 15);
  
  doc.setFontSize(9);
  doc.setTextColor(COLORS.accent);
  doc.setFont('helvetica', 'bold');
  doc.text('Priya says:', MARGINS.left + 25, y + 10);
  
  doc.setFontSize(10);
  doc.setTextColor(COLORS.text);
  doc.setFont('helvetica', 'normal');
  doc.text(lines, MARGINS.left + 25, y + 18);
  
  return y + bubbleHeight + 8;
}

function addRohitBubble(doc: jsPDF, text: string, y: number): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const bubbleWidth = pageWidth - MARGINS.left - MARGINS.right - 10;
  
  doc.setFillColor('#EFF6FF');
  doc.setDrawColor(COLORS.primary);
  doc.setLineWidth(0.5);
  
  const lines = doc.splitTextToSize(text, bubbleWidth - 20);
  const bubbleHeight = lines.length * 5 + 18;
  
  doc.roundedRect(MARGINS.left + 10, y, bubbleWidth, bubbleHeight, 4, 4, 'FD');
  
  doc.setFillColor(COLORS.primary);
  doc.circle(MARGINS.left + bubbleWidth - 2, y + 12, 8, 'F');
  doc.setFontSize(10);
  doc.setTextColor('#FFFFFF');
  doc.text('R', MARGINS.left + bubbleWidth - 5, y + 15);
  
  doc.setFontSize(9);
  doc.setTextColor(COLORS.primary);
  doc.setFont('helvetica', 'bold');
  doc.text('Rohit asks:', MARGINS.left + 20, y + 10);
  
  doc.setFontSize(10);
  doc.setTextColor(COLORS.text);
  doc.setFont('helvetica', 'normal');
  doc.text(lines, MARGINS.left + 20, y + 18);
  
  return y + bubbleHeight + 8;
}

function addExampleBox(doc: jsPDF, title: string, content: string, y: number): number {
  const pageWidth = doc.internal.pageSize.getWidth();
  const boxWidth = pageWidth - MARGINS.left - MARGINS.right;
  
  doc.setFillColor('#FEF3C7');
  doc.setDrawColor('#F59E0B');
  doc.setLineWidth(0.5);
  
  const lines = doc.splitTextToSize(content, boxWidth - 20);
  const boxHeight = lines.length * 5 + 22;
  
  doc.roundedRect(MARGINS.left, y, boxWidth, boxHeight, 3, 3, 'FD');
  
  doc.setFontSize(10);
  doc.setTextColor('#92400E');
  doc.setFont('helvetica', 'bold');
  doc.text(title, MARGINS.left + 10, y + 10);
  
  doc.setFontSize(10);
  doc.setTextColor(COLORS.text);
  doc.setFont('helvetica', 'normal');
  doc.text(lines, MARGINS.left + 10, y + 18);
  
  return y + boxHeight + 8;
}

function addChecklist(doc: jsPDF, items: string[], y: number): number {
  doc.setFontSize(10);
  doc.setTextColor(COLORS.text);
  doc.setFont('helvetica', 'normal');
  
  items.forEach((item, i) => {
    doc.setDrawColor(COLORS.border);
    doc.setLineWidth(0.3);
    doc.rect(MARGINS.left, y + i * 8 - 3, 4, 4);
    
    doc.setTextColor(COLORS.accent);
    doc.text('', MARGINS.left + 1, y + i * 8);
    
    doc.setTextColor(COLORS.text);
    doc.text(item, MARGINS.left + 8, y + i * 8);
  });
  
  return y + items.length * 8 + 6;
}

export async function generatePremiumStockMarketBookPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - MARGINS.left - MARGINS.right;

  // ========== PAGE 1: COVER ==========
  doc.setFillColor(COLORS.primary);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  doc.setFillColor(COLORS.primaryLight);
  doc.rect(0, pageHeight * 0.6, pageWidth, pageHeight * 0.4, 'F');
  
  doc.setFillColor(240, 245, 255);
  doc.circle(pageWidth * 0.8, pageHeight * 0.25, 45, 'F');
  doc.setFillColor(235, 240, 250);
  doc.circle(pageWidth * 0.8, pageHeight * 0.25, 35, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor('#FFFFFF');
  doc.setFont('helvetica', 'normal');
  doc.text('ROTECH SHIKSHA PRESENTS', MARGINS.left, 35);
  
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('Stock Market', MARGINS.left, 55);
  doc.text('Seekho', MARGINS.left, 70);
  
  doc.setFontSize(22);
  doc.setTextColor(COLORS.accentLight);
  doc.text('Bilkul Zero Se', MARGINS.left, 85);
  
  doc.setFillColor(COLORS.accent);
  doc.roundedRect(MARGINS.left, 95, 55, 10, 5, 5, 'F');
  doc.setFontSize(9);
  doc.setTextColor('#FFFFFF');
  doc.setFont('helvetica', 'bold');
  doc.text('2025 EDITION', MARGINS.left + 10, 102);
  
  doc.setFontSize(12);
  doc.setTextColor('#FFFFFF');
  doc.setFont('helvetica', 'normal');
  doc.text('Priya & Rohit ke saath', MARGINS.left, 120);
  doc.text('fun Hinglish guide', MARGINS.left, 128);
  
  doc.setFillColor('#FFFFFF');
  doc.circle(MARGINS.left + 30, pageHeight - 60, 25, 'F');
  doc.setTextColor(COLORS.accent);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('P', MARGINS.left + 25, pageHeight - 55);
  
  doc.setFillColor('#FFFFFF');
  doc.circle(MARGINS.left + 70, pageHeight - 60, 25, 'F');
  doc.setTextColor(COLORS.primary);
  doc.text('R', MARGINS.left + 65, pageHeight - 55);
  
  doc.setFontSize(10);
  doc.setTextColor('#FFFFFF');
  doc.setFont('helvetica', 'normal');
  doc.text('rotechshiksha.com', MARGINS.left, pageHeight - 15);
  
  // ========== PAGE 2: ABOUT THIS BOOK ==========
  doc.addPage();
  addBrandingFooter(doc, 2);
  
  let y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'About This Book', y);
  
  y = addParagraph(doc, 'Namaste dost! Welcome to the ultimate beginner guide for Indian stock market. Ye book specially unke liye hai jo stock market mein bilkul naye hain aur simple Hinglish mein seekhna chahte hain.', y);
  
  y = addPriyaBubble(doc, 'Main Priya hun - tumhari financial guide! Main tumhe step-by-step stock market ki duniya mein le jaaungi. Koi complicated terms nahi, sirf simple explanation!', y);
  
  y = addRohitBubble(doc, 'Aur main Rohit hun - tumhara learning buddy! Main bhi beginner hun toh main woh sawal puchunga jo tum soch rahe ho. Chalo saath mein seekhte hain!', y);
  
  y += 5;
  doc.setFontSize(14);
  doc.setTextColor(COLORS.primary);
  doc.setFont('helvetica', 'bold');
  doc.text('Is book mein tum seekhoge:', MARGINS.left, y);
  y += 10;
  
  const learnings = [
    'Stock market ki basic samajh (Hindi mein)',
    'Demat account kaise kholein step-by-step',
    'IPO, SIP, aur investing ki strategies',
    'Common mistakes jo avoid karni chahiye',
    'Trading vs Investing ka difference',
    'Basic chart reading concepts',
    'Risk management techniques',
    'Real action plan to start investing'
  ];
  
  y = addChecklist(doc, learnings, y);
  
  y = addExampleBox(doc, 'Pro Tip', 'Is book ko ek baar padhne ke baad, phir se chapters revisit karo. Practice karo paper trading se pehle real money invest karo!', y);

  // ========== PAGE 3: TABLE OF CONTENTS ==========
  doc.addPage();
  addBrandingFooter(doc, 3);
  
  y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'Table of Contents', y);
  
  const chapters = [
    { num: 1, title: 'Stock Market Kya Hota Hai?', page: 4 },
    { num: 2, title: 'Demat Account Kaise Banate Hain?', page: 5 },
    { num: 3, title: 'IPO vs Stock - Kya Difference Hai?', page: 6 },
    { num: 4, title: 'Market Timing & Trading Hours', page: 7 },
    { num: 5, title: 'SIP & Long Term Investing', page: 8 },
    { num: 6, title: 'Risk Management Basics', page: 9 },
    { num: 7, title: 'Trading vs Investing', page: 10 },
    { num: 8, title: 'Basic Chart Concepts', page: 11 },
    { num: 9, title: 'Beginners Mistakes to Avoid', page: 12 },
    { num: 10, title: 'Your Action Plan & Next Steps', page: 13 },
  ];
  
  chapters.forEach((ch) => {
    doc.setFillColor(COLORS.background);
    doc.roundedRect(MARGINS.left, y - 3, contentWidth, 12, 2, 2, 'F');
    
    doc.setFillColor(COLORS.primary);
    doc.circle(MARGINS.left + 8, y + 3, 5, 'F');
    doc.setFontSize(10);
    doc.setTextColor('#FFFFFF');
    doc.setFont('helvetica', 'bold');
    doc.text(ch.num.toString(), MARGINS.left + 5.5, y + 5.5);
    
    doc.setFontSize(11);
    doc.setTextColor(COLORS.text);
    doc.setFont('helvetica', 'normal');
    doc.text(ch.title, MARGINS.left + 18, y + 5);
    
    doc.setTextColor(COLORS.textMuted);
    doc.text(`Page ${ch.page}`, pageWidth - MARGINS.right - 15, y + 5);
    
    y += 16;
  });

  // ========== PAGE 4: CHAPTER 1 ==========
  doc.addPage();
  addBrandingFooter(doc, 4);
  
  y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'Chapter 1: Stock Market Kya Hota Hai?', y);
  
  y = addParagraph(doc, 'Stock market ek aisi jagah hai jahan companies apne shares bechti hain aur log unhe kharid sakte hain. Jab tum share kharidte ho, tum us company ke part-owner ban jaate ho!', y);
  
  y = addRohitBubble(doc, 'Matlab agar main Reliance ka 1 share kharid lun, toh main Mukesh Ambani ka partner ban jaunga?', y);
  
  y = addPriyaBubble(doc, 'Haan theoretically! But obviously bahut chhota hissa hoga. Company mein crores shares hote hain. But haan, legally tu owner ban jaata hai aur profits mein share milta hai through dividends!', y);
  
  y = addExampleBox(doc, 'Real Example', 'Reliance Industries ke lagbhag 676 crore shares hain. Agar tune 100 shares kharide Rs 2500 mein, toh tu 0.0000015% owner banega. Chota hai but still owner!', y);
  
  y = addChecklist(doc, [
    'Stock = Company ka ownership share',
    'NSE & BSE = Indian stock exchanges',
    'SEBI = Market regulator (police jaisa)',
    'Share price demand-supply se decide hota hai'
  ], y);

  // ========== PAGE 5: CHAPTER 2 ==========
  doc.addPage();
  addBrandingFooter(doc, 5);
  
  y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'Chapter 2: Demat Account Kaise Banate Hain?', y);
  
  y = addParagraph(doc, 'Demat account tera digital locker hai jahan tere saare shares store hote hain. Trading account se tu buy/sell karta hai. Dono chahiye stock market mein entry ke liye.', y);
  
  y = addPriyaBubble(doc, 'Socho bank account jaisa - savings account mein paise rehte hain, Demat mein shares rehte hain. Simple!', y);
  
  y = addExampleBox(doc, 'Step-by-Step Process', '1. Choose a broker (Zerodha, Groww, Angel One)\n2. Download their app\n3. Enter mobile number & verify OTP\n4. Enter PAN card & Aadhaar details\n5. Complete video KYC (2 min)\n6. Account ready in 24-48 hours!', y);
  
  y = addRohitBubble(doc, 'Koi charges lagte hain account kholne mein?', y);
  
  y = addPriyaBubble(doc, 'Most brokers free mein Demat account kholte hain! Sirf trading ke time brokerage lagta hai - around Rs 20 per order.', y);
  
  y = addChecklist(doc, [
    'Zerodha - Most popular, reliable',
    'Groww - Beginner friendly UI',
    'Angel One - Free delivery trades',
    'Upstox - Low brokerage charges'
  ], y);

  // ========== PAGE 6: CHAPTER 3 ==========
  doc.addPage();
  addBrandingFooter(doc, 6);
  
  y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'Chapter 3: IPO vs Stock - Kya Difference?', y);
  
  y = addParagraph(doc, 'IPO (Initial Public Offering) tab hota hai jab company pehli baar public mein shares bechti hai. Stock wo hai jo already market mein trade ho raha hai.', y);
  
  y = addRohitBubble(doc, 'Toh IPO mein invest karna better hai ya already listed stocks mein?', y);
  
  y = addPriyaBubble(doc, 'Dono ke apne risks hain! IPO mein listing gains mil sakte hain but risky bhi hai. Listed stocks ka track record dekh sakte ho. Beginners ke liye listed large caps safer hain.', y);
  
  y = addExampleBox(doc, 'IPO Success Story', 'Zomato IPO - Issue price Rs 76, Listed at Rs 116. Day 1 profit = 52%! But yaad rakh, har IPO aisa nahi hota. Paytm IPO mein bahut loss hua tha investors ko.', y);
  
  y = addChecklist(doc, [
    'IPO = Company first time public mein aati hai',
    'Grey market premium check karo',
    'Company fundamentals research karo',
    'Beginners avoid करें risky IPOs'
  ], y);

  // ========== PAGE 7: CHAPTER 4 ==========
  doc.addPage();
  addBrandingFooter(doc, 7);
  
  y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'Chapter 4: Market Timing & Trading Hours', y);
  
  y = addParagraph(doc, 'Indian stock market (NSE/BSE) Monday se Friday open rehta hai. Market timing samajhna important hai kyunki different times pe different activities hoti hain.', y);
  
  y = addExampleBox(doc, 'Market Schedule (IST)', 'Pre-Open Session: 9:00 AM - 9:15 AM\nRegular Trading: 9:15 AM - 3:30 PM\nPost-Market: 3:30 PM - 4:00 PM\n\nMarket Closed: Saturday, Sunday, Public Holidays', y);
  
  y = addRohitBubble(doc, 'Pre-market session kya hota hai? Kya main 9 baje se trade kar sakta hun?', y);
  
  y = addPriyaBubble(doc, 'Pre-market mein orders place hote hain but execute nahi hote. 9:15 pe opening price decide hota hai based on demand-supply. Beginners ke liye 9:30-3:00 best time hai trading ke liye.', y);
  
  y = addChecklist(doc, [
    '9:15-9:30 = High volatility, avoid if beginner',
    '10:00-2:00 = Stable trading hours',
    '3:00-3:30 = Last hour volatility',
    'Never trade on emotions!'
  ], y);

  // ========== PAGE 8: CHAPTER 5 ==========
  doc.addPage();
  addBrandingFooter(doc, 8);
  
  y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'Chapter 5: SIP & Long Term Investing', y);
  
  y = addParagraph(doc, 'SIP (Systematic Investment Plan) matlab har mahine fixed amount invest karna. Ye power of compounding use karta hai aur market timing ki tension nahi rehti.', y);
  
  y = addPriyaBubble(doc, 'SIP is like magic! Rs 5000/month invest karo 20 years ke liye at 12% return = Rs 50 lakh+! Time is your biggest asset.', y);
  
  y = addExampleBox(doc, 'SIP Calculation Example', 'Monthly SIP: Rs 10,000\nTime Period: 15 years\nExpected Return: 12% p.a.\n\nTotal Investment: Rs 18,00,000\nEstimated Returns: Rs 32,00,000\nTotal Value: Rs 50,00,000', y);
  
  y = addRohitBubble(doc, 'Par agar market crash ho gaya toh SIP continue karna chahiye?', y);
  
  y = addPriyaBubble(doc, 'Bilkul! Crash = Sale! Jab market girta hai, same amount mein zyada units milti hain. This is called rupee cost averaging. Never stop SIP in crash!', y);
  
  y = addChecklist(doc, [
    'Start with Nifty 50 Index Fund SIP',
    'Increase SIP amount yearly by 10%',
    'Never break SIP in market crash',
    'Think 10+ years for equity investing'
  ], y);

  // ========== PAGE 9: CHAPTER 6 ==========
  doc.addPage();
  addBrandingFooter(doc, 9);
  
  y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'Chapter 6: Risk Management Basics', y);
  
  y = addParagraph(doc, 'Risk management matlab apne capital ko protect karna. Stock market mein paisa banana important hai but usse zyada important hai paise na gawana!', y);
  
  y = addRohitBubble(doc, 'Kaise pata chalega kitna risk lena chahiye? Mujhe bahut darr lagta hai loss ka.', y);
  
  y = addPriyaBubble(doc, 'Golden Rule: Kabhi bhi utna invest karo jitna tum afford kar sako lose karna. Emergency fund pehle, investing baad mein. Aur 2% rule follow karo!', y);
  
  y = addExampleBox(doc, 'The 2% Rule', 'Agar tera total capital Rs 1,00,000 hai:\nMaximum risk per trade = 2% = Rs 2,000\n\nMatlab agar trade loss mein jaaye, maximum Rs 2,000 hi gawa. Stop-loss lagao accordingly!', y);
  
  y = addChecklist(doc, [
    'Always use stop-loss orders',
    'Never invest borrowed money',
    'Keep 6 months emergency fund safe',
    'Diversify - Ek basket mein saare ande mat rakh',
    'Position sizing follow karo'
  ], y);

  // ========== PAGE 10: CHAPTER 7 ==========
  doc.addPage();
  addBrandingFooter(doc, 10);
  
  y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'Chapter 7: Trading vs Investing', y);
  
  y = addParagraph(doc, 'Trading aur investing dono alag cheezein hain. Trading short-term profit ke liye hai, investing long-term wealth building ke liye. Beginners ke liye investing better hai.', y);
  
  y = addExampleBox(doc, 'Quick Comparison', 'TRADING:\n- Hold: Minutes to weeks\n- Goal: Quick profits\n- Risk: Very high\n- Time needed: Full-time focus\n\nINVESTING:\n- Hold: Years to decades\n- Goal: Wealth building\n- Risk: Moderate\n- Time needed: Few hours/month', y);
  
  y = addRohitBubble(doc, 'Mujhe jaldi paise banana hai. Trading better option nahi hai kya?', y);
  
  y = addPriyaBubble(doc, 'Rohit, 95% traders lose money! Ye fact hai. Trading bahut skill aur experience maangta hai. Start with investing, 2-3 saal market samjho, phir trading try karo.', y);
  
  y = addChecklist(doc, [
    'Beginners: Start with investing',
    'Paper trade for 6 months first',
    'Trading mein emotions control zaroori',
    'Investing mein patience se wealth banti hai'
  ], y);

  // ========== PAGE 11: CHAPTER 8 ==========
  doc.addPage();
  addBrandingFooter(doc, 11);
  
  y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'Chapter 8: Basic Chart Concepts', y);
  
  y = addParagraph(doc, 'Charts stocks ki price movement dikhate hain. Basic chart reading se tum better decisions le sakte ho. Candlestick charts sabse popular hain.', y);
  
  y = addPriyaBubble(doc, 'Chart padna ek skill hai. Initially confusing lagega but practice se easy ho jaata hai. Start with simple line charts!', y);
  
  y = addExampleBox(doc, 'Candlestick Basics', 'Green Candle = Price went UP (Bullish)\nRed Candle = Price went DOWN (Bearish)\n\nBody = Opening to Closing price\nWick/Shadow = High and Low of the day', y);
  
  y = addRohitBubble(doc, 'Kya chart dekhke future predict kar sakte hain?', y);
  
  y = addPriyaBubble(doc, 'Predict nahi, probability samajh sakte ho! Charts past movement dikhate hain. Patterns repeat hote hain sometimes. But 100% accurate koi bhi method nahi hai.', y);
  
  y = addChecklist(doc, [
    'Support = Price jahan ruka (neeche)',
    'Resistance = Price jahan ruka (upar)',
    'Volume = Trading activity indicator',
    'Trend follow karo, against mat jao'
  ], y);

  // ========== PAGE 12: CHAPTER 9 ==========
  doc.addPage();
  addBrandingFooter(doc, 12);
  
  y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'Chapter 9: Beginner Mistakes to Avoid', y);
  
  y = addParagraph(doc, 'Har beginner ye galtiyan karta hai. Tum seekh lo aur avoid karo - lakhs bach jayenge!', y);
  
  const mistakes = [
    { title: 'WhatsApp/Telegram Tips Follow Karna', desc: 'Free tips = Trap! Research karo khud.' },
    { title: 'Panic Selling', desc: 'Market gira toh bech diya. Patience rakho!' },
    { title: 'No Stop-Loss', desc: 'Small loss accept karo, big loss se bacho.' },
    { title: 'Borrowed Money Se Trading', desc: 'Loan leke invest = Disaster recipe.' },
    { title: 'FOMO (Fear of Missing Out)', desc: 'Sab kharid rahe toh main bhi - GALAT!' },
  ];
  
  mistakes.forEach((m) => {
    doc.setFillColor('#FEF2F2');
    doc.setDrawColor('#FECACA');
    doc.setLineWidth(0.5);
    doc.roundedRect(MARGINS.left, y, contentWidth, 18, 3, 3, 'FD');
    
    doc.setFillColor(COLORS.warning);
    doc.circle(MARGINS.left + 8, y + 9, 5, 'F');
    doc.setFontSize(10);
    doc.setTextColor('#FFFFFF');
    doc.setFont('helvetica', 'bold');
    doc.text('!', MARGINS.left + 6.5, y + 12);
    
    doc.setFontSize(10);
    doc.setTextColor(COLORS.warning);
    doc.setFont('helvetica', 'bold');
    doc.text(m.title, MARGINS.left + 18, y + 7);
    
    doc.setFontSize(9);
    doc.setTextColor(COLORS.textSecondary);
    doc.setFont('helvetica', 'normal');
    doc.text(m.desc, MARGINS.left + 18, y + 14);
    
    y += 22;
  });
  
  y += 5;
  y = addPriyaBubble(doc, 'In 5 mistakes se bachoge toh 80% success mil jayegi. Promise!', y);

  // ========== PAGE 13: ACTION PLAN & CTA ==========
  doc.addPage();
  addBrandingFooter(doc, 13);
  
  y = MARGINS.top + 10;
  y = addChapterHeading(doc, 'Chapter 10: Your Action Plan', y);
  
  y = addParagraph(doc, 'Ab time hai action lene ka! Yahan tera 30-day beginner action plan hai. Follow karo aur stock market journey shuru karo!', y);
  
  const actionPlan = [
    'Week 1: Demat account kholo (Zerodha/Groww)',
    'Week 1: Rs 500 se demo trade karo',
    'Week 2: Nifty 50 index fund mein Rs 1000 SIP start karo',
    'Week 2: Daily 15 min market news padho',
    'Week 3: Paper trading practice karo',
    'Week 3: 5 large cap stocks research karo',
    'Week 4: First real investment karo (small amount)',
    'Week 4: Trading journal maintain karna shuru karo'
  ];
  
  y = addChecklist(doc, actionPlan, y);
  
  doc.setFillColor(COLORS.primary);
  doc.roundedRect(MARGINS.left, y, contentWidth, 55, 5, 5, 'F');
  
  doc.setFontSize(16);
  doc.setTextColor('#FFFFFF');
  doc.setFont('helvetica', 'bold');
  doc.text('Start Your Free Course Today!', MARGINS.left + 15, y + 15);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('8-level learning path with Priya & Rohit', MARGINS.left + 15, y + 28);
  doc.text('Calculators, paper trading, live market data', MARGINS.left + 15, y + 38);
  doc.text('rotechshiksha.com/courses', MARGINS.left + 15, y + 48);
  
  doc.setFillColor('#FFFFFF');
  doc.roundedRect(pageWidth - MARGINS.right - 45, y + 8, 40, 40, 3, 3, 'F');
  doc.setFontSize(8);
  doc.setTextColor(COLORS.primary);
  doc.text('SCAN QR', pageWidth - MARGINS.right - 38, y + 28);
  doc.text('FOR', pageWidth - MARGINS.right - 32, y + 35);
  doc.text('COURSE', pageWidth - MARGINS.right - 37, y + 42);
  
  y += 70;
  
  doc.setFillColor('#F0FDF4');
  doc.setDrawColor(COLORS.accent);
  doc.roundedRect(MARGINS.left, y, contentWidth, 35, 4, 4, 'FD');
  
  doc.setFontSize(12);
  doc.setTextColor(COLORS.accent);
  doc.setFont('helvetica', 'bold');
  doc.text('Join WhatsApp Community', MARGINS.left + 15, y + 14);
  
  doc.setFontSize(10);
  doc.setTextColor(COLORS.text);
  doc.setFont('helvetica', 'normal');
  doc.text('Daily market updates aur trading tips ke liye!', MARGINS.left + 15, y + 26);
  
  y += 50;
  
  doc.setFillColor(COLORS.accent);
  doc.circle(MARGINS.left + 25, y + 15, 15, 'F');
  doc.setTextColor('#FFFFFF');
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('P', MARGINS.left + 21, y + 19);
  
  doc.setFillColor(COLORS.primary);
  doc.circle(MARGINS.left + 55, y + 15, 15, 'F');
  doc.text('R', MARGINS.left + 51, y + 19);
  
  doc.setFontSize(14);
  doc.setTextColor(COLORS.text);
  doc.text('See you inside the course!', MARGINS.left + 80, y + 12);
  doc.setFontSize(11);
  doc.setTextColor(COLORS.textSecondary);
  doc.text('— Priya & Rohit', MARGINS.left + 80, y + 22);
  
  y += 45;
  
  doc.setFontSize(8);
  doc.setTextColor(COLORS.textMuted);
  doc.text('Disclaimer: This is educational content only. Stock market investments are subject to market risks.', MARGINS.left, y);
  doc.text('Always do your own research before investing. Past performance is not indicative of future results.', MARGINS.left, y + 6);

  doc.save('Stock-Market-Seekho-Rotech-Shiksha-2025.pdf');
}
