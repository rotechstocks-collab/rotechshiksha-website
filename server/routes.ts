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
      console.log(`OTP for ${mobile}: ${otp}`);

      res.json({ message: "OTP sent successfully", mobile });
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

      console.log(`OTP for ${mobile}: ${otp}`);

      res.json({ message: "OTP resent successfully" });
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

      // Get stored OTP
      const storedOtp = await storage.getOtpByMobile(mobile);
      if (!storedOtp) {
        return res.status(400).json({ message: "OTP not found. Please request a new one." });
      }

      if (storedOtp.isUsed) {
        return res.status(400).json({ message: "OTP already used. Please request a new one." });
      }

      if (new Date() > storedOtp.expiresAt) {
        return res.status(400).json({ message: "OTP expired. Please request a new one." });
      }

      if (storedOtp.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      // Mark OTP as used
      await storage.markOtpUsed(storedOtp.id);

      // Get lead and create user
      const lead = await storage.getLeadByMobile(mobile);
      if (!lead) {
        return res.status(400).json({ message: "Lead not found" });
      }

      // Update lead as verified
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

      res.json(user);
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

  // Market Data Routes - fetch from Yahoo Finance public API
  app.get("/api/market/live", async (_req: Request, res: Response) => {
    try {
      // Use Yahoo Finance v7 public endpoint for Indian indices
      const symbols = ["^NSEI", "^NSEBANK", "^BSESN"];
      const results = [];
      
      for (const symbol of symbols) {
        try {
          const response = await fetch(
            `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`
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
              
              let name = "Index";
              if (symbol === "^NSEI") name = "NIFTY 50";
              else if (symbol === "^NSEBANK") name = "BANK NIFTY";
              else if (symbol === "^BSESN") name = "SENSEX";
              
              results.push({
                name,
                symbol: symbol.replace("^", ""),
                price: current,
                change: change,
                changePercent: changePercent,
                open: meta.regularMarketOpen || current,
                high: meta.regularMarketDayHigh || current,
                low: meta.regularMarketDayLow || current,
                prevClose: prev,
              });
            }
          }
        } catch (err) {
          console.error(`Failed to fetch ${symbol}:`, err);
        }
      }
      
      // Fallback to sample data if API fails
      if (results.length === 0) {
        results.push(
          { name: "NIFTY 50", symbol: "NSEI", price: 24180.80, change: 156.35, changePercent: 0.65, open: 24024.45, high: 24225.50, low: 24010.20, prevClose: 24024.45 },
          { name: "BANK NIFTY", symbol: "NSEBANK", price: 52340.15, change: -245.80, changePercent: -0.47, open: 52585.95, high: 52650.00, low: 52280.40, prevClose: 52585.95 },
          { name: "SENSEX", symbol: "BSESN", price: 79820.45, change: 485.25, changePercent: 0.61, open: 79335.20, high: 79950.80, low: 79300.00, prevClose: 79335.20 }
        );
      }
      
      res.json(results);
    } catch (error) {
      console.error("Market data fetch error:", error);
      res.status(500).json({ message: "Failed to fetch market data" });
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

  return httpServer;
}
