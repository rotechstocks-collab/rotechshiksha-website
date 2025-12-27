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
  Banknote,
  IndianRupee,
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

const popularCalculators = [
  { id: "sip", name: "SIP Calculator", icon: <PiggyBank className="w-4 h-4" />, color: "from-emerald-500 to-teal-500", description: "Monthly invest" },
  { id: "lumpsum", name: "Lumpsum", icon: <Wallet className="w-4 h-4" />, color: "from-blue-500 to-indigo-500", description: "One-time" },
  { id: "cagr", name: "CAGR", icon: <TrendingUp className="w-4 h-4" />, color: "from-purple-500 to-pink-500", description: "Growth rate" },
  { id: "ppf", name: "PPF", icon: <Shield className="w-4 h-4" />, color: "from-cyan-500 to-blue-500", description: "PPF returns" },
  { id: "fd", name: "FD", icon: <Banknote className="w-4 h-4" />, color: "from-amber-500 to-orange-500", description: "Fixed Deposit" },
  { id: "emi", name: "EMI", icon: <IndianRupee className="w-4 h-4" />, color: "from-rose-500 to-red-500", description: "Loan EMI" },
];

const learningOutcomes = [
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Stock Market Samjhenge",
    description: "Sensex, Nifty, shares – simple Hindi mein",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Safe Investing Seekhenge",
    description: "Mistakes se bachna, smart decisions lena",
  },
  {
    icon: <Target className="w-5 h-5" />,
    title: "Confident Banenge",
    description: "Pehli investment ke liye ready",
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
      
      <section className="pt-8 pb-10 sm:pt-10 sm:pb-12 bg-gradient-to-b from-slate-50 via-slate-50/80 to-background dark:from-card/40 dark:via-card/20 dark:to-background">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 mb-3 text-xs">
            100% Free | Hindi Mein | Beginners Ke Liye
          </Badge>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-snug mb-2">
            Stock Market Seekho
            <br />
            <span className="text-primary">Bilkul Zero Se</span>
          </h1>
          
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md mx-auto mb-5">
            Chahe aapko share market ki "S" bhi nahi pata – yahan se shuru karo. 
            Simple Hindi mein, step-by-step.
          </p>
          
          <Link href="/beginner-course" data-testid="link-start-learning-hero">
            <Button size="lg" className="gap-2 min-h-[52px] text-base px-8 shadow-md" data-testid="button-start-learning-hero">
              <Play className="w-5 h-5" />
              Seekhna Shuru Karein (Free)
            </Button>
          </Link>
          
          <p className="text-xs text-muted-foreground mt-2.5 flex items-center justify-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-emerald-500" />
            10,000+ beginners ne yahan se seekha hai
          </p>
        </div>
      </section>

      <section className="py-6 sm:py-8 border-b border-border/40">
        <div className="max-w-2xl mx-auto px-4">
          <Card className="bg-gradient-to-r from-amber-50/70 to-orange-50/70 dark:from-amber-900/15 dark:to-orange-900/15 border-amber-200/40 dark:border-amber-800/30 shadow-sm">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-semibold text-foreground text-sm mb-1">
                    Rohit Jaisa – Shayad Aap Bhi
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <span className="font-medium text-foreground">Rohit</span> ek aam aadmi hai – job karta hai, thodi savings hai, lekin stock market se darta tha. 
                    Phir usne <span className="font-medium text-foreground">Priya</span> se seekha, jo bilkul simple Hindi mein samjhati hai. 
                    Aaj Rohit confident hai. <span className="font-medium text-primary">Aap bhi ban sakte ho.</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-6 sm:py-8 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-0.5">
              Aap Kya Seekhenge?
            </h2>
            <p className="text-xs text-muted-foreground">Course complete karne ke baad</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {learningOutcomes.map((outcome, index) => (
              <Card key={index} className="text-center shadow-sm" data-testid={`card-outcome-${index}`}>
                <CardContent className="p-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2.5 text-primary">
                    {outcome.icon}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{outcome.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{outcome.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-5">
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 mb-2 text-xs">
              <GraduationCap className="w-3 h-3 mr-1" />
              Step-by-Step
            </Badge>
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-0.5">
              Beginner Learning Path
            </h2>
            <p className="text-xs text-muted-foreground">Ek-ek step follow karo</p>
          </div>

          <div className="space-y-2">
            {learningPath.map((level, index) => (
              <Link key={level.level} href={level.route} data-testid={`link-level-${level.level}`}>
                <Card 
                  className="hover-elevate cursor-pointer group shadow-sm"
                  data-testid={`card-level-${level.level}`}
                >
                  <CardContent className="p-3 sm:p-4">
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
                        <p className="text-xs text-muted-foreground line-clamp-1">{level.description}</p>
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

          <div className="text-center mt-5">
            <Link href="/beginner-course" data-testid="link-start-path">
              <Button className="gap-2 min-h-[44px]" data-testid="button-start-path">
                <Play className="w-4 h-4" />
                Level 1 Se Shuru Karein
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-4">
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 mb-2 text-xs">
              <Calculator className="w-3 h-3 mr-1" />
              Free Tools
            </Badge>
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-0.5">
              Financial Calculators
            </h2>
            <p className="text-xs text-muted-foreground">SIP, EMI, FD – sabka hisaab free mein</p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
            {popularCalculators.map((calc) => (
              <Link key={calc.id} href={`/calculators/${calc.id}`} data-testid={`link-calc-${calc.id}`}>
                <Card className="hover-elevate cursor-pointer h-full shadow-sm" data-testid={`card-calc-${calc.id}`}>
                  <CardContent className="p-2.5 text-center">
                    <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${calc.color} text-white flex items-center justify-center mx-auto mb-1.5`}>
                      {calc.icon}
                    </div>
                    <p className="text-xs font-medium text-foreground truncate">{calc.name}</p>
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

      <section className="py-5 sm:py-6">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-2">
            <Link href="/blog" data-testid="link-blog-home">
              <Card className="hover-elevate cursor-pointer h-full shadow-sm" data-testid="card-blog-home">
                <CardContent className="p-3 flex items-center gap-2.5">
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
                <CardContent className="p-3 flex items-center gap-2.5">
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

      <section className="py-4 bg-muted/50 border-t border-border/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            <strong>Disclaimer:</strong> Ye website sirf educational purpose ke liye hai. 
            Hum investment advice ya trading tips nahi dete. Invest karne se pehle apni research karein 
            aur SEBI registered advisor se salah lein.
          </p>
        </div>
      </section>
    </div>
  );
}
