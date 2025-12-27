import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, BookOpen, TrendingUp } from "lucide-react";

interface ProgressData {
  completedLevels: number[];
  progressPercentage: number;
  bestScores: Record<number, number>;
  totalLevels: number;
}

interface LearningProgressProps {
  currentLevel: number;
  showFullProgress?: boolean;
}

export function LearningProgress({ currentLevel, showFullProgress = false }: LearningProgressProps) {
  const { data: progress, isLoading } = useQuery<ProgressData>({
    queryKey: ['/api/progress'],
  });

  if (isLoading) {
    return (
      <div className="animate-pulse h-12 bg-muted rounded-lg" />
    );
  }

  const completedLevels = progress?.completedLevels || [];
  const progressPercentage = progress?.progressPercentage || 0;
  const bestScores = progress?.bestScores || {};
  const isCurrentLevelComplete = completedLevels.includes(currentLevel);
  const currentLevelBestScore = bestScores[currentLevel];

  if (showFullProgress) {
    return (
      <div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="font-medium">Your Learning Journey</span>
          </div>
          <Badge variant="secondary">
            {completedLevels.length}/8 Levels Complete
          </Badge>
        </div>
        
        <Progress value={progressPercentage} className="h-2" />
        
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }, (_, i) => i + 1).map((level) => {
            const isComplete = completedLevels.includes(level);
            const bestScore = bestScores[level];
            
            return (
              <div
                key={level}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm ${
                  isComplete
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                    : level === currentLevel
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isComplete && <CheckCircle className="w-3.5 h-3.5" />}
                <span>L{level}</span>
                {bestScore !== undefined && (
                  <span className="text-xs opacity-75">({bestScore}%)</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border text-sm">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        <span className="text-muted-foreground">Your progress:</span>
        <span className="font-semibold">{progressPercentage}%</span>
      </div>
      
      {isCurrentLevelComplete && (
        <Badge variant="outline" className="gap-1 border-emerald-500 text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="w-3 h-3" />
          Level {currentLevel} Complete
        </Badge>
      )}
      
      {currentLevelBestScore !== undefined && !isCurrentLevelComplete && (
        <div className="flex items-center gap-1 text-muted-foreground">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Best: {currentLevelBestScore}%</span>
        </div>
      )}
    </div>
  );
}
