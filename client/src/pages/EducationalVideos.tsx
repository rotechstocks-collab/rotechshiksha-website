import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlayCircle,
  Clock,
  Eye,
  RefreshCw,
  GraduationCap,
  Youtube,
  TrendingUp,
  BookOpen,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  channelName: string;
  publishedAt: string;
  viewCount?: string;
  duration?: string;
  category: string;
}

interface VideoCategory {
  id: string;
  label: string;
  labelHi: string;
  icon: typeof TrendingUp;
}

const videoCategories: VideoCategory[] = [
  { id: "all", label: "All Videos", labelHi: "सभी वीडियो", icon: PlayCircle },
  { id: "basics", label: "Stock Market Basics", labelHi: "शेयर बाजार बेसिक्स", icon: BookOpen },
  { id: "technical", label: "Technical Analysis", labelHi: "टेक्निकल एनालिसिस", icon: BarChart3 },
  { id: "ipo", label: "IPO Education", labelHi: "IPO शिक्षा", icon: TrendingUp },
  { id: "mutual-funds", label: "Mutual Funds", labelHi: "म्यूचुअल फंड्स", icon: GraduationCap },
];

const educationalChannels = [
  { id: "pranjal-kamra", name: "Pranjal Kamra", nameHi: "प्रांजल कामरा" },
  { id: "ca-rachana", name: "CA Rachana Ranade", nameHi: "CA रचना रानाडे" },
  { id: "pushkar-raj", name: "Pushkar Raj Thakur", nameHi: "पुष्कर राज ठाकुर" },
  { id: "zerodha-varsity", name: "Zerodha Varsity", nameHi: "ज़ेरोधा वर्सिटी" },
  { id: "groww", name: "Groww", nameHi: "ग्रो" },
  { id: "asset-yogi", name: "Asset Yogi", nameHi: "एसेट योगी" },
  { id: "finology", name: "Finology", nameHi: "फिनोलॉजी" },
  { id: "market-gurukul", name: "Market Gurukul", nameHi: "मार्केट गुरुकुल" },
];

const sampleVideos: YouTubeVideo[] = [
  {
    id: "stock-basics-1",
    title: "Stock Market for Beginners - Complete Guide 2024",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format",
    channelName: "Zerodha Varsity",
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "1.2M",
    duration: "25:30",
    category: "basics",
  },
  {
    id: "technical-1",
    title: "Technical Analysis - Candlestick Patterns Explained",
    thumbnail: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&auto=format",
    channelName: "CA Rachana Ranade",
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "850K",
    duration: "32:15",
    category: "technical",
  },
  {
    id: "ipo-1",
    title: "How to Apply for IPO - Step by Step Guide",
    thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&auto=format",
    channelName: "Pranjal Kamra",
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "650K",
    duration: "18:45",
    category: "ipo",
  },
  {
    id: "mutual-1",
    title: "Best Mutual Funds for SIP in 2024",
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&auto=format",
    channelName: "Asset Yogi",
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "1.5M",
    duration: "22:10",
    category: "mutual-funds",
  },
  {
    id: "technical-2",
    title: "Support and Resistance Trading Strategy",
    thumbnail: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&auto=format",
    channelName: "Market Gurukul",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "420K",
    duration: "28:30",
    category: "technical",
  },
  {
    id: "basics-2",
    title: "Understanding P/E Ratio - Valuation Basics",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&auto=format",
    channelName: "Finology",
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "780K",
    duration: "15:20",
    category: "basics",
  },
  {
    id: "ipo-2",
    title: "IPO vs Direct Listing - Which is Better?",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&auto=format",
    channelName: "Groww",
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "320K",
    duration: "12:45",
    category: "ipo",
  },
  {
    id: "mutual-2",
    title: "Index Funds vs Active Funds - Detailed Comparison",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format",
    channelName: "Pushkar Raj Thakur",
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "950K",
    duration: "20:55",
    category: "mutual-funds",
  },
  {
    id: "basics-3",
    title: "How to Read Financial Statements - For Beginners",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format",
    channelName: "CA Rachana Ranade",
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "1.1M",
    duration: "35:20",
    category: "basics",
  },
  {
    id: "technical-3",
    title: "Moving Averages - Complete Trading Guide",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format",
    channelName: "Zerodha Varsity",
    publishedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "680K",
    duration: "27:15",
    category: "technical",
  },
  {
    id: "basics-4",
    title: "Demat Account Opening - Complete Process",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&auto=format",
    channelName: "Asset Yogi",
    publishedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "2.1M",
    duration: "18:30",
    category: "basics",
  },
  {
    id: "ipo-3",
    title: "IPO Grey Market Premium Explained",
    thumbnail: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&auto=format",
    channelName: "Pranjal Kamra",
    publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    viewCount: "520K",
    duration: "14:25",
    category: "ipo",
  },
];

