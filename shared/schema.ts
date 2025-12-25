import { pgTable, text, varchar, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - OTP based login with mobile number
export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey(),
  fullName: text("full_name").notNull(),
  mobile: text("mobile").notNull().unique(),
  email: text("email"),
  experience: text("experience").notNull(), // beginner, intermediate, advanced
  investmentRange: text("investment_range"),
  userType: text("user_type").default("student"), // student, startup, investor
  source: text("source").default("free"), // free, startup, investor, paid
  isVerified: boolean("is_verified").default(false),
  isAdmin: boolean("is_admin").default(false),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// OTP verification
export const otps = pgTable("otps", {
  id: varchar("id", { length: 36 }).primaryKey(),
  mobile: text("mobile").notNull(),
  otp: text("otp").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  isUsed: boolean("is_used").default(false),
});

// Leads - captured before OTP verification
export const leads = pgTable("leads", {
  id: varchar("id", { length: 36 }).primaryKey(),
  fullName: text("full_name").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email"),
  experience: text("experience").notNull(),
  investmentRange: text("investment_range"),
  userType: text("user_type").default("student"), // student, startup, investor
  source: text("source").default("free"), // free, startup, investor
  notes: text("notes"), // Additional context from forms like SIP calculator
  isVerified: boolean("is_verified").default(false),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Educational content (ebooks, videos)
export const contents = pgTable("contents", {
  id: varchar("id", { length: 36 }).primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // ebook, video
  category: text("category").notNull(), // basic, intermediate, advanced, algo
  url: text("url").notNull(),
  thumbnail: text("thumbnail"),
  isFree: boolean("is_free").default(true),
  order: integer("order").default(0),
});

// Payment plans
export const plans = pgTable("plans", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: text("name").notNull(),
  price: integer("price").notNull(), // in rupees
  description: text("description"),
  features: text("features").notNull(), // JSON array of features
  isPopular: boolean("is_popular").default(false),
});

// User payments
export const payments = pgTable("payments", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  planId: varchar("plan_id", { length: 36 }).notNull(),
  amount: integer("amount").notNull(),
  screenshotUrl: text("screenshot_url"),
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

// Chat messages
export const chatMessages = pgTable("chat_messages", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }),
  sessionId: text("session_id").notNull(),
  message: text("message").notNull(),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Startups - for Tata Funding / Startup Connect module
export const startups = pgTable("startups", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  startupName: text("startup_name").notNull(),
  founderName: text("founder_name").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email").notNull(),
  industry: text("industry").notNull(),
  investmentRequired: integer("investment_required").notNull(),
  businessModel: text("business_model").notNull(),
  revenueProjection: text("revenue_projection"),
  stage: text("stage").notNull(), // idea, early, growth
  pitchDeckUrl: text("pitch_deck_url"),
  status: text("status").notNull().default("under_review"), // under_review, live, closed, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

// Investors - for investment interest tracking
export const investors = pgTable("investors", {
  id: varchar("id", { length: 36 }).primaryKey(),
  userId: varchar("user_id", { length: 36 }).notNull(),
  name: text("name").notNull(),
  mobile: text("mobile").notNull(),
  email: text("email").notNull(),
  investmentAmountRange: text("investment_amount_range").notNull(),
  interestedIndustry: text("interested_industry").notNull(),
  investmentType: text("investment_type").notNull(), // equity, debt, both
  createdAt: timestamp("created_at").defaultNow(),
});

// Investor interest in startups
export const investorInterests = pgTable("investor_interests", {
  id: varchar("id", { length: 36 }).primaryKey(),
  investorId: varchar("investor_id", { length: 36 }).notNull(),
  startupId: varchar("startup_id", { length: 36 }).notNull(),
  status: text("status").notNull().default("interested"), // interested, contacted
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertOtpSchema = createInsertSchema(otps).omit({ id: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true, isVerified: true });
export const insertContentSchema = createInsertSchema(contents).omit({ id: true });
export const insertPlanSchema = createInsertSchema(plans).omit({ id: true });
export const insertPaymentSchema = createInsertSchema(payments).omit({ id: true, createdAt: true });
export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true, createdAt: true });
export const insertStartupSchema = createInsertSchema(startups).omit({ id: true, createdAt: true });
export const insertInvestorSchema = createInsertSchema(investors).omit({ id: true, createdAt: true });
export const insertInvestorInterestSchema = createInsertSchema(investorInterests).omit({ id: true, createdAt: true });

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Otp = typeof otps.$inferSelect;
export type InsertOtp = z.infer<typeof insertOtpSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Content = typeof contents.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;
export type Plan = typeof plans.$inferSelect;
export type InsertPlan = z.infer<typeof insertPlanSchema>;
export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type Startup = typeof startups.$inferSelect;
export type InsertStartup = z.infer<typeof insertStartupSchema>;
export type Investor = typeof investors.$inferSelect;
export type InsertInvestor = z.infer<typeof insertInvestorSchema>;
export type InvestorInterest = typeof investorInterests.$inferSelect;
export type InsertInvestorInterest = z.infer<typeof insertInvestorInterestSchema>;

// Lead capture form schema with validation
export const leadFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile number"),
  email: z.string().email("Enter valid email").optional().or(z.literal("")),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  investmentRange: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// OTP verification schema
export const otpVerifySchema = z.object({
  mobile: z.string(),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export type OtpVerifyData = z.infer<typeof otpVerifySchema>;
