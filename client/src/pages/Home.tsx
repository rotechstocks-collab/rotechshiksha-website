import { Card, CardContent } from "@/components/ui/card";
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
  Shield,
  GraduationCap,
  BookOpen,
  HelpCircle,
  Target,
  Lightbulb,
  Users,
  ChevronRight,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const calculators = [
  { id: "sip", name: "SIP Calculator", icon: <PiggyBank className="w-4 h-4" />, color: "from-emerald-500 to-teal-500" },
  { id: "lumpsum", name: "Lumpsum", icon: <Wallet className="w-4 h-4" />, color: "from-blue-500 to-indigo-500" },
  { id: "cagr", name: "CAGR", icon: <TrendingUp className="w-4 h-4" />, color: "from-purple-500 to-pink-500" },
  { id: "brokerage", name: "Brokerage", icon: <Calculator className="w-4 h-4" />, color: "from-amber-500 to-orange-500" },
];

const learningOutcomes = [
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Confusion Khatam",
    description: "Stock market ab mushkil nahi lagega – sab kuch clear ho jayega",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Dar Nahi Rahega",
    description: "Safe investing samjhoge – galti karne ka darr khatam",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Pehla Step Le Paoge",
    description: "Course ke baad confidently apna pehla investment kar sakte ho",
  },
];

