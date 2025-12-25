import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { leadFormSchema, otpVerifySchema } from "@shared/schema";
import axios from "axios";
import * as cheerio from "cheerio";
import { fetchIPOData, getIPOById, startIPORefreshJob, clearIPOCache } from "./services/ipoService";
import { fetchEconomicCalendar, startCalendarRefreshJob } from "./services/economicCalendarService";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Testing mode configuration via environment variables
const TEST_OTP = process.env.TEST_OTP || "123456";
const IS_TESTING_MODE = process.env.OTP_TEST_MODE === "true" || process.env.NODE_ENV !== "production";

// Alpha Vantage API configuration
const ALPHAVANTAGE_API_KEY = process.env.ALPHAVANTAGE_API_KEY || "";
const ALPHAVANTAGE_BASE_URL = "https://www.alphavantage.co/query";

// Cache for news data
interface CachedNews {
  data: any;
  timestamp: number;
}
let newsCache: Record<string, CachedNews> = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

// Fetch financial news from GNews API
async function fetchNewsFromGNews(language: string = "en"): Promise<any[]> {
  const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
  if (!GNEWS_API_KEY) {
    console.log("GNews API key not configured, falling back to MoneyControl");
    return await fetchNewsFromMoneyControl(language);
  }

  try {
    const cacheKey = `gnews-${language}`;
    const cached = newsCache[cacheKey];
    
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    const langParam = language === "hi" ? "hi" : "en";
    const url = `https://gnews.io/api/v4/top-headlines?category=business&lang=${langParam}&country=in&apikey=${GNEWS_API_KEY}`;

    console.log(`Fetching news from GNews (${language})`);
    const response = await axios.get(url, { timeout: 8000 });
    
    if (response.data && response.data.articles) {
      const articles = response.data.articles.map((item: any, index: number) => ({
        id: `gn-${language}-${index}`,
        title: item.title,
        summary: item.description || item.content || "Financial news article",
        category: categorizeNews(item.title),
        tag: item.source.name || "News",
        imageUrl: item.image || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format",
        source: item.source.name || "GNews",
        publishedAt: item.publishedAt,
        url: item.url
      }));

      newsCache[cacheKey] = {
        data: articles,
        timestamp: Date.now()
      };

      return articles;
    }
    
    return await fetchNewsFromMoneyControl(language);
  } catch (error) {
    console.error("GNews fetch error:", error);
    return await fetchNewsFromMoneyControl(language);
  }
}

// Fetch financial news from MoneyControl
async function fetchNewsFromMoneyControl(language: string = "en"): Promise<any[]> {
  try {
    const cacheKey = `moneycontrol-${language}`;
    const cached = newsCache[cacheKey];
    
    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    // Use MoneyControl API wrapper or scrape based on language
    const url = language === "hi" 
      ? "https://hindi.moneycontrol.com/"
      : "https://www.moneycontrol.com/news/";

    console.log(`Fetching news from MoneyControl (${language}): ${url}`);

    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      timeout: 8000
    });

    const $ = cheerio.load(response.data);
    const articles: any[] = [];

    // Scrape article cards from MoneyControl
    $("div.eachNews, article, div.newsItem, div.news-item, a[href*='/news/']").each((index, element) => {
      if (articles.length >= 12) return;

      try {
        const $el = $(element);
        let title = $el.find("h2, h3, .newsTtl, .nwsHeading").text().trim();
        let summary = $el.find("p, .newsDsc, .nwsDsc").text().trim();
        let imageUrl = $el.find("img").attr("src") || $el.find("img").attr("data-src") || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format";
        let url = $el.find("a").attr("href") || "#";

        // Ensure we have content
        if (!title) title = $el.text().trim().substring(0, 100);
        if (!summary) summary = "Financial news from MoneyControl";

        // Clean up image URL
        if (imageUrl && !imageUrl.startsWith("http")) {
          imageUrl = `https://moneycontrol.com${imageUrl}`;
        }

        // Clean up link
        if (url && !url.startsWith("http")) {
          const baseUrl = language === "hi" ? "https://hindi.moneycontrol.com" : "https://moneycontrol.com";
          url = `${baseUrl}${url}`;
        }

        if (title && title.length > 10) {
          articles.push({
            id: `mc-${language}-${index}`,
            title: title.substring(0, 200),
            summary: summary.substring(0, 300),
            category: categorizeNews(title),
            tag: "MoneyControl",
            imageUrl: imageUrl,
            source: "MoneyControl",
            publishedAt: new Date().toISOString(),
            url: url
          });
        }
      } catch (err) {
        // Skip malformed elements
      }
    });

    console.log(`Found ${articles.length} articles from MoneyControl (${language})`);

    // If scraping failed, fall back to Alpha Vantage
    if (articles.length === 0) {
      console.log("MoneyControl scraping returned 0 articles, using Alpha Vantage fallback");
      return await fetchNewsFromAlphaVantage("stock market India", language);
    }

    // Cache the results
    newsCache[cacheKey] = {
      data: articles,
      timestamp: Date.now()
    };

    return articles;
  } catch (error) {
    console.error("MoneyControl fetch error:", error);
    // Fallback to Alpha Vantage
    return await fetchNewsFromAlphaVantage("stock market India", language);
  }
}

