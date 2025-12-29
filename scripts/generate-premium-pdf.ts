// Premium PDF Generator using Playwright
// Run with: npx tsx scripts/generate-premium-pdf.ts

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

// Book content
const bookContent = {
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
      comic: { speaker: 'rohit', text: "Yaar Priya, stock market toh bahut risky lagta hai. Kya sach mein invest karna chahiye?" },
      checklist: ["Stock market basics samajh liya", "BSE vs NSE ka difference clear", "Index ka matlab pata chala"],
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
      comic: { speaker: 'priya', text: "Rohit, Demat account kholna sirf 10 minute ka kaam hai! Aaj kal toh mobile se bhi ho jaata hai. Main khud Zerodha use karti hoon." },
      checklist: ["PAN card ready hai", "Aadhaar link with mobile", "Bank account details available"]
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
      comic: { speaker: 'rohit', text: "Priya, IPO mein apply karna chahiye ya seedha shares khareed loon? Confused hoon!" },
      checklist: ["IPO calendar check karna seekha", "Company fundamentals dekhna important", "Grey market premium samjha"],
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
      comic: { speaker: 'priya', text: "Dekh Rohit, mere papa kehte hain - 'Time in market is more important than timing the market.' SIP kar aur tension mat le!" },
      checklist: ["Emergency fund ready (6 months expenses)", "Long term mindset set", "SIP date fixed monthly"]
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
      comic: { speaker: 'rohit', text: "Matlab agar main Rs 5000 monthly SIP karunga toh market ke ups-downs se itna affect nahi hoga?" },
      checklist: ["Monthly SIP amount decide kiya", "Bank auto-debit set up", "10+ years ka commitment"],
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
      comic: { speaker: 'priya', text: "Rohit, hum dono 25 ke hain toh hum 70-20-10 bhi kar sakte hain. Young age mein thoda zyada risk affordable hai!" },
      checklist: ["Risk tolerance assess kiya", "Portfolio diversified hai", "Emergency fund alag rakha"],
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
      comic: { speaker: 'rohit', text: "Mujhe toh jaldi paisa chahiye! Trading se jaldi rich ho jaaunga na?" },
      checklist: ["Long term goals clear", "Trading myths busted", "Patience mindset adopted"],
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
      comic: { speaker: 'priya', text: "Charts samajhna zaroori hai Rohit, lekin pehle fundamentals strong karo. Technical analysis baad mein seekhna." },
      checklist: ["Basic candlestick patterns samjhe", "Support-Resistance concept clear", "Free charting tools explore kiye"]
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
      comic: { speaker: 'rohit', text: "Yaar, mera friend keh raha tha ye stock 10x jaayega! Invest kar doon kya?" },
      checklist: ["FOMO control seekha", "Free tips ignore karna", "Own research important"],
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
      comic: { speaker: 'priya', text: "Chalo Rohit, aaj hi Zerodha pe account khol lete hain! Main tujhe step-by-step guide karungi. Rotech Shiksha pe aur bhi courses hain!" },
      checklist: ["Demat account open kiya", "First SIP start kiya", "Rotech Shiksha bookmark kiya"]
    }
  ]
};

// CSS Styles
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap');

:root {
  --primary: #387ED1;
  --primary-dark: #2563EB;
  --accent: #10B981;
  --warning: #F59E0B;
  --danger: #EF4444;
  --dark: #1E293B;
  --gray: #64748B;
  --light-gray: #F1F5F9;
  --priya-color: #10B981;
  --rohit-color: #3B82F6;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 11pt;
  line-height: 1.6;
  color: var(--dark);
  background: #fff;
}

.page {
  width: 210mm;
  min-height: 297mm;
  padding: 20mm 18mm;
  position: relative;
  page-break-after: always;
  background: #fff;
}

.page:last-child { page-break-after: avoid; }

/* Cover Page */
.cover-page {
  background: linear-gradient(135deg, #1E3A5F 0%, #0F172A 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30mm 25mm;
}

.cover-badge {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 20px;
  padding: 6px 16px;
  font-size: 10pt;
  font-weight: 500;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.cover-title {
  font-family: 'Poppins', sans-serif;
  font-size: 32pt;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 12px;
}

.cover-subtitle {
  font-size: 14pt;
  font-weight: 400;
  color: #94A3B8;
  margin-bottom: 40px;
  max-width: 400px;
}

.cover-characters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.cover-character {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid rgba(255,255,255,0.3);
  object-fit: cover;
  background: #334155;
}

.cover-tagline {
  font-size: 11pt;
  color: #94A3B8;
  font-style: italic;
}

.cover-footer {
  position: absolute;
  bottom: 25mm;
  left: 0;
  right: 0;
  text-align: center;
}

.cover-logo {
  font-family: 'Poppins', sans-serif;
  font-size: 12pt;
  font-weight: 600;
  color: #94A3B8;
  letter-spacing: 1px;
}

/* Header & Footer */
.page-header {
  position: absolute;
  top: 12mm;
  left: 18mm;
  right: 18mm;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 8pt;
  color: var(--gray);
}

.header-brand {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: var(--primary);
}

.page-footer {
  position: absolute;
  bottom: 12mm;
  left: 18mm;
  right: 18mm;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 8pt;
  color: var(--gray);
  border-top: 1px solid var(--light-gray);
  padding-top: 8px;
}

.footer-page {
  font-weight: 600;
  color: var(--primary);
}

/* Watermark */
.watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-30deg);
  font-family: 'Poppins', sans-serif;
  font-size: 72pt;
  font-weight: 800;
  color: rgba(56, 126, 209, 0.04);
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
}