const learningPath = [
  {
    level: 1,
    title: "Basics Samjho",
    description: "Stock market kya hai, shares kaise kaam karte hain",
    lessons: 5,
    route: "/beginner-course",
  },
  {
    level: 2,
    title: "Investing Seekho",
    description: "Demat account, brokers, pehla share kaise khareedein",
    lessons: 5,
    route: "/beginner-course",
  },
  {
    level: 3,
    title: "Smart Investor Bano",
    description: "Portfolio banana, risk samajhna, long-term growth",
    lessons: 3,
    route: "/beginner-course",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Stock Market Seekho – Bilkul Zero Se | Rotech Shiksha"
        description="Simple Hindi mein stock market seekho. Beginner-friendly free course with step-by-step learning. No prior knowledge needed."
        keywords="stock market hindi, share market basics, learn investing india, beginner stock market, rotech shiksha"
      />
      
      <section className="pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-10 lg:pb-8 bg-gradient-to-b from-slate-50 via-slate-50/80 to-background dark:from-card/40 dark:via-card/20 dark:to-background">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 mb-3 text-xs">
            100% Free | Hindi Mein | Beginners Ke Liye
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-2.5">
            Stock Market Seekho
            <br />
            <span className="text-primary">Bilkul Zero Se</span>
          </h1>
          
          <p className="text-sm sm:text-base text-muted-foreground leading-[1.7] max-w-md mx-auto mb-4">
            Chahe aapko share market ki "S" bhi nahi pata – yahan se shuru karo. 
            Simple Hindi mein, step-by-step.
          </p>
          
          <Link href="/beginner-course" data-testid="link-start-learning-hero">
            <Button size="lg" className="w-full sm:w-auto gap-2 min-h-[52px] text-base px-10 shadow-md" data-testid="button-start-learning-hero">
              <Play className="w-5 h-5" />
              Seekhna Shuru Karein (Free)
            </Button>
          </Link>
          
          <div className="mt-3 flex flex-col items-center gap-0.5">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              10,000+ beginners ne yahan se seekha hai
            </p>
            <p className="text-[11px] text-muted-foreground/60 mt-1">
              Education only • No tips • No stock recommendations
            </p>
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-5">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="bg-gradient-to-r from-amber-50/70 to-orange-50/70 dark:from-amber-900/10 dark:to-orange-900/10 border-amber-200/40 dark:border-amber-800/30 shadow-sm">
            <CardContent className="p-4 sm:p-5">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-foreground text-sm sm:text-base mb-1">
                    Rohit Jaisa – Shayad Aap Bhi
                  </h2>
                  <p className="text-[13px] sm:text-sm text-muted-foreground leading-[1.75]">
                    <span className="font-medium text-foreground">Rohit</span> ek aam aadmi hai – naukri karta hai, thodi savings hai, lekin stock market se darta tha. 
                    Phir usne <span className="font-medium text-foreground">Priya</span> se seekha – simple Hindi mein, bina jargon ke. 
                    Aaj Rohit confident hai. <span className="font-medium text-primary">Aapki bhi baari hai.</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-4 sm:py-5 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-0.5">
              Course Ke Baad Aap...
            </h2>
            <p className="text-xs text-muted-foreground">Ye 3 cheezein zaroor hogi</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {learningOutcomes.map((outcome, index) => (
              <Card key={index} className="shadow-sm" data-testid={`card-outcome-${index}`}>
                <CardContent className="p-4 sm:p-5">
                  <div className="flex sm:flex-col items-start sm:items-center sm:text-center gap-3 sm:gap-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary sm:mb-2.5 flex-shrink-0">
                      {outcome.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-0.5 sm:mb-1">{outcome.title}</h3>
                      <p className="text-xs text-muted-foreground leading-[1.6]">{outcome.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-5">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-4">
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 mb-1.5 text-xs">
              <GraduationCap className="w-3 h-3 mr-1" />
              Step-by-Step Path
            </Badge>
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-0.5">
              Beginner Learning Path
            </h2>
            <p className="text-xs text-muted-foreground">Ek-ek step follow karo, confusion nahi hoga</p>
          </div>

          <div className="space-y-2">
            {learningPath.map((level, index) => (
              <Link key={level.level} href={level.route} data-testid={`link-level-${level.level}`}>
                <Card 
                  className="hover-elevate cursor-pointer group shadow-sm"
                  data-testid={`card-level-${level.level}`}
                >
                  <CardContent className="p-3.5 sm:p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center font-bold text-base flex-shrink-0 ${
                        index === 0 
                          ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' 
                          : index === 1 
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400'
                            : 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400'
                      }`}>
                        {level.level}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground text-sm">{level.title}</h3>
                        <p className="text-xs text-muted-foreground leading-[1.5] line-clamp-1">{level.description}</p>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                          <BookOpen className="w-3 h-3" />
                          <span>{level.lessons} lessons</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-4 text-center sm:text-left">
            <Link href="/beginner-course" data-testid="link-start-path">
              <Button className="w-full sm:w-auto gap-2 min-h-[48px]" data-testid="button-start-path">
                <Play className="w-4 h-4" />
                Level 1 Se Shuru Karein
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4 sm:py-5 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-0.5">
              Free Calculators
            </h2>
            <p className="text-xs text-muted-foreground">SIP, Lumpsum, CAGR – sabka hisaab</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {calculators.map((calc) => (
              <Link key={calc.id} href={`/calculators/${calc.id}`} data-testid={`link-calc-${calc.id}`}>
                <Card className="hover-elevate cursor-pointer h-full shadow-sm" data-testid={`card-calc-${calc.id}`}>
                  <CardContent className="p-3.5 text-center">
                    <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${calc.color} text-white flex items-center justify-center mx-auto mb-2`}>
                      {calc.icon}
                    </div>
                    <p className="text-xs font-medium text-foreground">{calc.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/calculators" data-testid="link-view-all-calculators">
              <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8" data-testid="button-view-all-calculators">
                Saare Calculators
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-3.5 sm:py-4">
        <div className="max-w-2xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-2">
            <Link href="/blog" data-testid="link-blog-home">
              <Card className="hover-elevate cursor-pointer h-full shadow-sm" data-testid="card-blog-home">
                <CardContent className="p-3.5 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-xs sm:text-sm truncate">Market Gyaan</h3>
                    <p className="text-xs text-muted-foreground truncate">Simple articles</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/faq" data-testid="link-faq-home">
              <Card className="hover-elevate cursor-pointer h-full shadow-sm" data-testid="card-faq-home">
                <CardContent className="p-3.5 flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-md bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-xs sm:text-sm truncate">Beginner FAQ</h3>
                    <p className="text-xs text-muted-foreground truncate">Common questions</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-3 bg-muted/50 border-t border-border/30">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            <strong>Disclaimer:</strong> Ye website sirf educational purpose ke liye hai. 
            Hum investment advice ya trading tips nahi dete. Invest karne se pehle apni research karein.
          </p>
        </div>
      </section>
    </div>
  );
}
