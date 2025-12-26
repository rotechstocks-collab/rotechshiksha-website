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
  Target,
  Lightbulb,
  GraduationCap,
  IndianRupee,
  Wallet,
  Banknote,
  TrendingUp,
  Users,
  Shield,
  CheckCircle,
  Play,
  Star,
} from "lucide-react";
import {
  CalculatorIllustration,
  GrowthChart,
  BookLearning,
} from "@/components/Illustrations";

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
  { level: 4, title: "Mutual Funds & SIP", description: "Smart investing without stock picking", color: "from-cyan-500 to-cyan-600", recommended: false },
  { level: 5, title: "Technical Analysis", description: "Charts aur price patterns samjhein", color: "from-amber-500 to-amber-600", recommended: false },
  { level: 6, title: "Fundamental Analysis", description: "Companies ki value kaise nikalein", color: "from-orange-500 to-orange-600", recommended: false },
  { level: 7, title: "Risk Management", description: "Apne investments ko protect karna", color: "from-rose-500 to-rose-600", recommended: false },
  { level: 8, title: "Confident Investor", description: "Real decisions through Rohit & Priya", color: "from-purple-500 to-purple-600", recommended: false },
];

const popularCalculators = [
  { id: "sip", name: "SIP Calculator", icon: <PiggyBank className="w-6 h-6" />, color: "from-emerald-500 to-teal-500", description: "Plan your monthly investments" },
  { id: "lumpsum", name: "Lumpsum", icon: <Wallet className="w-6 h-6" />, color: "from-blue-500 to-indigo-500", description: "Calculate one-time investments" },
  { id: "cagr", name: "CAGR Calculator", icon: <TrendingUp className="w-6 h-6" />, color: "from-purple-500 to-pink-500", description: "Find your growth rate" },
  { id: "ppf", name: "PPF Calculator", icon: <Shield className="w-6 h-6" />, color: "from-cyan-500 to-blue-500", description: "Public Provident Fund returns" },
  { id: "fd", name: "FD Calculator", icon: <Banknote className="w-6 h-6" />, color: "from-amber-500 to-orange-500", description: "Fixed deposit maturity" },
  { id: "emi", name: "EMI Calculator", icon: <IndianRupee className="w-6 h-6" />, color: "from-rose-500 to-red-500", description: "Calculate loan EMIs" },
];

const trustPoints = [
  { icon: <BookOpen className="w-6 h-6" />, title: "Beginner-friendly Hindi", description: "Simple language, no confusing terms" },
  { icon: <Users className="w-6 h-6" />, title: "Story-based learning", description: "Learn through Rohit & Priya's journey" },
  { icon: <Target className="w-6 h-6" />, title: "Indian market focused", description: "NSE/BSE examples only" },
  { icon: <Calculator className="w-6 h-6" />, title: "Free practical calculators", description: "SIP, EMI, CAGR & more" },
  { icon: <GraduationCap className="w-6 h-6" />, title: "Structured 8-level path", description: "Zero se confident investor tak" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
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
                    <span className="text-sm font-medium">10,000+ Students</span>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              8 Simple Levels
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
                <Link href={level.level <= 2 ? `/learn/level-${level.level}` : `/courses/${level.level <= 4 ? 'intermediate' : level.level <= 6 ? 'advanced' : 'algo'}`} data-testid={`link-level-${level.level}`}>
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

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <Card className="bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/20">
                <CardContent className="p-8 space-y-6">
                  <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Story Introduction
                  </Badge>
                  
                  <h3 className="text-2xl font-bold text-foreground">
                    Rohit aur Priya ki Journey
                  </h3>
                  
                  <p className="text-muted-foreground">
                    Rohit ek normal job karta hai.
                  </p>
                  <p className="text-muted-foreground">
                    Usne suna stock market me paisa banta hai, lekin terms aur risk se wo confuse ho jata hai.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Priya</strong>, ek calm aur practical mentor, use basics se samjhana shuru karti hai.
                  </p>
                  <p className="text-muted-foreground">
                    Ye platform usi journey par based hai.
                  </p>
                  
                  <div className="flex gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                        <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm font-medium">Rohit</p>
                      <p className="text-xs text-muted-foreground">The Learner</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-2">
                        <Lightbulb className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                      </div>
                      <p className="text-sm font-medium">Priya</p>
                      <p className="text-xs text-muted-foreground">The Mentor</p>
                    </div>
                  </div>
                  
                  <Link href="/learn/level-1" data-testid="link-start-level-1">
                    <Button className="gap-2 w-full" data-testid="button-start-level-1">
                      <ArrowRight className="w-4 h-4" />
                      Rohit ki Journey Shuru Karo (Level 1)
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 space-y-4"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                What You Will <span className="text-primary">Learn</span>
              </h2>
              <p className="text-muted-foreground">
                Yahan aap seekhenge:
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Share market kya hai aur kaise kaam karta hai</h4>
                    <p className="text-sm text-muted-foreground">IPO, stocks, index aur mutual funds ka real meaning</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Risk kya hota hai aur use kaise control kare</h4>
                    <p className="text-sm text-muted-foreground">Long-term investing vs short-term trading</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Charts aur indicators ko beginner-friendly tarike se samajhna</h4>
                    <p className="text-sm text-muted-foreground">Real examples aur step-by-step guidance</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
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
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Popular Calculators
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Learning ke saath practical tools – bilkul free
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
                View All 20+ Calculators
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12 space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Shield className="w-3 h-3 mr-1" />
              Why Rotech Shiksha
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Kyun Chunein Rotech Shiksha?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hindi first, soon all Indian languages
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {trustPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-4 p-6"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  {point.icon}
                </div>
                <h3 className="font-semibold text-foreground">{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Aaj Hi Shuru Karo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Agar aap bhi Rohit jaise confused ho ya Priya ki tarah smart decision lena chahte ho, toh aaj hi shuru karo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/learn/level-1" data-testid="link-start-journey">
                <Button size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-start-journey">
                  <GraduationCap className="w-4 h-4" />
                  Start Learning – Level 1
                </Button>
              </Link>
              <Link href="/calculators" data-testid="link-try-calculators">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto" data-testid="button-try-calculators">
                  <Calculator className="w-4 h-4" />
                  Try Our Calculators
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
