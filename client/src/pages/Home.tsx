import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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
  LineChart,
  Newspaper,
  Star,
  Sparkles,
  BarChart3,
  Quote,
  X,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { CharacterAvatar, CharacterIntro, HeroCharacters } from "@/components/Characters";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { getProgress, UserProgress } from "@/lib/progress";

// Check if this is the user's first visit
const FIRST_VISIT_KEY = "rotech-first-visit-complete";
function isFirstVisit(): boolean {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem(FIRST_VISIT_KEY);
}
function markVisitComplete(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FIRST_VISIT_KEY, "true");
}

const calculators = [
  { id: "sip", name: "SIP Calculator", nameHi: "SIP कैलकुलेटर", icon: <PiggyBank className="w-5 h-5" />, color: "bg-emerald-500" },
  { id: "lumpsum", name: "Lumpsum", nameHi: "लम्पसम", icon: <Wallet className="w-5 h-5" />, color: "bg-blue-500" },
  { id: "cagr", name: "CAGR", nameHi: "CAGR", icon: <TrendingUp className="w-5 h-5" />, color: "bg-purple-500" },
  { id: "brokerage", name: "Brokerage", nameHi: "ब्रोकरेज", icon: <Calculator className="w-5 h-5" />, color: "bg-amber-500" },
];

const whyLearnHere = [
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Simple Hindi Mein",
    titleHi: "सरल हिंदी में",
    description: "No jargon, no complex terms. Stock market ko aise samjho jaise apne dost se baat kar rahe ho.",
    descriptionHi: "कोई जटिल शब्द नहीं। Stock market को ऐसे समझो जैसे अपने दोस्त से बात कर रहे हो।",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/30",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Fear-Free Learning",
    titleHi: "डर-मुक्त सीखना",
    description: "Safe investing samjhoge – galti karne ka darr khatam ho jayega. Confidence se start karo.",
    descriptionHi: "Safe investing समझोगे – गलती करने का डर खत्म हो जाएगा। Confidence से start करो।",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Action-Ready",
    titleHi: "Action-Ready",
    description: "Course ke baad apna pehla investment confidently kar sakte ho. Theory + practical dono.",
    descriptionHi: "Course के बाद अपना पहला investment confidently कर सकते हो। Theory + practical दोनों।",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
];

const learningPath = [
  {
    level: 1,
    title: "Basics Samjho",
    titleHi: "Basics समझो",
    description: "Stock market kya hai, shares kaise kaam karte hain",
    descriptionHi: "Stock market क्या है, shares कैसे काम करते हैं",
    lessons: 5,
    route: "/beginner-course",
    color: "bg-emerald-500",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    level: 2,
    title: "Investing Seekho",
    titleHi: "Investing सीखो",
    description: "Demat account, brokers, pehla share kaise khareedein",
    descriptionHi: "Demat account, brokers, पहला share कैसे खरीदें",
    lessons: 5,
    route: "/beginner-course",
    color: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    level: 3,
    title: "Smart Investor Bano",
    titleHi: "Smart Investor बनो",
    description: "Portfolio banana, risk samajhna, long-term growth",
    descriptionHi: "Portfolio बनाना, risk समझना, long-term growth",
    lessons: 3,
    route: "/beginner-course",
    color: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/30",
  },
];

