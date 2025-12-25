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

const BROKER_LOGOS: Record<string, { logo: string; fallbackGradient: string; initials: string; bgColor: string }> = {
  zerodha: { 
    logo: "https://logo.clearbit.com/zerodha.com",
    fallbackGradient: "from-blue-600 to-blue-800", 
    initials: "Z",
    bgColor: "bg-white"
  },
  "angel-one": { 
    logo: "https://logo.clearbit.com/angelone.in",
    fallbackGradient: "from-red-500 to-red-700", 
    initials: "A",
    bgColor: "bg-white"
  },
  groww: { 
    logo: "https://logo.clearbit.com/groww.in",
    fallbackGradient: "from-green-500 to-green-700", 
    initials: "G",
    bgColor: "bg-white"
  },
  upstox: { 
    logo: "https://logo.clearbit.com/upstox.com",
    fallbackGradient: "from-purple-600 to-purple-800", 
    initials: "U",
    bgColor: "bg-white"
  },
  "icici-direct": { 
    logo: "https://logo.clearbit.com/icicidirect.com",
    fallbackGradient: "from-orange-500 to-orange-700", 
    initials: "IC",
    bgColor: "bg-white"
  },
  "hdfc-securities": { 
    logo: "https://logo.clearbit.com/hdfcsec.com",
    fallbackGradient: "from-blue-700 to-indigo-800", 
    initials: "H",
    bgColor: "bg-white"
  },
  "kotak-securities": { 
    logo: "https://logo.clearbit.com/kotaksecurities.com",
    fallbackGradient: "from-red-600 to-red-800", 
    initials: "K",
    bgColor: "bg-white"
  },
  "5paisa": { 
    logo: "https://logo.clearbit.com/5paisa.com",
    fallbackGradient: "from-teal-500 to-teal-700", 
    initials: "5P",
    bgColor: "bg-white"
  },
  dhan: { 
    logo: "https://logo.clearbit.com/dhan.co",
    fallbackGradient: "from-violet-500 to-violet-700", 
    initials: "D",
    bgColor: "bg-white"
  },
  "motilal-oswal": { 
    logo: "https://logo.clearbit.com/motilaloswal.com",
    fallbackGradient: "from-amber-600 to-amber-800", 
    initials: "MO",
    bgColor: "bg-white"
  },
  indmoney: { 
    logo: "https://logo.clearbit.com/indmoney.com",
    fallbackGradient: "from-emerald-500 to-emerald-700", 
    initials: "IN",
    bgColor: "bg-white"
  },
  "paytm-money": { 
    logo: "https://logo.clearbit.com/paytmmoney.com",
    fallbackGradient: "from-sky-500 to-sky-700", 
    initials: "PM",
    bgColor: "bg-white"
  },
  fyers: { 
    logo: "https://logo.clearbit.com/fyers.in",
    fallbackGradient: "from-indigo-500 to-indigo-700", 
    initials: "FY",
    bgColor: "bg-white"
  },
  "anand-rathi": { 
    logo: "https://logo.clearbit.com/rfrathi.com",
    fallbackGradient: "from-rose-600 to-rose-800", 
    initials: "AR",
    bgColor: "bg-white"
  },
  "alice-blue": { 
    logo: "https://logo.clearbit.com/aliceblueonline.com",
    fallbackGradient: "from-cyan-500 to-cyan-700", 
    initials: "AB",
    bgColor: "bg-white"
  },
  samco: { 
    logo: "https://logo.clearbit.com/samco.in",
    fallbackGradient: "from-pink-500 to-pink-700", 
    initials: "S",
    bgColor: "bg-white"
  }
};

function BrokerLogo({ broker, size = "md" }: { broker: BrokerData; size?: "sm" | "md" | "lg" | "xl" }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
    xl: "w-20 h-20"
  };
  
  const imageSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };
  
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
    xl: "text-2xl"
  };

  const brokerConfig = BROKER_LOGOS[broker.id] || { 
    logo: "", 
    fallbackGradient: "from-gray-500 to-gray-700", 
    initials: broker.name.charAt(0),
    bgColor: "bg-white"
  };

  if (imageError || !brokerConfig.logo) {
    return (
      <div className={`${sizeClasses[size]} ${textSizes[size]} rounded-xl bg-gradient-to-br ${brokerConfig.fallbackGradient} text-white flex items-center justify-center font-bold shadow-md border border-white/20`}>
        {brokerConfig.initials}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} rounded-xl ${brokerConfig.bgColor} dark:bg-white flex items-center justify-center shadow-md overflow-hidden p-2 border border-gray-100 dark:border-gray-200 relative`}>
      {!imageLoaded && (
        <div className={`absolute inset-0 flex items-center justify-center ${textSizes[size]} rounded-xl bg-gradient-to-br ${brokerConfig.fallbackGradient} text-white font-bold`}>
          {brokerConfig.initials}
        </div>
      )}
      <img 
        src={brokerConfig.logo}
        alt={`${broker.name} logo`}
        className={`${imageSizes[size]} object-contain ${imageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
        loading="lazy"
      />
    </div>
  );
}

