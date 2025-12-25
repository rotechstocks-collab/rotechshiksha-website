export interface BrokerData {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  established: number;
  headquarters: string;
  website: string;
  
  activeClients: {
    total: number;
    growth: string;
    marketShare: string;
    rank: number;
  };
  
  charges: {
    accountOpening: number;
    maintenance: number;
    equityDelivery: string;
    equityIntraday: string;
    futuresOptions: string;
    commodities: string;
    currency: string;
    dpCharges: number;
  };
  
  complaints: {
    total: number;
    resolved: number;
    pending: number;
    resolutionRate: string;
    avgResolutionDays: number;
  };
  
  shareHolding: {
    nsdl: number;
    cdsl: number;
    total: number;
    avgHoldingValue: number;
  };
  
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  
  financials: {
    revenue: string;
    profit: string;
    netWorth: string;
    fy: string;
  };
  
  ratings: {
    overall: number;
    trading: number;
    research: number;
    support: number;
    platform: number;
    pricing: number;
  };
  
  features: {
    mobileApp: boolean;
    webPlatform: boolean;
    apiAccess: boolean;
    research: boolean;
    ipo: boolean;
    mutualFunds: boolean;
    bonds: boolean;
    insurance: boolean;
    nri: boolean;
    margin: boolean;
  };
}

