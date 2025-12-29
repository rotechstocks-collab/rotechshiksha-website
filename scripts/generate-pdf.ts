import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

const OUTPUT_PATH = path.join(process.cwd(), 'client/public/pdf/stock-market-beginner-checklist.pdf');
const PRIYA_AVATAR = path.join(process.cwd(), 'client/public/characters/priya_main.png');
const ROHIT_AVATAR = path.join(process.cwd(), 'client/public/characters/rohit_main.png');

const PRIMARY_COLOR = '#0047AB';
const SECONDARY_COLOR = '#1a1a2e';
const ACCENT_COLOR = '#00A86B';
const LIGHT_BG = '#F8FAFC';
const CARD_BG = '#FFFFFF';
const TEXT_PRIMARY = '#1E293B';
const TEXT_SECONDARY = '#64748B';

const checklist = [
  { title: 'Open a Demat Account', desc: 'Choose Zerodha, Groww, or Angel One' },
  { title: 'Learn Basic Terms', desc: 'IPO, FPO, Dividend, P/E Ratio, Market Cap' },
  { title: 'Understand Market Hours', desc: '9:15 AM to 3:30 PM (NSE/BSE)' },
  { title: 'Start with Paper Trading', desc: 'Practice without real money first' },
  { title: 'Learn Chart Patterns', desc: 'Support, Resistance, Candlestick basics' },
  { title: 'Set Your Risk Tolerance', desc: 'Never risk more than 2% per trade' },
  { title: 'Follow Market News', desc: 'Economic Times, Moneycontrol, Live Mint' },
  { title: 'Create a Trading Journal', desc: 'Track every trade and learn from mistakes' },
];

async function generateQRCode(): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    QRCode.toBuffer('https://rotechshiksha.com/courses', {
      width: 100,
      margin: 0,
      color: { dark: PRIMARY_COLOR, light: '#FFFFFF' }
    }, (err, buffer) => {
      if (err) reject(err);
      else resolve(buffer);
    });
  });
}

async function generatePDF() {
  const doc = new PDFDocument({ 
    size: 'A4', 
    margin: 40,
    info: {
      Title: 'Stock Market Beginner Checklist',
      Author: 'Rotech Shiksha',
      Subject: 'A comprehensive checklist for stock market beginners',
    }
  });

  const writeStream = fs.createWriteStream(OUTPUT_PATH);
  doc.pipe(writeStream);

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const margin = 40;
  const contentWidth = pageWidth - 2 * margin;

  doc.rect(0, 0, pageWidth, 130).fill(PRIMARY_COLOR);
  
  doc.fillColor('#FFFFFF');
  doc.fontSize(28).font('Helvetica-Bold');
  doc.text('Stock Market Beginner Checklist', margin, 35, { 
    width: contentWidth, 
    align: 'center' 
  });
  
  doc.fontSize(14).font('Helvetica');
  doc.text('by Rotech Shiksha', margin, 70, { 
    width: contentWidth, 
    align: 'center' 
  });

  doc.fontSize(10);
  doc.text('Your journey to financial freedom starts here!', margin, 95, { 
    width: contentWidth, 
    align: 'center' 
  });

  if (fs.existsSync(PRIYA_AVATAR)) {
    try {
      doc.image(PRIYA_AVATAR, margin + 10, 20, { width: 50, height: 50 });
    } catch (e) {}
  }
  
  if (fs.existsSync(ROHIT_AVATAR)) {
    try {
      doc.image(ROHIT_AVATAR, pageWidth - margin - 60, 20, { width: 50, height: 50 });
    } catch (e) {}
  }

  let yPos = 155;
  const cardHeight = 55;
  const cardMargin = 10;

  doc.fillColor(TEXT_SECONDARY).fontSize(12).font('Helvetica-Bold');
  doc.text('Complete these steps to start your investing journey:', margin, yPos, {
    width: contentWidth,
    align: 'center'
  });
  yPos += 30;

  for (let i = 0; i < checklist.length; i++) {
    const item = checklist[i];
    
    doc.roundedRect(margin, yPos, contentWidth, cardHeight, 8)
       .fillAndStroke(CARD_BG, '#E2E8F0');
    
    doc.roundedRect(margin + 12, yPos + 12, 30, 30, 6)
       .fill(ACCENT_COLOR);
    
    doc.fillColor('#FFFFFF').fontSize(14).font('Helvetica-Bold');
    doc.text(String(i + 1), margin + 12, yPos + 19, { width: 30, align: 'center' });
    
    doc.fillColor(TEXT_PRIMARY).fontSize(13).font('Helvetica-Bold');
    doc.text(item.title, margin + 55, yPos + 12, { width: contentWidth - 70 });
    
    doc.fillColor(TEXT_SECONDARY).fontSize(10).font('Helvetica');
    doc.text(item.desc, margin + 55, yPos + 30, { width: contentWidth - 70 });
    
    yPos += cardHeight + cardMargin;
  }

  const footerY = pageHeight - 100;
  
  doc.rect(0, footerY - 10, pageWidth, 110).fill(LIGHT_BG);
  
  doc.roundedRect(margin + 10, footerY + 5, 140, 70, 8)
     .fill(PRIMARY_COLOR);
  
  doc.fillColor('#FFFFFF').fontSize(12).font('Helvetica-Bold');
  doc.text('Start Free Course', margin + 15, footerY + 20, { width: 130, align: 'center' });
  
  doc.fontSize(9).font('Helvetica');
  doc.text('Scan QR to begin', margin + 15, footerY + 55, { width: 130, align: 'center' });

  try {
    const qrBuffer = await generateQRCode();
    doc.image(qrBuffer, margin + 160, footerY + 5, { width: 70, height: 70 });
  } catch (e) {
    console.log('QR code generation skipped');
  }

  doc.fillColor(TEXT_PRIMARY).fontSize(11).font('Helvetica-Bold');
  doc.text('Visit: rotechshiksha.com', pageWidth - margin - 180, footerY + 15);
  
  doc.fillColor(TEXT_SECONDARY).fontSize(9).font('Helvetica');
  doc.text('Free stock market education in Hindi', pageWidth - margin - 180, footerY + 32);
  doc.text('Learn at your own pace', pageWidth - margin - 180, footerY + 46);
  doc.text('Priya & Rohit - Your learning guides', pageWidth - margin - 180, footerY + 60);

  doc.end();

  return new Promise<void>((resolve, reject) => {
    writeStream.on('finish', () => {
      console.log('PDF generated successfully at:', OUTPUT_PATH);
      resolve();
    });
    writeStream.on('error', reject);
  });
}

generatePDF().catch(console.error);
