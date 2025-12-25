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
  },
  {
    id: "dhan",
    name: "Dhan",
    logo: "",
    tagline: "Trade Faster, Trade Smarter",
    established: 2021,
    headquarters: "Mumbai",
    website: "dhan.co",
    activeClients: {
      total: 1500000,
      growth: "+85%",
      marketShare: "4.1%",
      rank: 9
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "Free",
      equityIntraday: "Rs 20 or 0.03%",
      futuresOptions: "Rs 20 per order",
      commodities: "Rs 20 per order",
      currency: "Rs 20 per order",
      dpCharges: 15
    },
    complaints: {
      total: 456,
      resolved: 441,
      pending: 15,
      resolutionRate: "96.7%",
      avgResolutionDays: 6
    },
    shareHolding: {
      nsdl: 900000,
      cdsl: 600000,
      total: 1500000,
      avgHoldingValue: 195000
    },
    prosAndCons: {
      pros: [
        "Lightning fast order execution",
        "Excellent charting with TradingView",
        "Zero brokerage on delivery",
        "Options trading tools",
        "Clean modern interface"
      ],
      cons: [
        "New player in the market",
        "Limited research reports",
        "No 3-in-1 account",
        "Less features for long-term investors"
      ]
    },
    financials: {
      revenue: "Rs 320 Cr",
      profit: "Rs 45 Cr",
      netWorth: "Rs 580 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 4.3,
      trading: 4.7,
      research: 3.4,
      support: 4.1,
      platform: 4.8,
      pricing: 4.7
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: true,
      research: false,
      ipo: true,
      mutualFunds: true,
      bonds: false,
      insurance: false,
      nri: false,
      margin: true
    }
  },
  {
    id: "motilal-oswal",
    name: "Motilal Oswal",
    logo: "",
    tagline: "Knowledge First",
    established: 1987,
    headquarters: "Mumbai",
    website: "motilaloswal.com",
    activeClients: {
      total: 2100000,
      growth: "+12%",
      marketShare: "5.8%",
      rank: 10
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "0.30%",
      equityIntraday: "0.03%",
      futuresOptions: "Rs 20 per lot",
      commodities: "0.02%",
      currency: "Rs 20 per lot",
      dpCharges: 25
    },
    complaints: {
      total: 1876,
      resolved: 1812,
      pending: 64,
      resolutionRate: "96.6%",
      avgResolutionDays: 9
    },
    shareHolding: {
      nsdl: 1400000,
      cdsl: 700000,
      total: 2100000,
      avgHoldingValue: 385000
    },
    prosAndCons: {
      pros: [
        "Strong research & advisory",
        "Long market experience",
        "Multiple investment options",
        "Good for PMS clients",
        "Educational content"
      ],
      cons: [
        "Higher brokerage on delivery",
        "Complex fee structure",
        "Platform can be slow",
        "Not ideal for beginners"
      ]
    },
    financials: {
      revenue: "Rs 4,120 Cr",
      profit: "Rs 1,050 Cr",
      netWorth: "Rs 5,800 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 4.0,
      trading: 4.0,
      research: 4.8,
      support: 3.9,
      platform: 3.8,
      pricing: 3.4
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
    id: "indmoney",
    name: "INDmoney",
    logo: "",
    tagline: "Super App for Financial Freedom",
    established: 2019,
    headquarters: "Gurugram",
    website: "indmoney.com",
    activeClients: {
      total: 1200000,
      growth: "+120%",
      marketShare: "3.3%",
      rank: 11
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "Free",
      equityIntraday: "Rs 20 or 0.05%",
      futuresOptions: "Rs 20 per order",
      commodities: "N/A",
      currency: "N/A",
      dpCharges: 15
    },
    complaints: {
      total: 234,
      resolved: 221,
      pending: 13,
      resolutionRate: "94.4%",
      avgResolutionDays: 8
    },
    shareHolding: {
      nsdl: 800000,
      cdsl: 400000,
      total: 1200000,
      avgHoldingValue: 145000
    },
    prosAndCons: {
      pros: [
        "Complete financial tracking",
        "US stocks available",
        "Goal-based investing",
        "Great for beginners",
        "Unified portfolio view"
      ],
      cons: [
        "Limited advanced trading",
        "No commodity trading",
        "New in stockbroking",
        "Limited research tools"
      ]
    },
    financials: {
      revenue: "Rs 280 Cr",
      profit: "Rs -85 Cr",
      netWorth: "Rs 420 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 4.1,
      trading: 3.8,
      research: 3.5,
      support: 4.2,
      platform: 4.5,
      pricing: 4.6
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: false,
      research: false,
      ipo: true,
      mutualFunds: true,
      bonds: true,
      insurance: true,
      nri: true,
      margin: false
    }
  },
  {
    id: "paytm-money",
    name: "Paytm Money",
    logo: "",
    tagline: "Investing Made Simple",
    established: 2018,
    headquarters: "Noida",
    website: "paytmmoney.com",
    activeClients: {
      total: 980000,
      growth: "+35%",
      marketShare: "2.7%",
      rank: 12
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "Free",
      equityIntraday: "Rs 10 per order",
      futuresOptions: "Rs 10 per order",
      commodities: "N/A",
      currency: "N/A",
      dpCharges: 15.93
    },
    complaints: {
      total: 567,
      resolved: 534,
      pending: 33,
      resolutionRate: "94.2%",
      avgResolutionDays: 10
    },
    shareHolding: {
      nsdl: 600000,
      cdsl: 380000,
      total: 980000,
      avgHoldingValue: 95000
    },
    prosAndCons: {
      pros: [
        "Lowest intraday brokerage",
        "Paytm ecosystem integration",
        "Very user-friendly",
        "Good for beginners",
        "Free mutual funds"
      ],
      cons: [
        "No commodity/currency trading",
        "Limited advanced features",
        "Less charting tools",
        "No API access"
      ]
    },
    financials: {
      revenue: "Rs 185 Cr",
      profit: "Rs -120 Cr",
      netWorth: "Rs 650 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 3.9,
      trading: 3.7,
      research: 3.3,
      support: 3.8,
      platform: 4.2,
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
    id: "fyers",
    name: "Fyers",
    logo: "",
    tagline: "Built for Traders, by Traders",
    established: 2015,
    headquarters: "Bengaluru",
    website: "fyers.in",
    activeClients: {
      total: 650000,
      growth: "+42%",
      marketShare: "1.8%",
      rank: 13
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "Free",
      equityIntraday: "Rs 20 or 0.03%",
      futuresOptions: "Rs 20 per order",
      commodities: "Rs 20 per order",
      currency: "Rs 20 per order",
      dpCharges: 15
    },
    complaints: {
      total: 187,
      resolved: 178,
      pending: 9,
      resolutionRate: "95.2%",
      avgResolutionDays: 7
    },
    shareHolding: {
      nsdl: 420000,
      cdsl: 230000,
      total: 650000,
      avgHoldingValue: 225000
    },
    prosAndCons: {
      pros: [
        "Advanced charting tools",
        "Excellent API for algo trading",
        "Free equity delivery",
        "Good for technical traders",
        "Responsive customer support"
      ],
      cons: [
        "Smaller user base",
        "Limited research",
        "No 3-in-1 account",
        "Mobile app needs work"
      ]
    },
    financials: {
      revenue: "Rs 145 Cr",
      profit: "Rs 28 Cr",
      netWorth: "Rs 185 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 4.2,
      trading: 4.6,
      research: 3.4,
      support: 4.3,
      platform: 4.5,
      pricing: 4.6
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: true,
      research: false,
      ipo: true,
      mutualFunds: true,
      bonds: false,
      insurance: false,
      nri: false,
      margin: true
    }
  },
  {
    id: "anand-rathi",
    name: "Anand Rathi",
    logo: "",
    tagline: "Your Wealth, Our Expertise",
    established: 1994,
    headquarters: "Mumbai",
    website: "rfranalytics.com",
    activeClients: {
      total: 520000,
      growth: "+15%",
      marketShare: "1.4%",
      rank: 14
    },
    charges: {
      accountOpening: 0,
      maintenance: 500,
      equityDelivery: "0.25%",
      equityIntraday: "0.025%",
      futuresOptions: "Rs 20 per lot",
      commodities: "0.025%",
      currency: "0.025%",
      dpCharges: 20
    },
    complaints: {
      total: 312,
      resolved: 298,
      pending: 14,
      resolutionRate: "95.5%",
      avgResolutionDays: 11
    },
    shareHolding: {
      nsdl: 340000,
      cdsl: 180000,
      total: 520000,
      avgHoldingValue: 420000
    },
    prosAndCons: {
      pros: [
        "Strong research team",
        "Wealth management services",
        "Good for HNI clients",
        "Personalized advisory",
        "Wide product range"
      ],
      cons: [
        "Higher charges",
        "AMC fees apply",
        "Not for budget traders",
        "Dated trading platform"
      ]
    },
    financials: {
      revenue: "Rs 1,280 Cr",
      profit: "Rs 185 Cr",
      netWorth: "Rs 980 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 3.8,
      trading: 3.7,
      research: 4.5,
      support: 4.0,
      platform: 3.5,
      pricing: 3.2
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
    id: "alice-blue",
    name: "Alice Blue",
    logo: "",
    tagline: "Trade with Confidence",
    established: 2012,
    headquarters: "Chennai",
    website: "aliceblueonline.com",
    activeClients: {
      total: 580000,
      growth: "+28%",
      marketShare: "1.6%",
      rank: 15
    },
    charges: {
      accountOpening: 0,
      maintenance: 0,
      equityDelivery: "Rs 15 per order",
      equityIntraday: "Rs 15 per order",
      futuresOptions: "Rs 15 per order",
      commodities: "Rs 15 per order",
      currency: "Rs 15 per order",
      dpCharges: 14
    },
    complaints: {
      total: 423,
      resolved: 398,
      pending: 25,
      resolutionRate: "94.1%",
      avgResolutionDays: 12
    },
    shareHolding: {
      nsdl: 380000,
      cdsl: 200000,
      total: 580000,
      avgHoldingValue: 165000
    },
    prosAndCons: {
      pros: [
        "Low flat brokerage (Rs 15)",
        "Good for options traders",
        "Multiple trading platforms",
        "API access available",
        "Ant Nest algo platform"
      ],
      cons: [
        "Charges on delivery too",
        "Customer support issues",
        "Platform stability concerns",
        "Limited research"
      ]
    },
    financials: {
      revenue: "Rs 185 Cr",
      profit: "Rs 32 Cr",
      netWorth: "Rs 220 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 3.9,
      trading: 4.1,
      research: 3.2,
      support: 3.4,
      platform: 4.0,
      pricing: 4.5
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: true,
      research: false,
      ipo: true,
      mutualFunds: true,
      bonds: false,
      insurance: false,
      nri: false,
      margin: true
    }
  },
  {
    id: "samco",
    name: "SAMCO",
    logo: "",
    tagline: "India's Fastest Growing Stockbroker",
    established: 2015,
    headquarters: "Mumbai",
    website: "samco.in",
    activeClients: {
      total: 420000,
      growth: "+22%",
      marketShare: "1.2%",
      rank: 16
    },
    charges: {
      accountOpening: 0,
      maintenance: 400,
      equityDelivery: "Rs 20 per order",
      equityIntraday: "Rs 20 or 0.02%",
      futuresOptions: "Rs 20 per order",
      commodities: "Rs 20 per order",
      currency: "Rs 20 per order",
      dpCharges: 20
    },
    complaints: {
      total: 289,
      resolved: 271,
      pending: 18,
      resolutionRate: "93.8%",
      avgResolutionDays: 10
    },
    shareHolding: {
      nsdl: 280000,
      cdsl: 140000,
      total: 420000,
      avgHoldingValue: 195000
    },
    prosAndCons: {
      pros: [
        "High leverage available",
        "Good for active traders",
        "Multiple trading tools",
        "StockNote app analytics",
        "Options strategies support"
      ],
      cons: [
        "AMC charges apply",
        "Charges on delivery",
        "Limited mutual funds",
        "Customer support delays"
      ]
    },
    financials: {
      revenue: "Rs 165 Cr",
      profit: "Rs 24 Cr",
      netWorth: "Rs 180 Cr",
      fy: "FY24"
    },
    ratings: {
      overall: 3.9,
      trading: 4.2,
      research: 3.6,
      support: 3.5,
      platform: 4.1,
      pricing: 4.0
    },
    features: {
      mobileApp: true,
      webPlatform: true,
      apiAccess: true,
      research: true,
      ipo: true,
      mutualFunds: true,
      bonds: false,
      insurance: false,
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
