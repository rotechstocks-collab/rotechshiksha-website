import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Newspaper, 
  Clock, 
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  Building2,
  Landmark,
  Briefcase,
  Globe,
  ChevronDown,
  ChevronUp,
  Radio,
  BookOpen,
  AlertCircle,
  Tv,
  Video,
  Zap,
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
  timeAgoIST: string;
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

const globalVideoSources = [
  {
    id: "reuters",
    name: "Reuters Business",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLJaF4HNr0FDvJwf3Mc9XFmfQSAD5B9W_t&autoplay=0",
    description: "Global business news from Reuters"
  },
  {
    id: "bloomberg",
    name: "Bloomberg",
    embedUrl: "https://www.youtube.com/embed/dp8PhLsUcFE?autoplay=0",
    description: "Bloomberg Markets & Finance"
  },
  {
    id: "yahoo",
    name: "Yahoo Finance",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLLfPm1Wx-r1TP5FPiRvAVJWHdxDWDZ5HQ&autoplay=0",
    description: "Yahoo Finance latest coverage"
  },
];

const indiaVideoSources = [
  {
    id: "cnbc-tv18",
    name: "CNBC TV18",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLRobyhBNydbVmhPjLxeO1IVfzMKVq2nE1&autoplay=0",
    description: "Live business news from India"
  },
  {
    id: "et-now",
    name: "ET Now",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLe5fMNDMYxFHbMEAdQrHkMxCTxT7cTVmu&autoplay=0",
    description: "Economic Times coverage"
  },
  {
    id: "zee-business",
    name: "Zee Business",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLubMQr-EwQjO1gJnLQvJfVL5jS2U3bXHc&autoplay=0",
    description: "Hindi business news"
  },
  {
    id: "moneycontrol",
    name: "MoneyControl",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLbuFOeSP2s3WlDl1-SaJIm1ddaQ9c-UrO&autoplay=0",
    description: "MoneyControl market updates"
  },
];

const breakingKeywords = [
  "crash", "रिजर्व बैंक", "rbi", "fed", "federal reserve", "interest rate",
  "ipo", "results", "quarterly", "sensex", "nifty", "market crash",
  "policy", "budget", "gdp", "inflation", "breaking", "urgent", "alert",
  "sebi", "crisis", "rally", "record high", "record low", "all-time"
];

function formatTimeAgoIST(dateString: string, isHindi: boolean): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "";
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) {
      return isHindi ? "अभी" : "Just now";
    }
    if (diffMins < 5) {
      return isHindi ? `${diffMins} मिनट पहले` : `${diffMins} min ago`;
    }
    if (diffMins < 60) {
      return isHindi ? `${diffMins} मिनट पहले` : `${diffMins} min ago`;
    }
    if (diffHours < 24) {
      return isHindi ? `${diffHours} घंटे पहले` : `${diffHours}h ago`;
    }
    return isHindi ? `${diffDays} दिन पहले` : `${diffDays}d ago`;
  } catch {
    return "";
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
    timeAgoIST: formatTimeAgoIST(article.publishedAt, isHindi),
  };
}

