import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Calendar,
  TrendingUp,
  IndianRupee,
  ArrowRight,
  Info,
  Users,
  Briefcase,
  ChevronLeft,
  CalendarDays,
  Landmark,
  BarChart3,
  AlertCircle,
  RefreshCw,
  CheckCircle,
  Clock,
  ExternalLink,
  Building2,
  FileText,
  Target,
  CircleDot,
  ArrowUpRight,
  ArrowDownRight,
  Banknote,
  PieChart,
  Timer,
  Bell,
  BellRing,
  List,
  CalendarCheck,
  Lightbulb,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useIPOList, useIPONews, formatCurrency, formatDate, getDaysRemaining, getTimeAgo, type IPOData } from "@/lib/ipoApi";
import { RocketGrowth, GrowthChart, CoinStack } from "@/components/Illustrations";
import { GrowthArrowIllustration, StockBasket } from "@/components/SmallcaseIllustrations";
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";

const statusColors = {
  upcoming: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  ongoing: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  closed: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  listed: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
};

const statusLabels = {
  upcoming: "Upcoming",
  ongoing: "Open Now",
  closed: "Closed",
  listed: "Listed"
};

const riskColors = {
  low: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  high: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
};

const riskLabels = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk"
};

function generateAISummary(ipo: IPOData): { summary: string; riskLevel: "low" | "medium" | "high"; explanation: string } {
  const industry = ipo.industry?.toLowerCase() || "";
  const subscriptionTotal = ipo.subscriptionStatus?.total || 0;
  const gmp = ipo.gmp || 0;
  const issueSize = ipo.issueSize || 0;
  
  let riskLevel: "low" | "medium" | "high" = "medium";
  let summary = "";
  let explanation = "";

  if (industry.includes("tech") || industry.includes("it") || industry.includes("software")) {
    summary = `${ipo.companyName} is a technology company planning to raise capital through its IPO.`;
    explanation = "Tech companies often have high growth potential but can be volatile. Good for investors who understand the sector.";
  } else if (industry.includes("bank") || industry.includes("financ") || industry.includes("nbfc")) {
    summary = `${ipo.companyName} operates in the financial services sector, seeking public funding.`;
    explanation = "Financial companies are generally stable but sensitive to economic cycles and interest rates.";
  } else if (industry.includes("pharma") || industry.includes("health") || industry.includes("hospital")) {
    summary = `${ipo.companyName} is a healthcare/pharma company entering the public market.`;
    explanation = "Healthcare sector is defensive and less affected by economic downturns. Good for long-term investors.";
  } else if (industry.includes("energy") || industry.includes("power") || industry.includes("renewable")) {
    summary = `${ipo.companyName} operates in the energy sector with growth opportunities.`;
    explanation = "Energy companies benefit from government initiatives. Consider long-term investment potential.";
  } else if (industry.includes("retail") || industry.includes("consumer") || industry.includes("fmcg")) {
    summary = `${ipo.companyName} is a consumer-focused company with market presence.`;
    explanation = "Consumer companies tend to be stable. Performance depends on brand strength and market share.";
  } else {
    summary = `${ipo.companyName} is raising capital to expand its business operations.`;
    explanation = "Research the company's financials and growth prospects before investing.";
  }

  if (subscriptionTotal > 10) {
    riskLevel = "low";
    explanation += " High subscription indicates strong investor interest.";
  } else if (subscriptionTotal < 1 && ipo.status !== "upcoming") {
    riskLevel = "high";
    explanation += " Lower subscription may indicate limited investor confidence.";
  }

  if (gmp > 50) {
    riskLevel = riskLevel === "high" ? "medium" : "low";
  } else if (gmp < 0) {
    riskLevel = "high";
  }

  if (issueSize > 5000) {
    explanation += " Large issue size - suitable for institutional and retail investors.";
  } else if (issueSize < 500) {
    explanation += " Small issue size - may have limited liquidity post-listing.";
  }

  return { summary, riskLevel, explanation };
}

interface IPOAlertData {
  open: boolean;
  close: boolean;
  openDate?: string;
  closeDate?: string;
  companyName?: string;
  notifiedOpen?: boolean;
  notifiedClose?: boolean;
}

