import { useEffect, useState, useCallback, useRef } from "react";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { StockDetailModal } from "./StockDetailModal";

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
  { name: "ICICI Bank", symbol: "ICICIBANK", price: 1285.40, change: 18.75, changePercent: 1.48, open: 1266.65, high: 1292.00, low: 1262.00, prevClose: 1266.65 },
  { name: "Infosys", symbol: "INFY", price: 1875.25, change: -12.30, changePercent: -0.65, open: 1887.55, high: 1895.00, low: 1868.00, prevClose: 1887.55 },
  { name: "ITC", symbol: "ITC", price: 485.60, change: 5.85, changePercent: 1.22, open: 479.75, high: 488.00, low: 478.00, prevClose: 479.75 },
  { name: "SBI", symbol: "SBIN", price: 812.45, change: -8.20, changePercent: -1.00, open: 820.65, high: 825.00, low: 808.00, prevClose: 820.65 },
  { name: "Bharti Airtel", symbol: "BHARTIARTL", price: 1658.90, change: 22.45, changePercent: 1.37, open: 1636.45, high: 1665.00, low: 1632.00, prevClose: 1636.45 },
  { name: "Kotak Bank", symbol: "KOTAKBANK", price: 1795.30, change: -15.60, changePercent: -0.86, open: 1810.90, high: 1818.00, low: 1788.00, prevClose: 1810.90 },
  { name: "L&T", symbol: "LT", price: 3685.75, change: 42.30, changePercent: 1.16, open: 3643.45, high: 3698.00, low: 3635.00, prevClose: 3643.45 },
  { name: "HUL", symbol: "HINDUNILVR", price: 2485.60, change: -18.90, changePercent: -0.75, open: 2504.50, high: 2512.00, low: 2478.00, prevClose: 2504.50 },
  { name: "Axis Bank", symbol: "AXISBANK", price: 1178.25, change: 14.55, changePercent: 1.25, open: 1163.70, high: 1185.00, low: 1160.00, prevClose: 1163.70 },
  { name: "Wipro", symbol: "WIPRO", price: 505.80, change: 3.25, changePercent: 0.65, open: 502.55, high: 508.00, low: 500.00, prevClose: 502.55 },
  { name: "Maruti", symbol: "MARUTI", price: 12045.50, change: -125.80, changePercent: -1.03, open: 12171.30, high: 12200.00, low: 12010.00, prevClose: 12171.30 },
  { name: "Tata Motors", symbol: "TATAMOTORS", price: 812.35, change: 9.45, changePercent: 1.18, open: 802.90, high: 818.00, low: 798.00, prevClose: 802.90 },
];

export function LiveTicker() {
  const [marketData, setMarketData] = useState<MarketData[]>(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState<MarketData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const fetchMarketData = useCallback(async () => {
    try {
      const response = await fetch("/api/market/live");
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setMarketData(data);
          setLastUpdated(new Date());
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
    const interval = setInterval(fetchMarketData, 15000);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  const handleStockClick = (stock: MarketData) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  const tripleData = [...marketData, ...marketData, ...marketData];

  return (
    <>
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-700/50 h-11 overflow-hidden shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-teal-500/5 to-blue-500/5" />
        
        <div 
          className={`ticker-track flex items-center h-full gap-1 px-2 whitespace-nowrap ${isHovered ? 'paused' : ''}`}
        >
          {tripleData.map((stock, index) => (
            <motion.button
              key={`${stock.symbol}-${index}`}
              className="ticker-item flex items-center gap-2 px-3 py-1.5 cursor-pointer rounded-lg transition-all duration-150 relative group"
              onClick={() => handleStockClick(stock)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              data-testid={`ticker-${stock.symbol.toLowerCase()}-${index}`}
            >
              <span className="font-semibold text-slate-100 text-sm tracking-wide">{stock.name}</span>
              <span className="font-mono text-white font-medium text-sm">
                {stock.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}
              </span>
              <span
                className={`flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                  stock.change >= 0 
                    ? "text-emerald-300 bg-emerald-500/25 border border-emerald-500/30" 
                    : "text-red-300 bg-red-500/25 border border-red-500/30"
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
              
              <div className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/10 transition-colors duration-150" />
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <style>{`
          @keyframes ticker-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .ticker-track {
            animation: ticker-scroll 120s linear infinite;
            width: max-content;
          }
          .ticker-track.paused {
            animation-play-state: paused;
          }
          .ticker-item {
            transition: background-color 0.15s ease, transform 0.15s ease;
          }
        `}</style>
      </motion.div>

      <StockDetailModal
        stock={selectedStock}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
