import axios from "axios";

export interface EconomicEvent {
  id: string;
  event: string;
  country: string;
  countryCode: string;
  date: string;
  time: string;
  impact: "low" | "medium" | "high";
  actual: string | null;
  forecast: string | null;
  previous: string | null;
  unit: string;
  currency: string;
  description: string;
  whatItMeans: string;
  marketImpact: "bullish" | "bearish" | "volatile" | "neutral";
  affectedMarkets: string[];
  sector: string;
  frequency: string;
  source: string;
}

interface CachedCalendarData {
  events: EconomicEvent[];
  lastUpdated: string;
  isStale: boolean;
}

let calendarCache: CachedCalendarData | null = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes for more real-time feel
let lastFetchTime = 0;

// Country code to full name mapping
const countryNames: Record<string, string> = {
  US: "United States",
  IN: "India",
  GB: "United Kingdom",
  EU: "European Union",
  JP: "Japan",
  CN: "China",
  DE: "Germany",
  FR: "France",
  AU: "Australia",
  CA: "Canada",
  CH: "Switzerland",
  NZ: "New Zealand",
  BR: "Brazil",
  MX: "Mexico",
  KR: "South Korea",
  SG: "Singapore",
  HK: "Hong Kong",
  ZA: "South Africa",
  RU: "Russia",
  IT: "Italy",
  ES: "Spain",
};

