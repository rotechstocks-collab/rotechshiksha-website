// HTML Template Generator for Premium Ebook
import { bookContent, Chapter } from './bookContent';
import fs from 'fs';
import path from 'path';

const styles = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf-8');

// Inline SVG Icons
const icons = {
  lightbulb: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  clipboard: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
};

function generateCoverPage(): string {
  return `
    <div class="page cover-page">
      <div class="cover-badge">FREE EBOOK</div>
      <h1 class="cover-title">${bookContent.title}</h1>
      <p class="cover-subtitle">${bookContent.subtitle}</p>
      <div class="cover-characters">
        <img src="characters/priya_main.png" alt="Priya" class="cover-character" />
        <img src="characters/rohit_main.png" alt="Rohit" class="cover-character" />
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
        <span class="header-chapter">Contents</span>
      </div>
      <h2 class="toc-title">Table of Contents</h2>
      <div class="toc-list">
        ${tocItems}
      </div>
      <div class="page-footer">
        <span class="footer-url">rotechshiksha.com</span>
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
        <span class="header-chapter">About</span>
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
          <img src="characters/priya_main.png" alt="Priya" />
          <h4>Priya</h4>
          <p>Experienced investor, tumhari guide is journey mein</p>
        </div>
        <div class="character-card rohit">
          <img src="characters/rohit_main.png" alt="Rohit" />
          <h4>Rohit</h4>
          <p>Beginner investor, tumhare jaise curious learner</p>
        </div>
      </div>
      <div class="info-box">
        <div class="info-box-title">${icons.info} Disclaimer</div>
        <p class="info-box-text">
          Ye ebook educational purposes ke liye hai. Koi bhi investment decision 
          lene se pehle apni research karo aur zarurat ho toh financial advisor se 
          consult karo. Past performance future returns ki guarantee nahi hai.
        </p>
      </div>
      <div class="page-footer">
        <span class="footer-url">rotechshiksha.com</span>
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
        <div class="legend-item">
          <div class="legend-dot blue"></div>
          <span>60% Safe (FD, Bonds)</span>
        </div>
        <div class="legend-item">
          <div class="legend-dot green"></div>
          <span>30% Moderate (MF)</span>
        </div>
        <div class="legend-item">
          <div class="legend-dot yellow"></div>
          <span>10% High Risk (Stocks)</span>
        </div>
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

function generateChapterPage(chapter: Chapter, pageNum: number): string {
  const takeawayItems = chapter.takeaways.map(t => `
    <div class="takeaway-item">
      <div class="takeaway-bullet"></div>
      <span>${t}</span>
    </div>
  `).join('');

  const checklistItems = chapter.checklist.map(c => `
    <div class="checklist-item">
      <div class="checkbox"></div>
      <span>${c}</span>
    </div>
  `).join('');

  const avatarSrc = chapter.comic.speaker === 'priya' 
    ? 'characters/priya_main.png' 
    : 'characters/rohit_main.png';
  
  const speakerName = chapter.comic.speaker === 'priya' ? 'Priya' : 'Rohit';

  let chartHtml = '';
  if (chapter.hasChart === 'pie') {
    chartHtml = generatePieChart();
  } else if (chapter.hasChart === 'risk') {
    chartHtml = generateRiskScale();
  }

  return `
    <div class="page">
      ${chapter.hasWatermark ? '<div class="watermark">ROTECH</div>' : ''}
      <div class="page-header">
        <span class="header-brand">Rotech Shiksha</span>
        <span class="header-chapter">Chapter ${chapter.number}</span>
      </div>
      
      <div class="chapter-number">Chapter ${chapter.number}</div>
      <h1 class="chapter-title">${chapter.title}</h1>
      <p class="chapter-intro">${chapter.intro}</p>
      
      <div class="takeaways">
        <div class="takeaways-title">${icons.lightbulb} Key Takeaways</div>
        ${takeawayItems}
      </div>
      
      ${chartHtml}
      
      <div class="comic-panel ${chapter.comic.speaker}">
        <img src="${avatarSrc}" alt="${speakerName}" class="comic-avatar" />
        <div class="comic-content">
          <div class="comic-name">${speakerName}</div>
          <div class="comic-text">"${chapter.comic.text}"</div>
        </div>
      </div>
      
      <div class="checklist-card">
        <div class="checklist-title">${icons.clipboard} Quick Checklist</div>
        ${checklistItems}
      </div>
      
      <div class="page-footer">
        <span class="footer-url">rotechshiksha.com</span>
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
        <img src="characters/priya_main.png" alt="Priya" class="cta-character" />
        <img src="characters/rohit_main.png" alt="Rohit" class="cta-character" />
      </div>
      <div class="page-footer">
        <span class="footer-url">rotechshiksha.com</span>
        <span class="footer-page">${pageNum}</span>
      </div>
    </div>
  `;
}

export function generateFullBookHtml(): string {
  let pageNum = 4; // Cover=1, TOC=2, About=3, chapters start at 4
  
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
