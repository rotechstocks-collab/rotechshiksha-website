import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  ArrowLeft,
  IndianRupee,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CheckCircle2,
  Info,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

interface ChargeRowProps {
  label: string;
  value: number;
  tooltip: string;
  highlight?: boolean;
}

function ChargeRow({ label, value, tooltip, highlight }: ChargeRowProps) {
  return (
    <div className={`flex justify-between items-center py-2 ${highlight ? "font-medium" : ""}`}>
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs text-xs">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </div>
      <span className={highlight ? "text-amber-600 dark:text-amber-400" : ""}>
        {value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}

export default function BrokerageCalculatorPage() {
  const [buyPrice, setBuyPrice] = useState<string>("");
  const [sellPrice, setSellPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [tradeType, setTradeType] = useState<"intraday" | "delivery">("intraday");
  const [exchange, setExchange] = useState<"NSE" | "BSE">("NSE");

  const buy = parseFloat(buyPrice) || 0;
  const sell = parseFloat(sellPrice) || 0;
  const qty = parseInt(quantity) || 0;

  const calculateBrokerage = () => {
    if (buy <= 0 || sell <= 0 || qty <= 0) {
      return null;
    }

    const buyValue = buy * qty;
    const sellValue = sell * qty;
    const turnover = buyValue + sellValue;

    if (buyValue < 100) {
      return { error: "Minimum trade value is Rs 100" };
    }

    const brokerageBuySide = tradeType === "intraday" 
      ? Math.min(20, buyValue * 0.0003) 
      : 0;
    const brokerageSellSide = tradeType === "intraday" 
      ? Math.min(20, sellValue * 0.0003) 
      : 0;
    const brokerage = brokerageBuySide + brokerageSellSide;

    const sttRate = tradeType === "intraday" ? 0.00025 : 0.001;
    const stt = sellValue * sttRate;

    const exchangeRate = exchange === "NSE" ? 0.0000297 : 0.0000375;
    const exchangeCharges = turnover * exchangeRate;

    const gst = (brokerage + exchangeCharges) * 0.18;

    const sebiCharges = turnover * 0.000001;

    const stampDutyRate = tradeType === "intraday" ? 0.00003 : 0.00015;
    const stampDuty = buyValue * stampDutyRate;

    const totalCharges = brokerage + stt + exchangeCharges + gst + sebiCharges + stampDuty;

    const grossPnL = (sell - buy) * qty;
    const netPnL = grossPnL - totalCharges;

    const breakeven = buy + (totalCharges / qty);

    return { 
      turnover, 
      brokerage, 
      stt, 
      exchangeCharges, 
      gst, 
      sebiCharges, 
      stampDuty, 
      totalCharges, 
      grossPnL, 
      netPnL,
      breakeven,
      buyValue,
      sellValue
    };
  };

  const result = calculateBrokerage();
  const hasValidInput = buy > 0 && sell > 0 && qty > 0;
  const hasError = result && 'error' in result;
  const hasResult = result && !hasError;

  const chartData = hasResult ? [
    { name: "Brokerage", value: result.brokerage, color: "#3B82F6" },
    { name: "STT", value: result.stt, color: "#10B981" },
    { name: "Exchange", value: result.exchangeCharges, color: "#F59E0B" },
    { name: "GST", value: result.gst, color: "#8B5CF6" },
    { name: "SEBI", value: result.sebiCharges, color: "#EC4899" },
    { name: "Stamp Duty", value: result.stampDuty, color: "#06B6D4" },
  ] : [];

  return (
    <div className="page-bg pt-16 pb-16">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="mb-6">
          <Link href="/calculators">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-calculators">
              <ArrowLeft className="w-4 h-4" />
              All Calculators
            </Button>
          </Link>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Trading Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Brokerage Calculator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate all trading charges including STT, brokerage, and other fees as per Indian market regulations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur">
              <CardHeader className="border-b bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20">
                    <IndianRupee className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Trade Details</CardTitle>
                    <CardDescription>Enter your trade information</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex flex-wrap gap-3">
                  <div className="flex gap-1 p-1 bg-muted rounded-lg">
                    <Button
                      variant={tradeType === "intraday" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setTradeType("intraday")}
                      data-testid="button-intraday"
                    >
                      Intraday
                    </Button>
                    <Button
                      variant={tradeType === "delivery" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setTradeType("delivery")}
                      data-testid="button-delivery"
                    >
                      Delivery
                    </Button>
                  </div>
                  <div className="flex gap-1 p-1 bg-muted rounded-lg">
                    <Button
                      variant={exchange === "NSE" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setExchange("NSE")}
                      data-testid="button-nse"
                    >
                      NSE
                    </Button>
                    <Button
                      variant={exchange === "BSE" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setExchange("BSE")}
                      data-testid="button-bse"
                    >
                      BSE
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      Buy Price
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          Price at which you buy the stock
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        Rs
                      </span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={buyPrice}
                        onChange={(e) => setBuyPrice(e.target.value)}
                        className="pl-10 h-12 text-lg"
                        min={0}
                        step={0.05}
                        data-testid="input-buy-price"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      Sell Price
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          Price at which you sell the stock
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        Rs
                      </span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={sellPrice}
                        onChange={(e) => setSellPrice(e.target.value)}
                        className="pl-10 h-12 text-lg"
                        min={0}
                        step={0.05}
                        data-testid="input-sell-price"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-1.5">
                      Quantity
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/60 cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          Number of shares to trade
                        </TooltipContent>
                      </Tooltip>
                    </Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="h-12 text-lg"
                      min={1}
                      step={1}
                      data-testid="input-quantity"
                    />
                  </div>
                </div>

                {!hasValidInput && (
                  <div className="text-center py-8 px-4 bg-muted/30 rounded-xl border border-dashed">
                    <Info className="w-10 h-10 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Enter buy price, sell price, and quantity to see the calculation
                    </p>
                  </div>
                )}

                {hasError && result && 'error' in result && (
                  <div className="text-center py-6 px-4 bg-red-500/10 rounded-xl border border-red-500/20">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">{result.error}</p>
                  </div>
                )}

                <AnimatePresence>
                  {hasResult && result && !('error' in result) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-4 border-t space-y-1"
                    >
                      <div className="flex justify-between text-sm text-muted-foreground mb-4 pb-3 border-b">
                        <span>Buy Value: {result.buyValue.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                        <span>Sell Value: {result.sellValue.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                      </div>

                      <ChargeRow 
                        label="Brokerage" 
                        value={result.brokerage} 
                        tooltip={tradeType === "intraday" 
                          ? "0.03% or Rs 20 per executed order, whichever is lower" 
                          : "Zero brokerage for delivery trades"}
                      />
                      <ChargeRow 
                        label="STT (Securities Transaction Tax)" 
                        value={result.stt} 
                        tooltip={tradeType === "intraday" 
                          ? "0.025% on sell side for intraday" 
                          : "0.1% on both buy and sell side for delivery"}
                      />
                      <ChargeRow 
                        label="Exchange Charges" 
                        value={result.exchangeCharges} 
                        tooltip={exchange === "NSE" 
                          ? "NSE charges 0.00297% on turnover" 
                          : "BSE charges 0.00375% on turnover"}
                      />
                      <ChargeRow 
                        label="GST" 
                        value={result.gst} 
                        tooltip="18% on brokerage + exchange charges"
                      />
                      <ChargeRow 
                        label="SEBI Charges" 
                        value={result.sebiCharges} 
                        tooltip="Rs 10 per crore turnover"
                      />
                      <ChargeRow 
                        label="Stamp Duty" 
                        value={result.stampDuty} 
                        tooltip={tradeType === "intraday" 
                          ? "0.003% on buy side for intraday" 
                          : "0.015% on buy side for delivery"}
                      />
                      <ChargeRow 
                        label="Total Charges" 
                        value={result.totalCharges} 
                        tooltip="Sum of all trading charges"
                        highlight
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg border-0 bg-card/80 backdrop-blur sticky top-24">
              <CardHeader className="border-b bg-muted/30">
                <CardTitle className="text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {hasResult && result && !('error' in result) ? (
                  <div className="space-y-6">
                    <div className="text-center p-6 rounded-xl bg-gradient-to-br from-muted/50 to-muted">
                      <p className="text-sm text-muted-foreground mb-2">Net Profit / Loss</p>
                      <div className="flex items-center justify-center gap-2">
                        {result.netPnL >= 0 ? (
                          <TrendingUp className="w-6 h-6 text-emerald-500" />
                        ) : (
                          <TrendingDown className="w-6 h-6 text-red-500" />
                        )}
                        <p className={`text-3xl font-bold ${result.netPnL >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                          {result.netPnL >= 0 ? "+" : ""}{result.netPnL.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 })}
                        </p>
                      </div>
                    </div>

                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={65}
                            dataKey="value"
                            strokeWidth={0}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip 
                            formatter={(value: number) => value.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 })}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <span className="text-sm">Gross P&L</span>
                        <span className={`font-semibold ${result.grossPnL >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                          {result.grossPnL >= 0 ? "+" : ""}{result.grossPnL.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <span className="text-sm">Total Charges</span>
                        <span className="font-semibold text-amber-600 dark:text-amber-400">
                          {result.totalCharges.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <span className="text-sm">Breakeven Price</span>
                        <span className="font-semibold">
                          {result.breakeven.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {chartData.map((item, i) => (
                        <Badge key={i} variant="outline" className="text-xs gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          {item.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calculator className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Enter trade details to see the breakdown
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                What is Brokerage?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                Brokerage is the fee charged by stockbrokers for executing buy and sell orders on your behalf. 
                In India, discount brokers typically charge a flat fee (Rs 20) or percentage-based fee, whichever is lower.
              </p>
              <p>
                For delivery trades, many brokers offer zero brokerage, meaning you pay no commission for buying 
                and holding stocks for more than one day.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Trading Charges Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>
                <strong>STT:</strong> Securities Transaction Tax levied by the government on all equity transactions. 
                Intraday: 0.025% on sell side. Delivery: 0.1% on both sides.
              </p>
              <p>
                <strong>Exchange Charges:</strong> NSE charges 0.00297% and BSE charges 0.00375% on turnover.
              </p>
              <p>
                <strong>GST:</strong> 18% on brokerage and exchange transaction charges.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Learn Stock Market Trading</h3>
                <p className="text-muted-foreground">
                  Master the art of trading with our comprehensive courses
                </p>
              </div>
              <Link href="/courses">
                <Button size="lg" className="gap-2" data-testid="button-explore-courses">
                  Explore Courses
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