/* Chapter Styles */
.chapter-number {
  font-size: 10pt;
  font-weight: 600;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
}

.chapter-title {
  font-family: 'Poppins', sans-serif;
  font-size: 22pt;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 16px;
  line-height: 1.3;
}

.chapter-intro {
  font-size: 11pt;
  color: var(--gray);
  line-height: 1.7;
  margin-bottom: 24px;
  max-width: 90%;
}

/* Takeaways */
.takeaways {
  background: var(--light-gray);
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 24px;
}

.takeaways-title {
  font-size: 10pt;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.takeaway-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 10pt;
  line-height: 1.5;
}

.takeaway-bullet {
  width: 6px;
  height: 6px;
  background: var(--primary);
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

/* Comic Panel */
.comic-panel {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #E2E8F0;
}

.comic-panel.priya { border-left: 4px solid var(--priya-color); }
.comic-panel.rohit { border-left: 4px solid var(--rohit-color); }

.comic-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background: #E2E8F0;
}

.comic-content { flex: 1; }

.comic-name {
  font-size: 9pt;
  font-weight: 700;
  margin-bottom: 4px;
}

.comic-panel.priya .comic-name { color: var(--priya-color); }
.comic-panel.rohit .comic-name { color: var(--rohit-color); }

.comic-text {
  font-size: 10pt;
  color: var(--dark);
  line-height: 1.5;
  font-style: italic;
}

/* Checklist */
.checklist-card {
  background: #FFFBEB;
  border: 1px solid #FDE68A;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 24px;
}

.checklist-title {
  font-size: 10pt;
  font-weight: 700;
  color: var(--warning);
  margin-bottom: 12px;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 10pt;
}

.checkbox {
  width: 16px;
  height: 16px;
  border: 2px solid var(--warning);
  border-radius: 4px;
  flex-shrink: 0;
}

/* Charts */
.chart-container {
  margin: 24px 0;
  padding: 20px;
  background: var(--light-gray);
  border-radius: 12px;
}

.chart-title {
  font-size: 10pt;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 16px;
  text-align: center;
}

.pie-chart {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: conic-gradient(
    var(--primary) 0deg 216deg,
    var(--accent) 216deg 324deg,
    var(--warning) 324deg 360deg
  );
  margin: 0 auto 16px;
  position: relative;
}

.pie-chart::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: var(--light-gray);
  border-radius: 50%;
}

.pie-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 9pt;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-dot.blue { background: var(--primary); }
.legend-dot.green { background: var(--accent); }
.legend-dot.yellow { background: var(--warning); }

.risk-scale {
  height: 24px;
  border-radius: 12px;
  background: linear-gradient(90deg, var(--accent) 0%, var(--warning) 50%, var(--danger) 100%);
  margin-bottom: 12px;
}

.risk-labels {
  display: flex;
  justify-content: space-between;
  font-size: 9pt;
  color: var(--gray);
}

/* TOC */
.toc-title {
  font-family: 'Poppins', sans-serif;
  font-size: 24pt;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 32px;
  text-align: center;
}

.toc-list { max-width: 400px; margin: 0 auto; }

.toc-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--light-gray);
  font-size: 11pt;
}

.toc-chapter {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toc-number {
  width: 28px;
  height: 28px;
  background: var(--primary);
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10pt;
  font-weight: 600;
}

.toc-name { font-weight: 500; color: var(--dark); }
.toc-page { color: var(--gray); font-weight: 500; }

/* About Page */
.about-title {
  font-family: 'Poppins', sans-serif;
  font-size: 20pt;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 24px;
}

.about-text {
  font-size: 11pt;
  color: var(--gray);
  line-height: 1.8;
  margin-bottom: 24px;
}

.character-intro {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.character-card {
  flex: 1;
  padding: 20px;
  background: var(--light-gray);
  border-radius: 12px;
  text-align: center;
}

.character-card img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 12px;
  object-fit: cover;
  background: #CBD5E1;
}

.character-card h4 {
  font-size: 12pt;
  font-weight: 700;
  margin-bottom: 4px;
}

.character-card.priya h4 { color: var(--priya-color); }
.character-card.rohit h4 { color: var(--rohit-color); }

.character-card p {
  font-size: 9pt;
  color: var(--gray);
}

.info-box {
  background: #EFF6FF;
  border: 1px solid #BFDBFE;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 24px;
}

.info-box-title {
  font-size: 10pt;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 8px;
}

.info-box-text {
  font-size: 10pt;
  color: var(--dark);
  line-height: 1.5;
}

/* CTA Page */
.cta-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40mm 25mm;
}

