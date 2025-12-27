import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  Building2,
  Landmark,
  Briefcase,
  Globe,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Radio,
  BookOpen,
  AlertCircle,
  Tv,
  Video
} from "lucide-react";
import { format, parseISO, isValid } from "date-fns";
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

const categoryIcons: Record<string, typeof TrendingUp> = {
  markets: TrendingUp,
  economy: Landmark,
  business: Briefcase,
  banking: Building2,
  all: Globe,
};

const categories = [
  { id: "all", labelEn: "All News", labelHi: "सभी समाचार" },
  { id: "markets", labelEn: "Markets", labelHi: "बाजार" },
  { id: "economy", labelEn: "Economy", labelHi: "अर्थव्यवस्था" },
  { id: "business", labelEn: "Business", labelHi: "व्यापार" },
  { id: "banking", labelEn: "Banking", labelHi: "बैंकिंग" },
  { id: "mutualfunds", labelEn: "Mutual Funds", labelHi: "म्यूचुअल फंड" },
];

const globalVideoSources = [
  {
    id: "reuters",
    name: "Reuters Business",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLJaF4HNr0FDvJwf3Mc9XFmfQSAD5B9W_t",
    description: "Global business news from Reuters"
  },
  {
    id: "bloomberg",
    name: "Bloomberg",
    embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCIALMKvObZNtJ6AmdCLP7Lg",
    description: "Bloomberg 24/7 live stream"
  },
  {
    id: "yahoo",
    name: "Yahoo Finance",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLLfPm1Wx-r1TP5FPiRvAVJWHdxDWDZ5HQ",
    description: "Yahoo Finance latest coverage"
  },
  {
    id: "cnbc",
    name: "CNBC",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLLQzj3WPHZR9BEL2Y3J7tpU8tDW3cyhKo",
    description: "CNBC business news"
  },
];

const indiaVideoSources = [
  {
    id: "cnbc-tv18",
    name: "CNBC TV18",
    embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCGkpbKZi9vYJq4B3y9IWC4g",
    description: "Live business news from India"
  },
  {
    id: "et-now",
    name: "ET Now",
    embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCRDXrDBYxT_2lKr7PNWEKhw",
    description: "Economic Times live coverage"
  },
  {
    id: "zee-business",
    name: "Zee Business",
    embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCXy1N2Y-GFGBmST8Mb5a1lA",
    description: "Hindi business news"
  },
  {
    id: "moneycontrol",
    name: "MoneyControl",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLbuFOeSP2s3WlDl1-SaJIm1ddaQ9c-UrO",
    description: "MoneyControl market updates"
  },
];

function formatTimeAgo(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "";
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  } catch {
    return "";
  }
}

function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "";
    return format(date, "dd MMM yyyy, HH:mm");
  } catch {
    return "";
  }
}

