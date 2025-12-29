import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  ChevronRight, 
  Clock,
  CheckCircle,
  TrendingUp,
  Building2,
  BarChart3,
  Rocket
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";

const level1Lessons = [
  {
    number: 1,
    slug: "paise-invest-kyu",
    title: "Paise ko invest kyu kare?",
    description: "Sirf bachana kyu kaafi nahi – mehangai aur paisa grow karna samjho",
    duration: "10 min",
    icon: TrendingUp,
  },
  {
    number: 2,
    slug: "stock-market-kya-hai",
    title: "Stock Market kya hota hai?",
    description: "Stock market ka simple matlab – bazaar jahan shares bikte hain",
    duration: "10 min",
    icon: Building2,
  },
  {
    number: 3,
    slug: "share-kya-hai",
    title: "Share, Company aur Ownership",
    description: "Company, share aur ownership ka bilkul basic samjho",
    duration: "10 min",
    icon: BookOpen,
  },
  {
    number: 4,
    slug: "sensex-nifty",
    title: "Sensex aur Nifty kya hote hain?",
    description: "Market ke health indicators – news samajhna seekho",
    duration: "10 min",
    icon: BarChart3,
  },
  {
    number: 5,
    slug: "ipo-kya-hai",
    title: "IPO kya hota hai?",
    description: "Company pehli baar public ko shares kaise bechti hai",
    duration: "10 min",
    icon: Rocket,
  },
];

export default function Level1Course() {
  return (
    <div className="page-bg">
      <SEOHead
        title="Level 1: Stock Market ki Shuruaat – Rotech Shiksha"
        description="Stock market ki basic samajh – bilkul shuru se seekho. Hinglish me simple lessons for complete beginners."
        keywords="stock market hindi, share market basics, learn investing india, beginner course"
      />

      <section className="py-12 lg:py-16 bg-gradient-to-b from-emerald-50 to-background dark:from-emerald-950/20 dark:to-background border-b">
        <div className="max-w-3xl mx-auto px-4">
          <FadeInUp>
            <Badge variant="outline" className="mb-4 text-emerald-600 border-emerald-300 dark:text-emerald-400 dark:border-emerald-700">
              Beginner Level
            </Badge>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Level 1: Stock Market ki Shuruaat
            </h1>
            
            <p className="text-lg text-muted-foreground mb-6">
              Bilkul shuru se seekho – koi prior knowledge ki zaroorat nahi. 
              Simple Hinglish me, daily life examples ke saath.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>5 Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>~50 min total</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Complete Beginner Friendly</span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="py-10 lg:py-14">
        <div className="max-w-3xl mx-auto px-4">
          <StaggerContainer>
            <div className="space-y-4">
              {level1Lessons.map((lesson, index) => {
                const Icon = lesson.icon;
                return (
                  <StaggerItem key={lesson.slug}>
                    <Link href={`/beginner-course/${lesson.slug}`} data-testid={`link-lesson-${lesson.number}`}>
                      <Card className="overflow-visible hover-elevate cursor-pointer transition-all">
                        <CardContent className="p-0">
                          <div className="flex items-center gap-4 p-4 lg:p-5">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-muted-foreground">
                                  Lesson {lesson.number}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  • {lesson.duration}
                                </span>
                              </div>
                              <h3 className="font-semibold text-foreground mb-1 truncate">
                                {lesson.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {lesson.description}
                              </p>
                            </div>
                            
                            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>

          <FadeInUp delay={0.3}>
            <div className="mt-10 text-center">
              <Link href={`/beginner-course/${level1Lessons[0].slug}`} data-testid="button-start-learning">
                <Button size="lg" className="min-h-[48px] px-8 gap-2">
                  <BookOpen className="w-5 h-5" />
                  Lesson 1 Se Shuru Karo
                </Button>
              </Link>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <div className="mt-12 p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
              <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
                <strong>Note:</strong> Rotech Shiksha is an education platform. 
                We do not provide trading tips or investment advice.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
