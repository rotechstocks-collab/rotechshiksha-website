import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  BookOpen,
  AlertCircle,
  X
} from "lucide-react";
import { format, parseISO, isValid } from "date-fns";

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
  { id: "all", labelEn: "All", labelHi: "सभी" },
  { id: "markets", labelEn: "Markets", labelHi: "बाजार" },
  { id: "economy", labelEn: "Economy", labelHi: "अर्थव्यवस्था" },
  { id: "business", labelEn: "Business", labelHi: "व्यापार" },
  { id: "banking", labelEn: "Banking", labelHi: "बैंकिंग" },
];

const liveVideoSources = [
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
  }
];

function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "";
    return format(date, "dd MMM yyyy, HH:mm");
  } catch {
    return "";
  }
}

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

function NewsCard({ 
  article, 
  onClick 
}: { 
  article: NewsArticle; 
  onClick: () => void;
}) {
  const CategoryIcon = categoryIcons[article.category] || Newspaper;
  
  return (
    <Card 
      className="overflow-hidden hover-elevate transition-all duration-200 cursor-pointer" 
      onClick={onClick}
      data-testid={`news-card-${article.id}`}
    >
      <div className="flex flex-col sm:flex-row">
        {article.imageUrl && (
          <div className="sm:w-40 h-28 sm:h-auto flex-shrink-0 relative">
            <img
              src={article.imageUrl}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent sm:hidden" />
          </div>
        )}
        <CardContent className="flex-1 p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">
              <CategoryIcon className="w-3 h-3 mr-1" />
              {article.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(article.publishedAt)}
            </span>
          </div>
          
          <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors" data-testid={`news-title-${article.id}`}>
            {article.title}
          </h3>
          
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
            {article.summary}
          </p>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">
              {article.source}
            </span>
            <span className="text-xs text-primary flex items-center gap-1">
              Read More <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </CardContent>
      </div>
    </Card>
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
  const [selectedVideo, setSelectedVideo] = useState(liveVideoSources[0]);

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover-elevate py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-red-500" />
                <CardTitle className="text-base">
                  {isHindi ? "लाइव मार्केट वीडियो" : "Live Market Video"}
                </CardTitle>
                <Badge variant="outline" className="text-xs text-red-500 border-red-200">
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
            <div className="flex flex-wrap gap-2 mb-4">
              {liveVideoSources.map((source) => (
                <Button
                  key={source.id}
                  variant={selectedVideo.id === source.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedVideo(source)}
                  data-testid={`video-source-${source.id}`}
                >
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
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <Skeleton className="sm:w-40 h-28 sm:h-auto" />
        <CardContent className="flex-1 p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-2" />
          <div className="flex justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default function MarketNews() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newsLang, setNewsLang] = useState<"en" | "hi">("en");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, error, refetch, isFetching } = useQuery<{ news: NewsArticle[] }>({
    queryKey: ["/api/news", newsLang, selectedCategory],
    refetchInterval: 3 * 60 * 1000,
  });

  const filteredNews = data?.news?.filter(article => 
    selectedCategory === "all" || article.category === selectedCategory
  ) || [];

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
    <div className="page-bg">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl" data-testid="market-news-title">
                  <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  {isHindi ? "बाजार समाचार" : "Market News"}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {isHindi 
                    ? "शैक्षिक उद्देश्यों के लिए वित्तीय समाचार" 
                    : "Financial news for educational purposes"}
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
                  onClick={() => refetch()}
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

        <LiveVideoSection isHindi={isHindi} />

        <div className="space-y-4">
          {isLoading ? (
            <>
              <NewsCardSkeleton />
              <NewsCardSkeleton />
              <NewsCardSkeleton />
              <NewsCardSkeleton />
            </>
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
            filteredNews.map((article) => (
              <NewsCard 
                key={article.id} 
                article={article} 
                onClick={() => handleNewsClick(article)}
              />
            ))
          )}
        </div>

        <Card className="mt-8 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
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
