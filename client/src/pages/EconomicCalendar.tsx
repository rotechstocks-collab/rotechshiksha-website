import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { format, parseISO, isToday, isPast, isFuture, startOfDay, addDays } from "date-fns";
import { 
  Calendar, 
  Globe, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Filter,
  RefreshCw,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Circle
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
}

interface CalendarResponse {
  events: EconomicEvent[];
  lastUpdated: string;
  isStale: boolean;
}

const countryFlags: Record<string, string> = {
  US: "us",
  IN: "in",
  GB: "gb",
  EU: "eu",
  JP: "jp",
  CN: "cn",
  DE: "de",
  FR: "fr",
  AU: "au",
  CA: "ca",
  CH: "ch",
  NZ: "nz",
  BR: "br",
  MX: "mx",
  KR: "kr",
  SG: "sg",
  HK: "hk",
  ZA: "za",
  RU: "ru",
  IT: "it",
  ES: "es",
};

const impactColors = {
  high: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-200 dark:border-red-800",
    dot: "bg-red-500",
  },
  medium: {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
    dot: "bg-amber-500",
  },
  low: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
    dot: "bg-green-500",
  },
};

function EventRow({ event, index }: { event: EconomicEvent; index: number }) {
  const eventDateTime = parseISO(`${event.date}T${event.time}`);
  const isPastEvent = isPast(eventDateTime);
  const isTodayEvent = isToday(parseISO(event.date));
  const impactStyle = impactColors[event.impact];

  const actualValue = event.actual !== null ? parseFloat(event.actual) : null;
  const forecastValue = event.forecast !== null ? parseFloat(event.forecast) : null;
  const previousValue = event.previous !== null ? parseFloat(event.previous) : null;

  const isBetterThanForecast = actualValue !== null && forecastValue !== null && actualValue > forecastValue;
  const isWorseThanForecast = actualValue !== null && forecastValue !== null && actualValue < forecastValue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className={`grid grid-cols-12 gap-2 md:gap-4 p-3 md:p-4 border-b border-border/50 hover-elevate ${
        isPastEvent ? "opacity-60" : ""
      } ${isTodayEvent ? "bg-primary/5" : ""}`}
      data-testid={`event-row-${event.id}`}
    >
      <div className="col-span-3 md:col-span-2 flex items-center gap-2">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">
            {format(parseISO(event.date), "MMM dd")}
          </span>
          <span className="text-sm font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {event.time}
          </span>
        </div>
      </div>

      <div className="col-span-5 md:col-span-4 flex items-center gap-2">
        <img
          src={`https://flagcdn.com/24x18/${countryFlags[event.countryCode] || "un"}.png`}
          alt={event.country}
          className="w-6 h-4 rounded-sm object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium truncate" title={event.event}>
            {event.event}
          </span>
          <span className="text-xs text-muted-foreground">{event.country}</span>
        </div>
      </div>

      <div className="col-span-1 flex items-center justify-center">
        <div
          className={`w-2.5 h-2.5 rounded-full ${impactStyle.dot}`}
          title={`${event.impact} impact`}
        />
      </div>

      <div className="col-span-3 md:col-span-5 grid grid-cols-3 gap-1 md:gap-2 items-center text-center">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground hidden md:block">Actual</span>
          {event.actual !== null ? (
            <span
              className={`text-sm font-semibold flex items-center justify-center gap-0.5 ${
                isBetterThanForecast
                  ? "text-green-600 dark:text-green-400"
                  : isWorseThanForecast
                  ? "text-red-600 dark:text-red-400"
                  : ""
              }`}
            >
              {event.actual}{event.unit}
              {isBetterThanForecast && <TrendingUp className="w-3 h-3" />}
              {isWorseThanForecast && <TrendingDown className="w-3 h-3" />}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">-</span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground hidden md:block">Forecast</span>
          <span className="text-sm">
            {event.forecast !== null ? `${event.forecast}${event.unit}` : "-"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground hidden md:block">Previous</span>
          <span className="text-sm text-muted-foreground">
            {event.previous !== null ? `${event.previous}${event.unit}` : "-"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function EventSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50">
      <div className="col-span-2">
        <Skeleton className="h-4 w-16 mb-1" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="col-span-4 flex items-center gap-2">
        <Skeleton className="h-4 w-6" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <div className="col-span-1 flex justify-center">
        <Skeleton className="h-3 w-3 rounded-full" />
      </div>
      <div className="col-span-5 grid grid-cols-3 gap-2">
        <Skeleton className="h-4 w-12 mx-auto" />
        <Skeleton className="h-4 w-12 mx-auto" />
        <Skeleton className="h-4 w-12 mx-auto" />
      </div>
    </div>
  );
}

export default function EconomicCalendar() {
  const { t } = useLanguage();
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [impactFilter, setImpactFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("upcoming");

  const { data, isLoading, error, refetch, isFetching } = useQuery<CalendarResponse>({
    queryKey: ["/api/economic-calendar"],
    refetchInterval: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
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

  const eventsByDate = useMemo(() => {
    const grouped = new Map<string, EconomicEvent[]>();
    filteredEvents.forEach((event) => {
      const existing = grouped.get(event.date) || [];
      grouped.set(event.date, [...existing, event]);
    });
    return grouped;
  }, [filteredEvents]);

  const impactStats = useMemo(() => {
    if (!filteredEvents.length) return { high: 0, medium: 0, low: 0 };
    return {
      high: filteredEvents.filter((e) => e.impact === "high").length,
      medium: filteredEvents.filter((e) => e.impact === "medium").length,
      low: filteredEvents.filter((e) => e.impact === "low").length,
    };
  }, [filteredEvents]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 pt-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3" data-testid="page-title">
                <Calendar className="w-8 h-8 text-primary" />
                Economic Calendar
              </h1>
              <p className="text-muted-foreground mt-1">
                Track important economic events and market-moving announcements
              </p>
            </div>

            <div className="flex items-center gap-2">
              {data?.lastUpdated && (
                <span className="text-xs text-muted-foreground">
                  Updated: {format(parseISO(data.lastUpdated), "HH:mm")}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isFetching}
                data-testid="button-refresh"
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${isFetching ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className={`${impactColors.high.bg} ${impactColors.high.border} border`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">High Impact</p>
                  <p className={`text-2xl font-bold ${impactColors.high.text}`}>
                    {impactStats.high}
                  </p>
                </div>
                <AlertCircle className={`w-8 h-8 ${impactColors.high.text}`} />
              </CardContent>
            </Card>
            <Card className={`${impactColors.medium.bg} ${impactColors.medium.border} border`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Medium Impact</p>
                  <p className={`text-2xl font-bold ${impactColors.medium.text}`}>
                    {impactStats.medium}
                  </p>
                </div>
                <Circle className={`w-8 h-8 ${impactColors.medium.text}`} />
              </CardContent>
            </Card>
            <Card className={`${impactColors.low.bg} ${impactColors.low.border} border`}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Low Impact</p>
                  <p className={`text-2xl font-bold ${impactColors.low.text}`}>
                    {impactStats.low}
                  </p>
                </div>
                <CheckCircle className={`w-8 h-8 ${impactColors.low.text}`} />
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6">
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
                    <SelectItem value="past">Past</SelectItem>
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

                <Badge variant="secondary" className="ml-auto">
                  {filteredEvents.length} events
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Card>
          <CardHeader className="border-b">
            <div className="grid grid-cols-12 gap-2 md:gap-4 text-xs font-medium text-muted-foreground">
              <div className="col-span-3 md:col-span-2">Date / Time</div>
              <div className="col-span-5 md:col-span-4">Event</div>
              <div className="col-span-1 text-center">Impact</div>
              <div className="col-span-3 md:col-span-5 grid grid-cols-3 text-center">
                <span>Actual</span>
                <span>Forecast</span>
                <span>Previous</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div>
                {Array.from({ length: 10 }).map((_, i) => (
                  <EventSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <p className="text-lg font-medium">Failed to load economic calendar</p>
                <p className="text-muted-foreground mb-4">Please try again later</p>
                <Button onClick={() => refetch()} data-testid="button-retry">
                  Try Again
                </Button>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="p-8 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">No events found</p>
                <p className="text-muted-foreground">Try adjusting your filters</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event, index) => (
                  <EventRow key={event.id} event={event} index={index} />
                ))}
              </AnimatePresence>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>
            Data updates automatically every 30 minutes. Times shown in local timezone.
          </p>
          {data?.isStale && (
            <Badge variant="outline" className="mt-2">
              Using cached data - refresh for latest
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
