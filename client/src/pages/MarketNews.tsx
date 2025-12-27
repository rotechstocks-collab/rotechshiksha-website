import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Newspaper, 
  Clock, 
  ExternalLink, 
  RefreshCw,
  TrendingUp,
  Building2,
  Landmark,
  Briefcase,
  Globe,
  ChevronRight
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

function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    if (!isValid(date)) return "";
    return format(date, "dd MMM, HH:mm");
  } catch {
    return "";
  }
}

function NewsCard({ article }: { article: NewsArticle }) {
  const CategoryIcon = categoryIcons[article.category] || Newspaper;
  
  return (
    <Card className="overflow-hidden hover-elevate transition-all duration-200" data-testid={`news-card-${article.id}`}>
      <div className="flex flex-col sm:flex-row">
        {article.imageUrl && (
          <div className="sm:w-48 h-32 sm:h-auto flex-shrink-0">
            <img
              src={article.imageUrl}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format";
              }}
            />
          </div>
        )}
        <CardContent className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              <CategoryIcon className="w-3 h-3 mr-1" />
              {article.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(article.publishedAt)}
            </span>
          </div>
          
          <h3 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2" data-testid={`news-title-${article.id}`}>
            {article.title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {article.summary}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {article.source}
            </span>
            {article.url && (
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-primary flex items-center gap-1 hover:underline"
                data-testid={`news-link-${article.id}`}
              >
                Read More <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

function NewsCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <Skeleton className="sm:w-48 h-32 sm:h-auto" />
        <CardContent className="flex-1 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-3" />
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

  const { data, isLoading, error, refetch, isFetching } = useQuery<{ news: NewsArticle[] }>({
    queryKey: ["/api/news", newsLang, selectedCategory],
    refetchInterval: 5 * 60 * 1000,
  });

  const filteredNews = data?.news?.filter(article => 
    selectedCategory === "all" || article.category === selectedCategory
  ) || [];

  const isHindi = language === "hi";

  return (
    <div className="min-h-screen bg-background">
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
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
              {isHindi 
                ? "📚 यह समाचार केवल शैक्षिक उद्देश्यों के लिए है। इसमें कोई निवेश सलाह या खरीद/बिक्री की सिफारिश नहीं है।" 
                : "📚 This news is for educational purposes only. No investment advice or buy/sell recommendations are provided."}
            </p>
          </CardContent>
        </Card>

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
              <NewsCard key={article.id} article={article} />
            ))
          )}
        </div>

        <Card className="mt-8">
          <CardContent className="py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <p className="font-medium text-sm">
                  {isHindi ? "सीखना जारी रखें" : "Continue Learning"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {isHindi 
                    ? "समाचार पढ़ना अच्छा है, लेकिन basics मजबूत करना ज़रूरी है।" 
                    : "News is good, but building strong basics is essential."}
                </p>
              </div>
              <Button variant="default" size="sm" asChild>
                <a href="/beginner-course" data-testid="news-cta-learn">
                  {isHindi ? "कोर्स देखें" : "View Course"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
