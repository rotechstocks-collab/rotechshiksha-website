import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  TrendingUp, 
  Calculator, 
  BarChart3, 
  Target, 
  Lightbulb,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Clock,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StoryIntro, CTABlock } from "@/components/characters/StoryIntro";
import { useLanguage } from "@/context/LanguageContext";
import priyaAvatar from "@assets/generated_images/premium_priya_avatar_clean_vector.png";
import rohitAvatar from "@assets/generated_images/rohit_avatar_matching_priya_style.png";

const learningLevels = [
  {
    level: 1,
    title: "Stock Market Basics",
    titleHi: "Stock Market Ki Buniyaad",
    description: "Market kya hai, kaise kaam karta hai, aur kyun zaroori hai",
    duration: "2 weeks",
    lessons: 8,
    icon: BookOpen,
    color: "emerald",
    href: "/learn/level-1",
    topics: ["Market kya hai?", "Shares kaise kharide?", "Demat Account", "Trading vs Investing"]
  },
  {
    level: 2,
    title: "Technical Analysis",
    titleHi: "Chart Reading Seekho",
    description: "Charts padhna seekho, patterns samjho, aur timing master karo",
    duration: "3 weeks",
    lessons: 12,
    icon: TrendingUp,
    color: "blue",
    href: "/learn/level-2",
    topics: ["Candlestick Patterns", "Support & Resistance", "Moving Averages", "Volume Analysis"]
  },
  {
    level: 3,
    title: "Fundamental Analysis",
    titleHi: "Company Analysis Seekho",
    description: "Company ki asli value kaise nikaalein, financial statements padhna",
    duration: "3 weeks",
    lessons: 10,
    icon: BarChart3,
    color: "purple",
    href: "/learn/level-3",
    topics: ["P/E Ratio", "Balance Sheet", "Income Statement", "Valuation Methods"]
  },
  {
    level: 4,
    title: "Risk Management",
    titleHi: "Risk Sambhalo",
    description: "Apne paison ko kaise bachayein, stop-loss aur position sizing",
    duration: "2 weeks",
    lessons: 8,
    icon: Target,
    color: "orange",
    href: "/learn/level-4",
    topics: ["Stop Loss", "Position Sizing", "Portfolio Diversification", "Risk-Reward Ratio"]
  },
  {
    level: 5,
    title: "Trading Psychology",
    titleHi: "Mindset Master Karo",
    description: "Emotions control karo, discipline banao, consistent bano",
    duration: "2 weeks",
    lessons: 6,
    icon: Lightbulb,
    color: "pink",
    href: "/learn/level-5",
    topics: ["Fear & Greed", "Trading Journal", "Discipline", "Mental Models"]
  },
  {
    level: 6,
    title: "Options Trading",
    titleHi: "Options Ki Duniya",
    description: "Call, Put, Greeks, aur strategies - step by step",
    duration: "4 weeks",
    lessons: 16,
    icon: Calculator,
    color: "cyan",
    href: "/learn/level-6",
    topics: ["Call & Put Options", "Greeks", "Strategies", "Hedging"]
  },
  {
    level: 7,
    title: "Futures Trading",
    titleHi: "Futures Samjho",
    description: "Derivatives market, margin trading, aur hedging techniques",
    duration: "3 weeks",
    lessons: 10,
    icon: TrendingUp,
    color: "amber",
    href: "/learn/level-7",
    topics: ["Futures Basics", "Margin Trading", "Hedging", "Rollover"]
  },
  {
    level: 8,
    title: "Algo Trading",
    titleHi: "Automatic Trading",
    description: "Coding basics, backtesting, aur automated strategies",
    duration: "4 weeks",
    lessons: 14,
    icon: GraduationCap,
    color: "rose",
    href: "/learn/level-8",
    topics: ["Python Basics", "Backtesting", "API Trading", "Strategy Building"]
  }
];

const colorClasses: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  emerald: { 
    bg: "bg-emerald-50 dark:bg-emerald-900/20", 
    text: "text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
  },
  blue: { 
    bg: "bg-blue-50 dark:bg-blue-900/20", 
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-800",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
  },
  purple: { 
    bg: "bg-purple-50 dark:bg-purple-900/20", 
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-200 dark:border-purple-800",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
  },
  orange: { 
    bg: "bg-orange-50 dark:bg-orange-900/20", 
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-200 dark:border-orange-800",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300"
  },
  pink: { 
    bg: "bg-pink-50 dark:bg-pink-900/20", 
    text: "text-pink-700 dark:text-pink-300",
    border: "border-pink-200 dark:border-pink-800",
    badge: "bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-300"
  },
  cyan: { 
    bg: "bg-cyan-50 dark:bg-cyan-900/20", 
    text: "text-cyan-700 dark:text-cyan-300",
    border: "border-cyan-200 dark:border-cyan-800",
    badge: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300"
  },
  amber: { 
    bg: "bg-amber-50 dark:bg-amber-900/20", 
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
  },
  rose: { 
    bg: "bg-rose-50 dark:bg-rose-900/20", 
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300"
  }
};

