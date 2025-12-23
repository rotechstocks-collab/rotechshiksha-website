import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Building2,
  Loader2,
  AlertCircle,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  Info,
} from "lucide-react";

interface StockData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
}

interface StockFundamentals {
  marketCap: string;
  peRatio: number;
  pbRatio?: number;
  eps: number;
  roe: number;
  roce?: number;
  debtToEquity: number;
  dividendYield: number;
  sector: string;
  industry: string;
  description: string;
  businessModel?: string;
  trendAnalysis?: string;
  riskNote?: string;
  beginnerInsight?: string;
}

const symbolMapping: Record<string, string> = {
  "NSEI": "NSE:NIFTY",
  "NSEBANK": "NSE:BANKNIFTY",
  "BSESN": "BSE:SENSEX",
  "RELIANCE": "NSE:RELIANCE",
  "TCS": "NSE:TCS",
  "HDFCBANK": "NSE:HDFCBANK",
  "ICICIBANK": "NSE:ICICIBANK",
  "INFY": "NSE:INFY",
  "ITC": "NSE:ITC",
  "SBIN": "NSE:SBIN",
  "BHARTIARTL": "NSE:BHARTIARTL",
  "KOTAKBANK": "NSE:KOTAKBANK",
  "LT": "NSE:LT",
  "HINDUNILVR": "NSE:HINDUNILVR",
  "AXISBANK": "NSE:AXISBANK",
  "WIPRO": "NSE:WIPRO",
  "MARUTI": "NSE:MARUTI",
  "TATAMOTORS": "NSE:TATAMOTORS",
  "ADANIENT": "NSE:ADANIENT",
  "ASIANPAINT": "NSE:ASIANPAINT",
};

