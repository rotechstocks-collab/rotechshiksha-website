import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  TrendingUp,
  Zap,
  Bot,
  ChevronRight,
  Lock,
  Play,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface CourseLevel {
  id: string;
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
    title: "Basic Level",
    description: "Start your stock market journey with fundamentals",
    icon: <BookOpen className="w-6 h-6" />,
    topics: [
      "What is Stock Market",
      "NSE & BSE Explained",
      "Demat & Trading Account",
      "Order Types",
      "Candlestick Basics",
    ],
    color: "emerald",
    href: "/courses/basic",
    badge: "Beginner Friendly",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Master technical analysis and chart patterns",
    icon: <TrendingUp className="w-6 h-6" />,
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
    title: "Advanced Level",
    description: "Dive deep into options and pro strategies",
    icon: <Zap className="w-6 h-6" />,
    topics: [
      "Option Chain Analysis",
      "Open Interest",
      "Greeks Basics",
      "Intraday Strategies",
      "Trading Psychology",
    ],
    color: "purple",
    href: "/courses/advanced",
    badge: "Pro Level",
  },
  {
    id: "algo",
    title: "Algo Trading",
    description: "Automate your trading with algorithms",
    icon: <Bot className="w-6 h-6" />,
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

const colorClasses = {
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/20",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/20",
    badge: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-500/20",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
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
    <section className="py-16 lg:py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Complete Learning Path
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From stock market basics to advanced algo trading - learn everything step by step
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courseLevels.map((course, index) => {
            const colors = colorClasses[course.color as keyof typeof colorClasses];
            return (
              <Card
                key={course.id}
                className="group relative hover-elevate transition-all duration-300"
                data-testid={`card-course-${course.id}`}
              >
                <CardHeader className="pt-6">
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${colors.bg} ${colors.text} font-bold text-sm`}
                    >
                      {index + 1}
                    </div>
                    {course.badge && (
                      <Badge
                        className={`${colors.badge} border-0`}
                        variant="outline"
                      >
                        {course.badge}
                      </Badge>
                    )}
                  </div>
                  <div
                    className={`w-12 h-12 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}
                  >
                    {course.icon}
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {course.topics.map((topic, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${colors.bg.replace("/10", "")}`}
                        />
                        {topic}
                      </li>
                    ))}
                  </ul>

                  <Link href={course.href}>
                    <Button
                      className={`w-full justify-between group/btn bg-gradient-to-r ${
                        course.color === "emerald" ? "from-emerald-500 to-emerald-600" :
                        course.color === "blue" ? "from-blue-500 to-blue-600" :
                        course.color === "purple" ? "from-purple-500 to-purple-600" :
                        "from-amber-500 to-orange-500"
                      } text-white shadow-md`}
                      onClick={(e) => handleViewContent(e, course.title)}
                      data-testid={`button-view-${course.id}`}
                    >
                      <span className="flex items-center gap-2">
                        {!isAuthenticated ? <Lock className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isAuthenticated ? "Watch Now" : "Access Free Content"}
                      </span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