.cta-title {
  font-family: 'Poppins', sans-serif;
  font-size: 24pt;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 16px;
}

.cta-subtitle {
  font-size: 12pt;
  color: var(--gray);
  margin-bottom: 32px;
  max-width: 400px;
}

.cta-qr {
  width: 120px;
  height: 120px;
  background: var(--light-gray);
  border: 2px dashed var(--gray);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  font-size: 9pt;
  color: var(--gray);
}

.cta-url {
  font-size: 14pt;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 40px;
}

.cta-characters {
  display: flex;
  gap: 16px;
}

.cta-character {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--light-gray);
  background: #CBD5E1;
}

@media print {
  .page { page-break-after: always; page-break-inside: avoid; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
`;

function generateCoverPage(): string {
  return `
    <div class="page cover-page">
      <div class="cover-badge">FREE EBOOK</div>
      <h1 class="cover-title">${bookContent.title}</h1>
      <p class="cover-subtitle">${bookContent.subtitle}</p>
      <div class="cover-characters">
        <div class="cover-character"></div>
        <div class="cover-character"></div>
      </div>
      <p class="cover-tagline">${bookContent.tagline}</p>
      <div class="cover-footer">
        <div class="cover-logo">ROTECH SHIKSHA</div>
      </div>
    </div>
  `;
}

function generateTOCPage(): string {
  const tocItems = bookContent.chapters.map((ch, i) => `
    <div class="toc-item">
      <div class="toc-chapter">
        <div class="toc-number">${ch.number}</div>
        <span class="toc-name">${ch.title}</span>
      </div>
      <span class="toc-page">${i + 4}</span>
    </div>
  `).join('');

  return `
    <div class="page">
      <div class="page-header">
        <span class="header-brand">Rotech Shiksha</span>
        <span>Contents</span>
      </div>
      <h2 class="toc-title">Table of Contents</h2>
      <div class="toc-list">${tocItems}</div>
      <div class="page-footer">
        <span>rotechshiksha.com</span>
        <span class="footer-page">2</span>
      </div>
    </div>
  `;
}

function generateAboutPage(): string {
  return `
    <div class="page">
      <div class="page-header">
        <span class="header-brand">Rotech Shiksha</span>
        <span>About</span>
      </div>
      <h2 class="about-title">About This Book</h2>
      <p class="about-text">
        Ye ebook specially un logon ke liye hai jo stock market mein naye hain aur 
        confused hain ki shuruat kahan se karein. Hum Priya aur Rohit ke saath milke 
        ek friendly journey pe chalenge jahan complex concepts ko simple Hinglish mein 
        samjhaya jaayega.
      </p>
      <p class="about-text">
        Priya aur Rohit dono 25 saal ke friends hain. Priya experienced investor hai 
        jo Rohit ko stock market ki basics sikha rahi hai. Unki conversations se tum 
        bhi seekhoge bilkul easily!
      </p>
      <div class="character-intro">
        <div class="character-card priya">
          <div class="cover-character" style="width:64px;height:64px;margin:0 auto 12px;"></div>
          <h4>Priya</h4>
          <p>Experienced investor, tumhari guide</p>
        </div>
        <div class="character-card rohit">
          <div class="cover-character" style="width:64px;height:64px;margin:0 auto 12px;"></div>
          <h4>Rohit</h4>
          <p>Beginner, tumhare jaise curious</p>
        </div>
      </div>
      <div class="info-box">
        <div class="info-box-title">Disclaimer</div>
        <p class="info-box-text">
          Ye ebook educational purposes ke liye hai. Investment decision lene se pehle 
          apni research karo aur financial advisor se consult karo.
        </p>
      </div>
      <div class="page-footer">
        <span>rotechshiksha.com</span>
        <span class="footer-page">3</span>
      </div>
    </div>
  `;
}

function generatePieChart(): string {
  return `
    <div class="chart-container">
      <div class="chart-title">60-30-10 Investment Rule</div>
      <div class="pie-chart"></div>
      <div class="pie-legend">
        <div class="legend-item"><div class="legend-dot blue"></div><span>60% Safe</span></div>
        <div class="legend-item"><div class="legend-dot green"></div><span>30% Moderate</span></div>
        <div class="legend-item"><div class="legend-dot yellow"></div><span>10% High Risk</span></div>
      </div>
    </div>
  `;
}

function generateRiskScale(): string {
  return `
    <div class="chart-container">
      <div class="chart-title">Risk-Reward Scale</div>
      <div class="risk-scale"></div>
      <div class="risk-labels">
        <span>Low Risk / Low Return</span>
        <span>High Risk / High Return</span>
      </div>
    </div>
  `;
}

function generateChapterPage(chapter: any, pageNum: number): string {
  const takeawayItems = chapter.takeaways.map((t: string) => `
    <div class="takeaway-item">
      <div class="takeaway-bullet"></div>
      <span>${t}</span>
    </div>
  `).join('');

  const checklistItems = chapter.checklist.map((c: string) => `
    <div class="checklist-item">
      <div class="checkbox"></div>
      <span>${c}</span>
    </div>
  `).join('');

  const speakerName = chapter.comic.speaker === 'priya' ? 'Priya' : 'Rohit';

  let chartHtml = '';
  if (chapter.hasChart === 'pie') chartHtml = generatePieChart();
  else if (chapter.hasChart === 'risk') chartHtml = generateRiskScale();

  return `
    <div class="page">
      ${chapter.hasWatermark ? '<div class="watermark">ROTECH</div>' : ''}
      <div class="page-header">
        <span class="header-brand">Rotech Shiksha</span>
        <span>Chapter ${chapter.number}</span>
      </div>
      
      <div class="chapter-number">Chapter ${chapter.number}</div>
      <h1 class="chapter-title">${chapter.title}</h1>
      <p class="chapter-intro">${chapter.intro}</p>
      
      <div class="takeaways">
        <div class="takeaways-title">Key Takeaways</div>
        ${takeawayItems}
      </div>
      
      ${chartHtml}
      
      <div class="comic-panel ${chapter.comic.speaker}">
        <div class="comic-avatar"></div>
        <div class="comic-content">
          <div class="comic-name">${speakerName}</div>
          <div class="comic-text">"${chapter.comic.text}"</div>
        </div>
      </div>
      
      <div class="checklist-card">
        <div class="checklist-title">Quick Checklist</div>
        ${checklistItems}
      </div>
      
      <div class="page-footer">
        <span>rotechshiksha.com</span>
        <span class="footer-page">${pageNum}</span>
      </div>
    </div>
  `;
}

function generateCTAPage(pageNum: number): string {
  return `
    <div class="page cta-page">
      <h2 class="cta-title">Aage Seekhna Hai?</h2>
      <p class="cta-subtitle">
        Rotech Shiksha pe aur bhi advanced courses hain jaise Options Trading, 
        Technical Analysis, aur Algo Trading. Free mein shuru karo!
      </p>
      <div class="cta-qr">QR Code</div>
      <div class="cta-url">rotechshiksha.com</div>
      <div class="cta-characters">
        <div class="cta-character"></div>
        <div class="cta-character"></div>
      </div>
      <div class="page-footer">
        <span>rotechshiksha.com</span>
        <span class="footer-page">${pageNum}</span>
      </div>
    </div>
  `;
}

function generateFullBookHtml(): string {
  let pageNum = 4;
  
  const chapterPages = bookContent.chapters.map(chapter => {
    const page = generateChapterPage(chapter, pageNum);
    pageNum++;
    return page;
  }).join('');

  const ctaPage = generateCTAPage(pageNum);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${bookContent.title} - Rotech Shiksha</title>
  <style>${styles}</style>
</head>
<body>
  ${generateCoverPage()}
  ${generateTOCPage()}
  ${generateAboutPage()}
  ${chapterPages}
  ${ctaPage}
</body>
</html>
  `;
}

async function generatePDF() {
  console.log('Generating Premium PDF Ebook...');
  
  // Generate HTML
  const html = generateFullBookHtml();
  
  // Write HTML to temp file
  const tempHtmlPath = path.join(process.cwd(), 'temp-book.html');
  fs.writeFileSync(tempHtmlPath, html);
  console.log('HTML template generated');
  
  // Launch Playwright
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Load HTML file
  await page.goto(`file://${tempHtmlPath}`, { waitUntil: 'networkidle' });
  console.log('Page loaded in Playwright');
  
  // Ensure output directory exists
  const outputDir = path.join(process.cwd(), 'client', 'public', 'pdf');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Generate PDF
  const pdfPath = path.join(outputDir, 'stock-market-beginner-guide.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' }
  });
  
  console.log(`PDF generated: ${pdfPath}`);
  
  // Cleanup
  await browser.close();
  fs.unlinkSync(tempHtmlPath);
  
  console.log('Done! Premium ebook ready.');
}

generatePDF().catch(console.error);
