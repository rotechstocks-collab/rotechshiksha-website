import { useState, useCallback, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StockDetailModal } from "./StockDetailModal";

interface StockSearchResult {
  symbol: string;
  name: string;
  exchange: string;
  type: "stock" | "index";
}

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

const stockDatabase: StockSearchResult[] = [
  { symbol: "NSEI", name: "NIFTY 50", exchange: "NSE", type: "index" },
  { symbol: "NSEBANK", name: "BANK NIFTY", exchange: "NSE", type: "index" },
  { symbol: "BSESN", name: "SENSEX", exchange: "BSE", type: "index" },
  { symbol: "RELIANCE", name: "Reliance Industries Ltd", exchange: "NSE", type: "stock" },
  { symbol: "TCS", name: "Tata Consultancy Services Ltd", exchange: "NSE", type: "stock" },
  { symbol: "HDFCBANK", name: "HDFC Bank Ltd", exchange: "NSE", type: "stock" },
  { symbol: "ICICIBANK", name: "ICICI Bank Ltd", exchange: "NSE", type: "stock" },
  { symbol: "INFY", name: "Infosys Ltd", exchange: "NSE", type: "stock" },
  { symbol: "ITC", name: "ITC Ltd", exchange: "NSE", type: "stock" },
  { symbol: "SBIN", name: "State Bank of India", exchange: "NSE", type: "stock" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel Ltd", exchange: "NSE", type: "stock" },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank Ltd", exchange: "NSE", type: "stock" },
  { symbol: "LT", name: "Larsen & Toubro Ltd", exchange: "NSE", type: "stock" },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever Ltd", exchange: "NSE", type: "stock" },
  { symbol: "AXISBANK", name: "Axis Bank Ltd", exchange: "NSE", type: "stock" },
  { symbol: "WIPRO", name: "Wipro Ltd", exchange: "NSE", type: "stock" },
  { symbol: "MARUTI", name: "Maruti Suzuki India Ltd", exchange: "NSE", type: "stock" },
  { symbol: "TATAMOTORS", name: "Tata Motors Ltd", exchange: "NSE", type: "stock" },
  { symbol: "ADANIENT", name: "Adani Enterprises Ltd", exchange: "NSE", type: "stock" },
  { symbol: "ASIANPAINT", name: "Asian Paints Ltd", exchange: "NSE", type: "stock" },
  { symbol: "BAJFINANCE", name: "Bajaj Finance Ltd", exchange: "NSE", type: "stock" },
  { symbol: "TITAN", name: "Titan Company Ltd", exchange: "NSE", type: "stock" },
  { symbol: "TATASTEEL", name: "Tata Steel Ltd", exchange: "NSE", type: "stock" },
  { symbol: "SUNPHARMA", name: "Sun Pharmaceutical Industries Ltd", exchange: "NSE", type: "stock" },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement Ltd", exchange: "NSE", type: "stock" },
  { symbol: "NESTLEIND", name: "Nestle India Ltd", exchange: "NSE", type: "stock" },
  { symbol: "POWERGRID", name: "Power Grid Corporation of India Ltd", exchange: "NSE", type: "stock" },
  { symbol: "NTPC", name: "NTPC Ltd", exchange: "NSE", type: "stock" },
  { symbol: "ONGC", name: "Oil and Natural Gas Corporation Ltd", exchange: "NSE", type: "stock" },
  { symbol: "TECHM", name: "Tech Mahindra Ltd", exchange: "NSE", type: "stock" },
  { symbol: "HCLTECH", name: "HCL Technologies Ltd", exchange: "NSE", type: "stock" },
  { symbol: "JSWSTEEL", name: "JSW Steel Ltd", exchange: "NSE", type: "stock" },
  { symbol: "COALINDIA", name: "Coal India Ltd", exchange: "NSE", type: "stock" },
  { symbol: "BPCL", name: "Bharat Petroleum Corporation Ltd", exchange: "NSE", type: "stock" },
  { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories Ltd", exchange: "NSE", type: "stock" },
  { symbol: "CIPLA", name: "Cipla Ltd", exchange: "NSE", type: "stock" },
  { symbol: "EICHERMOT", name: "Eicher Motors Ltd", exchange: "NSE", type: "stock" },
  { symbol: "DIVISLAB", name: "Divi's Laboratories Ltd", exchange: "NSE", type: "stock" },
  { symbol: "GRASIM", name: "Grasim Industries Ltd", exchange: "NSE", type: "stock" },
  { symbol: "BRITANNIA", name: "Britannia Industries Ltd", exchange: "NSE", type: "stock" },
  { symbol: "ADANIPORTS", name: "Adani Ports & Special Economic Zone Ltd", exchange: "NSE", type: "stock" },
  { symbol: "ADANIPOWER", name: "Adani Power Ltd", exchange: "NSE", type: "stock" },
  { symbol: "ADANIGREEN", name: "Adani Green Energy Ltd", exchange: "NSE", type: "stock" },
  { symbol: "ATGL", name: "Adani Total Gas Ltd", exchange: "NSE", type: "stock" },
];

const defaultPrices: Record<string, { price: number; change: number; changePercent: number; open: number; high: number; low: number; prevClose: number }> = {
  "NSEI": { price: 24180.80, change: 156.35, changePercent: 0.65, open: 24024.45, high: 24225.50, low: 24010.20, prevClose: 24024.45 },
  "NSEBANK": { price: 52340.15, change: -245.80, changePercent: -0.47, open: 52585.95, high: 52650.00, low: 52280.40, prevClose: 52585.95 },
  "BSESN": { price: 79820.45, change: 485.25, changePercent: 0.61, open: 79335.20, high: 79950.80, low: 79300.00, prevClose: 79335.20 },
  "RELIANCE": { price: 2456.75, change: 32.50, changePercent: 1.34, open: 2424.25, high: 2468.00, low: 2418.00, prevClose: 2424.25 },
  "TCS": { price: 4125.30, change: -28.45, changePercent: -0.69, open: 4153.75, high: 4162.00, low: 4115.00, prevClose: 4153.75 },
  "HDFCBANK": { price: 1725.60, change: 15.20, changePercent: 0.89, open: 1710.40, high: 1732.00, low: 1708.00, prevClose: 1710.40 },
  "ICICIBANK": { price: 1285.40, change: 18.75, changePercent: 1.48, open: 1266.65, high: 1292.00, low: 1262.00, prevClose: 1266.65 },
  "INFY": { price: 1875.25, change: -12.30, changePercent: -0.65, open: 1887.55, high: 1895.00, low: 1868.00, prevClose: 1887.55 },
  "ITC": { price: 485.60, change: 5.85, changePercent: 1.22, open: 479.75, high: 488.00, low: 478.00, prevClose: 479.75 },
  "SBIN": { price: 812.45, change: -8.20, changePercent: -1.00, open: 820.65, high: 825.00, low: 808.00, prevClose: 820.65 },
  "BHARTIARTL": { price: 1658.90, change: 22.45, changePercent: 1.37, open: 1636.45, high: 1665.00, low: 1632.00, prevClose: 1636.45 },
  "KOTAKBANK": { price: 1795.30, change: -15.60, changePercent: -0.86, open: 1810.90, high: 1818.00, low: 1788.00, prevClose: 1810.90 },
  "LT": { price: 3685.75, change: 42.30, changePercent: 1.16, open: 3643.45, high: 3698.00, low: 3635.00, prevClose: 3643.45 },
  "HINDUNILVR": { price: 2485.60, change: -18.90, changePercent: -0.75, open: 2504.50, high: 2512.00, low: 2478.00, prevClose: 2504.50 },
  "AXISBANK": { price: 1178.25, change: 14.55, changePercent: 1.25, open: 1163.70, high: 1185.00, low: 1160.00, prevClose: 1163.70 },
  "WIPRO": { price: 505.80, change: 3.25, changePercent: 0.65, open: 502.55, high: 508.00, low: 500.00, prevClose: 502.55 },
  "MARUTI": { price: 12045.50, change: -125.80, changePercent: -1.03, open: 12171.30, high: 12200.00, low: 12010.00, prevClose: 12171.30 },
  "TATAMOTORS": { price: 812.35, change: 9.45, changePercent: 1.18, open: 802.90, high: 818.00, low: 798.00, prevClose: 802.90 },
  "ADANIENT": { price: 3025.60, change: -45.80, changePercent: -1.49, open: 3071.40, high: 3085.00, low: 3008.00, prevClose: 3071.40 },
  "ASIANPAINT": { price: 2925.40, change: 28.60, changePercent: 0.99, open: 2896.80, high: 2938.00, low: 2888.00, prevClose: 2896.80 },
  "BAJFINANCE": { price: 7245.80, change: 85.45, changePercent: 1.19, open: 7160.35, high: 7285.00, low: 7145.00, prevClose: 7160.35 },
  "TITAN": { price: 3425.60, change: -28.75, changePercent: -0.83, open: 3454.35, high: 3468.00, low: 3412.00, prevClose: 3454.35 },
  "TATASTEEL": { price: 142.85, change: 2.15, changePercent: 1.53, open: 140.70, high: 144.20, low: 140.00, prevClose: 140.70 },
  "SUNPHARMA": { price: 1785.40, change: 18.60, changePercent: 1.05, open: 1766.80, high: 1798.00, low: 1762.00, prevClose: 1766.80 },
  "ULTRACEMCO": { price: 11245.25, change: -95.80, changePercent: -0.85, open: 11341.05, high: 11380.00, low: 11200.00, prevClose: 11341.05 },
  "NESTLEIND": { price: 2485.60, change: 22.45, changePercent: 0.91, open: 2463.15, high: 2498.00, low: 2458.00, prevClose: 2463.15 },
  "POWERGRID": { price: 285.45, change: 3.25, changePercent: 1.15, open: 282.20, high: 287.50, low: 281.00, prevClose: 282.20 },
  "NTPC": { price: 385.60, change: -4.85, changePercent: -1.24, open: 390.45, high: 392.00, low: 383.00, prevClose: 390.45 },
  "ONGC": { price: 265.80, change: 2.95, changePercent: 1.12, open: 262.85, high: 268.00, low: 261.00, prevClose: 262.85 },
  "TECHM": { price: 1685.25, change: -18.45, changePercent: -1.08, open: 1703.70, high: 1712.00, low: 1678.00, prevClose: 1703.70 },
  "HCLTECH": { price: 1825.40, change: 24.60, changePercent: 1.37, open: 1800.80, high: 1838.00, low: 1795.00, prevClose: 1800.80 },
  "JSWSTEEL": { price: 945.25, change: 12.85, changePercent: 1.38, open: 932.40, high: 952.00, low: 928.00, prevClose: 932.40 },
  "COALINDIA": { price: 425.60, change: -5.45, changePercent: -1.27, open: 431.05, high: 433.00, low: 422.00, prevClose: 431.05 },
  "BPCL": { price: 585.80, change: 8.25, changePercent: 1.43, open: 577.55, high: 590.00, low: 574.00, prevClose: 577.55 },
  "DRREDDY": { price: 6425.40, change: -48.60, changePercent: -0.75, open: 6474.00, high: 6495.00, low: 6405.00, prevClose: 6474.00 },
  "CIPLA": { price: 1485.60, change: 16.85, changePercent: 1.15, open: 1468.75, high: 1498.00, low: 1465.00, prevClose: 1468.75 },
  "EICHERMOT": { price: 4685.25, change: 52.45, changePercent: 1.13, open: 4632.80, high: 4715.00, low: 4620.00, prevClose: 4632.80 },
  "DIVISLAB": { price: 5245.80, change: -38.60, changePercent: -0.73, open: 5284.40, high: 5298.00, low: 5225.00, prevClose: 5284.40 },
  "GRASIM": { price: 2685.40, change: 28.75, changePercent: 1.08, open: 2656.65, high: 2705.00, low: 2648.00, prevClose: 2656.65 },
  "BRITANNIA": { price: 5485.60, change: -42.85, changePercent: -0.77, open: 5528.45, high: 5545.00, low: 5468.00, prevClose: 5528.45 },
  "ADANIPORTS": { price: 1493.60, change: -15.10, changePercent: -1.00, open: 1508.70, high: 1549.00, low: 1485.00, prevClose: 1508.70 },
  "ADANIPOWER": { price: 144.30, change: 1.05, changePercent: 0.73, open: 143.25, high: 146.50, low: 142.00, prevClose: 143.25 },
  "ADANIGREEN": { price: 1016.90, change: -3.85, changePercent: -0.38, open: 1020.75, high: 1032.00, low: 1008.00, prevClose: 1020.75 },
  "ATGL": { price: 563.40, change: -5.25, changePercent: -0.93, open: 568.65, high: 575.00, low: 558.00, prevClose: 568.65 },
};

function highlightMatch(text: string, query: string): JSX.Element {
  if (!query.trim()) return <>{text}</>;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="text-primary font-semibold">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

interface StockSearchProps {
  variant?: "hero" | "compact";
  className?: string;
}

type FilterType = "all" | "stock" | "index";

export function StockSearch({ variant = "hero", className = "" }: StockSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockSearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [recentSearches, setRecentSearches] = useState<StockSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("recentStockSearches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const runSearch = useCallback((searchQuery: string, filter: FilterType) => {
    if (searchQuery.length < 1) {
      setResults([]);
      return;
    }

    let filtered = stockDatabase.filter(stock => 
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter !== "all") {
      filtered = filtered.filter(stock => stock.type === filter);
    }

    setResults(filtered.slice(0, 10));
  }, []);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    runSearch(searchQuery, filterType);
    setShowResults(true);
  }, [filterType, runSearch]);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilterType(newFilter);
    runSearch(query, newFilter);
  }, [query, runSearch]);

  const handleSelectStock = useCallback(async (stock: StockSearchResult) => {
    setIsLoading(true);
    setShowResults(false);
    setQuery(stock.name);

    const updatedRecent = [stock, ...recentSearches.filter(s => s.symbol !== stock.symbol)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem("recentStockSearches", JSON.stringify(updatedRecent));

    try {
      const response = await fetch(`/api/market/quote/${stock.symbol}`);
      if (response.ok) {
        const quote = await response.json();
        setSelectedStock(quote);
      } else {
        const fallback = defaultPrices[stock.symbol] || {
          price: 1000,
          change: 10,
          changePercent: 1.0,
          open: 990,
          high: 1010,
          low: 985,
          prevClose: 990,
        };
        setSelectedStock({
          name: stock.name,
          symbol: stock.symbol,
          ...fallback,
        });
      }
    } catch (error) {
      const fallback = defaultPrices[stock.symbol] || {
        price: 1000,
        change: 10,
        changePercent: 1.0,
        open: 990,
        high: 1010,
        low: 985,
        prevClose: 990,
      };
      setSelectedStock({
        name: stock.name,
        symbol: stock.symbol,
        ...fallback,
      });
    }
    
    setIsLoading(false);
    setShowModal(true);
  }, [recentSearches]);

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    inputRef.current?.focus();
  }, []);

  const getStockPrice = (symbol: string) => {
    return defaultPrices[symbol] || { price: 0, change: 0, changePercent: 0 };
  };

  const isHero = variant === "hero";

  const filterTabs: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Stock", value: "stock" },
    { label: "Index", value: "index" },
  ];

  return (
    <>
      <div ref={containerRef} className={`relative ${className}`}>
        <div className={`relative ${isHero ? "max-w-2xl mx-auto" : ""}`}>
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground ${isHero ? "w-5 h-5" : "w-4 h-4"}`} />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search any stock or index"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => {
                if (query.length > 0 || recentSearches.length > 0) {
                  setShowResults(true);
                }
              }}
              className={`${isHero ? "h-14 pl-12 pr-12 text-base rounded-xl shadow-lg border-2 focus:border-primary" : "h-10 pl-10 pr-10 text-sm"}`}
              data-testid="input-stock-search-hero"
            />
            {query && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={clearSearch}
                data-testid="button-clear-search"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {showResults && (results.length > 0 || (query.length === 0 && recentSearches.length > 0) || query.length > 0) && (
            <Card className={`absolute top-full left-0 right-0 mt-2 z-50 shadow-xl border overflow-hidden ${isHero ? "rounded-xl" : ""}`}>
              <div className="border-b bg-muted/30">
                <div className="flex items-center gap-1 p-2">
                  {filterTabs.map((tab) => (
                    <button
                      key={tab.value}
                      onClick={() => handleFilterChange(tab.value)}
                      className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                        filterType === tab.value 
                          ? "bg-primary text-primary-foreground" 
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                      data-testid={`filter-${tab.value}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <CardContent className="p-0 max-h-[400px] overflow-y-auto">
                {query.length === 0 && recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground bg-muted/20 border-b">
                      <Clock className="w-3 h-3" />
                      Recent Searches
                    </div>
                    {recentSearches.map((stock) => {
                      const priceData = getStockPrice(stock.symbol);
                      const isPositive = priceData.changePercent >= 0;
                      return (
                        <button
                          key={`recent-${stock.symbol}`}
                          className="w-full text-left px-4 py-3 hover:bg-muted/50 flex items-center justify-between gap-2 border-b border-border/50 transition-colors"
                          onClick={() => handleSelectStock(stock)}
                          data-testid={`recent-search-${stock.symbol.toLowerCase()}`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground truncate">{stock.name}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 font-normal">
                                {stock.exchange} : {stock.symbol}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-semibold font-mono">
                              {priceData.price > 0 ? `₹${priceData.price.toLocaleString("en-IN")}` : ""}
                            </div>
                            {priceData.price > 0 && (
                              <div className={`text-sm font-medium ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                                {isPositive ? "+" : ""}{priceData.changePercent.toFixed(2)}%
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
                
                {results.length > 0 && (
                  <div>
                    <div className="px-4 py-2 text-xs font-medium text-primary bg-primary/5 border-b">
                      Equity
                    </div>
                    {results.map((stock) => {
                      const priceData = getStockPrice(stock.symbol);
                      const isPositive = priceData.changePercent >= 0;
                      return (
                        <button
                          key={stock.symbol}
                          className="w-full text-left px-4 py-3 hover:bg-muted/50 flex items-center justify-between gap-2 border-b border-border/50 transition-colors"
                          onClick={() => handleSelectStock(stock)}
                          data-testid={`search-result-${stock.symbol.toLowerCase()}`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground">
                              {highlightMatch(stock.name, query)}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 font-normal">
                                {stock.exchange} : {highlightMatch(stock.symbol, query)}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-semibold font-mono">
                              {priceData.price > 0 ? `₹${priceData.price.toLocaleString("en-IN")}` : ""}
                            </div>
                            {priceData.price > 0 && (
                              <div className={`text-sm font-medium ${isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                                {isPositive ? "+" : ""}{priceData.changePercent.toFixed(2)}%
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {results.length === 0 && query.length > 0 && (
                  <div className="px-4 py-8 text-center text-muted-foreground">
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No stocks found for "{query}"</p>
                    <p className="text-xs mt-1">Try searching by company name or symbol</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {isHero && (
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            <span className="text-xs text-muted-foreground">Popular:</span>
            {["RELIANCE", "TCS", "NIFTY 50", "HDFC Bank"].map((name) => {
              const stock = stockDatabase.find(s => s.name.includes(name) || s.symbol === name.replace(" ", ""));
              if (!stock) return null;
              return (
                <Button
                  key={name}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7"
                  onClick={() => handleSelectStock(stock)}
                  data-testid={`popular-${stock.symbol.toLowerCase()}`}
                >
                  {name}
                </Button>
              );
            })}
          </div>
        )}
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-background/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card p-6 rounded-xl shadow-xl flex items-center gap-4">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-foreground font-medium">Loading stock data...</span>
          </div>
        </div>
      )}

      <StockDetailModal
        stock={selectedStock}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
