import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  FileText,
  Lock,
  Play,
  Download,
  ChevronRight,
  Clock,
  CheckCircle,
  TrendingUp,
  Zap,
  Bot,
} from "lucide-react";
import { LearnerCharacter, BookLearning, GrowthChart } from "@/components/Illustrations";

interface Topic {
  id: string;
  title: string;
  type: "video" | "ebook";
  duration?: string;
  isFree: boolean;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

interface CourseData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  modules: CourseModule[];
}

const courseData: Record<string, CourseData> = {
  basic: {
    id: "basic",
    title: "Basic Level",
    description: "Start your stock market journey with fundamentals",
    icon: <BookOpen className="w-6 h-6" />,
    color: "emerald",
    modules: [
      {
        id: "intro",
        title: "Introduction to Stock Market",
        description: "Understanding the basics of how stock markets work",
        topics: [
          { id: "b1", title: "What is Stock Market?", type: "video", duration: "15 min", isFree: true },
          { id: "b2", title: "NSE & BSE Explained", type: "video", duration: "12 min", isFree: true },
          { id: "b3", title: "Equity, F&O, Currency, Commodity", type: "ebook", isFree: true },
          { id: "b4", title: "Market Participants", type: "video", duration: "10 min", isFree: true },
        ],
      },
      {
        id: "accounts",
        title: "Trading Accounts",
        description: "Setting up your trading infrastructure",
        topics: [
          { id: "b5", title: "Demat vs Trading Account", type: "video", duration: "18 min", isFree: true },
          { id: "b6", title: "How to Open an Account", type: "ebook", isFree: true },
          { id: "b7", title: "Choosing the Right Broker", type: "video", duration: "14 min", isFree: true },
        ],
      },
      {
        id: "basics",
        title: "Trading Basics",
        description: "Fundamental concepts every trader must know",
        topics: [
          { id: "b8", title: "Market Timings & Sessions", type: "video", duration: "8 min", isFree: true },
          { id: "b9", title: "Order Types Explained", type: "video", duration: "20 min", isFree: true },
          { id: "b10", title: "Candlestick Basics", type: "ebook", isFree: true },
          { id: "b11", title: "Reading Price Charts", type: "video", duration: "25 min", isFree: true },
        ],
      },
    ],
  },
  intermediate: {
    id: "intermediate",
    title: "Intermediate Level",
    description: "Master technical analysis and chart patterns",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "blue",
    modules: [
      {
        id: "patterns",
        title: "Chart Patterns",
        description: "Identify and trade classic chart patterns",
        topics: [
          { id: "i1", title: "Head & Shoulders Pattern", type: "video", duration: "22 min", isFree: true },
          { id: "i2", title: "Double Top & Bottom", type: "video", duration: "18 min", isFree: true },
          { id: "i3", title: "Triangles & Wedges", type: "ebook", isFree: true },
          { id: "i4", title: "Flag & Pennant Patterns", type: "video", duration: "15 min", isFree: true },
        ],
      },
      {
        id: "indicators",
        title: "Technical Indicators",
        description: "Use indicators to time your trades",
        topics: [
          { id: "i5", title: "RSI - Relative Strength Index", type: "video", duration: "25 min", isFree: true },
          { id: "i6", title: "MACD Explained", type: "video", duration: "28 min", isFree: true },
          { id: "i7", title: "Moving Averages Strategy", type: "ebook", isFree: true },
          { id: "i8", title: "Volume Analysis", type: "video", duration: "20 min", isFree: true },
        ],
      },
      {
        id: "risk",
        title: "Risk Management",
        description: "Protect your capital with proper risk management",
        topics: [
          { id: "i9", title: "Position Sizing", type: "video", duration: "22 min", isFree: true },
          { id: "i10", title: "Stop Loss Strategies", type: "video", duration: "18 min", isFree: true },
          { id: "i11", title: "Risk-Reward Ratio", type: "ebook", isFree: true },
        ],
      },
    ],
  },
  advanced: {
    id: "advanced",
    title: "Advanced Level",
    description: "Dive deep into options and pro strategies",
    icon: <Zap className="w-6 h-6" />,
    color: "purple",
    modules: [
      {
        id: "options",
        title: "Options Trading",
        description: "Understanding options from basics to advanced",
        topics: [
          { id: "a1", title: "Option Chain Analysis", type: "video", duration: "35 min", isFree: true },
          { id: "a2", title: "Open Interest Explained", type: "video", duration: "25 min", isFree: true },
          { id: "a3", title: "Greeks Basics - Delta, Theta", type: "ebook", isFree: true },
          { id: "a4", title: "Option Strategies", type: "video", duration: "40 min", isFree: true },
        ],
      },
      {
        id: "strategies",
        title: "Trading Strategies",
        description: "Proven strategies for different market conditions",
        topics: [
          { id: "a5", title: "Intraday Trading Strategies", type: "video", duration: "45 min", isFree: true },
          { id: "a6", title: "Swing Trading Setup", type: "video", duration: "35 min", isFree: true },
          { id: "a7", title: "Gap Trading Strategies", type: "ebook", isFree: true },
        ],
      },
      {
        id: "psychology",
        title: "Trading Psychology",
        description: "Master the mental game of trading",
        topics: [
          { id: "a8", title: "Discipline & Patience", type: "video", duration: "20 min", isFree: true },
          { id: "a9", title: "Handling Losses", type: "video", duration: "18 min", isFree: true },
          { id: "a10", title: "Building a Trading Plan", type: "ebook", isFree: true },
        ],
      },
    ],
  },
  algo: {
    id: "algo",
    title: "Algo Trading",
    description: "Automate your trading with algorithms",
    icon: <Bot className="w-6 h-6" />,
    color: "amber",
    modules: [
      {
        id: "intro",
        title: "Introduction to Algo Trading",
        description: "Understanding algorithmic trading fundamentals",
        topics: [
          { id: "al1", title: "What is Algo Trading?", type: "video", duration: "20 min", isFree: true },
          { id: "al2", title: "How Strategies are Created", type: "video", duration: "25 min", isFree: true },
          { id: "al3", title: "Rule-Based Strategy Logic", type: "ebook", isFree: true },
        ],
      },
      {
        id: "testing",
        title: "Testing & Deployment",
        description: "From backtesting to live trading",
        topics: [
          { id: "al4", title: "Backtesting Basics", type: "video", duration: "30 min", isFree: true },
          { id: "al5", title: "Paper Trading", type: "video", duration: "22 min", isFree: true },
          { id: "al6", title: "Live Deployment Concept", type: "ebook", isFree: true },
        ],
      },
      {
        id: "nocode",
        title: "No-Code Algo Trading",
        description: "Build algos without programming",
        topics: [
          { id: "al7", title: "Connecting Algo to Demat", type: "video", duration: "28 min", isFree: true },
          { id: "al8", title: "Risk Control in Algo", type: "video", duration: "20 min", isFree: true },
          { id: "al9", title: "No-Code Platforms Overview", type: "ebook", isFree: true },
          { id: "al10", title: "Low-Code Solutions", type: "video", duration: "25 min", isFree: true },
        ],
      },
    ],
  },
};

