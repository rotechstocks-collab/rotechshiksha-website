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
  eps: number;
  roe: number;
  debtToEquity: number;
  dividendYield: number;
  sector: string;
  industry: string;
  description: string;
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
  "NSEI": { marketCap: "₹382L Cr", peRatio: 22.5, eps: 1074, roe: 14.2, debtToEquity: 0, dividendYield: 1.2, sector: "Index", industry: "Broad Market Index", description: "NIFTY 50 is India's benchmark stock market index representing the weighted average of 50 largest Indian companies listed on NSE." },
  "NSEBANK": { marketCap: "₹52L Cr", peRatio: 15.8, eps: 3312, roe: 15.5, debtToEquity: 0, dividendYield: 0.9, sector: "Index", industry: "Banking Sector Index", description: "Bank NIFTY comprises the most liquid and large capitalised Indian Banking stocks." },
  "BSESN": { marketCap: "₹420L Cr", peRatio: 23.1, eps: 3456, roe: 13.8, debtToEquity: 0, dividendYield: 1.1, sector: "Index", industry: "Broad Market Index", description: "SENSEX is India's oldest stock market index tracking 30 financially sound companies on BSE." },
  "RELIANCE": { marketCap: "₹16.6L Cr", peRatio: 26.8, eps: 91.5, roe: 8.9, debtToEquity: 0.42, dividendYield: 0.4, sector: "Energy", industry: "Oil & Gas Refining", description: "Reliance Industries is India's largest private sector company with businesses in energy, petrochemicals, retail, and telecom." },
  "TCS": { marketCap: "₹14.9L Cr", peRatio: 31.2, eps: 132, roe: 52.1, debtToEquity: 0.05, dividendYield: 1.3, sector: "Technology", industry: "IT Services", description: "Tata Consultancy Services is a global leader in IT services, consulting and business solutions." },
  "HDFCBANK": { marketCap: "₹13.1L Cr", peRatio: 19.5, eps: 88.5, roe: 16.8, debtToEquity: 0, dividendYield: 1.1, sector: "Financial Services", industry: "Private Bank", description: "HDFC Bank is India's largest private sector bank by assets offering comprehensive banking services." },
  "ICICIBANK": { marketCap: "₹8.9L Cr", peRatio: 18.2, eps: 67.3, roe: 17.5, debtToEquity: 0, dividendYield: 0.8, sector: "Financial Services", industry: "Private Bank", description: "ICICI Bank is a leading private sector bank in India with diverse financial services offerings." },
  "INFY": { marketCap: "₹7.8L Cr", peRatio: 27.5, eps: 68.2, roe: 31.5, debtToEquity: 0.08, dividendYield: 2.1, sector: "Technology", industry: "IT Services", description: "Infosys is a global leader in next-generation digital services and consulting." },
  "ITC": { marketCap: "₹6.1L Cr", peRatio: 28.4, eps: 17.2, roe: 28.5, debtToEquity: 0, dividendYield: 2.8, sector: "Consumer Goods", industry: "FMCG & Tobacco", description: "ITC is a diversified conglomerate with businesses in FMCG, hotels, paperboards, and agriculture." },
  "SBIN": { marketCap: "₹7.2L Cr", peRatio: 10.8, eps: 74.5, roe: 17.2, debtToEquity: 0, dividendYield: 1.6, sector: "Financial Services", industry: "Public Bank", description: "State Bank of India is India's largest public sector bank with pan-India presence." },
  "BHARTIARTL": { marketCap: "₹9.8L Cr", peRatio: 78.5, eps: 21.2, roe: 15.8, debtToEquity: 1.52, dividendYield: 0.5, sector: "Telecom", industry: "Telecom Services", description: "Bharti Airtel is India's second-largest telecom operator providing mobile and broadband services." },
  "KOTAKBANK": { marketCap: "₹3.5L Cr", peRatio: 18.9, eps: 95.2, roe: 13.5, debtToEquity: 0, dividendYield: 0.1, sector: "Financial Services", industry: "Private Bank", description: "Kotak Mahindra Bank is a leading private sector bank with strong retail and corporate banking presence." },
  "LT": { marketCap: "₹5.1L Cr", peRatio: 35.2, eps: 104.5, roe: 14.8, debtToEquity: 0.85, dividendYield: 0.9, sector: "Industrial", industry: "Engineering & Construction", description: "Larsen & Toubro is India's largest engineering and construction company." },
  "HINDUNILVR": { marketCap: "₹5.8L Cr", peRatio: 56.2, eps: 44.2, roe: 85.5, debtToEquity: 0, dividendYield: 1.5, sector: "Consumer Goods", industry: "FMCG", description: "Hindustan Unilever is India's largest FMCG company with brands across personal care, home care, and foods." },
  "AXISBANK": { marketCap: "₹3.6L Cr", peRatio: 13.8, eps: 85.2, roe: 16.2, debtToEquity: 0, dividendYield: 0.1, sector: "Financial Services", industry: "Private Bank", description: "Axis Bank is the third-largest private sector bank in India." },
  "WIPRO": { marketCap: "₹2.6L Cr", peRatio: 21.5, eps: 23.5, roe: 15.8, debtToEquity: 0.18, dividendYield: 0.2, sector: "Technology", industry: "IT Services", description: "Wipro is a global IT services company providing consulting, design, and engineering services." },
  "MARUTI": { marketCap: "₹3.8L Cr", peRatio: 28.5, eps: 422, roe: 14.5, debtToEquity: 0, dividendYield: 0.8, sector: "Automobile", industry: "Passenger Vehicles", description: "Maruti Suzuki is India's largest passenger car manufacturer with over 40% market share." },
  "TATAMOTORS": { marketCap: "₹3.2L Cr", peRatio: 8.5, eps: 95.2, roe: 28.5, debtToEquity: 0.95, dividendYield: 0.3, sector: "Automobile", industry: "Commercial & Passenger Vehicles", description: "Tata Motors is India's largest automobile company and owner of Jaguar Land Rover." },
  "ADANIENT": { marketCap: "₹3.4L Cr", peRatio: 68.5, eps: 44.2, roe: 12.5, debtToEquity: 1.28, dividendYield: 0.1, sector: "Conglomerate", industry: "Infrastructure & Energy", description: "Adani Enterprises is the flagship company of the Adani Group with diverse business interests." },
  "ASIANPAINT": { marketCap: "₹2.8L Cr", peRatio: 52.5, eps: 55.8, roe: 28.5, debtToEquity: 0.05, dividendYield: 0.7, sector: "Consumer Goods", industry: "Paints & Coatings", description: "Asian Paints is India's largest paint company with leadership in decorative paints." },
};

