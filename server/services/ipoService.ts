import axios from "axios";

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
}

export interface IPOCacheData {
  ipos: IPOData[];
  lastUpdated: string;
  isStale: boolean;
  source: string;
}

interface CachedIPOData {
  data: IPOCacheData;
  timestamp: number;
}

let ipoCache: CachedIPOData | null = null;
const IPO_CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
const STALE_THRESHOLD = 6 * 60 * 60 * 1000; // 6 hours

const IPO_ALERTS_BASE_URL = "https://api.ipoalerts.in";

function normalizeStatus(status: string): IPOData["status"] {
  const statusLower = status.toLowerCase();
  if (statusLower.includes("open") || statusLower.includes("ongoing") || statusLower.includes("live")) {
    return "ongoing";
  }
  if (statusLower.includes("upcoming") || statusLower.includes("announced")) {
    return "upcoming";
  }
  if (statusLower.includes("listed")) {
    return "listed";
  }
  return "closed";
}

function parsePrice(priceStr: string | number): number {
  if (typeof priceStr === "number") return priceStr;
  const cleaned = priceStr.replace(/[^\d.]/g, "");
  return parseFloat(cleaned) || 0;
}

function parsePriceBand(priceBand: string | { min: number; max: number }): { min: number; max: number } {
  if (typeof priceBand === "object" && priceBand.min !== undefined) {
    return priceBand;
  }
  if (typeof priceBand === "string") {
    const parts = priceBand.split(/[-–to]/i).map(p => parsePrice(p.trim()));
    if (parts.length >= 2) {
      return { min: parts[0], max: parts[1] };
    }
    const single = parsePrice(priceBand);
    return { min: single, max: single };
  }
  return { min: 0, max: 0 };
}

function parseDate(dateStr: string | undefined): string {
  if (!dateStr) return new Date().toISOString().split("T")[0];
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split("T")[0];
    }
  } catch (e) {
    // fallback
  }
  return dateStr;
}

function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 50);
}

async function fetchFromIPOAlerts(): Promise<IPOData[]> {
  try {
    console.log("Fetching IPO data from ipoalerts.in API...");
    
    // Fetch all IPOs (open, upcoming, closed)
    const [openRes, upcomingRes, closedRes] = await Promise.allSettled([
      axios.get(`${IPO_ALERTS_BASE_URL}/ipos?status=open`, { timeout: 10000 }),
      axios.get(`${IPO_ALERTS_BASE_URL}/ipos?status=upcoming`, { timeout: 10000 }),
      axios.get(`${IPO_ALERTS_BASE_URL}/ipos?status=closed&limit=10`, { timeout: 10000 })
    ]);

    const ipos: IPOData[] = [];

    const processResponse = (result: PromiseSettledResult<any>, defaultStatus: IPOData["status"]) => {
      if (result.status === "fulfilled" && result.value.data) {
        const data = Array.isArray(result.value.data) ? result.value.data : [result.value.data];
        data.forEach((ipo: any) => {
          if (ipo.company_name || ipo.companyName || ipo.name) {
            const companyName = ipo.company_name || ipo.companyName || ipo.name;
            const priceBand = parsePriceBand(ipo.price_band || ipo.priceBand || ipo.issue_price || "0");
            const lotSize = parseInt(ipo.lot_size || ipo.lotSize || ipo.min_lot || "1") || 1;
            
            ipos.push({
              id: generateId(companyName),
              companyName,
              symbol: ipo.symbol || ipo.ticker,
              industry: ipo.industry || ipo.sector || "General",
              status: normalizeStatus(ipo.status || defaultStatus),
              issuePrice: priceBand,
              issueSize: parseFloat(ipo.issue_size || ipo.issueSize || "0") || undefined,
              lotSize,
              minInvestment: lotSize * priceBand.max,
              openDate: parseDate(ipo.open_date || ipo.openDate || ipo.bidding_start_date),
              closeDate: parseDate(ipo.close_date || ipo.closeDate || ipo.bidding_end_date),
              listingDate: ipo.listing_date || ipo.listingDate,
              biddingStartDate: ipo.bidding_start_date,
              biddingEndDate: ipo.bidding_end_date,
              allotmentDate: ipo.allotment_date,
              refundDate: ipo.refund_date,
              subscriptionStatus: ipo.subscription ? {
                retail: parseFloat(ipo.subscription.retail || "0") || 0,
                hni: parseFloat(ipo.subscription.hni || ipo.subscription.nii || "0") || 0,
                qib: parseFloat(ipo.subscription.qib || "0") || 0,
                total: parseFloat(ipo.subscription.total || ipo.subscription.overall || "0") || 0
              } : undefined,
              gmp: parseFloat(ipo.gmp || ipo.grey_market_premium || "0") || undefined,
              about: ipo.about || ipo.description,
              registrar: ipo.registrar,
              leadManager: ipo.lead_manager || ipo.leadManager,
              exchange: ipo.exchange ? (Array.isArray(ipo.exchange) ? ipo.exchange : [ipo.exchange]) : ["NSE", "BSE"],
              documentUrl: ipo.document_url || ipo.rhp_url
            });
          }
        });
      }
    };

    processResponse(openRes, "ongoing");
    processResponse(upcomingRes, "upcoming");
    processResponse(closedRes, "closed");

    console.log(`Fetched ${ipos.length} IPOs from ipoalerts.in`);
    return ipos;
  } catch (error: any) {
    console.error("Error fetching from ipoalerts.in:", error.message);
    throw error;
  }
}

