import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { queryClient, apiRequest } from "@/lib/queryClient";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  Search,
  RefreshCw,
  AlertTriangle,
  History,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Target,
  LineChart,
} from "lucide-react";

interface StockQuote {
  symbol: string;
  name?: string;
  price: number;
  change: number;
  changePercent: number;
  high?: number;
  low?: number;
  volume?: number;
  source?: string;
}

interface Holding {
  id: string;
  symbol: string;
  stockName: string;
  quantity: number;
  avgBuyPrice: number;
  investedValue: number;
}

interface Trade {
  id: string;
  symbol: string;
  stockName: string;
  type: string;
  quantity: number;
  price: number;
  totalValue: number;
  createdAt: string;
}

interface Account {
  id: string;
  virtualBalance: number;
  initialBalance: number;
}

interface SearchResult {
  symbol: string;
  name: string;
  sector: string;
}

export default function PaperTrade() {
  const { toast } = useToast();
  const { isAuthenticated, setShowAuthPopup } = useAuth();
  const { t } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedStock, setSelectedStock] = useState<StockQuote | null>(null);
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [quantity, setQuantity] = useState("");
  const [showTradeDialog, setShowTradeDialog] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { data: accountData, isLoading: accountLoading, refetch: refetchAccount } = useQuery<{
    account: Account;
    holdings: Holding[];
    trades: Trade[];
  }>({
    queryKey: ["/api/paper-trade/account"],
    enabled: isAuthenticated,
  });

  const account = accountData?.account;
  const holdings = accountData?.holdings || [];
  const trades = accountData?.trades || [];

  const executeTradeMutation = useMutation({
    mutationFn: async (tradeData: { symbol: string; stockName: string; type: string; quantity: number; price: number }) => {
      const res = await apiRequest("POST", "/api/paper-trade/execute", tradeData);
      return res.json();
    },
    onSuccess: (data: any) => {
      toast({
        title: "Trade Executed",
        description: data.message,
      });
      setShowTradeDialog(false);
      setQuantity("");
      queryClient.invalidateQueries({ queryKey: ["/api/paper-trade/account"] });
    },
    onError: (error: any) => {
      toast({
        title: "Trade Failed",
        description: error.message || "Could not execute trade",
        variant: "destructive",
      });
    },
  });

  const resetAccountMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/paper-trade/reset");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Account Reset",
        description: "Your virtual portfolio has been reset to ₹10,00,000",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/paper-trade/account"] });
    },
    onError: () => {
      toast({
        title: "Reset Failed",
        description: "Could not reset account",
        variant: "destructive",
      });
    },
  });

  const searchStocks = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await fetch(`/api/paper-trade/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch {
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const fetchQuote = async (symbol: string): Promise<StockQuote | null> => {
    try {
      const response = await fetch(`/api/paper-trade/quote/${symbol}`);
      return await response.json();
    } catch {
      return null;
    }
  };

  const handleStockSelect = async (stock: SearchResult) => {
    const quote = await fetchQuote(stock.symbol);
    if (quote) {
      setSelectedStock({ ...quote, name: stock.name });
      setShowTradeDialog(true);
    }
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleExecuteTrade = () => {
    if (!selectedStock || !quantity) return;
    
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid quantity",
        variant: "destructive",
      });
      return;
    }

    executeTradeMutation.mutate({
      symbol: selectedStock.symbol,
      stockName: selectedStock.name || selectedStock.symbol,
      type: tradeType,
      quantity: qty,
      price: selectedStock.price,
    });
  };

  const formatCurrency = (paise: number) => {
    const rupees = paise / 100;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(rupees);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      searchStocks(searchQuery);
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const calculateTotalInvested = () => holdings.reduce((sum, h) => sum + h.investedValue, 0);
  
  const calculateTotalPnL = () => {
    return holdings.reduce((sum, h) => {
      const currentValue = h.quantity * (h.avgBuyPrice * 1.02);
      return sum + (currentValue - h.investedValue);
    }, 0);
  };

  if (!isAuthenticated) {
    return (
      <div className="page-bg pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Briefcase className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Paper Trading Simulator</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Practice trading with virtual money. Start with ₹10,00,000 and learn to trade without any risk.
            </p>
            <Button size="lg" onClick={() => setShowAuthPopup(true)} data-testid="button-login-paper-trade">
              Login to Start Trading
            </Button>

            <Card className="mt-8 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold text-amber-800 dark:text-amber-200">Educational Disclaimer</p>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      This is a paper trading simulator for educational purposes only. No real trading or investment advice is provided. Virtual trades do not reflect actual market conditions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  if (accountLoading) {
    return (
      <div className="page-bg pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-1/2 mb-4" />
                  <div className="h-8 bg-muted rounded w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <LineChart className="w-8 h-8 text-primary" />
                Paper Trading
              </h1>
              <p className="text-muted-foreground mt-1">Practice trading with virtual money</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchAccount()}
                data-testid="button-refresh-account"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to reset your account? All trades and holdings will be deleted.")) {
                    resetAccountMutation.mutate();
                  }
                }}
                data-testid="button-reset-account"
              >
                Reset Account
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200 dark:border-blue-800">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available Balance</p>
                    <p className="text-xl font-bold" data-testid="text-balance">
                      {account ? formatCurrency(account.virtualBalance) : "₹0"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200 dark:border-purple-800">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Invested Value</p>
                    <p className="text-xl font-bold" data-testid="text-invested">
                      {formatCurrency(calculateTotalInvested())}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className={`bg-gradient-to-br ${calculateTotalPnL() >= 0 ? "from-green-500/10 to-green-600/5 border-green-200 dark:border-green-800" : "from-red-500/10 to-red-600/5 border-red-200 dark:border-red-800"}`}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${calculateTotalPnL() >= 0 ? "bg-green-500/20" : "bg-red-500/20"}`}>
                    {calculateTotalPnL() >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total P&L</p>
                    <p className={`text-xl font-bold ${calculateTotalPnL() >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`} data-testid="text-pnl">
                      {calculateTotalPnL() >= 0 ? "+" : ""}{formatCurrency(calculateTotalPnL())}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-200 dark:border-orange-800">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Holdings</p>
                    <p className="text-xl font-bold" data-testid="text-holdings-count">
                      {holdings.length} Stocks
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="relative mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search stocks (e.g., RELIANCE, TCS, INFY)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                  data-testid="input-stock-search"
                />
                {isSearching && (
                  <RefreshCw className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin" />
                )}
              </div>

              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 border rounded-lg overflow-hidden"
                  >
                    {searchResults.map((stock) => (
                      <button
                        key={stock.symbol}
                        onClick={() => handleStockSelect(stock)}
                        className="w-full p-3 text-left hover:bg-muted transition-colors flex items-center justify-between border-b last:border-b-0"
                        data-testid={`button-stock-${stock.symbol}`}
                      >
                        <div>
                          <span className="font-semibold">{stock.symbol}</span>
                          <span className="text-muted-foreground ml-2 text-sm">{stock.name}</span>
                        </div>
                        <Badge variant="secondary">{stock.sector}</Badge>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="portfolio" data-testid="tab-portfolio">
              <PieChart className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="history" data-testid="tab-history">
              <History className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="chart" data-testid="tab-chart">
              <BarChart3 className="w-4 h-4 mr-2" />
              Charts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Your Holdings</CardTitle>
                <CardDescription>Current stock positions in your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                {holdings.length === 0 ? (
                  <div className="text-center py-12">
                    <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No holdings yet. Search for stocks to start trading!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Stock</th>
                          <th className="text-right py-3 px-2 font-medium">Qty</th>
                          <th className="text-right py-3 px-2 font-medium">Avg Price</th>
                          <th className="text-right py-3 px-2 font-medium">Invested</th>
                          <th className="text-right py-3 px-2 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {holdings.map((holding) => (
                          <tr key={holding.id} className="border-b hover:bg-muted/50" data-testid={`row-holding-${holding.symbol}`}>
                            <td className="py-3 px-2">
                              <div>
                                <p className="font-semibold">{holding.symbol}</p>
                                <p className="text-xs text-muted-foreground">{holding.stockName}</p>
                              </div>
                            </td>
                            <td className="text-right py-3 px-2">{holding.quantity}</td>
                            <td className="text-right py-3 px-2">{formatCurrency(holding.avgBuyPrice)}</td>
                            <td className="text-right py-3 px-2">{formatCurrency(holding.investedValue)}</td>
                            <td className="text-right py-3 px-2">
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={async () => {
                                  const quote = await fetchQuote(holding.symbol);
                                  if (quote) {
                                    setSelectedStock({ ...quote, name: holding.stockName });
                                    setTradeType("sell");
                                    setShowTradeDialog(true);
                                  }
                                }}
                                data-testid={`button-sell-${holding.symbol}`}
                              >
                                Sell
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Trade History</CardTitle>
                <CardDescription>Recent transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {trades.length === 0 ? (
                  <div className="text-center py-12">
                    <History className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No trades yet. Start trading to see your history!</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Date</th>
                          <th className="text-left py-3 px-2 font-medium">Stock</th>
                          <th className="text-center py-3 px-2 font-medium">Type</th>
                          <th className="text-right py-3 px-2 font-medium">Qty</th>
                          <th className="text-right py-3 px-2 font-medium">Price</th>
                          <th className="text-right py-3 px-2 font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {trades.map((trade) => (
                          <tr key={trade.id} className="border-b hover:bg-muted/50" data-testid={`row-trade-${trade.id}`}>
                            <td className="py-3 px-2 text-sm text-muted-foreground">
                              {new Date(trade.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className="py-3 px-2">
                              <p className="font-semibold">{trade.symbol}</p>
                            </td>
                            <td className="text-center py-3 px-2">
                              <Badge className={trade.type === "buy" ? "bg-green-600" : "bg-red-600"}>
                                {trade.type === "buy" ? (
                                  <ArrowDownRight className="w-3 h-3 mr-1" />
                                ) : (
                                  <ArrowUpRight className="w-3 h-3 mr-1" />
                                )}
                                {trade.type.toUpperCase()}
                              </Badge>
                            </td>
                            <td className="text-right py-3 px-2">{trade.quantity}</td>
                            <td className="text-right py-3 px-2">{formatCurrency(trade.price)}</td>
                            <td className="text-right py-3 px-2 font-medium">{formatCurrency(trade.totalValue)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <CardTitle>Market Charts</CardTitle>
                <CardDescription>View live market data from TradingView</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full rounded-lg overflow-hidden border">
                  <iframe
                    src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=NSE%3ANIFTY&interval=D&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=Asia%2FKolkata&withdateranges=1&showpopupbutton=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=&utm_medium=widget&utm_campaign=chart&utm_term=NSE%3ANIFTY"
                    className="w-full h-full"
                    title="TradingView Chart"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                  />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {["RELIANCE", "TCS", "HDFCBANK", "INFY"].map((symbol) => (
                    <Button
                      key={symbol}
                      variant="outline"
                      className="w-full"
                      onClick={() => handleStockSelect({ symbol, name: symbol, sector: "Nifty 50" })}
                      data-testid={`button-quick-trade-${symbol}`}
                    >
                      Trade {symbol}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-800 dark:text-amber-200">Educational Disclaimer</p>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  This is a paper trading simulator for educational purposes only. No real trading or investment advice is provided. Virtual trades use simulated or delayed prices and do not reflect actual market conditions. Never invest real money based on paper trading results.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showTradeDialog} onOpenChange={setShowTradeDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {tradeType === "buy" ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
              {tradeType === "buy" ? "Buy" : "Sell"} {selectedStock?.symbol}
            </DialogTitle>
            <DialogDescription>
              {selectedStock?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedStock && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Current Price</span>
                  <span className="text-2xl font-bold">{formatPrice(selectedStock.price)}</span>
                </div>
                {selectedStock.changePercent !== undefined && (
                  <div className={`text-sm ${selectedStock.changePercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {selectedStock.changePercent >= 0 ? "+" : ""}{selectedStock.changePercent.toFixed(2)}%
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Trade Type</label>
                <Select value={tradeType} onValueChange={(v) => setTradeType(v as "buy" | "sell")}>
                  <SelectTrigger data-testid="select-trade-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  data-testid="input-quantity"
                />
              </div>

              {quantity && parseInt(quantity) > 0 && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="text-xl font-bold">
                      {formatPrice(selectedStock.price * parseInt(quantity))}
                    </span>
                  </div>
                  {account && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Available: {formatCurrency(account.virtualBalance)}
                    </div>
                  )}
                </div>
              )}

              <Button
                className={`w-full ${tradeType === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                onClick={handleExecuteTrade}
                disabled={!quantity || parseInt(quantity) <= 0 || executeTradeMutation.isPending}
                data-testid="button-execute-trade"
              >
                {executeTradeMutation.isPending ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : tradeType === "buy" ? (
                  <ArrowDownRight className="w-4 h-4 mr-2" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                )}
                {tradeType === "buy" ? "Buy" : "Sell"} {quantity || 0} shares
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
