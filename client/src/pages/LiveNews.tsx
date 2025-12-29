import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Newspaper, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  Building2,
  Landmark,
  Briefcase,
  Globe,
  Radio,
  BookOpen,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import { parseISO, isValid } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  tag: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  url?: string;
}

interface EnhancedNewsArticle extends NewsArticle {
  aiSummary: string;
  marketImpact: "positive" | "negative" | "neutral";
  impactReason: string;
  isBreaking: boolean;
}

const categoryIcons: Record<string, typeof TrendingUp> = {
  markets: TrendingUp,
  economy: Landmark,
  business: Briefcase,
  banking: Building2,
  commodities: Globe,
  all: Globe,
};

const categories = [
  { id: "all", labelEn: "All News", labelHi: "सभी समाचार" },
  { id: "markets", labelEn: "Markets", labelHi: "बाजार" },
  { id: "economy", labelEn: "Economy", labelHi: "अर्थव्यवस्था" },
  { id: "business", labelEn: "Business", labelHi: "व्यापार" },
  { id: "commodities", labelEn: "Commodities", labelHi: "कमोडिटीज" },
  { id: "banking", labelEn: "Banking", labelHi: "बैंकिंग" },
  { id: "mutualfunds", labelEn: "Mutual Funds", labelHi: "म्यूचुअल फंड" },
];

const breakingKeywords = [
  "crash", "रिजर्व बैंक", "rbi", "fed", "federal reserve", "interest rate",
  "ipo", "results", "quarterly", "sensex", "nifty", "market crash",
  "policy", "budget", "gdp", "inflation", "breaking", "urgent", "alert",
  "sebi", "crisis", "rally", "record high", "record low", "all-time"
];

function getNewsAgeInMinutes(dateString: string): number {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return 999999;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return 0;
    return Math.floor(diffMs / (1000 * 60));
  } catch {
    return 999999;
  }
}

function detectBreakingNews(title: string, summary: string): boolean {
  const combined = (title + " " + summary).toLowerCase();
  return breakingKeywords.some(keyword => combined.includes(keyword.toLowerCase()));
}

function generateAISummary(title: string, summary: string, isHindi: boolean): string {
  const cleanSummary = summary.replace(/<[^>]*>/g, "").trim();
  if (cleanSummary.length < 50) {
    return isHindi 
      ? `${title} - यह खबर शेयर बाजार के लिए महत्वपूर्ण है।`
      : `${title} - This news is important for market participants.`;
  }
  const sentences = cleanSummary.split(/[.।!?]+/).filter(s => s.trim().length > 10);
  const firstTwo = sentences.slice(0, 2).join(". ").trim();
  return firstTwo.length > 20 ? firstTwo + "." : cleanSummary.slice(0, 150) + "...";
}

function analyzeMarketImpact(title: string, summary: string): { impact: "positive" | "negative" | "neutral", reason: string } {
  const combined = (title + " " + summary).toLowerCase();
  
  const positiveKeywords = ["rally", "surge", "gains", "profit", "growth", "rise", "bullish", "record high", "boom", "expansion", "upgrade", "buy"];
  const negativeKeywords = ["crash", "fall", "loss", "decline", "bearish", "record low", "crisis", "downgrade", "sell", "slump", "drop", "weak"];
  
  const positiveScore = positiveKeywords.filter(k => combined.includes(k)).length;
  const negativeScore = negativeKeywords.filter(k => combined.includes(k)).length;
  
  if (positiveScore > negativeScore) {
    return { impact: "positive", reason: "Positive market sentiment indicators detected" };
  } else if (negativeScore > positiveScore) {
    return { impact: "negative", reason: "Negative market sentiment indicators detected" };
  }
  return { impact: "neutral", reason: "Mixed or neutral market signals" };
}

function enhanceNewsArticle(article: NewsArticle, isHindi: boolean): EnhancedNewsArticle {
  const { impact, reason } = analyzeMarketImpact(article.title, article.summary);
  return {
    ...article,
    aiSummary: generateAISummary(article.title, article.summary, isHindi),
    marketImpact: impact,
    impactReason: reason,
    isBreaking: detectBreakingNews(article.title, article.summary),
  };
}

