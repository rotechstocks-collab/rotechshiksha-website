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

const colorClasses: Record<string, { bg: string; text: string }> = {
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400" },
  amber: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
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
      <div className="min-h-screen pt-28">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left space-y-4"
              >
                <h1 className="text-4xl font-bold text-foreground">Our Courses</h1>
                <p className="text-muted-foreground max-w-xl">
                  Choose your learning path and master the stock market step by step
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:flex justify-center relative"
              >
                <LearnerCharacter size={200} />
                <motion.div
                  className="absolute -top-4 -right-8"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <BookLearning size={100} />
                </motion.div>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.values(courseData).map((c, index) => {
                const cl = colorClasses[c.color];
                const totalTopics = c.modules.reduce((acc, m) => acc + m.topics.length, 0);
                return (
                  <Link key={c.id} href={`/courses/${c.id}`}>
                    <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-course-list-${c.id}`}>
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg ${cl.bg} ${cl.text} flex items-center justify-center mb-4`}>
                          {c.icon}
                        </div>
                        <CardTitle>{c.title}</CardTitle>
                        <CardDescription>{c.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{c.modules.length} Modules</span>
                          <span>{totalTopics} Topics</span>
                        </div>
                        <Button variant="ghost" className="w-full mt-4 justify-between">
                          View Course
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28">
      <section className="py-8 bg-card/50 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
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
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Accordion type="single" collapsible defaultValue={course.modules[0]?.id} className="space-y-4">
                {course.modules.map((module) => (
                  <AccordionItem key={module.id} value={module.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center gap-4 text-left">
                        <div className={`w-10 h-10 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center text-sm font-bold`}>
                          {module.topics.length}
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
      </section>
    </div>
  );
}
