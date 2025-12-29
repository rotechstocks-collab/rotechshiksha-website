import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

const OUTPUT_PATH = path.join(process.cwd(), 'client/public/pdf/stock-market-beginner-checklist.pdf');
const PRIYA_AVATAR = path.join(process.cwd(), 'client/public/characters/priya_main.png');
const ROHIT_AVATAR = path.join(process.cwd(), 'client/public/characters/rohit_main.png');

const COLORS = {
  primary: '#0B3B8C',
  accent: '#10B981',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  border: '#E2E8F0',
  warning: '#DC2626',
  warningBg: '#FEF2F2',
};

const MARGINS = { top: 72, bottom: 80, left: 64, right: 64 };

function addWatermark(doc: typeof PDFDocument.prototype, pageWidth: number, pageHeight: number) {
  doc.save();
  doc.fillColor(COLORS.primary).opacity(0.04);
  doc.fontSize(60).font('Helvetica-Bold');
  doc.rotate(-45, { origin: [pageWidth / 2, pageHeight / 2] });
  doc.text('ROTECH SHIKSHA', pageWidth / 2 - 200, pageHeight / 2, { align: 'center' });
  doc.restore();
  doc.opacity(1);
}

function addHeader(doc: typeof PDFDocument.prototype, pageWidth: number) {
  doc.fillColor(COLORS.textMuted).fontSize(10).font('Helvetica');
  doc.text('Rotech Shiksha', MARGINS.left, 30);
  doc.moveTo(MARGINS.left, 50).lineTo(pageWidth - MARGINS.right, 50).strokeColor(COLORS.border).lineWidth(0.5).stroke();
}

function addFooter(doc: typeof PDFDocument.prototype, pageWidth: number, pageHeight: number, pageNum: number) {
  const footerY = pageHeight - 45;
  doc.moveTo(MARGINS.left, footerY - 15).lineTo(pageWidth - MARGINS.right, footerY - 15).strokeColor(COLORS.border).lineWidth(0.5).stroke();
  doc.fillColor(COLORS.textMuted).fontSize(9).font('Helvetica');
  doc.text('rotechshiksha.com', MARGINS.left, footerY);
  doc.text('Priya & Rohit Beginner Series', pageWidth / 2 - 60, footerY);
  doc.text(`${pageNum}`, pageWidth - MARGINS.right - 20, footerY, { align: 'right' });
}

function drawCard(doc: typeof PDFDocument.prototype, x: number, y: number, width: number, height: number, options: { fill?: string; stroke?: string } = {}) {
  const fill = options.fill || COLORS.card;
  const stroke = options.stroke || COLORS.border;
  doc.roundedRect(x, y, width, height, 14).fillAndStroke(fill, stroke);
}

function drawChatBubble(doc: typeof PDFDocument.prototype, x: number, y: number, width: number, text: string, isLeft: boolean, color: string) {
  const bubbleHeight = 50 + Math.ceil(text.length / 45) * 16;
  doc.roundedRect(x, y, width, bubbleHeight, 12).fillAndStroke(color, color);
  doc.fillColor('#FFFFFF').fontSize(11).font('Helvetica');
  doc.text(text, x + 12, y + 12, { width: width - 24 });
  return bubbleHeight;
}

async function generateQRCode(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    QRCode.toBuffer('https://rotechshiksha.com/courses', {
      width: 120,
      margin: 0,
      color: { dark: COLORS.primary, light: '#FFFFFF' }
    }, (err, buffer) => {
      if (err) reject(err);
      else resolve(buffer);
    });
  });
}

