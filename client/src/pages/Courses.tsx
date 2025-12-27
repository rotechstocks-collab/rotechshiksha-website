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
} from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";
import { SEOHead } from "@/components/SEOHead";

interface LevelCourse {
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
  isUnlocked: boolean;
  isCompleted: boolean;
}

const levelCourses: LevelCourse[] = [
  {
    level: 1,
    title: "Stock Market Basics",
    titleHindi: "Stock Market ki Shuruaat",
    description: "Share kya hai? Market kaise kaam karta hai? Bilkul basic se seekhein.",
    icon: <BookOpen className="w-6 h-6" />,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/40",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    route: "/level-1",
    lessons: 5,
    duration: "25 min",
    isUnlocked: true,
    isCompleted: false,
  },
  {
    level: 2,
    title: "Index, IPO & Market Structure",
    titleHindi: "Index, IPO aur Market Structure",
    description: "Sensex, Nifty, IPO kya hai? Market ka structure samjhein.",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/40",
    borderColor: "border-blue-200 dark:border-blue-800",
    route: "/learn/level-2",
    lessons: 5,
    duration: "30 min",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    level: 3,
    title: "Analysis & Risk Management",
    titleHindi: "Analysis aur Risk Management",
    description: "Risk kaise manage karein? Investment planning ki basics.",
    icon: <Shield className="w-6 h-6" />,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/40",
    borderColor: "border-purple-200 dark:border-purple-800",
    route: "/learn/level-3",
    lessons: 5,
    duration: "35 min",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    level: 4,
    title: "Chart Reading Basics",
    titleHindi: "Chart Padhna Seekhein",
    description: "Price charts aur candlesticks ko samajhna.",
    icon: <Target className="w-6 h-6" />,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/40",
    borderColor: "border-amber-200 dark:border-amber-800",
    route: "/learn/level-4",
    lessons: 5,
    duration: "40 min",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    level: 5,
    title: "Technical Analysis",
    titleHindi: "Technical Analysis",
    description: "Indicators aur patterns se market predict karna.",
    icon: <Zap className="w-6 h-6" />,
    color: "text-rose-600 dark:text-rose-400",
    bgColor: "bg-rose-100 dark:bg-rose-900/40",
    borderColor: "border-rose-200 dark:border-rose-800",
    route: "/learn/level-5",
    lessons: 5,
    duration: "45 min",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    level: 6,
    title: "Fundamental Analysis",
    titleHindi: "Fundamental Analysis",
    description: "Company ke financials aur business model samjhein.",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-100 dark:bg-cyan-900/40",
    borderColor: "border-cyan-200 dark:border-cyan-800",
    route: "/learn/level-6",
    lessons: 5,
    duration: "50 min",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    level: 7,
    title: "Portfolio Building",
    titleHindi: "Portfolio Banana",
    description: "Diversified portfolio kaise banayein aur manage karein.",
    icon: <Briefcase className="w-6 h-6" />,
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/40",
    borderColor: "border-indigo-200 dark:border-indigo-800",
    route: "/learn/level-7",
    lessons: 5,
    duration: "45 min",
    isUnlocked: false,
    isCompleted: false,
  },
  {
    level: 8,
    title: "Advanced Strategies",
    titleHindi: "Advanced Strategies",
    description: "Options, derivatives aur pro-level concepts.",
    icon: <Bot className="w-6 h-6" />,
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/40",
    borderColor: "border-violet-200 dark:border-violet-800",
    route: "/learn/level-8",
    lessons: 5,
    duration: "60 min",
    isUnlocked: false,
    isCompleted: false,
  },
];

function LevelCard({ course, index }: { course: LevelCourse; index: number }) {
  const cardContent = (
    <Card
        className={`relative h-full transition-all duration-300 border-2 ${course.borderColor} ${
          course.isUnlocked
            ? "hover-elevate cursor-pointer bg-white dark:bg-card"
            : "opacity-70 cursor-not-allowed bg-muted/30"
        }`}
        data-testid={`card-level-${course.level}`}
      >
        {!course.isUnlocked && (
          <div className="absolute inset-0 bg-background/50 dark:bg-background/70 rounded-lg z-10 flex items-center justify-center">
            <div className="text-center p-4">
              <Lock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground font-medium">
                Level {course.level - 1} complete karein
              </p>
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className={`w-14 h-14 rounded-xl ${course.bgColor} ${course.color} flex items-center justify-center flex-shrink-0`}>
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
                  Complete
                </Badge>
              )}
            </div>
          </div>

          <CardTitle className="text-lg leading-snug mb-1">
            {course.titleHindi}
          </CardTitle>
          <p className="text-xs text-muted-foreground">{course.title}</p>
        </CardHeader>

        <CardContent className="pt-0">
          <CardDescription className="text-sm mb-4 min-h-[44px]">
            {course.description}
          </CardDescription>

          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.lessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
          </div>

          <Button
            className={`w-full min-h-[48px] text-base font-medium gap-2 ${
              !course.isUnlocked ? "pointer-events-none" : ""
            }`}
            variant={course.isUnlocked ? "default" : "secondary"}
            disabled={!course.isUnlocked}
            data-testid={`button-start-level-${course.level}`}
          >
            {course.isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Review Level
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

export default function Courses() {
  const completedLevels = 0;
  const totalLevels = levelCourses.length;
  const progressPercent = Math.round((completedLevels / totalLevels) * 100);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Learning Path - Rotech Shiksha | Stock Market Education"
        description="Step-by-step stock market education in Hindi. Learn from basics to advanced level with our structured 8-level learning path."
        keywords="stock market course hindi, share market course, learn trading india, beginner stock market"
      />

      <section className="py-10 lg:py-16 bg-gradient-to-b from-primary/5 via-background to-background border-b">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeInUp>
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Free Learning Path
            </Badge>

            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Step-by-Step Learning Journey
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              8 levels mein complete stock market education - bilkul beginners ke liye
            </p>

            <div className="max-w-sm mx-auto">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground font-medium">Your Progress</span>
                <span className="font-semibold text-primary">
                  {completedLevels} / {totalLevels} Levels
                </span>
              </div>
              <div className="relative">
                <Progress value={progressPercent} className="h-3" />
                {progressPercent === 0 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-full"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {progressPercent === 0
                  ? "Level 1 se shuru karein!"
                  : `${progressPercent}% complete`}
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-primary" />
              Your Learning Path
            </h2>
            <p className="text-sm text-muted-foreground">
              Har level complete karne ke baad next level unlock hoga
            </p>
          </div>

          <StaggerContainer>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
              {levelCourses.map((course, index) => (
                <StaggerItem key={course.level}>
                  <LevelCard course={course} index={index} />
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-muted/50 border">
              <div className="flex -space-x-1">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center border-2 border-background">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center border-2 border-background">
                  <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">40+ lessons</span> available for free
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 border-t bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInUp>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
              <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">
                  Education Platform
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300/80">
                  Rotech Shiksha ek education platform hai. Yahan trading tips ya investment advice nahi di jaati.
                  Sabhi content sirf educational purpose ke liye hai.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
