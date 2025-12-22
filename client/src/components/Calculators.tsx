import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAuth } from "@/context/AuthContext";
import { Lock, Calculator, PiggyBank, Scale, BarChart3, DollarSign } from "lucide-react";

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

export function BrokerageCalculator() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const [buyPrice, setBuyPrice] = useState(100);
  const [sellPrice, setSellPrice] = useState(105);
  const [quantity, setQuantity] = useState(100);
  const [brokerageType, setBrokerageType] = useState<"delivery" | "intraday">("intraday");

  const handleUnlock = () => {
    setPendingAction("use the Brokerage Calculator");
    setShowAuthPopup(true);
  };

  const calculateBrokerage = () => {
    const turnover = (buyPrice + sellPrice) * quantity;
    const brokerage = brokerageType === "intraday" ? Math.min(20, turnover * 0.0003) * 2 : 0;
    const stt = brokerageType === "intraday" ? sellPrice * quantity * 0.00025 : turnover * 0.001;
    const exchangeCharges = turnover * 0.0000325;
    const gst = (brokerage + exchangeCharges) * 0.18;
    const sebiCharges = turnover * 0.000001;
    const stampDuty = buyPrice * quantity * 0.00015;
    const totalCharges = brokerage + stt + exchangeCharges + gst + sebiCharges + stampDuty;
    const grossPnL = (sellPrice - buyPrice) * quantity;
    const netPnL = grossPnL - totalCharges;
    return { turnover, brokerage, stt, exchangeCharges, gst, sebiCharges, stampDuty, totalCharges, grossPnL, netPnL };
  };

  const result = calculateBrokerage();

  return (
    <Card className="relative overflow-hidden" data-testid="card-brokerage-calculator">
      {!isAuthenticated && <LockedOverlay onUnlock={handleUnlock} />}
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <DollarSign className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Brokerage Calculator</CardTitle>
            <CardDescription>Calculate trading costs</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 mb-4">
          <Button
            variant={brokerageType === "intraday" ? "default" : "outline"}
            size="sm"
            onClick={() => setBrokerageType("intraday")}
            data-testid="button-intraday"
          >
            Intraday
          </Button>
          <Button
            variant={brokerageType === "delivery" ? "default" : "outline"}
            size="sm"
            onClick={() => setBrokerageType("delivery")}
            data-testid="button-delivery"
          >
            Delivery
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Buy Price</Label>
            <Input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(Number(e.target.value))}
              data-testid="input-buy-price"
            />
          </div>
          <div className="space-y-2">
            <Label>Sell Price</Label>
            <Input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(Number(e.target.value))}
              data-testid="input-sell-price"
            />
          </div>
          <div className="space-y-2">
            <Label>Quantity</Label>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              data-testid="input-quantity"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Brokerage</span>
            <span>{result.brokerage.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">STT</span>
            <span>{result.stt.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Exchange + SEBI</span>
            <span>{(result.exchangeCharges + result.sebiCharges).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">GST + Stamp</span>
            <span>{(result.gst + result.stampDuty).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t border-border">
            <span>Total Charges</span>
            <span className="text-red-600 dark:text-red-400">{result.totalCharges.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-semibold pt-2">
            <span>Net P&L</span>
            <span className={result.netPnL >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}>
              {result.netPnL.toFixed(2)}
            </span>
          </div>
        </div>
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
