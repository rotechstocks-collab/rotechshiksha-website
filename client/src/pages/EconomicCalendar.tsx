import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, parseISO, isToday, isPast, isFuture, startOfDay, addDays } from "date-fns";
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Circle,
  X,
  ChevronRight,
  Zap,
  Globe,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Info,
  Sparkles,
  Target,
  LineChart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";

interface EconomicEvent {
  id: string;
  event: string;
  country: string;
  countryCode: string;
  date: string;
  time: string;
  impact: "low" | "medium" | "high";
  actual: string | null;
  forecast: string | null;
  previous: string | null;
  unit: string;
  currency: string;
  description: string;
  whatItMeans: string;
  marketImpact: "bullish" | "bearish" | "volatile" | "neutral";
  affectedMarkets: string[];
  sector: string;
  frequency: string;
  source?: string;
}

interface CalendarResponse {
  events: EconomicEvent[];
  lastUpdated: string;
  isStale: boolean;
}

const countryFlags: Record<string, string> = {
  US: "us", IN: "in", GB: "gb", EU: "eu", JP: "jp", CN: "cn",
  DE: "de", FR: "fr", AU: "au", CA: "ca", CH: "ch", NZ: "nz",
  BR: "br", MX: "mx", KR: "kr", SG: "sg", HK: "hk", ZA: "za",
  RU: "ru", IT: "it", ES: "es",
};

const impactConfig = {
  high: {
    bg: "bg-gradient-to-r from-red-500/10 to-red-600/5 dark:from-red-900/30 dark:to-red-800/20",
    border: "border-red-300 dark:border-red-700",
    text: "text-red-600 dark:text-red-400",
    badge: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
    dot: "bg-red-500",
    glow: "shadow-red-500/20",
    icon: AlertCircle
  },
  medium: {
    bg: "bg-gradient-to-r from-amber-500/10 to-amber-600/5 dark:from-amber-900/30 dark:to-amber-800/20",
    border: "border-amber-300 dark:border-amber-700",
    text: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    dot: "bg-amber-500",
    glow: "shadow-amber-500/20",
    icon: Circle
  },
  low: {
    bg: "bg-gradient-to-r from-green-500/10 to-green-600/5 dark:from-green-900/30 dark:to-green-800/20",
    border: "border-green-300 dark:border-green-700",
    text: "text-green-600 dark:text-green-400",
    badge: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
    dot: "bg-green-500",
    glow: "shadow-green-500/20",
    icon: CheckCircle
  },
};

const marketImpactConfig = {
  bullish: {
    bg: "bg-emerald-100 dark:bg-emerald-900/40",
    text: "text-emerald-700 dark:text-emerald-300",
    icon: TrendingUp,
    label: "Bullish",
    description: "Positive for markets"
  },
  bearish: {
    bg: "bg-red-100 dark:bg-red-900/40",
    text: "text-red-700 dark:text-red-300",
    icon: TrendingDown,
    label: "Bearish",
    description: "Negative for markets"
  },
  volatile: {
    bg: "bg-purple-100 dark:bg-purple-900/40",
    text: "text-purple-700 dark:text-purple-300",
    icon: Activity,
    label: "Volatile",
    description: "Expect market swings"
  },
  neutral: {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    icon: Minus,
    label: "Neutral",
    description: "In-line with expectations"
  },
};

