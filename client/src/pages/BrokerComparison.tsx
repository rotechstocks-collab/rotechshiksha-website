import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
  ArrowRight,
  Scale,
  Building2,
  Globe,
  Calendar,
  TrendingUp,
  Shield,
  Smartphone,
  Zap,
  Trophy,
  Target,
  Wallet,
  Award,
  Info,
} from "lucide-react";
import { brokerData, type BrokerData, formatNumber, formatCurrency } from "@/data/brokerData";
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";

const CHART_COLORS = [
  "#4A90E2", "#4ECDC4", "#FF7B7B", "#9B59B6", "#F39C12", "#1ABC9C", "#E74C3C", "#3498DB"
];

const comparisonTabs = [
  { id: "overview", label: "Overview", icon: Building2 },
  { id: "charts", label: "Visual Charts", icon: BarChart3 },
  { id: "clients", label: "Active Clients", icon: Users },
  { id: "charges", label: "Charges", icon: IndianRupee },
  { id: "complaints", label: "Complaints", icon: AlertTriangle },
  { id: "holdings", label: "Share Holding", icon: PieChart },
  { id: "proscons", label: "Pros & Cons", icon: ThumbsUp },
  { id: "financials", label: "Financials", icon: BarChart3 },
  { id: "ratings", label: "Ratings", icon: Star },
  { id: "features", label: "Features", icon: Zap },
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
  score += broker.ratings.overall * 10;
  score += Math.min(broker.activeClients.total / 1000000, 10) * 5;
  const resolutionRate = parseFloat(broker.complaints.resolutionRate);
  score += resolutionRate / 10;
  if (broker.charges.accountOpening === 0) score += 5;
  if (broker.charges.equityDelivery === "Free") score += 5;
  const featureCount = Object.values(broker.features).filter(Boolean).length;
  score += featureCount * 2;
  return Math.round(score);
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
    md: "w-12 h-12 text-lg",
    lg: "w-16 h-16 text-xl"
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
    <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br ${colors[broker.id] || "from-gray-500 to-gray-700"} text-white flex items-center justify-center font-bold shadow-lg`}>
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
      initial={{ opacity: 0, scale: 0.9 }}
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
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <BrokerLogo broker={broker} size="md" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">{broker.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{broker.tagline}</p>
            </div>
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center"
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Best For Tag */}
          <div className="mt-3">
            <Badge className={`text-xs ${bestFor.color}`}>
              <BestForIcon className="w-3 h-3 mr-1" />
              {bestFor.tag}
            </Badge>
          </div>
          
          {/* Score and Stats */}
          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 rounded-md">
                <Award className="w-3 h-3 text-amber-500" />
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{score}</span>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatNumber(broker.activeClients.total)} clients
              </span>
            </div>
            <Badge variant="outline" className="text-xs">
              #{broker.activeClients.rank}
            </Badge>
          </div>
          
          {/* Rating Stars */}
          <div className="mt-2 flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-3 h-3 ${i < Math.floor(broker.ratings.overall) ? "text-amber-400 fill-amber-400" : "text-muted"}`}
              />
            ))}
            <span className="ml-1 text-xs font-medium">{broker.ratings.overall}</span>
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
    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
      <Check className="w-4 h-4" />
    </div>
  ) : (
    <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center">
      <X className="w-4 h-4" />
    </div>
  );
}

