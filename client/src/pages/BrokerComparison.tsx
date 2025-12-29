import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  PieChart as RechartsPieChart,
  Pie,
  LineChart,
  Line,
  Area,
  AreaChart,
  ComposedChart,
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
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { brokerData, type BrokerData, formatNumber, formatCurrency } from "@/data/brokerData";
import { FadeInUp, ScaleIn } from "@/components/AnimationWrappers";

const CHART_COLORS = [
  "#4A90E2", "#4ECDC4", "#FF7B7B", "#9B59B6", "#F39C12", "#1ABC9C", "#E74C3C", "#3498DB"
];

const PASTEL_BADGE_COLORS = [
  { bg: "bg-blue-100", text: "text-blue-700" },
  { bg: "bg-green-100", text: "text-green-700" },
  { bg: "bg-yellow-100", text: "text-yellow-700" },
  { bg: "bg-purple-100", text: "text-purple-700" },
  { bg: "bg-pink-100", text: "text-pink-700" },
  { bg: "bg-cyan-100", text: "text-cyan-700" },
  { bg: "bg-orange-100", text: "text-orange-700" },
  { bg: "bg-indigo-100", text: "text-indigo-700" },
  { bg: "bg-teal-100", text: "text-teal-700" },
  { bg: "bg-rose-100", text: "text-rose-700" },
  { bg: "bg-emerald-100", text: "text-emerald-700" },
  { bg: "bg-violet-100", text: "text-violet-700" },
  { bg: "bg-amber-100", text: "text-amber-700" },
  { bg: "bg-lime-100", text: "text-lime-700" },
  { bg: "bg-sky-100", text: "text-sky-700" },
  { bg: "bg-fuchsia-100", text: "text-fuchsia-700" },
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

type SortOption = "rating" | "charges" | "popularity";
type FilterOption = "all" | "discount" | "fullservice" | "popular";

function getLowestChargeWinner(brokers: BrokerData[], getCharge: (b: BrokerData) => number | string): string {
  if (brokers.length === 0) return "";
  const brokerValues = brokers.map(b => {
    const charge = getCharge(b);
    if (typeof charge === "string") {
      const lowerCharge = charge.toLowerCase();
      if (lowerCharge === "free" || lowerCharge.includes("free")) return { id: b.id, value: 0 };
      
      const percentMatch = charge.match(/([\d.]+)%/);
      if (percentMatch) {
        return { id: b.id, value: parseFloat(percentMatch[1]) };
      }
      
      const rsMatch = charge.match(/rs\s*([\d.]+)/i);
      if (rsMatch) {
        return { id: b.id, value: parseFloat(rsMatch[1]) * 100 };
      }
      
      const numMatch = charge.match(/[\d.]+/);
      return { id: b.id, value: numMatch ? parseFloat(numMatch[0]) : Infinity };
    }
    return { id: b.id, value: charge };
  });
  const sorted = brokerValues.sort((a, b) => a.value - b.value);
  return sorted[0].id;
}

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
      return { tag: "Best for Beginners", icon: Target, color: "bg-emerald-100 text-emerald-700" };
    case "traders":
      return { tag: "Best for Traders", icon: Zap, color: "bg-blue-100 text-blue-700" };
    case "investors":
      return { tag: "Best for Investors", icon: Wallet, color: "bg-purple-100 text-purple-700" };
    default:
      return { tag: "Well Balanced", icon: Scale, color: "bg-amber-100 text-amber-700" };
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

const BROKER_LOGOS: Record<string, string> = {
  zerodha: "/brokers/zerodha.svg",
  "angel-one": "/brokers/angel-one.svg",
  groww: "/brokers/groww.svg",
  upstox: "/brokers/upstox.svg",
  "icici-direct": "/brokers/icici-direct.svg",
  "hdfc-securities": "/brokers/hdfc-securities.svg",
  "kotak-securities": "/brokers/kotak-securities.svg",
  "5paisa": "/brokers/5paisa.svg",
  dhan: "/brokers/dhan.svg",
  "motilal-oswal": "/brokers/motilal-oswal.svg",
  indmoney: "/brokers/indmoney.svg",
  "paytm-money": "/brokers/paytm-money.svg",
  fyers: "/brokers/fyers.svg",
  "anand-rathi": "/brokers/anand-rathi.svg",
  "alice-blue": "/brokers/alice-blue.svg",
  samco: "/brokers/samco.svg"
};

function BrokerLogo({ broker, size = "md" }: { broker: BrokerData; size?: "sm" | "md" | "lg" | "xl" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-16 h-16"
  };

  const logoPath = BROKER_LOGOS[broker.id];

  return (
    <div className={`${sizeClasses[size]} rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-sm border border-gray-100`}>
      <img 
        src={logoPath}
        alt={`${broker.name} logo`}
        className="w-full h-full object-contain p-1"
        loading="lazy"
      />
    </div>
  );
}

function PremiumBrokerCard({ 
  broker, 
  index,
  isSelected, 
  onSelect 
}: { 
  broker: BrokerData; 
  index: number;
  isSelected: boolean; 
  onSelect: () => void; 
}) {
  const badgeColor = PASTEL_BADGE_COLORS[index % PASTEL_BADGE_COLORS.length];
  const bestFor = getBestForTag(broker);
  const score = calculateOverallScore(broker);
  const BestForIcon = bestFor.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      whileHover={{ 
        y: -2, 
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <div
        className={`relative h-full p-5 rounded-2xl cursor-pointer transition-all duration-300 bg-white dark:bg-slate-800 border ${
          isSelected 
            ? "ring-2 ring-primary border-primary shadow-lg" 
            : "border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5"
        }`}
        onClick={onSelect}
        data-testid={`broker-card-${broker.id}`}
      >
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-md z-10"
            >
              <Check className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`p-3 rounded-2xl ${badgeColor.bg}`}>
            <BrokerLogo broker={broker} size="lg" />
          </div>
          
          <div>
            <h3 className="font-semibold text-base text-slate-900 dark:text-white">
              {broker.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {formatNumber(broker.activeClients.total)} clients
            </p>
          </div>

          <div className="flex items-center gap-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3.5 h-3.5 ${i < Math.floor(broker.ratings.overall) ? "fill-current" : "opacity-30"}`} 
              />
            ))}
            <span className="text-xs font-semibold ml-1 text-slate-700 dark:text-slate-300">
              {broker.ratings.overall}
            </span>
          </div>

          <Badge className={`text-xs ${bestFor.color} border-0`}>
            <BestForIcon className="w-3 h-3 mr-1" />
            {bestFor.tag}
          </Badge>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            className="w-full"
            data-testid={`button-add-compare-${broker.id}`}
          >
            {isSelected ? (
              <span className="flex items-center justify-center gap-1">
                <Check className="w-4 h-4" /> Added
              </span>
            ) : (
              <span className="flex items-center justify-center gap-1">
                <Scale className="w-4 h-4" /> Add to Compare
              </span>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function BrokerCardMini({ 
  broker, 
  isSelected, 
  onSelect 
}: { 
  broker: BrokerData; 
  isSelected: boolean; 
  onSelect: () => void; 
}) {
  return (
    <motion.button
      onClick={onSelect}
      className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 w-full bg-white dark:bg-slate-800 border ${
        isSelected 
          ? "ring-2 ring-primary border-primary shadow-md" 
          : "border-gray-200 dark:border-slate-700 hover:shadow-md hover:-translate-y-0.5"
      }`}
      whileTap={{ scale: 0.98 }}
      data-testid={`broker-card-mini-${broker.id}`}
    >
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shadow-md z-10"
          >
            <Check className="w-3 h-3" />
          </motion.div>
        )}
      </AnimatePresence>
      <BrokerLogo broker={broker} size="lg" />
      <div className="text-center">
        <h3 className={`font-semibold text-sm ${isSelected ? "text-primary" : "text-slate-900 dark:text-white"}`}>
          {broker.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {formatNumber(broker.activeClients.total)} clients
        </p>
      </div>
    </motion.button>
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
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={`cursor-pointer transition-all duration-200 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 ${
          isSelected 
            ? "ring-2 ring-primary border-primary shadow-md" 
            : "hover:shadow-md hover:-translate-y-0.5"
        }`}
        onClick={onSelect}
        data-testid={`broker-card-detail-${broker.id}`}
      >
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            <BrokerLogo broker={broker} size="sm" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate">{broker.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{broker.tagline}</p>
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
          
          <div className="mt-2 flex items-center justify-between gap-2 flex-wrap">
            <Badge className={`text-xs ${bestFor.color} border-0`}>
              <BestForIcon className="w-3 h-3 mr-1" />
              {bestFor.tag}
            </Badge>
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 rounded">
              <Award className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-300">{score}</span>
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
        <span className="text-slate-600 dark:text-slate-400">{label}</span>
        <span className="font-semibold text-slate-900 dark:text-white">{value.toFixed(1)}</span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}

function FeatureCheck({ hasFeature }: { hasFeature: boolean }) {
  return hasFeature ? (
    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
      <Check className="w-3 h-3" />
    </div>
  ) : (
    <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center">
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
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
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
  const growthWinner = getWinnerForMetric(brokers, b => parseFloat(b.activeClients.growth.replace('+', '').replace('%', '')));
  
  const pieData = brokers.map((b, i) => ({
    name: b.name,
    value: b.activeClients.total,
    fill: CHART_COLORS[i % CHART_COLORS.length]
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Clients Comparison</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Total client base and market share analysis</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {brokers.map((b) => {
            const badges = [];
            if (b.id === winnerId) badges.push({ label: "Most Popular", color: "bg-emerald-100 text-emerald-700" });
            if (b.id === growthWinner) badges.push({ label: "Fastest Growing", color: "bg-blue-100 text-blue-700" });
            return badges.map((badge, i) => (
              <Badge key={`${b.id}-${i}`} className={`${badge.color} border-0`}>
                <BrokerLogo broker={b} size="sm" />
                <span className="ml-1">{badge.label}</span>
              </Badge>
            ));
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">Client Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    labelLine={{ strokeWidth: 1 }}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number) => formatNumber(value)}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">Client Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={brokers.map(b => ({
                  name: b.name,
                  growth: parseFloat(b.activeClients.growth.replace('+', '').replace('%', '')),
                  fill: b.id === growthWinner ? '#22c55e' : '#3b82f6'
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                  <RechartsTooltip 
                    formatter={(value: number) => `${value}%`}
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="growth" radius={[4, 4, 0, 0]}>
                    {brokers.map((b, index) => (
                      <Cell key={`cell-${index}`} fill={b.id === growthWinner ? '#22c55e' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Broker</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Total Clients</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Growth</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Market Share</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Rank</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map((b, i) => (
                  <tr key={b.id} className={`border-b border-gray-100 dark:border-slate-800 ${b.id === winnerId ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <BrokerLogo broker={b} size="sm" />
                        <span className="font-medium text-slate-900 dark:text-white">{b.name}</span>
                        {b.id === winnerId && (
                          <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">Leader</Badge>
                        )}
                      </div>
                    </td>
                    <td className="text-right py-3 px-4 font-mono text-slate-700 dark:text-slate-300">{formatNumber(b.activeClients.total)}</td>
                    <td className="text-right py-3 px-4">
                      <span className={`font-semibold ${b.activeClients.growth.includes('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                        {b.activeClients.growth}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-slate-700 dark:text-slate-300">{b.activeClients.marketShare}</td>
                    <td className="text-right py-3 px-4">
                      <Badge variant="outline" className="font-mono">#{b.activeClients.rank}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ChargesPanel({ brokers }: { brokers: BrokerData[] }) {
  const deliveryWinner = getLowestChargeWinner(brokers, b => b.charges.equityDelivery);
  const intradayWinner = getLowestChargeWinner(brokers, b => b.charges.equityIntraday);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <motion.div 
          className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30"
          whileHover={{ scale: 1.05 }}
        >
          <IndianRupee className="w-5 h-5 text-green-600 dark:text-green-400" />
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Brokerage Charges Comparison</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Compare trading costs across brokers</p>
        </div>
      </div>

      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Broker</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Account Opening</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">AMC</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Equity Delivery</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Equity Intraday</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">F&O</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">DP Charges</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map((b) => (
                  <tr key={b.id} className="border-b border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <BrokerLogo broker={b} size="sm" />
                        <span className="font-medium text-slate-900 dark:text-white">{b.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className={b.charges.accountOpening === 0 ? "text-emerald-600 font-semibold" : "text-slate-700 dark:text-slate-300"}>
                        {b.charges.accountOpening === 0 ? "Free" : `Rs ${b.charges.accountOpening}`}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className={b.charges.maintenance === 0 ? "text-emerald-600 font-semibold" : "text-slate-700 dark:text-slate-300"}>
                        {b.charges.maintenance === 0 ? "Free" : `Rs ${b.charges.maintenance}`}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className={`font-medium ${b.id === deliveryWinner ? "text-emerald-600" : "text-slate-700 dark:text-slate-300"}`}>
                        {b.charges.equityDelivery}
                        {b.id === deliveryWinner && <Trophy className="w-3 h-3 inline ml-1 text-amber-500" />}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className={`font-medium ${b.id === intradayWinner ? "text-emerald-600" : "text-slate-700 dark:text-slate-300"}`}>
                        {b.charges.equityIntraday}
                        {b.id === intradayWinner && <Trophy className="w-3 h-3 inline ml-1 text-amber-500" />}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4 text-slate-700 dark:text-slate-300">{b.charges.futuresOptions}</td>
                    <td className="text-right py-3 px-4 text-slate-700 dark:text-slate-300">Rs {b.charges.dpCharges}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ComplaintsPanel({ brokers }: { brokers: BrokerData[] }) {
  const bestResolution = getWinnerForMetric(brokers, b => parseFloat(b.complaints.resolutionRate));
  const fastestResolution = getWinnerForMetric(brokers, b => b.complaints.avgResolutionDays, true);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <motion.div 
          className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30"
          whileHover={{ scale: 1.05 }}
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Complaints Analysis</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Customer complaint handling comparison</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {brokers.map((b) => (
          <Card key={b.id} className={`bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl ${b.id === bestResolution ? 'ring-2 ring-emerald-500' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <BrokerLogo broker={b} size="md" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{b.name}</h3>
                  {b.id === bestResolution && (
                    <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">Best Resolution</Badge>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Total Complaints</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{formatNumber(b.complaints.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Resolved</span>
                  <span className="font-semibold text-emerald-600">{formatNumber(b.complaints.resolved)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Pending</span>
                  <span className="font-semibold text-amber-600">{formatNumber(b.complaints.pending)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Resolution Rate</span>
                  <span className="font-bold text-emerald-600">{b.complaints.resolutionRate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Avg Resolution</span>
                  <span className={`font-semibold ${b.id === fastestResolution ? 'text-emerald-600' : 'text-slate-900 dark:text-white'}`}>
                    {b.complaints.avgResolutionDays} days
                    {b.id === fastestResolution && <Zap className="w-3 h-3 inline ml-1" />}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function HoldingsPanel({ brokers }: { brokers: BrokerData[] }) {
  const highestValue = getWinnerForMetric(brokers, b => b.shareHolding.avgHoldingValue);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <motion.div 
          className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30"
          whileHover={{ scale: 1.05 }}
        >
          <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Share Holdings Comparison</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">NSDL and CDSL holding analysis</p>
        </div>
      </div>

      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Broker</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">NSDL</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">CDSL</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Total</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Avg Value</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map((b) => (
                  <tr key={b.id} className={`border-b border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors ${b.id === highestValue ? 'bg-purple-50 dark:bg-purple-900/20' : ''}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <BrokerLogo broker={b} size="sm" />
                        <span className="font-medium text-slate-900 dark:text-white">{b.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4 font-mono text-slate-700 dark:text-slate-300">{formatNumber(b.shareHolding.nsdl)}</td>
                    <td className="text-right py-3 px-4 font-mono text-slate-700 dark:text-slate-300">{formatNumber(b.shareHolding.cdsl)}</td>
                    <td className="text-right py-3 px-4 font-mono text-slate-700 dark:text-slate-300">{formatNumber(b.shareHolding.total)}</td>
                    <td className="text-right py-3 px-4">
                      <span className={`font-semibold ${b.id === highestValue ? 'text-purple-600' : 'text-slate-700 dark:text-slate-300'}`}>
                        {formatCurrency(b.shareHolding.avgHoldingValue)}
                        {b.id === highestValue && <Trophy className="w-3 h-3 inline ml-1 text-amber-500" />}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProsConsPanel({ brokers }: { brokers: BrokerData[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <motion.div 
          className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/30"
          whileHover={{ scale: 1.05 }}
        >
          <ThumbsUp className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pros & Cons</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Key advantages and disadvantages</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brokers.map((b) => (
          <Card key={b.id} className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <BrokerLogo broker={b} size="md" />
                <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">{b.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Pros
                </h4>
                <ul className="space-y-1">
                  {b.prosAndCons.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="text-emerald-500 mt-1">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-1">
                  <X className="w-4 h-4" /> Cons
                </h4>
                <ul className="space-y-1">
                  {b.prosAndCons.cons.map((con, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                      <span className="text-red-500 mt-1">-</span>
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
        <motion.div 
          className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30"
          whileHover={{ scale: 1.05 }}
        >
          <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Financial Performance</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Revenue, profit and net worth comparison</p>
        </div>
      </div>

      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                  <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Broker</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Revenue</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Profit</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Net Worth</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">FY</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map((b) => (
                  <tr key={b.id} className="border-b border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <BrokerLogo broker={b} size="sm" />
                        <span className="font-medium text-slate-900 dark:text-white">{b.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">{b.financials.revenue}</td>
                    <td className="text-right py-3 px-4 font-semibold text-emerald-600">{b.financials.profit}</td>
                    <td className="text-right py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">{b.financials.netWorth}</td>
                    <td className="text-right py-3 px-4 text-slate-500 dark:text-slate-400">{b.financials.fy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RatingsPanel({ brokers }: { brokers: BrokerData[] }) {
  const bestOverall = getWinnerForMetric(brokers, b => b.ratings.overall);
  
  const radarData = [
    { subject: 'Trading', fullMark: 5 },
    { subject: 'Research', fullMark: 5 },
    { subject: 'Support', fullMark: 5 },
    { subject: 'Platform', fullMark: 5 },
    { subject: 'Pricing', fullMark: 5 },
  ].map(item => {
    const data: any = { subject: item.subject };
    brokers.forEach(b => {
      const key = item.subject.toLowerCase() as keyof typeof b.ratings;
      data[b.name] = b.ratings[key];
    });
    return data;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <motion.div 
          className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30"
          whileHover={{ scale: 1.05 }}
        >
          <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
        </motion.div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ratings Comparison</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">Detailed rating breakdown across categories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">Radar Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                  {brokers.map((b, i) => (
                    <Radar
                      key={b.id}
                      name={b.name}
                      dataKey={b.name}
                      stroke={CHART_COLORS[i % CHART_COLORS.length]}
                      fill={CHART_COLORS[i % CHART_COLORS.length]}
                      fillOpacity={0.2}
                    />
                  ))}
                  <Legend />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {brokers.map((b) => (
            <Card key={b.id} className={`bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl ${b.id === bestOverall ? 'ring-2 ring-amber-500' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <BrokerLogo broker={b} size="md" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{b.name}</h3>
                    {b.id === bestOverall && (
                      <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">Top Rated</Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-600">{b.ratings.overall}</div>
                    <div className="text-xs text-slate-500">Overall</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <RatingBar label="Trading" value={b.ratings.trading} />
                  <RatingBar label="Research" value={b.ratings.research} />
                  <RatingBar label="Support" value={b.ratings.support} />
                  <RatingBar label="Platform" value={b.ratings.platform} />
                  <RatingBar label="Pricing" value={b.ratings.pricing} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function StickyCompareBar({ 
  selectedBrokers, 
  brokers,
  onClear,
  onCompare 
}: { 
  selectedBrokers: string[];
  brokers: BrokerData[];
  onClear: () => void;
  onCompare: () => void;
}) {
  const selected = brokers.filter(b => selectedBrokers.includes(b.id));
  
  if (selectedBrokers.length < 2) return null;
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-safe"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-lg p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Comparing:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {selected.map((b) => (
                <Badge key={b.id} variant="secondary" className="flex items-center gap-1">
                  <BrokerLogo broker={b} size="sm" />
                  <span>{b.name}</span>
                </Badge>
              ))}
            </div>
            <Badge variant="outline" className="font-mono">
              {selectedBrokers.length} selected
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClear} data-testid="button-clear-compare">
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
            <Button onClick={onCompare} data-testid="button-compare-now">
              <Scale className="w-4 h-4 mr-2" />
              Compare Now
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function BrokerComparison() {
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("clients");
  const [showComparison, setShowComparison] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const toggleBroker = (brokerId: string) => {
    setSelectedBrokers(prev =>
      prev.includes(brokerId)
        ? prev.filter(id => id !== brokerId)
        : [...prev, brokerId]
    );
  };

  const clearSelection = () => {
    setSelectedBrokers([]);
    setShowComparison(false);
  };

  const startComparison = () => {
    if (selectedBrokers.length >= 2) {
      setShowComparison(true);
    }
  };

  const filteredAndSortedBrokers = useMemo(() => {
    let result = [...brokerData];
    
    if (searchQuery) {
      result = result.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterBy === "discount") {
      result = result.filter(b => 
        b.charges.equityDelivery === "Free" || b.charges.accountOpening === 0
      );
    } else if (filterBy === "fullservice") {
      result = result.filter(b => b.features.research);
    } else if (filterBy === "popular") {
      result = result.filter(b => b.activeClients.total >= 3000000);
    }
    
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.ratings.overall - a.ratings.overall);
        break;
      case "charges":
        result.sort((a, b) => {
          const aFree = a.charges.equityDelivery === "Free" ? 0 : 1;
          const bFree = b.charges.equityDelivery === "Free" ? 0 : 1;
          return aFree - bFree;
        });
        break;
      case "popularity":
        result.sort((a, b) => b.activeClients.total - a.activeClients.total);
        break;
    }
    
    return result;
  }, [searchQuery, sortBy, filterBy]);

  const selectedBrokerData = brokerData.filter(b => selectedBrokers.includes(b.id));

  if (showComparison && selectedBrokerData.length >= 2) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] dark:bg-background">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setShowComparison(false)}
              className="mb-4"
              data-testid="button-back-to-selection"
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              Back to Selection
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Broker Comparison
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Detailed side-by-side comparison of {selectedBrokerData.map(b => b.name).join(", ")}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden mb-4" data-testid="button-menu">
                  <Menu className="w-4 h-4 mr-2" />
                  {verticalTabs.find(t => t.id === activeTab)?.label}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="py-4">
                  <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Compare By</h3>
                  <VerticalNav activeTab={activeTab} onTabChange={setActiveTab} />
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-24">
                <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm rounded-2xl">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Compare By</h3>
                    <VerticalNav activeTab={activeTab} onTabChange={setActiveTab} />
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <ContentPanel activeTab={activeTab} brokers={selectedBrokerData} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] dark:bg-background">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-primary/10 text-primary border-0 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Compare & Choose
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Compare Stock Brokers in India
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Select 2 or more brokers to compare their features, charges, ratings and more. 
              Make an informed decision for your trading journey.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search broker..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 dark:border-slate-700"
                data-testid="input-search-broker"
              />
            </div>
            
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[140px] border-gray-200 dark:border-slate-700" data-testid="select-sort">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="charges">Charges</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: "all", label: "All" },
                  { value: "discount", label: "Discount" },
                  { value: "fullservice", label: "Full-service" },
                  { value: "popular", label: "Most popular" },
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={filterBy === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterBy(option.value as FilterOption)}
                    className={`rounded-full ${filterBy !== option.value ? 'border-gray-200 dark:border-slate-700' : ''}`}
                    data-testid={`filter-${option.value}`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-24">
          {filteredAndSortedBrokers.map((broker, index) => (
            <PremiumBrokerCard
              key={broker.id}
              broker={broker}
              index={index}
              isSelected={selectedBrokers.includes(broker.id)}
              onSelect={() => toggleBroker(broker.id)}
            />
          ))}
        </div>

        {filteredAndSortedBrokers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500">No brokers found matching your criteria.</p>
          </div>
        )}

        <AnimatePresence>
          <StickyCompareBar
            selectedBrokers={selectedBrokers}
            brokers={brokerData}
            onClear={clearSelection}
            onCompare={startComparison}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