function MarketImpactBadge({ impact, isHindi }: { impact: "positive" | "negative" | "neutral", isHindi: boolean }) {
  const config = {
    positive: { 
      icon: TrendingUp, 
      label: isHindi ? "सकारात्मक" : "Positive",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
    },
    negative: { 
      icon: TrendingDown, 
      label: isHindi ? "नकारात्मक" : "Negative",
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
  isHindi
}: { 
  article: EnhancedNewsArticle;
  isHindi: boolean;
}) {
  const handleClick = () => {
    if (article.url) {
      window.open(article.url, "_blank", "noopener,noreferrer");
    }
  };

  const CategoryIcon = categoryIcons[article.category] || Newspaper;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className={`cursor-pointer overflow-hidden h-full transition-shadow hover:shadow-lg ${
          article.isBreaking ? "ring-2 ring-red-500 dark:ring-red-400" : ""
        }`}
        onClick={handleClick}
        data-testid={`news-card-${article.id}`}
      >
        <div className="relative">
          {article.isBreaking && (
            <div className="absolute top-2 left-2 z-10">
              <Badge className="bg-red-600 text-white animate-pulse">
                <Zap className="w-3 h-3 mr-1" />
                {isHindi ? "ब्रेकिंग" : "BREAKING"}
              </Badge>
            </div>
          )}
          <div className="aspect-video relative overflow-hidden">
            <img
              src={article.imageUrl}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <Badge variant="secondary" className="bg-black/60 text-white text-xs">
                {article.source}
              </Badge>
              <span className="text-white/90 text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.timeAgoIST}
              </span>
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
          
          <h3 className="font-semibold text-base line-clamp-2 leading-tight">
            {article.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {article.aiSummary}
          </p>
          
          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-xs text-muted-foreground">
              {isHindi ? "मार्केट इम्पैक्ट:" : "Market Impact:"} {article.impactReason.slice(0, 30)}...
            </span>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function LiveVideoSection({ isHindi }: { isHindi: boolean }) {
  const [isOpen, setIsOpen] = useState(true);
  const [videoType, setVideoType] = useState<"india" | "global">("india");
  const [selectedVideo, setSelectedVideo] = useState(indiaVideoSources[0]);

  const currentSources = videoType === "india" ? indiaVideoSources : globalVideoSources;

  useEffect(() => {
    setSelectedVideo(currentSources[0]);
  }, [videoType]);

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover-elevate py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Tv className="w-5 h-5 text-red-500" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </div>
                <CardTitle className="text-base">
                  {isHindi ? "लाइव मार्केट वीडियो" : "Live Market Videos"}
                </CardTitle>
                <Badge variant="outline" className="text-xs text-red-500 border-red-200">
                  <Radio className="w-3 h-3 mr-1" />
                  LIVE
                </Badge>
              </div>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="flex gap-2 mb-4">
              <Button
                variant={videoType === "india" ? "default" : "outline"}
                size="sm"
                onClick={() => setVideoType("india")}
                data-testid="video-type-india"
              >
                {isHindi ? "भारत" : "India"}
              </Button>
              <Button
                variant={videoType === "global" ? "default" : "outline"}
                size="sm"
                onClick={() => setVideoType("global")}
                data-testid="video-type-global"
              >
                {isHindi ? "ग्लोबल" : "Global"}
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {currentSources.map((source) => (
                <Button
                  key={source.id}
                  variant={selectedVideo.id === source.id ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedVideo(source)}
                  data-testid={`video-source-${source.id}`}
                >
                  <Video className="w-3 h-3 mr-1" />
                  {source.name}
                </Button>
              ))}
            </div>
            
            <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">
              <iframe
                src={selectedVideo.embedUrl}
                title={selectedVideo.name}
                className="w-full h-full"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
            
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {selectedVideo.description}
            </p>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-4 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

export default function LiveNews() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newsLang, setNewsLang] = useState<"en" | "hi">("en");
  const [refreshCountdown, setRefreshCountdown] = useState(300);

  const isHindi = language === "hi" || newsLang === "hi";

  const { data, isLoading, error, refetch, isFetching } = useQuery<{ news: NewsArticle[] }>({
    queryKey: ["/api/news", newsLang, selectedCategory],
    refetchInterval: 5 * 60 * 1000,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          return 300;
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
  }, [data?.news, isHindi]);

  const filteredNews = useMemo(() => {
    return enhancedNews.filter(article => 
      selectedCategory === "all" || article.category === selectedCategory
    );
  }, [enhancedNews, selectedCategory]);

  const breakingNews = filteredNews.filter(n => n.isBreaking);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl" data-testid="live-news-title">
                  <div className="relative">
                    <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  {isHindi ? "लाइव बिज़नेस न्यूज़" : "Live Business News"}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2 flex-wrap">
                  {isHindi 
                    ? "रीयल-टाइम वित्तीय समाचार • IST टाइमज़ोन" 
                    : "Real-time financial news • IST Timezone"}
                  <Badge variant="outline" className="text-xs">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    {formatCountdown(refreshCountdown)}
                  </Badge>
                </p>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex bg-muted rounded-md p-1">
                  <Button
                    variant={newsLang === "en" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setNewsLang("en")}
                    data-testid="news-lang-en"
                  >
                    English
                  </Button>
                  <Button
                    variant={newsLang === "hi" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setNewsLang("hi")}
                    data-testid="news-lang-hi"
                  >
                    हिंदी
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    refetch();
                    setRefreshCountdown(300);
                  }}
                  disabled={isFetching}
                  data-testid="news-refresh"
                >
                  <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
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
          </CardContent>
        </Card>

        <Card className="mb-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardContent className="py-3 px-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
                {isHindi 
                  ? "यह समाचार केवल शैक्षिक उद्देश्यों के लिए है। इसमें कोई निवेश सलाह या खरीद/बिक्री की सिफारिश नहीं है। क्लिक करने पर मूल स्रोत वेबसाइट खुलेगी।" 
                  : "This news is for educational purposes only. No investment advice or buy/sell recommendations. Clicking opens original source website."}
              </p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="news" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 max-w-xs">
            <TabsTrigger value="news" data-testid="tab-news">
              <Newspaper className="w-4 h-4 mr-2" />
              {isHindi ? "समाचार" : "News"}
            </TabsTrigger>
            <TabsTrigger value="videos" data-testid="tab-videos">
              <Tv className="w-4 h-4 mr-2" />
              {isHindi ? "वीडियो" : "Videos"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="news" className="mt-4">
            {breakingNews.length > 0 && (
              <Card className="mb-6 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
                <CardHeader className="py-3">
                  <CardTitle className="text-base flex items-center gap-2 text-red-700 dark:text-red-400">
                    <Zap className="w-4 h-4" />
                    {isHindi ? "ब्रेकिंग न्यूज़" : "Breaking News"}
                    <Badge className="bg-red-600 text-white animate-pulse ml-2">
                      {breakingNews.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {breakingNews.slice(0, 3).map((article) => (
                      <div 
                        key={article.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover-elevate cursor-pointer"
                        onClick={() => article.url && window.open(article.url, "_blank", "noopener,noreferrer")}
                      >
                        <Zap className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm font-medium line-clamp-1">{article.title}</span>
                        <span className="text-xs text-muted-foreground flex-shrink-0">{article.timeAgoIST}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <NewsCardSkeleton />
                <NewsCardSkeleton />
                <NewsCardSkeleton />
                <NewsCardSkeleton />
                <NewsCardSkeleton />
                <NewsCardSkeleton />
              </div>
            ) : error ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">
                    {isHindi 
                      ? "समाचार लोड करने में त्रुटि। कृपया पुनः प्रयास करें।" 
                      : "Error loading news. Please try again."}
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => refetch()}>
                    {isHindi ? "पुनः प्रयास करें" : "Try Again"}
                  </Button>
                </CardContent>
              </Card>
            ) : filteredNews.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Newspaper className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {isHindi 
                      ? "इस श्रेणी में कोई समाचार नहीं मिला।" 
                      : "No news found in this category."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {filteredNews.map((article) => (
                    <NewsCard
                      key={article.id}
                      article={article}
                      isHindi={isHindi}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="videos" className="mt-4">
            <LiveVideoSection isHindi={isHindi} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {isHindi ? "ग्लोबल मार्केट वीडियो" : "Global Market Videos"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {globalVideoSources.map((source) => (
                    <div 
                      key={source.id}
                      className="flex items-center justify-between p-2 rounded hover-elevate"
                    >
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{source.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {source.description.split(" ")[0]}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {isHindi ? "भारतीय मार्केट वीडियो" : "India Market Videos"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {indiaVideoSources.map((source) => (
                    <div 
                      key={source.id}
                      className="flex items-center justify-between p-2 rounded hover-elevate"
                    >
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{source.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs text-red-500 border-red-200">
                        LIVE
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="py-4 px-4">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                  {isHindi ? "एक ज़रूरी बात..." : "An important note..."}
                </p>
                <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                  {isHindi 
                    ? "News dekhna theek hai, par pehle basics seekhna zaroori hai. Bina samjhe trading mat karna!" 
                    : "Reading news is good, but learning basics first is essential. Don't trade without understanding!"}
                </p>
                <Button variant="outline" size="sm" className="mt-3 border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300" asChild>
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
  );
}
