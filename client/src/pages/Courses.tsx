import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  FileText,
  Lock,
  Play,
  ChevronRight,
  Clock,
  TrendingUp,
  Zap,
  Bot,
  GraduationCap,
  Target,
  Shield,
} from "lucide-react";
import { LottieAnimation } from "@/components/LottieAnimation";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";
import { SEOHead } from "@/components/SEOHead";

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

const colorClasses: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
  emerald: { 
    bg: "bg-emerald-50 dark:bg-emerald-950/30", 
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
    gradient: "from-emerald-500 to-teal-600"
  },
  blue: { 
    bg: "bg-blue-50 dark:bg-blue-950/30", 
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    gradient: "from-blue-500 to-indigo-600"
  },
  purple: { 
    bg: "bg-purple-50 dark:bg-purple-950/30", 
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
    gradient: "from-purple-500 to-violet-600"
  },
  amber: { 
    bg: "bg-amber-50 dark:bg-amber-950/30", 
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
    gradient: "from-amber-500 to-orange-600"
  },
};

const levelCourses = [
  {
    level: 1,
    title: "Stock Market ki Shuruaat",
    description: "Bilkul shuru se seekho - shares, market, aur investment ki basic samajh",
    lottieUrl: "https://assets2.lottiefiles.com/packages/lf20_kuuzhuxq.json",
    fallbackIcon: <BookOpen className="w-10 h-10" />,
    color: "emerald",
    route: "/level-1",
    lessons: 5,
  },
  {
    level: 2,
    title: "Market Basics aur Tools",
    description: "Demat account, broker selection, aur trading tools ki jaankari",
    lottieUrl: "https://assets3.lottiefiles.com/packages/lf20_swnrn2oy.json",
    fallbackIcon: <TrendingUp className="w-10 h-10" />,
    color: "blue",
    route: "/learn/level-2",
    lessons: 5,
  },
  {
    level: 3,
    title: "Risk aur Planning",
    description: "Risk management aur investment planning ki samajh",
    lottieUrl: "https://assets9.lottiefiles.com/packages/lf20_tljjahng.json",
    fallbackIcon: <Shield className="w-10 h-10" />,
    color: "purple",
    route: "/learn/level-3",
    lessons: 5,
  },
  {
    level: 4,
    title: "Chart Reading Basics",
    description: "Price charts aur candlesticks ko padhna seekho",
    lottieUrl: "https://assets4.lottiefiles.com/packages/lf20_qp1q7mct.json",
    fallbackIcon: <Target className="w-10 h-10" />,
    color: "amber",
    route: "/learn/level-4",
    lessons: 5,
  },
  {
    level: 5,
    title: "Technical Analysis",
    description: "Indicators aur patterns ki madad se market samjho",
    lottieUrl: "https://assets5.lottiefiles.com/packages/lf20_kxsd2ytq.json",
    fallbackIcon: <Zap className="w-10 h-10" />,
    color: "emerald",
    route: "/learn/level-5",
    lessons: 5,
  },
  {
    level: 6,
    title: "Fundamental Analysis",
    description: "Company ke financials aur business ko samjho",
    lottieUrl: "https://assets7.lottiefiles.com/packages/lf20_yzoqyyqf.json",
    fallbackIcon: <GraduationCap className="w-10 h-10" />,
    color: "blue",
    route: "/learn/level-6",
    lessons: 5,
  },
  {
    level: 7,
    title: "Portfolio Building",
    description: "Apna diversified portfolio banana seekho",
    lottieUrl: "https://assets1.lottiefiles.com/packages/lf20_sz9mnlk7.json",
    fallbackIcon: <BookOpen className="w-10 h-10" />,
    color: "purple",
    route: "/learn/level-7",
    lessons: 5,
  },
  {
    level: 8,
    title: "Advanced Strategies",
    description: "Options, derivatives aur advanced concepts",
    lottieUrl: "https://assets2.lottiefiles.com/packages/lf20_fcfjwiyb.json",
    fallbackIcon: <Bot className="w-10 h-10" />,
    color: "amber",
    route: "/learn/level-8",
    lessons: 5,
  },
];

function CoursesLanding() {
  const progressValue = 0;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Courses - Rotech Shiksha | Stock Market Education"
        description="Free stock market courses in Hindi. Learn from basics to advanced level with our structured learning path."
        keywords="stock market course hindi, share market course, learn trading india"
      />

      <section className="py-10 lg:py-14 bg-gradient-to-b from-emerald-50/50 to-background dark:from-emerald-950/10 dark:to-background border-b">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeInUp>
            <Badge variant="outline" className="mb-4 text-emerald-600 border-emerald-300 dark:text-emerald-400 dark:border-emerald-700">
              Free Learning Path
            </Badge>
            
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Stock Market Seekhein Step by Step
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              8 levels mein complete stock market education - bilkul beginners ke liye banayi gayi hai
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Your learning progress</span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">{progressValue}% completed</span>
              </div>
              <div className="relative">
                <Progress value={progressValue} className="h-3" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-transparent rounded-full"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="py-10 lg:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <StaggerContainer>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
              {levelCourses.map((course) => {
                const colors = colorClasses[course.color];
                return (
                  <StaggerItem key={course.level}>
                    <Link href={course.route} data-testid={`link-level-${course.level}`}>
                      <Card 
                        className={`h-full hover-elevate cursor-pointer transition-all duration-300 border-2 ${colors.border} bg-white dark:bg-card`}
                        data-testid={`card-level-${course.level}`}
                      >
                        <CardHeader className="pb-3">
                          <div className={`w-20 h-20 mx-auto mb-3 rounded-xl ${colors.bg} flex items-center justify-center overflow-visible`}>
                            <LottieAnimation
                              src={course.lottieUrl}
                              fallbackIcon={<div className={colors.text}>{course.fallbackIcon}</div>}
                              className="w-16 h-16"
                              speed={0.4}
                            />
                          </div>
                          
                          <div className="text-center">
                            <Badge 
                              variant="secondary" 
                              className={`mb-2 ${colors.bg} ${colors.text} border-0`}
                            >
                              Level {course.level}
                            </Badge>
                            <CardTitle className="text-lg leading-snug">
                              {course.title}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <CardDescription className="text-center text-sm mb-4 min-h-[40px]">
                            {course.description}
                          </CardDescription>
                          
                          <div className="text-center text-xs text-muted-foreground mb-4">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {course.lessons} lessons
                          </div>
                          
                          <Button 
                            className="w-full min-h-[48px] text-base font-medium gap-2"
                            data-testid={`button-start-level-${course.level}`}
                          >
                            <Play className="w-4 h-4" />
                            Start Learning
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerContainer>
        </div>
      </section>

      <section className="py-8 border-t bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInUp>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
              <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">
                  Education Platform Notice
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300/80">
                  Rotech Shiksha is an education platform. We do not provide trading tips or investment advice.
                  All content is for educational purposes only.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}

function CourseDetail({ level }: { level: string }) {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const course = courseData[level] || courseData.basic;
  const colors = colorClasses[course.color];

  const handleAccessContent = (topic: Topic) => {
    if (!isAuthenticated) {
      setPendingAction(`access "${topic.title}"`);
      setShowAuthPopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-8">
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

      <section className="py-6 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Rotech Shiksha is an education platform. We do not provide trading tips or investment advice.
          </p>
        </div>
      </section>
    </div>
  );
}

export default function Courses() {
  const [, params] = useRoute("/courses/:level");
  
  if (params?.level) {
    return <CourseDetail level={params.level} />;
  }
  
  return <CoursesLanding />;
}