export const brokerData: BrokerData[] = [
  {
    id: "zerodha",
    name: "Zerodha",
    logo: "https://zerodha.com/static/images/logo.svg",
    tagline: "India's largest retail stockbroker",
    established: 2010,
    headquarters: "Bengaluru",
    website: "zerodha.com",
    activeClients: {
      total: 7800000,
      growth: "+12%",
      marketShare: "21.5%",
      rank: 1
    },
    charges: {
      accountOpening: 0,
      maintenance: 300,
      equityDelivery: "Free",
      equityIntraday: "Rs 20 or 0.03%",
      futuresOptions: "Rs 20 per order",
      commodities: "Rs 20 per order",
      currency: "Rs 20 per order",
      dpCharges: 15.93
    },
    complaints: {
      total: 4521,
      resolved: 4489,
      pending: 32,
      resolutionRate: "99.3%",
      avgResolutionDays: 7
    },
    shareHolding: {
      nsdl: 4200000,
      cdsl: 3600000,
      total: 7800000,
      avgHoldingValue: 285000
    },
    prosAndCons: {
      pros: [
        "Zero brokerage on equity delivery",
        "Excellent trading platforms (Kite, Console)",
        "Low-cost flat-fee structure",
        "Good educational resources (Varsity)",
        "API access for algo trading"
      ],
      cons: [
        "No 3-in-1 account",
        "Limited research reports",
        "No call & trade facility",
        "No tips or recommendations"
      ]
    },
    financials: {
      revenue: "Rs 8,320 Cr",
      profit: "Rs 4,150 Cr",
      netWorth: "Rs 12,500 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 4.5,
      trading: 4.7,
      research: 3.5,
      support: 4.0,
      platform: 4.8,
      pricing: 4.9
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: true,
      research: false,
      ipo: true,
      mutualFunds: true,
      bonds: true,
      insurance: false,
      nri: true,
      margin: true
    }
  },
  {
    id: "angel-one",
    name: "Angel One",
    logo: "https://www.angelone.in/images/angelone-logo.svg",
    tagline: "Smart investing for everyone",
    established: 1996,
    headquarters: "Mumbai",
    website: "angelone.in",
    activeClients: {
      total: 6200000,
      growth: "+28%",
      marketShare: "17.1%",
      rank: 2
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "Free",
      equityIntraday: "Rs 20 or 0.25%",
      futuresOptions: "Rs 20 per order",
      commodities: "Rs 20 per order",
      currency: "Rs 20 per order",
      dpCharges: 20
    },
    complaints: {
      total: 5892,
      resolved: 5756,
      pending: 136,
      resolutionRate: "97.7%",
      avgResolutionDays: 10
    },
    shareHolding: {
      nsdl: 3100000,
      cdsl: 3100000,
      total: 6200000,
      avgHoldingValue: 195000
    },
    prosAndCons: {
      pros: [
        "Zero AMC charges",
        "Free equity delivery",
        "Good research & advisory",
        "ARQ AI-powered recommendations",
        "Wide range of products"
      ],
      cons: [
        "Higher margin requirements",
        "App can be slow sometimes",
        "Customer support wait times",
        "Complex platform for beginners"
      ]
    },
    financials: {
      revenue: "Rs 4,180 Cr",
      profit: "Rs 1,250 Cr",
      netWorth: "Rs 4,800 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 4.2,
      trading: 4.3,
      research: 4.5,
      support: 3.8,
      platform: 4.2,
      pricing: 4.5
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: true,
      research: true,
      ipo: true,
      mutualFunds: true,
      bonds: true,
      insurance: true,
      nri: true,
      margin: true
    }
  },
  {
    id: "groww",
    name: "Groww",
    logo: "https://groww.in/logo-groww.svg",
    tagline: "Stocks & Mutual Funds Made Easy",
    established: 2017,
    headquarters: "Bengaluru",
    website: "groww.in",
    activeClients: {
      total: 5800000,
      growth: "+45%",
      marketShare: "16.0%",
      rank: 3
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "Free",
      equityIntraday: "Rs 20 or 0.05%",
      futuresOptions: "Rs 20 per order",
      commodities: "Rs 20 per order",
      currency: "Rs 20 per order",
      dpCharges: 15
    },
    complaints: {
      total: 3241,
      resolved: 3198,
      pending: 43,
      resolutionRate: "98.7%",
      avgResolutionDays: 5
    },
    shareHolding: {
      nsdl: 3200000,
      cdsl: 2600000,
      total: 5800000,
      avgHoldingValue: 165000
    },
    prosAndCons: {
      pros: [
        "Very user-friendly interface",
        "Zero AMC and account opening",
        "Great for beginners",
        "Excellent mutual fund platform",
        "Quick account opening"
      ],
      cons: [
        "Limited advanced charting",
        "No desktop trading terminal",
        "Less features for active traders",
        "No commodity trading"
      ]
    },
    financials: {
      revenue: "Rs 2,450 Cr",
      profit: "Rs 680 Cr",
      netWorth: "Rs 3,200 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 4.3,
      trading: 4.0,
      research: 3.8,
      support: 4.2,
      platform: 4.6,
      pricing: 4.8
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: false,
      research: false,
      ipo: true,
      mutualFunds: true,
      bonds: true,
      insurance: false,
      nri: false,
      margin: true
    }
  },
  {
    id: "upstox",
    name: "Upstox",
    logo: "https://upstox.com/app/images/upstox-logo.svg",
    tagline: "Everyone's trading platform",
    established: 2012,
    headquarters: "Mumbai",
    website: "upstox.com",
    activeClients: {
      total: 4500000,
      growth: "+18%",
      marketShare: "12.4%",
      rank: 4
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "Free",
      equityIntraday: "Rs 20 or 0.05%",
      futuresOptions: "Rs 20 per order",
      commodities: "Rs 20 per order",
      currency: "Rs 20 per order",
      dpCharges: 18.5
    },
    complaints: {
      total: 2876,
      resolved: 2798,
      pending: 78,
      resolutionRate: "97.3%",
      avgResolutionDays: 8
    },
    shareHolding: {
      nsdl: 2500000,
      cdsl: 2000000,
      total: 4500000,
      avgHoldingValue: 175000
    },
    prosAndCons: {
      pros: [
        "Zero AMC charges",
        "Free equity delivery",
        "Good charting tools",
        "API access for developers",
        "Fast order execution"
      ],
      cons: [
        "Customer support issues",
        "App stability concerns",
        "Limited research",
        "No 3-in-1 account"
      ]
    },
    financials: {
      revenue: "Rs 1,850 Cr",
      profit: "Rs 420 Cr",
      netWorth: "Rs 2,100 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 4.0,
      trading: 4.2,
      research: 3.5,
      support: 3.5,
      platform: 4.3,
      pricing: 4.7
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: true,
      research: false,
      ipo: true,
      mutualFunds: true,
      bonds: true,
      insurance: false,
      nri: false,
      margin: true
    }
  },
  {
    id: "icici-direct",
    name: "ICICI Direct",
    logo: "https://www.icicidirect.com/idirectcontent/images/icici-logo.svg",
    tagline: "Your trusted trading partner",
    established: 2000,
    headquarters: "Mumbai",
    website: "icicidirect.com",
    activeClients: {
      total: 3200000,
      growth: "+8%",
      marketShare: "8.8%",
      rank: 5
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "0.55%",
      equityIntraday: "0.275%",
      futuresOptions: "Rs 20 per lot",
      commodities: "0.05%",
      currency: "0.03%",
      dpCharges: 16.5
    },
    complaints: {
      total: 1987,
      resolved: 1945,
      pending: 42,
      resolutionRate: "97.9%",
      avgResolutionDays: 6
    },
    shareHolding: {
      nsdl: 2100000,
      cdsl: 1100000,
      total: 3200000,
      avgHoldingValue: 485000
    },
    prosAndCons: {
      pros: [
        "3-in-1 account with ICICI Bank",
        "Strong research & advisory",
        "Wide product range",
        "Trusted brand name",
        "Good customer support"
      ],
      cons: [
        "Higher brokerage charges",
        "Complex pricing structure",
        "Platform can be slow",
        "Higher margins required"
      ]
    },
    financials: {
      revenue: "Rs 3,890 Cr",
      profit: "Rs 1,120 Cr",
      netWorth: "Rs 5,200 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 4.1,
      trading: 4.0,
      research: 4.6,
      support: 4.3,
      platform: 3.9,
      pricing: 3.2
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: true,
      research: true,
      ipo: true,
      mutualFunds: true,
      bonds: true,
      insurance: true,
      nri: true,
      margin: true
    }
  },
  {
    id: "hdfc-securities",
    name: "HDFC Securities",
    logo: "https://www.hdfcsec.com/images/hdfc-sec-logo.svg",
    tagline: "Invest with confidence",
    established: 2000,
    headquarters: "Mumbai",
    website: "hdfcsec.com",
    activeClients: {
      total: 2800000,
      growth: "+10%",
      marketShare: "7.7%",
      rank: 6
    },
    charges: {
      accountOpening: 0,
      maintenance: 750,
      equityDelivery: "0.50%",
      equityIntraday: "0.05%",
      futuresOptions: "Rs 20 per lot",
      commodities: "0.025%",
      currency: "0.03%",
      dpCharges: 18.5
    },
    complaints: {
      total: 1456,
      resolved: 1423,
      pending: 33,
      resolutionRate: "97.7%",
      avgResolutionDays: 7
    },
    shareHolding: {
      nsdl: 1900000,
      cdsl: 900000,
      total: 2800000,
      avgHoldingValue: 520000
    },
    prosAndCons: {
      pros: [
        "3-in-1 account with HDFC Bank",
        "Excellent research reports",
        "Strong brand trust",
        "Good for long-term investors",
        "Multiple trading platforms"
      ],
      cons: [
        "Higher brokerage for delivery",
        "AMC charges apply",
        "Not ideal for active traders",
        "Complex fee structure"
      ]
    },
    financials: {
      revenue: "Rs 2,650 Cr",
      profit: "Rs 780 Cr",
      netWorth: "Rs 3,800 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 4.0,
      trading: 3.9,
      research: 4.7,
      support: 4.2,
      platform: 3.8,
      pricing: 3.3
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: false,
      research: true,
      ipo: true,
      mutualFunds: true,
      bonds: true,
      insurance: true,
      nri: true,
      margin: true
    }
  },
  {
    id: "kotak-securities",
    name: "Kotak Securities",
    logo: "https://www.kotaksecurities.com/images/kotak-logo.svg",
    tagline: "Trade smart, Trade Kotak",
    established: 1994,
    headquarters: "Mumbai",
    website: "kotaksecurities.com",
    activeClients: {
      total: 2400000,
      growth: "+15%",
      marketShare: "6.6%",
      rank: 7
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "Free (Trade Free plan)",
      equityIntraday: "Rs 20 per order",
      futuresOptions: "Rs 20 per order",
      commodities: "Rs 20 per order",
      currency: "Rs 20 per order",
      dpCharges: 15.5
    },
    complaints: {
      total: 1234,
      resolved: 1198,
      pending: 36,
      resolutionRate: "97.1%",
      avgResolutionDays: 8
    },
    shareHolding: {
      nsdl: 1600000,
      cdsl: 800000,
      total: 2400000,
      avgHoldingValue: 450000
    },
    prosAndCons: {
      pros: [
        "3-in-1 account available",
        "Trade Free plan available",
        "Strong research team",
        "Good customer support",
        "NRI services available"
      ],
      cons: [
        "Higher charges on regular plans",
        "Platform learning curve",
        "Limited algo trading",
        "Mobile app needs improvement"
      ]
    },
    financials: {
      revenue: "Rs 2,180 Cr",
      profit: "Rs 620 Cr",
      netWorth: "Rs 3,100 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 4.1,
      trading: 4.1,
      research: 4.5,
      support: 4.0,
      platform: 3.9,
      pricing: 4.0
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: true,
      research: true,
      ipo: true,
      mutualFunds: true,
      bonds: true,
      insurance: true,
      nri: true,
      margin: true
    }
  },
  {
    id: "5paisa",
    name: "5paisa",
    logo: "https://www.5paisa.com/images/5paisa-logo.svg",
    tagline: "India's fastest growing discount broker",
    established: 2016,
    headquarters: "Mumbai",
    website: "5paisa.com",
    activeClients: {
      total: 1800000,
      growth: "+22%",
      marketShare: "5.0%",
      rank: 8
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "Rs 20 per order",
      equityIntraday: "Rs 20 per order",
      futuresOptions: "Rs 20 per order",
      commodities: "Rs 20 per order",
      currency: "Rs 20 per order",
      dpCharges: 18.5
    },
    complaints: {
      total: 987,
      resolved: 945,
      pending: 42,
      resolutionRate: "95.7%",
      avgResolutionDays: 12
    },
    shareHolding: {
      nsdl: 1000000,
      cdsl: 800000,
      total: 1800000,
      avgHoldingValue: 125000
    },
    prosAndCons: {
      pros: [
        "Very low flat fee structure",
        "Zero AMC charges",
        "Auto-invest feature",
        "Good for beginners",
        "Multiple investment options"
      ],
      cons: [
        "Charges on delivery too",
        "Platform can be buggy",
        "Limited research",
        "Customer support issues"
      ]
    },
    financials: {
      revenue: "Rs 890 Cr",
      profit: "Rs 185 Cr",
      netWorth: "Rs 1,100 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 3.8,
      trading: 3.9,
      research: 3.2,
      support: 3.3,
      platform: 3.7,
      pricing: 4.5
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: true,
      research: false,
      ipo: true,
      mutualFunds: true,
      bonds: true,
      insurance: true,
      nri: false,
      margin: true
    }
  }
];

export function getBrokerById(id: string): BrokerData | undefined {
  return brokerData.find(broker => broker.id === id);
}

export function getBrokersByIds(ids: string[]): BrokerData[] {
  return brokerData.filter(broker => ids.includes(broker.id));
}

export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + " Cr";
  } else if (num >= 100000) {
    return (num / 100000).toFixed(1) + " L";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(num);
}