function EventDetailModal({ 
  event, 
  open, 
  onClose 
}: { 
  event: EconomicEvent | null; 
  open: boolean; 
  onClose: () => void;
}) {
  if (!event) return null;

  const impact = impactConfig[event.impact];
  const marketImpact = marketImpactConfig[event.marketImpact];
  const MarketIcon = marketImpact.icon;
  const eventDate = parseISO(`${event.date}T${event.time}`);
  const isPastEvent = isPast(eventDate);
  
  const actualValue = event.actual !== null ? parseFloat(event.actual) : null;
  const forecastValue = event.forecast !== null ? parseFloat(event.forecast) : null;
  const isBetter = actualValue !== null && forecastValue !== null && actualValue > forecastValue;
  const isWorse = actualValue !== null && forecastValue !== null && actualValue < forecastValue;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-start gap-4">
            <img
              src={`https://flagcdn.com/48x36/${countryFlags[event.countryCode] || "un"}.png`}
              alt={event.country}
              className="w-12 h-9 rounded shadow-sm object-cover"
              loading="lazy"
            />
            <div className="flex-1">
              <DialogTitle className="text-xl font-bold leading-tight mb-1">
                {event.event}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  {event.country}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {format(parseISO(event.date), "MMMM dd, yyyy")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {event.time}
                </span>
              </div>
            </div>
            <Badge className={impact.badge}>
              {event.impact.toUpperCase()} IMPACT
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-3 gap-4">
            <Card className={`${event.actual ? (isBetter ? "ring-2 ring-emerald-500" : isWorse ? "ring-2 ring-red-500" : "") : ""}`}>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Actual</p>
                {event.actual !== null ? (
                  <div className="flex items-center justify-center gap-1">
                    <span className={`text-2xl font-bold ${isBetter ? "text-emerald-600" : isWorse ? "text-red-600" : ""}`}>
                      {event.actual}{event.unit}
                    </span>
                    {isBetter && <ArrowUpRight className="w-5 h-5 text-emerald-600" />}
                    {isWorse && <ArrowDownRight className="w-5 h-5 text-red-600" />}
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-muted-foreground">--</span>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Forecast</p>
                <span className="text-2xl font-bold">
                  {event.forecast !== null ? `${event.forecast}${event.unit}` : "--"}
                </span>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Previous</p>
                <span className="text-2xl font-bold text-muted-foreground">
                  {event.previous !== null ? `${event.previous}${event.unit}` : "--"}
                </span>
              </CardContent>
            </Card>
          </div>

          {event.actual !== null && (
            <Card className={`${marketImpact.bg} border-none`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${marketImpact.bg}`}>
                    <MarketIcon className={`w-6 h-6 ${marketImpact.text}`} />
                  </div>
                  <div>
                    <p className={`font-semibold ${marketImpact.text}`}>
                      Market Outlook: {marketImpact.label}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {marketImpact.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-lg mb-2">
                <Info className="w-5 h-5 text-primary" />
                What is this event?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 font-semibold text-lg mb-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                What it means for you
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {event.whatItMeans}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="flex items-center gap-2 font-medium mb-3">
                  <Target className="w-4 h-4 text-primary" />
                  Affected Markets
                </h4>
                <div className="flex flex-wrap gap-2">
                  {event.affectedMarkets.map((market, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {market}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h4 className="flex items-center gap-2 font-medium mb-3">
                  <LineChart className="w-4 h-4 text-primary" />
                  Event Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sector</span>
                    <span className="font-medium">{event.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frequency</span>
                    <span className="font-medium">{event.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Currency</span>
                    <span className="font-medium">{event.currency}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              Data provided for educational purposes. Always do your own research before making investment decisions.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EventCard({ 
  event, 
  onClick,
  isHighlighted 
}: { 
  event: EconomicEvent; 
  onClick: () => void;
  isHighlighted: boolean;
}) {
  const eventDateTime = parseISO(`${event.date}T${event.time}`);
  const isPastEvent = isPast(eventDateTime);
  const isTodayEvent = isToday(parseISO(event.date));
  const impact = impactConfig[event.impact];
  const ImpactIcon = impact.icon;

  const actualValue = event.actual !== null ? parseFloat(event.actual) : null;
  const forecastValue = event.forecast !== null ? parseFloat(event.forecast) : null;
  const isBetter = actualValue !== null && forecastValue !== null && actualValue > forecastValue;
  const isWorse = actualValue !== null && forecastValue !== null && actualValue < forecastValue;

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        isPastEvent ? "opacity-60" : ""
      } ${isTodayEvent ? "ring-2 ring-primary/30" : ""} ${
        isHighlighted ? "ring-2 ring-amber-400 shadow-lg shadow-amber-500/10" : ""
      } ${event.impact === "high" ? "border-l-4 border-l-red-500" : ""}`}
      onClick={onClick}
      data-testid={`event-card-${event.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <img
              src={`https://flagcdn.com/32x24/${countryFlags[event.countryCode] || "un"}.png`}
              alt={event.country}
              className="w-8 h-6 rounded shadow-sm object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-sm leading-tight line-clamp-2">
                {event.event}
              </h3>
              <div className={`flex-shrink-0 w-3 h-3 rounded-full ${impact.dot} animate-pulse`} 
                   style={{ animationDuration: event.impact === "high" ? "1s" : "2s" }} />
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {format(parseISO(event.date), "MMM dd")} {event.time}
              </span>
              <span>{event.country}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-muted/50 rounded-md p-2">
                <p className="text-[10px] text-muted-foreground mb-0.5">Actual</p>
                {event.actual !== null ? (
                  <span className={`text-sm font-bold ${
                    isBetter ? "text-emerald-600" : isWorse ? "text-red-600" : ""
                  }`}>
                    {event.actual}{event.unit}
                  </span>
                ) : (
                  <span className="text-sm text-muted-foreground">--</span>
                )}
              </div>
              <div className="bg-muted/50 rounded-md p-2">
                <p className="text-[10px] text-muted-foreground mb-0.5">Forecast</p>
                <span className="text-sm font-medium">
                  {event.forecast !== null ? `${event.forecast}${event.unit}` : "--"}
                </span>
              </div>
              <div className="bg-muted/50 rounded-md p-2">
                <p className="text-[10px] text-muted-foreground mb-0.5">Previous</p>
                <span className="text-sm text-muted-foreground">
                  {event.previous !== null ? `${event.previous}${event.unit}` : "--"}
                </span>
              </div>
            </div>
          </div>
          
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
        </div>
        
        {isHighlighted && (
          <div className="mt-3 pt-3 border-t flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
              High-Impact Event - Click for details
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function EventSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="w-8 h-6 rounded" />
          <div className="flex-1">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-3" />
            <div className="grid grid-cols-3 gap-2">
              <Skeleton className="h-12 rounded-md" />
              <Skeleton className="h-12 rounded-md" />
              <Skeleton className="h-12 rounded-md" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ImpactStatCard({ 
  impact, 
  count, 
  label 
}: { 
  impact: "high" | "medium" | "low"; 
  count: number;
  label: string;
}) {
  const config = impactConfig[impact];
  const Icon = config.icon;
  
  return (
    <Card className={`${config.bg} border ${config.border} overflow-visible`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium">{label}</p>
          <p className={`text-3xl font-bold ${config.text}`}>
            {count}
          </p>
        </div>
        <div className={`p-3 rounded-full ${config.bg} shadow-lg ${config.glow}`}>
          <Icon className={`w-6 h-6 ${config.text}`} />
        </div>
      </CardContent>
    </Card>
  );
}

export default function EconomicCalendar() {
  const { t } = useLanguage();
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [impactFilter, setImpactFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("upcoming");
  const [selectedEvent, setSelectedEvent] = useState<EconomicEvent | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data, isLoading, error, refetch, isFetching } = useQuery<CalendarResponse>({
    queryKey: ["/api/economic-calendar"],
    refetchInterval: 3 * 60 * 1000, // Refresh every 3 minutes
    staleTime: 60 * 1000,
  });

  const filteredEvents = useMemo(() => {
    if (!data?.events) return [];

    return data.events.filter((event) => {
      const eventDate = parseISO(event.date);
      const today = startOfDay(new Date());

      if (countryFilter !== "all" && event.countryCode !== countryFilter) {
        return false;
      }
      if (impactFilter !== "all" && event.impact !== impactFilter) {
        return false;
      }

      switch (dateFilter) {
        case "today":
          return isToday(eventDate);
        case "upcoming":
          return !isPast(startOfDay(eventDate)) || isToday(eventDate);
        case "past":
          return isPast(eventDate) && !isToday(eventDate);
        case "week":
          return eventDate >= today && eventDate <= addDays(today, 7);
        default:
          return true;
      }
    });
  }, [data?.events, countryFilter, impactFilter, dateFilter]);

  const uniqueCountries = useMemo(() => {
    if (!data?.events) return [];
    const countries = new Map<string, string>();
    data.events.forEach((e) => countries.set(e.countryCode, e.country));
    return Array.from(countries.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [data?.events]);

  const impactStats = useMemo(() => {
    if (!filteredEvents.length) return { high: 0, medium: 0, low: 0 };
    return {
      high: filteredEvents.filter((e) => e.impact === "high").length,
      medium: filteredEvents.filter((e) => e.impact === "medium").length,
      low: filteredEvents.filter((e) => e.impact === "low").length,
    };
  }, [filteredEvents]);

  const highImpactUpcoming = useMemo(() => {
    return filteredEvents.filter(e => e.impact === "high" && !isPast(parseISO(`${e.date}T${e.time}`))).slice(0, 3);
  }, [filteredEvents]);

  const handleEventClick = (event: EconomicEvent) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 pt-32">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3 mb-2" data-testid="page-title">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                Economic Calendar
              </h1>
              <p className="text-muted-foreground">
                Track market-moving economic events with real-time updates and expert insights
              </p>
            </div>

            <div className="flex items-center gap-3">
              {data?.lastUpdated && (
                <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
                  Updated: {format(parseISO(data.lastUpdated), "HH:mm")}
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                data-testid="button-refresh"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <ImpactStatCard impact="high" count={impactStats.high} label="High Impact" />
            <ImpactStatCard impact="medium" count={impactStats.medium} label="Medium Impact" />
            <ImpactStatCard impact="low" count={impactStats.low} label="Low Impact" />
          </div>

          {highImpactUpcoming.length > 0 && (
            <Card className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <h2 className="font-semibold text-amber-800 dark:text-amber-300">
                    Upcoming High-Impact Events
                  </h2>
                  <Badge variant="secondary" className="ml-auto bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                    Don't Miss
                  </Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {highImpactUpcoming.map((event) => (
                    <div 
                      key={event.id}
                      className="flex items-center gap-3 p-3 bg-white/60 dark:bg-black/20 rounded-lg cursor-pointer hover:bg-white/80 dark:hover:bg-black/30 transition-colors"
                      onClick={() => handleEventClick(event)}
                    >
                      <img
                        src={`https://flagcdn.com/24x18/${countryFlags[event.countryCode] || "un"}.png`}
                        alt={event.country}
                        className="w-6 h-4 rounded shadow-sm"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{event.event}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(parseISO(event.date), "MMM dd")} at {event.time}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-36" data-testid="filter-date">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="past">Past Events</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={countryFilter} onValueChange={setCountryFilter}>
                  <SelectTrigger className="w-44" data-testid="filter-country">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {uniqueCountries.map(([code, name]) => (
                      <SelectItem key={code} value={code}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={impactFilter} onValueChange={setImpactFilter}>
                  <SelectTrigger className="w-36" data-testid="filter-impact">
                    <SelectValue placeholder="Impact" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Impact</SelectItem>
                    <SelectItem value="high">High Only</SelectItem>
                    <SelectItem value="medium">Medium Only</SelectItem>
                    <SelectItem value="low">Low Only</SelectItem>
                  </SelectContent>
                </Select>

                <div className="ml-auto flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    {filteredEvents.length} events
                  </Badge>
                  {data?.isStale && (
                    <Badge variant="secondary" className="text-xs">
                      Cached
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <EventSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <Card className="p-12 text-center">
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Failed to load economic calendar</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't fetch the latest economic events. Please try again.
            </p>
            <Button onClick={() => refetch()} data-testid="button-retry">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </Card>
        ) : filteredEvents.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No events found</h2>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more events
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={() => handleEventClick(event)}
                isHighlighted={event.impact === "high" && !isPast(parseISO(`${event.date}T${event.time}`))}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Data auto-refreshes every 3 minutes. Click on any event for detailed market impact analysis.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              High Impact
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              Medium Impact
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Low Impact
            </span>
          </div>
        </div>
      </div>

      <EventDetailModal 
        event={selectedEvent} 
        open={modalOpen} 
        onClose={() => setModalOpen(false)} 
      />
    </div>
  );
}