const fundamentalsData: Record<string, StockFundamentals> = {
  "NSEI": { 
    marketCap: "₹382L Cr", peRatio: 22.5, pbRatio: 4.2, eps: 1074, roe: 14.2, roce: 12.8, debtToEquity: 0, dividendYield: 1.2, 
    sector: "Index", industry: "Broad Market Index", 
    description: "NIFTY 50 is India's benchmark stock market index representing the weighted average of 50 largest Indian companies listed on NSE.",
    businessModel: "NIFTY 50 tracks 50 of the largest and most liquid stocks across 13 sectors, providing diversified exposure to the Indian equity market.",
    trendAnalysis: "The index is showing consolidation near key resistance levels. Trading above 200-day moving average suggests bullish long-term trend.",
    riskNote: "Index investments carry market risk. Past performance doesn't guarantee future results. Consider your risk tolerance before investing.",
    beginnerInsight: "NIFTY 50 is ideal for beginners as it provides diversified exposure. Consider index funds or ETFs tracking NIFTY for passive investing."
  },
  "NSEBANK": { 
    marketCap: "₹52L Cr", peRatio: 15.8, pbRatio: 2.1, eps: 3312, roe: 15.5, roce: 14.2, debtToEquity: 0, dividendYield: 0.9, 
    sector: "Index", industry: "Banking Sector Index", 
    description: "Bank NIFTY comprises the most liquid and large capitalised Indian Banking stocks.",
    businessModel: "Tracks 12 major banking stocks. Highly sensitive to RBI policy changes, interest rate movements, and credit growth.",
    trendAnalysis: "Banking sector showing strength with improving asset quality. Interest rate environment remains key driver.",
    riskNote: "Sector indices are more volatile than diversified indices. Banking sector is sensitive to economic cycles.",
    beginnerInsight: "Bank NIFTY moves faster than NIFTY 50. Beginners should understand banking fundamentals before sector investing."
  },
  "BSESN": { 
    marketCap: "₹420L Cr", peRatio: 23.1, pbRatio: 4.5, eps: 3456, roe: 13.8, roce: 12.5, debtToEquity: 0, dividendYield: 1.1, 
    sector: "Index", industry: "Broad Market Index", 
    description: "SENSEX is India's oldest stock market index tracking 30 financially sound companies on BSE.",
    businessModel: "Tracks 30 blue-chip companies across sectors. Free-float market capitalization weighted methodology.",
    trendAnalysis: "Showing steady uptrend with strong institutional buying. Key support levels holding well.",
    riskNote: "Market volatility can affect returns significantly. Diversification across asset classes recommended.",
    beginnerInsight: "SENSEX is a good benchmark to track overall market health. Consider for long-term wealth creation."
  },
  "RELIANCE": { 
    marketCap: "₹16.6L Cr", peRatio: 26.8, pbRatio: 2.4, eps: 91.5, roe: 8.9, roce: 9.5, debtToEquity: 0.42, dividendYield: 0.4, 
    sector: "Energy", industry: "Oil & Gas Refining", 
    description: "Reliance Industries is India's largest private sector company with businesses in energy, petrochemicals, retail, and telecom.",
    businessModel: "Diversified conglomerate with O2C (Oil to Chemicals), Retail (Reliance Retail), and Digital (Jio) segments driving growth.",
    trendAnalysis: "Stock consolidating after recent rally. Jio and Retail businesses showing strong growth momentum.",
    riskNote: "Large cap with diversified business. Oil price volatility affects O2C margins. Heavy capex cycle ongoing.",
    beginnerInsight: "Reliance is a bellwether stock. Good for understanding conglomerate business models and sector diversification."
  },
  "TCS": { 
    marketCap: "₹14.9L Cr", peRatio: 31.2, pbRatio: 14.5, eps: 132, roe: 52.1, roce: 62.5, debtToEquity: 0.05, dividendYield: 1.3, 
    sector: "Technology", industry: "IT Services", 
    description: "Tata Consultancy Services is a global leader in IT services, consulting and business solutions.",
    businessModel: "Provides IT services, consulting, and digital solutions to global enterprises. Revenue driven by North America and Europe.",
    trendAnalysis: "Trading near all-time highs. Strong deal wins and margin improvement supporting valuation.",
    riskNote: "IT sector sensitive to global tech spending and currency fluctuations. High valuation needs earnings support.",
    beginnerInsight: "TCS is India's largest IT company. Study to understand IT services business model and global exposure."
  },
  "HDFCBANK": { 
    marketCap: "₹13.1L Cr", peRatio: 19.5, pbRatio: 2.8, eps: 88.5, roe: 16.8, roce: 14.2, debtToEquity: 0, dividendYield: 1.1, 
    sector: "Financial Services", industry: "Private Bank", 
    description: "HDFC Bank is India's largest private sector bank by assets offering comprehensive banking services.",
    businessModel: "Universal banking with strong retail franchise. Known for asset quality and consistent growth.",
    trendAnalysis: "Post-merger integration on track. Retail loan growth and deposit franchise remain strong.",
    riskNote: "Banking stocks carry credit risk. Interest rate changes affect NIMs. Regulatory changes can impact business.",
    beginnerInsight: "HDFC Bank is considered a quality banking stock. Good for understanding banking metrics like NIM, NPA, CASA."
  },
  "ICICIBANK": { 
    marketCap: "₹8.9L Cr", peRatio: 18.2, pbRatio: 2.5, eps: 67.3, roe: 17.5, roce: 15.8, debtToEquity: 0, dividendYield: 0.8, 
    sector: "Financial Services", industry: "Private Bank", 
    description: "ICICI Bank is a leading private sector bank in India with diverse financial services offerings.",
    businessModel: "Full-service banking with strong corporate and retail lending. Growing digital banking presence.",
    trendAnalysis: "Asset quality improvements and loan growth supporting re-rating. Digital initiatives gaining traction.",
    riskNote: "Corporate lending exposure adds risk. Monitor asset quality trends and provisioning coverage.",
    beginnerInsight: "Compare with HDFC Bank to understand different banking strategies and metrics."
  },
  "INFY": { 
    marketCap: "₹7.8L Cr", peRatio: 27.5, pbRatio: 8.2, eps: 68.2, roe: 31.5, roce: 38.5, debtToEquity: 0.08, dividendYield: 2.1, 
    sector: "Technology", industry: "IT Services", 
    description: "Infosys is a global leader in next-generation digital services and consulting.",
    businessModel: "Digital transformation services, cloud computing, and AI solutions. Focus on large deal wins.",
    trendAnalysis: "Strong deal pipeline but margin pressure from wage hikes. Digital revenue mix improving.",
    riskNote: "Client concentration risk. Currency headwinds affect reported earnings. Attrition management crucial.",
    beginnerInsight: "Infosys pioneered Indian IT. Study their annual reports to understand IT services industry dynamics."
  },
  "ITC": { 
    marketCap: "₹6.1L Cr", peRatio: 28.4, pbRatio: 7.8, eps: 17.2, roe: 28.5, roce: 35.2, debtToEquity: 0, dividendYield: 2.8, 
    sector: "Consumer Goods", industry: "FMCG & Tobacco", 
    description: "ITC is a diversified conglomerate with businesses in FMCG, hotels, paperboards, and agriculture.",
    businessModel: "Cigarettes remain cash cow funding FMCG expansion. Hotels and paperboards diversify revenue.",
    trendAnalysis: "FMCG business gaining market share. Cigarette volumes stabilizing. ESG concerns around tobacco.",
    riskNote: "Tobacco regulations pose long-term risk. FMCG margins lower than cigarettes. Valuation at premium to peers.",
    beginnerInsight: "ITC teaches about cash cow businesses funding new ventures. Study their FMCG journey for business strategy insights."
  },
  "SBIN": { 
    marketCap: "₹7.2L Cr", peRatio: 10.8, pbRatio: 1.5, eps: 74.5, roe: 17.2, roce: 14.5, debtToEquity: 0, dividendYield: 1.6, 
    sector: "Financial Services", industry: "Public Bank", 
    description: "State Bank of India is India's largest public sector bank with pan-India presence.",
    businessModel: "India's largest bank with extensive branch network. Strong retail and corporate lending.",
    trendAnalysis: "Asset quality improved significantly. Credit growth and margin expansion driving profitability.",
    riskNote: "PSU bank carries government ownership dynamics. Agricultural and priority sector lending mandates.",
    beginnerInsight: "SBI represents public sector banking. Compare with private banks to understand different operating models."
  },
  "BHARTIARTL": { 
    marketCap: "₹9.8L Cr", peRatio: 78.5, pbRatio: 8.5, eps: 21.2, roe: 15.8, roce: 12.5, debtToEquity: 1.52, dividendYield: 0.5, 
    sector: "Telecom", industry: "Telecom Services", 
    description: "Bharti Airtel is India's second-largest telecom operator providing mobile and broadband services.",
    businessModel: "Telecom services across India and Africa. Growing enterprise and home broadband business.",
    trendAnalysis: "ARPU improvement and 5G rollout supporting growth. Africa business showing strong momentum.",
    riskNote: "High debt levels. Intense competition with Jio. Spectrum and capex requirements are significant.",
    beginnerInsight: "Airtel shows telecom industry dynamics. Study ARPU, churn, and spectrum economics."
  },
  "KOTAKBANK": { 
    marketCap: "₹3.5L Cr", peRatio: 18.9, pbRatio: 2.6, eps: 95.2, roe: 13.5, roce: 12.8, debtToEquity: 0, dividendYield: 0.1, 
    sector: "Financial Services", industry: "Private Bank", 
    description: "Kotak Mahindra Bank is a leading private sector bank with strong retail and corporate banking presence.",
    businessModel: "Premium banking franchise with strong fee income. Asset management and insurance add value.",
    trendAnalysis: "Deposit growth needs improvement. Asset quality remains strong. Valuation at slight premium.",
    riskNote: "Promoter holding reduction mandate. Slower deposit growth compared to peers.",
    beginnerInsight: "Kotak represents premium banking model. Study their subsidiaries to understand financial conglomerates."
  },
  "LT": { 
    marketCap: "₹5.1L Cr", peRatio: 35.2, pbRatio: 4.8, eps: 104.5, roe: 14.8, roce: 12.5, debtToEquity: 0.85, dividendYield: 0.9, 
    sector: "Industrial", industry: "Engineering & Construction", 
    description: "Larsen & Toubro is India's largest engineering and construction company.",
    businessModel: "EPC projects across infra, power, and defense. IT and financial services subsidiaries diversify earnings.",
    trendAnalysis: "Strong order book provides visibility. Government infra spending supporting growth.",
    riskNote: "Working capital intensive. Project execution risks. Cyclical nature of construction business.",
    beginnerInsight: "L&T is a proxy for India's infrastructure growth. Learn about order book analysis and EPC business."
  },
  "HINDUNILVR": { 
    marketCap: "₹5.8L Cr", peRatio: 56.2, pbRatio: 12.5, eps: 44.2, roe: 85.5, roce: 95.2, debtToEquity: 0, dividendYield: 1.5, 
    sector: "Consumer Goods", industry: "FMCG", 
    description: "Hindustan Unilever is India's largest FMCG company with brands across personal care, home care, and foods.",
    businessModel: "Strong brand portfolio across price points. Distribution reach and innovation drive growth.",
    trendAnalysis: "Volume growth moderating. Rural demand recovery key. Premium segment showing strength.",
    riskNote: "High valuation leaves little margin for error. Raw material inflation affects margins.",
    beginnerInsight: "HUL teaches brand management and distribution. Study their premiumization strategy."
  },
  "AXISBANK": { 
    marketCap: "₹3.6L Cr", peRatio: 13.8, pbRatio: 2.1, eps: 85.2, roe: 16.2, roce: 14.5, debtToEquity: 0, dividendYield: 0.1, 
    sector: "Financial Services", industry: "Private Bank", 
    description: "Axis Bank is the third-largest private sector bank in India.",
    businessModel: "Retail-focused private bank with growing SME and corporate lending. Digital transformation ongoing.",
    trendAnalysis: "Turnaround story progressing. Asset quality improved. Fee income growing.",
    riskNote: "Historical asset quality concerns though improved. Competition from larger peers.",
    beginnerInsight: "Axis Bank shows banking turnaround dynamics. Compare with pre-2020 performance for learnings."
  },
  "WIPRO": { 
    marketCap: "₹2.6L Cr", peRatio: 21.5, pbRatio: 3.5, eps: 23.5, roe: 15.8, roce: 18.5, debtToEquity: 0.18, dividendYield: 0.2, 
    sector: "Technology", industry: "IT Services", 
    description: "Wipro is a global IT services company providing consulting, design, and engineering services.",
    businessModel: "IT services with focus on cloud and digital. Recent acquisitions expanding capabilities.",
    trendAnalysis: "Organic growth lagging peers. Integration of acquisitions key focus. Margin improvement needed.",
    riskNote: "Growth challenges relative to TCS and Infosys. Acquisition integration risks.",
    beginnerInsight: "Wipro shows M&A-led growth strategy. Compare organic vs inorganic growth with peers."
  },
  "MARUTI": { 
    marketCap: "₹3.8L Cr", peRatio: 28.5, pbRatio: 4.2, eps: 422, roe: 14.5, roce: 18.5, debtToEquity: 0, dividendYield: 0.8, 
    sector: "Automobile", industry: "Passenger Vehicles", 
    description: "Maruti Suzuki is India's largest passenger car manufacturer with over 40% market share.",
    businessModel: "Entry-level to mid-segment cars dominate. Strong distribution and service network. EV transition challenge.",
    trendAnalysis: "Market share pressure from competitors. SUV portfolio expansion crucial. Export growth positive.",
    riskNote: "EV transition risk. Competition intensifying. Commodity prices affect margins.",
    beginnerInsight: "Maruti teaches market leadership challenges. Study auto sector dynamics and EV transition."
  },
  "TATAMOTORS": { 
    marketCap: "₹3.2L Cr", peRatio: 8.5, pbRatio: 2.8, eps: 95.2, roe: 28.5, roce: 15.5, debtToEquity: 0.95, dividendYield: 0.3, 
    sector: "Automobile", industry: "Commercial & Passenger Vehicles", 
    description: "Tata Motors is India's largest automobile company and owner of Jaguar Land Rover.",
    businessModel: "JLR drives revenues and profits. Domestic business strong in EVs and CVs. Debt reduction ongoing.",
    trendAnalysis: "EV leadership in India. JLR turnaround showing results. Chip shortage impact reducing.",
    riskNote: "JLR performance critical. High debt levels though reducing. EV investment needs.",
    beginnerInsight: "Tata Motors shows EV first-mover advantage. Study their turnaround journey."
  },
  "ADANIENT": { 
    marketCap: "₹3.4L Cr", peRatio: 68.5, pbRatio: 8.5, eps: 44.2, roe: 12.5, roce: 8.5, debtToEquity: 1.28, dividendYield: 0.1, 
    sector: "Conglomerate", industry: "Infrastructure & Energy", 
    description: "Adani Enterprises is the flagship company of the Adani Group with diverse business interests.",
    businessModel: "Incubator for new businesses - airports, green energy, data centers. Mining and trading operations.",
    trendAnalysis: "Green energy and airports showing growth. High valuation and debt remain concerns for some investors.",
    riskNote: "Complex group structure. High valuation relative to current earnings. Governance questions from some analysts.",
    beginnerInsight: "Study Adani Group's growth strategy but understand the importance of due diligence and risk assessment."
  },
  "ASIANPAINT": { 
    marketCap: "₹2.8L Cr", peRatio: 52.5, pbRatio: 15.5, eps: 55.8, roe: 28.5, roce: 35.5, debtToEquity: 0.05, dividendYield: 0.7, 
    sector: "Consumer Goods", industry: "Paints & Coatings", 
    description: "Asian Paints is India's largest paint company with leadership in decorative paints.",
    businessModel: "Premium decorative paints market leader. Home improvement services expanding. Strong dealer network.",
    trendAnalysis: "Market leader facing competition from new entrants. Volume growth key. Raw material costs normalizing.",
    riskNote: "Premium valuation. New entrants like Grasim adding competition. Urban housing demand correlation.",
    beginnerInsight: "Asian Paints shows moat-based investing. Study their dealer network and brand strategy."
  },
};

