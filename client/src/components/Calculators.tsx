import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/context/AuthContext";
import { Lock, Calculator, PiggyBank, Scale, BarChart3, DollarSign, HelpCircle, TrendingUp, TrendingDown, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";

interface LockedOverlayProps {
  onUnlock: () => void;
}

function LockedOverlay({ onUnlock }: LockedOverlayProps) {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-4 z-10">
      <div className="p-4 rounded-full bg-muted">
        <Lock className="w-8 h-8 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground text-center px-4">
        Login to unlock this calculator
      </p>
      <Button onClick={onUnlock} size="sm" data-testid="button-unlock-calculator">
        Login to Unlock
      </Button>
    </div>
  );
}

export function SIPCalculator() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const handleUnlock = () => {
    setPendingAction("use the SIP Calculator");
    setShowAuthPopup(true);
  };

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    const futureValue =
      monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvestment = monthlyInvestment * months;
    const totalReturns = futureValue - totalInvestment;
    return { futureValue, totalInvestment, totalReturns };
  };

  const result = calculateSIP();

  return (
    <Card className="relative overflow-hidden" data-testid="card-sip-calculator">
      {!isAuthenticated && <LockedOverlay onUnlock={handleUnlock} />}
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <PiggyBank className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-lg">SIP Calculator</CardTitle>
            <CardDescription>Calculate your SIP returns</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Monthly Investment</Label>
              <span className="text-sm font-medium">
                {monthlyInvestment.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
              </span>
            </div>
            <Slider
              value={[monthlyInvestment]}
              onValueChange={(v) => setMonthlyInvestment(v[0])}
              min={500}
              max={100000}
              step={500}
              data-testid="slider-monthly-investment"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Expected Return (p.a.)</Label>
              <span className="text-sm font-medium">{expectedReturn}%</span>
            </div>
            <Slider
              value={[expectedReturn]}
              onValueChange={(v) => setExpectedReturn(v[0])}
              min={1}
              max={30}
              step={0.5}
              data-testid="slider-expected-return"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Time Period</Label>
              <span className="text-sm font-medium">{timePeriod} years</span>
            </div>
            <Slider
              value={[timePeriod]}
              onValueChange={(v) => setTimePeriod(v[0])}
              min={1}
              max={40}
              step={1}
              data-testid="slider-time-period"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Investment</span>
            <span className="font-medium">
              {result.totalInvestment.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Est. Returns</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              {result.totalReturns.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Value</span>
            <span className="text-primary">
              {result.futureValue.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RiskRewardCalculator() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const [entryPrice, setEntryPrice] = useState(100);
  const [targetPrice, setTargetPrice] = useState(120);
  const [stopLoss, setStopLoss] = useState(95);

  const handleUnlock = () => {
    setPendingAction("use the Risk Reward Calculator");
    setShowAuthPopup(true);
  };

  const calculateRiskReward = () => {
    const risk = entryPrice - stopLoss;
    const reward = targetPrice - entryPrice;
    const ratio = risk > 0 ? reward / risk : 0;
    const riskPercent = (risk / entryPrice) * 100;
    const rewardPercent = (reward / entryPrice) * 100;
    return { risk, reward, ratio, riskPercent, rewardPercent };
  };

  const result = calculateRiskReward();

  return (
    <Card className="relative overflow-hidden" data-testid="card-risk-reward-calculator">
      {!isAuthenticated && <LockedOverlay onUnlock={handleUnlock} />}
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Risk Reward Calculator</CardTitle>
            <CardDescription>Calculate your R:R ratio</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Entry Price</Label>
            <Input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              data-testid="input-entry-price"
            />
          </div>
          <div className="space-y-2">
            <Label>Target Price</Label>
            <Input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(Number(e.target.value))}
              data-testid="input-target-price"
            />
          </div>
          <div className="space-y-2">
            <Label>Stop Loss</Label>
            <Input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(Number(e.target.value))}
              data-testid="input-stop-loss"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Risk</span>
            <span className="text-red-600 dark:text-red-400">
              {result.risk.toFixed(2)} ({result.riskPercent.toFixed(2)}%)
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reward</span>
            <span className="text-emerald-600 dark:text-emerald-400">
              {result.reward.toFixed(2)} ({result.rewardPercent.toFixed(2)}%)
            </span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>R:R Ratio</span>
            <span className={result.ratio >= 2 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}>
              1:{result.ratio.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PositionSizeCalculator() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const [accountSize, setAccountSize] = useState(100000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entryPrice, setEntryPrice] = useState(500);
  const [stopLoss, setStopLoss] = useState(480);

  const handleUnlock = () => {
    setPendingAction("use the Position Size Calculator");
    setShowAuthPopup(true);
  };

  const calculatePositionSize = () => {
    const riskAmount = (accountSize * riskPercent) / 100;
    const riskPerShare = entryPrice - stopLoss;
    const quantity = riskPerShare > 0 ? Math.floor(riskAmount / riskPerShare) : 0;
    const positionValue = quantity * entryPrice;
    return { riskAmount, quantity, positionValue };
  };

  const result = calculatePositionSize();

  return (
    <Card className="relative overflow-hidden" data-testid="card-position-size-calculator">
      {!isAuthenticated && <LockedOverlay onUnlock={handleUnlock} />}
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10">
            <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Position Size Calculator</CardTitle>
            <CardDescription>Calculate optimal position size</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Account Size</Label>
            <Input
              type="number"
              value={accountSize}
              onChange={(e) => setAccountSize(Number(e.target.value))}
              data-testid="input-account-size"
            />
          </div>
          <div className="space-y-2">
            <Label>Risk %</Label>
            <Input
              type="number"
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              data-testid="input-risk-percent"
            />
          </div>
          <div className="space-y-2">
            <Label>Entry Price</Label>
            <Input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              data-testid="input-position-entry"
            />
          </div>
          <div className="space-y-2">
            <Label>Stop Loss</Label>
            <Input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(Number(e.target.value))}
              data-testid="input-position-sl"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Max Risk Amount</span>
            <span className="font-medium">
              {result.riskAmount.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
            </span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span>Quantity</span>
            <span className="text-primary">{result.quantity} shares</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Position Value</span>
            <span className="font-medium">
              {result.positionValue.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ChargeRowProps {
  label: string;
  value: number;
  tooltip: string;
  highlight?: boolean;
}

function ChargeRow({ label, value, tooltip, highlight }: ChargeRowProps) {
  return (
    <div className={`flex justify-between items-center ${highlight ? "font-medium" : ""}`}>
      <div className="flex items-center gap-1.5">
        <span className="text-muted-foreground">{label}</span>
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

export function BrokerageCalculator() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const [buyPrice, setBuyPrice] = useState<string>("");
  const [sellPrice, setSellPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [tradeType, setTradeType] = useState<"intraday" | "delivery">("intraday");
  const [exchange, setExchange] = useState<"NSE" | "BSE">("NSE");

  const handleUnlock = () => {
    setPendingAction("use the Brokerage Calculator");
    setShowAuthPopup(true);
  };

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

    const brokeragePerSide = tradeType === "intraday" 
      ? Math.min(20, buyValue * 0.0003) 
      : 0;
    const brokerage = brokeragePerSide * 2;

    const sttRate = tradeType === "intraday" ? 0.00025 : 0.001;
    const stt = tradeType === "intraday" 
      ? sellValue * sttRate 
      : turnover * sttRate;

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

  return (
    <Card className="relative overflow-visible" data-testid="card-brokerage-calculator">
      {!isAuthenticated && <LockedOverlay onUnlock={handleUnlock} />}
      <CardHeader>
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20"
            whileHover={{ scale: 1.05 }}
          >
            <IndianRupee className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </motion.div>
          <div>
            <CardTitle className="text-lg">Brokerage Calculator</CardTitle>
            <CardDescription>Calculate all trading charges as per Indian market rules</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <div className="flex gap-1 p-1 bg-muted rounded-lg">
            <Button
              variant={tradeType === "intraday" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTradeType("intraday")}
              data-testid="button-intraday"
              className="text-xs"
            >
              Intraday
            </Button>
            <Button
              variant={tradeType === "delivery" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTradeType("delivery")}
              data-testid="button-delivery"
              className="text-xs"
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
              className="text-xs"
            >
              NSE
            </Button>
            <Button
              variant={exchange === "BSE" ? "default" : "ghost"}
              size="sm"
              onClick={() => setExchange("BSE")}
              data-testid="button-bse"
              className="text-xs"
            >
              BSE
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
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
                INR
              </span>
              <Input
                type="number"
                placeholder="0.00"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                className="pl-11"
                min={0}
                step={0.05}
                data-testid="input-buy-price"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
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
                INR
              </span>
              <Input
                type="number"
                placeholder="0.00"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                className="pl-11"
                min={0}
                step={0.05}
                data-testid="input-sell-price"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
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
              min={1}
              step={1}
              data-testid="input-quantity"
            />
          </div>
        </div>

        {hasValidInput && result ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4 border-t border-border space-y-2 text-sm"
          >
            <div className="flex justify-between text-xs text-muted-foreground mb-3">
              <span>Buy Value: {result.buyValue.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
              <span>Sell Value: {result.sellValue.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
            </div>

            <ChargeRow 
              label="Brokerage" 
              value={result.brokerage} 
              tooltip={tradeType === "intraday" 
                ? "0.03% or Rs 20 per executed order, whichever is lower (both sides)" 
                : "Zero brokerage for delivery trades"}
            />
            <ChargeRow 
              label="STT" 
              value={result.stt} 
              tooltip={tradeType === "intraday" 
                ? "Securities Transaction Tax: 0.025% on sell side only" 
                : "Securities Transaction Tax: 0.1% on both buy and sell"}
            />
            <ChargeRow 
              label="Exchange Charges" 
              value={result.exchangeCharges} 
              tooltip={exchange === "NSE" 
                ? "NSE transaction charge: 0.00297% of turnover" 
                : "BSE transaction charge: 0.00375% of turnover"}
            />
            <ChargeRow 
              label="GST" 
              value={result.gst} 
              tooltip="18% GST on brokerage and transaction charges"
            />
            <ChargeRow 
              label="SEBI Charges" 
              value={result.sebiCharges} 
              tooltip="SEBI regulatory fee: Rs 10 per crore of turnover"
            />
            <ChargeRow 
              label="Stamp Duty" 
              value={result.stampDuty} 
              tooltip={tradeType === "intraday" 
                ? "0.003% on buy side for intraday trades" 
                : "0.015% on buy side for delivery trades"}
            />

            <div className="flex justify-between items-center font-medium pt-3 border-t border-border">
              <span>Total Charges</span>
              <span className="text-red-600 dark:text-red-400">
                {result.totalCharges.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>Breakeven Price</span>
              <span>{result.breakeven.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 })}</span>
            </div>

            <motion.div 
              className={`flex justify-between items-center text-lg font-bold pt-3 p-3 rounded-lg ${
                result.netPnL >= 0 
                  ? "bg-emerald-500/10" 
                  : "bg-red-500/10"
              }`}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <div className="flex items-center gap-2">
                {result.netPnL >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
                <span>Net {result.netPnL >= 0 ? "Profit" : "Loss"}</span>
              </div>
              <span className={result.netPnL >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}>
                {result.netPnL.toLocaleString("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 })}
              </span>
            </motion.div>
          </motion.div>
        ) : (
          <div className="pt-4 border-t border-border">
            <div className="text-center py-6 text-muted-foreground">
              <Calculator className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Enter buy price, sell price and quantity to calculate charges</p>
              <p className="text-xs mt-1 opacity-70">Minimum trade value: INR 100</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function AllCalculators() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <SIPCalculator />
      <RiskRewardCalculator />
      <PositionSizeCalculator />
      <BrokerageCalculator />
    </div>
  );
}
