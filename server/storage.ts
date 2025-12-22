import {
  users,
  leads,
  otps,
  payments,
  chatMessages,
  type User,
  type InsertUser,
  type Lead,
  type InsertLead,
  type Otp,
  type InsertOtp,
  type Payment,
  type InsertPayment,
  type ChatMessage,
  type InsertChatMessage,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByMobile(mobile: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User | undefined>;

  // Leads
  getLead(id: string): Promise<Lead | undefined>;
  getLeadByMobile(mobile: string): Promise<Lead | undefined>;
  getAllLeads(): Promise<Lead[]>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, data: Partial<Lead>): Promise<Lead | undefined>;

  // OTPs
  createOtp(otp: InsertOtp): Promise<Otp>;
  getOtpByMobile(mobile: string): Promise<Otp | undefined>;
  markOtpUsed(id: string): Promise<void>;

  // Payments
  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentsByUser(userId: string): Promise<Payment[]>;
  getAllPayments(): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePaymentStatus(id: string, status: string): Promise<Payment | undefined>;

  // Chat Messages
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  getAllChatMessages(): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByMobile(mobile: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.mobile, mobile));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const [user] = await db
      .insert(users)
      .values({ ...insertUser, id })
      .returning();
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Leads
  async getLead(id: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead || undefined;
  }

  async getLeadByMobile(mobile: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.mobile, mobile));
    return lead || undefined;
  }

  async getAllLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const [lead] = await db
      .insert(leads)
      .values({ ...insertLead, id })
      .returning();
    return lead;
  }

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead | undefined> {
    const [lead] = await db
      .update(leads)
      .set(data)
      .where(eq(leads.id, id))
      .returning();
    return lead || undefined;
  }

  // OTPs
  async createOtp(insertOtp: InsertOtp): Promise<Otp> {
    const id = randomUUID();
    const [otp] = await db
      .insert(otps)
      .values({ ...insertOtp, id })
      .returning();
    return otp;
  }

  async getOtpByMobile(mobile: string): Promise<Otp | undefined> {
    const [otp] = await db
      .select()
      .from(otps)
      .where(eq(otps.mobile, mobile))
      .orderBy(desc(otps.expiresAt));
    return otp || undefined;
  }

  async markOtpUsed(id: string): Promise<void> {
    await db.update(otps).set({ isUsed: true }).where(eq(otps.id, id));
  }

  // Payments
  async getPayment(id: string): Promise<Payment | undefined> {
    const [payment] = await db.select().from(payments).where(eq(payments.id, id));
    return payment || undefined;
  }

  async getPaymentsByUser(userId: string): Promise<Payment[]> {
    return db.select().from(payments).where(eq(payments.userId, userId)).orderBy(desc(payments.createdAt));
  }

  async getAllPayments(): Promise<Payment[]> {
    return db.select().from(payments).orderBy(desc(payments.createdAt));
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const [payment] = await db
      .insert(payments)
      .values({ ...insertPayment, id })
      .returning();
    return payment;
  }

  async updatePaymentStatus(id: string, status: string): Promise<Payment | undefined> {
    const [payment] = await db
      .update(payments)
      .set({ status })
      .where(eq(payments.id, id))
      .returning();
    return payment || undefined;
  }

  // Chat Messages
  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);
  }

  async getAllChatMessages(): Promise<ChatMessage[]> {
    return db.select().from(chatMessages).orderBy(desc(chatMessages.createdAt));
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const [message] = await db
      .insert(chatMessages)
      .values({ ...insertMessage, id })
      .returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
