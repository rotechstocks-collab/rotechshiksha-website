import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  BookOpen,
  TrendingUp,
  Shield,
  Target,
  Zap,
  GraduationCap,
  Briefcase,
  Bot,
  Lock,
  CheckCircle,
  Play,
  ChevronRight,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";
import { SEOHead } from "@/components/SEOHead";
import { useEffect, useState } from "react";

interface LevelCourseData {
  level: number;
  title: string;
  titleHindi: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  route: string;
  lessons: number;
  duration: string;
}

interface LevelCourse extends LevelCourseData {
  isUnlocked: boolean;
  isCompleted: boolean;
}

// Static course data - unlock status computed dynamically based on progress
const levelCoursesData: LevelCourseData[] = [
  {
    level: 1,
    title: "Stock Market Basics",
    titleHindi: "Stock Market ki Shuruaat",
    description: "Share kya hai? Market kaise kaam karta hai? Bilkul basic se seekhein.",
    icon: <BookOpen className="w-5 h-5" />,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/40",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    route: "/learn/level-1",
    lessons: 5,
    duration: "25 min",
  },
  {
    level: 2,
    title: "Index, IPO & Market Structure",
    titleHindi: "Index, IPO aur Market Structure",
    description: "Sensex, Nifty, IPO kya hai? Market ka structure samjhein.",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/40",
    borderColor: "border-blue-200 dark:border-blue-800",
    route: "/learn/level-2",
    lessons: 5,
    duration: "30 min",
  },
  {
    level: 3,
    title: "Analysis & Risk Management",
    titleHindi: "Analysis aur Risk Management",
    description: "Risk kaise manage karein? Investment planning ki basics.",
    icon: <Shield className="w-5 h-5" />,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/40",
    borderColor: "border-purple-200 dark:border-purple-800",
    route: "/learn/level-3",
    lessons: 5,
    duration: "35 min",
  },
  {
    level: 4,
    title: "Chart Reading Basics",
    titleHindi: "Chart Padhna Seekhein",
    description: "Price charts aur candlesticks ko samajhna.",
    icon: <Target className="w-5 h-5" />,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/40",
    borderColor: "border-amber-200 dark:border-amber-800",
    route: "/learn/level-4",
    lessons: 5,
    duration: "40 min",
  },
  {
    level: 5,
    title: "Technical Analysis",
    titleHindi: "Technical Analysis",
    description: "Indicators aur patterns se market predict karna.",
    icon: <Zap className="w-5 h-5" />,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/40",
    borderColor: "border-rose-200 dark:border-rose-800",
    route: "/learn/level-5",
    lessons: 5,
    duration: "45 min",
  },
  {
    level: 6,
    title: "Fundamental Analysis",
    titleHindi: "Fundamental Analysis",
    description: "Company ke financials aur business model samjhein.",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/40",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    route: "/learn/level-6",
    lessons: 5,
    duration: "50 min",
  },
  {
    level: 7,
    title: "Portfolio Building",
    titleHindi: "Portfolio Banana",
    description: "Diversified portfolio kaise banayein aur manage karein.",
    icon: <Briefcase className="w-5 h-5" />,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/40",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    route: "/learn/level-7",
    lessons: 5,
    duration: "45 min",
  },
  {
    level: 8,
    title: "Advanced Strategies",
    titleHindi: "Advanced Strategies",
    description: "Options, derivatives aur pro-level concepts.",
    icon: <Bot className="w-5 h-5" />,
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/40",
    borderColor: "border-violet-200 dark:border-violet-800",
    route: "/learn/level-8",
    lessons: 5,
    duration: "60 min",
  },
];

function LevelCard({ course, index }: { course: LevelCourse; index: number }) {
  const cardContent = (
    <Card
        className={`relative h-full transition-all duration-300 border ${course.borderColor} ${
          course.isUnlocked
            ? "hover-elevate cursor-pointer bg-white dark:bg-card"
            : "opacity-70 cursor-not-allowed bg-muted/30"
        }`}
        data-testid={`card-level-${course.level}`}
      >
        {!course.isUnlocked && (
          <div className="absolute inset-0 bg-background/50 dark:bg-background/70 rounded-md z-10 flex items-center justify-center">
            <div className="text-center p-3">
              <Lock className="w-6 h-6 mx-auto text-muted-foreground mb-1.5" />
              <p className="text-xs text-muted-foreground font-medium">
                Level {course.level - 1} complete karein
              </p>
            </div>
          </div>
        )}

        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className={`w-11 h-11 rounded-lg ${course.bgColor} ${course.color} flex items-center justify-center flex-shrink-0`}>
              {course.icon}
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge
                variant="outline"
                className={`${course.bgColor} ${course.color} border-0 text-xs font-semibold`}
              >
                Level {course.level}
              </Badge>
              {course.isCompleted && (
                <Badge className="bg-emerald-500 text-white border-0 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Done
                </Badge>
              )}
            </div>
          </div>

          <CardTitle className="text-base leading-snug mb-0.5">
            {course.titleHindi}
          </CardTitle>
          <p className="text-xs text-muted-foreground">{course.title}</p>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          <CardDescription className="text-sm mb-3 min-h-[40px] line-clamp-2">
            {course.description}
          </CardDescription>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {course.lessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {course.duration}
            </span>
          </div>

          <Button
            className={`w-full min-h-[44px] text-sm font-medium gap-2 ${
              !course.isUnlocked ? "pointer-events-none" : ""
            }`}
            variant={course.isUnlocked ? "default" : "secondary"}
            disabled={!course.isUnlocked}
            data-testid={`button-start-level-${course.level}`}
          >
            {course.isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Review
              </>
            ) : course.isUnlocked ? (
              <>
                <Play className="w-4 h-4" />
                Start Learning
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Locked
              </>
            )}
          </Button>
        </CardContent>
      </Card>
  );

  if (course.isUnlocked) {
    return (
      <Link href={course.route} data-testid={`link-level-${course.level}`}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div data-testid={`link-level-${course.level}`}>
      {cardContent}
    </div>
  );
}

// localStorage key for progress tracking
const PROGRESS_KEY = "rotech-learning-progress";

interface UserProgress {
  completedLevels: number[];
  currentLevel: number;
  lastVisited: string;
}

function getProgress(): UserProgress {
  if (typeof window === "undefined") {
    return { completedLevels: [], currentLevel: 1, lastVisited: new Date().toISOString() };
  }
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Error reading progress:", e);
  }
  return { completedLevels: [], currentLevel: 1, lastVisited: new Date().toISOString() };
}