declare global {
  interface Window {
    TradingView?: {
      widget: new (config: Record<string, unknown>) => { remove: () => void };
    };
  }
}

let tvScriptLoaded = false;
let tvScriptLoading = false;
const tvScriptCallbacks: (() => void)[] = [];

function loadTradingViewScript(): Promise<void> {
  return new Promise((resolve) => {
    if (tvScriptLoaded && window.TradingView) {
      resolve();
      return;
    }
    
    tvScriptCallbacks.push(resolve);
    
    if (tvScriptLoading) return;
    
    tvScriptLoading = true;
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      tvScriptLoaded = true;
      tvScriptCallbacks.forEach((cb) => cb());
      tvScriptCallbacks.length = 0;
    };
    document.head.appendChild(script);
  });
}

interface StockDetailModalProps {
  stock: StockData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StockDetailModal({ stock, isOpen, onClose }: StockDetailModalProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<{ remove: () => void } | null>(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState(false);
  const [timeframe, setTimeframe] = useState("D");
  const instanceIdRef = useRef(0);
  const containerId = useRef(`tv_modal_chart_${Math.random().toString(36).substring(7)}`);

  const fundamentals = stock ? fundamentalsData[stock.symbol] || {
    marketCap: "N/A",
    peRatio: 0,
    eps: 0,
    roe: 0,
    debtToEquity: 0,
    dividendYield: 0,
    sector: "Unknown",
    industry: "Unknown",
    description: "Educational stock information not available for this symbol.",
  } : null;

  useEffect(() => {
    if (!isOpen || !stock || !chartContainerRef.current) return;

    const currentInstance = ++instanceIdRef.current;
    setChartLoading(true);
    setChartError(false);

    if (widgetRef.current) {
      try {
        widgetRef.current.remove();
      } catch (e) {
        // Widget may already be removed
      }
      widgetRef.current = null;
    }

    const container = chartContainerRef.current;
    container.innerHTML = `<div id="${containerId.current}" style="height: 100%; width: 100%;"></div>`;

    const tvSymbol = symbolMapping[stock.symbol] || `NSE:${stock.symbol}`;

    loadTradingViewScript()
      .then(() => {
        if (currentInstance !== instanceIdRef.current) return;
        if (!window.TradingView || !chartContainerRef.current) {
          setChartError(true);
          setChartLoading(false);
          return;
        }

        const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";

        try {
          widgetRef.current = new window.TradingView.widget({
            autosize: true,
            symbol: tvSymbol,
            interval: timeframe,
            timezone: "Asia/Kolkata",
            theme: theme,
            style: "1",
            locale: "en",
            toolbar_bg: theme === "dark" ? "#1e293b" : "#f8fafc",
            enable_publishing: false,
            allow_symbol_change: false,
            container_id: containerId.current,
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: false,
            studies: ["MASimple@tv-basicstudies", "RSI@tv-basicstudies", "MACD@tv-basicstudies"],
          });

          setTimeout(() => {
            if (currentInstance === instanceIdRef.current) {
              setChartLoading(false);
            }
          }, 1500);
        } catch (e) {
          console.error("TradingView widget error:", e);
          setChartError(true);
          setChartLoading(false);
        }
      })
      .catch(() => {
        if (currentInstance === instanceIdRef.current) {
          setChartError(true);
          setChartLoading(false);
        }
      });

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch (e) {
          // Ignore cleanup errors
        }
        widgetRef.current = null;
      }
    };
  }, [isOpen, stock, timeframe]);

