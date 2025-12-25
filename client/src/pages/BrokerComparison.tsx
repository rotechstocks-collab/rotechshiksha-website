import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Cell,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  Users,
  IndianRupee,
  AlertTriangle,
  PieChart,
  ThumbsUp,
  BarChart3,
  Star,
  Check,
  X,
  Scale,
  Building2,
  Globe,
  Calendar,
  TrendingUp,
  Shield,
  Zap,
  Trophy,
  Target,
  Wallet,
  Award,
  Menu,
  ChevronRight,
} from "lucide-react";
import { brokerData, type BrokerData, formatNumber, formatCurrency } from "@/data/brokerData";
import { FadeInUp, ScaleIn } from "@/components/AnimationWrappers";

const CHART_COLORS = [
  "#4A90E2", "#4ECDC4", "#FF7B7B", "#9B59B6", "#F39C12", "#1ABC9C", "#E74C3C", "#3498DB"
];

const verticalTabs = [
  { id: "clients", label: "Active Clients", icon: Users },
  { id: "charges", label: "Charges", icon: IndianRupee },
  { id: "complaints", label: "Complaints", icon: AlertTriangle },
  { id: "holdings", label: "Share Holding", icon: PieChart },
  { id: "proscons", label: "Pros & Cons", icon: ThumbsUp },
  { id: "financials", label: "Financials", icon: BarChart3 },
  { id: "ratings", label: "Ratings", icon: Star },
];