function useIPOAlerts() {
  const [alerts, setAlerts] = useState<{ [ipoId: string]: IPOAlertData }>(() => {
    const saved = localStorage.getItem("ipoAlerts");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("ipoAlerts", JSON.stringify(alerts));
  }, [alerts]);

  const setAlert = (ipoId: string, type: "open" | "close", ipo?: IPOData) => {
    setAlerts(prev => ({
      ...prev,
      [ipoId]: {
        ...prev[ipoId],
        [type]: true,
        openDate: ipo?.openDate || prev[ipoId]?.openDate,
        closeDate: ipo?.closeDate || prev[ipoId]?.closeDate,
        companyName: ipo?.companyName || prev[ipoId]?.companyName,
      }
    }));
  };

  const removeAlert = (ipoId: string, type: "open" | "close") => {
    setAlerts(prev => ({
      ...prev,
      [ipoId]: {
        ...prev[ipoId],
        [type]: false
      }
    }));
  };

  const hasAlert = (ipoId: string, type: "open" | "close") => {
    return alerts[ipoId]?.[type] || false;
  };

  const markNotified = (ipoId: string, type: "open" | "close") => {
    setAlerts(prev => ({
      ...prev,
      [ipoId]: {
        ...prev[ipoId],
        [type === "open" ? "notifiedOpen" : "notifiedClose"]: true
      }
    }));
  };

  const getPendingNotifications = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const notifications: Array<{ ipoId: string; type: "open" | "close"; companyName: string; date: string }> = [];

    Object.entries(alerts).forEach(([ipoId, alert]) => {
      if (alert.open && alert.openDate && !alert.notifiedOpen) {
        const openDate = new Date(alert.openDate);
        openDate.setHours(0, 0, 0, 0);
        const daysBefore = Math.ceil((openDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (daysBefore <= 1 && daysBefore >= 0) {
          notifications.push({
            ipoId,
            type: "open",
            companyName: alert.companyName || "IPO",
            date: alert.openDate
          });
        }
      }
      if (alert.close && alert.closeDate && !alert.notifiedClose) {
        const closeDate = new Date(alert.closeDate);
        closeDate.setHours(0, 0, 0, 0);
        const daysBefore = Math.ceil((closeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        if (daysBefore <= 1 && daysBefore >= 0) {
          notifications.push({
            ipoId,
            type: "close",
            companyName: alert.companyName || "IPO",
            date: alert.closeDate
          });
        }
      }
    });

    return notifications;
  };

  return { alerts, setAlert, removeAlert, hasAlert, markNotified, getPendingNotifications };
}

function IPOCalendarView({ ipos }: { ipos: IPOData[] }) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getIPOsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return ipos.filter(ipo => 
      ipo.openDate === dateStr || 
      ipo.closeDate === dateStr || 
      ipo.listingDate === dateStr
    );
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString("en-IN", { month: "long", year: "numeric" });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-primary" />
          IPO Calendar - {monthName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }
            const dayIPOs = getIPOsForDate(day);
            const isToday = day === today.getDate();
            
            return (
              <div 
                key={day} 
                className={`aspect-square p-1 rounded-md border text-center text-sm relative ${
                  isToday ? "bg-primary/10 border-primary" : "border-border"
                } ${dayIPOs.length > 0 ? "bg-muted/50" : ""}`}
              >
                <span className={isToday ? "font-bold text-primary" : "text-foreground"}>{day}</span>
                {dayIPOs.length > 0 && (
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-0.5">
                    {dayIPOs.slice(0, 3).map((ipo, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full ${
                          ipo.openDate.endsWith(`-${String(day).padStart(2, '0')}`) ? "bg-emerald-500" :
                          ipo.closeDate.endsWith(`-${String(day).padStart(2, '0')}`) ? "bg-amber-500" :
                          "bg-blue-500"
                        }`}
                        title={ipo.companyName}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>IPO Opens</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span>IPO Closes</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Listing Date</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function IPOPerformanceTracker({ ipos }: { ipos: IPOData[] }) {
  const listedIPOs = ipos.filter(ipo => ipo.status === "listed" || ipo.status === "closed");
  
  const performanceData = listedIPOs.map(ipo => {
    const issuePrice = ipo.issuePrice.max;
    const listingPrice = ipo.listingPrice || (issuePrice + (ipo.gmp || 0));
    const gainPercent = ipo.listingGainPercent || ((listingPrice - issuePrice) / issuePrice * 100);
    return { ...ipo, listingPrice, gainPercent };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          IPO Performance Tracker
        </CardTitle>
        <CardDescription>Listing performance of recently closed IPOs</CardDescription>
      </CardHeader>
      <CardContent>
        {performanceData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No closed IPOs to show performance data</p>
          </div>
        ) : (
          <div className="space-y-4">
            {performanceData.slice(0, 5).map((ipo) => (
              <div key={ipo.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold">
                    {ipo.companyName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{ipo.companyName}</p>
                    <p className="text-xs text-muted-foreground">
                      Issue: Rs {ipo.issuePrice.max} | Listed: Rs {ipo.listingPrice.toFixed(0)}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 font-semibold ${
                  ipo.gainPercent >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                }`}>
                  {ipo.gainPercent >= 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{ipo.gainPercent >= 0 ? "+" : ""}{ipo.gainPercent.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function IPOAlertButton({ ipo, hasAlert, setAlert, removeAlert }: { 
  ipo: IPOData; 
  hasAlert: (ipoId: string, type: "open" | "close") => boolean;
  setAlert: (ipoId: string, type: "open" | "close", ipo?: IPOData) => void;
  removeAlert: (ipoId: string, type: "open" | "close") => void;
}) {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  
  const handleSetAlert = (type: "open" | "close") => {
    if (hasAlert(ipo.id, type)) {
      removeAlert(ipo.id, type);
      toast({
        title: "Alert Removed",
        description: `${type === "open" ? "Opening" : "Closing"} reminder for ${ipo.companyName} removed.`,
      });
    } else {
      setAlert(ipo.id, type, ipo);
      toast({
        title: "Alert Set",
        description: `You'll be notified when ${ipo.companyName} IPO ${type === "open" ? "opens" : "closes"}.`,
      });
    }
    setShowDialog(false);
  };

  if (ipo.status !== "upcoming" && ipo.status !== "ongoing") return null;

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setShowDialog(true)}
        className={hasAlert(ipo.id, "open") || hasAlert(ipo.id, "close") ? "border-primary text-primary" : ""}
        data-testid={`button-alert-${ipo.id}`}
      >
        {hasAlert(ipo.id, "open") || hasAlert(ipo.id, "close") ? (
          <BellRing className="w-4 h-4 mr-1" />
        ) : (
          <Bell className="w-4 h-4 mr-1" />
        )}
        {hasAlert(ipo.id, "open") || hasAlert(ipo.id, "close") ? "Alert Set" : "Set Alert"}
      </Button>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Set IPO Alerts
            </DialogTitle>
            <DialogDescription>
              Get notified about important dates for {ipo.companyName} IPO
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {ipo.status === "upcoming" && (
              <div 
                className={`p-4 border rounded-lg cursor-pointer hover-elevate ${
                  hasAlert(ipo.id, "open") ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => handleSetAlert("open")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium">IPO Opening Reminder</p>
                      <p className="text-sm text-muted-foreground">Opens: {formatDate(ipo.openDate)}</p>
                    </div>
                  </div>
                  {hasAlert(ipo.id, "open") && <CheckCircle className="w-5 h-5 text-primary" />}
                </div>
              </div>
            )}
            <div 
              className={`p-4 border rounded-lg cursor-pointer hover-elevate ${
                hasAlert(ipo.id, "close") ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => handleSetAlert("close")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="font-medium">IPO Closing Reminder</p>
                    <p className="text-sm text-muted-foreground">Closes: {formatDate(ipo.closeDate)}</p>
                  </div>
                </div>
                {hasAlert(ipo.id, "close") && <CheckCircle className="w-5 h-5 text-primary" />}
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Alerts are stored locally in your browser and shown as on-site notifications.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}

function IPOAISummary({ ipo }: { ipo: IPOData }) {
  const { summary, riskLevel, explanation } = generateAISummary(ipo);
  
  const RiskIcon = riskLevel === "low" ? ShieldCheck : riskLevel === "medium" ? Shield : ShieldAlert;
  
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="w-5 h-5 text-primary" />
          AI Summary
          <Badge variant="secondary" className="text-xs">Beginner Friendly</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground">{summary}</p>
        
        <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">{explanation}</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={riskColors[riskLevel]}>
            <RiskIcon className="w-3 h-3 mr-1" />
            {riskLabels[riskLevel]}
          </Badge>
        </div>
        
        <p className="text-xs text-muted-foreground italic">
          This is an AI-generated educational summary. Not investment advice.
        </p>
      </CardContent>
    </Card>
  );
}

function LegalDisclaimer() {
  return (
    <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Important Disclaimer</h4>
          <p className="text-sm text-muted-foreground">
            IPO information displayed on this page is for <strong>educational purposes only</strong>. 
            All data is sourced from public market information including NSE, BSE, and verified news sources.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>This is not investment advice.</strong> Please consult a SEBI-registered investment advisor 
            before making any investment decisions. Stock market investments are subject to market risks.
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Data auto-updates periodically. For the most accurate information, please refer to official SEBI filings and RHP documents.
          </p>
        </div>
      </div>
    </div>
  );
}

function IPOCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <Skeleton className="w-20 h-5" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-1" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
}

function IPOCard({ ipo }: { ipo: IPOData }) {
  const daysRemaining = getDaysRemaining(ipo.status === "upcoming" ? ipo.openDate : ipo.closeDate);
  
  return (
    <Link href={`/ipo/${ipo.id}`} data-testid={`link-ipo-${ipo.id}`}>
      <Card className="h-full hover-elevate cursor-pointer group" data-testid={`card-ipo-${ipo.id}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {ipo.companyName.charAt(0)}
            </div>
            <Badge variant="outline" className={statusColors[ipo.status]}>
              {statusLabels[ipo.status]}
            </Badge>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {ipo.companyName}
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Briefcase className="w-3 h-3" />
            {ipo.industry || "General"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Price Band</p>
              <p className="font-semibold text-foreground">
                Rs {ipo.issuePrice.min} - {ipo.issuePrice.max}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Issue Size</p>
              <p className="font-semibold text-foreground">
                {ipo.issueSize ? formatCurrency(ipo.issueSize * 10000000) : "TBA"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Lot Size</p>
              <p className="font-semibold text-foreground">{ipo.lotSize ? `${ipo.lotSize} Shares` : "TBA"}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Min. Investment</p>
              <p className="font-semibold text-foreground">{ipo.minInvestment ? `Rs ${ipo.minInvestment.toLocaleString("en-IN")}` : "TBA"}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {ipo.status === "upcoming" ? (
                  <span>Opens: {formatDate(ipo.openDate)}</span>
                ) : ipo.status === "ongoing" ? (
                  <span>Closes: {formatDate(ipo.closeDate)}</span>
                ) : ipo.status === "closed" ? (
                  <span>Listing: {formatDate(ipo.listingDate || ipo.closeDate)}</span>
                ) : (
                  <span>Listed: {formatDate(ipo.listingDate || ipo.closeDate)}</span>
                )}
              </div>
              {(ipo.status === "upcoming" || ipo.status === "ongoing") && daysRemaining > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {daysRemaining} days
                </Badge>
              )}
            </div>
          </div>

          {ipo.subscriptionStatus && ipo.status !== "upcoming" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Subscription</span>
                <span className="font-semibold text-primary">{ipo.subscriptionStatus.total}x</span>
              </div>
              <Progress value={Math.min(ipo.subscriptionStatus.total * 10, 100)} className="h-2" />
            </div>
          )}

          {ipo.gmp !== undefined && ipo.gmp > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-muted-foreground">GMP:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">+Rs {ipo.gmp}</span>
            </div>
          )}

          <Button variant="ghost" className="w-full mt-2 justify-between group-hover:text-primary" data-testid={`button-view-ipo-${ipo.id}`}>
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

function IPONotificationBanner({ notifications, onDismiss }: { 
  notifications: Array<{ ipoId: string; type: "open" | "close"; companyName: string; date: string }>;
  onDismiss: (ipoId: string, type: "open" | "close") => void;
}) {
  if (notifications.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-4 pb-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <BellRing className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">IPO Reminders</h4>
              <p className="text-sm text-muted-foreground">Your scheduled alerts</p>
            </div>
          </div>
          <div className="space-y-2">
            {notifications.map((notification, index) => (
              <div 
                key={`${notification.ipoId}-${notification.type}`}
                className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    notification.type === "open" ? "bg-emerald-500/10" : "bg-amber-500/10"
                  }`}>
                    {notification.type === "open" ? (
                      <Calendar className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-foreground">{notification.companyName}</p>
                    <p className="text-xs text-muted-foreground">
                      IPO {notification.type === "open" ? "Opens" : "Closes"}: {formatDate(notification.date)}
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDismiss(notification.ipoId, notification.type)}
                  data-testid={`button-dismiss-notification-${index}`}
                >
                  Dismiss
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function IPOListing() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const { data, isLoading, isError, refetch, isFetching } = useIPOList();
  const { data: newsData } = useIPONews();
  const { alerts, hasAlert, setAlert, removeAlert, markNotified, getPendingNotifications } = useIPOAlerts();
  const [pendingNotifications, setPendingNotifications] = useState<Array<{ ipoId: string; type: "open" | "close"; companyName: string; date: string }>>([]);
  
  useEffect(() => {
    const notifications = getPendingNotifications();
    setPendingNotifications(notifications);
  }, [alerts]);

  const handleDismissNotification = (ipoId: string, type: "open" | "close") => {
    markNotified(ipoId, type);
    setPendingNotifications(prev => prev.filter(n => !(n.ipoId === ipoId && n.type === type)));
  };

  const ipos = data?.ipos || [];
  const ongoingIPOs = ipos.filter(ipo => ipo.status === "ongoing");
  const upcomingIPOs = ipos.filter(ipo => ipo.status === "upcoming");
  const closedIPOs = ipos.filter(ipo => ipo.status === "closed" || ipo.status === "listed");

  const filteredIPOs = activeTab === "all" 
    ? ipos 
    : activeTab === "ongoing" 
      ? ongoingIPOs 
      : activeTab === "upcoming" 
        ? upcomingIPOs 
        : closedIPOs;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              IPO Hub
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Upcoming & Ongoing IPOs
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Track all upcoming and ongoing IPOs with real-time subscription status, GMP, and verified data from trusted sources.
            </p>

            {data?.lastUpdated && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Last updated: {getTimeAgo(data.lastUpdated)}</span>
                {data.isStale && (
                  <Badge variant="outline" className="text-amber-600 border-amber-500/30 text-xs">
                    Data may be stale
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => refetch()} 
                  disabled={isFetching}
                  className="h-7 px-2"
                  data-testid="button-refresh-ipos"
                >
                  <RefreshCw className={`w-3 h-3 ${isFetching ? "animate-spin" : ""}`} />
                </Button>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4 pt-4">
              <Card className="text-center" data-testid="stat-ongoing">
                <CardContent className="pt-4 pb-3">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {isLoading ? <Skeleton className="h-8 w-8 mx-auto" /> : ongoingIPOs.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Open Now</div>
                </CardContent>
              </Card>
              <Card className="text-center" data-testid="stat-upcoming">
                <CardContent className="pt-4 pb-3">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {isLoading ? <Skeleton className="h-8 w-8 mx-auto" /> : upcomingIPOs.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Upcoming</div>
                </CardContent>
              </Card>
              <Card className="text-center" data-testid="stat-closed">
                <CardContent className="pt-4 pb-3">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {isLoading ? <Skeleton className="h-8 w-8 mx-auto" /> : closedIPOs.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Recently Listed</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center relative"
          >
            <RocketGrowth size={200} />
            <motion.div
              className="absolute -top-4 -right-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <GrowthChart size={120} />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-8"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <CoinStack size={80} />
            </motion.div>
          </motion.div>
        </div>

        <IPONotificationBanner 
          notifications={pendingNotifications} 
          onDismiss={handleDismissNotification} 
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="all" data-testid="tab-all-ipos">All ({ipos.length})</TabsTrigger>
              <TabsTrigger value="ongoing" data-testid="tab-ongoing-ipos">Open ({ongoingIPOs.length})</TabsTrigger>
              <TabsTrigger value="upcoming" data-testid="tab-upcoming-ipos">Upcoming ({upcomingIPOs.length})</TabsTrigger>
              <TabsTrigger value="closed" data-testid="tab-closed-ipos">Closed ({closedIPOs.length})</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              data-testid="button-list-view"
            >
              <List className="w-4 h-4 mr-1" />
              List
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("calendar")}
              data-testid="button-calendar-view"
            >
              <CalendarDays className="w-4 h-4 mr-1" />
              Calendar
            </Button>
          </div>
        </div>

        {isError && (
          <Card className="mb-8 border-amber-500/30">
            <CardContent className="pt-6 flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-amber-500" />
              <div>
                <p className="font-medium text-foreground">Unable to fetch live IPO data</p>
                <p className="text-sm text-muted-foreground">Showing cached data. Please try again later.</p>
              </div>
              <Button variant="outline" onClick={() => refetch()} className="ml-auto" data-testid="button-retry">
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {viewMode === "calendar" ? (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <IPOCalendarView ipos={ipos} />
            </div>
            <div>
              <IPOPerformanceTracker ipos={ipos} />
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              [...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <IPOCardSkeleton />
                </motion.div>
              ))
            ) : filteredIPOs.length > 0 ? (
              filteredIPOs.map((ipo, index) => (
                <motion.div
                  key={ipo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IPOCard ipo={ipo} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No IPOs found in this category</p>
              </div>
            )}
          </div>
        )}

        {viewMode === "list" && (
          <div className="grid lg:grid-cols-2 gap-6 mt-8">
            <IPOCalendarView ipos={ipos} />
            <IPOPerformanceTracker ipos={ipos} />
          </div>
        )}

        {newsData && newsData.articles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">IPO News</h2>
                <p className="text-sm text-muted-foreground">
                  Latest updates from verified sources
                  {newsData.lastUpdated && (
                    <span className="ml-2">- Updated {getTimeAgo(newsData.lastUpdated)}</span>
                  )}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {newsData.articles.slice(0, 6).map((article, index) => (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`link-news-${index}`}
                >
                  <Card className="h-full hover-elevate cursor-pointer">
                    <CardContent className="pt-4 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">{article.source}</Badge>
                        <span>{getTimeAgo(article.publishedAt)}</span>
                      </div>
                      <h3 className="font-medium text-foreground line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
                      <div className="flex items-center gap-1 text-xs text-primary pt-2">
                        <span>Read more</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </motion.div>
        )}

        <LegalDisclaimer />
      </div>
    </div>
  );
}

function IPOTimeline({ ipo }: { ipo: IPOData }) {
  const dates = [
    { label: "IPO Opens", date: ipo.openDate, icon: Calendar },
    { label: "IPO Closes", date: ipo.closeDate, icon: Clock },
    { label: "Allotment", date: ipo.allotmentDate, icon: FileText },
    { label: "Refund", date: ipo.refundDate, icon: Banknote },
    { label: "Listing", date: ipo.listingDate, icon: TrendingUp },
  ].filter(d => d.date);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
      <div className="space-y-6">
        {dates.map((item, index) => {
          const itemDate = new Date(item.date! + "T00:00:00");
          const isPast = itemDate < today;
          const isToday = itemDate.getTime() === today.getTime();
          const Icon = item.icon;
          
          return (
            <div key={index} className="relative flex items-center gap-4 pl-10">
              <div className={`absolute left-2 w-5 h-5 rounded-full flex items-center justify-center ${
                isPast ? "bg-emerald-500" : isToday ? "bg-primary" : "bg-muted"
              }`}>
                {isPast ? (
                  <CheckCircle className="w-3 h-3 text-white" />
                ) : (
                  <CircleDot className="w-3 h-3 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{formatDate(item.date!)}</p>
              </div>
              <Icon className={`w-4 h-4 ${isPast ? "text-emerald-500" : "text-muted-foreground"}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SubscriptionMeter({ label, value, color }: { label: string; value: number; color: string }) {
  const percentage = Math.min(value * 10, 100);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className={`text-lg font-bold ${color}`}>{value.toFixed(2)}x</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${
            value >= 10 ? "bg-emerald-500" : value >= 1 ? "bg-blue-500" : "bg-amber-500"
          }`}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {value >= 1 ? "Fully subscribed" : `${(value * 100).toFixed(0)}% subscribed`}
      </p>
    </div>
  );
}

function IPODetail({ id }: { id: string }) {
  const { data: listData, isLoading, isError, refetch, isFetching } = useIPOList();
  const ipo = listData?.ipos.find(i => i.id === id);
  const [activeTab, setActiveTab] = useState("overview");
  const { hasAlert, setAlert, removeAlert } = useIPOAlerts();

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Skeleton className="h-10 w-32 mb-6" />
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Skeleton className="w-20 h-20 rounded-xl" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-20" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          <Skeleton className="h-12 w-full max-w-lg mb-6" />
          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !ipo) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">IPO Not Found</h2>
          <p className="text-muted-foreground mb-4">The IPO you're looking for doesn't exist or data is unavailable.</p>
          <Link href="/ipo">
            <Button data-testid="button-view-all-ipos-404">View All IPOs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(ipo.status === "upcoming" ? ipo.openDate : ipo.closeDate);
  const expectedReturn = ipo.gmp ? ((ipo.gmp / ipo.issuePrice.max) * 100).toFixed(1) : null;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <Link href="/ipo">
            <Button variant="ghost" className="gap-2" data-testid="button-back-to-ipos">
              <ChevronLeft className="w-4 h-4" />
              Back to IPOs
            </Button>
          </Link>
          
          <div className="flex items-center gap-3">
            <IPOAlertButton 
              ipo={ipo} 
              hasAlert={hasAlert} 
              setAlert={setAlert} 
              removeAlert={removeAlert} 
            />
            
            {listData?.lastUpdated && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Updated: {getTimeAgo(listData.lastUpdated)}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => refetch()} 
                  disabled={isFetching}
                  className="h-7 px-2"
                  data-testid="button-refresh-ipo-detail"
                >
                  <RefreshCw className={`w-3 h-3 ${isFetching ? "animate-spin" : ""}`} />
                </Button>
              </div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold text-2xl md:text-3xl shrink-0">
                    {ipo.companyName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">{ipo.companyName}</h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1 flex-wrap">
                      <Briefcase className="w-4 h-4 shrink-0" />
                      <span>{ipo.industry || "General"}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <Badge variant="outline" className={statusColors[ipo.status]}>
                        {statusLabels[ipo.status]}
                      </Badge>
                      {ipo.exchange?.map(ex => (
                        <Badge key={ex} variant="secondary" className="text-xs">{ex}</Badge>
                      ))}
                      {(ipo.status === "upcoming" || ipo.status === "ongoing") && daysRemaining > 0 && (
                        <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                          <Timer className="w-3 h-3 mr-1" />
                          {daysRemaining} days left
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <Separator className="lg:hidden" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
                  <div className="text-center lg:text-right p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Price Band</p>
                    <p className="font-bold text-foreground">Rs {ipo.issuePrice.min} - {ipo.issuePrice.max}</p>
                  </div>
                  <div className="text-center lg:text-right p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Lot Size</p>
                    <p className="font-bold text-foreground">{ipo.lotSize || "TBA"} Shares</p>
                  </div>
                  <div className="text-center lg:text-right p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Min Investment</p>
                    <p className="font-bold text-foreground">Rs {ipo.minInvestment?.toLocaleString("en-IN") || "TBA"}</p>
                  </div>
                  {ipo.gmp !== undefined && ipo.gmp > 0 ? (
                    <div className="text-center lg:text-right p-3 bg-emerald-500/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">GMP</p>
                      <div className="flex items-center justify-center lg:justify-end gap-1">
                        <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">+Rs {ipo.gmp}</span>
                      </div>
                      {expectedReturn && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400">({expectedReturn}%)</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center lg:text-right p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Issue Size</p>
                      <p className="font-bold text-foreground">{ipo.issueSize ? formatCurrency(ipo.issueSize * 10000000) : "TBA"}</p>
                    </div>
                  )}
                </div>
              </div>

              {ipo.status === "ongoing" && (
                <div className="mt-6 pt-4 border-t border-border">
                  <Button className="w-full md:w-auto" size="lg" data-testid="button-apply-ipo-header">
                    <IndianRupee className="w-4 h-4 mr-2" />
                    Apply Now via Broker
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4 h-auto">
            <TabsTrigger value="overview" className="py-3" data-testid="tab-overview">
              <Building2 className="w-4 h-4 mr-2 hidden sm:block" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="details" className="py-3" data-testid="tab-details">
              <Info className="w-4 h-4 mr-2 hidden sm:block" />
              Details
            </TabsTrigger>
            <TabsTrigger value="dates" className="py-3" data-testid="tab-dates">
              <CalendarDays className="w-4 h-4 mr-2 hidden sm:block" />
              Timeline
            </TabsTrigger>
            <TabsTrigger value="financials" className="py-3" data-testid="tab-financials">
              <BarChart3 className="w-4 h-4 mr-2 hidden sm:block" />
              Financials
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    About Company
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {ipo.about || `${ipo.companyName} is preparing for its initial public offering on the Indian stock exchanges. The company operates in the ${ipo.industry || "technology"} sector and aims to raise capital for business expansion and growth initiatives.`}
                  </p>
                  
                  {ipo.highlights && ipo.highlights.length > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium text-foreground mb-3">Key Highlights</h4>
                      <ul className="space-y-2">
                        {ipo.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-sm text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {ipo.subscriptionStatus ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-primary" />
                      Subscription Status
                    </CardTitle>
                    <CardDescription>Live subscription data by category</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <SubscriptionMeter 
                      label="Qualified Institutional Buyers (QIB)" 
                      value={ipo.subscriptionStatus.qib} 
                      color="text-blue-600 dark:text-blue-400"
                    />
                    <SubscriptionMeter 
                      label="Non-Institutional Investors (HNI)" 
                      value={ipo.subscriptionStatus.hni} 
                      color="text-purple-600 dark:text-purple-400"
                    />
                    <SubscriptionMeter 
                      label="Retail Individual Investors (RII)" 
                      value={ipo.subscriptionStatus.retail} 
                      color="text-emerald-600 dark:text-emerald-400"
                    />
                    <Separator />
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">Total Subscription</span>
                      <span className="text-2xl font-bold text-primary">{ipo.subscriptionStatus.total.toFixed(2)}x</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      IPO Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">1</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Fund working capital requirements</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">2</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Repayment of certain borrowings</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">3</span>
                        </div>
                        <span className="text-sm text-muted-foreground">General corporate purposes</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>

            <IPOAISummary ipo={ipo} />
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <IndianRupee className="w-4 h-4 text-primary" />
                    Price Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Price Band</span>
                    <span className="font-semibold text-foreground">Rs {ipo.issuePrice.min} - {ipo.issuePrice.max}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Face Value</span>
                    <span className="font-semibold text-foreground">Rs 10</span>
                  </div>
                  {ipo.gmp !== undefined && ipo.gmp > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Grey Market Premium</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">+Rs {ipo.gmp}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Lot Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Lot Size</span>
                    <span className="font-semibold text-foreground">{ipo.lotSize || "TBA"} Shares</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Minimum Investment</span>
                    <span className="font-semibold text-foreground">Rs {ipo.minInvestment?.toLocaleString("en-IN") || "TBA"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Maximum Retail Lots</span>
                    <span className="font-semibold text-foreground">13</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Landmark className="w-4 h-4 text-primary" />
                    Issue Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Issue Size</span>
                    <span className="font-semibold text-foreground">{ipo.issueSize ? formatCurrency(ipo.issueSize * 10000000) : "TBA"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Issue Type</span>
                    <span className="font-semibold text-foreground">Book Built</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Listing At</span>
                    <span className="font-semibold text-foreground">{ipo.exchange?.join(", ") || "NSE, BSE"}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Registrar & Manager
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ipo.registrar && (
                    <div>
                      <p className="text-sm text-muted-foreground">Registrar</p>
                      <p className="font-semibold text-foreground">{ipo.registrar}</p>
                    </div>
                  )}
                  {ipo.leadManager && (
                    <div>
                      <p className="text-sm text-muted-foreground">Lead Manager</p>
                      <p className="font-semibold text-foreground text-sm">{ipo.leadManager}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {ipo.documentUrl && (
                <Card className="md:col-span-2 lg:col-span-2">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <h4 className="font-medium text-foreground">Red Herring Prospectus (RHP)</h4>
                        <p className="text-sm text-muted-foreground">View complete IPO document</p>
                      </div>
                      <a href={ipo.documentUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" data-testid="button-view-rhp-tab">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Document
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="dates" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    IPO Timeline
                  </CardTitle>
                  <CardDescription>Important dates for {ipo.companyName} IPO</CardDescription>
                </CardHeader>
                <CardContent>
                  <IPOTimeline ipo={ipo} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Quick Dates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Open Date</p>
                      <p className="font-semibold text-foreground">{formatDate(ipo.openDate)}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg text-center">
                      <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-xs text-muted-foreground">Close Date</p>
                      <p className="font-semibold text-foreground">{formatDate(ipo.closeDate)}</p>
                    </div>
                    {ipo.allotmentDate && (
                      <div className="p-4 bg-muted/50 rounded-lg text-center">
                        <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Allotment</p>
                        <p className="font-semibold text-foreground">{formatDate(ipo.allotmentDate)}</p>
                      </div>
                    )}
                    {ipo.listingDate && (
                      <div className="p-4 bg-emerald-500/10 rounded-lg text-center">
                        <TrendingUp className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                        <p className="text-xs text-muted-foreground">Listing</p>
                        <p className="font-semibold text-foreground">{formatDate(ipo.listingDate)}</p>
                      </div>
                    )}
                  </div>

                  {(ipo.status === "upcoming" || ipo.status === "ongoing") && daysRemaining > 0 && (
                    <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {ipo.status === "upcoming" ? "IPO Opens in" : "IPO Closes in"}
                          </p>
                          <p className="text-xs text-muted-foreground">Don't miss the opportunity</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary">{daysRemaining}</p>
                          <p className="text-xs text-muted-foreground">days</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            {ipo.financials ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ipo.financials.revenue && (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                        <BarChart3 className="w-6 h-6 text-blue-500" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Revenue</p>
                      <p className="text-xl font-bold text-foreground">{ipo.financials.revenue}</p>
                    </CardContent>
                  </Card>
                )}
                {ipo.financials.profit && (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-emerald-500" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Net Profit</p>
                      <p className="text-xl font-bold text-foreground">{ipo.financials.profit}</p>
                    </CardContent>
                  </Card>
                )}
                {ipo.financials.assets && (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                        <Landmark className="w-6 h-6 text-purple-500" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Total Assets</p>
                      <p className="text-xl font-bold text-foreground">{ipo.financials.assets}</p>
                    </CardContent>
                  </Card>
                )}
                {ipo.financials.netWorth && (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3">
                        <Banknote className="w-6 h-6 text-amber-500" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Net Worth</p>
                      <p className="text-xl font-bold text-foreground">{ipo.financials.netWorth}</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Financial Data Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Detailed financial information will be available once the Red Herring Prospectus is filed with SEBI.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <LegalDisclaimer />
      </div>
    </div>
  );
}
export default function IPO() {
  const [, params] = useRoute("/ipo/:id");

  if (params?.id) {
    return <IPODetail id={params.id} />;
  }

  return <IPOListing />;
}
