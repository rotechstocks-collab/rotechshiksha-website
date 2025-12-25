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
}

interface CachedCalendarData {
  events: EconomicEvent[];
  lastUpdated: string;
  isStale: boolean;
}

let calendarCache: CachedCalendarData | null = null;
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
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
  ];

  const eventLower = event.toLowerCase();
  if (highImpact.some((keyword) => eventLower.includes(keyword))) return "high";
  if (mediumImpact.some((keyword) => eventLower.includes(keyword)))
    return "medium";
  return "low";
}

// Fetch economic calendar from Finnhub
async function fetchFromFinnhub(): Promise<EconomicEvent[]> {
  const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
  if (!FINNHUB_API_KEY) {
    console.log("Finnhub API key not configured");
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
        return {
          id: `fh-${index}-${item.time}`,
          event: item.event || "Economic Event",
          country: countryNames[item.country] || item.country || "Global",
          countryCode: item.country || "GL",
          date: eventDate.toISOString().split("T")[0],
          time: eventDate.toTimeString().slice(0, 5),
          impact: item.impact
            ? (["low", "medium", "high"][item.impact - 1] as
                | "low"
                | "medium"
                | "high")
            : determineImpact(item.event || ""),
          actual:
            item.actual !== null && item.actual !== undefined
              ? String(item.actual)
              : null,
          forecast:
            item.estimate !== null && item.estimate !== undefined
              ? String(item.estimate)
              : null,
          previous:
            item.prev !== null && item.prev !== undefined
              ? String(item.prev)
              : null,
          unit: item.unit || "",
          currency: item.country === "US" ? "USD" : item.country || "USD",
        };
      });
    }
    return [];
  } catch (error) {
    console.error("Finnhub economic calendar fetch error:", error);
    return [];
  }
}

// Generate sample economic calendar data as fallback
function generateSampleCalendarData(): EconomicEvent[] {
  const today = new Date();
  const events: EconomicEvent[] = [];

  const sampleEvents = [
    {
      event: "RBI Monetary Policy Decision",
      country: "India",
      countryCode: "IN",
      impact: "high" as const,
      unit: "%",
    },
    {
      event: "India CPI Inflation Rate",
      country: "India",
      countryCode: "IN",
      impact: "high" as const,
      unit: "%",
    },
    {
      event: "India GDP Growth Rate",
      country: "India",
      countryCode: "IN",
      impact: "high" as const,
      unit: "%",
    },
    {
      event: "US Fed Interest Rate Decision",
      country: "United States",
      countryCode: "US",
      impact: "high" as const,
      unit: "%",
    },
    {
      event: "US Nonfarm Payrolls",
      country: "United States",
      countryCode: "US",
      impact: "high" as const,
      unit: "K",
    },
    {
      event: "US CPI YoY",
      country: "United States",
      countryCode: "US",
      impact: "high" as const,
      unit: "%",
    },
    {
      event: "India Manufacturing PMI",
      country: "India",
      countryCode: "IN",
      impact: "medium" as const,
      unit: "",
    },
    {
      event: "India Services PMI",
      country: "India",
      countryCode: "IN",
      impact: "medium" as const,
      unit: "",
    },
    {
      event: "US Retail Sales MoM",
      country: "United States",
      countryCode: "US",
      impact: "medium" as const,
      unit: "%",
    },
    {
      event: "UK Interest Rate Decision",
      country: "United Kingdom",
      countryCode: "GB",
      impact: "high" as const,
      unit: "%",
    },
    {
      event: "EU CPI YoY",
      country: "European Union",
      countryCode: "EU",
      impact: "high" as const,
      unit: "%",
    },
    {
      event: "Japan GDP Growth Rate",
      country: "Japan",
      countryCode: "JP",
      impact: "high" as const,
      unit: "%",
    },
    {
      event: "China Industrial Production",
      country: "China",
      countryCode: "CN",
      impact: "medium" as const,
      unit: "%",
    },
    {
      event: "India Trade Balance",
      country: "India",
      countryCode: "IN",
      impact: "medium" as const,
      unit: "B",
    },
    {
      event: "US Initial Jobless Claims",
      country: "United States",
      countryCode: "US",
      impact: "low" as const,
      unit: "K",
    },
    {
      event: "India Industrial Production",
      country: "India",
      countryCode: "IN",
      impact: "medium" as const,
      unit: "%",
    },
    {
      event: "US Consumer Confidence",
      country: "United States",
      countryCode: "US",
      impact: "medium" as const,
      unit: "",
    },
    {
      event: "India Wholesale Price Index",
      country: "India",
      countryCode: "IN",
      impact: "medium" as const,
      unit: "%",
    },
    {
      event: "EU ECB Interest Rate Decision",
      country: "European Union",
      countryCode: "EU",
      impact: "high" as const,
      unit: "%",
    },
    {
      event: "Australia Employment Change",
      country: "Australia",
      countryCode: "AU",
      impact: "medium" as const,
      unit: "K",
    },
  ];

  // Generate events for past 7 days and next 14 days
  for (let dayOffset = -7; dayOffset <= 14; dayOffset++) {
    const eventDate = new Date(today);
    eventDate.setDate(eventDate.getDate() + dayOffset);

    // Add 1-3 events per day
    const eventsPerDay = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < eventsPerDay; i++) {
      const randomEvent =
        sampleEvents[Math.floor(Math.random() * sampleEvents.length)];
      const hours = Math.floor(Math.random() * 12) + 6;
      const minutes = Math.random() > 0.5 ? "00" : "30";

      const isPast = dayOffset < 0 || (dayOffset === 0 && hours < new Date().getHours());

      events.push({
        id: `sample-${dayOffset}-${i}`,
        event: randomEvent.event,
        country: randomEvent.country,
        countryCode: randomEvent.countryCode,
        date: eventDate.toISOString().split("T")[0],
        time: `${hours.toString().padStart(2, "0")}:${minutes}`,
        impact: randomEvent.impact,
        actual: isPast ? (Math.random() * 5 + 1).toFixed(1) : null,
        forecast: (Math.random() * 5 + 1).toFixed(1),
        previous: (Math.random() * 5 + 0.5).toFixed(1),
        unit: randomEvent.unit,
        currency: randomEvent.countryCode === "IN" ? "INR" : "USD",
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

// Background refresh job
let refreshInterval: NodeJS.Timeout | null = null;

export function startCalendarRefreshJob(): void {
  if (refreshInterval) return;

  console.log("Economic calendar refresh job started (every 30 minutes)");

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
    30 * 60 * 1000
  );

  fetchEconomicCalendar();
}
