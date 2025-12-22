import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketData {
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
}

const defaultData: MarketData[] = [
  { name: "NIFTY 50", price: 24180.80, change: 156.35, changePercent: 0.65, open: 24024.45, high: 24225.50, low: 24010.20, prevClose: 24024.45 },
  { name: "BANK NIFTY", price: 52340.15, change: -245.80, changePercent: -0.47, open: 52585.95, high: 52650.00, low: 52280.40, prevClose: 52585.95 },
  { name: "SENSEX", price: 79820.45, change: 485.25, changePercent: 0.61, open: 79335.20, high: 79950.80, low: 79300.00, prevClose: 79335.20 },
];

export function LiveTicker() {
  const [marketData, setMarketData] = useState<MarketData[]>(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
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
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-card-border h-12 overflow-hidden">
      <div className="animate-scroll flex items-center h-full gap-8 px-4 whitespace-nowrap">
        {[...marketData, ...marketData].map((stock, index) => (
          <div
            key={`${stock.name}-${index}`}
            className="flex items-center gap-3 px-4 py-2"
            data-testid={`ticker-${stock.name.toLowerCase().replace(/\s+/g, "-")}-${index}`}
          >
            <span className="font-semibold text-foreground">{stock.name}</span>
            <span className="font-mono text-foreground">
              {stock.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
            </span>
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                stock.change >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {stock.change >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {stock.change >= 0 ? "+" : ""}
              {stock.change.toFixed(2)} ({stock.changePercent >= 0 ? "+" : ""}
              {stock.changePercent.toFixed(2)}%)
            </span>
            <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
              <span>O: {stock.open.toFixed(2)}</span>
              <span>H: {stock.high.toFixed(2)}</span>
              <span>L: {stock.low.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