function MarketImpactBadge({ impact, isHindi }: { impact: "positive" | "negative" | "neutral", isHindi: boolean }) {
  const config = {
    positive: { 
      icon: TrendingUp, 
      label: isHindi ? "सकारात्मक" : "Bullish",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
    },
    negative: { 
      icon: TrendingDown, 
      label: isHindi ? "नकारात्मक" : "Bearish",
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800"
    },
    neutral: { 
      icon: Minus, 
      label: isHindi ? "तटस्थ" : "Neutral",
      className: "bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-400 border-gray-200 dark:border-gray-700"
    }
  };
  
  const { icon: Icon, label, className } = config[impact];
  
  return (
    <Badge variant="outline" className={`text-xs ${className}`}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </Badge>
  );
}

function NewsCard({ 
  article,
  isHindi,
  showLive = false,
  isFeatured = false
}: { 
  article: EnhancedNewsArticle;
  isHindi: boolean;
  showLive?: boolean;
  isFeatured?: boolean;
}) {
  const handleClick = () => {
    if (article.url) {
      window.open(article.url, "_blank", "noopener,noreferrer");
    }
  };

  const CategoryIcon = categoryIcons[article.category] || Newspaper;

  if (isFeatured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="col-span-full lg:col-span-2"
      >
        <Card 
          className="cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl bg-card border"
          onClick={handleClick}
          data-testid={`news-card-featured-${article.id}`}
        >
          <div className="md:flex">
            <div className="md:w-1/2 relative">
              {showLive && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-red-600 text-white animate-pulse">
                    <Radio className="w-3 h-3 mr-1" />
                    LIVE
                  </Badge>
                </div>
              )}
              <div className="aspect-video md:aspect-auto md:h-full relative overflow-hidden">
                <img
                  src={article.imageUrl}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800 dark:bg-gray-900/90 dark:text-white text-sm font-medium">
                    {article.source}
                  </Badge>
                </div>
              </div>
            </div>
            
            <CardContent className="md:w-1/2 p-6 flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  <CategoryIcon className="w-3 h-3 mr-1" />
                  {article.category}
                </Badge>
                <MarketImpactBadge impact={article.marketImpact} isHindi={isHindi} />
              </div>
              
              <h2 className="font-bold text-xl md:text-2xl leading-tight line-clamp-3">
                {article.title}
              </h2>
              
              <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">
                {article.aiSummary}
              </p>
              
              <div className="flex items-center justify-between pt-3 border-t gap-2">
                <span className="text-sm text-muted-foreground">
                  {isHindi ? `${article.source} पर पूरी खबर पढ़ें` : `Read full article at ${article.source}`}
                </span>
                <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="cursor-pointer overflow-hidden h-full transition-all duration-300 hover:shadow-lg bg-card border group"
        onClick={handleClick}
        data-testid={`news-card-${article.id}`}
      >
        <div className="relative">
          {showLive && (
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-red-600 text-white animate-pulse">
                <Radio className="w-3 h-3 mr-1" />
                LIVE
              </Badge>
            </div>
          )}
          <div className="aspect-[16/10] relative overflow-hidden">
            <img
              src={article.imageUrl}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="bg-white/90 text-gray-800 dark:bg-gray-900/90 dark:text-white text-xs font-medium">
                {article.source}
              </Badge>
            </div>
          </div>
        </div>
        
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              <CategoryIcon className="w-3 h-3 mr-1" />
              {article.category}
            </Badge>
            <MarketImpactBadge impact={article.marketImpact} isHindi={isHindi} />
          </div>
          
          <h3 className="font-semibold text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {article.aiSummary}
          </p>
          
          <div className="flex items-center justify-between pt-2 gap-2">
            <span className="text-xs text-muted-foreground">
              {isHindi ? `${article.source} पर पढ़ें` : `Read at ${article.source}`}
            </span>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[16/10] w-full" />
      <CardContent className="p-4 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

function FeaturedSkeleton() {
  return (
    <Card className="overflow-hidden col-span-full lg:col-span-2">
      <div className="md:flex">
        <Skeleton className="md:w-1/2 aspect-video md:aspect-auto md:h-64" />
        <CardContent className="md:w-1/2 p-6 space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
        </CardContent>
      </div>
    </Card>
  );
}

const FRESH_NEWS_MAX_AGE_MINS = 90;
const RECENT_NEWS_MAX_AGE_MINS = 180;
const LIVE_BADGE_MAX_AGE_MINS = 5;
const REFRESH_INTERVAL_SECS = 120;

type FreshnessLevel = "fresh" | "recent" | "earlier";

function getNewsFreshnessLevel(ageInMins: number): FreshnessLevel {
  if (ageInMins <= FRESH_NEWS_MAX_AGE_MINS) return "fresh";
  if (ageInMins <= RECENT_NEWS_MAX_AGE_MINS) return "recent";
  return "earlier";
}

export default function LiveNews() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newsLang, setNewsLang] = useState<"en" | "hi" | "gu" | "mr" | "ta" | "te">("en");
  const [refreshCountdown, setRefreshCountdown] = useState(REFRESH_INTERVAL_SECS);
  const [currentTime, setCurrentTime] = useState(new Date());

  const isHindi = language === "hi" || newsLang === "hi";

  const { data, isLoading, error, refetch, isFetching } = useQuery<{ news: NewsArticle[]; fallbackToEnglish?: boolean }>({
    queryKey: ["/api/news", newsLang, selectedCategory],
    queryFn: async () => {
      const res = await fetch(`/api/news?lang=${newsLang}&category=${selectedCategory}`);
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.json();
    },
    refetchInterval: REFRESH_INTERVAL_SECS * 1000,
  });
  
  const showFallbackNotice = data?.fallbackToEnglish && newsLang !== "en";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          return REFRESH_INTERVAL_SECS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const enhancedNews = useMemo(() => {
    if (!data?.news) return [];
    return data.news
      .map(article => enhanceNewsArticle(article, isHindi))
      .sort((a, b) => {
        if (a.isBreaking && !b.isBreaking) return -1;
        if (!a.isBreaking && b.isBreaking) return 1;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
  }, [data?.news, isHindi, currentTime]);

  const { allNews, totalNewsCount, apiItemCount } = useMemo(() => {
    const categoryFiltered = enhancedNews.filter(article => 
      selectedCategory === "all" || article.category === selectedCategory
    );
    
    const apiCount = data?.news?.length || 0;
    
    if (process.env.NODE_ENV === "development") {
      console.log(`[News Debug] API items: ${apiCount}, Filtered: ${categoryFiltered.length}`);
    }
    
    return { 
      allNews: categoryFiltered,
      totalNewsCount: categoryFiltered.length,
      apiItemCount: apiCount
    };
  }, [enhancedNews, selectedCategory, currentTime, data?.news?.length]);

  const showLiveBadge = (article: EnhancedNewsArticle) => {
    const ageInMins = getNewsAgeInMinutes(article.publishedAt);
    return ageInMins <= LIVE_BADGE_MAX_AGE_MINS;
  };

  const formatCountdown = (seconds: number) => {
    return `${seconds}s`;
  };

  return (
    <div className="page-bg">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <Card className="mb-8 border-0 shadow-none bg-transparent">
          <CardHeader className="pb-4 px-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-3 text-2xl sm:text-3xl font-bold" data-testid="live-news-title">
                  <div className="relative">
                    <Newspaper className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  {isHindi ? "लाइव बिज़नेस न्यूज़" : "Live Business News"}
                </CardTitle>
                <p className="text-muted-foreground mt-2 flex items-center gap-2 flex-wrap">
                  {isHindi 
                    ? "रीयल-टाइम वित्तीय समाचार" 
                    : "Real-time financial news updates"}
                  <Badge variant="outline" className="text-xs">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    {formatCountdown(refreshCountdown)}
                  </Badge>
                </p>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex flex-wrap bg-muted rounded-lg p-1 gap-1">
                  <Button
                    variant={newsLang === "en" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setNewsLang("en")}
                    data-testid="news-lang-en"
                  >
                    EN
                  </Button>
                  <Button
                    variant={newsLang === "hi" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setNewsLang("hi")}
                    data-testid="news-lang-hi"
                  >
                    हिंदी
                  </Button>
                  <Button
                    variant={newsLang === "gu" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setNewsLang("gu")}
                    data-testid="news-lang-gu"
                  >
                    ગુજ
                  </Button>
                  <Button
                    variant={newsLang === "mr" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setNewsLang("mr")}
                    data-testid="news-lang-mr"
                  >
                    मराठी
                  </Button>
                  <Button
                    variant={newsLang === "ta" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setNewsLang("ta")}
                    data-testid="news-lang-ta"
                  >
                    தமிழ்
                  </Button>
                  <Button
                    variant={newsLang === "te" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setNewsLang("te")}
                    data-testid="news-lang-te"
                  >
                    తెలుగు
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    refetch();
                    setRefreshCountdown(REFRESH_INTERVAL_SECS);
                  }}
                  disabled={isFetching}
                  data-testid="news-refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </div>
            {showFallbackNotice && (
              <p className="text-xs text-muted-foreground mt-2">
                {isHindi ? "चुनी गई भाषा में समाचार उपलब्ध नहीं है, English में दिखा रहे हैं" : "News in English (selected language not available)"}
              </p>
            )}
          </CardHeader>
          
          <div className="flex flex-wrap gap-2 pb-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                data-testid={`news-category-${cat.id}`}
              >
                {isHindi ? cat.labelHi : cat.labelEn}
              </Button>
            ))}
          </div>
        </Card>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeaturedSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
          </div>
        ) : error ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="py-12 text-center">
              <AlertCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
              <p className="text-lg font-medium mb-2">
                {isHindi 
                  ? "समाचार लोड करने में त्रुटि हुई" 
                  : "Error loading news"}
              </p>
              <p className="text-muted-foreground mb-6">
                {isHindi 
                  ? "कृपया इंटरनेट कनेक्शन चेक करें और पुनः प्रयास करें" 
                  : "Please check your connection and try again"}
              </p>
              <Button onClick={() => refetch()} disabled={isFetching}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
                {isHindi ? "पुनः प्रयास करें" : "Try Again"}
              </Button>
            </CardContent>
          </Card>
        ) : apiItemCount === 0 ? (
          <Card className="max-w-md mx-auto border-dashed">
            <CardContent className="py-12 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                  <Newspaper className="w-10 h-10 text-muted-foreground" />
                </div>
                <RefreshCw className="w-6 h-6 text-primary animate-spin absolute -bottom-1 -right-1" />
              </div>
              <p className="text-xl font-medium mb-2">
                {isHindi 
                  ? "समाचार लोड हो रहे हैं..." 
                  : "Loading news..."}
              </p>
              <p className="text-muted-foreground mb-6">
                {isHindi 
                  ? "कृपया कुछ सेकंड प्रतीक्षा करें" 
                  : "Please wait a few seconds"}
              </p>
              <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
                {isHindi ? "रिफ्रेश करें" : "Refresh Now"}
              </Button>
            </CardContent>
          </Card>
        ) : totalNewsCount === 0 && apiItemCount > 0 ? (
          <Card className="max-w-md mx-auto border-dashed">
            <CardContent className="py-12 text-center">
              <Newspaper className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">
                {isHindi 
                  ? `"${categories.find(c => c.id === selectedCategory)?.labelHi || selectedCategory}" में कोई खबर नहीं मिली` 
                  : `No news found for "${categories.find(c => c.id === selectedCategory)?.labelEn || selectedCategory}"`}
              </p>
              <p className="text-muted-foreground mb-6">
                {isHindi 
                  ? "दूसरी category देखें या 'All News' चुनें" 
                  : "Try another category or select 'All News'"}
              </p>
              <Button variant="outline" onClick={() => setSelectedCategory("all")}>
                {isHindi ? "सभी समाचार देखें" : "View All News"}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {allNews.map((article, index) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  isHindi={isHindi}
                  showLive={showLiveBadge(article)}
                  isFeatured={index === 0}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-10 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 py-4 px-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-slate-500 dark:text-slate-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {isHindi 
                    ? "यह समाचार केवल शैक्षिक उद्देश्यों के लिए है। इसमें कोई निवेश सलाह या खरीद/बिक्री की सिफारिश नहीं है।" 
                    : "This news is for educational purposes only. No investment advice or buy/sell recommendations."}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {isHindi 
                    ? "सभी समाचार सामग्री और कॉपीराइट उनके मूल स्रोतों के हैं। Rotech Shiksha कोई भी समाचार सामग्री का स्वामित्व नहीं रखता। क्लिक करने पर मूल स्रोत वेबसाइट खुलेगी।" 
                    : "All news content and copyrights belong to their original sources. Rotech Shiksha does not claim ownership of any news content. Clicking any article opens the original source website."}
                </p>
              </div>
            </div>
          </div>

          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="py-5 px-5">
              <div className="flex items-start gap-4">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                    {isHindi ? "एक ज़रूरी बात..." : "An important note..."}
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    {isHindi 
                      ? "News dekhna theek hai, par pehle basics seekhna zaroori hai. Bina samjhe trading mat karna!" 
                      : "Reading news is good, but learning basics first is essential. Don't trade without understanding!"}
                  </p>
                  <Button variant="outline" size="sm" className="mt-4 border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300" asChild>
                    <a href="/beginner-course" data-testid="news-cta-learn">
                      {isHindi ? "Basics Seekho" : "Learn Basics"}
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