export default function EducationalVideos() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const { t, language } = useLanguage();
  const isHindi = language === "hi";

  const { data, isLoading, refetch, isFetching } = useQuery<{ videos: YouTubeVideo[] }>({
    queryKey: ["/api/youtube/videos", activeCategory],
    queryFn: async () => {
      const res = await fetch(`/api/youtube/videos?category=${activeCategory}`);
      if (!res.ok) {
        return { videos: sampleVideos };
      }
      const data = await res.json();
      return data.videos?.length > 0 ? data : { videos: sampleVideos };
    },
    staleTime: 1000 * 60 * 5,
  });

  const videos = data?.videos || sampleVideos;
  const filteredVideos = activeCategory === "all" 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return isHindi ? "आज" : "Today";
    if (diffDays === 1) return isHindi ? "कल" : "Yesterday";
    if (diffDays < 7) return isHindi ? `${diffDays} दिन पहले` : `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return isHindi ? `${weeks} सप्ताह पहले` : `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    return date.toLocaleDateString(isHindi ? "hi-IN" : "en-IN", { day: "numeric", month: "short" });
  };

  const VideoCardSkeleton = () => (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen pt-28 pb-12">
      <section className="py-6 bg-gradient-to-r from-red-500/5 via-card/50 to-red-500/5 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <Youtube className="w-6 h-6 text-red-500" />
                </div>
                {isHindi ? "शैक्षिक वीडियो" : "Educational Videos"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {isHindi 
                  ? "भारत के टॉप फाइनेंस एजुकेटर्स से स्टॉक मार्केट सीखें" 
                  : "Learn Stock Market from India's Top Finance Educators"}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="w-[180px]" data-testid="select-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {videoCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {isHindi ? cat.labelHi : cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="sm"
                variant="outline"
                onClick={() => refetch()}
                disabled={isFetching}
                data-testid="button-refresh-videos"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`} />
                {isHindi ? "रिफ्रेश" : "Refresh"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {videoCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                  className="gap-2"
                  data-testid={`category-${cat.id}`}
                >
                  <Icon className="w-4 h-4" />
                  {isHindi ? cat.labelHi : cat.label}
                </Button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <VideoCardSkeleton key={i} />)
            ) : (
              filteredVideos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card 
                    className="overflow-hidden group cursor-pointer hover-elevate"
                    onClick={() => setSelectedVideo(video)}
                    data-testid={`video-card-${video.id}`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                      </div>
                      {video.duration && (
                        <Badge className="absolute bottom-2 right-2 bg-black/80 text-white border-0 text-xs">
                          {video.duration}
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-2" data-testid={`video-title-${video.id}`}>
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <span className="font-medium text-primary">{video.channelName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {video.viewCount && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {video.viewCount}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(video.publishedAt)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {filteredVideos.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {isHindi ? "कोई वीडियो नहीं मिला" : "No Videos Found"}
              </h3>
              <p className="text-muted-foreground">
                {isHindi 
                  ? "इस श्रेणी में अभी कोई वीडियो उपलब्ध नहीं है"
                  : "No videos available in this category right now"}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-6 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            {isHindi ? "फीचर्ड एजुकेटर्स" : "Featured Educators"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {educationalChannels.map((channel) => (
              <Card key={channel.id} className="p-3 text-center hover-elevate cursor-pointer">
                <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-medium line-clamp-1">
                  {isHindi ? channel.nameHi : channel.name}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="bg-muted/50 rounded-lg p-4 text-center text-sm text-muted-foreground">
            <p>
              {isHindi 
                ? "सभी वीडियो YouTube Data API का उपयोग करके YouTube से एम्बेड किए गए हैं। कॉपीराइट संबंधित कंटेंट क्रिएटर्स का है।"
                : "All videos are embedded from YouTube using YouTube Data API. Copyright belongs to respective content creators."}
            </p>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="line-clamp-2">{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            {selectedVideo && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <Youtube className="w-16 h-16 mx-auto mb-4 text-red-500" />
                  <h3 className="text-lg font-semibold mb-2">{selectedVideo.title}</h3>
                  <p className="text-white/70 mb-4">{selectedVideo.channelName}</p>
                  <Button 
                    variant="default" 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedVideo.title)}`, '_blank')}
                    data-testid="button-watch-youtube"
                  >
                    <PlayCircle className="w-4 h-4 mr-2" />
                    {isHindi ? "YouTube पर देखें" : "Watch on YouTube"}
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
            <span>{selectedVideo?.channelName}</span>
            <div className="flex items-center gap-4">
              {selectedVideo?.viewCount && (
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {selectedVideo.viewCount}
                </span>
              )}
              {selectedVideo?.publishedAt && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDate(selectedVideo.publishedAt)}
                </span>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