// Comprehensive event details database
const eventDetails: Record<string, {
  description: string;
  whatItMeans: string;
  bullishIf: string;
  bearishIf: string;
  affectedMarkets: string[];
  sector: string;
  frequency: string;
}> = {
  "interest rate": {
    description: "The central bank's benchmark interest rate that influences borrowing costs across the economy. This is one of the most powerful monetary policy tools.",
    whatItMeans: "When central banks change interest rates, it affects everything from mortgage rates to business loans. Higher rates make borrowing expensive, slowing economic growth. Lower rates stimulate spending and investment.",
    bullishIf: "Rate cut or dovish guidance suggests easier monetary policy ahead",
    bearishIf: "Rate hike or hawkish tone signals tighter financial conditions",
    affectedMarkets: ["Stocks", "Bonds", "Forex", "Banking Sector", "Real Estate"],
    sector: "Banking & Finance",
    frequency: "Monthly/Quarterly"
  },
  "gdp": {
    description: "Gross Domestic Product measures the total value of goods and services produced by a country. It's the broadest measure of economic health.",
    whatItMeans: "GDP growth indicates economic expansion - businesses are producing more, people are spending, and jobs are being created. Negative GDP signals recession.",
    bullishIf: "Growth exceeds expectations, showing strong economic momentum",
    bearishIf: "Growth misses estimates or turns negative, indicating slowdown",
    affectedMarkets: ["Stocks", "Index Funds", "Forex", "All Sectors"],
    sector: "Broad Economy",
    frequency: "Quarterly"
  },
  "nonfarm payroll": {
    description: "US employment data showing the number of jobs added or lost in the non-agricultural sector. The most closely watched employment indicator globally.",
    whatItMeans: "Strong job creation means more people have income to spend, boosting the economy. Weak numbers suggest companies are cutting costs and slowing hiring.",
    bullishIf: "Job gains exceed forecasts, showing robust labor market",
    bearishIf: "Jobs disappoint or decline, signaling economic weakness",
    affectedMarkets: ["Stocks", "Forex (USD)", "Bonds", "Consumer Sector"],
    sector: "Employment",
    frequency: "Monthly"
  },
  "cpi": {
    description: "Consumer Price Index measures changes in the prices of goods and services purchased by households. The primary inflation gauge.",
    whatItMeans: "Rising CPI means your money buys less - inflation erodes purchasing power. Central banks closely monitor this to decide on interest rates.",
    bullishIf: "Inflation cooling towards target (around 2%) reduces rate hike pressure",
    bearishIf: "Higher than expected inflation means potential aggressive rate hikes",
    affectedMarkets: ["Stocks", "Bonds", "Forex", "Consumer Goods", "Gold"],
    sector: "Inflation",
    frequency: "Monthly"
  },
  "pmi": {
    description: "Purchasing Managers Index surveys business executives on new orders, production, employment, and inventories. Above 50 signals expansion.",
    whatItMeans: "PMI is a leading indicator - it tells us what businesses expect in coming months. Manufacturing PMI above 50 means factories are expanding.",
    bullishIf: "Reading above 50 and rising shows accelerating business activity",
    bearishIf: "Below 50 or declining signals manufacturing contraction",
    affectedMarkets: ["Stocks", "Industrial Sector", "Commodities", "Forex"],
    sector: "Manufacturing",
    frequency: "Monthly"
  },
  "unemployment": {
    description: "The percentage of the labor force that is actively seeking work but unable to find employment.",
    whatItMeans: "Low unemployment indicates a healthy economy where jobs are plentiful. High unemployment means economic distress and reduced consumer spending.",
    bullishIf: "Unemployment falls, showing strong job market",
    bearishIf: "Unemployment rises, signaling economic troubles",
    affectedMarkets: ["Stocks", "Consumer Sector", "Forex", "Retail"],
    sector: "Employment",
    frequency: "Monthly"
  },
  "retail sales": {
    description: "Measures total receipts at stores that sell merchandise to consumers. A key indicator of consumer spending.",
    whatItMeans: "Consumer spending drives about 70% of GDP in developed economies. Strong retail sales mean confident consumers opening their wallets.",
    bullishIf: "Sales beat expectations, showing strong consumer demand",
    bearishIf: "Weak sales suggest consumers are pulling back spending",
    affectedMarkets: ["Stocks", "Retail Sector", "Consumer Goods", "E-commerce"],
    sector: "Consumer",
    frequency: "Monthly"
  },
  "trade balance": {
    description: "The difference between a country's exports and imports. A surplus means exports exceed imports.",
    whatItMeans: "A trade surplus strengthens the currency as foreigners buy local currency to pay for exports. Deficits can pressure the currency.",
    bullishIf: "Surplus widens or deficit narrows, showing export strength",
    bearishIf: "Growing deficit suggests weak exports or excessive imports",
    affectedMarkets: ["Forex", "Export Stocks", "Commodities"],
    sector: "International Trade",
    frequency: "Monthly"
  },
  "industrial production": {
    description: "Measures the output of factories, mines, and utilities. A key indicator of manufacturing health.",
    whatItMeans: "Rising production means factories are busy fulfilling orders - a sign of economic strength. Falling production signals slowdown.",
    bullishIf: "Production growth exceeds expectations",
    bearishIf: "Production declines or misses forecasts",
    affectedMarkets: ["Stocks", "Industrial Sector", "Commodities"],
    sector: "Manufacturing",
    frequency: "Monthly"
  },
  "consumer confidence": {
    description: "Survey measuring how optimistic consumers feel about the economy and their personal finances.",
    whatItMeans: "Confident consumers spend more, driving economic growth. Pessimistic consumers save money and delay purchases.",
    bullishIf: "Confidence rises, suggesting consumers will spend more",
    bearishIf: "Confidence falls, warning of reduced spending ahead",
    affectedMarkets: ["Stocks", "Retail", "Consumer Goods", "Auto"],
    sector: "Consumer Sentiment",
    frequency: "Monthly"
  },
  "housing": {
    description: "Data on home sales, construction, and prices. A leading indicator of economic health.",
    whatItMeans: "Strong housing markets create wealth and construction jobs. Weak housing can signal broader economic troubles.",
    bullishIf: "Home sales and starts exceed expectations",
    bearishIf: "Housing data disappoints, suggesting sector weakness",
    affectedMarkets: ["Real Estate Stocks", "Home Builders", "Banking", "Materials"],
    sector: "Real Estate",
    frequency: "Monthly"
  },
  "rbi": {
    description: "Reserve Bank of India's monetary policy decision affecting interest rates and liquidity in India's financial system.",
    whatItMeans: "RBI's decisions directly impact Indian banks, borrowers, and the rupee. Rate cuts boost growth but may weaken INR.",
    bullishIf: "Accommodative stance with rate cuts or liquidity injection",
    bearishIf: "Hawkish stance with rate hikes to control inflation",
    affectedMarkets: ["Nifty", "Bank Nifty", "INR/USD", "Indian Bonds"],
    sector: "Indian Banking",
    frequency: "Bi-monthly"
  },
  "ecb": {
    description: "European Central Bank interest rate decision affecting the Eurozone's 20 member countries.",
    whatItMeans: "ECB policy impacts the Euro and all European markets. Their decisions ripple through global financial markets.",
    bullishIf: "Dovish signals or rate cuts boost risk assets",
    bearishIf: "Hawkish stance pressures European equities",
    affectedMarkets: ["European Stocks", "EUR/USD", "Euro Bonds", "Banking"],
    sector: "European Finance",
    frequency: "Six-weekly"
  },
  "fed": {
    description: "US Federal Reserve interest rate decision - the most important monetary policy announcement globally.",
    whatItMeans: "The Fed's decisions affect global markets because the US dollar is the world's reserve currency. All eyes are on Fed Chair's guidance.",
    bullishIf: "Dovish pivot or slower rate hike pace",
    bearishIf: "Hawkish surprise or accelerated tightening",
    affectedMarkets: ["Global Stocks", "USD", "Bonds", "Emerging Markets", "Gold"],
    sector: "Global Finance",
    frequency: "Eight times yearly"
  },
  "wholesale price": {
    description: "Measures price changes at the wholesale level before goods reach consumers. A leading inflation indicator.",
    whatItMeans: "Rising wholesale prices often lead to higher consumer prices. It's an early warning signal for inflation.",
    bullishIf: "WPI moderates, reducing inflation concerns",
    bearishIf: "WPI accelerates, suggesting more inflation ahead",
    affectedMarkets: ["Stocks", "Commodities", "Manufacturing"],
    sector: "Inflation",
    frequency: "Monthly"
  },
  "jobless claims": {
    description: "Weekly count of new unemployment benefit applications. The most timely indicator of labor market health.",
    whatItMeans: "Rising claims mean more people are losing jobs. Low claims suggest employers are holding onto workers.",
    bullishIf: "Claims fall or stay low, showing stable employment",
    bearishIf: "Claims spike, warning of rising layoffs",
    affectedMarkets: ["Stocks", "Consumer Sector", "USD"],
    sector: "Employment",
    frequency: "Weekly"
  },
  "employment change": {
    description: "Net change in the number of employed persons in the economy.",
    whatItMeans: "Positive employment change means more jobs being created than lost - a healthy economy. Negative change signals trouble.",
    bullishIf: "Strong job gains exceed market expectations",
    bearishIf: "Job losses or weak gains disappoint",
    affectedMarkets: ["Stocks", "Forex", "Consumer Sector"],
    sector: "Employment",
    frequency: "Monthly"
  },
  "services pmi": {
    description: "Purchasing Managers Index for the services sector, which makes up the majority of developed economies.",
    whatItMeans: "Services PMI above 50 means the service sector is expanding. Since services dominate modern economies, this is crucial.",
    bullishIf: "Above 50 and rising signals service sector growth",
    bearishIf: "Below 50 indicates service sector contraction",
    affectedMarkets: ["Stocks", "IT Services", "Financial Services", "Retail"],
    sector: "Services",
    frequency: "Monthly"
  },
  "manufacturing pmi": {
    description: "Purchasing Managers Index specifically for manufacturing activity and factory output.",
    whatItMeans: "Manufacturing PMI shows factory health. While services dominate, manufacturing still moves commodity prices and industrial stocks.",
    bullishIf: "Strong reading shows factories are busy with orders",
    bearishIf: "Weak reading suggests manufacturing slowdown",
    affectedMarkets: ["Industrial Stocks", "Commodities", "Materials", "Auto"],
    sector: "Manufacturing",
    frequency: "Monthly"
  }
};