interface StockDetailModalProps {
  stock: StockData | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StockDetailModal({ stock, isOpen, onClose }: StockDetailModalProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState(false);
  const [timeframe, setTimeframe] = useState("D");

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

    setChartLoading(true);
    setChartError(false);

    const container = chartContainerRef.current;
    container.innerHTML = "";

    const tvSymbol = symbolMapping[stock.symbol] || `NSE:${stock.symbol}`;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: tvSymbol,
      interval: timeframe,
      timezone: "Asia/Kolkata",
      theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
      style: "1",
      locale: "en",
      enable_publishing: false,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      hide_volume: false,
      support_host: "https://www.tradingview.com",
      studies: ["MASimple@tv-basicstudies", "RSI@tv-basicstudies", "MACD@tv-basicstudies"],
      container_id: "tv_chart_container",
    });

    script.onload = () => setChartLoading(false);
    script.onerror = () => {
      setChartLoading(false);
      setChartError(true);
    };

    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container";
    widgetContainer.style.height = "100%";
    widgetContainer.style.width = "100%";

    const widgetInner = document.createElement("div");
    widgetInner.id = "tv_chart_container";
    widgetInner.style.height = "100%";
    widgetInner.style.width = "100%";

    widgetContainer.appendChild(widgetInner);
    widgetContainer.appendChild(script);
    container.appendChild(widgetContainer);

    const timeout = setTimeout(() => {
      if (chartLoading) {
        setChartLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timeout);
      if (container) {
        container.innerHTML = "";
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
            <TabsList className="grid w-full grid-cols-3 gap-2">
              <TabsTrigger value="chart" className="flex items-center gap-2" data-testid="tab-chart">
                <BarChart3 className="w-4 h-4" />
                Chart
              </TabsTrigger>
              <TabsTrigger value="price" className="flex items-center gap-2" data-testid="tab-price">
                <TrendingUp className="w-4 h-4" />
                Price Details
              </TabsTrigger>
              <TabsTrigger value="fundamentals" className="flex items-center gap-2" data-testid="tab-fundamentals">
                <Building2 className="w-4 h-4" />
                Fundamentals
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
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
