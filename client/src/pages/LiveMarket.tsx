import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  X,
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

interface StockSearchResult {
  symbol: string;
  yahooSymbol: string;
  name: string;
}

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

function TradingViewWidget({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    containerRef.current.innerHTML = "";
    
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: "D",
      timezone: "Asia/Kolkata",
      theme: document.documentElement.classList.contains("dark") ? "dark" : "light",
      style: "1",
      locale: "en",
      enable_publishing: false,
      allow_symbol_change: true,
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container h-[500px]" ref={containerRef}>
      <div className="tradingview-widget-container__widget h-full"></div>
    </div>
  );
}

export default function LiveMarket() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<StockSearchResult[]>([]);
  const [selectedSymbol, setSelectedSymbol] = useState("NSE:NIFTY");
  const [selectedStock, setSelectedStock] = useState<MarketIndex | null>(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const fetchMarketData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 10000);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const response = await fetch(`/api/market/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error("Search failed:", error);
    }
  }, []);

  const selectStock = useCallback(async (stock: StockSearchResult) => {
    setSearchQuery(stock.name);
    setShowSearchResults(false);
    
    let tvSymbol = "NSE:" + stock.symbol;
    if (stock.symbol === "NSEI") tvSymbol = "NSE:NIFTY";
    else if (stock.symbol === "NSEBANK") tvSymbol = "NSE:BANKNIFTY";
    else if (stock.symbol === "BSESN") tvSymbol = "BSE:SENSEX";
    
    setSelectedSymbol(tvSymbol);

    try {
      const response = await fetch(`/api/market/quote/${stock.symbol}`);
      if (response.ok) {
        const quote = await response.json();
        setSelectedStock(quote);
      }
    } catch (error) {
      console.error("Failed to fetch quote:", error);
    }
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

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks (e.g., Reliance, TCS, HDFC)"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowSearchResults(true)}
              className="pl-10 pr-10"
              data-testid="input-stock-search"
            />
            {searchQuery && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setShowSearchResults(false);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
            {showSearchResults && searchResults.length > 0 && (
              <Card className="absolute top-full left-0 right-0 mt-1 z-20 max-h-64 overflow-auto">
                <CardContent className="p-2">
                  {searchResults.map((result) => (
                    <button
                      key={result.symbol}
                      className="w-full text-left px-3 py-2 rounded-md hover-elevate flex items-center justify-between"
                      onClick={() => selectStock(result)}
                      data-testid={`search-result-${result.symbol.toLowerCase()}`}
                    >
                      <span className="font-medium">{result.name}</span>
                      <span className="text-sm text-muted-foreground">{result.symbol}</span>
                    </button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {indices.map((index) => (
              <Card 
                key={index.symbol} 
                className="cursor-pointer hover-elevate"
                onClick={() => selectStock({ symbol: index.symbol, yahooSymbol: index.symbol, name: index.name })}
                data-testid={`card-index-${index.symbol.toLowerCase()}`}
              >
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
                  <CardTitle className="flex items-center gap-2">
                    {selectedStock ? selectedStock.name : "NIFTY 50"} Chart
                    {selectedStock && (
                      <span className={`text-sm font-normal ${selectedStock.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {selectedStock.price.toLocaleString("en-IN")} ({selectedStock.change >= 0 ? "+" : ""}{selectedStock.changePercent.toFixed(2)}%)
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>Interactive chart powered by TradingView</CardDescription>
                </CardHeader>
                <CardContent>
                  <TradingViewWidget symbol={selectedSymbol} />
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
                  This is for educational purposes only. Market data may be delayed by 15-20 minutes.
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
