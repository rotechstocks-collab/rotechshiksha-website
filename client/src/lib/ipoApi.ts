import { useQuery } from "@tanstack/react-query";

export interface IPOData {
  id: string;
  companyName: string;
  symbol?: string;
  industry?: string;
  status: "upcoming" | "ongoing" | "closed" | "listed";
  issuePrice: { min: number; max: number };
  issueSize?: number;
  lotSize: number;
  minInvestment: number;
  openDate: string;
  closeDate: string;
  listingDate?: string;
  biddingStartDate?: string;
  biddingEndDate?: string;
  allotmentDate?: string;
  refundDate?: string;
  subscriptionStatus?: {
    retail: number;
    hni: number;
    qib: number;
    total: number;
  };
  gmp?: number;
  expectedListing?: number;
  about?: string;
  highlights?: string[];
  financials?: {
    revenue?: string;
    profit?: string;
    assets?: string;
    netWorth?: string;
  };
  registrar?: string;
  leadManager?: string;
  exchange?: string[];
  documentUrl?: string;
  listingPrice?: number;
  listingGainPercent?: number;
  riskLevel?: "low" | "medium" | "high";
}

export interface IPOListResponse {
  ipos: IPOData[];
  lastUpdated: string;
  isStale: boolean;
  source: string;
}

export interface IPONewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  url: string;
  imageUrl?: string;
}

export interface IPONewsResponse {
  articles: IPONewsArticle[];
  lastUpdated: string;
}

export function useIPOList() {
  return useQuery<IPOListResponse>({
    queryKey: ["/api/ipo"],
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    staleTime: 2 * 60 * 1000, // Consider data stale after 2 minutes
    retry: 2,
  });
}

export function useIPODetail(id: string | undefined) {
  return useQuery<IPOData & { lastUpdated: string; isStale: boolean }>({
    queryKey: ["/api/ipo", id],
    enabled: !!id,
    retry: 2,
  });
}

export function useIPONews() {
  return useQuery<IPONewsResponse>({
    queryKey: ["/api/ipo/news"],
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `Rs ${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `Rs ${(amount / 100000).toFixed(2)} L`;
  } else {
    return `Rs ${amount.toLocaleString("en-IN")}`;
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function getDaysRemaining(dateString: string): number {
  const targetDate = new Date(dateString);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}
