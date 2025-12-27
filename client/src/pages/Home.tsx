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
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const learningLevels = [
  { level: 1, title: "Stock Market ki Shuruaat", description: "Dar se samajh tak", color: "from-emerald-500 to-emerald-600", recommended: true },
  { level: 2, title: "Stock, Index & IPO", description: "Nifty, Sensex, IPO basics", color: "from-blue-500 to-blue-600", recommended: false },
  { level: 3, title: "Investment Planning", description: "Goals se shuru karo", color: "from-teal-500 to-teal-600", recommended: false },
  { level: 4, title: "Risk Management", description: "Loss se kaise bachein", color: "from-rose-500 to-rose-600", recommended: false },
  { level: 5, title: "Mutual Funds & SIP", description: "Smart investing basics", color: "from-cyan-500 to-cyan-600", recommended: false },
  { level: 6, title: "Technical Analysis", description: "Charts samjhna seekho", color: "from-amber-500 to-amber-600", recommended: false },
  { level: 7, title: "Fundamental Analysis", description: "Company value nikalo", color: "from-orange-500 to-orange-600", recommended: false },
  { level: 8, title: "Confident Investor", description: "Real decisions lo", color: "from-purple-500 to-purple-600", recommended: false },
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
          
          <Link href="/learn/level-1" data-testid="link-start-learning">
            <Button size="lg" className="gap-2" data-testid="button-start-learning">
              <Play className="w-4 h-4" />
              Start Learning – Level 1
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20 mb-3">
              <GraduationCap className="w-3 h-3 mr-1" />
              Learning Path
            </Badge>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              8 Levels – Zero se Confident Investor Tak
            </h2>
            <p className="text-sm text-muted-foreground">(Step-by-step, apni speed se seekho)</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {learningLevels.map((level) => (
              <Link key={level.level} href={`/learn/level-${level.level}`} data-testid={`link-level-${level.level}`}>
                <Card className={`h-full hover-elevate cursor-pointer group ${level.recommended ? 'ring-2 ring-emerald-500/50' : ''}`} data-testid={`card-level-${level.level}`}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${level.color} text-white flex items-center justify-center font-bold`}>
                        {level.level}
                      </div>
                      {level.recommended && (
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-0 text-xs">
                          Start
                        </Badge>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-sm">{level.title}</h3>
                      <p className="text-xs text-muted-foreground">{level.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
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