function FeaturedNewsCard({ 
  article, 
  onClick 
}: { 
  article: NewsArticle; 
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
      data-testid={`featured-news-${article.id}`}
    >
      <div className="aspect-video relative">
        <img
          src={article.imageUrl}
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <Badge variant="secondary" className="mb-2 bg-primary/90 text-primary-foreground">
            {article.category}
          </Badge>
          <h2 className="text-white font-bold text-lg sm:text-xl mb-2 line-clamp-2">
            {article.title}
          </h2>
          <div className="flex items-center gap-3 text-white/80 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(article.publishedAt)}
            </span>
            <span>{article.source}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NewsListItem({ 
  article, 
  onClick,
  index
}: { 
  article: NewsArticle; 
  onClick: () => void;
  index: number;
}) {
  const CategoryIcon = categoryIcons[article.category] || Newspaper;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex gap-3 p-3 rounded-lg hover-elevate cursor-pointer border-b last:border-0"
      onClick={onClick}
      data-testid={`news-item-${article.id}`}
    >
      {article.imageUrl && (
        <div className="w-20 h-16 flex-shrink-0 rounded overflow-hidden">
          <img
            src={article.imageUrl}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=200&auto=format";
            }}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs px-1.5 py-0">
            <CategoryIcon className="w-2.5 h-2.5 mr-0.5" />
            {article.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatTimeAgo(article.publishedAt)}
          </span>
        </div>
        <h3 className="font-medium text-sm line-clamp-2">
          {article.title}
        </h3>
      </div>
    </motion.div>
  );
}

function NewsDetailModal({ 
  article, 
  isOpen, 
  onClose,
  isHindi
}: { 
  article: NewsArticle | null; 
  isOpen: boolean;
  onClose: () => void;
  isHindi: boolean;
}) {
  if (!article) return null;

  const CategoryIcon = categoryIcons[article.category] || Newspaper;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">
              <CategoryIcon className="w-3 h-3 mr-1" />
              {article.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDate(article.publishedAt)}
            </span>
          </div>
          <DialogTitle className="text-lg sm:text-xl leading-tight">
            {article.title}
          </DialogTitle>
        </DialogHeader>
        
        {article.imageUrl && (
          <div className="w-full h-48 sm:h-64 rounded-md overflow-hidden my-4">
            <img
              src={article.imageUrl}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format";
              }}
            />
          </div>
        )}

        <div className="space-y-4">
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            {article.summary}
          </p>

          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="py-3 px-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-800 dark:text-amber-200">
                  {isHindi 
                    ? "यह समाचार केवल शैक्षिक उद्देश्यों के लिए है। इसमें कोई निवेश सलाह या खरीद/बिक्री की सिफारिश नहीं है।" 
                    : "This news is for educational purposes only. No investment advice or buy/sell recommendations are provided."}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm text-muted-foreground">
              Source: {article.source}
            </span>
            <Button variant="outline" size="sm" onClick={onClose}>
              {isHindi ? "बंद करें" : "Close"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LiveVideoSection({ isHindi }: { isHindi: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
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
            
            <div className="aspect-video w-full rounded-md overflow-hidden bg-muted">
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
    <div className="flex gap-3 p-3">
      <Skeleton className="w-20 h-16 rounded" />
      <div className="flex-1">
        <div className="flex gap-2 mb-1">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default function LiveNews() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newsLang, setNewsLang] = useState<"en" | "hi">("en");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCountdown, setRefreshCountdown] = useState(60);

  const { data, isLoading, error, refetch, isFetching } = useQuery<{ news: NewsArticle[] }>({
    queryKey: ["/api/news", newsLang, selectedCategory],
    refetchInterval: 60 * 1000,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredNews = data?.news?.filter(article => 
    selectedCategory === "all" || article.category === selectedCategory
  ) || [];

  const featuredNews = filteredNews[0];
  const restNews = filteredNews.slice(1);

  const isHindi = language === "hi";

  const handleNewsClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl" data-testid="live-news-title">
                  <div className="relative">
                    <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  {isHindi ? "लाइव न्यूज़" : "Live News"}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                  {isHindi 
                    ? "रीयल-टाइम वित्तीय समाचार" 
                    : "Real-time financial news updates"}
                  <Badge variant="outline" className="text-xs">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    {refreshCountdown}s
                  </Badge>
                </p>
              </div>
              
              <div className="flex items-center gap-2">
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
                    setRefreshCountdown(60);
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
                  ? "यह समाचार केवल शैक्षिक उद्देश्यों के लिए है। इसमें कोई निवेश सलाह या खरीद/बिक्री की सिफारिश नहीं है।" 
                  : "This news is for educational purposes only. No investment advice or buy/sell recommendations are provided."}
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
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="aspect-video w-full rounded-lg" />
                <Card>
                  <CardContent className="p-0">
                    <NewsCardSkeleton />
                    <NewsCardSkeleton />
                    <NewsCardSkeleton />
                  </CardContent>
                </Card>
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  {featuredNews && (
                    <FeaturedNewsCard 
                      article={featuredNews} 
                      onClick={() => handleNewsClick(featuredNews)}
                    />
                  )}
                  
                  <Card className="mt-4">
                    <CardHeader className="py-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        {isHindi ? "इन फोकस में" : "In Focus"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <AnimatePresence>
                        {restNews.slice(0, 5).map((article, index) => (
                          <NewsListItem
                            key={article.id}
                            article={article}
                            onClick={() => handleNewsClick(article)}
                            index={index}
                          />
                        ))}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <Card>
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">
                        {isHindi ? "अन्य समाचार" : "More News"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 max-h-[600px] overflow-y-auto">
                      <AnimatePresence>
                        {restNews.slice(5).map((article, index) => (
                          <NewsListItem
                            key={article.id}
                            article={article}
                            onClick={() => handleNewsClick(article)}
                            index={index}
                          />
                        ))}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </div>
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
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <NewsDetailModal 
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isHindi={isHindi}
      />
    </div>
  );
}
