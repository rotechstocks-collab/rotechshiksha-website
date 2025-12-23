import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Newspaper,
  Clock,
  RefreshCw,
  Globe,
  TrendingUp,
  ExternalLink,
} from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  tag: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  url: string;
}

interface NewsCategory {
  id: string;
  labelEn: string;
  labelHi: string;
}

export default function LiveNews() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [activeCategory, setActiveCategory] = useState("all");
  const queryClient = useQueryClient();

  const { data: categoriesData } = useQuery<{ categories: NewsCategory[] }>({
    queryKey: ["/api/news/categories"],
    staleTime: 1000 * 60 * 30,
  });

  const { data: newsData, isLoading: isLoadingNews, dataUpdatedAt } = useQuery<{ news: NewsArticle[]; language: string; total: number }>({
    queryKey: ["/api/news", language, activeCategory],
    queryFn: async () => {
      const res = await fetch(`/api/news?lang=${language}&category=${activeCategory}&limit=20`);
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.json();
    },
    refetchInterval: 60000,
  });

  const { data: featuredData, isLoading: isLoadingFeatured } = useQuery<{ featured: NewsArticle; topStories: NewsArticle[]; language: string }>({
    queryKey: ["/api/news/featured", language],
    queryFn: async () => {
      const res = await fetch(`/api/news/featured?lang=${language}`);
      if (!res.ok) throw new Error("Failed to fetch featured news");
      return res.json();
    },
    refetchInterval: 60000,
  });

  const categories = categoriesData?.categories || [];
  const news = newsData?.news || [];
  const featuredNews = featuredData?.featured || null;
  const topStories = featuredData?.topStories || [];
  const isLoading = isLoadingNews || isLoadingFeatured;
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt) : new Date();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/news"] });
    queryClient.invalidateQueries({ queryKey: ["/api/news/featured"] });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 60) {
      return language === "hi" ? `${diffMins} मिनट पहले` : `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return language === "hi" ? `${diffHours} घंटे पहले` : `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString(language === "hi" ? "hi-IN" : "en-IN", {
        day: "numeric",
        month: "short"
      });
    }
  };

  const getCategoryLabel = (cat: NewsCategory) => {
    return language === "hi" ? cat.labelHi : cat.labelEn;
  };

  return (
    <div className="min-h-screen pt-28">
      <section className="py-6 bg-card/50 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Newspaper className="w-6 h-6 text-primary" />
                {language === "hi" ? "लाइव न्यूज़" : "Live News"}
              </h1>
              <p className="text-muted-foreground">
                {language === "hi" 
                  ? "शेयर बाजार और वित्तीय समाचार" 
                  : "Stock Market & Financial News"}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-md">
                <Button
                  size="sm"
                  variant={language === "en" ? "default" : "ghost"}
                  onClick={() => setLanguage("en")}
                  className="h-8 px-3"
                  data-testid="lang-english"
                >
                  <Globe className="w-3 h-3 mr-1" />
                  English
                </Button>
                <Button
                  size="sm"
                  variant={language === "hi" ? "default" : "ghost"}
                  onClick={() => setLanguage("hi")}
                  className="h-8 px-3"
                  data-testid="lang-hindi"
                >
                  <Globe className="w-3 h-3 mr-1" />
                  हिंदी
                </Button>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {language === "hi" ? "अपडेट:" : "Updated:"} {lastUpdated.toLocaleTimeString()}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRefresh}
                disabled={isLoading}
                data-testid="button-refresh-news"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                {language === "hi" ? "रिफ्रेश" : "Refresh"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {featuredNews && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="lg:col-span-2 overflow-hidden group cursor-pointer hover-elevate" data-testid="featured-news">
                <div className="relative h-64 lg:h-80">
                  <img
                    src={featuredNews.imageUrl}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge className="mb-3 bg-red-600 text-white border-0">
                      {featuredNews.tag}
                    </Badge>
                    <h2 className="text-xl lg:text-2xl font-bold text-white mb-2 line-clamp-2">
                      {featuredNews.title}
                    </h2>
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      {featuredNews.summary}
                    </p>
                    <div className="flex items-center gap-3 text-white/60 text-xs">
                      <span>{featuredNews.source}</span>
                      <span>{formatTime(featuredNews.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  {language === "hi" ? "इन फोकस" : "IN FOCUS"}
                </h3>
                {topStories.map((story) => (
                  <Card key={story.id} className="cursor-pointer hover-elevate" data-testid={`top-story-${story.id}`}>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {story.tag}
                      </Badge>
                      <h4 className="font-medium text-sm line-clamp-2 mb-2">
                        {story.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{story.source}</span>
                        <span>{formatTime(story.publishedAt)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0 mb-6">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid={`category-${cat.id}`}
                >
                  {getCategoryLabel(cat)}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="h-40 bg-muted animate-pulse" />
                      <CardContent className="p-4 space-y-2">
                        <div className="h-4 bg-muted rounded animate-pulse w-1/4" />
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  news.map((article) => (
                    <Card key={article.id} className="overflow-hidden cursor-pointer hover-elevate" data-testid={`news-card-${article.id}`}>
                      <div className="relative h-40">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-primary/90 text-primary-foreground border-0 text-xs">
                            {article.tag}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-sm line-clamp-2 mb-2" data-testid={`news-title-${article.id}`}>
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {article.summary}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{article.source}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(article.publishedAt)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>

          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {language === "hi" 
                  ? "अस्वीकरण: यह समाचार केवल शैक्षिक उद्देश्यों के लिए है। निवेश सलाह नहीं है।"
                  : "Disclaimer: News is for educational purposes only. Not investment advice."}
              </p>
              <Button variant="outline" size="sm" className="mt-2" data-testid="link-moneycontrol">
                <ExternalLink className="w-3 h-3 mr-2" />
                {language === "hi" ? "मनीकंट्रोल पर और पढ़ें" : "Read more on MoneyControl"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
