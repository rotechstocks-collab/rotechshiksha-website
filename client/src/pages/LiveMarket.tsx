import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Lock,
  BarChart3,
  Activity,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface MarketIndex {
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

const defaultIndices: MarketIndex[] = [
  { name: "NIFTY 50", symbol: "NIFTY", price: 24180.80, change: 156.35, changePercent: 0.65, open: 24024.45, high: 24225.50, low: 24010.20, prevClose: 24024.45 },
  { name: "BANK NIFTY", symbol: "BANKNIFTY", price: 52340.15, change: -245.80, changePercent: -0.47, open: 52585.95, high: 52650.00, low: 52280.40, prevClose: 52585.95 },
  { name: "SENSEX", symbol: "SENSEX", price: 79820.45, change: 485.25, changePercent: 0.61, open: 79335.20, high: 79950.80, low: 79300.00, prevClose: 79335.20 },
  { name: "NIFTY IT", symbol: "NIFTYIT", price: 38450.20, change: 320.15, changePercent: 0.84, open: 38130.05, high: 38520.00, low: 38100.50, prevClose: 38130.05 },
  { name: "NIFTY BANK", symbol: "NIFTYBANK", price: 52120.80, change: -180.40, changePercent: -0.34, open: 52301.20, high: 52400.00, low: 52050.60, prevClose: 52301.20 },
  { name: "NIFTY MIDCAP", symbol: "NIFTYMID", price: 55780.35, change: 425.60, changePercent: 0.77, open: 55354.75, high: 55850.00, low: 55300.00, prevClose: 55354.75 },
];

const analysisInsights = [
  {
    title: "Market Overview",
    content: "Markets are showing positive momentum with buying interest in IT and Banking sectors. Nifty is trading above its key support level of 24,000.",
  },
  {
    title: "Sector Watch",
    content: "IT sector is leading gains with strong global cues. Banking sector is consolidating near resistance levels. Metal stocks are showing weakness.",
  },
  {
    title: "Technical View",
    content: "Nifty has formed a bullish engulfing pattern on daily charts. RSI at 58 suggests neutral to slightly bullish momentum. Key resistance at 24,300.",
  },
  {
    title: "FII/DII Activity",
    content: "FIIs have been net buyers for the past 3 sessions. DIIs continue to provide support at lower levels. Overall market breadth is positive.",
  },
];

export default function LiveMarket() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const [indices, setIndices] = useState<MarketIndex[]>(defaultIndices);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchMarketData = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch("/api/market/live");
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setIndices(data);
        }
      }
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch market data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleViewAnalysis = () => {
    if (!isAuthenticated) {
      setPendingAction("view detailed analysis");
      setShowAuthPopup(true);
    }
  };

  return (
    <div className="min-h-screen pt-28">
      <section className="py-8 bg-card/50 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Live Market</h1>
              <p className="text-muted-foreground">Real-time market data & analysis</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={fetchMarketData}
                disabled={isRefreshing}
                data-testid="button-refresh-market"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indices.map((index) => (
              <Card key={index.symbol} data-testid={`card-index-${index.symbol.toLowerCase()}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{index.name}</h3>
                      <div className="text-2xl font-bold mt-1">
                        {index.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                        index.change >= 0
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {index.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-medium">
                        {index.change >= 0 ? "+" : ""}
                        {index.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mt-4 text-xs">
                    <div>
                      <span className="text-muted-foreground">Open</span>
                      <div className="font-medium">{index.open.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">High</span>
                      <div className="font-medium text-emerald-600 dark:text-emerald-400">
                        {index.high.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Low</span>
                      <div className="font-medium text-red-600 dark:text-red-400">
                        {index.low.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Prev</span>
                      <div className="font-medium">{index.prevClose.toFixed(2)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Tabs defaultValue="chart" className="space-y-6">
            <TabsList>
              <TabsTrigger value="chart" data-testid="tab-chart">
                <BarChart3 className="w-4 h-4 mr-2" />
                Chart
              </TabsTrigger>
              <TabsTrigger value="analysis" data-testid="tab-analysis">
                <Activity className="w-4 h-4 mr-2" />
                Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chart">
              <Card>
                <CardHeader>
                  <CardTitle>NIFTY 50 Chart</CardTitle>
                  <CardDescription>Interactive chart powered by TradingView</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4 px-4">
                      <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">
                        TradingView chart widget will be embedded here
                      </p>
                      <p className="text-xs text-muted-foreground">
                        View real-time charts with technical indicators
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              <div className="grid md:grid-cols-2 gap-6">
                {analysisInsights.map((insight, index) => (
                  <Card
                    key={index}
                    className="relative overflow-hidden"
                    data-testid={`card-insight-${index}`}
                  >
                    {!isAuthenticated && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-10">
                        <Lock className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Login to view analysis</p>
                        <Button
                          size="sm"
                          onClick={handleViewAnalysis}
                          data-testid="button-unlock-analysis"
                        >
                          Login to Unlock
                        </Button>
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{insight.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-700 dark:text-amber-300">Disclaimer</p>
                <p className="text-amber-600 dark:text-amber-400">
                  This is for educational purposes only. Market data may be delayed.
                  Always verify with your broker before making trading decisions.
                  We do not provide buy/sell recommendations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