function getBestForTag(broker: BrokerData): { tag: string; icon: typeof Trophy; color: string } {
  const scores = {
    beginners: 0,
    traders: 0,
    investors: 0,
  };
  
  if (broker.charges.accountOpening === 0) scores.beginners += 2;
  if (broker.charges.equityDelivery === "Free") scores.investors += 2;
  if (broker.features.research) scores.investors += 1;
  if (broker.features.mutualFunds) scores.investors += 1;
  if (broker.ratings.support >= 4) scores.beginners += 2;
  if (broker.features.apiAccess) scores.traders += 2;
  if (broker.charges.equityIntraday.includes("20") || broker.charges.equityIntraday.includes("0.03")) scores.traders += 1;
  if (broker.ratings.trading >= 4.2) scores.traders += 2;
  if (broker.ratings.platform >= 4.2) scores.traders += 1;
  
  const maxCategory = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b);
  
  switch (maxCategory[0]) {
    case "beginners":
      return { tag: "Best for Beginners", icon: Target, color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" };
    case "traders":
      return { tag: "Best for Traders", icon: Zap, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" };
    case "investors":
      return { tag: "Best for Investors", icon: Wallet, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" };
    default:
      return { tag: "Well Balanced", icon: Scale, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" };
  }
}

function calculateOverallScore(broker: BrokerData): number {
  let score = 0;
  const maxScore = 100;
  
  score += (broker.ratings.overall / 5) * 30;
  score += Math.min(broker.activeClients.total / 10000000, 1) * 15;
  const resolutionRate = parseFloat(broker.complaints.resolutionRate);
  score += (resolutionRate / 100) * 15;
  if (broker.charges.accountOpening === 0) score += 5;
  if (broker.charges.equityDelivery === "Free") score += 10;
  const featureCount = Object.values(broker.features).filter(Boolean).length;
  score += (featureCount / 10) * 25;
  
  return Math.min(Math.round(score), maxScore);
}

function getWinnerForMetric(brokers: BrokerData[], getValue: (b: BrokerData) => number, isLowerBetter = false): string {
  if (brokers.length === 0) return "";
  const sorted = [...brokers].sort((a, b) => {
    const valA = getValue(a);
    const valB = getValue(b);
    return isLowerBetter ? valA - valB : valB - valA;
  });
  return sorted[0].id;
}

function BrokerLogo({ broker, size = "md" }: { broker: BrokerData; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-14 h-14 text-xl"
  };
  
  const colors: Record<string, string> = {
    zerodha: "from-blue-600 to-blue-800",
    "angel-one": "from-red-500 to-red-700",
    groww: "from-green-500 to-green-700",
    upstox: "from-purple-600 to-purple-800",
    "icici-direct": "from-orange-500 to-orange-700",
    "hdfc-securities": "from-blue-700 to-indigo-800",
    "kotak-securities": "from-red-600 to-red-800",
    "5paisa": "from-teal-500 to-teal-700"
  };

  return (
    <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br ${colors[broker.id] || "from-gray-500 to-gray-700"} text-white flex items-center justify-center font-bold shadow-md`}>
      {broker.name.charAt(0)}
    </div>
  );
}

function BrokerCard({ 
  broker, 
  isSelected, 
  onSelect 
}: { 
  broker: BrokerData; 
  isSelected: boolean; 
  onSelect: () => void; 
}) {
  const bestFor = getBestForTag(broker);
  const score = calculateOverallScore(broker);
  const BestForIcon = bestFor.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`cursor-pointer transition-all duration-200 ${
          isSelected 
            ? "ring-2 ring-primary bg-primary/5 border-primary" 
            : "hover-elevate"
        }`}
        onClick={onSelect}
        data-testid={`broker-card-${broker.id}`}
      >
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <BrokerLogo broker={broker} size="sm" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-foreground truncate">{broker.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{broker.tagline}</p>
            </div>
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center"
                >
                  <Check className="w-3 h-3" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-2 flex items-center justify-between gap-2">
            <Badge className={`text-xs ${bestFor.color}`} variant="outline">
              <BestForIcon className="w-3 h-3 mr-1" />
              {bestFor.tag}
            </Badge>
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-500/10 rounded">
              <Award className="w-3 h-3 text-amber-500" />
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{score}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RatingBar({ label, value, max = 5 }: { label: string; value: number; max?: number }) {
  const percentage = (value / max) * 100;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{value.toFixed(1)}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}

function FeatureCheck({ hasFeature }: { hasFeature: boolean }) {
  return hasFeature ? (
    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
      <Check className="w-3 h-3" />
    </div>
  ) : (
    <div className="w-5 h-5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center">
      <X className="w-3 h-3" />
    </div>
  );
}

interface VerticalNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

function VerticalNav({ activeTab, onTabChange, className = "" }: VerticalNavProps) {
  return (
    <nav className={`space-y-1 ${className}`}>
      {verticalTabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
              isActive 
                ? "bg-primary text-primary-foreground shadow-md" 
                : "hover-elevate text-muted-foreground hover:text-foreground"
            }`}
            whileHover={{ x: isActive ? 0 : 4 }}
            whileTap={{ scale: 0.98 }}
            data-testid={`nav-${tab.id}`}
          >
            <tab.icon className={`w-5 h-5 ${isActive ? "" : "opacity-70"}`} />
            <span className="font-medium">{tab.label}</span>
            {isActive && (
              <ChevronRight className="w-4 h-4 ml-auto" />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}

interface ContentPanelProps {
  activeTab: string;
  brokers: BrokerData[];
}

function ContentPanel({ activeTab, brokers }: ContentPanelProps) {
  const contentVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="h-full"
      >
        {activeTab === "clients" && <ClientsPanel brokers={brokers} />}
        {activeTab === "charges" && <ChargesPanel brokers={brokers} />}
        {activeTab === "complaints" && <ComplaintsPanel brokers={brokers} />}
        {activeTab === "holdings" && <HoldingsPanel brokers={brokers} />}
        {activeTab === "proscons" && <ProsConsPanel brokers={brokers} />}
        {activeTab === "financials" && <FinancialsPanel brokers={brokers} />}
        {activeTab === "ratings" && <RatingsPanel brokers={brokers} />}
      </motion.div>
    </AnimatePresence>
  );
}

function ClientsPanel({ brokers }: { brokers: BrokerData[] }) {
  const winnerId = getWinnerForMetric(brokers, b => b.activeClients.total);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-500/10">
          <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Active Clients Comparison</h2>
          <p className="text-sm text-muted-foreground">Total client base and market share analysis</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brokers.map((b, i) => ({ name: b.name, clients: b.activeClients.total / 1000000 }))}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}M`} />
                <RechartsTooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}M clients`, "Active Clients"]}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                />
                <Bar dataKey="clients" radius={[4, 4, 0, 0]}>
                  {brokers.map((b, i) => (
                    <Cell key={i} fill={b.id === winnerId ? "#22c55e" : CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-semibold">Broker</th>
              <th className="text-center p-3 font-semibold">Total Clients</th>
              <th className="text-center p-3 font-semibold">Growth</th>
              <th className="text-center p-3 font-semibold">Market Share</th>
              <th className="text-center p-3 font-semibold">Rank</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((b) => {
              const isWinner = b.id === winnerId;
              return (
                <tr key={b.id} className={`border-b ${isWinner ? "bg-emerald-500/5" : ""}`}>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <BrokerLogo broker={b} size="sm" />
                      <span className="font-medium">{b.name}</span>
                      {isWinner && <Trophy className="w-4 h-4 text-amber-500" />}
                    </div>
                  </td>
                  <td className={`p-3 text-center font-semibold ${isWinner ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                    {formatNumber(b.activeClients.total)}
                  </td>
                  <td className="p-3 text-center">
                    <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                      {b.activeClients.growth}
                    </Badge>
                  </td>
                  <td className="p-3 text-center">{b.activeClients.marketShare}</td>
                  <td className="p-3 text-center">
                    <Badge variant="outline">#{b.activeClients.rank}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ChargesPanel({ brokers }: { brokers: BrokerData[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-amber-500/10">
          <IndianRupee className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Brokerage & Charges</h2>
          <p className="text-sm text-muted-foreground">Compare trading costs across brokers</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-semibold">Charge Type</th>
              {brokers.map((b) => (
                <th key={b.id} className="text-center p-3 font-semibold min-w-[120px]">
                  <div className="flex flex-col items-center gap-1">
                    <BrokerLogo broker={b} size="sm" />
                    <span className="text-xs">{b.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 text-muted-foreground">Account Opening</td>
              {brokers.map((b) => (
                <td key={b.id} className={`p-3 text-center font-medium ${b.charges.accountOpening === 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                  {b.charges.accountOpening === 0 ? "Free" : formatCurrency(b.charges.accountOpening)}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 text-muted-foreground">AMC</td>
              {brokers.map((b) => (
                <td key={b.id} className={`p-3 text-center font-medium ${b.charges.maintenance === 0 ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                  {b.charges.maintenance === 0 ? "Free" : formatCurrency(b.charges.maintenance)}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 text-muted-foreground">Equity Delivery</td>
              {brokers.map((b) => (
                <td key={b.id} className={`p-3 text-center font-medium ${b.charges.equityDelivery === "Free" ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                  {b.charges.equityDelivery}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 text-muted-foreground">Equity Intraday</td>
              {brokers.map((b) => (
                <td key={b.id} className="p-3 text-center">{b.charges.equityIntraday}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 text-muted-foreground">F&O</td>
              {brokers.map((b) => (
                <td key={b.id} className="p-3 text-center">{b.charges.futuresOptions}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 text-muted-foreground">DP Charges</td>
              {brokers.map((b) => (
                <td key={b.id} className="p-3 text-center">{formatCurrency(b.charges.dpCharges)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ComplaintsPanel({ brokers }: { brokers: BrokerData[] }) {
  const winnerId = getWinnerForMetric(brokers, b => parseFloat(b.complaints.resolutionRate));
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-red-500/10">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Complaints Analysis</h2>
          <p className="text-sm text-muted-foreground">Resolution rates and customer grievances</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={brokers.map((b, i) => ({ name: b.name, rate: parseFloat(b.complaints.resolutionRate) }))}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-20} textAnchor="end" height={60} />
                <YAxis domain={[90, 100]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                <RechartsTooltip 
                  formatter={(value: number) => [`${value.toFixed(1)}%`, "Resolution Rate"]}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                />
                <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                  {brokers.map((b, i) => (
                    <Cell key={i} fill={b.id === winnerId ? "#22c55e" : CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-semibold">Broker</th>
              <th className="text-center p-3 font-semibold">Total</th>
              <th className="text-center p-3 font-semibold">Resolved</th>
              <th className="text-center p-3 font-semibold">Pending</th>
              <th className="text-center p-3 font-semibold">Resolution Rate</th>
              <th className="text-center p-3 font-semibold">Avg Days</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((b) => {
              const isWinner = b.id === winnerId;
              return (
                <tr key={b.id} className={`border-b ${isWinner ? "bg-emerald-500/5" : ""}`}>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <BrokerLogo broker={b} size="sm" />
                      <span className="font-medium">{b.name}</span>
                      {isWinner && <Shield className="w-4 h-4 text-emerald-500" />}
                    </div>
                  </td>
                  <td className="p-3 text-center">{b.complaints.total.toLocaleString()}</td>
                  <td className="p-3 text-center text-emerald-600 dark:text-emerald-400">{b.complaints.resolved.toLocaleString()}</td>
                  <td className="p-3 text-center text-red-600 dark:text-red-400">{b.complaints.pending}</td>
                  <td className={`p-3 text-center font-semibold ${isWinner ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                    {b.complaints.resolutionRate}
                  </td>
                  <td className="p-3 text-center">{b.complaints.avgResolutionDays} days</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HoldingsPanel({ brokers }: { brokers: BrokerData[] }) {
  const winnerId = getWinnerForMetric(brokers, b => b.shareHolding.avgHoldingValue);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-purple-500/10">
          <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Share Holding Analysis</h2>
          <p className="text-sm text-muted-foreground">Demat accounts and average holding values</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-semibold">Broker</th>
              <th className="text-center p-3 font-semibold">NSDL</th>
              <th className="text-center p-3 font-semibold">CDSL</th>
              <th className="text-center p-3 font-semibold">Total</th>
              <th className="text-center p-3 font-semibold">Avg Holding Value</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((b) => {
              const isWinner = b.id === winnerId;
              return (
                <tr key={b.id} className={`border-b ${isWinner ? "bg-purple-500/5" : ""}`}>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <BrokerLogo broker={b} size="sm" />
                      <span className="font-medium">{b.name}</span>
                      {isWinner && <Trophy className="w-4 h-4 text-amber-500" />}
                    </div>
                  </td>
                  <td className="p-3 text-center">{formatNumber(b.shareHolding.nsdl)}</td>
                  <td className="p-3 text-center">{formatNumber(b.shareHolding.cdsl)}</td>
                  <td className="p-3 text-center font-medium">{formatNumber(b.shareHolding.total)}</td>
                  <td className={`p-3 text-center font-semibold ${isWinner ? "text-purple-600 dark:text-purple-400" : ""}`}>
                    {formatCurrency(b.shareHolding.avgHoldingValue)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProsConsPanel({ brokers }: { brokers: BrokerData[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-teal-500/10">
          <ThumbsUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Pros & Cons</h2>
          <p className="text-sm text-muted-foreground">Advantages and disadvantages of each broker</p>
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(brokers.length, 2)}, minmax(280px, 1fr))` }}>
        {brokers.map((broker) => (
          <Card key={broker.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <BrokerLogo broker={broker} size="md" />
                <CardTitle className="text-lg">{broker.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Pros
                </h4>
                <ul className="space-y-1.5">
                  {broker.prosAndCons.pros.map((pro, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2 flex items-center gap-1">
                  <X className="w-4 h-4" /> Cons
                </h4>
                <ul className="space-y-1.5">
                  {broker.prosAndCons.cons.map((con, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function FinancialsPanel({ brokers }: { brokers: BrokerData[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-green-500/10">
          <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Financial Performance</h2>
          <p className="text-sm text-muted-foreground">Revenue, profit, and net worth comparison</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-semibold">Broker</th>
              <th className="text-center p-3 font-semibold">Revenue</th>
              <th className="text-center p-3 font-semibold">Profit</th>
              <th className="text-center p-3 font-semibold">Net Worth</th>
              <th className="text-center p-3 font-semibold">FY</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <BrokerLogo broker={b} size="sm" />
                    <span className="font-medium">{b.name}</span>
                  </div>
                </td>
                <td className="p-3 text-center font-medium">{b.financials.revenue}</td>
                <td className="p-3 text-center text-emerald-600 dark:text-emerald-400 font-medium">{b.financials.profit}</td>
                <td className="p-3 text-center">{b.financials.netWorth}</td>
                <td className="p-3 text-center">
                  <Badge variant="outline">{b.financials.fy}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RatingsPanel({ brokers }: { brokers: BrokerData[] }) {
  const winnerId = getWinnerForMetric(brokers, b => b.ratings.overall);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-amber-500/10">
          <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Ratings Comparison</h2>
          <p className="text-sm text-muted-foreground">Overall and category-wise ratings</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={[
                { metric: "Trading", ...Object.fromEntries(brokers.map(b => [b.name, b.ratings.trading])) },
                { metric: "Research", ...Object.fromEntries(brokers.map(b => [b.name, b.ratings.research])) },
                { metric: "Support", ...Object.fromEntries(brokers.map(b => [b.name, b.ratings.support])) },
                { metric: "Platform", ...Object.fromEntries(brokers.map(b => [b.name, b.ratings.platform])) },
                { metric: "Pricing", ...Object.fromEntries(brokers.map(b => [b.name, b.ratings.pricing])) },
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10 }} />
                {brokers.map((broker, i) => (
                  <Radar
                    key={broker.id}
                    name={broker.name}
                    dataKey={broker.name}
                    stroke={CHART_COLORS[i % CHART_COLORS.length]}
                    fill={CHART_COLORS[i % CHART_COLORS.length]}
                    fillOpacity={0.2}
                  />
                ))}
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Overall Score Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {brokers
              .map((b, i) => ({ broker: b, score: calculateOverallScore(b) }))
              .sort((a, b) => b.score - a.score)
              .map((item, index) => (
                <div key={item.broker.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${index === 0 ? "bg-amber-500" : index === 1 ? "bg-slate-400" : index === 2 ? "bg-amber-700" : "bg-muted text-muted-foreground"}`}>
                    {index + 1}
                  </div>
                  <BrokerLogo broker={item.broker} size="sm" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{item.broker.name}</span>
                      <span className="font-bold">{item.score}</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                  {index === 0 && <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Winner</Badge>}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BrokerComparison() {
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>(["zerodha", "groww", "angel-one"]);
  const [activeTab, setActiveTab] = useState("clients");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleBroker = (id: string) => {
    setSelectedBrokers(prev => {
      if (prev.includes(id)) {
        return prev.filter(b => b !== id);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const selectedBrokerData = brokerData.filter(b => selectedBrokers.includes(b.id));

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-12">
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF6F0] via-[#FFEEE4] to-[#FFF5EE] dark:from-background dark:via-background dark:to-background" />
        <motion.div
          className="absolute top-10 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <FadeInUp className="flex items-center gap-4 mb-6">
            <motion.div 
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#4ECDC4] text-white flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Scale className="w-7 h-7" />
            </motion.div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-foreground">Broker Comparison</h1>
              <p className="text-slate-600 dark:text-muted-foreground">Compare India's top stockbrokers side by side</p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">Select up to 4 brokers to compare:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {brokerData.map((broker) => (
                  <BrokerCard
                    key={broker.id}
                    broker={broker}
                    isSelected={selectedBrokers.includes(broker.id)}
                    onSelect={() => toggleBroker(broker.id)}
                  />
                ))}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {selectedBrokers.length >= 2 && (
        <section className="py-6 bg-white/50 dark:bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <FadeInUp delay={0.2}>
              <div className="flex gap-6">
                {/* Mobile Nav Toggle */}
                <div className="lg:hidden mb-4">
                  <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <Menu className="w-4 h-4" />
                        {verticalTabs.find(t => t.id === activeTab)?.label || "Select Category"}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72">
                      <div className="mt-6">
                        <h3 className="font-semibold mb-4">Comparison Categories</h3>
                        <VerticalNav 
                          activeTab={activeTab} 
                          onTabChange={handleTabChange}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>

                {/* Desktop Sidebar */}
                <Card className="hidden lg:block w-64 flex-shrink-0 h-fit sticky top-32">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Categories</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <VerticalNav 
                      activeTab={activeTab} 
                      onTabChange={handleTabChange}
                    />
                  </CardContent>
                </Card>

                {/* Main Content */}
                <Card className="flex-1 min-w-0">
                  <CardContent className="p-4 md:p-6">
                    <ContentPanel 
                      activeTab={activeTab} 
                      brokers={selectedBrokerData}
                    />
                  </CardContent>
                </Card>
              </div>
            </FadeInUp>
          </div>
        </section>
      )}

      {selectedBrokers.length < 2 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <Card className="bg-muted/50">
              <CardContent className="py-12 text-center">
                <Scale className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold mb-2">Select at least 2 brokers to compare</h3>
                <p className="text-muted-foreground">Click on the broker cards above to start comparing</p>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