// Determine event category and get details
function getEventDetails(eventName: string): {
  description: string;
  whatItMeans: string;
  marketImpact: "bullish" | "bearish" | "volatile" | "neutral";
  affectedMarkets: string[];
  sector: string;
  frequency: string;
} {
  const eventLower = eventName.toLowerCase();
  
  for (const [keyword, details] of Object.entries(eventDetails)) {
    if (eventLower.includes(keyword)) {
      return {
        description: details.description,
        whatItMeans: details.whatItMeans,
        marketImpact: "volatile", // Will be determined based on actual vs forecast
        affectedMarkets: details.affectedMarkets,
        sector: details.sector,
        frequency: details.frequency
      };
    }
  }
  
  // Default for unrecognized events
  return {
    description: `${eventName} is an economic indicator that provides insights into the health of the economy.`,
    whatItMeans: "This economic release can influence market expectations and asset prices based on whether it beats or misses forecasts.",
    marketImpact: "neutral",
    affectedMarkets: ["Stocks", "Forex"],
    sector: "Economy",
    frequency: "Periodic"
  };
}

// Determine market impact based on actual vs forecast
function determineMarketImpact(
  actual: string | null, 
  forecast: string | null, 
  eventName: string
): "bullish" | "bearish" | "volatile" | "neutral" {
  if (!actual || !forecast) return "neutral";
  
  const actualNum = parseFloat(actual);
  const forecastNum = parseFloat(forecast);
  
  if (isNaN(actualNum) || isNaN(forecastNum)) return "neutral";
  
  const diff = actualNum - forecastNum;
  const percentDiff = Math.abs(diff / forecastNum) * 100;
  
  // For most indicators, higher is better
  const invertedIndicators = ["unemployment", "jobless claims", "cpi", "inflation", "wpi", "wholesale price"];
  const isInverted = invertedIndicators.some(ind => eventName.toLowerCase().includes(ind));
  
  if (percentDiff < 2) return "neutral";
  if (percentDiff > 20) return "volatile";
  
  if (isInverted) {
    return diff > 0 ? "bearish" : "bullish";
  } else {
    return diff > 0 ? "bullish" : "bearish";
  }
}