const colorClasses: Record<string, { bg: string; text: string; number: string }> = {
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-950/20", text: "text-emerald-600 dark:text-emerald-400", number: "bg-emerald-500" },
  blue: { bg: "bg-blue-50 dark:bg-blue-950/20", text: "text-blue-600 dark:text-blue-400", number: "bg-blue-500" },
  purple: { bg: "bg-purple-50 dark:bg-purple-950/20", text: "text-purple-600 dark:text-purple-400", number: "bg-purple-500" },
  amber: { bg: "bg-amber-50 dark:bg-amber-950/20", text: "text-amber-600 dark:text-amber-400", number: "bg-amber-500" },
};

export default function Courses() {
  const [, params] = useRoute("/courses/:level");
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const level = params?.level || "basic";
  const course = courseData[level] || courseData.basic;
  const colors = colorClasses[course.color];

  const handleAccessContent = (topic: Topic) => {
    if (!isAuthenticated) {
      setPendingAction(`access "${topic.title}"`);
      setShowAuthPopup(true);
    }
  };

  if (!params?.level) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Learning Modules
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Stock Market Courses
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your learning path and master the stock market step by step
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(courseData).map((c, index) => {
              const cl = colorClasses[c.color];
              const totalTopics = c.modules.reduce((acc, m) => acc + m.topics.length, 0);
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/courses/${c.id}`}>
                    <div 
                      className="bg-white dark:bg-card rounded-xl border border-border/50 p-6 h-full flex flex-col relative transition-all duration-200 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5 cursor-pointer"
                      data-testid={`card-course-list-${c.id}`}
                    >
                      <div className={`absolute -top-3 -left-2 w-8 h-8 rounded-full ${cl.number} text-white flex items-center justify-center text-sm font-bold shadow-md`}>
                        {index + 1}
                      </div>
                      
                      <div className={`w-14 h-14 rounded-xl ${cl.bg} ${cl.text} flex items-center justify-center mb-4`}>
                        {c.icon}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                        {c.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border/50">
                        <span>{c.modules.length} Modules</span>
                        <span>{totalTopics} Topics</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-white dark:bg-background">
      <div className="border-b border-border/50 py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ChevronRight className="w-4 h-4 rotate-180" />
            Back to Courses
          </Link>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center`}>
              {course.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible defaultValue={course.modules[0]?.id} className="space-y-4">
              {course.modules.map((module, moduleIndex) => (
                <AccordionItem key={module.id} value={module.id} className="bg-white dark:bg-card border border-border/50 rounded-xl px-5">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-4 text-left">
                      <div className={`w-10 h-10 rounded-lg ${colors.number} text-white flex items-center justify-center text-sm font-bold`}>
                        {moduleIndex + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="space-y-2 pl-14">
                      {module.topics.map((topic) => (
                        <div
                          key={topic.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover-elevate cursor-pointer"
                          onClick={() => handleAccessContent(topic)}
                          data-testid={`topic-${topic.id}`}
                        >
                          <div className="flex items-center gap-3">
                            {topic.type === "video" ? (
                              <Play className="w-4 h-4 text-primary" />
                            ) : (
                              <FileText className="w-4 h-4 text-primary" />
                            )}
                            <span className="text-sm text-foreground">{topic.title}</span>
                            {topic.duration && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {topic.duration}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {topic.isFree && (
                              <Badge variant="secondary" className="text-xs">Free</Badge>
                            )}
                            {!isAuthenticated && <Lock className="w-4 h-4 text-muted-foreground" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="text-lg">Course Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4">
                  {isAuthenticated ? (
                    <>
                      <div className="text-3xl font-bold text-primary mb-1">0%</div>
                      <p className="text-sm text-muted-foreground">Start learning to track progress</p>
                    </>
                  ) : (
                    <>
                      <Lock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Login to track your progress</p>
                      <Button
                        className="mt-4"
                        onClick={() => {
                          setPendingAction("track your learning progress");
                          setShowAuthPopup(true);
                        }}
                        data-testid="button-login-progress"
                      >
                        Login to Continue
                      </Button>
                    </>
                  )}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Modules</span>
                    <span className="font-medium">{course.modules.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Topics</span>
                    <span className="font-medium">
                      {course.modules.reduce((acc, m) => acc + m.topics.length, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">Self-paced</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
