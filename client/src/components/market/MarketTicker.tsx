import { useEffect, useState, useCallback, useRef } from "react";
import { TrendingUp, TrendingDown, RefreshCw, Search, X, Gauge } from "lucide-react";
import { StockDetailModal } from "../StockDetailModal";
import {
  TickerStock,
  TickerSpeed,
  TICKER_SPEEDS,
  getStoredSpeed,
  setStoredSpeed,
  formatPrice,
  formatChangePercent,
  filterStocks,
  defaultStockData,
} from "@/lib/tickerUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MarketTicker() {
  const [stocks, setStocks] = useState<TickerStock[]>(defaultStockData);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStock, setSelectedStock] = useState<TickerStock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [speed, setSpeed] = useState<TickerSpeed>('normal');
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSpeed(getStoredSpeed());
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fetchMarketData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch("/api/market/live");
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setStocks(data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch market data:", error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  const handleRefresh = () => {
    if (!isRefreshing) {
      fetchMarketData();
    }
  };

  const handleSpeedChange = () => {
    const speeds: TickerSpeed[] = ['slow', 'normal', 'fast'];
    const currentIndex = speeds.indexOf(speed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setSpeed(nextSpeed);
    setStoredSpeed(nextSpeed);
  };

  const handleStockClick = (stock: TickerStock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStock(null);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery("");
    }
  };

  const filteredStocks = filterStocks(stocks, searchQuery);
  const displayStocks = searchQuery ? filteredStocks : [...filteredStocks, ...filteredStocks, ...filteredStocks];
  const animationDuration = TICKER_SPEEDS[speed].duration;

  return (
    <>
      <div
        data-ticker
        className="fixed top-0 left-0 right-0 z-[100] h-[38px] overflow-hidden"
        style={{
          backgroundColor: '#0b1220',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center h-full">
          <div
            className="flex items-center gap-2 px-3 h-full flex-shrink-0"
            style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1.5 cursor-default" data-testid="ticker-live-badge">
                  <span
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: '#16a34a' }}
                  />
                  <span className="text-xs font-semibold tracking-wide" style={{ color: '#16a34a' }}>
                    LIVE
                  </span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Live market updates
              </TooltipContent>
            </Tooltip>

            {isSearchOpen ? (
              <div className="flex items-center gap-1 ml-1">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-24 h-6 px-2 text-xs rounded bg-white/10 text-white placeholder:text-white/50 border-none outline-none focus:bg-white/15 transition-colors"
                  data-testid="ticker-search-input"
                />
                <button
                  onClick={toggleSearch}
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                  data-testid="ticker-search-close"
                >
                  <X className="w-3 h-3 text-white/70" />
                </button>
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleSearch}
                    className="p-1 rounded hover:bg-white/10 transition-colors"
                    data-testid="ticker-search-btn"
                  >
                    <Search className="w-3.5 h-3.5 text-white/70" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">
                  Search stocks
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleRefresh}
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                  disabled={isRefreshing}
                  data-testid="ticker-refresh-btn"
                >
                  <RefreshCw
                    className={`w-3.5 h-3.5 text-white/70 ${isRefreshing ? 'animate-spin' : ''}`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Refresh data
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleSpeedChange}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
                  data-testid="ticker-speed-btn"
                >
                  <Gauge className="w-3 h-3 text-white/70" />
                  <span className="text-[10px] text-white/70 font-medium">
                    {TICKER_SPEEDS[speed].label}
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                Toggle speed: {TICKER_SPEEDS[speed].label}
              </TooltipContent>
            </Tooltip>
          </div>

          <div
            ref={tickerRef}
            className="flex-1 overflow-hidden h-full"
            style={{
              WebkitOverflowScrolling: 'touch',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {filteredStocks.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <span className="text-xs text-white/50">No stocks found</span>
              </div>
            ) : (
              <div
                className={`ticker-track flex items-center h-full gap-2 px-2 ${
                  animationStarted && !isHovered && !searchQuery ? 'animate' : ''
                }`}
                style={{
                  width: 'max-content',
                  animationDuration: `${animationDuration}s`,
                }}
              >
                {displayStocks.map((stock, index) => (
                  <button
                    key={`${stock.symbol}-${index}`}
                    onClick={() => handleStockClick(stock)}
                    className="ticker-chip flex items-center gap-2 px-3 py-1 rounded-lg transition-colors"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                    data-testid={`ticker-${stock.symbol.toLowerCase()}-${index}`}
                  >
                    <span
                      className="font-medium text-xs whitespace-nowrap"
                      style={{ color: '#e5e7eb' }}
                    >
                      {stock.name}
                    </span>
                    <span
                      className="font-mono text-xs font-medium whitespace-nowrap"
                      style={{ color: '#ffffff' }}
                    >
                      {formatPrice(stock.price)}
                    </span>
                    <span
                      className="flex items-center gap-0.5 text-[11px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap"
                      style={{
                        color: stock.change >= 0 ? '#16a34a' : '#dc2626',
                        backgroundColor: stock.change >= 0 ? 'rgba(22,163,74,0.15)' : 'rgba(220,38,38,0.15)',
                      }}
                    >
                      {stock.change >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {formatChangePercent(stock.changePercent)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {!filteredStocks.length && !isLoading && (
            <div className="flex items-center justify-center h-full px-4">
              <span className="text-xs" style={{ color: '#e5e7eb' }}>
                Live market data loading...
              </span>
            </div>
          )}
        </div>

        <style>{`
          @keyframes ticker-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
          .ticker-track.animate {
            animation: ticker-scroll linear infinite;
          }
          .ticker-chip:hover {
            background-color: rgba(255,255,255,0.10) !important;
          }
          .ticker-track::-webkit-scrollbar {
            display: none;
          }
          @media (max-width: 640px) {
            .ticker-chip {
              padding-left: 8px;
              padding-right: 8px;
            }
          }
        `}</style>
      </div>

      <StockDetailModal
        stock={selectedStock}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
