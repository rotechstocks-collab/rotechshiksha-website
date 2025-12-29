import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { CharacterTip } from "@/components/characters/CharacterTip";
import { characterCopy } from "@/content/characterCopy";
import { StoryIntro, CTABlock } from "@/components/characters/StoryIntro";
import { WhatsAppStrip } from "@/components/WhatsAppStrip";
import { CharacterDuo } from "@/components/characters/CharacterCard";
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
  Star,
  Users,
  MessageCircle,
  X,
} from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";
import { SEOHead } from "@/components/SEOHead";
import { useEffect, useState } from "react";
import { getProgress, UserProgress, isLevelUnlocked, isLevelCompleted } from "@/lib/progress";

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
    <div
        className={`relative h-full transition-all duration-200 ${
          course.isUnlocked
            ? "soft-card-hover cursor-pointer"
            : "soft-card opacity-70 cursor-not-allowed"
        }`}
        data-testid={`card-level-${course.level}`}
      >
        {!course.isUnlocked && (
          <div className="absolute inset-0 bg-background/50 dark:bg-background/70 rounded-2xl z-10 flex items-center justify-center">
            <div className="text-center p-3">
              <Lock className="w-6 h-6 mx-auto text-muted-foreground mb-1.5" />
              <p className="text-xs text-muted-foreground font-medium">
                Level {course.level - 1} complete karein
              </p>
            </div>
          </div>
        )}

        <div className="p-4 pb-2">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className={`w-11 h-11 rounded-2xl ${course.bgColor} ${course.color} flex items-center justify-center flex-shrink-0`}>
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

          <h3 className="text-base font-semibold leading-snug mb-0.5 text-foreground">
            {course.titleHindi}
          </h3>
          <p className="text-xs text-muted-foreground">{course.title}</p>
        </div>

        <div className="p-4 pt-2">
          <p className="text-sm text-muted-foreground mb-3 min-h-[40px] line-clamp-2">
            {course.description}
          </p>

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
        </div>
      </div>
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
  const [progress, setProgress] = useState<UserProgress>(getProgress);
  const totalLevels = levelCoursesData.length;
  const completedCount = progress.completedLevels.length;
  const progressPercent = Math.round((completedCount / totalLevels) * 100);

  // Refresh progress from localStorage on mount and when storage changes
  useEffect(() => {
    const refreshProgress = () => {
      setProgress(getProgress());
    };
    
    // Listen for storage changes from other tabs
    window.addEventListener("storage", refreshProgress);
    
    // Listen for custom event from same tab (when quiz is completed)
    window.addEventListener("rotech-progress-updated", refreshProgress);
    
    // Also refresh on focus (when user returns from lesson page)
    window.addEventListener("focus", refreshProgress);
    
    return () => {
      window.removeEventListener("storage", refreshProgress);
      window.removeEventListener("rotech-progress-updated", refreshProgress);
      window.removeEventListener("focus", refreshProgress);
    };
  }, []);

  // Compute unlock status dynamically based on progress
  // Level 1 is always unlocked, subsequent levels unlock when previous is completed
  const levelCourses: LevelCourse[] = levelCoursesData.map(course => ({
    ...course,
    isUnlocked: isLevelUnlocked(course.level, progress),
    isCompleted: isLevelCompleted(course.level, progress),
  }));

  // Get current level info for Continue Learning (first incomplete unlocked level)
  const nextUnlockedLevel = levelCourses.find(c => c.isUnlocked && !c.isCompleted) || levelCourses[0];
  const currentLevelData = levelCoursesData.find(c => c.level === nextUnlockedLevel.level) || levelCoursesData[0];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Stock Market Course for Beginners in Hindi",
    "description": "Free 8-level stock market education course in Hindi. Learn investing from basics to advanced strategies with Priya and Rohit.",
    "provider": {
      "@type": "Organization",
      "name": "Rotech Shiksha",
      "sameAs": "https://rotechshiksha.com"
    },
    "educationalLevel": "Beginner to Advanced",
    "inLanguage": "hi",
    "isAccessibleForFree": true,
    "numberOfCredits": 8,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "P2W"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this stock market course free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all 8 levels of the stock market course are 100% free. There are no hidden charges."
        }
      },
      {
        "@type": "Question",
        "name": "Is this course suitable for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, this course starts from zero knowledge and explains everything in simple Hindi (Hinglish)."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to complete the course?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you spend 30 minutes daily, you can complete all 8 levels in 2-3 weeks. You have lifetime access."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://rotechshiksha.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Courses",
        "item": "https://rotechshiksha.com/courses"
      }
    ]
  };

  useEffect(() => {
    const existingScripts = document.querySelectorAll('script[data-schema]');
    existingScripts.forEach(script => script.remove());

    const schemas = [courseSchema, faqSchema, breadcrumbSchema];
    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', `schema-${index}`);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      const scripts = document.querySelectorAll('script[data-schema]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="page-bg">
      <SEOHead
        title="Free Stock Market Course for Beginners in Hindi | 8 Levels | Rotech Shiksha"
        description="Learn stock market step-by-step in simple Hindi. Free 8-level course covering basics to advanced strategies. 10,000+ learners. Start learning today!"
        keywords="stock market course for beginners, stock market basics in Hindi, learn investing step by step, share market course free, stock market learning path, free stock market course india"
      />

      <StoryIntro
        priyaLine="Yahan 8 levels hain – basics se leke advanced tak. Ek-ek step follow karo, Level 1 se start karo!"
        rohitLine="Perfect! Step-by-step seekhenge toh confusion nahi hoga. Chal shuru karte hain!"
      />

      <div className="max-w-4xl mx-auto px-4 mb-6">
        <WhatsAppStrip />
      </div>

      {/* Hero Section - SEO Optimized */}
      <section className="section-padding border-b">
        <div className="section-container">
          <FadeInUp>
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                100% Free • Hindi Mein • Beginners Ke Liye
              </Badge>

              <h1 className="text-2xl lg:text-4xl font-bold text-foreground mb-3">
                Free Stock Market Course for Beginners
              </h1>
              <h2 className="text-lg lg:text-xl text-muted-foreground font-medium mb-4">
                Simple Hindi Mein Step-by-Step Seekho
              </h2>

              <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
                Zero knowledge se start karo, 8 levels complete karo, aur confident investor bano. 
                Priya aur Rohit ke saath fun way mein seekho - koi boring lectures nahi!
              </p>

              {/* Key Benefits */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                {[
                  "No prior knowledge needed",
                  "Hinglish mein samjhaya gaya", 
                  "Lifetime free access",
                  "Certificate available"
                ].map((benefit, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            <div className="max-w-2xl mx-auto mb-6">
              <CharacterTip
                character="priya"
                pose="point"
                title={characterCopy.courses.tipTitle}
                message={characterCopy.courses.tipMessage}
              />
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

            {/* Trust Proof Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-6">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-medium text-foreground">4.8</span>
                <span>rating</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-foreground">10,000+</span>
                <span>learners</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span className="font-medium text-foreground">2,000+</span>
                <span>WhatsApp community</span>
              </div>
            </div>
            
            {/* Continue Learning Card */}
            <div className="max-w-lg mx-auto">
              <div className="soft-card border-2 border-emerald-200 dark:border-emerald-800 p-4 lg:p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
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
                    className="w-full min-h-[44px] gap-2 bg-emerald-600 hover:bg-emerald-700 text-white btn-glow-emerald"
                    data-testid="button-continue-learning"
                  >
                    <Play className="w-4 h-4" />
                    Continue Level {currentLevelData.level}
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>
                </Link>
                {/* Trust text below button */}
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Is level ke baad tum market ki basic language samjh jaoge.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Who is this for / Who is this NOT for */}
      <section className="py-10 bg-muted/30">
        <div className="section-container">
          <h2 className="text-xl lg:text-2xl font-bold text-foreground text-center mb-8">
            Ye Course Kiske Liye Hai?
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6">
              <h3 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Ye Course Tumhare Liye HAI Agar:
              </h3>
              <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
                {[
                  "Tum stock market ke bare mein kuch nahi jaante",
                  "Simple Hindi mein seekhna chahte ho",
                  "Long-term investing ya trading seekhna hai",
                  "Free mein quality education chahiye",
                  "Apne paise ke decisions khud lena chahte ho"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
              <h3 className="font-semibold text-red-700 dark:text-red-300 mb-4 flex items-center gap-2">
                <X className="w-5 h-5" />
                Ye Course Tumhare Liye NAHI HAI Agar:
              </h3>
              <ul className="space-y-2 text-sm text-red-800 dark:text-red-200">
                {[
                  "Hot stock tips chahiye (hum SEBI advisor nahi)",
                  "Get-rich-quick scheme dhundh rahe ho",
                  "Roz 100% profit expect karte ho",
                  "Bina mehnat ke paisa kamana hai",
                  "Tumhe lagta hai trading mein koi risk nahi"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-10">
        <div className="section-container">
          <h2 className="text-xl lg:text-2xl font-bold text-foreground text-center mb-2">
            Course Complete Karne Ke Baad Kya Hoga?
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            8 levels poore karne ke baad ye sab confident hokar kar paoge
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: <TrendingUp className="w-6 h-6" />, title: "Charts Padhna", desc: "Candlesticks, patterns, trends samjhoge" },
              { icon: <Shield className="w-6 h-6" />, title: "Risk Manage Karna", desc: "Stop-loss, position sizing seekhoge" },
              { icon: <Target className="w-6 h-6" />, title: "Stocks Analyze Karna", desc: "Fundamental + Technical analysis" },
              { icon: <Zap className="w-6 h-6" />, title: "Informed Decisions", desc: "Apne paise ke smart decisions loge" },
            ].map((item, i) => (
              <div key={i} className="bg-card border rounded-xl p-5 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-primary">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Timeline */}
      <section className="py-10 bg-gradient-to-b from-primary/5 to-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
              Kitna Time Lagega?
            </h2>
            <p className="text-muted-foreground mb-6">
              Tumhari speed pe depend karta hai, par ye ek rough estimate hai
            </p>
            <div className="bg-card border rounded-2xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">30 min</div>
                  <div className="text-xs text-muted-foreground">Daily time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">2-3 weeks</div>
                  <div className="text-xs text-muted-foreground">Total duration</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">Lifetime</div>
                  <div className="text-xs text-muted-foreground">Access</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Jaldi seekhna hai? Daily 1 hour do - 10 din mein complete. No rush? Apni pace se seekho - lifetime access hai!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Levels Grid */}
      <section className="section-padding">
        <div className="section-container">
          <div className="mb-6">
            <h2 className="text-lg lg:text-xl font-semibold text-foreground mb-1 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-primary" />
              8 Levels - Complete Learning Path
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

      {/* Meet Your Guides Section */}
      <section className="py-10 bg-muted/30">
        <div className="section-container">
          <div className="text-center mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
              Tumhare Learning Partners
            </h2>
            <p className="text-sm text-muted-foreground">
              Priya samjhayegi, Rohit tumhare jaisa sawaal karega
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <CharacterDuo
              priyaQuote="Har concept ko simple Hindi mein samjhaungi. Koi bhi doubt ho toh batao!"
              rohitQuote="Main bhi tum jaisa confused tha - ab dheere dheere samajh aa raha hai!"
              priyaRole="Teri Mentor"
              rohitRole="Fellow Learner"
              variant="default"
            />
          </div>
        </div>
      </section>

      <CTABlock
        priyaLine="Level 1 se shuru karo aur step-by-step advanced tak jaao!"
        rohitLine="Haan, ek level complete karne ke baad next unlock hoga – maza aayega!"
        primaryButton={{
          text: "Level 1 Se Shuru Karo",
          href: "/learn/level-1",
          testId: "button-courses-cta-primary"
        }}
        secondaryButton={{
          text: "Calculators Dekho",
          href: "/calculators",
          testId: "button-courses-cta-secondary"
        }}
      />

      {/* Disclaimer - Compact */}
      <section className="py-6 border-t bg-muted/30">
        <div className="section-container">
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