const VARSITY_PASTEL_COLORS = [
  { bg: "from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30", border: "border-blue-300/50 dark:border-blue-600/30", text: "text-blue-700 dark:text-blue-300", shadow: "shadow-blue-200/50 dark:shadow-blue-900/30" },
  { bg: "from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30", border: "border-emerald-300/50 dark:border-emerald-600/30", text: "text-emerald-700 dark:text-emerald-300", shadow: "shadow-emerald-200/50 dark:shadow-emerald-900/30" },
  { bg: "from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30", border: "border-purple-300/50 dark:border-purple-600/30", text: "text-purple-700 dark:text-purple-300", shadow: "shadow-purple-200/50 dark:shadow-purple-900/30" },
  { bg: "from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30", border: "border-amber-300/50 dark:border-amber-600/30", text: "text-amber-700 dark:text-amber-300", shadow: "shadow-amber-200/50 dark:shadow-amber-900/30" },
  { bg: "from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30", border: "border-rose-300/50 dark:border-rose-600/30", text: "text-rose-700 dark:text-rose-300", shadow: "shadow-rose-200/50 dark:shadow-rose-900/30" },
  { bg: "from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30", border: "border-cyan-300/50 dark:border-cyan-600/30", text: "text-cyan-700 dark:text-cyan-300", shadow: "shadow-cyan-200/50 dark:shadow-cyan-900/30" },
  { bg: "from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30", border: "border-orange-300/50 dark:border-orange-600/30", text: "text-orange-700 dark:text-orange-300", shadow: "shadow-orange-200/50 dark:shadow-orange-900/30" },
  { bg: "from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30", border: "border-indigo-300/50 dark:border-indigo-600/30", text: "text-indigo-700 dark:text-indigo-300", shadow: "shadow-indigo-200/50 dark:shadow-indigo-900/30" },
  { bg: "from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30", border: "border-teal-300/50 dark:border-teal-600/30", text: "text-teal-700 dark:text-teal-300", shadow: "shadow-teal-200/50 dark:shadow-teal-900/30" },
  { bg: "from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30", border: "border-pink-300/50 dark:border-pink-600/30", text: "text-pink-700 dark:text-pink-300", shadow: "shadow-pink-200/50 dark:shadow-pink-900/30" },
  { bg: "from-lime-100 to-lime-200 dark:from-lime-900/30 dark:to-lime-800/30", border: "border-lime-300/50 dark:border-lime-600/30", text: "text-lime-700 dark:text-lime-300", shadow: "shadow-lime-200/50 dark:shadow-lime-900/30" },
  { bg: "from-sky-100 to-sky-200 dark:from-sky-900/30 dark:to-sky-800/30", border: "border-sky-300/50 dark:border-sky-600/30", text: "text-sky-700 dark:text-sky-300", shadow: "shadow-sky-200/50 dark:shadow-sky-900/30" },
  { bg: "from-violet-100 to-violet-200 dark:from-violet-900/30 dark:to-violet-800/30", border: "border-violet-300/50 dark:border-violet-600/30", text: "text-violet-700 dark:text-violet-300", shadow: "shadow-violet-200/50 dark:shadow-violet-900/30" },
  { bg: "from-fuchsia-100 to-fuchsia-200 dark:from-fuchsia-900/30 dark:to-fuchsia-800/30", border: "border-fuchsia-300/50 dark:border-fuchsia-600/30", text: "text-fuchsia-700 dark:text-fuchsia-300", shadow: "shadow-fuchsia-200/50 dark:shadow-fuchsia-900/30" },
  { bg: "from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30", border: "border-red-300/50 dark:border-red-600/30", text: "text-red-700 dark:text-red-300", shadow: "shadow-red-200/50 dark:shadow-red-900/30" },
  { bg: "from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30", border: "border-yellow-300/50 dark:border-yellow-600/30", text: "text-yellow-700 dark:text-yellow-300", shadow: "shadow-yellow-200/50 dark:shadow-yellow-900/30" },
];