// Fetch financial news from Alpha Vantage NEWS_SENTIMENT endpoint (fallback)
async function fetchNewsFromAlphaVantage(query: string, language: string = "en"): Promise<any[]> {
  if (!ALPHAVANTAGE_API_KEY) {
    console.log("Alpha Vantage API key not configured");
    return [];
  }

  try {
    const cacheKey = `${query}-${language}`;
    const cached = newsCache[cacheKey];
    
    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    // Map category queries to search keywords
    const keywordMap: Record<string, string> = {
      "stock market India": "india",
      "Nifty Sensex BSE NSE": "nifty",
      "RBI inflation GDP economy India": "rbi",
      "business India companies": "business",
      "gold crude oil commodity prices": "commodity",
      "bank HDFC ICICI SBI": "banking",
      "Tata Motors Maruti automobile": "auto",
      "mutual fund SIP investment": "mutual fund"
    };

    const keywords = keywordMap[query] || "stock market";

    const url = `${ALPHAVANTAGE_BASE_URL}?function=NEWS_SENTIMENT&keywords=${encodeURIComponent(keywords)}&limit=20&apikey=${ALPHAVANTAGE_API_KEY}`;
    
    console.log(`Fetching news from Alpha Vantage: ${keywords}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Alpha Vantage error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check for API errors
    if (data.Note || data.Information || !data.feed) {
      console.log(`Alpha Vantage API note: ${data.Note || data.Information || "No feed data"}`);
      return [];
    }

    if (!Array.isArray(data.feed) || data.feed.length === 0) {
      console.log(`No news found for: ${keywords}`);
      return [];
    }

    console.log(`Found ${data.feed.length} news items for: ${keywords}`);

    // Transform Alpha Vantage news to our format
    const articles = data.feed
      .map((item: any, index: number) => {
        let imageUrl = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format";
        if (item.banner_image) {
          imageUrl = item.banner_image;
        }

        return {
          id: `av-${cacheKey}-${index}`,
          title: item.title || "Untitled",
          summary: item.summary || "Financial news article",
          category: categorizeNews(item.title || ""),
          tag: item.source || "Financial News",
          imageUrl: imageUrl,
          source: item.source || "Financial News",
          publishedAt: item.time_published ? new Date(item.time_published).toISOString() : new Date().toISOString(),
          url: item.url || "#"
        };
      })
      .slice(0, 12);

    console.log(`Processed ${articles.length} articles`);

    // Cache the results
    newsCache[cacheKey] = {
      data: articles,
      timestamp: Date.now()
    };

    return articles;
  } catch (error) {
    console.error("Alpha Vantage news fetch error:", error);
    return [];
  }
}

function categorizeNews(title: string): string {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes("gold") || lowerTitle.includes("silver") || lowerTitle.includes("crude") || lowerTitle.includes("commodity")) return "Commodities";
  if (lowerTitle.includes("bank") || lowerTitle.includes("rbi") || lowerTitle.includes("credit")) return "Banking";
  if (lowerTitle.includes("auto") || lowerTitle.includes("car") || lowerTitle.includes("vehicle") || lowerTitle.includes("motor")) return "Auto";
  if (lowerTitle.includes("fund") || lowerTitle.includes("mutual") || lowerTitle.includes("sip")) return "Mutual Funds";
  if (lowerTitle.includes("gdp") || lowerTitle.includes("inflation") || lowerTitle.includes("economy") || lowerTitle.includes("rbi") || lowerTitle.includes("rate")) return "Economy";
  if (lowerTitle.includes("company") || lowerTitle.includes("startup") || lowerTitle.includes("business") || lowerTitle.includes("rupees")) return "Business";
  return "Markets";
}

// Alpha Vantage symbol mapping for Indian stocks (BSE symbols)
const alphaVantageSymbols: Record<string, string> = {
  "RELIANCE": "RELIANCE.BSE",
  "TCS": "TCS.BSE",
  "HDFCBANK": "HDFCBANK.BSE",
  "ICICIBANK": "ICICIBANK.BSE",
  "INFY": "INFY.BSE",
  "ITC": "ITC.BSE",
  "SBIN": "SBIN.BSE",
  "BHARTIARTL": "BHARTIARTL.BSE",
  "KOTAKBANK": "KOTAKBANK.BSE",
  "LT": "LT.BSE",
  "HINDUNILVR": "HINDUNILVR.BSE",
  "AXISBANK": "AXISBANK.BSE",
  "WIPRO": "WIPRO.BSE",
  "MARUTI": "MARUTI.BSE",
  "TATAMOTORS": "TATAMOTORS.BSE",
  "ADANIENT": "ADANIENT.BSE",
  "ASIANPAINT": "ASIANPAINT.BSE",
  "BAJFINANCE": "BAJFINANCE.BSE",
  "BAJAJFINSV": "BAJAJFINSV.BSE",
  "SUNPHARMA": "SUNPHARMA.BSE",
  "TITAN": "TITAN.BSE",
  "ULTRACEMCO": "ULTRACEMCO.BSE",
  "ONGC": "ONGC.BSE",
  "NTPC": "NTPC.BSE",
  "POWERGRID": "POWERGRID.BSE",
  "TECHM": "TECHM.BSE",
  "HCLTECH": "HCLTECH.BSE",
  "COALINDIA": "COALINDIA.BSE",
  "DRREDDY": "DRREDDY.BSE",
  "DIVISLAB": "DIVISLAB.BSE"
};

// Fetch quote from Alpha Vantage API
async function fetchAlphaVantageQuote(symbol: string): Promise<any> {
  if (!ALPHAVANTAGE_API_KEY) {
    return null;
  }
  
  try {
    const avSymbol = alphaVantageSymbols[symbol] || `${symbol}.BSE`;
    const url = `${ALPHAVANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${avSymbol}&apikey=${ALPHAVANTAGE_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Alpha Vantage API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check for API limit message
    if (data.Note || data.Information) {
      console.log("Alpha Vantage API limit reached:", data.Note || data.Information);
      return null;
    }
    
    const quote = data["Global Quote"];
    if (!quote || !quote["05. price"]) {
      return null;
    }
    
    const price = parseFloat(quote["05. price"]);
    const open = parseFloat(quote["02. open"]);
    const high = parseFloat(quote["03. high"]);
    const low = parseFloat(quote["04. low"]);
    const prevClose = parseFloat(quote["08. previous close"]);
    const change = parseFloat(quote["09. change"]);
    const changePercent = parseFloat(quote["10. change percent"]?.replace("%", "") || "0");
    
    return {
      name: symbol, // Will be enriched with stockSymbols later in routes
      symbol: symbol,
      price,
      change,
      changePercent,
      open,
      high,
      low,
      prevClose,
      source: "alphavantage"
    };
  } catch (error) {
    console.error(`Alpha Vantage fetch error for ${symbol}:`, error);
    return null;
  }
}

// Fetch intraday data from Alpha Vantage
async function fetchAlphaVantageIntraday(symbol: string, interval: string = "5min"): Promise<any[]> {
  if (!ALPHAVANTAGE_API_KEY) {
    return [];
  }
  
  try {
    const avSymbol = alphaVantageSymbols[symbol] || `${symbol}.BSE`;
    const url = `${ALPHAVANTAGE_BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${avSymbol}&interval=${interval}&apikey=${ALPHAVANTAGE_API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Alpha Vantage API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.Note || data.Information) {
      console.log("Alpha Vantage API limit reached");
      return [];
    }
    
    const timeSeries = data[`Time Series (${interval})`];
    if (!timeSeries) {
      return [];
    }
    
    const chartData = Object.entries(timeSeries).slice(0, 50).map(([time, values]: [string, any]) => ({
      time: time.split(" ")[1] || time,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
      volume: parseInt(values["5. volume"]),
      price: parseFloat(values["4. close"])
    })).reverse();
    
    return chartData;
  } catch (error) {
    console.error(`Alpha Vantage intraday fetch error for ${symbol}:`, error);
    return [];
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "rotech-multi-solution-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      },
    })
  );

  // Auth Routes
  app.post("/api/auth/send-otp", async (req: Request, res: Response) => {
    try {
      const result = leadFormSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: result.error.errors[0].message });
      }

      const { fullName, mobile, email, experience, investmentRange } = result.data;

      // Create or update lead
      let lead = await storage.getLeadByMobile(mobile);
      if (!lead) {
        lead = await storage.createLead({
          fullName,
          mobile,
          email: email || null,
          experience,
          investmentRange: investmentRange || null,
        });
      }

      // Generate and store OTP
      const otp = generateOtp();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

      await storage.createOtp({
        mobile,
        otp,
        expiresAt,
        isUsed: false,
      });

      // In production, send OTP via SMS
      // For now, log to console (integrate SMS provider for production)
      console.log(`OTP for ${mobile}: ${otp}`);

      res.json({ 
        message: "OTP sent successfully", 
        mobile,
        testMode: IS_TESTING_MODE,
        testOtpHint: IS_TESTING_MODE ? `Testing mode: Use OTP ${TEST_OTP}` : undefined
      });
    } catch (error) {
      console.error("Send OTP error:", error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  });

  app.post("/api/auth/resend-otp", async (req: Request, res: Response) => {
    try {
      const { mobile } = req.body;
      if (!mobile) {
        return res.status(400).json({ message: "Mobile number is required" });
      }

      const otp = generateOtp();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await storage.createOtp({
        mobile,
        otp,
        expiresAt,
        isUsed: false,
      });

      console.log(`Resent OTP for ${mobile}: ${otp}`);

      res.json({ 
        message: "OTP resent successfully",
        testMode: IS_TESTING_MODE,
        testOtpHint: IS_TESTING_MODE ? `Testing mode: Use OTP ${TEST_OTP}` : undefined
      });
    } catch (error) {
      console.error("Resend OTP error:", error);
      res.status(500).json({ message: "Failed to resend OTP" });
    }
  });

  app.post("/api/auth/verify-otp", async (req: Request, res: Response) => {
    try {
      const result = otpVerifySchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ message: result.error.errors[0].message });
      }

      const { mobile, otp } = result.data;

      // Check if using test OTP (always accepted in testing mode)
      const isTestOtp = otp === TEST_OTP;

      // Get stored OTP
      const storedOtp = await storage.getOtpByMobile(mobile);
      
      // Allow verification if test OTP is used OR real OTP matches
      let otpValid = false;
      
      if (isTestOtp && IS_TESTING_MODE) {
        // Accept test OTP in testing mode
        otpValid = true;
        console.log(`Test OTP accepted for ${mobile}`);
      } else if (storedOtp) {
        // Verify real OTP
        if (storedOtp.isUsed) {
          // Check if test OTP can be used instead
          if (!isTestOtp) {
            return res.status(400).json({ 
              message: `OTP already used. Please request a new one or use test OTP: ${TEST_OTP}`,
              testMode: IS_TESTING_MODE 
            });
          }
          otpValid = isTestOtp;
        } else if (new Date() > storedOtp.expiresAt) {
          // Check if test OTP can be used instead
          if (!isTestOtp) {
            return res.status(400).json({ 
              message: `OTP expired. Please request a new one or use test OTP: ${TEST_OTP}`,
              testMode: IS_TESTING_MODE 
            });
          }
          otpValid = isTestOtp;
        } else if (storedOtp.otp === otp) {
          otpValid = true;
          // Mark real OTP as used
          await storage.markOtpUsed(storedOtp.id);
        } else if (isTestOtp) {
          // Real OTP didn't match but test OTP was used
          otpValid = true;
        }
      } else if (isTestOtp) {
        // No stored OTP but test OTP used
        otpValid = true;
      }

      if (!otpValid) {
        return res.status(400).json({ 
          message: `Invalid OTP. Please try again or use test OTP: ${TEST_OTP}`,
          testMode: IS_TESTING_MODE 
        });
      }

      // Get lead and create user
      const lead = await storage.getLeadByMobile(mobile);
      if (!lead) {
        return res.status(400).json({ message: "Please complete registration first" });
      }

      // Update lead as verified with login time
      await storage.updateLead(lead.id, { isVerified: true });

      // Create or get user
      let user = await storage.getUserByMobile(mobile);
      if (!user) {
        user = await storage.createUser({
          fullName: lead.fullName,
          mobile: lead.mobile,
          email: lead.email,
          experience: lead.experience,
          investmentRange: lead.investmentRange,
          isVerified: true,
          isAdmin: false,
        });
      } else {
        user = await storage.updateUser(user.id, { isVerified: true });
      }

      // Set session
      req.session.userId = user!.id;

      console.log(`User verified: ${mobile}, Session ID: ${user!.id}`);

      res.json({
        ...user,
        message: "Login successful - Welcome to Rotech Shiksha!"
      });
    } catch (error) {
      console.error("Verify OTP error:", error);
      res.status(500).json({ message: "Verification failed" });
    }
  });

  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Get me error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Stock symbols mapping for Indian market
  const stockSymbols: Record<string, string> = {
    "^NSEI": "NIFTY 50",
    "^NSEBANK": "BANK NIFTY",
    "^BSESN": "SENSEX",
    "RELIANCE.NS": "Reliance",
    "TCS.NS": "TCS",
    "HDFCBANK.NS": "HDFC Bank",
    "ICICIBANK.NS": "ICICI Bank",
    "INFY.NS": "Infosys",
    "HINDUNILVR.NS": "HUL",
    "SBIN.NS": "SBI",
    "BHARTIARTL.NS": "Bharti Airtel",
    "ITC.NS": "ITC",
    "KOTAKBANK.NS": "Kotak Bank",
    "LT.NS": "L&T",
    "AXISBANK.NS": "Axis Bank",
    "BAJFINANCE.NS": "Bajaj Finance",
    "MARUTI.NS": "Maruti",
    "TITAN.NS": "Titan",
    "WIPRO.NS": "Wipro",
    "ADANIENT.NS": "Adani Ent",
    "TATAMOTORS.NS": "Tata Motors",
    "TATASTEEL.NS": "Tata Steel",
    "ASIANPAINT.NS": "Asian Paints",
  };

  // Helper function to fetch Yahoo Finance data
  async function fetchYahooQuote(symbol: string) {
    try {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (response.ok) {
        const data = await response.json();
        const quote = data.chart?.result?.[0];
        if (quote) {
          const meta = quote.meta;
          const prev = meta.previousClose || meta.chartPreviousClose || 0;
          const current = meta.regularMarketPrice || prev;
          const change = current - prev;
          const changePercent = prev ? (change / prev) * 100 : 0;
          
          return {
            name: stockSymbols[symbol] || meta.symbol || symbol,
            symbol: symbol.replace("^", "").replace(".NS", ""),
            price: current,
            change: change,
            changePercent: changePercent,
            open: meta.regularMarketOpen || current,
            high: meta.regularMarketDayHigh || current,
            low: meta.regularMarketDayLow || current,
            prevClose: prev,
          };
        }
      }
    } catch (err) {
      console.error(`Failed to fetch ${symbol}:`, err);
    }
    return null;
  }

  // Market Data Routes - fetch from Yahoo Finance public API
  app.get("/api/market/live", async (_req: Request, res: Response) => {
    try {
      const mainSymbols = [
        "^NSEI", "^NSEBANK", "^BSESN", 
        "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "ICICIBANK.NS", "INFY.NS", 
        "ITC.NS", "SBIN.NS", "BHARTIARTL.NS", "KOTAKBANK.NS", "LT.NS",
        "HINDUNILVR.NS", "AXISBANK.NS", "WIPRO.NS", "MARUTI.NS", 
        "TATAMOTORS.NS", "ADANIENT.NS", "ASIANPAINT.NS"
      ];
      const promises = mainSymbols.map(fetchYahooQuote);
      const results = (await Promise.all(promises)).filter(Boolean);
      
      if (results.length === 0) {
        return res.json([
          { name: "NIFTY 50", symbol: "NSEI", price: 24180.80, change: 156.35, changePercent: 0.65, open: 24024.45, high: 24225.50, low: 24010.20, prevClose: 24024.45 },
          { name: "BANK NIFTY", symbol: "NSEBANK", price: 52340.15, change: -245.80, changePercent: -0.47, open: 52585.95, high: 52650.00, low: 52280.40, prevClose: 52585.95 },
          { name: "SENSEX", symbol: "BSESN", price: 79820.45, change: 485.25, changePercent: 0.61, open: 79335.20, high: 79950.80, low: 79300.00, prevClose: 79335.20 },
          { name: "Reliance", symbol: "RELIANCE", price: 2456.75, change: 32.50, changePercent: 1.34, open: 2424.25, high: 2468.00, low: 2418.00, prevClose: 2424.25 },
          { name: "TCS", symbol: "TCS", price: 4125.30, change: -28.45, changePercent: -0.69, open: 4153.75, high: 4162.00, low: 4115.00, prevClose: 4153.75 },
          { name: "HDFC Bank", symbol: "HDFCBANK", price: 1725.60, change: 15.20, changePercent: 0.89, open: 1710.40, high: 1732.00, low: 1708.00, prevClose: 1710.40 },
          { name: "ICICI Bank", symbol: "ICICIBANK", price: 1285.40, change: 18.75, changePercent: 1.48, open: 1266.65, high: 1292.00, low: 1262.00, prevClose: 1266.65 },
          { name: "Infosys", symbol: "INFY", price: 1875.25, change: -12.30, changePercent: -0.65, open: 1887.55, high: 1895.00, low: 1868.00, prevClose: 1887.55 },
          { name: "ITC", symbol: "ITC", price: 485.60, change: 5.85, changePercent: 1.22, open: 479.75, high: 488.00, low: 478.00, prevClose: 479.75 },
          { name: "SBI", symbol: "SBIN", price: 812.45, change: -8.20, changePercent: -1.00, open: 820.65, high: 825.00, low: 808.00, prevClose: 820.65 },
          { name: "Bharti Airtel", symbol: "BHARTIARTL", price: 1658.90, change: 22.45, changePercent: 1.37, open: 1636.45, high: 1665.00, low: 1632.00, prevClose: 1636.45 },
          { name: "Kotak Bank", symbol: "KOTAKBANK", price: 1795.30, change: -15.60, changePercent: -0.86, open: 1810.90, high: 1818.00, low: 1788.00, prevClose: 1810.90 },
          { name: "L&T", symbol: "LT", price: 3685.75, change: 42.30, changePercent: 1.16, open: 3643.45, high: 3698.00, low: 3635.00, prevClose: 3643.45 },
          { name: "HUL", symbol: "HINDUNILVR", price: 2485.60, change: -18.90, changePercent: -0.75, open: 2504.50, high: 2512.00, low: 2478.00, prevClose: 2504.50 },
          { name: "Axis Bank", symbol: "AXISBANK", price: 1178.25, change: 14.55, changePercent: 1.25, open: 1163.70, high: 1185.00, low: 1160.00, prevClose: 1163.70 },
          { name: "Wipro", symbol: "WIPRO", price: 505.80, change: 3.25, changePercent: 0.65, open: 502.55, high: 508.00, low: 500.00, prevClose: 502.55 },
          { name: "Maruti", symbol: "MARUTI", price: 12045.50, change: -125.80, changePercent: -1.03, open: 12171.30, high: 12200.00, low: 12010.00, prevClose: 12171.30 },
          { name: "Tata Motors", symbol: "TATAMOTORS", price: 812.35, change: 9.45, changePercent: 1.18, open: 802.90, high: 818.00, low: 798.00, prevClose: 802.90 },
          { name: "Adani Ent", symbol: "ADANIENT", price: 3025.60, change: -45.80, changePercent: -1.49, open: 3071.40, high: 3085.00, low: 3008.00, prevClose: 3071.40 },
        ]);
      }
      
      res.json(results);
    } catch (error) {
      console.error("Market data fetch error:", error);
      res.status(500).json({ message: "Failed to fetch market data" });
    }
  });

  // Stock search endpoint
  app.get("/api/market/search", async (req: Request, res: Response) => {
    try {
      const query = (req.query.q as string || "").toLowerCase();
      if (!query || query.length < 2) {
        return res.json([]);
      }

      const allStocks = Object.entries(stockSymbols).map(([symbol, name]) => ({
        symbol: symbol.replace("^", "").replace(".NS", ""),
        yahooSymbol: symbol,
        name,
      }));

      const matches = allStocks.filter(
        stock => stock.name.toLowerCase().includes(query) || stock.symbol.toLowerCase().includes(query)
      ).slice(0, 10);

      res.json(matches);
    } catch (error) {
      console.error("Stock search error:", error);
      res.status(500).json({ message: "Failed to search stocks" });
    }
  });

  // Get single stock quote
  app.get("/api/market/quote/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol;
      let yahooSymbol = symbol;
      
      if (!symbol.startsWith("^") && !symbol.endsWith(".NS")) {
        yahooSymbol = `${symbol}.NS`;
      }
      
      const quote = await fetchYahooQuote(yahooSymbol);
      if (quote) {
        res.json(quote);
      } else {
        res.status(404).json({ message: "Stock not found" });
      }
    } catch (error) {
      console.error("Quote fetch error:", error);
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  });

  // Alpha Vantage API endpoints
  app.get("/api/alphavantage/quote/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      
      if (!ALPHAVANTAGE_API_KEY) {
        return res.status(503).json({ 
          message: "Alpha Vantage API key not configured",
          fallback: true
        });
      }
      
      const quote = await fetchAlphaVantageQuote(symbol);
      if (quote) {
        // Enrich with stock name
        quote.name = stockSymbols[`${symbol}.NS`] || stockSymbols[symbol] || symbol;
        res.json(quote);
      } else {
        // Fallback to Yahoo Finance
        const yahooQuote = await fetchYahooQuote(`${symbol}.NS`);
        if (yahooQuote) {
          res.json({ ...yahooQuote, source: "yahoo_fallback" });
        } else {
          res.status(404).json({ message: "Stock not found" });
        }
      }
    } catch (error) {
      console.error("Alpha Vantage quote error:", error);
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  });

  // Alpha Vantage intraday chart data
  app.get("/api/alphavantage/intraday/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      const interval = (req.query.interval as string) || "5min";
      
      if (!ALPHAVANTAGE_API_KEY) {
        return res.status(503).json({ 
          message: "Alpha Vantage API key not configured",
          data: []
        });
      }
      
      const chartData = await fetchAlphaVantageIntraday(symbol, interval);
      res.json({
        symbol,
        interval,
        data: chartData,
        source: chartData.length > 0 ? "alphavantage" : "simulated"
      });
    } catch (error) {
      console.error("Alpha Vantage intraday error:", error);
      res.status(500).json({ message: "Failed to fetch intraday data" });
    }
  });

  // Alpha Vantage search endpoint
  app.get("/api/alphavantage/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      
      if (!query || query.length < 2) {
        return res.json([]);
      }
      
      if (!ALPHAVANTAGE_API_KEY) {
        // Fallback to local search
        const allStocks = Object.entries(stockSymbols).map(([symbol, name]) => ({
          symbol: symbol.replace("^", "").replace(".NS", ""),
          name,
        }));
        const matches = allStocks.filter(
          stock => stock.name.toLowerCase().includes(query.toLowerCase()) || 
                   stock.symbol.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10);
        return res.json(matches);
      }
      
      const url = `${ALPHAVANTAGE_BASE_URL}?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(query)}&apikey=${ALPHAVANTAGE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.Note || data.Information) {
        // API limit - fallback to local
        const allStocks = Object.entries(stockSymbols).map(([symbol, name]) => ({
          symbol: symbol.replace("^", "").replace(".NS", ""),
          name,
        }));
        const matches = allStocks.filter(
          stock => stock.name.toLowerCase().includes(query.toLowerCase()) || 
                   stock.symbol.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10);
        return res.json(matches);
      }
      
      const matches = (data.bestMatches || [])
        .filter((m: any) => m["4. region"] === "India/Bombay" || m["4. region"]?.includes("India"))
        .slice(0, 10)
        .map((m: any) => ({
          symbol: m["1. symbol"].replace(".BSE", "").replace(".NSE", ""),
          name: m["2. name"],
          exchange: m["4. region"]
        }));
      
      res.json(matches);
    } catch (error) {
      console.error("Alpha Vantage search error:", error);
      res.status(500).json({ message: "Failed to search" });
    }
  });

  // Check Alpha Vantage API status
  app.get("/api/alphavantage/status", async (_req: Request, res: Response) => {
    res.json({
      configured: !!ALPHAVANTAGE_API_KEY,
      source: ALPHAVANTAGE_API_KEY ? "alphavantage" : "yahoo_fallback"
    });
  });

  // Financial News Routes
  const sampleNewsEnglish = [
    {
      id: "1",
      title: "Nifty 50 hits new all-time high as IT stocks surge on global tech rally",
      summary: "The benchmark Nifty 50 index touched a fresh all-time high of 24,500 points driven by strong buying in IT heavyweights like TCS, Infosys, and Wipro following positive global cues.",
      category: "Markets",
      tag: "BREAKING",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format",
      source: "Market Watch",
      publishedAt: new Date().toISOString(),
      url: "#"
    },
    {
      id: "2",
      title: "RBI keeps repo rate unchanged at 6.5%, maintains growth outlook",
      summary: "Reserve Bank of India maintains status quo on policy rates for the eighth consecutive time, citing inflation concerns while keeping GDP growth forecast at 7%.",
      category: "Economy",
      tag: "RBI UPDATE",
      imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format",
      source: "Economic Times",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      url: "#"
    },
    {
      id: "3",
      title: "Reliance Industries announces major green energy investment of Rs 75,000 crore",
      summary: "Mukesh Ambani-led Reliance Industries unveils ambitious plans to invest Rs 75,000 crore in renewable energy projects over the next 5 years.",
      category: "Business",
      tag: "EXCLUSIVE",
      imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format",
      source: "Business Standard",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      url: "#"
    },
    {
      id: "4",
      title: "Gold prices surge to Rs 72,500 per 10 grams on safe-haven demand",
      summary: "Gold prices hit record highs in Indian markets amid global uncertainties and strong festive demand. Silver also gains 2% to Rs 88,000 per kg.",
      category: "Commodities",
      tag: "COMMODITY",
      imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&auto=format",
      source: "Commodity Insights",
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      url: "#"
    },
    {
      id: "5",
      title: "FIIs turn net buyers after 3 months, pump Rs 15,000 crore into Indian equities",
      summary: "Foreign Institutional Investors reverse their selling trend and inject significant capital into Indian markets, boosting sentiment across sectors.",
      category: "Markets",
      tag: "FII/DII",
      imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format",
      source: "Mint",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      url: "#"
    },
    {
      id: "6",
      title: "HDFC Bank Q3 results: Net profit rises 20% to Rs 16,372 crore",
      summary: "India's largest private sector lender reports strong quarterly results with healthy loan growth and improved asset quality metrics.",
      category: "Banking",
      tag: "RESULTS",
      imageUrl: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&auto=format",
      source: "CNBC-TV18",
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      url: "#"
    },
    {
      id: "7",
      title: "Tata Motors EV sales cross 1 lakh units milestone in India",
      summary: "Tata Motors becomes the first Indian automaker to achieve 1 lakh electric vehicle sales, with Nexon EV leading the charge in the domestic market.",
      category: "Auto",
      tag: "AUTO",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format",
      source: "Auto Today",
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      url: "#"
    },
    {
      id: "8",
      title: "SIP inflows hit record Rs 21,000 crore in November 2024",
      summary: "Systematic Investment Plans continue their strong momentum with record monthly inflows, reflecting strong retail investor participation in mutual funds.",
      category: "Mutual Funds",
      tag: "MF EXCLUSIVE",
      imageUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&auto=format",
      source: "Value Research",
      publishedAt: new Date(Date.now() - 25200000).toISOString(),
      url: "#"
    }
  ];

  const sampleNewsHindi = [
    {
      id: "1",
      title: "निफ्टी 50 ने बनाया नया ऑल-टाइम हाई, IT स्टॉक्स में तेजी",
      summary: "बेंचमार्क निफ्टी 50 इंडेक्स ने 24,500 अंकों का नया सर्वकालिक उच्च स्तर छुआ। TCS, इंफोसिस और विप्रो जैसे IT हैवीवेट्स में जोरदार खरीदारी देखी गई।",
      category: "बाजार",
      tag: "ब्रेकिंग",
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format",
      source: "मार्केट वॉच",
      publishedAt: new Date().toISOString(),
      url: "#"
    },
    {
      id: "2",
      title: "RBI ने रेपो रेट 6.5% पर बरकरार रखा, विकास का अनुमान जारी",
      summary: "भारतीय रिजर्व बैंक ने लगातार आठवीं बार नीतिगत दरों में कोई बदलाव नहीं किया। मुद्रास्फीति की चिंताओं का हवाला देते हुए GDP ग्रोथ का अनुमान 7% रखा।",
      category: "अर्थव्यवस्था",
      tag: "RBI अपडेट",
      imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format",
      source: "इकोनॉमिक टाइम्स",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      url: "#"
    },
    {
      id: "3",
      title: "रिलायंस इंडस्ट्रीज ने 75,000 करोड़ के ग्रीन एनर्जी निवेश की घोषणा की",
      summary: "मुकेश अंबानी की अगुवाई वाली रिलायंस इंडस्ट्रीज ने अगले 5 वर्षों में अक्षय ऊर्जा परियोजनाओं में 75,000 करोड़ रुपये निवेश करने की महत्वाकांक्षी योजना का अनावरण किया।",
      category: "बिजनेस",
      tag: "एक्सक्लूसिव",
      imageUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format",
      source: "बिजनेस स्टैंडर्ड",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      url: "#"
    },
    {
      id: "4",
      title: "सोने की कीमतें 72,500 रुपये प्रति 10 ग्राम के रिकॉर्ड स्तर पर",
      summary: "वैश्विक अनिश्चितताओं और त्योहारी मांग के बीच भारतीय बाजारों में सोने की कीमतें रिकॉर्ड ऊंचाई पर पहुंचीं। चांदी भी 2% बढ़कर 88,000 रुपये प्रति किलो हुई।",
      category: "कमोडिटी",
      tag: "कमोडिटी",
      imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800&auto=format",
      source: "कमोडिटी इनसाइट्स",
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      url: "#"
    },
    {
      id: "5",
      title: "FII ने 3 महीने बाद की जोरदार खरीदारी, भारतीय बाजारों में डाले 15,000 करोड़",
      summary: "विदेशी संस्थागत निवेशकों ने अपनी बिकवाली का रुख बदला और भारतीय बाजारों में भारी पूंजी लगाई, जिससे सभी सेक्टर्स में सेंटीमेंट मजबूत हुआ।",
      category: "बाजार",
      tag: "FII/DII",
      imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format",
      source: "मिंट",
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      url: "#"
    },
    {
      id: "6",
      title: "HDFC बैंक Q3 नतीजे: शुद्ध लाभ 20% बढ़कर 16,372 करोड़ रुपये",
      summary: "भारत के सबसे बड़े निजी क्षेत्र के बैंक ने मजबूत तिमाही नतीजे दर्ज किए। स्वस्थ ऋण वृद्धि और बेहतर परिसंपत्ति गुणवत्ता मैट्रिक्स के साथ।",
      category: "बैंकिंग",
      tag: "रिजल्ट्स",
      imageUrl: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=800&auto=format",
      source: "CNBC-TV18",
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      url: "#"
    },
    {
      id: "7",
      title: "टाटा मोटर्स की EV बिक्री ने भारत में 1 लाख यूनिट का माइलस्टोन पार किया",
      summary: "टाटा मोटर्स 1 लाख इलेक्ट्रिक वाहन बिक्री हासिल करने वाली पहली भारतीय ऑटोमेकर बनी। घरेलू बाजार में नेक्सॉन EV ने बढ़त बनाई।",
      category: "ऑटो",
      tag: "ऑटो",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format",
      source: "ऑटो टुडे",
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      url: "#"
    },
    {
      id: "8",
      title: "नवंबर 2024 में SIP इनफ्लो रिकॉर्ड 21,000 करोड़ रुपये पहुंचा",
      summary: "सिस्टमैटिक इन्वेस्टमेंट प्लान में रिकॉर्ड मासिक इनफ्लो जारी है, जो म्यूचुअल फंड में मजबूत खुदरा निवेशक भागीदारी को दर्शाता है।",
      category: "म्यूचुअल फंड",
      tag: "MF एक्सक्लूसिव",
      imageUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&auto=format",
      source: "वैल्यू रिसर्च",
      publishedAt: new Date(Date.now() - 25200000).toISOString(),
      url: "#"
    }
  ];

  // Get financial news
  app.get("/api/news", async (req: Request, res: Response) => {
    try {
      const language = (req.query.lang as string) || "en";
      const category = req.query.category as string;
      const limit = parseInt(req.query.limit as string) || 10;
      const maxHoursOld = parseInt(req.query.maxHoursOld as string) || 0;

      // Category-specific query mapping
      const categoryQueryMap: Record<string, string> = {
        all: "stock market India",
        markets: "Nifty Sensex BSE NSE",
        economy: "RBI inflation GDP economy India",
        business: "business India companies",
        commodities: "gold crude oil commodity prices",
        banking: "bank HDFC ICICI SBI",
        auto: "Tata Motors Maruti automobile",
        "mutual-funds": "mutual fund SIP investment"
      };

      const query = categoryQueryMap[category] || "stock market India";
      
      // Fetch from GNews (with MoneyControl fallback)
      let news = await fetchNewsFromGNews(language);
      
      // If no news from API or cache issues, use fallback sample data
      if (news.length === 0) {
        news = language === "hi" ? [...sampleNewsHindi] : [...sampleNewsEnglish];
      }

      // Sort news by published time (newest first)
      news.sort((a: any, b: any) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateB - dateA;
      });

      // Filter by time if maxHoursOld is specified
      if (maxHoursOld > 0) {
        const cutoffTime = Date.now() - (maxHoursOld * 60 * 60 * 1000);
        news = news.filter((item: any) => new Date(item.publishedAt).getTime() > cutoffTime);
      }

      res.json({
        news: news.slice(0, limit),
        language,
        total: news.length
      });
    } catch (error) {
      console.error("News fetch error:", error);
      res.status(500).json({ message: "Failed to fetch news" });
    }
  });

  // Get featured news (top stories)
  app.get("/api/news/featured", async (req: Request, res: Response) => {
    try {
      const language = (req.query.lang as string) || "en";
      
      // Fetch featured news from GNews
      let news = await fetchNewsFromGNews(language);
      
      // Fallback to sample data if API fails
      if (news.length === 0) {
        news = language === "hi" ? sampleNewsHindi : sampleNewsEnglish;
      }

      // Sort news by published time (newest first)
      news.sort((a: any, b: any) => {
        const dateA = new Date(a.publishedAt).getTime();
        const dateB = new Date(b.publishedAt).getTime();
        return dateB - dateA;
      });
      
      res.json({
        featured: news[0] || {},
        topStories: news.slice(1, 4),
        language
      });
    } catch (error) {
      console.error("Featured news error:", error);
      res.status(500).json({ message: "Failed to fetch featured news" });
    }
  });

  // Get news categories
  app.get("/api/news/categories", async (_req: Request, res: Response) => {
    res.json({
      categories: [
        { id: "all", labelEn: "All News", labelHi: "सभी समाचार" },
        { id: "markets", labelEn: "Markets", labelHi: "बाजार" },
        { id: "economy", labelEn: "Economy", labelHi: "अर्थव्यवस्था" },
        { id: "business", labelEn: "Business", labelHi: "बिजनेस" },
        { id: "commodities", labelEn: "Commodities", labelHi: "कमोडिटी" },
        { id: "banking", labelEn: "Banking", labelHi: "बैंकिंग" },
        { id: "auto", labelEn: "Auto", labelHi: "ऑटो" },
        { id: "mutual-funds", labelEn: "Mutual Funds", labelHi: "म्यूचुअल फंड" }
      ]
    });
  });

  // YouTube Educational Videos API
  const sampleEducationalVideos = [
    {
      id: "stock-basics-1",
      title: "Stock Market for Beginners - Complete Guide 2024",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format",
      channelName: "Zerodha Varsity",
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: "1.2M",
      duration: "25:30",
      category: "basics",
    },
    {
      id: "technical-1",
      title: "Technical Analysis - Candlestick Patterns Explained",
      thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format",
      channelName: "CA Rachana Ranade",
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: "850K",
      duration: "32:15",
      category: "technical",
    },
    {
      id: "ipo-1",
      title: "How to Apply for IPO - Step by Step Guide",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format",
      channelName: "Pranjal Kamra",
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: "650K",
      duration: "18:45",
      category: "ipo",
    },
    {
      id: "mutual-1",
      title: "Best Mutual Funds for SIP in 2024",
      thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&auto=format",
      channelName: "Asset Yogi",
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: "1.5M",
      duration: "22:10",
      category: "mutual-funds",
    },
    {
      id: "technical-2",
      title: "Support and Resistance Trading Strategy",
      thumbnail: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&auto=format",
      channelName: "Market Gurukul",
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: "420K",
      duration: "28:30",
      category: "technical",
    },
    {
      id: "basics-2",
      title: "Understanding P/E Ratio - Valuation Basics",
      thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format",
      channelName: "Finology",
      publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: "780K",
      duration: "15:20",
      category: "basics",
    },
    {
      id: "ipo-2",
      title: "IPO vs Direct Listing - Which is Better?",
      thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format",
      channelName: "Groww",
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: "320K",
      duration: "12:45",
      category: "ipo",
    },
    {
      id: "mutual-2",
      title: "Index Funds vs Active Funds - Detailed Comparison",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format",
      channelName: "Pushkar Raj Thakur",
      publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      viewCount: "950K",
      duration: "20:55",
      category: "mutual-funds",
    },
  ];

  app.get("/api/youtube/videos", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string || "all";
      
      // Filter by category if specified
      let videos = [...sampleEducationalVideos];
      if (category !== "all") {
        videos = videos.filter(v => v.category === category);
      }
      
      // Sort by publishedAt (newest first)
      videos.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      
      res.json({
        videos,
        category,
        total: videos.length,
        source: "sample-data"
      });
    } catch (error) {
      console.error("YouTube videos error:", error);
      res.status(500).json({ message: "Failed to fetch videos", videos: sampleEducationalVideos });
    }
  });

  // Payment Routes
  app.post("/api/payments", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const { planId, amount, screenshotUrl } = req.body;

      // Validate planId
      const validPlans = ["basic", "pro"];
      if (!validPlans.includes(planId)) {
        return res.status(400).json({ message: "Invalid plan selected" });
      }

      // Validate amount
      const planPrices: Record<string, number> = { basic: 99, pro: 999 };
      if (amount !== planPrices[planId]) {
        return res.status(400).json({ message: "Invalid payment amount" });
      }

      // Validate screenshot - must be a base64 image
      if (!screenshotUrl || !screenshotUrl.startsWith("data:image/")) {
        return res.status(400).json({ message: "Valid payment screenshot is required" });
      }

      // Check screenshot size (max 5MB base64)
      if (screenshotUrl.length > 5 * 1024 * 1024) {
        return res.status(400).json({ message: "Screenshot file too large (max 5MB)" });
      }

      const payment = await storage.createPayment({
        userId: req.session.userId,
        planId,
        amount,
        screenshotUrl,
        status: "pending",
      });

      res.json(payment);
    } catch (error) {
      console.error("Create payment error:", error);
      res.status(500).json({ message: "Failed to create payment" });
    }
  });
  
  // Protected content routes - require authentication
  app.get("/api/content/:category", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Please login to access content" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user?.isVerified) {
        return res.status(401).json({ message: "Please verify your account to access content" });
      }

      // Return content based on category
      const category = req.params.category;
      const validCategories = ["basic", "intermediate", "advanced", "algo"];
      if (!validCategories.includes(category)) {
        return res.status(400).json({ message: "Invalid content category" });
      }

      // For now, return placeholder content structure
      res.json({
        category,
        accessible: true,
        message: "Content access granted",
      });
    } catch (error) {
      console.error("Get content error:", error);
      res.status(500).json({ message: "Failed to get content" });
    }
  });

  app.get("/api/payments/user", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const payments = await storage.getPaymentsByUser(req.session.userId);
      res.json(payments);
    } catch (error) {
      console.error("Get payments error:", error);
      res.status(500).json({ message: "Failed to get payments" });
    }
  });

  // Chat Routes
  app.get("/api/chat/messages", async (req: Request, res: Response) => {
    try {
      const sessionId = req.query.sessionId as string;
      if (!sessionId) {
        return res.status(400).json({ message: "Session ID is required" });
      }

      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Get chat messages error:", error);
      res.status(500).json({ message: "Failed to get messages" });
    }
  });

  app.post("/api/chat/messages", async (req: Request, res: Response) => {
    try {
      const { message, sessionId, isAdmin } = req.body;

      const chatMessage = await storage.createChatMessage({
        userId: req.session.userId || null,
        sessionId,
        message,
        isAdmin: isAdmin || false,
      });

      res.json(chatMessage);
    } catch (error) {
      console.error("Create chat message error:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Lead capture endpoint (for calculators and CTAs)
  app.post("/api/leads", async (req: Request, res: Response) => {
    try {
      const { fullName, mobile, email, experience, source, notes } = req.body;

      // Validate required fields
      if (!fullName || fullName.length < 2) {
        return res.status(400).json({ message: "Name must be at least 2 characters" });
      }
      if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
        return res.status(400).json({ message: "Enter valid 10-digit Indian mobile number" });
      }

      // Check if lead already exists
      let lead = await storage.getLeadByMobile(mobile);
      if (lead) {
        // Append new notes to existing notes
        const updatedNotes = lead.notes
          ? `${lead.notes}\n---\n${notes || ""}`
          : notes || null;
        lead = await storage.updateLead(lead.id, {
          notes: updatedNotes,
          source: source || lead.source,
        });
      } else {
        // Create new lead with defaults
        lead = await storage.createLead({
          fullName,
          mobile,
          email: email || null,
          experience: experience || "beginner",
          source: source || "website",
          notes: notes || null,
        });
      }

      res.json({ message: "Thank you for your interest!", lead });
    } catch (error) {
      console.error("Create lead error:", error);
      res.status(500).json({ message: "Failed to submit" });
    }
  });

  // Admin Routes
  app.get("/api/admin/leads", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const leads = await storage.getAllLeads();
      res.json(leads);
    } catch (error) {
      console.error("Get leads error:", error);
      res.status(500).json({ message: "Failed to get leads" });
    }
  });

  app.get("/api/admin/payments", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const payments = await storage.getAllPayments();
      res.json(payments);
    } catch (error) {
      console.error("Get payments error:", error);
      res.status(500).json({ message: "Failed to get payments" });
    }
  });

  app.patch("/api/admin/payments/:id/approve", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const payment = await storage.updatePaymentStatus(req.params.id, "approved");
      res.json(payment);
    } catch (error) {
      console.error("Approve payment error:", error);
      res.status(500).json({ message: "Failed to approve payment" });
    }
  });

  app.patch("/api/admin/payments/:id/reject", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const payment = await storage.updatePaymentStatus(req.params.id, "rejected");
      res.json(payment);
    } catch (error) {
      console.error("Reject payment error:", error);
      res.status(500).json({ message: "Failed to reject payment" });
    }
  });

  app.get("/api/admin/chats", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const messages = await storage.getAllChatMessages();
      res.json(messages);
    } catch (error) {
      console.error("Get chats error:", error);
      res.status(500).json({ message: "Failed to get chats" });
    }
  });

  // Admin - Get all verified users
  app.get("/api/admin/verified-users", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const verifiedUsers = await storage.getVerifiedUsers();
      res.json(verifiedUsers);
    } catch (error) {
      console.error("Get verified users error:", error);
      res.status(500).json({ message: "Failed to get verified users" });
    }
  });

  // Startup Routes
  app.post("/api/startups", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Please login to list your startup" });
      }

      const { startupName, founderName, mobile, email, industry, investmentRequired, businessModel, revenueProjection, stage, pitchDeckUrl } = req.body;

      if (!startupName || !founderName || !mobile || !email || !industry || !investmentRequired || !businessModel || !stage) {
        return res.status(400).json({ message: "All required fields must be filled" });
      }

      const startup = await storage.createStartup({
        userId: req.session.userId,
        startupName,
        founderName,
        mobile,
        email,
        industry,
        investmentRequired,
        businessModel,
        revenueProjection: revenueProjection || null,
        stage,
        pitchDeckUrl: pitchDeckUrl || null,
        status: "under_review",
      });

      res.json(startup);
    } catch (error) {
      console.error("Create startup error:", error);
      res.status(500).json({ message: "Failed to create startup listing" });
    }
  });

  app.get("/api/startups", async (req: Request, res: Response) => {
    try {
      const startups = await storage.getLiveStartups();
      res.json(startups);
    } catch (error) {
      console.error("Get startups error:", error);
      res.status(500).json({ message: "Failed to get startups" });
    }
  });

  app.get("/api/startups/my", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const startups = await storage.getStartupsByUser(req.session.userId);
      res.json(startups);
    } catch (error) {
      console.error("Get my startups error:", error);
      res.status(500).json({ message: "Failed to get startups" });
    }
  });

  app.get("/api/startups/:id", async (req: Request, res: Response) => {
    try {
      const startup = await storage.getStartup(req.params.id);
      if (!startup) {
        return res.status(404).json({ message: "Startup not found" });
      }
      res.json(startup);
    } catch (error) {
      console.error("Get startup error:", error);
      res.status(500).json({ message: "Failed to get startup" });
    }
  });

  // Investor Routes
  app.post("/api/investors", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Please login to register as investor" });
      }

      const existing = await storage.getInvestorByUser(req.session.userId);
      if (existing) {
        return res.json(existing);
      }

      const { name, mobile, email, investmentAmountRange, interestedIndustry, investmentType } = req.body;

      if (!name || !mobile || !email || !investmentAmountRange || !interestedIndustry || !investmentType) {
        return res.status(400).json({ message: "All required fields must be filled" });
      }

      const investor = await storage.createInvestor({
        userId: req.session.userId,
        name,
        mobile,
        email,
        investmentAmountRange,
        interestedIndustry,
        investmentType,
      });

      res.json(investor);
    } catch (error) {
      console.error("Create investor error:", error);
      res.status(500).json({ message: "Failed to register investor" });
    }
  });

  app.get("/api/investors/me", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const investor = await storage.getInvestorByUser(req.session.userId);
      res.json(investor || null);
    } catch (error) {
      console.error("Get investor error:", error);
      res.status(500).json({ message: "Failed to get investor profile" });
    }
  });

  // Investor Interest
  app.post("/api/investor-interests", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const investor = await storage.getInvestorByUser(req.session.userId);
      if (!investor) {
        return res.status(400).json({ message: "Please register as investor first" });
      }

      const { startupId } = req.body;
      if (!startupId) {
        return res.status(400).json({ message: "Startup ID is required" });
      }

      const interest = await storage.createInvestorInterest({
        investorId: investor.id,
        startupId,
        status: "interested",
      });

      res.json(interest);
    } catch (error) {
      console.error("Create interest error:", error);
      res.status(500).json({ message: "Failed to mark interest" });
    }
  });

  // Admin Startup/Investor Routes
  app.get("/api/admin/startups", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const startups = await storage.getAllStartups();
      res.json(startups);
    } catch (error) {
      console.error("Get all startups error:", error);
      res.status(500).json({ message: "Failed to get startups" });
    }
  });

  app.patch("/api/admin/startups/:id/status", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const { status } = req.body;
      if (!["under_review", "live", "closed", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const startup = await storage.updateStartupStatus(req.params.id, status);
      res.json(startup);
    } catch (error) {
      console.error("Update startup status error:", error);
      res.status(500).json({ message: "Failed to update startup status" });
    }
  });

  app.get("/api/admin/investors", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const investors = await storage.getAllInvestors();
      res.json(investors);
    } catch (error) {
      console.error("Get all investors error:", error);
      res.status(500).json({ message: "Failed to get investors" });
    }
  });

  app.get("/api/admin/startup-interests/:startupId", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const interests = await storage.getInterestsByStartup(req.params.startupId);
      res.json(interests);
    } catch (error) {
      console.error("Get startup interests error:", error);
      res.status(500).json({ message: "Failed to get interests" });
    }
  });

  // IPO Routes - Real-time IPO data from verified sources
  // IMPORTANT: Specific routes must come before parameterized routes
  app.get("/api/ipo", async (req: Request, res: Response) => {
    try {
      const forceRefresh = req.query.refresh === "true";
      const ipoData = await fetchIPOData(forceRefresh);
      res.json(ipoData);
    } catch (error) {
      console.error("IPO fetch error:", error);
      res.status(503).json({ 
        message: "IPO data temporarily unavailable",
        isStale: true,
        ipos: [],
        lastUpdated: null
      });
    }
  });

  app.post("/api/ipo/refresh", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      const user = await storage.getUser(req.session.userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Not authorized" });
      }

      clearIPOCache();
      const ipoData = await fetchIPOData(true);
      res.json({ 
        message: "IPO data refreshed successfully",
        count: ipoData.ipos.length,
        source: ipoData.source
      });
    } catch (error) {
      console.error("IPO refresh error:", error);
      res.status(500).json({ message: "Failed to refresh IPO data" });
    }
  });

  // IPO News - Using existing news infrastructure with IPO focus
  app.get("/api/ipo/news", async (req: Request, res: Response) => {
    try {
      const cacheKey = "ipo-news";
      const cached = newsCache[cacheKey];
      
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return res.json({
          articles: cached.data,
          lastUpdated: new Date(cached.timestamp).toISOString()
        });
      }

      // Fetch IPO-specific news using GNews with IPO keyword
      const GNEWS_API_KEY = process.env.GNEWS_API_KEY;
      let articles: any[] = [];

      if (GNEWS_API_KEY) {
        try {
          const url = `https://gnews.io/api/v4/search?q=IPO+India&lang=en&country=in&max=10&apikey=${GNEWS_API_KEY}`;
          const response = await axios.get(url, { timeout: 8000 });
          
          if (response.data?.articles) {
            articles = response.data.articles.map((item: any, index: number) => ({
              id: `ipo-news-${index}`,
              title: item.title,
              summary: item.description || "IPO news article",
              source: item.source.name,
              publishedAt: item.publishedAt,
              url: item.url,
              imageUrl: item.image
            }));
          }
        } catch (gnewsError) {
          console.log("GNews IPO search failed, using MoneyControl fallback");
        }
      }

      // Fallback to MoneyControl IPO section
      if (articles.length === 0) {
        try {
          const mcResponse = await axios.get("https://www.moneycontrol.com/ipo/", {
            headers: { "User-Agent": "Mozilla/5.0" },
            timeout: 8000
          });
          const $ = cheerio.load(mcResponse.data);
          
          $("div.newslist a, article a, .news-item a").slice(0, 8).each((i, el) => {
            const title = $(el).text().trim();
            if (title && title.length > 20) {
              articles.push({
                id: `mc-ipo-${i}`,
                title,
                summary: "IPO news from MoneyControl",
                source: "MoneyControl",
                publishedAt: new Date().toISOString(),
                url: $(el).attr("href") || "#"
              });
            }
          });
        } catch (mcError) {
          console.log("MoneyControl IPO scraping failed");
        }
      }

      newsCache[cacheKey] = { data: articles, timestamp: Date.now() };
      
      res.json({
        articles,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error("IPO news fetch error:", error);
      res.status(500).json({ message: "Failed to fetch IPO news", articles: [] });
    }
  });

  // IPO Detail route - MUST come after all specific /api/ipo/* routes
  app.get("/api/ipo/:id", async (req: Request, res: Response) => {
    try {
      const ipoData = await fetchIPOData();
      const ipo = ipoData.ipos.find(i => i.id === req.params.id);
      
      if (!ipo) {
        return res.status(404).json({ message: "IPO not found" });
      }
      
      res.json({
        ...ipo,
        lastUpdated: ipoData.lastUpdated,
        isStale: ipoData.isStale
      });
    } catch (error) {
      console.error("IPO detail fetch error:", error);
      res.status(503).json({ message: "IPO data temporarily unavailable" });
    }
  });

  // Start IPO refresh background job
  startIPORefreshJob();

  // Economic Calendar API routes
  app.get("/api/economic-calendar", async (req: Request, res: Response) => {
    try {
      const calendarData = await fetchEconomicCalendar();
      res.json(calendarData);
    } catch (error) {
      console.error("Economic calendar fetch error:", error);
      res.status(500).json({ 
        message: "Failed to fetch economic calendar",
        events: [],
        lastUpdated: new Date().toISOString(),
        isStale: true
      });
    }
  });

  // Start economic calendar refresh job
  startCalendarRefreshJob();

  // ==================== PAPER TRADING ROUTES ====================
  
  // Get or create paper trading account
  app.get("/api/paper-trade/account", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Please login to access paper trading" });
      }

      let account = await storage.getPaperTradingAccount(req.session.userId);
      
      if (!account) {
        account = await storage.createPaperTradingAccount(req.session.userId);
      }

      const holdings = await storage.getPaperHoldings(account.id);
      const trades = await storage.getPaperTrades(account.id);

      res.json({
        account,
        holdings,
        trades: trades.slice(0, 50)
      });
    } catch (error) {
      console.error("Paper trading account error:", error);
      res.status(500).json({ message: "Failed to fetch paper trading account" });
    }
  });

  // Execute a paper trade (buy/sell)
  app.post("/api/paper-trade/execute", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Please login to trade" });
      }

      const { symbol, stockName, type, quantity, price } = req.body;

      if (!symbol || !stockName || !type || !quantity || !price) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      if (!["buy", "sell"].includes(type)) {
        return res.status(400).json({ message: "Invalid trade type" });
      }

      if (quantity <= 0 || price <= 0) {
        return res.status(400).json({ message: "Invalid quantity or price" });
      }

      let account = await storage.getPaperTradingAccount(req.session.userId);
      if (!account) {
        account = await storage.createPaperTradingAccount(req.session.userId);
      }

      const totalValue = Math.round(quantity * price * 100); // Convert to paise
      const priceInPaise = Math.round(price * 100);

      if (type === "buy") {
        if (account.virtualBalance < totalValue) {
          return res.status(400).json({ message: "Insufficient balance" });
        }

        // Deduct balance
        await storage.updatePaperTradingBalance(account.id, account.virtualBalance - totalValue);

        // Add to holdings
        await storage.addOrUpdateHolding(account.id, symbol, stockName, quantity, priceInPaise);

        // Record trade
        await storage.recordPaperTrade(account.id, symbol, stockName, "buy", quantity, priceInPaise, totalValue);

      } else if (type === "sell") {
        const holding = await storage.getHoldingBySymbol(account.id, symbol);
        
        if (!holding || holding.quantity < quantity) {
          return res.status(400).json({ message: "Insufficient shares to sell" });
        }

        // Add balance
        await storage.updatePaperTradingBalance(account.id, account.virtualBalance + totalValue);

        // Reduce holdings
        await storage.reduceHolding(account.id, symbol, quantity, priceInPaise);

        // Record trade
        await storage.recordPaperTrade(account.id, symbol, stockName, "sell", quantity, priceInPaise, totalValue);
      }

      // Get updated account
      const updatedAccount = await storage.getPaperTradingAccount(req.session.userId);
      const holdings = await storage.getPaperHoldings(account.id);

      res.json({
        success: true,
        account: updatedAccount,
        holdings,
        message: `${type === "buy" ? "Bought" : "Sold"} ${quantity} shares of ${symbol}`
      });
    } catch (error) {
      console.error("Paper trade execution error:", error);
      res.status(500).json({ message: "Trade execution failed" });
    }
  });

  // Reset paper trading account
  app.post("/api/paper-trade/reset", async (req: Request, res: Response) => {
    try {
      if (!req.session.userId) {
        return res.status(401).json({ message: "Please login" });
      }

      await storage.resetPaperTradingAccount(req.session.userId);

      res.json({
        success: true,
        message: "Account reset to ₹10,00,000"
      });
    } catch (error) {
      console.error("Paper trading reset error:", error);
      res.status(500).json({ message: "Failed to reset account" });
    }
  });

  // Get stock quote for paper trading
  app.get("/api/paper-trade/quote/:symbol", async (req: Request, res: Response) => {
    try {
      const symbol = req.params.symbol.toUpperCase();
      
      // Try Alpha Vantage first
      if (ALPHAVANTAGE_API_KEY) {
        try {
          const response = await axios.get(ALPHAVANTAGE_BASE_URL, {
            params: {
              function: "GLOBAL_QUOTE",
              symbol: `${symbol}.BSE`,
              apikey: ALPHAVANTAGE_API_KEY
            },
            timeout: 5000
          });

          if (response.data["Global Quote"] && response.data["Global Quote"]["05. price"]) {
            const quote = response.data["Global Quote"];
            return res.json({
              symbol,
              price: parseFloat(quote["05. price"]),
              change: parseFloat(quote["09. change"] || 0),
              changePercent: parseFloat((quote["10. change percent"] || "0").replace("%", "")),
              high: parseFloat(quote["03. high"] || 0),
              low: parseFloat(quote["04. low"] || 0),
              volume: parseInt(quote["06. volume"] || 0),
              source: "Alpha Vantage"
            });
          }
        } catch (avError) {
          console.log("Alpha Vantage quote failed, using simulated data");
        }
      }

      // Simulated price data for popular Indian stocks
      const mockPrices: Record<string, { price: number; name: string }> = {
        "RELIANCE": { price: 2435.50, name: "Reliance Industries Ltd" },
        "TCS": { price: 3890.25, name: "Tata Consultancy Services" },
        "HDFCBANK": { price: 1678.90, name: "HDFC Bank Ltd" },
        "INFY": { price: 1456.75, name: "Infosys Ltd" },
        "ICICIBANK": { price: 1234.60, name: "ICICI Bank Ltd" },
        "HINDUNILVR": { price: 2567.80, name: "Hindustan Unilever Ltd" },
        "SBIN": { price: 756.45, name: "State Bank of India" },
        "BHARTIARTL": { price: 1543.20, name: "Bharti Airtel Ltd" },
        "ITC": { price: 467.35, name: "ITC Ltd" },
        "KOTAKBANK": { price: 1823.90, name: "Kotak Mahindra Bank" },
        "LT": { price: 3456.80, name: "Larsen & Toubro Ltd" },
        "AXISBANK": { price: 1098.45, name: "Axis Bank Ltd" },
        "WIPRO": { price: 456.70, name: "Wipro Ltd" },
        "ASIANPAINT": { price: 2890.50, name: "Asian Paints Ltd" },
        "MARUTI": { price: 10234.60, name: "Maruti Suzuki India" },
        "TATAMOTORS": { price: 876.90, name: "Tata Motors Ltd" },
        "SUNPHARMA": { price: 1234.50, name: "Sun Pharmaceutical" },
        "NESTLEIND": { price: 24567.80, name: "Nestle India Ltd" },
        "TATASTEEL": { price: 134.50, name: "Tata Steel Ltd" },
        "POWERGRID": { price: 287.60, name: "Power Grid Corporation" }
      };

      const stockData = mockPrices[symbol];
      if (stockData) {
        const randomChange = (Math.random() - 0.5) * 4;
        const adjustedPrice = stockData.price * (1 + randomChange / 100);
        
        return res.json({
          symbol,
          name: stockData.name,
          price: Math.round(adjustedPrice * 100) / 100,
          change: Math.round(randomChange * stockData.price) / 100,
          changePercent: Math.round(randomChange * 100) / 100,
          high: Math.round(adjustedPrice * 1.02 * 100) / 100,
          low: Math.round(adjustedPrice * 0.98 * 100) / 100,
          volume: Math.floor(Math.random() * 1000000) + 100000,
          source: "Simulated"
        });
      }

      // Default for unknown symbols
      res.json({
        symbol,
        name: symbol,
        price: Math.round((100 + Math.random() * 500) * 100) / 100,
        change: 0,
        changePercent: 0,
        source: "Simulated"
      });
    } catch (error) {
      console.error("Quote fetch error:", error);
      res.status(500).json({ message: "Failed to fetch quote" });
    }
  });

  // Search stocks for paper trading
  app.get("/api/paper-trade/search", async (req: Request, res: Response) => {
    try {
      const query = ((req.query.q as string) || "").toUpperCase();
      
      if (!query || query.length < 2) {
        return res.json({ results: [] });
      }

      // Popular Indian stocks list
      const stocks = [
        { symbol: "RELIANCE", name: "Reliance Industries Ltd", sector: "Oil & Gas" },
        { symbol: "TCS", name: "Tata Consultancy Services", sector: "IT" },
        { symbol: "HDFCBANK", name: "HDFC Bank Ltd", sector: "Banking" },
        { symbol: "INFY", name: "Infosys Ltd", sector: "IT" },
        { symbol: "ICICIBANK", name: "ICICI Bank Ltd", sector: "Banking" },
        { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", sector: "FMCG" },
        { symbol: "SBIN", name: "State Bank of India", sector: "Banking" },
        { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", sector: "Telecom" },
        { symbol: "ITC", name: "ITC Ltd", sector: "FMCG" },
        { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", sector: "Banking" },
        { symbol: "LT", name: "Larsen & Toubro Ltd", sector: "Infrastructure" },
        { symbol: "AXISBANK", name: "Axis Bank Ltd", sector: "Banking" },
        { symbol: "WIPRO", name: "Wipro Ltd", sector: "IT" },
        { symbol: "ASIANPAINT", name: "Asian Paints Ltd", sector: "Paints" },
        { symbol: "MARUTI", name: "Maruti Suzuki India", sector: "Auto" },
        { symbol: "TATAMOTORS", name: "Tata Motors Ltd", sector: "Auto" },
        { symbol: "SUNPHARMA", name: "Sun Pharmaceutical", sector: "Pharma" },
        { symbol: "NESTLEIND", name: "Nestle India Ltd", sector: "FMCG" },
        { symbol: "TATASTEEL", name: "Tata Steel Ltd", sector: "Steel" },
        { symbol: "POWERGRID", name: "Power Grid Corporation", sector: "Power" },
        { symbol: "HCLTECH", name: "HCL Technologies", sector: "IT" },
        { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", sector: "Finance" },
        { symbol: "TITAN", name: "Titan Company Ltd", sector: "Consumer" },
        { symbol: "ULTRACEMCO", name: "UltraTech Cement", sector: "Cement" },
        { symbol: "TECHM", name: "Tech Mahindra Ltd", sector: "IT" }
      ];

      const results = stocks.filter(s => 
        s.symbol.includes(query) || 
        s.name.toUpperCase().includes(query)
      ).slice(0, 10);

      res.json({ results });
    } catch (error) {
      console.error("Stock search error:", error);
      res.status(500).json({ results: [] });
    }
  });

  return httpServer;
}
