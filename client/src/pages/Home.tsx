import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  PiggyBank,
  TrendingUp,
  CheckCircle,
  Play,
  Star,
  Wallet,
  Banknote,
  IndianRupee,
  Shield,
  GraduationCap,
} from "lucide-react";
import {
  CalculatorIllustration,
  GrowthChart,
} from "@/components/Illustrations";
import { SEOHead } from "@/components/SEOHead";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const learningLevels = [
  { level: 1, title: "Stock Market ki Shuruaat", description: "Dar se samajh tak – Stock Market kya hai", color: "from-emerald-500 to-emerald-600", recommended: true },
  { level: 2, title: "Stock, Index & IPO", description: "Nifty, Sensex, aur IPO ka meaning", color: "from-blue-500 to-blue-600", recommended: false },
  { level: 3, title: "Investment Planning", description: "Paisa kahaan lagaye – Goals se shuru", color: "from-teal-500 to-teal-600", recommended: false },
  { level: 4, title: "Risk Management", description: "Loss se kaise bachein – Panic se door", color: "from-rose-500 to-rose-600", recommended: false },
  { level: 5, title: "Mutual Funds & SIP", description: "Smart investing without stock picking", color: "from-cyan-500 to-cyan-600", recommended: false },
  { level: 6, title: "Technical Analysis", description: "Charts aur price patterns samjhein", color: "from-amber-500 to-amber-600", recommended: false },
  { level: 7, title: "Fundamental Analysis", description: "Companies ki value kaise nikalein", color: "from-orange-500 to-orange-600", recommended: false },
  { level: 8, title: "Confident Investor", description: "Real decisions through Rohit & Priya", color: "from-purple-500 to-purple-600", recommended: false },
];

const popularCalculators = [
  { id: "sip", name: "SIP Calculator", icon: <PiggyBank className="w-6 h-6" />, color: "from-emerald-500 to-teal-500", description: "Monthly invest karo, future banao" },
  { id: "lumpsum", name: "Lumpsum Calculator", icon: <Wallet className="w-6 h-6" />, color: "from-blue-500 to-indigo-500", description: "Ek baar invest, kitna milega?" },
  { id: "cagr", name: "CAGR Calculator", icon: <TrendingUp className="w-6 h-6" />, color: "from-purple-500 to-pink-500", description: "Growth rate pata karo" },
  { id: "ppf", name: "PPF Calculator", icon: <Shield className="w-6 h-6" />, color: "from-cyan-500 to-blue-500", description: "PPF me kitna banega?" },
  { id: "fd", name: "FD Calculator", icon: <Banknote className="w-6 h-6" />, color: "from-amber-500 to-orange-500", description: "Fixed Deposit returns" },
  { id: "emi", name: "EMI Calculator", icon: <IndianRupee className="w-6 h-6" />, color: "from-rose-500 to-red-500", description: "Loan ki EMI nikalo" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Share Market Basics for Beginners | Rotech Shiksha"
        description="Learn share market from zero with story-based lessons, quizzes, and practice. Beginner friendly & educational. Hindi first, soon all Indian languages."
        keywords="stock market hindi, share market basics, learn investing india, beginner stock market, rotech shiksha"
      />
      
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative pt-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Star className="w-3 h-3 mr-1" />
                Rotech Shiksha
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                Stock Market Seekho Zero Se <br />
                <span className="text-primary">Bina Dar, Bina Confusion</span>
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                Rohit aur Priya ke saath step-by-step story-based learning, bilkul basics se.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/learn/level-1" data-testid="link-start-learning">
                  <Button size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-start-learning">
                    <Play className="w-4 h-4" />
                    Start Learning – Level 1
                  </Button>
                </Link>
                <Link href="/courses" data-testid="link-view-courses">
                  <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto" data-testid="button-view-courses">
                    Explore Learning Path
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-muted-foreground">Hindi first</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-muted-foreground">Soon all Indian languages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-muted-foreground">100% Free</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex justify-center relative"
            >
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-primary/10 via-blue-500/5 to-emerald-500/10 rounded-3xl flex items-center justify-center">
                  <GrowthChart size={280} />
                </div>
                <motion.div
                  className="absolute -top-4 -right-8 bg-card rounded-lg p-3 shadow-lg border"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-medium">Growing Community</span>
                  </div>
                </motion.div>
                <motion.div
                  className="absolute bottom-8 -left-6 bg-card rounded-lg p-3 shadow-lg border"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">8 Learning Levels</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 space-y-4">
            <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
              <GraduationCap className="w-3 h-3 mr-1" />
              Structured Learning Path
            </Badge>
            <p className="text-sm text-muted-foreground -mt-2">(Asaan step-by-step padhai ka system)</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              8 Levels – Zero se Confident Investor Tak
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Humne learning ko 8 simple levels me divide kiya hai, taaki aap bina pressure ke aage badh sakein
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {learningLevels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={level.level <= 8 ? `/learn/level-${level.level}` : `/courses/algo`} data-testid={`link-level-${level.level}`}>
                  <Card className={`h-full hover-elevate cursor-pointer group ${level.recommended ? 'ring-2 ring-emerald-500/50' : ''}`} data-testid={`card-level-${level.level}`}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.color} text-white flex items-center justify-center font-bold text-lg transform group-hover:scale-110 transition-transform`}>
                          {level.level}
                        </div>
                        {level.recommended && (
                          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-0 text-xs">
                            Start Here
                          </Badge>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">{level.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{level.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-3 gap-8 items-center mb-12">
            <motion.div {...fadeInUp} className="lg:col-span-2 space-y-4">
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                <Calculator className="w-3 h-3 mr-1" />
                Financial Tools
              </Badge>
              <p className="text-sm text-muted-foreground">(Paisa calculate karne ke free tools)</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Popular Calculators
              </h2>
              <p className="text-muted-foreground max-w-xl">
                SIP, EMI, FD – sabka hisaab ek jagah, bilkul free
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-center"
            >
              <CalculatorIllustration size={140} />
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {popularCalculators.map((calc, index) => (
              <motion.div
                key={calc.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link href={`/calculators/${calc.id}`} data-testid={`link-calc-${calc.id}`}>
                  <Card className="hover-elevate cursor-pointer group h-full" data-testid={`card-calc-${calc.id}`}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calc.color} text-white flex items-center justify-center transform group-hover:scale-110 transition-transform flex-shrink-0`}>
                        {calc.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{calc.name}</h3>
                        <p className="text-xs text-muted-foreground">{calc.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="text-center">
            <Link href="/calculators" data-testid="link-view-all-calculators">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-view-all-calculators">
                Saare Calculators Dekho
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
