import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  ChevronRight,
  Clock,
  GraduationCap,
  Wallet,
  Brain,
  Play,
  CheckCircle,
  Shield,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";
import { CharacterIntro } from "@/components/Characters";
import { useLanguage } from "@/context/LanguageContext";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
}

interface Module {
  id: number;
  title: string;
  titleHi: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  lessons: Lesson[];
}

const modules: Module[] = [
  {
    id: 1,
    title: "Stock Market ki Shuruaat",
    titleHi: "The Beginning",
    description: "Pehla kadam – stock market ko samjhein bina kisi confusion ke",
    icon: <BookOpen className="w-6 h-6" />,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    lessons: [
      { id: "m1-l1", slug: "paise-invest-kyu", title: "Paise ko invest kyu karna chahiye?", duration: "8 min" },
      { id: "m1-l2", slug: "stock-market-kya-hai", title: "Stock market kya hota hai?", duration: "10 min" },
      { id: "m1-l3", slug: "share-kya-hai", title: "Share kya hota hai?", duration: "8 min" },
      { id: "m1-l4", slug: "sensex-nifty", title: "Sensex aur Nifty simple samjhaav", duration: "12 min" },
      { id: "m1-l5", slug: "ipo-kya-hai", title: "IPO kya hota hai?", duration: "10 min" },
    ],
  },
  {
    id: 2,
    title: "Account aur Basics",
    titleHi: "Getting Started",
    description: "Trading shuru karne ke liye kya chahiye – step by step",
    icon: <Wallet className="w-6 h-6" />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    lessons: [
      { id: "m2-l1", slug: "demat-account", title: "Demat account kya hota hai?", duration: "8 min" },
      { id: "m2-l2", slug: "trading-account", title: "Trading account kya hota hai?", duration: "8 min" },
      { id: "m2-l3", slug: "share-kaise-kharide", title: "Share kaise kharide-beche jaate hain?", duration: "12 min" },
      { id: "m2-l4", slug: "price-kaise-move", title: "Market me price kaise move karta hai?", duration: "10 min" },
    ],
  },
  {
    id: 3,
    title: "Beginner Investing Soch",
    titleHi: "Mindset & Safety",
    description: "Sahi soch aur safe tarike se investing seekhein",
    icon: <Brain className="w-6 h-6" />,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    lessons: [
      { id: "m3-l1", slug: "long-term-investing", title: "Long term investing kya hota hai?", duration: "10 min" },
      { id: "m3-l2", slug: "risk-ka-matlab", title: "Risk ka matlab kya hai?", duration: "8 min" },
      { id: "m3-l3", slug: "beginner-mistakes", title: "Beginner common mistakes", duration: "12 min" },
      { id: "m3-l4", slug: "safe-learning-rules", title: "Safe learning rules", duration: "8 min" },
    ],
  },
];

export default function BeginnerCourse() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalDuration = modules.reduce((acc, m) => {
    return acc + m.lessons.reduce((a, l) => a + parseInt(l.duration), 0);
  }, 0);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Beginner Stock Market Course – Rotech Shiksha"
        description="Learn stock market basics step by step in simple Hinglish. Complete beginner course with 13 lessons across 3 modules."
        keywords="stock market course hindi, beginner investing course, share market basics, learn investing india"
      />

      <section className="py-12 lg:py-16 bg-slate-50 dark:bg-card/30">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInUp>
            <div className="text-center">
              <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-0 mb-4">
                <GraduationCap className="w-3 h-3 mr-1" />
                Beginner Course
              </Badge>

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Stock Market Seekho – Zero Se
              </h1>

              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Simple Hinglish me, step-by-step learning. Complete beginners ke liye banaya gaya course.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{totalLessons} Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{totalDuration} min total</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-muted-foreground">100% Free</span>
                </div>
              </div>

              <Link href="/beginner-course/paise-invest-kyu" data-testid="link-start-course">
                <Button size="lg" className="gap-2" data-testid="button-start-course">
                  <Play className="w-4 h-4" />
                  {isHindi ? "Course शुरू करें – Lesson 1" : "Start Course – Lesson 1"}
                </Button>
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="py-8 lg:py-10 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-foreground mb-1">
              {isHindi ? "आपके Learning Companions" : "Meet Your Learning Companions"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {isHindi 
                ? "इनके साथ step-by-step सीखें – Priya समझाएगी, Rohit के doubts शायद आपके भी हों!"
                : "Learn step-by-step with them – Priya explains, Rohit asks questions you might also have!"}
            </p>
          </div>
          <CharacterIntro isHindi={isHindi} />
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <StaggerContainer>
            <div className="space-y-8">
              {modules.map((module, moduleIndex) => (
                <StaggerItem key={module.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: moduleIndex * 0.1 }}
                  >
                    <Card className="overflow-visible" data-testid={`card-module-${module.id}`}>
                      <CardHeader className="pb-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${module.bgColor}`}>
                            <div className={module.color}>{module.icon}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">
                                Module {module.id}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {module.lessons.length} lessons
                              </span>
                            </div>
                            <CardTitle className="text-xl mb-1">{module.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <Link
                              key={lesson.id}
                              href={`/beginner-course/${lesson.slug}`}
                              data-testid={`link-lesson-${lesson.slug}`}
                            >
                              <div className="flex items-center justify-between p-3 rounded-md hover-elevate cursor-pointer group">
                                <div className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                                    {moduleIndex * 5 + lessonIndex + 1 - (moduleIndex > 0 ? (moduleIndex === 1 ? 0 : 1) : 0)}
                                  </div>
                                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                    {lesson.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-8 border-t">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">
                Education Only
              </p>
              <p className="text-xs text-amber-700/80 dark:text-amber-300/80">
                Rotech Shiksha is an education platform. We do not provide trading tips or investment advice. 
                Always do your own research before making any financial decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