function VarsityBrokerCard({ 
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
  const colorScheme = VARSITY_PASTEL_COLORS[index % VARSITY_PASTEL_COLORS.length];
  const bestFor = getBestForTag(broker);
  const score = calculateOverallScore(broker);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ 
        y: -8, 
        scale: 1.03,
        rotateX: 5,
        rotateY: 2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="perspective-1000"
    >
      <div
        className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
          isSelected 
            ? "ring-4 ring-primary/50 border-primary shadow-xl scale-[1.02]" 
            : `${colorScheme.border} shadow-lg hover:shadow-xl ${colorScheme.shadow}`
        } bg-gradient-to-br ${colorScheme.bg}`}
        onClick={onSelect}
        data-testid={`broker-card-${broker.id}`}
      >
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center shadow-lg z-10"
            >
              <Check className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex flex-col items-center text-center space-y-3">
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.3 }}
          >
            <BrokerLogo broker={broker} size="xl" />
          </motion.div>
          
          <div>
            <h3 className={`font-bold text-base ${colorScheme.text}`}>
              {broker.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatNumber(broker.activeClients.total)} clients
            </p>
          </div>

          <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(broker.ratings.overall) ? "fill-current" : "opacity-30"}`} 
              />
            ))}
            <span className="text-xs font-semibold ml-1">{broker.ratings.overall}</span>
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className={`w-full py-2 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
              isSelected
                ? "bg-primary text-white shadow-md"
                : "bg-white/70 dark:bg-white/10 text-foreground hover:bg-white dark:hover:bg-white/20 border border-border"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
          </motion.button>
        </div>
        
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-2xl bg-primary/5 pointer-events-none"
          />
        )}
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
      className={`relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 w-full ${
        isSelected 
          ? "bg-primary/10 ring-2 ring-primary shadow-md" 
          : "bg-card hover-elevate border border-border"
      }`}
      whileHover={{ y: -2 }}
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
        <h3 className={`font-semibold text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>
          {broker.name}
        </h3>
        <p className="text-xs text-muted-foreground">
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
        data-testid={`broker-card-detail-${broker.id}`}
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
            className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold">Active Clients Comparison</h2>
            <p className="text-sm text-muted-foreground">Total client base and market share analysis</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {brokers.map((b) => {
            const badges = [];
            if (b.id === winnerId) badges.push({ label: "Most Popular", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" });
            if (b.id === growthWinner) badges.push({ label: "Fastest Growing", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" });
            return badges.map((badge, i) => (
              <Badge key={`${b.id}-${i}`} className={badge.color}>
                <BrokerLogo broker={b} size="sm" />
                <span className="ml-1">{badge.label}</span>
              </Badge>
            ));
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              Client Base Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={brokers.map((b, i) => ({ 
                  name: b.name, 
                  clients: b.activeClients.total / 1000000,
                  growth: parseFloat(b.activeClients.growth.replace('+', '').replace('%', ''))
                }))}>
                  <defs>
                    {brokers.map((b, i) => (
                      <linearGradient key={b.id} id={`gradient-${b.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={b.id === winnerId ? "#22c55e" : CHART_COLORS[i % CHART_COLORS.length]} stopOpacity={1} />
                        <stop offset="100%" stopColor={b.id === winnerId ? "#16a34a" : CHART_COLORS[i % CHART_COLORS.length]} stopOpacity={0.7} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} 
                    angle={-25} 
                    textAnchor="end" 
                    height={70}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} 
                    tickFormatter={(v) => `${v}M`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartsTooltip 
                    formatter={(value: number, name: string) => {
                      if (name === 'clients') return [`${value.toFixed(2)}M clients`, "Active Clients"];
                      return [`+${value}%`, "YoY Growth"];
                    }}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))", 
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
                    }}
                    cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                  />
                  <Bar dataKey="clients" radius={[8, 8, 0, 0]} animationDuration={1000} animationBegin={0}>
                    {brokers.map((b, i) => (
                      <Cell key={i} fill={`url(#gradient-${b.id})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-500" />
              Market Share
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    animationDuration={1000}
                    animationBegin={0}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number, name: string) => [formatNumber(value), name]}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))", 
                      borderRadius: "8px" 
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {brokers.slice(0, 4).map((b, i) => (
                <div key={b.id} className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i] }} />
                  <span className="text-muted-foreground">{b.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-semibold">Broker</th>
                  <th className="text-center p-4 font-semibold">Total Clients</th>
                  <th className="text-center p-4 font-semibold">Growth</th>
                  <th className="text-center p-4 font-semibold">Market Share</th>
                  <th className="text-center p-4 font-semibold">Rank</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map((b, index) => {
                  const isWinner = b.id === winnerId;
                  return (
                    <motion.tr 
                      key={b.id} 
                      className={`border-b transition-colors ${isWinner ? "bg-emerald-500/5" : "hover-elevate"}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <BrokerLogo broker={b} size="sm" />
                          <span className="font-medium">{b.name}</span>
                          {isWinner && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                              <Trophy className="w-4 h-4 text-amber-500" />
                            </motion.div>
                          )}
                        </div>
                      </td>
                      <td className={`p-4 text-center font-semibold ${isWinner ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                        {formatNumber(b.activeClients.total)}
                      </td>
                      <td className="p-4 text-center">
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {b.activeClients.growth}
                        </Badge>
                      </td>
                      <td className="p-4 text-center font-medium">{b.activeClients.marketShare}</td>
                      <td className="p-4 text-center">
                        <Badge variant="outline" className="font-bold">#{b.activeClients.rank}</Badge>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ChargesPanel({ brokers }: { brokers: BrokerData[] }) {
  const accountOpeningWinner = getLowestChargeWinner(brokers, b => b.charges.accountOpening);
  const amcWinner = getLowestChargeWinner(brokers, b => b.charges.maintenance);
  const deliveryWinner = getLowestChargeWinner(brokers, b => b.charges.equityDelivery);
  const intradayWinner = getLowestChargeWinner(brokers, b => b.charges.equityIntraday);
  const foWinner = getLowestChargeWinner(brokers, b => b.charges.futuresOptions);
  const dpWinner = getLowestChargeWinner(brokers, b => b.charges.dpCharges);

  const barChartData = brokers.map((b, i) => ({
    name: b.name,
    accountOpening: b.charges.accountOpening,
    amc: b.charges.maintenance,
    dpCharges: b.charges.dpCharges,
    color: CHART_COLORS[i % CHART_COLORS.length]
  }));

  const feeBreakdownData = [
    { name: "Account Opening", value: 25, fill: "#4A90E2" },
    { name: "AMC", value: 20, fill: "#4ECDC4" },
    { name: "DP Charges", value: 30, fill: "#FF7B7B" },
    { name: "Brokerage", value: 25, fill: "#9B59B6" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10"
            whileHover={{ scale: 1.05 }}
          >
            <IndianRupee className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold">Brokerage & Charges</h2>
            <p className="text-sm text-muted-foreground">Compare trading costs across brokers</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {deliveryWinner && (
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <Trophy className="w-3 h-3 mr-1" />
              {brokers.find(b => b.id === deliveryWinner)?.name} - Low Cost
            </Badge>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-500" />
              Fixed Charges Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <defs>
                    <linearGradient id="gradientAccount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4A90E2" stopOpacity={1} />
                      <stop offset="100%" stopColor="#4A90E2" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="gradientAmc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4ECDC4" stopOpacity={1} />
                      <stop offset="100%" stopColor="#4ECDC4" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="gradientDp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF7B7B" stopOpacity={1} />
                      <stop offset="100%" stopColor="#FF7B7B" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} 
                    angle={-25} 
                    textAnchor="end" 
                    height={70}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} 
                    tickFormatter={(v) => `₹${v}`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))", 
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
                    }}
                    formatter={(value: number, name: string) => {
                      const labels: Record<string, string> = {
                        accountOpening: "Account Opening",
                        amc: "AMC",
                        dpCharges: "DP Charges"
                      };
                      return [value === 0 ? "Free" : `₹${value}`, labels[name] || name];
                    }}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: "10px" }}
                    formatter={(value) => {
                      const labels: Record<string, string> = {
                        accountOpening: "Account Opening",
                        amc: "AMC",
                        dpCharges: "DP Charges"
                      };
                      return <span className="text-xs">{labels[value] || value}</span>;
                    }}
                  />
                  <Bar dataKey="accountOpening" fill="url(#gradientAccount)" radius={[4, 4, 0, 0]} animationDuration={800} />
                  <Bar dataKey="amc" fill="url(#gradientAmc)" radius={[4, 4, 0, 0]} animationDuration={800} animationBegin={200} />
                  <Bar dataKey="dpCharges" fill="url(#gradientDp)" radius={[4, 4, 0, 0]} animationDuration={800} animationBegin={400} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-500" />
              Typical Fee Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={feeBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {feeBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number) => [`${value}%`, "Share"]}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))", 
                      borderRadius: "8px" 
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1 mt-2">
              {feeBreakdownData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-semibold">Charge Type</th>
                  {brokers.map((b) => (
                    <th key={b.id} className="text-center p-4 font-semibold min-w-[100px]">
                      <div className="flex flex-col items-center gap-1">
                        <BrokerLogo broker={b} size="sm" />
                        <span className="text-xs">{b.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Account Opening", key: "accountOpening", winner: accountOpeningWinner, getValue: (b: BrokerData) => b.charges.accountOpening === 0 ? "Free" : formatCurrency(b.charges.accountOpening) },
                  { label: "AMC", key: "amc", winner: amcWinner, getValue: (b: BrokerData) => b.charges.maintenance === 0 ? "Free" : formatCurrency(b.charges.maintenance) },
                  { label: "Equity Delivery", key: "delivery", winner: deliveryWinner, getValue: (b: BrokerData) => b.charges.equityDelivery },
                  { label: "Equity Intraday", key: "intraday", winner: intradayWinner, getValue: (b: BrokerData) => b.charges.equityIntraday },
                  { label: "F&O", key: "fo", winner: foWinner, getValue: (b: BrokerData) => b.charges.futuresOptions },
                  { label: "DP Charges", key: "dp", winner: dpWinner, getValue: (b: BrokerData) => formatCurrency(b.charges.dpCharges) },
                ].map((row, rowIndex) => (
                  <motion.tr 
                    key={row.key} 
                    className="border-b"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: rowIndex * 0.05 }}
                  >
                    <td className="p-4 text-muted-foreground font-medium">{row.label}</td>
                    {brokers.map((b) => {
                      const isWinner = b.id === row.winner;
                      return (
                        <td key={b.id} className={`p-4 text-center font-medium ${isWinner ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                          <div className="flex items-center justify-center gap-1">
                            {row.getValue(b)}
                            {isWinner && <Trophy className="w-3 h-3 text-amber-500" />}
                          </div>
                        </td>
                      );
                    })}
                  </motion.tr>
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
  const winnerId = getWinnerForMetric(brokers, b => parseFloat(b.complaints.resolutionRate));
  const fastestResolver = getWinnerForMetric(brokers, b => -b.complaints.avgResolutionDays);
  
  const totalComplaints = brokers.reduce((sum, b) => sum + b.complaints.total, 0);
  const totalResolved = brokers.reduce((sum, b) => sum + b.complaints.resolved, 0);
  const totalPending = brokers.reduce((sum, b) => sum + b.complaints.pending, 0);

  const complaintStatusData = [
    { name: "Resolved", value: totalResolved, fill: "#22c55e" },
    { name: "Pending", value: totalPending, fill: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/10"
            whileHover={{ scale: 1.05 }}
          >
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold">Complaints Analysis</h2>
            <p className="text-sm text-muted-foreground">Resolution rates and customer grievances</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {winnerId && (
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <Shield className="w-3 h-3 mr-1" />
              {brokers.find(b => b.id === winnerId)?.name} - Best Resolution
            </Badge>
          )}
          {fastestResolver && fastestResolver !== winnerId && (
            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
              <Zap className="w-3 h-3 mr-1" />
              {brokers.find(b => b.id === fastestResolver)?.name} - Fastest
            </Badge>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              Resolution Rate Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={brokers.map((b, i) => ({ 
                  name: b.name, 
                  rate: parseFloat(b.complaints.resolutionRate),
                  days: b.complaints.avgResolutionDays 
                }))}>
                  <defs>
                    {brokers.map((b, i) => (
                      <linearGradient key={b.id} id={`complaint-gradient-${b.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={b.id === winnerId ? "#22c55e" : CHART_COLORS[i % CHART_COLORS.length]} stopOpacity={1} />
                        <stop offset="100%" stopColor={b.id === winnerId ? "#16a34a" : CHART_COLORS[i % CHART_COLORS.length]} stopOpacity={0.6} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} 
                    angle={-25} 
                    textAnchor="end" 
                    height={70}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    yAxisId="left"
                    domain={[90, 100]} 
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} 
                    tickFormatter={(v) => `${v}%`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    domain={[0, 30]} 
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} 
                    tickFormatter={(v) => `${v}d`}
                    axisLine={false}
                    tickLine={false}
                  />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))", 
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
                    }}
                    formatter={(value: number, name: string) => {
                      if (name === 'rate') return [`${value.toFixed(1)}%`, "Resolution Rate"];
                      return [`${value} days`, "Avg Resolution Time"];
                    }}
                  />
                  <Bar yAxisId="left" dataKey="rate" radius={[8, 8, 0, 0]} animationDuration={1000}>
                    {brokers.map((b, i) => (
                      <Cell key={i} fill={`url(#complaint-gradient-${b.id})`} />
                    ))}
                  </Bar>
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="days" 
                    stroke="#9B59B6" 
                    strokeWidth={3} 
                    dot={{ fill: "#9B59B6", r: 5 }}
                    animationDuration={1500}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-4 justify-center mt-2 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded bg-blue-500" />
                <span className="text-muted-foreground">Resolution Rate (%)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-muted-foreground">Avg Days to Resolve</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="w-4 h-4 text-red-500" />
              Overall Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={complaintStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1000}
                  >
                    {complaintStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number, name: string) => [value.toLocaleString(), name]}
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))", 
                      borderRadius: "8px" 
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span>Resolved</span>
                </div>
                <span className="font-bold text-emerald-600">{totalResolved.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span>Pending</span>
                </div>
                <span className="font-bold text-red-600">{totalPending.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Complaints</span>
                  <span className="font-bold">{totalComplaints.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-semibold">Broker</th>
                  <th className="text-center p-4 font-semibold">Total</th>
                  <th className="text-center p-4 font-semibold">Resolved</th>
                  <th className="text-center p-4 font-semibold">Pending</th>
                  <th className="text-center p-4 font-semibold">Resolution Rate</th>
                  <th className="text-center p-4 font-semibold">Avg Days</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map((b, index) => {
                  const isWinner = b.id === winnerId;
                  const isFastest = b.id === fastestResolver;
                  return (
                    <motion.tr 
                      key={b.id} 
                      className={`border-b transition-colors ${isWinner ? "bg-emerald-500/5" : ""}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <BrokerLogo broker={b} size="sm" />
                          <span className="font-medium">{b.name}</span>
                          {isWinner && <Shield className="w-4 h-4 text-emerald-500" />}
                          {isFastest && !isWinner && <Zap className="w-4 h-4 text-blue-500" />}
                        </div>
                      </td>
                      <td className="p-4 text-center">{b.complaints.total.toLocaleString()}</td>
                      <td className="p-4 text-center text-emerald-600 dark:text-emerald-400 font-medium">{b.complaints.resolved.toLocaleString()}</td>
                      <td className="p-4 text-center text-red-600 dark:text-red-400">{b.complaints.pending}</td>
                      <td className={`p-4 text-center font-semibold ${isWinner ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                        <Badge className={isWinner ? "bg-emerald-500/10 text-emerald-600" : "bg-muted"}>
                          {b.complaints.resolutionRate}
                        </Badge>
                      </td>
                      <td className={`p-4 text-center ${isFastest ? "text-blue-600 dark:text-blue-400 font-medium" : ""}`}>
                        {b.complaints.avgResolutionDays} days
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
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
  const parseFinancialValue = (value: string): number => {
    const num = parseFloat(value.replace(/[₹,]/g, ''));
    if (value.includes('Cr')) return num;
    return num;
  };

  const barChartData = brokers.map((b, i) => ({
    name: b.name,
    revenue: parseFinancialValue(b.financials.revenue),
    profit: parseFinancialValue(b.financials.profit),
    netWorth: parseFinancialValue(b.financials.netWorth),
  }));

  const highestRevenue = brokers.reduce((max, b) => 
    parseFinancialValue(b.financials.revenue) > parseFinancialValue(max.financials.revenue) ? b : max
  );
  const highestProfit = brokers.reduce((max, b) => 
    parseFinancialValue(b.financials.profit) > parseFinancialValue(max.financials.profit) ? b : max
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/10"
            whileHover={{ scale: 1.05 }}
          >
            <BarChart3 className="w-5 h-5 text-green-600 dark:text-green-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold">Financial Performance</h2>
            <p className="text-sm text-muted-foreground">Revenue, profit, and net worth comparison</p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
            <TrendingUp className="w-3 h-3 mr-1" />
            {highestRevenue.name} - Top Revenue
          </Badge>
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
            <IndianRupee className="w-3 h-3 mr-1" />
            {highestProfit.name} - Top Profit
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-green-500" />
            Revenue & Profit Comparison (in Crores)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <defs>
                  <linearGradient id="gradientRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A90E2" stopOpacity={1} />
                    <stop offset="100%" stopColor="#4A90E2" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="gradientProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={1} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-20" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} 
                  angle={-25} 
                  textAnchor="end" 
                  height={70}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} 
                  tickFormatter={(v) => `₹${v}Cr`}
                  axisLine={false}
                  tickLine={false}
                />
                <RechartsTooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))", 
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
                  }}
                  formatter={(value: number, name: string) => [`₹${value} Cr`, name === 'revenue' ? 'Revenue' : 'Profit']}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: "10px" }}
                  formatter={(value) => <span className="text-xs">{value === 'revenue' ? 'Revenue' : 'Profit'}</span>}
                />
                <Bar dataKey="revenue" fill="url(#gradientRevenue)" radius={[4, 4, 0, 0]} animationDuration={800} />
                <Bar dataKey="profit" fill="url(#gradientProfit)" radius={[4, 4, 0, 0]} animationDuration={800} animationBegin={300} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-semibold">Broker</th>
                  <th className="text-center p-4 font-semibold">Revenue</th>
                  <th className="text-center p-4 font-semibold">Profit</th>
                  <th className="text-center p-4 font-semibold">Net Worth</th>
                  <th className="text-center p-4 font-semibold">FY</th>
                </tr>
              </thead>
              <tbody>
                {brokers.map((b, index) => {
                  const isTopRevenue = b.id === highestRevenue.id;
                  const isTopProfit = b.id === highestProfit.id;
                  return (
                    <motion.tr 
                      key={b.id} 
                      className={`border-b transition-colors ${isTopRevenue || isTopProfit ? "bg-emerald-500/5" : ""}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <BrokerLogo broker={b} size="sm" />
                          <span className="font-medium">{b.name}</span>
                          {isTopRevenue && <Trophy className="w-4 h-4 text-amber-500" />}
                        </div>
                      </td>
                      <td className={`p-4 text-center font-medium ${isTopRevenue ? "text-blue-600 dark:text-blue-400" : ""}`}>
                        {b.financials.revenue}
                      </td>
                      <td className={`p-4 text-center font-medium ${isTopProfit ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                        {b.financials.profit}
                      </td>
                      <td className="p-4 text-center">{b.financials.netWorth}</td>
                      <td className="p-4 text-center">
                        <Badge variant="outline">{b.financials.fy}</Badge>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RatingsPanel({ brokers }: { brokers: BrokerData[] }) {
  const winnerId = getWinnerForMetric(brokers, b => b.ratings.overall);
  const sortedBrokers = [...brokers]
    .map(b => ({ broker: b, score: calculateOverallScore(b) }))
    .sort((a, b) => b.score - a.score);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-2 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold">Ratings Comparison</h2>
            <p className="text-sm text-muted-foreground">Overall and category-wise ratings</p>
          </div>
        </div>
        {sortedBrokers.length > 0 && (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
            <Trophy className="w-3 h-3 mr-1" />
            {sortedBrokers[0].broker.name} - Top Rated
          </Badge>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              Multi-Dimensional Rating Comparison
            </CardTitle>
          </CardHeader>
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
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }} 
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 5]} 
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} 
                  />
                  <RechartsTooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))", 
                      borderRadius: "12px",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
                    }}
                  />
                  {brokers.map((broker, i) => (
                    <Radar
                      key={broker.id}
                      name={broker.name}
                      dataKey={broker.name}
                      stroke={CHART_COLORS[i % CHART_COLORS.length]}
                      fill={CHART_COLORS[i % CHART_COLORS.length]}
                      fillOpacity={0.25}
                      strokeWidth={2}
                      animationDuration={1000}
                      animationBegin={i * 200}
                    />
                  ))}
                  <Legend 
                    wrapperStyle={{ paddingTop: "10px" }}
                    formatter={(value) => <span className="text-xs">{value}</span>}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {sortedBrokers.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.broker.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={index === 0 ? "border-amber-500/30 bg-amber-500/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      index === 0 ? "bg-gradient-to-br from-amber-400 to-amber-600" : 
                      index === 1 ? "bg-gradient-to-br from-slate-300 to-slate-500" : 
                      "bg-gradient-to-br from-amber-600 to-amber-800"
                    }`}>
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <BrokerLogo broker={item.broker} size="sm" />
                        <span className="font-semibold">{item.broker.name}</span>
                      </div>
                    </div>
                    {index === 0 && <Trophy className="w-5 h-5 text-amber-500" />}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Overall Score</span>
                    <span className="text-2xl font-bold">{item.score}</span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                  <div className="grid grid-cols-5 gap-1 mt-3">
                    {[
                      { label: "Trade", value: item.broker.ratings.trading },
                      { label: "Research", value: item.broker.ratings.research },
                      { label: "Support", value: item.broker.ratings.support },
                      { label: "Platform", value: item.broker.ratings.platform },
                      { label: "Price", value: item.broker.ratings.pricing },
                    ].map(rating => (
                      <div key={rating.label} className="text-center">
                        <div className="text-xs text-muted-foreground">{rating.label}</div>
                        <div className="text-sm font-semibold">{rating.value}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            Complete Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sortedBrokers.map((item, index) => (
              <motion.div 
                key={item.broker.id} 
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${index < 3 ? "bg-amber-500/5" : "hover-elevate"}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? "bg-gradient-to-br from-amber-400 to-amber-600" : 
                  index === 1 ? "bg-gradient-to-br from-slate-300 to-slate-500" : 
                  index === 2 ? "bg-gradient-to-br from-amber-600 to-amber-800" : 
                  "bg-muted text-muted-foreground"
                }`}>
                  {index + 1}
                </div>
                <BrokerLogo broker={item.broker} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{item.broker.name}</span>
                    <span className="font-bold text-lg">{item.score}</span>
                  </div>
                  <Progress value={item.score} className="h-2" />
                </div>
                {index === 0 && (
                  <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                    <Trophy className="w-3 h-3 mr-1" />
                    Winner
                  </Badge>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function BrokerComparison() {
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
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

  const handleCompareNow = () => {
    setShowComparison(true);
  };

  const handleBackToSelection = () => {
    setShowComparison(false);
  };

  if (showComparison && selectedBrokers.length >= 2) {
    return (
      <div className="min-h-screen pt-28 pb-12">
        <section className="relative py-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FDF6F0] via-[#FFEEE4] to-[#FFF5EE] dark:from-background dark:via-background dark:to-background" />
          
          <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
            <FadeInUp className="flex items-center justify-between gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#4ECDC4] text-white flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <Scale className="w-7 h-7" />
                </motion.div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-foreground">Broker Comparison</h1>
                  <p className="text-slate-600 dark:text-muted-foreground">Comparing {selectedBrokerData.map(b => b.name).join(", ")}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleBackToSelection}
                className="gap-2"
                data-testid="button-back-to-selection"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Change Brokers
              </Button>
            </FadeInUp>

            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-sm text-muted-foreground">Comparing:</span>
              {selectedBrokerData.map((b) => (
                <Badge key={b.id} variant="secondary" className="gap-1">
                  <BrokerLogo broker={b} size="sm" />
                  {b.name}
                  <button 
                    onClick={() => toggleBroker(b.id)}
                    className="ml-1 hover:text-destructive"
                    data-testid={`button-remove-broker-${b.id}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="py-6 bg-white/50 dark:bg-background">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <FadeInUp delay={0.2}>
              <div className="flex gap-6">
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

                <div className="hidden lg:block w-64 flex-shrink-0">
                  <div className="sticky top-32 z-40">
                    <Card>
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
                  </div>
                </div>

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
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-12">
      <section className="relative py-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF6F0] via-[#FFEEE4] to-[#FFF5EE] dark:from-background dark:via-background dark:to-background" />
        <motion.div
          className="absolute top-10 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-20 w-48 h-48 bg-purple-400/10 rounded-full blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <FadeInUp className="text-center mb-10">
            <motion.div 
              className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#4ECDC4] text-white flex items-center justify-center shadow-xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Scale className="w-10 h-10" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-foreground mb-2">
              Compare India's Best Stock Brokers
            </h1>
            <p className="text-lg text-slate-600 dark:text-muted-foreground max-w-2xl mx-auto">
              Select brokers to compare their features, charges, ratings and more. Choose 2-4 brokers from our curated list.
            </p>
          </FadeInUp>

          <AnimatePresence>
            {selectedBrokers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <Card className="bg-white/90 dark:bg-card/90 backdrop-blur-sm border-primary/20 shadow-lg">
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge variant="outline" className="text-base px-3 py-1">
                          {selectedBrokers.length} Selected
                        </Badge>
                        <div className="flex gap-2 flex-wrap">
                          {selectedBrokerData.map((b) => (
                            <motion.div
                              key={b.id}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                            >
                              <Badge variant="secondary" className="gap-2 py-1 px-2">
                                <BrokerLogo broker={b} size="sm" />
                                <span>{b.name}</span>
                                <button 
                                  onClick={() => toggleBroker(b.id)}
                                  className="ml-1 hover:text-destructive transition-colors"
                                  data-testid={`button-remove-broker-${b.id}`}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {selectedBrokers.length >= 2 && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          <Button 
                            onClick={handleCompareNow}
                            className="gap-2 bg-gradient-to-r from-[#4A90E2] to-[#4ECDC4] hover:from-[#3A80D2] hover:to-[#3EBDB4] text-white shadow-lg"
                            data-testid="button-compare-now"
                          >
                            <Scale className="w-4 h-4" />
                            Compare Now
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      )}
                    </div>
                    
                    {selectedBrokers.length === 1 && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Select at least one more broker to start comparing
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <FadeInUp delay={0.1}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-700 dark:text-foreground mb-2">
                Click on brokers to add to comparison
              </h2>
              <p className="text-sm text-muted-foreground">
                Each card is interactive - hover for premium animations, click "Add to Compare" button
              </p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {brokerData.map((broker, index) => (
              <VarsityBrokerCard
                key={broker.id}
                broker={broker}
                index={index}
                isSelected={selectedBrokers.includes(broker.id)}
                onSelect={() => toggleBroker(broker.id)}
              />
            ))}
          </div>

          {selectedBrokers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 text-center"
            >
              <Card className="bg-white/60 dark:bg-card/60 backdrop-blur-sm inline-block">
                <CardContent className="py-6 px-8">
                  <Scale className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
                  <p className="text-muted-foreground">
                    Click "Add to Compare" on any broker card to start
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