async function fetchFromNSE(): Promise<IPOData[]> {
  try {
    console.log("Fetching IPO data from NSE...");
    
    const response = await axios.get("https://www.nseindia.com/api/ipo-current-issue", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.nseindia.com/"
      },
      timeout: 10000
    });

    const ipos: IPOData[] = [];
    
    if (response.data && Array.isArray(response.data.data)) {
      response.data.data.forEach((ipo: any) => {
        const priceBand = parsePriceBand(ipo.priceBand || ipo.price || "0");
        const lotSize = parseInt(ipo.lotSize || ipo.minBidQuantity || "1") || 1;
        
        ipos.push({
          id: generateId(ipo.companyName || ipo.symbol),
          companyName: ipo.companyName || ipo.symbol,
          symbol: ipo.symbol,
          industry: ipo.industry || "General",
          status: normalizeStatus(ipo.status || "ongoing"),
          issuePrice: priceBand,
          issueSize: parseFloat(ipo.issueSize || "0") || undefined,
          lotSize,
          minInvestment: lotSize * priceBand.max,
          openDate: parseDate(ipo.openDate || ipo.biddingStartDate),
          closeDate: parseDate(ipo.closeDate || ipo.biddingEndDate),
          listingDate: ipo.listingDate,
          exchange: ["NSE"]
        });
      });
    }

    console.log(`Fetched ${ipos.length} IPOs from NSE`);
    return ipos;
  } catch (error: any) {
    console.error("Error fetching from NSE:", error.message);
    throw error;
  }
}

// Fallback static data for when APIs are unavailable - realistic sample IPOs
function getFallbackData(): IPOData[] {
  return [
    {
      id: "abc-tech",
      companyName: "ABC Technologies Ltd",
      industry: "Technology",
      status: "ongoing",
      issuePrice: { min: 180, max: 195 },
      issueSize: 1250,
      lotSize: 77,
      minInvestment: 15015,
      openDate: "2024-12-26",
      closeDate: "2024-12-30",
      listingDate: "2025-01-03",
      subscriptionStatus: { retail: 4.25, hni: 8.92, qib: 15.67, total: 9.45 },
      about: "ABC Technologies is a leading IT services company specializing in enterprise software solutions and digital transformation services.",
      highlights: [
        "Strong presence in enterprise software market",
        "Consistent revenue growth of 25% CAGR over 5 years",
        "Diversified client base across 8 industry verticals"
      ],
      financials: { revenue: "Rs 425 Cr (FY24)", profit: "Rs 68 Cr (FY24)", assets: "Rs 312 Cr", netWorth: "Rs 185 Cr" },
      registrar: "Link Intime India Pvt Ltd",
      leadManager: "ICICI Securities, Axis Capital",
      exchange: ["NSE", "BSE"],
      gmp: 45
    },
    {
      id: "green-energy",
      companyName: "Green Energy Solutions Ltd",
      industry: "Renewable Energy",
      status: "upcoming",
      issuePrice: { min: 320, max: 340 },
      issueSize: 2100,
      lotSize: 44,
      minInvestment: 14960,
      openDate: "2024-12-28",
      closeDate: "2025-01-02",
      listingDate: "2025-01-07",
      about: "Green Energy Solutions is a renewable energy company focused on solar and wind power generation with 850 MW operational capacity.",
      highlights: [
        "Second largest solar power generator in Western India",
        "Long-term PPAs with state utilities",
        "Strong government policy support for renewable sector"
      ],
      financials: { revenue: "Rs 680 Cr (FY24)", profit: "Rs 142 Cr (FY24)", assets: "Rs 2,450 Cr", netWorth: "Rs 890 Cr" },
      registrar: "KFin Technologies Ltd",
      leadManager: "Kotak Mahindra Capital, SBI Capital",
      exchange: ["NSE", "BSE"]
    },
    {
      id: "fintech-pay",
      companyName: "FinTech Pay Solutions",
      industry: "Financial Services",
      status: "upcoming",
      issuePrice: { min: 420, max: 450 },
      issueSize: 3200,
      lotSize: 33,
      minInvestment: 14850,
      openDate: "2025-01-10",
      closeDate: "2025-01-14",
      listingDate: "2025-01-18",
      about: "FinTech Pay Solutions is a digital payments company processing over 50 million transactions monthly.",
      highlights: [
        "Fast-growing digital payments player",
        "50M+ monthly transactions",
        "Strong unit economics with 85% gross margin"
      ],
      financials: { revenue: "Rs 520 Cr (FY24)", profit: "Rs 78 Cr (FY24)", assets: "Rs 380 Cr", netWorth: "Rs 290 Cr" },
      registrar: "Link Intime India Pvt Ltd",
      leadManager: "Morgan Stanley, Goldman Sachs",
      exchange: ["NSE", "BSE"]
    }
  ];
}

