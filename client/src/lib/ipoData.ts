export interface IPO {
  id: string;
  companyName: string;
  logo?: string;
  industry: string;
  issuePrice: { min: number; max: number };
  issueSize: number;
  lotSize: number;
  minInvestment: number;
  openDate: string;
  closeDate: string;
  listingDate?: string;
  status: "upcoming" | "ongoing" | "closed" | "listed";
  subscriptionStatus?: {
    retail: number;
    hni: number;
    qib: number;
    total: number;
  };
  about: string;
  highlights: string[];
  financials: {
    revenue: string;
    profit: string;
    assets: string;
    netWorth: string;
  };
  keyDates: {
    bidding: string;
    allotment: string;
    refund: string;
    listing: string;
  };
  registrar: string;
  leadManager: string;
  exchange: string[];
  gmp?: number;
}

export const ipoData: IPO[] = [
  {
    id: "abc-tech",
    companyName: "ABC Technologies Ltd",
    industry: "Technology",
    issuePrice: { min: 180, max: 195 },
    issueSize: 1250,
    lotSize: 77,
    minInvestment: 15015,
    openDate: "2024-12-26",
    closeDate: "2024-12-30",
    listingDate: "2025-01-03",
    status: "ongoing",
    subscriptionStatus: {
      retail: 4.25,
      hni: 8.92,
      qib: 15.67,
      total: 9.45
    },
    about: "ABC Technologies is a leading IT services company specializing in enterprise software solutions, cloud computing, and digital transformation services. Founded in 2010, the company has grown to serve over 500 enterprise clients across India and Southeast Asia.",
    highlights: [
      "Strong presence in enterprise software market",
      "Consistent revenue growth of 25% CAGR over 5 years",
      "Diversified client base across 8 industry verticals",
      "Robust order book of Rs 850 crore",
      "Expanding into AI/ML services"
    ],
    financials: {
      revenue: "Rs 425 Cr (FY24)",
      profit: "Rs 68 Cr (FY24)",
      assets: "Rs 312 Cr",
      netWorth: "Rs 185 Cr"
    },
    keyDates: {
      bidding: "Dec 26 - Dec 30, 2024",
      allotment: "Jan 1, 2025",
      refund: "Jan 2, 2025",
      listing: "Jan 3, 2025"
    },
    registrar: "Link Intime India Pvt Ltd",
    leadManager: "ICICI Securities, Axis Capital",
    exchange: ["NSE", "BSE"],
    gmp: 45
  },
  {
    id: "green-energy",
    companyName: "Green Energy Solutions Ltd",
    industry: "Renewable Energy",
    issuePrice: { min: 320, max: 340 },
    issueSize: 2100,
    lotSize: 44,
    minInvestment: 14960,
    openDate: "2024-12-28",
    closeDate: "2025-01-02",
    listingDate: "2025-01-07",
    status: "upcoming",
    about: "Green Energy Solutions is a renewable energy company focused on solar and wind power generation. The company operates 15 solar parks across Maharashtra, Gujarat, and Rajasthan with a total capacity of 850 MW.",
    highlights: [
      "Second largest solar power generator in Western India",
      "850 MW operational capacity with 500 MW under development",
      "Long-term PPAs with state utilities",
      "Debt-free expansion funded by IPO proceeds",
      "Strong government policy support for renewable sector"
    ],
    financials: {
      revenue: "Rs 680 Cr (FY24)",
      profit: "Rs 142 Cr (FY24)",
      assets: "Rs 2,450 Cr",
      netWorth: "Rs 890 Cr"
    },
    keyDates: {
      bidding: "Dec 28 - Jan 2, 2025",
      allotment: "Jan 4, 2025",
      refund: "Jan 6, 2025",
      listing: "Jan 7, 2025"
    },
    registrar: "KFin Technologies Ltd",
    leadManager: "Kotak Mahindra Capital, SBI Capital",
    exchange: ["NSE", "BSE"]
  },
  {
    id: "bharati-foods",
    companyName: "Bharati Foods International",
    industry: "FMCG",
    issuePrice: { min: 85, max: 92 },
    issueSize: 650,
    lotSize: 162,
    minInvestment: 14904,
    openDate: "2024-12-20",
    closeDate: "2024-12-24",
    listingDate: "2024-12-30",
    status: "closed",
    subscriptionStatus: {
      retail: 12.5,
      hni: 18.2,
      qib: 22.8,
      total: 17.6
    },
    about: "Bharati Foods is a packaged foods company specializing in ready-to-eat meals, snacks, and beverages. The company has a strong distribution network across 18 states with products available in over 50,000 retail outlets.",
    highlights: [
      "Leading player in ready-to-eat segment",
      "Strong brand recall with 4 flagship products",
      "Pan-India distribution network",
      "Expanding into quick commerce channels",
      "New product launches driving growth"
    ],
    financials: {
      revenue: "Rs 380 Cr (FY24)",
      profit: "Rs 42 Cr (FY24)",
      assets: "Rs 220 Cr",
      netWorth: "Rs 125 Cr"
    },
    keyDates: {
      bidding: "Dec 20 - Dec 24, 2024",
      allotment: "Dec 26, 2024",
      refund: "Dec 27, 2024",
      listing: "Dec 30, 2024"
    },
    registrar: "Link Intime India Pvt Ltd",
    leadManager: "HDFC Bank, IIFL Securities",
    exchange: ["NSE", "BSE"],
    gmp: 28
  },
  {
    id: "metro-infra",
    companyName: "Metro Infrastructure Ltd",
    industry: "Infrastructure",
    issuePrice: { min: 245, max: 265 },
    issueSize: 1800,
    lotSize: 56,
    minInvestment: 14840,
    openDate: "2025-01-05",
    closeDate: "2025-01-09",
    listingDate: "2025-01-14",
    status: "upcoming",
    about: "Metro Infrastructure is an infrastructure development company focused on metro rail projects, highways, and urban infrastructure. The company has successfully completed 8 metro rail projects and is currently executing 5 major projects.",
    highlights: [
      "Strong order book of Rs 4,500 crore",
      "Proven track record in metro rail construction",
      "Experienced management team with 25+ years experience",
      "Government's focus on urban infrastructure",
      "Diversifying into smart city projects"
    ],
    financials: {
      revenue: "Rs 1,250 Cr (FY24)",
      profit: "Rs 95 Cr (FY24)",
      assets: "Rs 1,800 Cr",
      netWorth: "Rs 620 Cr"
    },
    keyDates: {
      bidding: "Jan 5 - Jan 9, 2025",
      allotment: "Jan 11, 2025",
      refund: "Jan 13, 2025",
      listing: "Jan 14, 2025"
    },
    registrar: "Bigshare Services Pvt Ltd",
    leadManager: "Axis Capital, JM Financial",
    exchange: ["NSE", "BSE"]
  },
  {
    id: "fintech-pay",
    companyName: "FinTech Pay Solutions",
    industry: "Financial Services",
    issuePrice: { min: 420, max: 450 },
    issueSize: 3200,
    lotSize: 33,
    minInvestment: 14850,
    openDate: "2025-01-10",
    closeDate: "2025-01-14",
    listingDate: "2025-01-18",
    status: "upcoming",
    about: "FinTech Pay Solutions is a digital payments company offering payment gateway, UPI solutions, and merchant services. The company processes over 50 million transactions monthly with a GMV of Rs 15,000 crore per month.",
    highlights: [
      "Fast-growing digital payments player",
      "50M+ monthly transactions",
      "Partnership with 200+ banks and NBFCs",
      "Expanding into B2B payments",
      "Strong unit economics with 85% gross margin"
    ],
    financials: {
      revenue: "Rs 520 Cr (FY24)",
      profit: "Rs 78 Cr (FY24)",
      assets: "Rs 380 Cr",
      netWorth: "Rs 290 Cr"
    },
    keyDates: {
      bidding: "Jan 10 - Jan 14, 2025",
      allotment: "Jan 16, 2025",
      refund: "Jan 17, 2025",
      listing: "Jan 18, 2025"
    },
    registrar: "Link Intime India Pvt Ltd",
    leadManager: "Morgan Stanley, Goldman Sachs",
    exchange: ["NSE", "BSE"]
  },
  {
    id: "wellness-pharma",
    companyName: "Wellness Pharma India",
    industry: "Pharmaceuticals",
    issuePrice: { min: 155, max: 168 },
    issueSize: 920,
    lotSize: 89,
    minInvestment: 14952,
    openDate: "2024-12-15",
    closeDate: "2024-12-18",
    listingDate: "2024-12-23",
    status: "listed",
    subscriptionStatus: {
      retail: 8.4,
      hni: 12.6,
      qib: 19.2,
      total: 13.4
    },
    about: "Wellness Pharma India is a pharmaceutical company specializing in nutraceuticals, OTC products, and ayurvedic medicines. The company has a portfolio of 120+ products and exports to 25 countries.",
    highlights: [
      "Growing wellness and nutraceuticals market",
      "Strong export business contributing 35% of revenue",
      "120+ products in portfolio",
      "WHO-GMP certified manufacturing facilities",
      "Focus on natural and ayurvedic products"
    ],
    financials: {
      revenue: "Rs 290 Cr (FY24)",
      profit: "Rs 38 Cr (FY24)",
      assets: "Rs 180 Cr",
      netWorth: "Rs 112 Cr"
    },
    keyDates: {
      bidding: "Dec 15 - Dec 18, 2024",
      allotment: "Dec 20, 2024",
      refund: "Dec 21, 2024",
      listing: "Dec 23, 2024"
    },
    registrar: "KFin Technologies Ltd",
    leadManager: "Motilal Oswal, Edelweiss",
    exchange: ["NSE", "BSE"],
    gmp: 18
  }
];

export function getIPOsByStatus(status: IPO["status"]): IPO[] {
  return ipoData.filter(ipo => ipo.status === status);
}

export function getIPOById(id: string): IPO | undefined {
  return ipoData.find(ipo => ipo.id === id);
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

export function getDaysRemaining(dateString: string): number {
  const targetDate = new Date(dateString);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
