import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Newspaper,
  Clock,
  RefreshCw,
  Globe,
  TrendingUp,
  ExternalLink,
  Play,
  Video,
  Tv,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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

interface VideoChannel {
  id: string;
  name: string;
  nameHi: string;
  embedUrl: string;
  description: string;
  descriptionHi: string;
  thumbnail: string;
  isLive: boolean;
}

const globalNewsVideos: VideoChannel[] = [
  {
    id: "reuters",
    name: "Reuters Business",
    nameHi: "रॉयटर्स बिजनेस",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLLGXuJRc4gHDgPGj2fTXt-_NrZ_nxCLXQ&autoplay=0",
    description: "Global business news & market analysis from Reuters",
    descriptionHi: "रॉयटर्स से ग्लोबल बिजनेस न्यूज और मार्केट एनालिसिस",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format",
    isLive: false,
  },
  {
    id: "bloomberg",
    name: "Bloomberg Live",
    nameHi: "ब्लूमबर्ग लाइव",
    embedUrl: "https://www.youtube.com/embed/live_stream?channel=UCIALMKvObZNtJ6AmdCLP7Lg&autoplay=0",
    description: "24/7 live financial news & stock market updates",
    descriptionHi: "24/7 लाइव फाइनेंशियल न्यूज और स्टॉक मार्केट अपडेट",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format",
    isLive: true,
  },
  {
    id: "yahoo-finance",
    name: "Yahoo Finance",
    nameHi: "याहू फाइनेंस",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLrAXtmErZgOeiI1GFiNcRpfQ93_xBH0_E&autoplay=0",
    description: "Stock market insights, expert interviews & trading tips",
    descriptionHi: "स्टॉक मार्केट इनसाइट्स, एक्सपर्ट इंटरव्यू और ट्रेडिंग टिप्स",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format",
    isLive: false,
  },
  {
    id: "cnbc",
    name: "CNBC Latest",
    nameHi: "सीएनबीसी लेटेस्ट",
    embedUrl: "https://www.youtube.com/embed/videoseries?list=PLZHnYvH1qtOYiCgAD0T6Hn5wCTAVNj6MV&autoplay=0",
    description: "US stock market news & global financial updates",
    descriptionHi: "यूएस स्टॉक मार्केट न्यूज और ग्लोबल फाइनेंशियल अपडेट",
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format",
    isLive: false,
  },
];

const indiaNewsVideos: VideoChannel[] = [
  {
    id: "cnbc-tv18",
    name: "CNBC TV18",
    nameHi: "सीएनबीसी टीवी18",
    embedUrl: "https://www.youtube.com/embed/pMt70FYZQtM?autoplay=0",
    description: "India's leading business news channel - Live market updates",
    descriptionHi: "भारत का प्रमुख बिजनेस न्यूज चैनल - लाइव मार्केट अपडेट",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format",
    isLive: true,
  },
  {
    id: "et-now",
    name: "ET Now",
    nameHi: "ईटी नाउ",
    embedUrl: "https://www.youtube.com/embed/2hDgNpNQZ1Y?autoplay=0",
    description: "Economic Times News - Market analysis & expert views",
    descriptionHi: "इकोनॉमिक टाइम्स न्यूज - मार्केट एनालिसिस और एक्सपर्ट व्यूज",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format",
    isLive: true,
  },
  {
    id: "zee-business",
    name: "Zee Business",
    nameHi: "ज़ी बिजनेस",
    embedUrl: "https://www.youtube.com/embed/1nDJf5eUpxg?autoplay=0",
    description: "Hindi business news - Share market & economy updates",
    descriptionHi: "हिंदी बिजनेस न्यूज - शेयर बाजार और अर्थव्यवस्था अपडेट",
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format",
    isLive: true,
  },
  {
    id: "moneycontrol",
    name: "MoneyControl",
    nameHi: "मनीकंट्रोल",
    embedUrl: "https://www.youtube.com/embed/yNXnGxhJu5Y?autoplay=0",
    description: "Stock market analysis, expert interviews & trading ideas",
    descriptionHi: "स्टॉक मार्केट एनालिसिस, एक्सपर्ट इंटरव्यू और ट्रेडिंग आइडियाज",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format",
    isLive: false,
  },
];