export default function Learn() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-primary/5 via-background to-primary/10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Badge variant="secondary" className="mb-4">
              {isHindi ? "8-Level Learning Path" : "8-Level Seekhne Ka Raasta"}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {isHindi ? "Stock Market Seekho" : "Stock Market Seekho"}
              <span className="text-primary"> Step-by-Step</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isHindi 
                ? "Zero se hero tak ka safar - Priya aur Rohit ke saath. Har level ek nayi skill unlock karta hai!"
                : "Zero se hero tak ka safar - Priya aur Rohit ke saath. Har level ek nayi skill unlock karta hai!"
              }
            </p>
          </motion.div>

          {/* Character Intro with Avatars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 bg-card rounded-lg border">
              <div className="flex items-center gap-4">
                <img 
                  src={priyaAvatar} 
                  alt="Priya - Your Mentor" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500"
                  loading="lazy"
                />
                <div className="text-left">
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400">Priya</p>
                  <p className="text-sm text-muted-foreground">Teri Friendly Mentor</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-border" />
              <div className="flex items-center gap-4">
                <img 
                  src={rohitAvatar} 
                  alt="Rohit - Fellow Learner" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                  loading="lazy"
                />
                <div className="text-left">
                  <p className="font-semibold text-blue-700 dark:text-blue-400">Rohit</p>
                  <p className="text-sm text-muted-foreground">Tera Learning Partner</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Intro */}
      <StoryIntro
        priyaLine="Rohit, stock market seekhna hai toh step-by-step chalna padega. Shortcut liya toh paisa doobega!"
        rohitLine="Yaar Priya, main toh confused hoon kahaan se shuru karoon. Tu guide kar, main follow karunga!"
        variant="default"
      />

      {/* Stats Section */}
      <section className="py-8 border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl md:text-3xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Learning Levels</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl md:text-3xl font-bold text-primary">84+</div>
              <div className="text-sm text-muted-foreground">Video Lessons</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free Content</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl md:text-3xl font-bold text-primary">Hinglish</div>
              <div className="text-sm text-muted-foreground">Language</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Apna Level Choose Karo
            </h2>
            <p className="text-muted-foreground">
              Beginner ho? Level 1 se shuru karo. Kuch pata hai? Apna level choose karo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {learningLevels.map((level, index) => {
              const colors = colorClasses[level.color];
              const Icon = level.icon;
              
              return (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={level.href}>
                    <Card className="h-full hover-elevate cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className={`p-3 rounded-lg ${colors.bg}`}>
                            <Icon className={`w-6 h-6 ${colors.text}`} />
                          </div>
                          <Badge className={colors.badge}>
                            Level {level.level}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-3 group-hover:text-primary transition-colors">
                          {level.titleHi}
                        </CardTitle>
                        <CardDescription>{level.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {level.topics.slice(0, 3).map((topic) => (
                            <Badge key={topic} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                          {level.topics.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{level.topics.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {level.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {level.lessons} lessons
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why This Path Section */}
      <section className="py-12 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Ye Learning Path Kyun?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Random YouTube videos se kuch nahi hota. Structured learning se sab hota hai.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Step-by-Step Approach</h3>
                <p className="text-muted-foreground text-sm">
                  Pehle basics, phir advanced. Koi concept miss nahi hoga, sab sequence mein.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Priya & Rohit Ke Saath</h3>
                <p className="text-muted-foreground text-sm">
                  Boring lectures nahi, dost jaisi baat-cheet. Hinglish mein, simple bhasha mein.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Practical Application</h3>
                <p className="text-muted-foreground text-sm">
                  Har lesson ke baad action step. Theory + Practice = Real learning.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <CTABlock
        priyaLine="Rohit, tu abhi bhi soch raha hai ya shuru karega?"
        rohitLine="Yaar dar lagta hai, paise doob gaye toh? Lekin tu saath hai toh chal, shuru karte hain!"
        primaryButton={{
          text: "Level 1 Se Shuru Karo",
          href: "/learn/level-1",
          testId: "button-start-level-1"
        }}
        secondaryButton={{
          text: "Calculators Try Karo",
          href: "/calculators",
          testId: "button-try-calculators"
        }}
      />

      {/* Disclaimer */}
      <section className="py-6 border-t">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Disclaimer:</strong> Ye sirf educational content hai. Rotech Shiksha koi investment advisor nahi hai. 
            Stock market mein risk hota hai - apni research karo aur zaroorat ho toh SEBI-registered advisor se baat karo.
          </p>
        </div>
      </section>
    </div>
  );
}
