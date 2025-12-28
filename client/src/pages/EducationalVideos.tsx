import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  PlayCircle,
  Clock,
  Search,
  Youtube,
  ExternalLink,
  History,
  ChevronRight,
  BookOpen,
  TrendingUp,
  BarChart3,
  Brain,
  Lightbulb,
  PiggyBank,
  LineChart,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { CharacterAvatar } from "@/components/characters/CharacterAvatar";
import { useLanguage } from "@/context/LanguageContext";
import { videos, playlists, categories, levels, type Video, type Playlist } from "@/data/videos";

const WATCH_HISTORY_KEY = "rotech_video_history";
const CONTINUE_WATCHING_KEY = "rotech_continue_watching";

interface WatchProgress {
  videoId: string;
  timestamp: number;
  watchedAt: string;
}

const categoryIcons: Record<string, typeof BookOpen> = {
  "Basics": BookOpen,
  "Trading": TrendingUp,
  "Investing": PiggyBank,
  "IPO": Lightbulb,
  "Mutual Funds": PiggyBank,
  "Psychology": Brain,
  "Technical Analysis": BarChart3,
};

const levelColors: Record<string, string> = {
  "Beginner": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
  "Intermediate": "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  "Advanced": "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
};

function VideoCard({ video, onPlay }: { video: Video; onPlay: (video: Video) => void }) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
  
  return (
    <Card 
      className="bg-white dark:bg-card border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer group"
      onClick={() => onPlay(video)}
      data-testid={`card-video-${video.id}`}
    >
      <div className="relative aspect-video bg-slate-100 dark:bg-slate-800">
        <img
          src={thumbnailUrl}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
        </div>
        {video.duration && (
          <Badge className="absolute bottom-2 right-2 bg-black/80 text-white border-0 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {video.duration}
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start gap-2 mb-2 flex-wrap">
          <Badge variant="outline" className="text-xs">
            {video.category}
          </Badge>
          <Badge className={`text-xs border-0 ${levelColors[video.level]}`}>
            {video.level}
          </Badge>
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {video.channelName}
        </p>
      </CardContent>
    </Card>
  );
}

function PlaylistSidebar({ 
  playlists, 
  selectedPlaylist, 
  onSelect 
}: { 
  playlists: Playlist[]; 
  selectedPlaylist: string | null; 
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="space-y-1">
      <button
        onClick={() => onSelect(null)}
        className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${
          selectedPlaylist === null 
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" 
            : "hover-elevate text-slate-700 dark:text-slate-300"
        }`}
        data-testid="button-all-videos"
      >
        <LineChart className="w-5 h-5" />
        <span className="font-medium">All Videos</span>
      </button>
      {playlists.map((playlist) => (
        <button
          key={playlist.id}
          onClick={() => onSelect(playlist.id)}
          className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${
            selectedPlaylist === playlist.id 
              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" 
              : "hover-elevate text-slate-700 dark:text-slate-300"
          }`}
          data-testid={`button-playlist-${playlist.id}`}
        >
          <BookOpen className="w-5 h-5" />
          <div>
            <span className="font-medium block">{playlist.name}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">{playlist.videos.length} videos</span>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function EducationalVideos() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [continueWatching, setContinueWatching] = useState<WatchProgress | null>(null);
  const [watchHistory, setWatchHistory] = useState<string[]>([]);
  const [showMobilePlaylists, setShowMobilePlaylists] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      const saved = localStorage.getItem(CONTINUE_WATCHING_KEY);
      if (saved) {
        setContinueWatching(JSON.parse(saved));
      }
    } catch (e) {}
    
    try {
      const history = localStorage.getItem(WATCH_HISTORY_KEY);
      if (history) {
        setWatchHistory(JSON.parse(history));
      }
    } catch (e) {}
  }, []);

  const handlePlayVideo = (video: Video) => {
    setActiveVideo(video);
    
    if (typeof window === "undefined") return;
    
    try {
      const progress: WatchProgress = {
        videoId: video.id,
        timestamp: 0,
        watchedAt: new Date().toISOString(),
      };
      localStorage.setItem(CONTINUE_WATCHING_KEY, JSON.stringify(progress));
      setContinueWatching(progress);
      
      const history = JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || "[]");
      const updated = [video.id, ...history.filter((id: string) => id !== video.id)].slice(0, 10);
      localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(updated));
      setWatchHistory(updated);
    } catch (e) {}
  };

  const filteredVideos = videos.filter((video) => {
    if (selectedPlaylist) {
      const playlist = playlists.find(p => p.id === selectedPlaylist);
      if (!playlist?.videos.includes(video.id)) return false;
    }
    
    if (selectedCategory !== "All" && video.category !== selectedCategory) return false;
    if (selectedLevel !== "All" && video.level !== selectedLevel) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.channelName.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const continueWatchingVideo = continueWatching 
    ? videos.find(v => v.id === continueWatching.videoId) 
    : null;

  const historyVideos = watchHistory
    .map(id => videos.find(v => v.id === id))
    .filter(Boolean) as Video[];

  return (
    <div className="min-h-screen bg-[#f7f9fc] dark:bg-background">
      <SEOHead
        title="Educational Videos – Stock Market Learning | Rotech Shiksha"
        description="Best stock market educational videos in Hindi. Learn trading, investing, IPO, mutual funds from top YouTube educators."
        keywords="stock market videos hindi, trading videos, investing youtube, share market learning"
      />

      <section className="py-10 lg:py-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-card/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <Youtube className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                Educational Videos
              </h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                YouTube pe available best stock market videos — beginners ke liye bilkul simple.
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 flex items-start gap-3">
            <CharacterAvatar character="priya" size="sm" />
            <div>
              <p className="text-sm text-emerald-800 dark:text-emerald-200">
                <span className="font-semibold">Priya:</span> Videos ke saath course bhi follow karo to clarity fast milegi!
              </p>
            </div>
          </div>
        </div>
      </section>

      {continueWatchingVideo && (
        <section className="py-6 bg-blue-50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/30">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-blue-600" />
              <h2 className="font-semibold text-slate-900 dark:text-white">Continue Watching</h2>
            </div>
            <Card 
              className="bg-white dark:bg-card border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handlePlayVideo(continueWatchingVideo)}
              data-testid="card-continue-watching"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="relative w-full sm:w-48 aspect-video sm:aspect-auto sm:h-28 bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                  <img
                    src={`https://img.youtube.com/vi/${continueWatchingVideo.youtubeId}/mqdefault.jpg`}
                    alt={continueWatchingVideo.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <PlayCircle className="w-10 h-10 text-white drop-shadow-lg" />
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1 line-clamp-2">
                    {continueWatchingVideo.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    {continueWatchingVideo.channelName}
                  </p>
                  <Button size="sm" className="gap-2" data-testid="button-resume">
                    <PlayCircle className="w-4 h-4" />
                    Resume
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      <section className="py-4 bg-white dark:bg-card/30 border-b border-gray-200 dark:border-gray-800 sticky top-14 md:top-[102px] z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-50 dark:bg-slate-800 border-gray-200 dark:border-gray-700"
                data-testid="input-search-videos"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[160px] bg-white dark:bg-card" data-testid="select-category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[140px] bg-white dark:bg-card" data-testid="select-level">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="flex-shrink-0"
                data-testid={`chip-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-[200px]">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Playlists
                </h3>
                <PlaylistSidebar 
                  playlists={playlists} 
                  selectedPlaylist={selectedPlaylist} 
                  onSelect={setSelectedPlaylist} 
                />
              </div>
            </div>

            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowMobilePlaylists(!showMobilePlaylists)}
                className="w-full justify-between"
                data-testid="button-toggle-playlists"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {selectedPlaylist 
                    ? playlists.find(p => p.id === selectedPlaylist)?.name 
                    : "All Videos"}
                </span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showMobilePlaylists ? "rotate-90" : ""}`} />
              </Button>
              {showMobilePlaylists && (
                <div className="mt-2 bg-white dark:bg-card rounded-xl border border-gray-200 dark:border-gray-800 p-2">
                  <PlaylistSidebar 
                    playlists={playlists} 
                    selectedPlaylist={selectedPlaylist} 
                    onSelect={(id) => {
                      setSelectedPlaylist(id);
                      setShowMobilePlaylists(false);
                    }} 
                  />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  {selectedPlaylist 
                    ? playlists.find(p => p.id === selectedPlaylist)?.name 
                    : "All Videos"}
                  <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-2">
                    ({filteredVideos.length} videos)
                  </span>
                </h2>
              </div>

              {filteredVideos.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    No videos found
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedLevel("All");
                      setSearchQuery("");
                      setSelectedPlaylist(null);
                    }}
                    data-testid="button-clear-filters"
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredVideos.map((video) => (
                    <VideoCard key={video.id} video={video} onPlay={handlePlayVideo} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {historyVideos.length > 0 && (
        <section className="py-8 bg-white dark:bg-card/30 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <History className="w-4 h-4" />
              Watch History
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {historyVideos.slice(0, 6).map((video) => (
                <div 
                  key={video.id} 
                  className="flex-shrink-0 w-48 cursor-pointer"
                  onClick={() => handlePlayVideo(video)}
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 mb-2">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-2">
                    {video.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Dialog open={!!activeVideo} onOpenChange={() => setActiveVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-lg font-semibold line-clamp-2">
              {activeVideo?.title}
            </DialogTitle>
          </DialogHeader>
          {activeVideo && (
            <div>
              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-4 space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {activeVideo.description}
                </p>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{activeVideo.category}</Badge>
                    <Badge className={`border-0 ${levelColors[activeVideo.level]}`}>
                      {activeVideo.level}
                    </Badge>
                    <span className="text-sm text-slate-500">{activeVideo.channelName}</span>
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                    data-testid="link-watch-on-youtube"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Watch on YouTube
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