// Impact determination based on event type
function determineImpact(event: string): "low" | "medium" | "high" {
  const highImpact = [
    "interest rate",
    "gdp",
    "nonfarm payroll",
    "unemployment",
    "inflation",
    "cpi",
    "pmi",
    "fed",
    "rbi",
    "monetary policy",
    "fomc",
    "central bank",
    "retail sales",
    "trade balance",
    "ecb",
    "boe",
    "boj",
  ];
  const mediumImpact = [
    "manufacturing",
    "industrial production",
    "housing",
    "consumer confidence",
    "ppi",
    "employment",
    "jobs",
    "exports",
    "imports",
    "budget",
    "fiscal",
    "wpi",
    "wholesale",
    "services",
  ];

  const eventLower = event.toLowerCase();
  if (highImpact.some((keyword) => eventLower.includes(keyword))) return "high";
  if (mediumImpact.some((keyword) => eventLower.includes(keyword))) return "medium";
  return "low";
}

// Fetch economic calendar from Finnhub
async function fetchFromFinnhub(): Promise<EconomicEvent[]> {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
  if (!FINNHUB_API_KEY) {
    console.log("Finnhub API key not configured, using sample data");
    return [];
  }

  try {
    const today = new Date();
    const from = new Date(today);
    from.setDate(from.getDate() - 7);
    const to = new Date(today);
    to.setDate(to.getDate() + 14);

    const fromStr = from.toISOString().split("T")[0];
    const toStr = to.toISOString().split("T")[0];

    const url = `https://finnhub.io/api/v1/calendar/economic?from=${fromStr}&to=${toStr}&token=${FINNHUB_API_KEY}`;

    console.log("Fetching economic calendar from Finnhub...");
    const response = await axios.get(url, { timeout: 10000 });

    if (response.data?.economicCalendar) {
      return response.data.economicCalendar.map((item: any, index: number) => {
        const eventDate = new Date(item.time * 1000);
        const eventName = item.event || "Economic Event";
        const details = getEventDetails(eventName);
        const actual = item.actual !== null && item.actual !== undefined ? String(item.actual) : null;
        const forecast = item.estimate !== null && item.estimate !== undefined ? String(item.estimate) : null;
        
        return {
          id: `fh-${index}-${item.time}`,
          event: eventName,
          country: countryNames[item.country] || item.country || "Global",
          countryCode: item.country || "GL",
          date: eventDate.toISOString().split("T")[0],
          time: eventDate.toTimeString().slice(0, 5),
          impact: item.impact
            ? (["low", "medium", "high"][item.impact - 1] as "low" | "medium" | "high")
            : determineImpact(eventName),
          actual,
          forecast,
          previous: item.prev !== null && item.prev !== undefined ? String(item.prev) : null,
          unit: item.unit || "",
          currency: item.country === "US" ? "USD" : item.country || "USD",
          description: details.description,
          whatItMeans: details.whatItMeans,
          marketImpact: determineMarketImpact(actual, forecast, eventName),
          affectedMarkets: details.affectedMarkets,
          sector: details.sector,
          frequency: details.frequency,
          source: "Finnhub"
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Finnhub economic calendar fetch error:", error);
    return [];
  }
}

// Generate comprehensive sample economic calendar data as fallback
function generateSampleCalendarData(): EconomicEvent[] {
  const today = new Date();
  const events: EconomicEvent[] = [];

  const sampleEvents = [
    { event: "RBI Monetary Policy Decision", countryCode: "IN", unit: "%" },
    { event: "India CPI Inflation Rate YoY", countryCode: "IN", unit: "%" },
    { event: "India GDP Growth Rate QoQ", countryCode: "IN", unit: "%" },
    { event: "US Fed Interest Rate Decision", countryCode: "US", unit: "%" },
    { event: "US Nonfarm Payrolls", countryCode: "US", unit: "K" },
    { event: "US CPI YoY", countryCode: "US", unit: "%" },
    { event: "India Manufacturing PMI", countryCode: "IN", unit: "" },
    { event: "India Services PMI", countryCode: "IN", unit: "" },
    { event: "US Retail Sales MoM", countryCode: "US", unit: "%" },
    { event: "UK Interest Rate Decision", countryCode: "GB", unit: "%" },
    { event: "EU CPI YoY", countryCode: "EU", unit: "%" },
    { event: "Japan GDP Growth Rate", countryCode: "JP", unit: "%" },
    { event: "China Manufacturing PMI", countryCode: "CN", unit: "" },
    { event: "India Trade Balance", countryCode: "IN", unit: "B" },
    { event: "US Initial Jobless Claims", countryCode: "US", unit: "K" },
    { event: "India Industrial Production YoY", countryCode: "IN", unit: "%" },
    { event: "US Consumer Confidence Index", countryCode: "US", unit: "" },
    { event: "India Wholesale Price Index YoY", countryCode: "IN", unit: "%" },
    { event: "ECB Interest Rate Decision", countryCode: "EU", unit: "%" },
    { event: "Australia Employment Change", countryCode: "AU", unit: "K" },
    { event: "US Unemployment Rate", countryCode: "US", unit: "%" },
    { event: "China Industrial Production YoY", countryCode: "CN", unit: "%" },
    { event: "UK GDP Growth Rate QoQ", countryCode: "GB", unit: "%" },
    { event: "Japan Consumer Confidence", countryCode: "JP", unit: "" },
    { event: "Canada Employment Change", countryCode: "CA", unit: "K" },
    { event: "Germany Manufacturing PMI", countryCode: "DE", unit: "" },
    { event: "France CPI YoY", countryCode: "FR", unit: "%" },
    { event: "India Services Trade Balance", countryCode: "IN", unit: "B" },
    { event: "US Housing Starts", countryCode: "US", unit: "M" },
    { event: "US ISM Manufacturing PMI", countryCode: "US", unit: "" },
  ];

  // Generate events for past 7 days and next 14 days
  for (let dayOffset = -7; dayOffset <= 14; dayOffset++) {
    const eventDate = new Date(today);
    eventDate.setDate(eventDate.getDate() + dayOffset);

    // Add 2-4 events per day
    const eventsPerDay = Math.floor(Math.random() * 3) + 2;
    const usedEvents = new Set<number>();
    
    for (let i = 0; i < eventsPerDay; i++) {
      let eventIndex;
      do {
        eventIndex = Math.floor(Math.random() * sampleEvents.length);
      } while (usedEvents.has(eventIndex) && usedEvents.size < sampleEvents.length);
      usedEvents.add(eventIndex);
      
      const sampleEvent = sampleEvents[eventIndex];
      const hours = Math.floor(Math.random() * 12) + 6;
      const minutes = ["00", "15", "30", "45"][Math.floor(Math.random() * 4)];

      const isPast = dayOffset < 0 || (dayOffset === 0 && hours < new Date().getHours());
      const details = getEventDetails(sampleEvent.event);
      
      // Generate realistic values
      const previousValue = (Math.random() * 4 + 0.5).toFixed(1);
      const forecastValue = (parseFloat(previousValue) + (Math.random() - 0.5) * 0.8).toFixed(1);
      const actualValue = isPast ? (parseFloat(forecastValue) + (Math.random() - 0.5) * 1.2).toFixed(1) : null;

      events.push({
        id: `sample-${dayOffset}-${i}`,
        event: sampleEvent.event,
        country: countryNames[sampleEvent.countryCode] || sampleEvent.countryCode,
        countryCode: sampleEvent.countryCode,
        date: eventDate.toISOString().split("T")[0],
        time: `${hours.toString().padStart(2, "0")}:${minutes}`,
        impact: determineImpact(sampleEvent.event),
        actual: actualValue,
        forecast: forecastValue,
        previous: previousValue,
        unit: sampleEvent.unit,
        currency: sampleEvent.countryCode === "IN" ? "INR" : "USD",
        description: details.description,
        whatItMeans: details.whatItMeans,
        marketImpact: determineMarketImpact(actualValue, forecastValue, sampleEvent.event),
        affectedMarkets: details.affectedMarkets,
        sector: details.sector,
        frequency: details.frequency,
        source: "Sample Data"
      });
    }
  }

  return events.sort(
    (a, b) =>
      new Date(`${a.date} ${a.time}`).getTime() -
      new Date(`${b.date} ${b.time}`).getTime()
  );
}

export async function fetchEconomicCalendar(): Promise<CachedCalendarData> {
  const now = Date.now();

  if (calendarCache && now - lastFetchTime < CACHE_DURATION) {
    return calendarCache;
  }

  try {
    let events = await fetchFromFinnhub();

    if (events.length === 0) {
      console.log("Using sample economic calendar data");
      events = generateSampleCalendarData();
    }

    calendarCache = {
      events,
      lastUpdated: new Date().toISOString(),
      isStale: false,
    };
    lastFetchTime = now;

    return calendarCache;
  } catch (error) {
    console.error("Economic calendar fetch error:", error);

    if (calendarCache) {
      return { ...calendarCache, isStale: true };
    }

    return {
      events: generateSampleCalendarData(),
      lastUpdated: new Date().toISOString(),
      isStale: true,
    };
  }
}

export function clearCalendarCache(): void {
  calendarCache = null;
  lastFetchTime = 0;
}

// Background refresh job - every 15 minutes for more real-time feel
let refreshInterval: NodeJS.Timeout | null = null;

export function startCalendarRefreshJob(): void {
  if (refreshInterval) return;

  console.log("Economic calendar refresh job started (every 15 minutes)");

  refreshInterval = setInterval(
    async () => {
      try {
        console.log("Auto-refreshing economic calendar...");
        clearCalendarCache();
        await fetchEconomicCalendar();
      } catch (error) {
        console.error("Economic calendar auto-refresh failed:", error);
      }
    },
    15 * 60 * 1000
  );

  fetchEconomicCalendar();
}