const tools = [
  { 
    name: "Calculators", 
    nameHi: "कैलकुलेटर",
    description: "SIP, CAGR, Brokerage", 
    descriptionHi: "SIP, CAGR, ब्रोकरेज",
    icon: <Calculator className="w-5 h-5" />, 
    href: "/calculators",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  { 
    name: "Paper Trade", 
    nameHi: "पेपर ट्रेड",
    description: "Practice without risk", 
    descriptionHi: "बिना risk के practice",
    icon: <LineChart className="w-5 h-5" />, 
    href: "/paper-trade",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  { 
    name: "Live News", 
    nameHi: "लाइव न्यूज़",
    description: "Real-time market news", 
    descriptionHi: "Real-time मार्केट न्यूज़",
    icon: <Newspaper className="w-5 h-5" />, 
    href: "/live-news",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/30",
  },
  { 
    name: "Compare Brokers", 
    nameHi: "ब्रोकर तुलना",
    description: "Find the best broker", 
    descriptionHi: "सबसे अच्छा broker खोजें",
    icon: <BarChart3 className="w-5 h-5" />, 
    href: "/compare-brokers",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
];

const testimonials = [
  {
    name: "Amit K.",
    location: "Mumbai",
    text: "Pehle stock market se bahut darta tha. Ab confidently SIP karta hoon. Thanks Rotech!",
    textHi: "पहले stock market से बहुत डरता था। अब confidently SIP करता हूं। Thanks Rotech!",
    rating: 5,
  },
  {
    name: "Sneha R.",
    location: "Delhi",
    text: "Simple Hindi mein samjhaya – finally stock market samajh aaya!",
    textHi: "Simple Hindi में समझाया – finally stock market समझ आया!",
    rating: 5,
  },
  {
    name: "Raj P.",
    location: "Bangalore",
    text: "Free courses itne ache hain, paid courses ki zaroorat hi nahi padi.",
    textHi: "Free courses इतने अच्छे हैं, paid courses की ज़रूरत ही नहीं पड़ी।",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Learners", labelHi: "सीखने वाले" },
  { value: "8", label: "Free Lessons", labelHi: "Free पाठ" },
  { value: "100%", label: "Free", labelHi: "Free" },
  { value: "4.8", label: "Rating", labelHi: "रेटिंग" },
];

export default function Home() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [showWelcome, setShowWelcome] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  // Show welcome popup for first-time visitors (slight delay for better UX)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFirstVisit()) {
        setShowWelcome(true);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Load user progress for Continue Learning feature
  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const handleCloseWelcome = () => {
    markVisitComplete();
    setShowWelcome(false);
  };

  // Calculate continue learning destination based on completed levels
  // Since progress tracks completed levels (not individual lessons), 
  // we use currentLevel which is the next level to work on
  const getContinueUrl = (): string | null => {
    if (!progress) return null;
    // Show continue option if user has any progress (has completed at least one level)
    // or if currentLevel is > 1 (indicating progress)
    if (progress.completedLevels.length === 0 && progress.currentLevel <= 1) return null;
    // Link to the current level they should be working on
    const targetLevel = progress.currentLevel;
    if (targetLevel <= 8) {
      return `/courses/level${targetLevel}/lesson1`;
    }
    // If all levels complete, return to course overview
    return "/courses";
  };
  const continueUrl = getContinueUrl();

  return (
    <div className="min-h-screen bg-background">
      {/* First-time visitor Welcome Popup */}
      <Dialog open={showWelcome} onOpenChange={(open) => !open && handleCloseWelcome()}>
        <DialogContent className="max-w-md" data-testid="dialog-welcome-onboarding">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {isHindi ? "Rotech Shiksha में आपका स्वागत है!" : "Welcome to Rotech Shiksha!"}
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              {isHindi 
                ? "Stock market seekho – simple Hindi mein, step by step."
                : "Learn stock market – in simple Hindi, step by step."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center">
                <CharacterAvatar character="priya" size="sm" />
              </div>
              <div>
                <p className="font-medium text-foreground">{isHindi ? "प्रिया से मिलो" : "Meet Priya"}</p>
                <p className="text-sm text-muted-foreground">{isHindi ? "आपकी मार्गदर्शक" : "Your guide"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <CharacterAvatar character="rohit" size="sm" />
              </div>
              <div>
                <p className="font-medium text-foreground">{isHindi ? "रोहित से मिलो" : "Meet Rohit"}</p>
                <p className="text-sm text-muted-foreground">{isHindi ? "आपके साथ सीखने वाला" : "Learning with you"}</p>
              </div>
            </div>
            
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {isHindi ? "100% Free course – कोई hidden charges नहीं" : "100% Free course – no hidden charges"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {isHindi ? "Simple Hindi में समझाया गया" : "Explained in simple Hindi"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                {isHindi ? "Story-based learning – boring नहीं" : "Story-based learning – not boring"}
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link href="/beginner-course">
              <Button className="w-full gap-2" size="lg" onClick={handleCloseWelcome} data-testid="button-welcome-start-course">
                <Play className="w-4 h-4" />
                {isHindi ? "Free Course शुरू करें" : "Start Free Course"}
              </Button>
            </Link>
            <Button variant="ghost" onClick={handleCloseWelcome} data-testid="button-welcome-explore">
              {isHindi ? "पहले देखना चाहता हूं" : "Let me explore first"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <SEOHead
        title="Stock Market Seekho – Bilkul Zero Se | Rotech Shiksha"
        description="Simple Hindi mein stock market seekho. Beginner-friendly free course with step-by-step learning. No prior knowledge needed."
        keywords="stock market hindi, share market basics, learn investing india, beginner stock market, rotech shiksha"
      />
      
      <section className="pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 bg-gradient-to-b from-slate-50 via-white to-background dark:from-slate-900/50 dark:via-background dark:to-background">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 text-sm px-4 py-1">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              {isHindi ? "100% Free • Hindi में • Beginners के लिए" : "100% Free • In Hindi • For Beginners"}
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 tracking-tight">
              Stock Market Seekho
              <br />
              <span className="text-primary">— Bilkul Zero Se</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
              {isHindi 
                ? "Simple Hindi + Story-based learning with Priya & Rohit."
                : "Simple Hindi + Story-based learning with Priya & Rohit."}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Link href="/beginner-course" data-testid="link-start-learning-hero">
                <Button size="lg" className="w-full sm:w-auto gap-2 min-h-[56px] text-lg px-8 shadow-lg" data-testid="button-start-learning-hero">
                  <Play className="w-5 h-5" />
                  {isHindi ? "Free Course शुरू करें" : "Start Free Course"}
                </Button>
              </Link>
              <Link href="/calculators" data-testid="link-explore-tools">
                <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 min-h-[56px] text-lg px-8" data-testid="button-explore-tools">
                  <Calculator className="w-5 h-5" />
                  {isHindi ? "Tools देखें" : "Explore Tools"}
                </Button>
              </Link>
            </div>
            
            <HeroCharacters isHindi={isHindi} />
            
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {isHindi ? "No signup required" : "No signup required"}
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {isHindi ? "Education only" : "Education only"}
              </span>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-4 gap-4 mt-12 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{isHindi ? stat.labelHi : stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Continue Learning Banner for returning users */}
      {continueUrl && progress && progress.completedLevels.length > 0 && (
        <section className="py-4">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="bg-primary/5 border-primary/20 overflow-hidden">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {isHindi ? "वापस आने पर स्वागत है!" : "Welcome back!"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isHindi 
                          ? `${progress.completedLevels.length} स्तर पूरे किए | जहां छोड़ा था वहीं से शुरू करें`
                          : `${progress.completedLevels.length} levels done | Continue where you left off`}
                      </p>
                    </div>
                  </div>
                  <Link href={continueUrl}>
                    <Button className="gap-2 min-h-[44px]" data-testid="button-continue-learning-home">
                      <Play className="w-4 h-4" />
                      {isHindi ? "आगे बढ़ें" : "Continue Learning"}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <section className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200/50 dark:border-amber-800/30 overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex gap-3 items-center md:items-start">
                  <CharacterAvatar character="rohit" size="lg" />
                  <div className="md:hidden">
                    <p className="font-semibold text-foreground">Rohit</p>
                    <p className="text-xs text-muted-foreground">{isHindi ? "शायद आप भी" : "Maybe you too"}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="hidden md:flex items-center gap-2 mb-2">
                    <p className="font-semibold text-foreground text-lg">Rohit</p>
                    <Badge variant="outline" className="text-xs border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300">
                      {isHindi ? "शायद आप भी" : "Maybe you too"}
                    </Badge>
                  </div>
                  <p className="text-foreground/90 leading-relaxed">
                    {isHindi 
                      ? `"मैं एक आम आदमी हूं – नौकरी करता हूं, थोड़ी savings हैं, लेकिन stock market से डरता था। फिर मैंने Priya से सीखा – simple Hindi में, बिना jargon के। आज मैं confident हूं।"`
                      : `"I'm a regular guy – working job, some savings, but was scared of stock market. Then I learned from Priya – in simple Hindi, no jargon. Today I'm confident."`}
                  </p>
                  <p className="text-primary font-medium mt-3">
                    {isHindi ? "आपकी भी बारी है।" : "Your turn now."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800 mb-3">
              {isHindi ? "क्यों यहां सीखें?" : "Why Learn Here?"}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {isHindi ? "Course के बाद आप..." : "After This Course..."}
            </h2>
            <p className="text-muted-foreground">
              {isHindi ? "ये 3 चीज़ें ज़रूर होंगी" : "These 3 things will definitely happen"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyLearnHere.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-sm" data-testid={`card-why-${index}`}>
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 rounded-xl ${item.bgColor} flex items-center justify-center mb-4`}>
                      <span className={item.color}>{item.icon}</span>
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      {isHindi ? item.titleHi : item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {isHindi ? item.descriptionHi : item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 mb-3">
              <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
              {isHindi ? "Step-by-Step सीखें" : "Step-by-Step Learning"}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {isHindi ? "Beginner Learning Path" : "Beginner Learning Path"}
            </h2>
            <p className="text-muted-foreground">
              {isHindi ? "एक-एक step follow करो, confusion नहीं होगा" : "Follow each step, no confusion"}
            </p>
          </div>

          <div className="space-y-4">
            {learningPath.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={level.route} data-testid={`link-level-${level.level}`}>
                  <Card 
                    className={`hover-elevate cursor-pointer group border-0 shadow-sm ${level.lightBg}`}
                    data-testid={`card-level-${level.level}`}
                  >
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex items-center gap-4 sm:gap-5">
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${level.color} text-white flex items-center justify-center font-bold text-xl flex-shrink-0`}>
                          {level.level}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg text-foreground mb-1">
                            {isHindi ? level.titleHi : level.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {isHindi ? level.descriptionHi : level.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <BookOpen className="w-4 h-4" />
                            <span>{level.lessons} {isHindi ? "पाठ" : "lessons"}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-primary transition-colors flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/beginner-course" data-testid="link-start-path">
              <Button size="lg" className="gap-2 min-h-[52px] px-8" data-testid="button-start-path">
                <Play className="w-5 h-5" />
                {isHindi ? "Level 1 से शुरू करें" : "Start with Level 1"}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 mb-3">
              {isHindi ? "Free Tools" : "Free Tools"}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {isHindi ? "हमारे Tools" : "Our Tools"}
            </h2>
            <p className="text-muted-foreground">
              {isHindi ? "Investing आसान बनाने के लिए" : "To make investing easier"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={tool.href} data-testid={`link-tool-${tool.name.toLowerCase().replace(' ', '-')}`}>
                  <Card className="hover-elevate cursor-pointer h-full border-0 shadow-sm" data-testid={`card-tool-${index}`}>
                    <CardContent className="p-5 text-center">
                      <div className={`w-12 h-12 rounded-xl ${tool.bgColor} flex items-center justify-center mx-auto mb-3`}>
                        <span className={tool.color}>{tool.icon}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {isHindi ? tool.nameHi : tool.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {isHindi ? tool.descriptionHi : tool.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/calculators" data-testid="link-all-calculators">
              <Button variant="outline" className="gap-2" data-testid="button-all-calculators">
                {isHindi ? "सभी Calculators देखें" : "View All Calculators"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 mb-3">
              <Star className="w-3.5 h-3.5 mr-1.5" />
              {isHindi ? "Learners की राय" : "What Learners Say"}
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {isHindi ? "10,000+ लोगों ने सीखा" : "10,000+ Have Learned"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 shadow-sm" data-testid={`card-testimonial-${index}`}>
                  <CardContent className="p-5">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-muted-foreground/20 mb-2" />
                    <p className="text-foreground/90 leading-relaxed mb-4">
                      {isHindi ? testimonial.textHi : testimonial.text}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {isHindi ? "आज ही शुरू करें" : "Start Today"}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {isHindi 
              ? "10,000+ लोग पहले ही सीख चुके हैं। अब आपकी बारी है। 100% Free, कोई signup नहीं।"
              : "10,000+ people have already learned. Now it's your turn. 100% Free, no signup required."}
          </p>
          <Link href="/beginner-course" data-testid="link-cta-start">
            <Button size="lg" className="gap-2 min-h-[56px] text-lg px-10 shadow-lg" data-testid="button-cta-start">
              <Play className="w-5 h-5" />
              {isHindi ? "Free में सीखना शुरू करें" : "Start Learning for Free"}
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-4">
            {isHindi 
              ? "Education only • No tips • No stock recommendations"
              : "Education only • No tips • No stock recommendations"}
          </p>
        </div>
      </section>

      <section className="py-6 sm:py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="grid grid-cols-2 gap-4">
            <Link href="/blog" data-testid="link-blog-home">
              <Card className="hover-elevate cursor-pointer h-full border-0 shadow-sm" data-testid="card-blog-home">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {isHindi ? "Market Gyaan" : "Market Gyaan"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isHindi ? "Simple articles" : "Simple articles"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/faq" data-testid="link-faq-home">
              <Card className="hover-elevate cursor-pointer h-full border-0 shadow-sm" data-testid="card-faq-home">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">
                      {isHindi ? "Beginner FAQ" : "Beginner FAQ"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {isHindi ? "Common questions" : "Common questions"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-4 bg-muted/50 border-t border-border/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>Disclaimer:</strong> {isHindi 
              ? "यह website सिर्फ educational purpose के लिए है। हम investment advice या trading tips नहीं देते। Invest करने से पहले अपनी research करें।"
              : "This website is for educational purpose only. We do not provide investment advice or trading tips. Please do your own research before investing."}
          </p>
        </div>
      </section>
    </div>
  );
}