export async function fetchIPOData(forceRefresh: boolean = false): Promise<IPOCacheData> {
  const now = Date.now();

  // Return cached data if valid and not forcing refresh
  if (!forceRefresh && ipoCache && (now - ipoCache.timestamp) < IPO_CACHE_DURATION) {
    return ipoCache.data;
  }

  let ipos: IPOData[] = [];
  let source = "unknown";
  let isStale = false;

  try {
    // Try ipoalerts.in first
    ipos = await fetchFromIPOAlerts();
    source = "ipoalerts.in";
    
    // If API returned empty, use fallback data
    if (ipos.length === 0) {
      console.log("ipoalerts.in returned empty data, using fallback...");
      ipos = getFallbackData();
      source = "sample-data";
    }
  } catch (error) {
    console.log("ipoalerts.in failed, trying NSE...");
    try {
      ipos = await fetchFromNSE();
      source = "NSE";
      
      // If NSE also returned empty, use fallback
      if (ipos.length === 0) {
        console.log("NSE returned empty data, using fallback...");
        ipos = getFallbackData();
        source = "sample-data";
      }
    } catch (nseError) {
      console.log("NSE failed, using cached or fallback data");
      
      // Return stale cache if available and has data
      if (ipoCache && ipoCache.data.ipos.length > 0) {
        const staleDuration = now - ipoCache.timestamp;
        return {
          ...ipoCache.data,
          isStale: staleDuration > STALE_THRESHOLD,
          lastUpdated: ipoCache.data.lastUpdated
        };
      }
      
      // Use fallback data as last resort
      ipos = getFallbackData();
      source = "sample-data";
      isStale = false;
    }
  }

  // Sort IPOs: ongoing first, then upcoming, then closed
  const statusOrder = { ongoing: 0, upcoming: 1, closed: 2, listed: 3 };
  ipos.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  const cacheData: IPOCacheData = {
    ipos,
    lastUpdated: new Date().toISOString(),
    isStale,
    source
  };

  ipoCache = {
    data: cacheData,
    timestamp: now
  };

  return cacheData;
}

export function getIPOById(id: string): IPOData | undefined {
  if (!ipoCache) return undefined;
  return ipoCache.data.ipos.find(ipo => ipo.id === id);
}

export function clearIPOCache(): void {
  ipoCache = null;
  console.log("IPO cache cleared");
}

// Start background refresh job
let refreshInterval: NodeJS.Timeout | null = null;

export function startIPORefreshJob(): void {
  if (refreshInterval) return;
  
  // Initial fetch
  fetchIPOData(true).catch(err => console.error("Initial IPO fetch failed:", err));
  
  // Refresh every 15 minutes
  refreshInterval = setInterval(async () => {
    try {
      console.log("Running scheduled IPO data refresh...");
      await fetchIPOData(true);
    } catch (error) {
      console.error("Scheduled IPO refresh failed:", error);
    }
  }, IPO_CACHE_DURATION);

  console.log("IPO refresh job started (every 15 minutes)");
}

export function stopIPORefreshJob(): void {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
    console.log("IPO refresh job stopped");
  }
}
