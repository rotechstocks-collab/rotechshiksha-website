import { useEffect, useState, useCallback } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketData {
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

const defaultData: MarketData[] = [
  { name: "NIFTY 50", symbol: "NSEI", price: 24180.80, change: 156.35, changePercent: 0.65, open: 24024.45, high: 24225.50, low: 24010.20, prevClose: 24024.45 },
  { name: "BANK NIFTY", symbol: "NSEBANK", price: 52340.15, change: -245.80, changePercent: -0.47, open: 52585.95, high: 52650.00, low: 52280.40, prevClose: 52585.95 },
  { name: "SENSEX", symbol: "BSESN", price: 79820.45, change: 485.25, changePercent: 0.61, open: 79335.20, high: 79950.80, low: 79300.00, prevClose: 79335.20 },
  { name: "Reliance", symbol: "RELIANCE", price: 2456.75, change: 32.50, changePercent: 1.34, open: 2424.25, high: 2468.00, low: 2418.00, prevClose: 2424.25 },
  { name: "TCS", symbol: "TCS", price: 4125.30, change: -28.45, changePercent: -0.69, open: 4153.75, high: 4162.00, low: 4115.00, prevClose: 4153.75 },
  { name: "HDFC Bank", symbol: "HDFCBANK", price: 1725.60, change: 15.20, changePercent: 0.89, open: 1710.40, high: 1732.00, low: 1708.00, prevClose: 1710.40 },
];

export function LiveTicker() {
  const [marketData, setMarketData] = useState<MarketData[]>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMarketData = useCallback(async () => {
    try {
      const response = await fetch("/api/market/live");
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setMarketData(data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch market data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 10000);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border h-12 overflow-hidden">
      <div className="ticker-track flex items-center h-full gap-6 px-4 whitespace-nowrap">
        {[...marketData, ...marketData, ...marketData].map((stock, index) => (
          <div
            key={`${stock.symbol}-${index}`}
            className="ticker-item flex items-center gap-2 px-3 py-1"
            data-testid={`ticker-${stock.symbol.toLowerCase()}-${index}`}
          >
            <span className="font-semibold text-foreground text-sm">{stock.name}</span>
            <span className="font-mono text-foreground font-medium">
              {stock.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </span>
            <span
              className={`flex items-center gap-1 text-xs font-medium ${
                stock.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {stock.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {stock.change >= 0 ? "+" : ""}
              {stock.changePercent.toFixed(2)}%
            </span>
            <span className="hidden xl:flex items-center gap-2 text-xs text-muted-foreground border-l border-border pl-2 ml-1">
              <span>O:{stock.open.toFixed(0)}</span>
              <span className="text-emerald-600 dark:text-emerald-400">H:{stock.high.toFixed(0)}</span>
              <span className="text-red-600 dark:text-red-400">L:{stock.low.toFixed(0)}</span>
              <span>PC:{stock.prevClose.toFixed(0)}</span>
            </span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .ticker-track {
          animation: ticker-scroll 45s linear infinite;
          width: max-content;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        .ticker-item {
          transition: background-color 0.2s;
        }
        .ticker-item:hover {
          background-color: hsl(var(--muted) / 0.5);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