  if (!stock) return null;

  const isPositive = stock.change >= 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl font-bold" data-testid="modal-stock-name">
                {stock.name}
              </DialogTitle>
              <Badge variant="secondary" className="text-xs">
                {stock.symbol}
              </Badge>
              {fundamentals && (
                <Badge variant="outline" className="text-xs">
                  {fundamentals.sector}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold font-mono" data-testid="modal-stock-price">
                {stock.price.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 })}
              </span>
              <div className={`flex items-center gap-2 px-3 py-1 rounded-md ${
                isPositive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-semibold" data-testid="modal-stock-change">
                  {isPositive ? "+" : ""}{stock.change.toFixed(2)} ({isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-4 gap-2">
              <TabsTrigger value="chart" className="flex items-center gap-2" data-testid="tab-chart">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Chart</span>
              </TabsTrigger>
              <TabsTrigger value="price" className="flex items-center gap-2" data-testid="tab-price">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Price</span>
              </TabsTrigger>
              <TabsTrigger value="fundamentals" className="flex items-center gap-2" data-testid="tab-fundamentals">
                <Building2 className="w-4 h-4" />
                <span className="hidden sm:inline">Fundamentals</span>
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2" data-testid="tab-analysis">
                <Lightbulb className="w-4 h-4" />
                <span className="hidden sm:inline">Analysis</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chart" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-muted-foreground mr-2">Timeframe:</span>
                  {[
                    { label: "1D", value: "D" },
                    { label: "1W", value: "W" },
                    { label: "1M", value: "M" },
                    { label: "3M", value: "3M" },
                    { label: "6M", value: "6M" },
                    { label: "1Y", value: "12M" },
                  ].map((tf) => (
                    <Button
                      key={tf.value}
                      size="sm"
                      variant={timeframe === tf.value ? "default" : "outline"}
                      onClick={() => setTimeframe(tf.value)}
                      data-testid={`timeframe-${tf.value.toLowerCase()}`}
                    >
                      {tf.label}
                    </Button>
                  ))}
                </div>

                <div className="relative h-[400px] w-full bg-muted/30 rounded-md overflow-hidden">
                  {chartLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        <span className="text-sm text-muted-foreground">Loading chart...</span>
                      </div>
                    </div>
                  )}
                  {chartError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                      <div className="flex flex-col items-center gap-2 text-destructive">
                        <AlertCircle className="w-8 h-8" />
                        <span className="text-sm">Failed to load chart</span>
                      </div>
                    </div>
                  )}
                  <div ref={chartContainerRef} className="h-full w-full" />
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  Chart includes Moving Average, RSI, and MACD indicators. Powered by TradingView.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="price" className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Live Price", value: stock.price, format: "currency" },
                  { label: "Open", value: stock.open, format: "currency" },
                  { label: "High", value: stock.high, format: "currency", highlight: "green" },
                  { label: "Low", value: stock.low, format: "currency", highlight: "red" },
                  { label: "Prev Close", value: stock.prevClose, format: "currency" },
                  { label: "Day Range", value: `${stock.low.toFixed(2)} - ${stock.high.toFixed(2)}`, format: "text" },
                ].map((item) => (
                  <Card key={item.label}>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className={`text-lg font-semibold font-mono ${
                        item.highlight === "green" ? "text-emerald-600 dark:text-emerald-400" :
                        item.highlight === "red" ? "text-red-600 dark:text-red-400" : ""
                      }`} data-testid={`price-${item.label.toLowerCase().replace(/\s/g, "-")}`}>
                        {item.format === "currency" && typeof item.value === "number"
                          ? item.value.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 })
                          : item.value}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">Day Range</span>
                    <span className="text-sm text-muted-foreground">{stock.low.toFixed(2)} - {stock.high.toFixed(2)}</span>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500"
                      style={{ width: "100%" }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full border-2 border-background"
                      style={{
                        left: `${Math.min(100, Math.max(0, ((stock.price - stock.low) / (stock.high - stock.low)) * 100))}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fundamentals" className="mt-4">
              {fundamentals && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">About {stock.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground" data-testid="stock-description">
                        {fundamentals.description}
                      </p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Market Cap", value: fundamentals.marketCap, info: "Total market value of company" },
                      { label: "P/E Ratio", value: fundamentals.peRatio.toFixed(2), info: "Price to Earnings ratio" },
                      { label: "EPS", value: `₹${fundamentals.eps.toFixed(2)}`, info: "Earnings Per Share" },
                      { label: "ROE", value: `${fundamentals.roe.toFixed(1)}%`, info: "Return on Equity" },
                      { label: "Debt/Equity", value: fundamentals.debtToEquity.toFixed(2), info: "Leverage ratio" },
                      { label: "Dividend Yield", value: `${fundamentals.dividendYield.toFixed(1)}%`, info: "Annual dividend return" },
                      { label: "Sector", value: fundamentals.sector, info: "Business sector" },
                      { label: "Industry", value: fundamentals.industry, info: "Specific industry" },
                    ].map((item) => (
                      <Card key={item.label}>
                        <CardContent className="p-4">
                          <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                          <p className="text-base font-semibold" data-testid={`fundamental-${item.label.toLowerCase().replace(/[\s/]/g, "-")}`}>
                            {item.value}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{item.info}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Data is for educational purposes only. Always verify from official sources before making investment decisions.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="mt-4">
              {fundamentals && (
                <div className="space-y-4">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-primary" />
                        Company Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3" data-testid="company-description">
                        {fundamentals.description}
                      </p>
                      {fundamentals.businessModel && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <h4 className="text-sm font-semibold mb-2">Business Model</h4>
                          <p className="text-sm text-muted-foreground" data-testid="business-model">
                            {fundamentals.businessModel}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {fundamentals.trendAnalysis && (
                    <Card className="bg-blue-500/5 border-blue-500/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          Trend Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground" data-testid="trend-analysis">
                          {fundamentals.trendAnalysis}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {fundamentals.beginnerInsight && (
                    <Card className="bg-emerald-500/5 border-emerald-500/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          Beginner Insight
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground" data-testid="beginner-insight">
                          {fundamentals.beginnerInsight}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  {fundamentals.riskNote && (
                    <Card className="bg-amber-500/5 border-amber-500/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          Risk Considerations
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground" data-testid="risk-note">
                          {fundamentals.riskNote}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <Card className="bg-muted/50 border-muted">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div className="text-xs text-muted-foreground">
                          <p className="font-semibold mb-1">Educational Disclaimer</p>
                          <p>
                            This analysis is for educational purposes only and should not be considered as investment advice. 
                            Market conditions can change rapidly. Always conduct your own research and consult with a 
                            qualified financial advisor before making any investment decisions. Past performance does not 
                            guarantee future results.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="border-t border-border pt-4 mt-4">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                Market data shown is for educational purposes only. No buy/sell recommendations. 
                Always verify with your broker before making trading decisions.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