export default function Courses() {
  const [progress, setProgress] = useState<UserProgress>(getProgress);
  const totalLevels = levelCoursesData.length;
  const completedCount = progress.completedLevels.length;
  const progressPercent = Math.round((completedCount / totalLevels) * 100);

  // Compute unlock status dynamically based on progress
  // Level 1 is always unlocked, subsequent levels unlock when previous is completed
  const levelCourses: LevelCourse[] = levelCoursesData.map(course => ({
    ...course,
    isUnlocked: course.level === 1 || progress.completedLevels.includes(course.level - 1),
    isCompleted: progress.completedLevels.includes(course.level),
  }));

  // Get current level info for Continue Learning (first incomplete unlocked level)
  const nextUnlockedLevel = levelCourses.find(c => c.isUnlocked && !c.isCompleted) || levelCourses[0];
  const currentLevelData = levelCoursesData.find(c => c.level === nextUnlockedLevel.level) || levelCoursesData[0];

  // Update localStorage when progress changes
  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Learning Path - Rotech Shiksha | Stock Market Education"
        description="Step-by-step stock market education in Hindi. Learn from basics to advanced level with our structured 8-level learning path."
        keywords="stock market course hindi, share market course, learn trading india, beginner stock market"
      />

      {/* Hero Section - Tighter spacing */}
      <section className="py-8 lg:py-12 bg-gradient-to-b from-primary/5 via-background to-background border-b">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                Free Learning Path
              </Badge>

              <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-2">
                Step-by-Step Learning Journey
              </h1>

              <p className="text-base lg:text-lg text-muted-foreground max-w-xl mx-auto">
                8 levels mein complete stock market education — bilkul beginners ke liye
              </p>
            </div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex items-center justify-between text-sm mb-2 gap-2">
                <span className="text-muted-foreground font-medium">Your Progress</span>
                <span className="font-semibold text-primary">
                  {completedCount} / {totalLevels} Levels
                </span>
              </div>
              <div className="relative">
                <Progress value={progressPercent} className="h-2.5" />
                {progressPercent === 0 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-full"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
            </div>

            {/* Continue Learning Card */}
            <div className="max-w-lg mx-auto">
              <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-950/30 dark:to-card">
                <CardContent className="p-4 lg:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">Continue Learning</p>
                      <p className="text-sm font-semibold text-foreground truncate">
                        Level {currentLevelData.level}: {currentLevelData.titleHindi}
                      </p>
                    </div>
                  </div>
                  <Link href={currentLevelData.route}>
                    <Button 
                      className="w-full min-h-[44px] gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                      data-testid="button-continue-learning"
                    >
                      <Play className="w-4 h-4" />
                      Continue Level {currentLevelData.level}
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Levels Grid - Tighter spacing */}
      <section className="py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-lg lg:text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-primary" />
              Your Learning Path
            </h2>
            <p className="text-sm text-muted-foreground">
              Har level complete karne ke baad next level unlock hoga
            </p>
          </div>

          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
              {levelCourses.map((course, index) => (
                <StaggerItem key={course.level}>
                  <LevelCard course={course} index={index} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-muted/50 border">
              <div className="flex -space-x-1">
                <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center border-2 border-background">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center border-2 border-background">
                  <GraduationCap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">40+ lessons</span> available for free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer - Compact */}
      <section className="py-6 border-t bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-3 p-3 lg:p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-0.5">
                Education Platform
              </p>
              <p className="text-xs lg:text-sm text-amber-700 dark:text-amber-300/80">
                Rotech Shiksha ek education platform hai. Yahan trading tips ya investment advice nahi di jaati.
                Sabhi content sirf educational purpose ke liye hai.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