function ComparisonTable({ brokers }: { brokers: BrokerData[] }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-2 rounded-xl">
          {comparisonTabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="flex items-center gap-1.5 text-xs sm:text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm px-2 py-1.5 sm:px-3 sm:py-2"
              data-testid={`tab-${tab.id}`}
            >
              <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${brokers.length}, minmax(200px, 1fr))` }}>
                {brokers.map((broker) => (
                  <Card key={broker.id} className="overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 border-b">
                      <div className="flex items-center gap-3">
                        <BrokerLogo broker={broker} size="lg" />
                        <div>
                          <h3 className="font-bold text-lg">{broker.name}</h3>
                          <p className="text-sm text-muted-foreground">{broker.tagline}</p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Est. {broker.established}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span>{broker.headquarters}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span>{broker.website}</span>
                      </div>
                      <div className="pt-2">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < Math.floor(broker.ratings.overall) ? "text-amber-400 fill-amber-400" : "text-muted"}`}
                            />
                          ))}
                          <span className="ml-1 font-semibold">{broker.ratings.overall}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="charts" className="mt-6">
              <div className="space-y-8">
                {/* Active Clients Bar Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Active Clients Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={brokers.map((b, i) => ({ name: b.name, clients: b.activeClients.total / 1000000, color: CHART_COLORS[i % CHART_COLORS.length] }))}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}M`} />
                          <RechartsTooltip 
                            formatter={(value: number) => [`${value.toFixed(2)}M clients`, "Active Clients"]}
                            contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                          />
                          <Bar dataKey="clients" radius={[4, 4, 0, 0]}>
                            {brokers.map((_, i) => (
                              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Ratings Radar Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500" />
                      Ratings Comparison (Radar View)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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

                {/* Complaints Resolution Rate */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="w-5 h-5 text-emerald-500" />
                      Complaints Resolution Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={brokers.map((b, i) => ({ name: b.name, rate: parseFloat(b.complaints.resolutionRate), color: CHART_COLORS[i % CHART_COLORS.length] }))}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} />
                          <RechartsTooltip 
                            formatter={(value: number) => [`${value.toFixed(1)}%`, "Resolution Rate"]}
                            contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
                          />
                          <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                            {brokers.map((_, i) => (
                              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Overall Score */}
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
                        .map((b, i) => ({ broker: b, score: calculateOverallScore(b), color: CHART_COLORS[i % CHART_COLORS.length] }))
                        .sort((a, b) => b.score - a.score)
                        .map((item, index) => (
                          <div key={item.broker.id} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${index === 0 ? "bg-amber-500" : index === 1 ? "bg-slate-400" : index === 2 ? "bg-amber-700" : "bg-muted"}`}>
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{item.broker.name}</span>
                                <span className="font-bold">{item.score}</span>
                              </div>
                              <Progress value={(item.score / 100) * 100} className="h-2" style={{ "--progress-color": item.color } as React.CSSProperties} />
                            </div>
                            {index === 0 && <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Winner</Badge>}
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="clients" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Metric</th>
                      {brokers.map((b) => {
                        const isWinner = b.id === getWinnerForMetric(brokers, br => br.activeClients.total);
                        return (
                          <th key={b.id} className="text-center p-3 font-semibold">
                            <div className="flex items-center justify-center gap-1">
                              {b.name}
                              {isWinner && <Trophy className="w-4 h-4 text-amber-500" />}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Total Clients</td>
                      {brokers.map((b) => {
                        const isWinner = b.id === getWinnerForMetric(brokers, br => br.activeClients.total);
                        return (
                          <td key={b.id} className={`p-3 text-center font-semibold ${isWinner ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
                            {formatNumber(b.activeClients.total)}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Growth</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center">
                          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                            {b.activeClients.growth}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Market Share</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-medium">{b.activeClients.marketShare}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-muted-foreground">Rank</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center">
                          <Badge variant="outline">#{b.activeClients.rank}</Badge>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="charges" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Charge Type</th>
                      {brokers.map((b) => (
                        <th key={b.id} className="text-center p-3 font-semibold">{b.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Account Opening</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-semibold">
                          {b.charges.accountOpening === 0 ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600">Free</Badge>
                          ) : formatCurrency(b.charges.accountOpening)}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">AMC / Maintenance</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-semibold">
                          {b.charges.maintenance === 0 ? (
                            <Badge className="bg-emerald-500/10 text-emerald-600">Free</Badge>
                          ) : formatCurrency(b.charges.maintenance)}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Equity Delivery</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center text-sm">{b.charges.equityDelivery}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Equity Intraday</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center text-sm">{b.charges.equityIntraday}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">F&O</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center text-sm">{b.charges.futuresOptions}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-muted-foreground">DP Charges</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-semibold">{formatCurrency(b.charges.dpCharges)}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="complaints" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Metric</th>
                      {brokers.map((b) => (
                        <th key={b.id} className="text-center p-3 font-semibold">{b.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Total Complaints</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-semibold">{b.complaints.total.toLocaleString()}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Resolved</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center text-emerald-600 dark:text-emerald-400 font-medium">
                          {b.complaints.resolved.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Pending</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center text-amber-600 dark:text-amber-400 font-medium">
                          {b.complaints.pending}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Resolution Rate</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center">
                          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                            {b.complaints.resolutionRate}
                          </Badge>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-muted-foreground">Avg Resolution (days)</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-semibold">{b.complaints.avgResolutionDays}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="holdings" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Metric</th>
                      {brokers.map((b) => (
                        <th key={b.id} className="text-center p-3 font-semibold">{b.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">NSDL Accounts</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-semibold">{formatNumber(b.shareHolding.nsdl)}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">CDSL Accounts</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-semibold">{formatNumber(b.shareHolding.cdsl)}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Total Demat</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-bold text-primary">{formatNumber(b.shareHolding.total)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-muted-foreground">Avg Holding Value</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-semibold">{formatCurrency(b.shareHolding.avgHoldingValue)}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="proscons" className="mt-6">
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${brokers.length}, minmax(250px, 1fr))` }}>
                {brokers.map((broker) => (
                  <Card key={broker.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <BrokerLogo broker={broker} size="sm" />
                        <CardTitle className="text-lg">{broker.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" /> Pros
                        </h4>
                        <ul className="space-y-1.5">
                          {broker.prosAndCons.pros.map((pro, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                              <span className="text-muted-foreground">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-1">
                          <AlertTriangle className="w-4 h-4" /> Cons
                        </h4>
                        <ul className="space-y-1.5">
                          {broker.prosAndCons.cons.map((con, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                              <span className="text-muted-foreground">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="financials" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Metric</th>
                      {brokers.map((b) => (
                        <th key={b.id} className="text-center p-3 font-semibold">{b.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Revenue</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-semibold">{b.financials.revenue}</td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Profit</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                          {b.financials.profit}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-3 text-muted-foreground">Net Worth</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center font-semibold">{b.financials.netWorth}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-muted-foreground">Financial Year</td>
                      {brokers.map((b) => (
                        <td key={b.id} className="p-3 text-center">
                          <Badge variant="outline">{b.financials.fy}</Badge>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="ratings" className="mt-6">
              <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${brokers.length}, minmax(220px, 1fr))` }}>
                {brokers.map((broker) => (
                  <Card key={broker.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <BrokerLogo broker={broker} size="sm" />
                          <CardTitle className="text-base">{broker.name}</CardTitle>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                          <span className="font-bold text-lg">{broker.ratings.overall}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <RatingBar label="Trading" value={broker.ratings.trading} />
                      <RatingBar label="Research" value={broker.ratings.research} />
                      <RatingBar label="Support" value={broker.ratings.support} />
                      <RatingBar label="Platform" value={broker.ratings.platform} />
                      <RatingBar label="Pricing" value={broker.ratings.pricing} />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Feature</th>
                      {brokers.map((b) => (
                        <th key={b.id} className="text-center p-3 font-semibold">{b.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: "mobileApp", label: "Mobile App" },
                      { key: "webPlatform", label: "Web Platform" },
                      { key: "apiAccess", label: "API Access" },
                      { key: "research", label: "Research Reports" },
                      { key: "ipo", label: "IPO Access" },
                      { key: "mutualFunds", label: "Mutual Funds" },
                      { key: "bonds", label: "Bonds" },
                      { key: "insurance", label: "Insurance" },
                      { key: "nri", label: "NRI Services" },
                      { key: "margin", label: "Margin Trading" },
                    ].map((feature) => (
                      <tr key={feature.key} className="border-b">
                        <td className="p-3 text-muted-foreground">{feature.label}</td>
                        {brokers.map((b) => (
                          <td key={b.id} className="p-3 text-center">
                            <div className="flex justify-center">
                              <FeatureCheck hasFeature={b.features[feature.key as keyof typeof b.features]} />
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}

export default function BrokerComparison() {
  const [selectedBrokers, setSelectedBrokers] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const toggleBroker = (id: string) => {
    setSelectedBrokers((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleCompare = () => {
    if (selectedBrokers.length >= 2) {
      setShowComparison(true);
    }
  };

  const handleReset = () => {
    setSelectedBrokers([]);
    setShowComparison(false);
  };

  const selectedBrokerData = brokerData.filter((b) => selectedBrokers.includes(b.id));

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <FadeInUp className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#4ECDC4] text-white flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Scale className="w-7 h-7" />
            </motion.div>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Broker Comparison Tool
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare India's top stockbrokers side-by-side. Analyze charges, features, ratings, and more to find the perfect broker for your trading needs.
          </p>
        </FadeInUp>

        <AnimatePresence mode="wait">
          {!showComparison ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="mb-6 p-4 bg-primary/5 border-primary/20">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="text-sm">
                      Select <strong>2 or more brokers</strong> to compare ({selectedBrokers.length} selected)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {selectedBrokers.length > 0 && (
                      <Button variant="outline" size="sm" onClick={handleReset} data-testid="button-reset-selection">
                        Clear Selection
                      </Button>
                    )}
                    <Button
                      size="sm"
                      disabled={selectedBrokers.length < 2}
                      onClick={handleCompare}
                      className="gap-1"
                      data-testid="button-compare-brokers"
                    >
                      Compare Now
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {brokerData.map((broker) => (
                  <BrokerCard
                    key={broker.id}
                    broker={broker}
                    isSelected={selectedBrokers.includes(broker.id)}
                    onSelect={() => toggleBroker(broker.id)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="mb-6 p-4 bg-muted/50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">Comparing:</span>
                    {selectedBrokerData.map((broker) => (
                      <Badge key={broker.id} variant="secondary" className="gap-1">
                        {broker.name}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" onClick={handleReset} data-testid="button-new-comparison">
                    New Comparison
                  </Button>
                </div>
              </Card>

              <ComparisonTable brokers={selectedBrokerData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
