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
  Target,
  Lightbulb,
  Users,
  ChevronRight,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const popularCalculators = [
  { id: "sip", name: "SIP Calculator", icon: <PiggyBank className="w-5 h-5" />, color: "from-emerald-500 to-teal-500", description: "Monthly invest karo" },
  { id: "lumpsum", name: "Lumpsum", icon: <Wallet className="w-5 h-5" />, color: "from-blue-500 to-indigo-500", description: "One-time investment" },
  { id: "cagr", name: "CAGR", icon: <TrendingUp className="w-5 h-5" />, color: "from-purple-500 to-pink-500", description: "Growth rate nikalo" },
  { id: "ppf", name: "PPF", icon: <Shield className="w-5 h-5" />, color: "from-cyan-500 to-blue-500", description: "PPF returns dekho" },
  { id: "fd", name: "FD Calculator", icon: <Banknote className="w-5 h-5" />, color: "from-amber-500 to-orange-500", description: "Fixed Deposit" },
  { id: "emi", name: "EMI", icon: <IndianRupee className="w-5 h-5" />, color: "from-rose-500 to-red-500", description: "Loan EMI nikalo" },
];

const learningOutcomes = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Stock Market Samjhenge",
    description: "Sensex, Nifty, shares – sab kuch simple Hindi mein samjho",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Safe Investing Seekhenge",
    description: "Beginner mistakes se bachna aur smart decisions lena seekho",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Confident Banenge",
    description: "Apni pehli investment ke liye ready ho jaoge – bina dar ke",
  },
];

const learningPath = [
  {
    level: 1,
    title: "Basics Samjho",
    titleHindi: "शुरुआत यहाँ से करें",
    description: "Stock market kya hai, shares kaise kaam karte hain",
    lessons: 5,
    route: "/beginner-course",
    isActive: true,
  },
  {
    level: 2,
    title: "Investing Seekho",
    titleHindi: "निवेश करना सीखें",
    description: "Demat account, brokers, pehla share kaise khareedein",
    lessons: 5,
    route: "/beginner-course",
    isActive: true,
  },
  {
    level: 3,
    title: "Smart Investor Bano",
    titleHindi: "समझदार निवेशक बनें",
    description: "Portfolio banana, risk samajhna, long-term wealth creation",
    lessons: 3,
    route: "/beginner-course",
    isActive: true,
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
      
      <section className="py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-slate-50 to-white dark:from-card/50 dark:to-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 mb-4">
            100% Free | Hindi Mein | Beginners Ke Liye
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-3">
            Stock Market Seekho
            <br />
            <span className="text-primary">Bilkul Zero Se</span>
          </h1>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto mb-6">
            Chahe aapko share market ki "S" bhi nahi pata – yahan se shuru karo. 
            Simple Hindi mein, step-by-step.
          </p>
          
          <Link href="/beginner-course" data-testid="link-start-learning-hero">
            <Button size="lg" className="gap-2 min-h-[48px] text-base px-8" data-testid="button-start-learning-hero">
              <Play className="w-5 h-5" />
              Seekhna Shuru Karein (Free)
            </Button>
          </Link>
          
          <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            10,000+ beginners ne yahan se seekha hai
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200/50 dark:border-amber-700/30">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1.5">
                    Rohit Jaisa – Shayad Aap Bhi
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-medium text-foreground">Rohit</span> ek aam aadmi hai – job karta hai, thodi savings hai, lekin stock market se darta tha. 
                    "Pata nahi kahan se shuru karun" – yehi sochta tha. Phir usne <span className="font-medium text-foreground">Priya</span> se seekha, 
                    jo bilkul simple Hindi mein samjhati hai. Aaj Rohit confident hai. <span className="font-medium text-primary">Aap bhi ban sakte ho.</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-8 sm:py-10 bg-slate-50/50 dark:bg-card/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              Aap Kya Seekhenge?
            </h2>
            <p className="text-sm text-muted-foreground">Course complete karne ke baad</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {learningOutcomes.map((outcome, index) => (
              <Card key={index} className="text-center" data-testid={`card-outcome-${index}`}>
                <CardContent className="p-4 sm:p-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
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

      <section className="py-8 sm:py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 mb-2">
              <GraduationCap className="w-3 h-3 mr-1" />
              Step-by-Step Learning
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              Beginner Learning Path
            </h2>
            <p className="text-sm text-muted-foreground">Ek-ek step follow karo, confusion nahi hoga</p>
          </div>

          <div className="space-y-3">
            {learningPath.map((level, index) => (
              <Link key={level.level} href={level.route} data-testid={`link-level-${level.level}`}>
                <Card 
                  className="hover-elevate cursor-pointer group"
                  data-testid={`card-level-${level.level}`}
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                          index === 0 
                            ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400' 
                            : index === 1 
                              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                              : 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400'
                        }`}>
                          {level.level}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-semibold text-foreground text-sm sm:text-base">{level.title}</h3>
                          <span className="text-xs text-muted-foreground hidden sm:inline">({level.titleHindi})</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1">{level.description}</p>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{level.lessons} lessons</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link href="/beginner-course" data-testid="link-start-path">
              <Button className="gap-2" data-testid="button-start-path">
                <Play className="w-4 h-4" />
                Level 1 Se Shuru Karein
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10 bg-slate-50/50 dark:bg-card/20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-6">
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 mb-2">
              <Calculator className="w-3 h-3 mr-1" />
              Free Tools
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
              Financial Calculators
            </h2>
            <p className="text-sm text-muted-foreground">SIP, EMI, FD – sabka hisaab free mein</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-5">
            {popularCalculators.map((calc) => (
              <Link key={calc.id} href={`/calculators/${calc.id}`} data-testid={`link-calc-${calc.id}`}>
                <Card className="hover-elevate cursor-pointer group h-full" data-testid={`card-calc-${calc.id}`}>
                  <CardContent className="p-3 flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${calc.color} text-white flex items-center justify-center flex-shrink-0`}>
                      {calc.icon}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground text-xs sm:text-sm truncate">{calc.name}</h3>
                      <p className="text-xs text-muted-foreground truncate">{calc.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/calculators" data-testid="link-view-all-calculators">
              <Button variant="outline" size="sm" className="gap-2" data-testid="button-view-all-calculators">
                Saare Calculators
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/blog" data-testid="link-blog-home">
              <Card className="hover-elevate cursor-pointer h-full" data-testid="card-blog-home">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Market Gyaan (Blog)</h3>
                    <p className="text-xs text-muted-foreground">Simple articles for beginners</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/faq" data-testid="link-faq-home">
              <Card className="hover-elevate cursor-pointer h-full" data-testid="card-faq-home">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Beginner FAQ</h3>
                    <p className="text-xs text-muted-foreground">Common questions answered</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5 sm:py-6 bg-slate-100 dark:bg-card/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Disclaimer:</strong> Ye website sirf educational purpose ke liye hai. 
            Hum investment advice ya trading tips nahi dete. Invest karne se pehle apni research zaroor karein 
            aur SEBI registered advisor se salah lein.
          </p>
        </div>
      </section>
    </div>
  );
}
