import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import { storage } from "./storage";
import { leadFormSchema, otpVerifySchema } from "@shared/schema";

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
      const mainSymbols = ["^NSEI", "^NSEBANK", "^BSESN", "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "ICICIBANK.NS", "INFY.NS", "SBIN.NS"];
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

  return httpServer;
}