export default function LiveNews() {
  const [newsLanguage, setNewsLanguage] = useState<"en" | "hi">("en");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<VideoChannel | null>(null);
  const [activeTab, setActiveTab] = useState<"news" | "videos">("news");
  const queryClient = useQueryClient();
  const { t, language: appLanguage } = useLanguage();

  const openArticle = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const { data: categoriesData } = useQuery<{ categories: NewsCategory[] }>({
    queryKey: ["/api/news/categories"],
    staleTime: 1000 * 60 * 30,
  });

  const { data: newsData, isLoading: isLoadingNews, dataUpdatedAt, isFetching } = useQuery<{ news: NewsArticle[]; language: string; total: number }>({
    queryKey: ["/api/news", newsLanguage, activeCategory],
    queryFn: async () => {
      const res = await fetch(`/api/news?lang=${newsLanguage}&category=${activeCategory}&limit=20`);
      if (!res.ok) throw new Error("Failed to fetch news");
      return res.json();
    },
    refetchInterval: 300000,
  });

  const { data: featuredData, isLoading: isLoadingFeatured } = useQuery<{ featured: NewsArticle; topStories: NewsArticle[]; language: string }>({
    queryKey: ["/api/news/featured", newsLanguage],
    queryFn: async () => {
      const res = await fetch(`/api/news/featured?lang=${newsLanguage}`);
      if (!res.ok) throw new Error("Failed to fetch featured news");
      return res.json();
    },
    refetchInterval: 300000,
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
      return newsLanguage === "hi" ? `${diffMins} मिनट पहले` : `${diffMins} min ago`;
    } else if (diffHours < 24) {
      return newsLanguage === "hi" ? `${diffHours} घंटे पहले` : `${diffHours}h ago`;
    } else {
      return date.toLocaleDateString(newsLanguage === "hi" ? "hi-IN" : "en-IN", {
        day: "numeric",
        month: "short"
      });
    }
  };

  const getCategoryLabel = (cat: NewsCategory) => {
    return newsLanguage === "hi" ? cat.labelHi : cat.labelEn;
  };

  const NewsCardSkeleton = () => (
    <Card className="overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen pt-28 pb-12">
      <section className="py-6 bg-gradient-to-r from-primary/5 via-card/50 to-primary/5 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Newspaper className="w-6 h-6 text-primary" />
                </div>
                {newsLanguage === "hi" ? "लाइव बिजनेस न्यूज़" : "Live Business News"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {newsLanguage === "hi" 
                  ? "ग्लोबल शेयर बाजार और वित्तीय समाचार - रियल-टाइम अपडेट" 
                  : "Global Stock Market & Financial News - Real-time Updates"}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                <Button
                  size="sm"
                  variant={newsLanguage === "en" ? "default" : "ghost"}
                  onClick={() => setNewsLanguage("en")}
                  data-testid="lang-english"
                >
                  <Globe className="w-3 h-3 mr-1" />
                  English
                </Button>
                <Button
                  size="sm"
                  variant={newsLanguage === "hi" ? "default" : "ghost"}
                  onClick={() => setNewsLanguage("hi")}
                  data-testid="lang-hindi"
                >
                  <Globe className="w-3 h-3 mr-1" />
                  हिंदी
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isFetching ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`} />
                  {isFetching ? "Updating..." : "Live"}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lastUpdated.toLocaleTimeString()}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRefresh}
                disabled={isFetching}
                data-testid="button-refresh-news"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
                {newsLanguage === "hi" ? "रिफ्रेश" : "Refresh"}
              </Button>
            </div>
          </motion.div>

          <div className="flex gap-2 mt-4">
            <Button
              variant={activeTab === "news" ? "default" : "outline"}
              onClick={() => setActiveTab("news")}
              className="gap-2"
              data-testid="tab-news"
            >
              <Newspaper className="w-4 h-4" />
              {newsLanguage === "hi" ? "समाचार" : "News"}
            </Button>
            <Button
              variant={activeTab === "videos" ? "default" : "outline"}
              onClick={() => setActiveTab("videos")}
              className="gap-2"
              data-testid="tab-videos"
            >
              <Video className="w-4 h-4" />
              {newsLanguage === "hi" ? "लाइव वीडियो" : "Live Videos"}
            </Button>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeTab === "news" ? (
          <motion.section 
            key="news"
            className="py-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              {featuredNews && (
                <motion.div 
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card 
                    className="lg:col-span-2 overflow-hidden group cursor-pointer hover-elevate" 
                    data-testid="featured-news"
                    onClick={() => openArticle(featuredNews.url)}
                  >
                    <div className="relative h-64 lg:h-80">
                      <img
                        src={featuredNews.imageUrl}
                        alt={featuredNews.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <Badge className="bg-red-600 text-white border-0 animate-pulse">
                          <Zap className="w-3 h-3 mr-1" />
                          {newsLanguage === "hi" ? "ब्रेकिंग" : "BREAKING"}
                        </Badge>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <Badge className="mb-3 bg-primary/90 text-primary-foreground border-0">
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
                      {newsLanguage === "hi" ? "इन फोकस" : "IN FOCUS"}
                    </h3>
                    {topStories.map((story, index) => (
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Card 
                          className="cursor-pointer hover-elevate" 
                          data-testid={`top-story-${story.id}`}
                          onClick={() => openArticle(story.url)}
                        >
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
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
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
                        <NewsCardSkeleton key={i} />
                      ))
                    ) : (
                      news.map((article, index) => (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Card 
                            className="cursor-pointer group border transition-all duration-200 hover:border-primary/50 hover:shadow-md" 
                            data-testid={`news-card-${article.id}`}
                            onClick={() => openArticle(article.url)}
                          >
                            <div className="relative h-40 overflow-hidden rounded-t-md">
                              <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                                data-testid={`news-image-${article.id}`}
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
                                <span className="font-medium">{article.source}</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatTime(article.publishedAt)}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.section>
        ) : (
          <motion.section 
            key="videos"
            className="py-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Globe className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {newsLanguage === "hi" ? "ग्लोबल मार्केट न्यूज वीडियो" : "Global Market News Videos"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {newsLanguage === "hi" 
                        ? "Reuters, Bloomberg, Yahoo Finance से आधिकारिक वीडियो"
                        : "Official videos from Reuters, Bloomberg, Yahoo Finance"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent" data-testid="global-videos-horizontal-scroll">
                  {globalNewsVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="flex-shrink-0 w-[320px] md:w-[380px] snap-start"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card 
                        className="cursor-pointer group border transition-all duration-200 hover:border-primary/50 hover:shadow-md h-full"
                        onClick={() => setSelectedVideo(video)}
                        data-testid={`video-card-${video.id}`}
                      >
                        <div className="relative h-48 bg-muted overflow-hidden rounded-t-md">
                          <img
                            src={video.thumbnail}
                            alt={video.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center" data-testid={`video-play-overlay-${video.id}`}>
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform group-hover:scale-110" data-testid={`video-play-button-${video.id}`}>
                              <Play className="w-8 h-8 text-primary ml-1" />
                            </div>
                          </div>
                          {video.isLive && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-red-600 text-white border-0 animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-white mr-1.5" />
                                LIVE
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-1" data-testid={`video-title-${video.id}`}>
                            {newsLanguage === "hi" ? video.nameHi : video.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`video-description-${video.id}`}>
                            {newsLanguage === "hi" ? video.descriptionHi : video.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-3 mb-6 mt-10">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Tv className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {newsLanguage === "hi" ? "भारत मार्केट न्यूज वीडियो" : "India Market News Videos"}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {newsLanguage === "hi" 
                        ? "CNBC TV18, ET Now, Zee Business से लाइव अपडेट"
                        : "Live updates from CNBC TV18, ET Now, Zee Business"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent" data-testid="india-videos-horizontal-scroll">
                  {indiaNewsVideos.map((video, index) => (
                    <motion.div
                      key={video.id}
                      className="flex-shrink-0 w-[320px] md:w-[380px] snap-start"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card 
                        className="cursor-pointer group border transition-all duration-200 hover:border-primary/50 hover:shadow-md h-full"
                        onClick={() => setSelectedVideo(video)}
                        data-testid={`video-card-india-${video.id}`}
                      >
                        <div className="relative h-48 bg-muted overflow-hidden rounded-t-md">
                          <img
                            src={video.thumbnail}
                            alt={video.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center" data-testid={`video-play-overlay-india-${video.id}`}>
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform group-hover:scale-110" data-testid={`video-play-button-india-${video.id}`}>
                              <Play className="w-8 h-8 text-primary ml-1" />
                            </div>
                          </div>
                          {video.isLive && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-red-600 text-white border-0 animate-pulse">
                                <div className="w-2 h-2 rounded-full bg-white mr-1.5" />
                                LIVE
                              </Badge>
                            </div>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-1" data-testid={`video-title-india-${video.id}`}>
                            {newsLanguage === "hi" ? video.nameHi : video.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`video-description-india-${video.id}`}>
                            {newsLanguage === "hi" ? video.descriptionHi : video.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center md:hidden">
                  {newsLanguage === "hi" ? "← अधिक देखने के लिए स्वाइप करें →" : "← Swipe to see more →"}
                </p>

                <Card className="mt-8 bg-muted/30 border-dashed">
                  <CardContent className="p-6 text-center">
                    <Video className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                    <h3 className="font-semibold mb-2">
                      {newsLanguage === "hi" ? "आधिकारिक स्रोत" : "Official Sources"}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      {newsLanguage === "hi"
                        ? "सभी वीडियो आधिकारिक YouTube चैनलों से सीधे एम्बेड किए गए हैं। कॉपीराइट-सुरक्षित और कानूनी।"
                        : "All videos are embedded directly from official YouTube channels. Copyright-protected and fully legal."}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-8">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {newsLanguage === "hi" 
                ? "अस्वीकरण: यह समाचार केवल शैक्षिक उद्देश्यों के लिए है। निवेश सलाह नहीं है। समाचार GNews API और आधिकारिक स्रोतों से प्राप्त।"
                : "Disclaimer: News is for educational purposes only. Not investment advice. News sourced from GNews API and official sources."}
            </p>
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                GNews API
              </span>
              <span className="flex items-center gap-1">
                <Video className="w-3 h-3" />
                Official YouTube
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {selectedVideo ? (newsLanguage === "hi" ? selectedVideo.nameHi : selectedVideo.name) : "Video Player"}
            </DialogTitle>
            <DialogDescription>
              {selectedVideo ? (newsLanguage === "hi" ? selectedVideo.descriptionHi : selectedVideo.description) : "Watch market news video"}
            </DialogDescription>
          </DialogHeader>
          {selectedVideo && (
            <div className="space-y-0">
              <div className="aspect-video w-full">
                <iframe
                  src={selectedVideo.embedUrl}
                  title={selectedVideo.name}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 border-t">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg">
                      {newsLanguage === "hi" ? selectedVideo.nameHi : selectedVideo.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {newsLanguage === "hi" ? selectedVideo.descriptionHi : selectedVideo.description}
                    </p>
                  </div>
                  {selectedVideo.isLive && (
                    <Badge className="bg-red-600 text-white border-0">
                      <div className="w-2 h-2 rounded-full bg-white mr-1.5 animate-pulse" />
                      LIVE
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
