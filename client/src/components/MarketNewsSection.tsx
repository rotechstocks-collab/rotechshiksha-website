import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import {
  Newspaper,
  Clock,
  ExternalLink,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from "./AnimationWrappers";

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

function NewsCardSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  return `${diffDays}d ago`;
}

function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  const categoryColors: Record<string, string> = {
    Markets: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    Economy: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    Business: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    Commodities: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    Banking: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    Auto: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    "Mutual Funds": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card 
        className="h-full hover-elevate cursor-pointer group transition-all duration-200"
        data-testid={`news-card-${article.id}`}
      >
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <Badge 
              variant="outline" 
              className={`text-xs ${categoryColors[article.category] || "bg-muted text-muted-foreground"}`}
            >
              {article.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(article.publishedAt)}
            </span>
          </div>
          
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {article.title}
          </h3>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {article.summary}
          </p>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-xs text-muted-foreground font-medium">
              {article.source}
            </span>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary flex items-center gap-1 hover:underline"
              onClick={(e) => e.stopPropagation()}
              data-testid={`news-link-${article.id}`}
            >
              Read More
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface MarketNewsSectionProps {
  limit?: number;
  showTitle?: boolean;
  className?: string;
}

export function MarketNewsSection({ limit = 6, showTitle = true, className = "" }: MarketNewsSectionProps) {
  const { data: articles, isLoading, error, refetch, isRefetching } = useQuery<NewsArticle[]>({
    queryKey: ["/api/news", "en", limit],
    refetchInterval: 5 * 60 * 1000,
    staleTime: 3 * 60 * 1000,
  });

  if (error) {
    return (
      <FadeInUp className={className}>
        <Card className="p-6 text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground mb-3">Unable to load market news</p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try Again
          </Button>
        </Card>
      </FadeInUp>
    );
  }

  return (
    <div className={className}>
      {showTitle && (
        <FadeInUp className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A90E2] to-[#4ECDC4] text-white flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Newspaper className="w-6 h-6" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-foreground">Market News</h2>
              <p className="text-sm text-muted-foreground">Latest updates from Indian stock markets</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => refetch()}
              disabled={isRefetching}
              data-testid="button-refresh-news"
            >
              <RefreshCw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
            </Button>
            <Link href="/live-news">
              <Button variant="outline" size="sm" className="gap-1" data-testid="link-view-all-news">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </FadeInUp>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(articles || []).slice(0, limit).map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>
      )}
      
      {!isLoading && (!articles || articles.length === 0) && (
        <Card className="p-8 text-center">
          <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No news articles available at the moment</p>
        </Card>
      )}
    </div>
  );
}
