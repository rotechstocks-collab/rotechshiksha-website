import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  BookOpen,
  TrendingUp,
  Zap,
  Bot,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface CourseLevel {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  topics: string[];
  color: string;
  href: string;
  badge?: string;
}

const courseLevels: CourseLevel[] = [
  {
    id: "basic",
    number: 1,
    title: "Stock Market Basics",
    description: "Start your journey with fundamentals of stock market investing",
    icon: <BookOpen className="w-7 h-7" />,
    topics: [
      "What is Stock Market",
      "NSE & BSE Explained",
      "Demat & Trading Account",
      "Order Types",
      "Candlestick Basics",
    ],
    color: "emerald",
    href: "/courses/basic",
    badge: "Beginner",
  },
  {
    id: "intermediate",
    number: 2,
    title: "Technical Analysis",
    description: "Master chart patterns and technical indicators",
    icon: <TrendingUp className="w-7 h-7" />,
    topics: [
      "Chart Patterns",
      "Support & Resistance",
      "RSI, MACD, Moving Average",
      "Volume Analysis",
      "Risk Management",
    ],
    color: "blue",
    href: "/courses/intermediate",
  },
  {
    id: "advanced",
    number: 3,
    title: "Options & Strategies",
    description: "Advanced options trading and professional strategies",
    icon: <Zap className="w-7 h-7" />,
    topics: [
      "Option Chain Analysis",
      "Open Interest",
      "Greeks Basics",
      "Intraday Strategies",
      "Trading Psychology",
    ],
    color: "purple",
    href: "/courses/advanced",
    badge: "Advanced",
  },
  {
    id: "algo",
    number: 4,
    title: "Algo Trading",
    description: "Automate your trading with algorithms and backtesting",
    icon: <Bot className="w-7 h-7" />,
    topics: [
      "What is Algo Trading",
      "Strategy Creation",
      "Backtesting Basics",
      "Live Deployment",
      "No-Code Solutions",
    ],
    color: "amber",
    href: "/courses/algo",
    badge: "New",
  },
];

const colorConfig = {
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    icon: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    bullet: "bg-emerald-500",
    number: "bg-emerald-500",
  },
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    icon: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    bullet: "bg-blue-500",
    number: "bg-blue-500",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    icon: "text-purple-600 dark:text-purple-400",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    bullet: "bg-purple-500",
    number: "bg-purple-500",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-950/20",
    icon: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    bullet: "bg-amber-500",
    number: "bg-amber-500",
  },
};

export function CourseCards() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();

  const handleViewContent = (e: React.MouseEvent, courseTitle: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      setPendingAction(`access ${courseTitle}`);
      setShowAuthPopup(true);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Learning Modules
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Structured courses from basics to advanced algo trading - learn step by step
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courseLevels.map((course, index) => {
            const colors = colorConfig[course.color as keyof typeof colorConfig];
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="bg-white dark:bg-card rounded-xl border border-border/50 p-6 h-full flex flex-col relative transition-all duration-200 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-0.5"
                  data-testid={`card-course-${course.id}`}
                >
                  <div className={`absolute -top-3 -left-2 w-8 h-8 rounded-full ${colors.number} text-white flex items-center justify-center text-sm font-bold shadow-md`}>
                    {course.number}
                  </div>
                  
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.icon} flex items-center justify-center mb-4`}>
                    {course.icon}
                  </div>
                  
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{course.title}</h3>
                  </div>
                  
                  {course.badge && (
                    <Badge className={`${colors.badge} border-0 w-fit mb-3`} variant="outline">
                      {course.badge}
                    </Badge>
                  )}
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6 flex-1">
                    {course.topics.slice(0, 4).map((topic, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${colors.bullet}`} />
                        <span className="line-clamp-1">{topic}</span>
                      </li>
                    ))}
                    {course.topics.length > 4 && (
                      <li className="text-xs text-primary font-medium">
                        +{course.topics.length - 4} more topics
                      </li>
                    )}
                  </ul>

                  <Link href={course.href}>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={(e) => handleViewContent(e, course.title)}
                      data-testid={`button-view-${course.id}`}
                    >
                      <span>Start Learning</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/courses">
            <Button variant="outline" size="lg" className="gap-2">
              View All Courses
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
