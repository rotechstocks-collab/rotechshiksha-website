import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight,
  Calculator,
  PiggyBank,
  TrendingUp,
  CheckCircle,
  Play,
  Wallet,
  Banknote,
  IndianRupee,
  Shield,
  GraduationCap,
  BookOpen,
  HelpCircle,
  Lock,
  Clock,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

interface CourseCard {
  id: string;
  title: string;
  titleHindi: string;
  description: string;
  benefits: string[];
  lessons: number;
  duration: string;
  isActive: boolean;
  route: string;
  color: string;
  bgColor: string;
}

const courseCards: CourseCard[] = [
  {
    id: "beginner",
    title: "Beginner Stock Market Course",
    titleHindi: "शुरुआती कोर्स",
    description: "Stock market ki complete journey – zero se hero tak, simple Hindi mein",
    benefits: [
      "Stock market kya hai aur kaise kaam karta hai",
      "Shares, Sensex, Nifty basics",
      "Safe investing ke tarike",
      "Common mistakes se bachein",
    ],
    lessons: 13,
    duration: "3 hours",
    isActive: true,
    route: "/beginner-course",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/30",
  },
  {
    id: "intermediate",
    title: "Intermediate Course",
    titleHindi: "इंटरमीडिएट कोर्स",
    description: "Technical analysis, chart patterns aur advanced concepts",
    benefits: [
      "Chart reading aur patterns",
      "Technical indicators",
      "Entry/exit strategies",
      "Risk management advanced",
    ],
    lessons: 15,
    duration: "5 hours",
    isActive: false,
    route: "/intermediate-course",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/30",
  },
  {
    id: "advanced",
    title: "Advanced Trading Course",
    titleHindi: "एडवांस्ड कोर्स",
    description: "Options, derivatives aur professional trading techniques",
    benefits: [
      "Options trading basics",
      "Futures & derivatives",
      "Portfolio management",
      "Professional strategies",
    ],
    lessons: 20,
    duration: "8 hours",
    isActive: false,
    route: "/advanced-course",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/30",
  },
];

const popularCalculators = [
  { id: "sip", name: "SIP Calculator", icon: <PiggyBank className="w-5 h-5" />, color: "from-emerald-500 to-teal-500", description: "Monthly invest karo" },
  { id: "lumpsum", name: "Lumpsum", icon: <Wallet className="w-5 h-5" />, color: "from-blue-500 to-indigo-500", description: "One-time investment" },
  { id: "cagr", name: "CAGR", icon: <TrendingUp className="w-5 h-5" />, color: "from-purple-500 to-pink-500", description: "Growth rate nikalo" },
  { id: "ppf", name: "PPF", icon: <Shield className="w-5 h-5" />, color: "from-cyan-500 to-blue-500", description: "PPF returns dekho" },
  { id: "fd", name: "FD Calculator", icon: <Banknote className="w-5 h-5" />, color: "from-amber-500 to-orange-500", description: "Fixed Deposit" },
  { id: "emi", name: "EMI", icon: <IndianRupee className="w-5 h-5" />, color: "from-rose-500 to-red-500", description: "Loan EMI nikalo" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Stock Market Learning for Beginners – Rotech Shiksha"
        description="Learn stock market basics step by step in simple Hinglish. Beginner-friendly education, no trading tips."
        keywords="stock market hindi, share market basics, learn investing india, beginner stock market, rotech shiksha"
      />
      
      <section className="py-20 lg:py-28 bg-slate-50 dark:bg-card/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-6">
            Rotech Shiksha
          </Badge>
          
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight mb-4">
            Stock Market Seekho <br />
            <span className="text-primary">Zero Se</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
            Bina dar, bina confusion – simple Hindi me step-by-step learning.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-muted-foreground">Hindi first</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-muted-foreground">Beginner friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-muted-foreground">100% Free</span>
            </div>
          </div>
          
          <Link href="/beginner-course" data-testid="link-start-learning">
            <Button size="lg" className="gap-2" data-testid="button-start-learning">
              <Play className="w-4 h-4" />
              Start Beginner Course
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 mb-3">
              <GraduationCap className="w-3 h-3 mr-1" />
              Our Courses
            </Badge>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Structured Learning for Every Level
            </h2>
            <p className="text-sm text-muted-foreground">(Simple Hindi mein, step-by-step)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {courseCards.map((course) => (
              <Card 
                key={course.id}
                className={`h-full relative overflow-visible ${
                  course.isActive 
                    ? 'hover-elevate cursor-pointer ring-2 ring-emerald-500/50' 
                    : 'opacity-70 cursor-not-allowed'
                }`}
                data-testid={`card-course-${course.id}`}
              >
                {!course.isActive && (
                  <div className="absolute inset-0 bg-background/60 dark:bg-background/80 rounded-lg z-10 flex items-center justify-center">
                    <Badge variant="secondary" className="gap-1">
                      <Lock className="w-3 h-3" />
                      Coming Soon
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className={`w-12 h-12 rounded-xl ${course.bgColor} flex items-center justify-center`}>
                      <GraduationCap className={`w-6 h-6 ${course.color}`} />
                    </div>
                    {course.isActive && (
                      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-0 text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{course.titleHindi}</p>
                  <CardDescription className="text-sm mt-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 space-y-4">
                  <ul className="space-y-1.5">
                    {course.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                  </div>
                  {course.isActive ? (
                    <Link href={course.route}>
                      <Button className="w-full gap-2 min-h-[44px]" data-testid={`button-start-${course.id}`}>
                        <Play className="w-4 h-4" />
                        Start Learning
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      className="w-full gap-2 min-h-[44px]" 
                      variant="secondary" 
                      disabled
                      data-testid={`button-start-${course.id}`}
                    >
                      <Lock className="w-4 h-4" />
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/courses" data-testid="link-view-all-courses">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-courses">
                View All Learning Levels
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-card/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 mb-3">
              <Calculator className="w-3 h-3 mr-1" />
              Free Tools
            </Badge>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Financial Calculators
            </h2>
            <p className="text-sm text-muted-foreground">(SIP, EMI, FD – sabka hisaab free me)</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
            {popularCalculators.map((calc) => (
              <Link key={calc.id} href={`/calculators/${calc.id}`} data-testid={`link-calc-${calc.id}`}>
                <Card className="hover-elevate cursor-pointer group h-full" data-testid={`card-calc-${calc.id}`}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${calc.color} text-white flex items-center justify-center flex-shrink-0`}>
                      {calc.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-sm">{calc.name}</h3>
                      <p className="text-xs text-muted-foreground">{calc.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/calculators" data-testid="link-view-all-calculators">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-calculators">
                Saare Calculators
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/blog" data-testid="link-blog-home">
              <Card className="hover-elevate cursor-pointer h-full" data-testid="card-blog-home">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Market Gyaan (Blog)</h3>
                    <p className="text-sm text-muted-foreground">Simple articles for beginners</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/faq" data-testid="link-faq-home">
              <Card className="hover-elevate cursor-pointer h-full" data-testid="card-faq-home">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Beginner FAQ</h3>
                    <p className="text-sm text-muted-foreground">Common questions answered</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-100 dark:bg-card/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            <strong>Disclaimer:</strong> Ye website sirf educational purpose ke liye hai. 
            Hum investment advice nahi dete. Invest karne se pehle apni research zaroor karein.
          </p>
        </div>
      </section>
    </div>
  );
}