async function generatePDF() {
  const doc = new PDFDocument({ 
    size: 'A4', 
    margin: MARGINS.left,
    bufferPages: true,
    info: {
      Title: 'Stock Market Beginner Guide 2025',
      Author: 'Rotech Shiksha',
      Subject: 'A comprehensive beginner guide to stock market investing',
    }
  });

  const writeStream = fs.createWriteStream(OUTPUT_PATH);
  doc.pipe(writeStream);

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const contentWidth = pageWidth - MARGINS.left - MARGINS.right;

  // ========== PAGE 1: COVER ==========
  const gradient1 = doc.linearGradient(0, 0, pageWidth, pageHeight);
  gradient1.stop(0, COLORS.primary).stop(1, '#1E40AF');
  doc.rect(0, 0, pageWidth, pageHeight).fill(gradient1);

  doc.fillColor('#FFFFFF').opacity(0.1).fontSize(80).font('Helvetica-Bold');
  doc.text('RS', pageWidth - 150, pageHeight - 180);
  doc.opacity(1);

  doc.fillColor('#FFFFFF').fontSize(14).font('Helvetica');
  doc.text('ROTECH SHIKSHA PRESENTS', MARGINS.left, 100);

  doc.fontSize(42).font('Helvetica-Bold');
  doc.text('Stock Market', MARGINS.left, 160);
  doc.text('Beginner Guide', MARGINS.left, 210);

  doc.roundedRect(MARGINS.left, 275, 100, 28, 14).fill(COLORS.accent);
  doc.fillColor('#FFFFFF').fontSize(11).font('Helvetica-Bold');
  doc.text('2025 Edition', MARGINS.left + 18, 282);

  doc.fillColor('#FFFFFF').opacity(0.9).fontSize(16).font('Helvetica');
  doc.text('Hinglish mein seekho stock market ki basics.', MARGINS.left, 330);
  doc.text('Priya aur Rohit ke saath step-by-step.', MARGINS.left, 352);
  doc.opacity(1);

  if (fs.existsSync(PRIYA_AVATAR)) {
    try { doc.image(PRIYA_AVATAR, MARGINS.left + 20, pageHeight - 250, { width: 100 }); } catch (e) {}
  }
  if (fs.existsSync(ROHIT_AVATAR)) {
    try { doc.image(ROHIT_AVATAR, MARGINS.left + 140, pageHeight - 250, { width: 100 }); } catch (e) {}
  }

  doc.fillColor('#FFFFFF').opacity(0.7).fontSize(10).font('Helvetica');
  doc.text('rotechshiksha.com', MARGINS.left, pageHeight - 50);
  doc.opacity(1);

  // ========== PAGE 2: INTRODUCTION ==========
  doc.addPage();
  addWatermark(doc, pageWidth, pageHeight);
  addHeader(doc, pageWidth);
  addFooter(doc, pageWidth, pageHeight, 2);

  doc.fillColor(COLORS.primary).fontSize(26).font('Helvetica-Bold');
  doc.text('Introduction', MARGINS.left, MARGINS.top + 20);
  
  doc.fillColor(COLORS.textSecondary).fontSize(12).font('Helvetica');
  doc.text('Rohit aur Priya ki kahani se seekhein', MARGINS.left, MARGINS.top + 55);

  let y = MARGINS.top + 100;

  if (fs.existsSync(ROHIT_AVATAR)) {
    try { doc.image(ROHIT_AVATAR, MARGINS.left, y, { width: 50 }); } catch (e) {}
  }
  drawCard(doc, MARGINS.left + 60, y, contentWidth - 60, 70, { fill: '#EFF6FF', stroke: '#BFDBFE' });
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica-Bold');
  doc.text('Rohit:', MARGINS.left + 75, y + 12);
  doc.font('Helvetica').fontSize(11);
  doc.text('"Yaar Priya, mujhe stock market mein invest karna hai, par samajh nahi aa raha kahan se start karun. Sab log kehte hain bahut risky hai..."', MARGINS.left + 75, y + 30, { width: contentWidth - 90 });

  y += 100;

  if (fs.existsSync(PRIYA_AVATAR)) {
    try { doc.image(PRIYA_AVATAR, pageWidth - MARGINS.right - 50, y, { width: 50 }); } catch (e) {}
  }
  drawCard(doc, MARGINS.left, y, contentWidth - 60, 90, { fill: '#ECFDF5', stroke: '#A7F3D0' });
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica-Bold');
  doc.text('Priya:', MARGINS.left + 15, y + 12);
  doc.font('Helvetica').fontSize(11);
  doc.text('"Rohit, tension mat le! Haan, market risky hai agar bina samjhe ghuso. But agar basics clear hon, toh ye ek powerful wealth-building tool hai. Chal, main tujhe step-by-step sikhaati hun!"', MARGINS.left + 15, y + 30, { width: contentWidth - 90 });

  y += 120;
  
  drawCard(doc, MARGINS.left, y, contentWidth, 140);
  doc.fillColor(COLORS.primary).fontSize(14).font('Helvetica-Bold');
  doc.text('Is book mein tujhe milega:', MARGINS.left + 20, y + 20);
  
  const points = [
    'Stock market ki basic samajh (simple Hinglish mein)',
    'Demat account kaise kholein',
    'Beginner mistakes jo avoid karni chahiye',
    'Simple portfolio formula',
    'Daily routine aur weekly habits',
  ];
  
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
  points.forEach((point, i) => {
    doc.fillColor(COLORS.accent).text('✓', MARGINS.left + 25, y + 45 + i * 18);
    doc.fillColor(COLORS.text).text(point, MARGINS.left + 45, y + 45 + i * 18);
  });

  // ========== PAGE 3: ROADMAP ==========
  doc.addPage();
  addWatermark(doc, pageWidth, pageHeight);
  addHeader(doc, pageWidth);
  addFooter(doc, pageWidth, pageHeight, 3);

  doc.fillColor(COLORS.primary).fontSize(26).font('Helvetica-Bold');
  doc.text('Beginner Roadmap', MARGINS.left, MARGINS.top + 20);
  
  doc.fillColor(COLORS.textSecondary).fontSize(12).font('Helvetica');
  doc.text('Step-by-step guide to start your journey', MARGINS.left, MARGINS.top + 55);

  const steps = [
    { num: '01', title: 'Demat Account Kholein', desc: 'Zerodha, Groww, ya Angel One pe free account banao' },
    { num: '02', title: 'Basic Terms Seekho', desc: 'IPO, SIP, Dividend, P/E Ratio, Market Cap samjho' },
    { num: '03', title: 'Market Hours Jano', desc: 'NSE/BSE: 9:15 AM - 3:30 PM (Mon-Fri)' },
    { num: '04', title: 'Paper Trading Karo', desc: 'Pehle virtual money se practice karo' },
    { num: '05', title: 'Index Funds Se Shuru Karo', desc: 'Nifty 50 ya Sensex index fund mein SIP lagao' },
    { num: '06', title: 'News Padho Daily', desc: 'Economic Times, Moneycontrol follow karo' },
  ];

  y = MARGINS.top + 90;
  const cardHeight = 75;
  const cardGap = 12;

  steps.forEach((step, i) => {
    drawCard(doc, MARGINS.left, y, contentWidth, cardHeight);
    
    doc.roundedRect(MARGINS.left + 15, y + 18, 40, 40, 8).fill(COLORS.primary);
    doc.fillColor('#FFFFFF').fontSize(16).font('Helvetica-Bold');
    doc.text(step.num, MARGINS.left + 23, y + 30);
    
    doc.fillColor(COLORS.text).fontSize(14).font('Helvetica-Bold');
    doc.text(step.title, MARGINS.left + 70, y + 18);
    
    doc.fillColor(COLORS.textSecondary).fontSize(11).font('Helvetica');
    doc.text(step.desc, MARGINS.left + 70, y + 40, { width: contentWidth - 100 });
    
    y += cardHeight + cardGap;
  });

  // ========== PAGE 4: COMIC PAGE 1 ==========
  doc.addPage();
  addWatermark(doc, pageWidth, pageHeight);
  addHeader(doc, pageWidth);
  addFooter(doc, pageWidth, pageHeight, 4);

  doc.fillColor(COLORS.primary).fontSize(26).font('Helvetica-Bold');
  doc.text('Basics Samjho', MARGINS.left, MARGINS.top + 20);
  
  doc.fillColor(COLORS.textSecondary).fontSize(12).font('Helvetica');
  doc.text('Priya explains the fundamentals', MARGINS.left, MARGINS.top + 55);

  y = MARGINS.top + 100;

  if (fs.existsSync(ROHIT_AVATAR)) {
    try { doc.image(ROHIT_AVATAR, MARGINS.left, y, { width: 45 }); } catch (e) {}
  }
  drawCard(doc, MARGINS.left + 55, y, contentWidth - 55, 55, { fill: '#EFF6FF', stroke: '#BFDBFE' });
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
  doc.text('"Stock kya hota hai exactly? Shares aur stocks same hai?"', MARGINS.left + 70, y + 18, { width: contentWidth - 100 });
  y += 75;

  if (fs.existsSync(PRIYA_AVATAR)) {
    try { doc.image(PRIYA_AVATAR, pageWidth - MARGINS.right - 45, y, { width: 45 }); } catch (e) {}
  }
  drawCard(doc, MARGINS.left, y, contentWidth - 55, 80, { fill: '#ECFDF5', stroke: '#A7F3D0' });
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
  doc.text('"Haan! Stock = Share = Company ka ek chota hissa. Jab tu stock kharidte hai, tu us company ka part-owner ban jaata hai. Simple!"', MARGINS.left + 15, y + 15, { width: contentWidth - 90 });
  y += 100;

  if (fs.existsSync(ROHIT_AVATAR)) {
    try { doc.image(ROHIT_AVATAR, MARGINS.left, y, { width: 45 }); } catch (e) {}
  }
  drawCard(doc, MARGINS.left + 55, y, contentWidth - 55, 55, { fill: '#EFF6FF', stroke: '#BFDBFE' });
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
  doc.text('"Aur Demat account kya hai? Ye kyun chahiye?"', MARGINS.left + 70, y + 18, { width: contentWidth - 100 });
  y += 75;

  if (fs.existsSync(PRIYA_AVATAR)) {
    try { doc.image(PRIYA_AVATAR, pageWidth - MARGINS.right - 45, y, { width: 45 }); } catch (e) {}
  }
  drawCard(doc, MARGINS.left, y, contentWidth - 55, 100, { fill: '#ECFDF5', stroke: '#A7F3D0' });
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
  doc.text('"Demat = Dematerialized Account. Pehle stocks paper form mein hote the. Ab digital hai! Tera Demat account ek digital locker hai jahan tere saare stocks store hote hain. Trading account se tu buy/sell karta hai."', MARGINS.left + 15, y + 15, { width: contentWidth - 90 });

  // ========== PAGE 5: MISTAKES TO AVOID ==========
  doc.addPage();
  addWatermark(doc, pageWidth, pageHeight);
  addHeader(doc, pageWidth);
  addFooter(doc, pageWidth, pageHeight, 5);

  doc.fillColor(COLORS.warning).fontSize(26).font('Helvetica-Bold');
  doc.text('Mistakes to Avoid', MARGINS.left, MARGINS.top + 20);
  
  doc.fillColor(COLORS.textSecondary).fontSize(12).font('Helvetica');
  doc.text('Beginners ye galtiyan zaroor karte hain - tum mat karna!', MARGINS.left, MARGINS.top + 55);

  const mistakes = [
    { title: 'Tips pe bharosa karna', desc: 'WhatsApp/Telegram tips follow mat karo. Research karo!' },
    { title: 'Bina samjhe invest karna', desc: 'Pehle company samjho, phir invest karo' },
    { title: 'Panic selling', desc: 'Market girne pe panic mat karo. Patience rakho' },
    { title: 'Overdiversification', desc: '50+ stocks mat rakho. Quality over quantity' },
    { title: 'Borrowed money se invest', desc: 'Kabhi loan leke invest mat karo' },
    { title: 'No stop-loss', desc: 'Har trade mein stop-loss lagao. Max 2% risk per trade' },
  ];

  y = MARGINS.top + 90;
  
  mistakes.forEach((m, i) => {
    drawCard(doc, MARGINS.left, y, contentWidth, 65, { fill: COLORS.warningBg, stroke: '#FECACA' });
    
    doc.roundedRect(MARGINS.left + 15, y + 15, 35, 35, 6).fill(COLORS.warning);
    doc.fillColor('#FFFFFF').fontSize(18).font('Helvetica-Bold');
    doc.text('!', MARGINS.left + 28, y + 23);
    
    doc.fillColor(COLORS.warning).fontSize(13).font('Helvetica-Bold');
    doc.text(m.title, MARGINS.left + 65, y + 15);
    
    doc.fillColor(COLORS.text).fontSize(10).font('Helvetica');
    doc.text(m.desc, MARGINS.left + 65, y + 35, { width: contentWidth - 90 });
    
    y += 75;
  });

  // ========== PAGE 6: PORTFOLIO FORMULA ==========
  doc.addPage();
  addWatermark(doc, pageWidth, pageHeight);
  addHeader(doc, pageWidth);
  addFooter(doc, pageWidth, pageHeight, 6);

  doc.fillColor(COLORS.primary).fontSize(26).font('Helvetica-Bold');
  doc.text('Simple Portfolio Formula', MARGINS.left, MARGINS.top + 20);
  
  doc.fillColor(COLORS.textSecondary).fontSize(12).font('Helvetica');
  doc.text('Beginner-friendly asset allocation', MARGINS.left, MARGINS.top + 55);

  y = MARGINS.top + 100;

  drawCard(doc, MARGINS.left, y, contentWidth, 200);

  const centerX = MARGINS.left + contentWidth / 4;
  const centerY = y + 100;
  const radius = 70;

  doc.circle(centerX, centerY, radius).fill(COLORS.primary);
  doc.circle(centerX + 25, centerY - 20, radius * 0.6).fill(COLORS.accent);
  doc.circle(centerX + 40, centerY + 30, radius * 0.35).fill('#F59E0B');

  const legendX = MARGINS.left + contentWidth / 2 + 20;
  
  doc.roundedRect(legendX, y + 40, 18, 18, 4).fill(COLORS.primary);
  doc.fillColor(COLORS.text).fontSize(13).font('Helvetica-Bold');
  doc.text('60% Index Funds', legendX + 28, y + 42);
  doc.fillColor(COLORS.textSecondary).fontSize(10).font('Helvetica');
  doc.text('Nifty 50 / Sensex ETF', legendX + 28, y + 60);

  doc.roundedRect(legendX, y + 90, 18, 18, 4).fill(COLORS.accent);
  doc.fillColor(COLORS.text).fontSize(13).font('Helvetica-Bold');
  doc.text('30% Large Cap', legendX + 28, y + 92);
  doc.fillColor(COLORS.textSecondary).fontSize(10).font('Helvetica');
  doc.text('Bluechip stocks (TCS, Reliance)', legendX + 28, y + 110);

  doc.roundedRect(legendX, y + 140, 18, 18, 4).fill('#F59E0B');
  doc.fillColor(COLORS.text).fontSize(13).font('Helvetica-Bold');
  doc.text('10% Learning Money', legendX + 28, y + 142);
  doc.fillColor(COLORS.textSecondary).fontSize(10).font('Helvetica');
  doc.text('Experiment with small stocks', legendX + 28, y + 160);

  y += 230;

  drawCard(doc, MARGINS.left, y, contentWidth, 80, { fill: '#F0FDF4', stroke: '#86EFAC' });
  doc.fillColor(COLORS.accent).fontSize(14).font('Helvetica-Bold');
  doc.text('Pro Tip from Priya:', MARGINS.left + 20, y + 15);
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
  doc.text('"Beginners ke liye 60-30-10 formula best hai. Index funds mein zyada daalo kyunki woh automatically diversified hote hain. Slowly experience aane pe adjust karna!"', MARGINS.left + 20, y + 38, { width: contentWidth - 40 });

  // ========== PAGE 7: COMIC PAGE 2 ==========
  doc.addPage();
  addWatermark(doc, pageWidth, pageHeight);
  addHeader(doc, pageWidth);
  addFooter(doc, pageWidth, pageHeight, 7);

  doc.fillColor(COLORS.primary).fontSize(26).font('Helvetica-Bold');
  doc.text('Risk Management', MARGINS.left, MARGINS.top + 20);
  
  doc.fillColor(COLORS.textSecondary).fontSize(12).font('Helvetica');
  doc.text('Patience aur discipline ki importance', MARGINS.left, MARGINS.top + 55);

  y = MARGINS.top + 100;

  if (fs.existsSync(ROHIT_AVATAR)) {
    try { doc.image(ROHIT_AVATAR, MARGINS.left, y, { width: 45 }); } catch (e) {}
  }
  drawCard(doc, MARGINS.left + 55, y, contentWidth - 55, 55, { fill: '#EFF6FF', stroke: '#BFDBFE' });
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
  doc.text('"Priya, market crash ho gaya toh? Saare paise doob jayenge na?"', MARGINS.left + 70, y + 18, { width: contentWidth - 100 });
  y += 75;

  if (fs.existsSync(PRIYA_AVATAR)) {
    try { doc.image(PRIYA_AVATAR, pageWidth - MARGINS.right - 45, y, { width: 45 }); } catch (e) {}
  }
  drawCard(doc, MARGINS.left, y, contentWidth - 55, 100, { fill: '#ECFDF5', stroke: '#A7F3D0' });
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
  doc.text('"Market crash = Sale! Achhe stocks saste mein milte hain. Rule yaad rakh: Invest only what you can afford to lose. Emergency fund alag rakh. Aur SIP karte raho - averaging hoti hai!"', MARGINS.left + 15, y + 15, { width: contentWidth - 90 });
  y += 120;

  if (fs.existsSync(ROHIT_AVATAR)) {
    try { doc.image(ROHIT_AVATAR, MARGINS.left, y, { width: 45 }); } catch (e) {}
  }
  drawCard(doc, MARGINS.left + 55, y, contentWidth - 55, 55, { fill: '#EFF6FF', stroke: '#BFDBFE' });
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
  doc.text('"Toh kitna time lagega paisa double hone mein?"', MARGINS.left + 70, y + 18, { width: contentWidth - 100 });
  y += 75;

  if (fs.existsSync(PRIYA_AVATAR)) {
    try { doc.image(PRIYA_AVATAR, pageWidth - MARGINS.right - 45, y, { width: 45 }); } catch (e) {}
  }
  drawCard(doc, MARGINS.left, y, contentWidth - 55, 100, { fill: '#ECFDF5', stroke: '#A7F3D0' });
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
  doc.text('"Rule of 72 use kar: 72 ÷ Return% = Years to double. Agar 12% return expect kar raha hai, toh 72÷12 = 6 saal. Patience rakh!"', MARGINS.left + 15, y + 15, { width: contentWidth - 90 });

  // ========== PAGE 8: DAILY ROUTINE ==========
  doc.addPage();
  addWatermark(doc, pageWidth, pageHeight);
  addHeader(doc, pageWidth);
  addFooter(doc, pageWidth, pageHeight, 8);

  doc.fillColor(COLORS.primary).fontSize(26).font('Helvetica-Bold');
  doc.text('Daily Routine & Habits', MARGINS.left, MARGINS.top + 20);
  
  doc.fillColor(COLORS.textSecondary).fontSize(12).font('Helvetica');
  doc.text('Successful investor banne ke liye daily habits', MARGINS.left, MARGINS.top + 55);

  y = MARGINS.top + 90;

  doc.fillColor(COLORS.text).fontSize(14).font('Helvetica-Bold');
  doc.text('Morning Routine (9:00 - 9:15 AM)', MARGINS.left, y);
  y += 25;

  const morningTasks = [
    'Market news check karo (ET, Moneycontrol)',
    'Pre-market gainers/losers dekho',
    'Global markets ka trend check karo',
  ];

  morningTasks.forEach(task => {
    doc.roundedRect(MARGINS.left, y, 18, 18, 4).stroke(COLORS.border);
    doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
    doc.text(task, MARGINS.left + 28, y + 2);
    y += 28;
  });

  y += 20;
  doc.fillColor(COLORS.text).fontSize(14).font('Helvetica-Bold');
  doc.text('Evening Review (6:00 - 6:30 PM)', MARGINS.left, y);
  y += 25;

  const eveningTasks = [
    'Portfolio performance review karo',
    'Trading journal update karo',
    'Tomorrow ke liye watchlist banao',
  ];

  eveningTasks.forEach(task => {
    doc.roundedRect(MARGINS.left, y, 18, 18, 4).stroke(COLORS.border);
    doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
    doc.text(task, MARGINS.left + 28, y + 2);
    y += 28;
  });

  y += 30;

  drawCard(doc, MARGINS.left, y, contentWidth, 160);
  doc.fillColor(COLORS.primary).fontSize(14).font('Helvetica-Bold');
  doc.text('Weekly Habit Tracker', MARGINS.left + 20, y + 15);

  const habits = ['News Reading', 'Journal Update', 'Learning (1hr)', 'Portfolio Review'];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const tableX = MARGINS.left + 20;
  const tableY = y + 45;
  const cellW = 40;
  const cellH = 22;
  const labelW = 100;

  doc.fillColor(COLORS.textSecondary).fontSize(9).font('Helvetica-Bold');
  days.forEach((day, i) => {
    doc.text(day, tableX + labelW + i * cellW + 10, tableY);
  });

  doc.fillColor(COLORS.text).fontSize(10).font('Helvetica');
  habits.forEach((habit, row) => {
    doc.text(habit, tableX, tableY + 22 + row * cellH);
    days.forEach((_, col) => {
      doc.roundedRect(tableX + labelW + col * cellW + 8, tableY + 18 + row * cellH, 16, 16, 4).stroke(COLORS.border);
    });
  });

  // ========== PAGE 9: GLOSSARY ==========
  doc.addPage();
  addWatermark(doc, pageWidth, pageHeight);
  addHeader(doc, pageWidth);
  addFooter(doc, pageWidth, pageHeight, 9);

  doc.fillColor(COLORS.primary).fontSize(26).font('Helvetica-Bold');
  doc.text('Bonus Glossary', MARGINS.left, MARGINS.top + 20);
  
  doc.fillColor(COLORS.textSecondary).fontSize(12).font('Helvetica');
  doc.text('5 important terms har beginner ko pata hone chahiye', MARGINS.left, MARGINS.top + 55);

  const glossary = [
    { term: 'IPO', full: 'Initial Public Offering', desc: 'Jab company pehli baar public mein shares bechti hai. Tu directly company se share kharid sakta hai.' },
    { term: 'SIP', full: 'Systematic Investment Plan', desc: 'Har mahine fixed amount invest karna. Auto-pilot pe wealth build hoti hai.' },
    { term: 'Dividend', full: 'Company ka profit share', desc: 'Company apne profit ka kuch hissa shareholders ko deti hai. Passive income!' },
    { term: 'Market Cap', full: 'Market Capitalization', desc: 'Company ki total value = Share price × Total shares. Large cap > 20,000 Cr.' },
    { term: 'Stop-Loss', full: 'Loss limit order', desc: 'Automatic sell order jo trigger hota hai jab price neeche jaata hai. Protection mechanism.' },
  ];

  y = MARGINS.top + 90;

  glossary.forEach((g, i) => {
    drawCard(doc, MARGINS.left, y, contentWidth, 85);
    
    doc.roundedRect(MARGINS.left + 15, y + 15, 55, 28, 6).fill(COLORS.primary);
    doc.fillColor('#FFFFFF').fontSize(12).font('Helvetica-Bold');
    doc.text(g.term, MARGINS.left + 22, y + 22);
    
    doc.fillColor(COLORS.textSecondary).fontSize(10).font('Helvetica');
    doc.text(g.full, MARGINS.left + 80, y + 18);
    
    doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
    doc.text(g.desc, MARGINS.left + 15, y + 50, { width: contentWidth - 30 });
    
    y += 95;
  });

  // ========== PAGE 10: CTA ==========
  doc.addPage();
  addWatermark(doc, pageWidth, pageHeight);
  addHeader(doc, pageWidth);
  addFooter(doc, pageWidth, pageHeight, 10);

  doc.fillColor(COLORS.primary).fontSize(26).font('Helvetica-Bold');
  doc.text('Start Your Journey Today!', MARGINS.left, MARGINS.top + 20);

  y = MARGINS.top + 80;

  drawCard(doc, MARGINS.left, y, contentWidth, 180, { fill: '#EFF6FF', stroke: COLORS.primary });
  
  doc.fillColor(COLORS.primary).fontSize(18).font('Helvetica-Bold');
  doc.text('Free Course Access', MARGINS.left + 25, y + 25);
  
  doc.fillColor(COLORS.text).fontSize(12).font('Helvetica');
  doc.text('Scan karo aur free course start karo!', MARGINS.left + 25, y + 55);
  doc.text('8-level learning path with Priya & Rohit', MARGINS.left + 25, y + 75);
  doc.text('Hinglish mein simple explanations', MARGINS.left + 25, y + 95);
  doc.text('Calculators, paper trading, live market data', MARGINS.left + 25, y + 115);

  try {
    const qrBuffer = await generateQRCode();
    doc.image(qrBuffer, pageWidth - MARGINS.right - 140, y + 30, { width: 110 });
  } catch (e) {}

  y += 210;

  drawCard(doc, MARGINS.left, y, contentWidth, 100, { fill: '#F0FDF4', stroke: COLORS.accent });
  
  doc.fillColor(COLORS.accent).fontSize(16).font('Helvetica-Bold');
  doc.text('Join Our WhatsApp Community', MARGINS.left + 25, y + 20);
  
  doc.fillColor(COLORS.text).fontSize(11).font('Helvetica');
  doc.text('Daily market updates aur trading tips ke liye join karo!', MARGINS.left + 25, y + 45);
  doc.text('Link: rotechshiksha.com/whatsapp', MARGINS.left + 25, y + 65);

  y += 130;

  if (fs.existsSync(PRIYA_AVATAR)) {
    try { doc.image(PRIYA_AVATAR, MARGINS.left + 40, y, { width: 80 }); } catch (e) {}
  }
  if (fs.existsSync(ROHIT_AVATAR)) {
    try { doc.image(ROHIT_AVATAR, MARGINS.left + 140, y, { width: 80 }); } catch (e) {}
  }

  doc.fillColor(COLORS.text).fontSize(14).font('Helvetica-Bold');
  doc.text('See you inside the course!', MARGINS.left + 250, y + 30);
  doc.fillColor(COLORS.textSecondary).fontSize(11).font('Helvetica');
  doc.text('— Priya & Rohit', MARGINS.left + 250, y + 50);

  y += 100;
  
  doc.fillColor(COLORS.textMuted).fontSize(10).font('Helvetica');
  doc.text('Disclaimer: This is educational content only. Always do your own research before investing.', MARGINS.left, y, { width: contentWidth, align: 'center' });
  doc.text('Stock market investments are subject to market risks.', MARGINS.left, y + 15, { width: contentWidth, align: 'center' });

  doc.end();

  return new Promise<void>((resolve, reject) => {
    writeStream.on('finish', () => {
      console.log('Premium PDF Book generated successfully!');
      console.log('Output:', OUTPUT_PATH);
      console.log('Pages: 10');
      resolve();
    });
    writeStream.on('error', reject);
  });
}

generatePDF().catch(console.error);
