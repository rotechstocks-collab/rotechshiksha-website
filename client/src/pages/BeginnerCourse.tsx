import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  GraduationCap,
  Wallet,
  Brain,
  Play,
  CheckCircle,
  Shield,
  Download,
  Users,
  Star,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { ModuleCard } from "@/components/ModuleCard";
import { useLanguage } from "@/context/LanguageContext";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
}

interface Module {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  lessons: Lesson[];
}

const modules: Module[] = [
  {
    id: 1,
    title: "Stock Market ki Shuruaat",
    subtitle: "The Beginning",
    description: "Pehla kadam – stock market ko samjhein bina kisi confusion ke",
    icon: <BookOpen className="w-6 h-6" />,
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    lessons: [
      { id: "m1-l1", slug: "paise-invest-kyu", title: "Paise ko invest kyu karna chahiye?", duration: "8 min" },
      { id: "m1-l2", slug: "stock-market-kya-hai", title: "Stock market kya hota hai?", duration: "10 min" },
      { id: "m1-l3", slug: "share-kya-hai", title: "Share kya hota hai?", duration: "8 min" },
      { id: "m1-l4", slug: "sensex-nifty", title: "Sensex aur Nifty simple samjhaav", duration: "12 min" },
      { id: "m1-l5", slug: "ipo-kya-hai", title: "IPO kya hota hai?", duration: "10 min" },
    ],
  },
  {
    id: 2,
    title: "Account aur Basics",
    subtitle: "Getting Started",
    description: "Trading shuru karne ke liye kya chahiye – step by step",
    icon: <Wallet className="w-6 h-6" />,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
    lessons: [
      { id: "m2-l1", slug: "demat-account", title: "Demat account kya hota hai?", duration: "8 min" },
      { id: "m2-l2", slug: "trading-account", title: "Trading account kya hota hai?", duration: "8 min" },
      { id: "m2-l3", slug: "share-kaise-kharide", title: "Share kaise kharide-beche jaate hain?", duration: "12 min" },
      { id: "m2-l4", slug: "price-kaise-move", title: "Market me price kaise move karta hai?", duration: "10 min" },
    ],
  },
  {
    id: 3,
    title: "Beginner Investing Soch",
    subtitle: "Mindset & Safety",
    description: "Sahi soch aur safe tarike se investing seekhein",
    icon: <Brain className="w-6 h-6" />,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
    lessons: [
      { id: "m3-l1", slug: "long-term-investing", title: "Long term investing kya hota hai?", duration: "10 min" },
      { id: "m3-l2", slug: "risk-ka-matlab", title: "Risk ka matlab kya hai?", duration: "8 min" },
      { id: "m3-l3", slug: "beginner-mistakes", title: "Beginner common mistakes", duration: "12 min" },
      { id: "m3-l4", slug: "safe-learning-rules", title: "Safe learning rules", duration: "8 min" },
    ],
  },
];

export default function BeginnerCourse() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalDuration = modules.reduce((acc, m) => {
    return acc + m.lessons.reduce((a, l) => a + parseInt(l.duration), 0);
  }, 0);

  return (
    <div className="bg-slate-50 dark:bg-background">
      <SEOHead
        title="Beginner Stock Market Course – Rotech Shiksha"
        description="Learn stock market basics step by step in simple Hinglish. Complete beginner course with 13 lessons across 3 modules."
        keywords="stock market course hindi, beginner investing course, share market basics, learn investing india"
      />

      <section className="pt-12 md:pt-16 pb-10 md:pb-14 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-0 mb-4">
              <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
              Beginner Course
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
              Stock Market Seekho
              <br />
              <span className="text-emerald-600 dark:text-emerald-400">— Zero Se Hero Tak</span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-8">
              Simple Hinglish mein, step-by-step learning. 
              Complete beginners ke liye banaya gaya course.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{totalLessons} Chapters</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{totalDuration} min</span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">100% Free</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/beginner-course/paise-invest-kyu" data-testid="link-start-course">
                <Button size="lg" className="gap-2 min-h-[48px] text-base px-8" data-testid="button-start-course">
                  <Play className="w-5 h-5" />
                  Start Learning
                </Button>
              </Link>
              <a href="/pdf/stock-market-beginner-checklist.pdf" download target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="gap-2 min-h-[48px]" data-testid="button-download-checklist-course">
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 bg-white dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="font-bold text-lg text-slate-900 dark:text-white">4.8</span>
              </div>
              <span className="text-xs text-muted-foreground">Avg Rating</span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-lg text-slate-900 dark:text-white">10,000+</span>
              </div>
              <span className="text-xs text-muted-foreground">Learners</span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-lg text-slate-900 dark:text-white">{modules.length}</span>
              </div>
              <span className="text-xs text-muted-foreground">Modules</span>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="font-bold text-lg text-emerald-600">FREE</span>
              </div>
              <span className="text-xs text-muted-foreground">No Payment</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Course Curriculum
            </h2>
            <p className="text-muted-foreground">
              {modules.length} Modules • {totalLessons} Chapters • Hinglish mein
            </p>
          </div>

          <div className="space-y-4">
            {modules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ModuleCard
                  moduleNumber={module.id}
                  title={module.title}
                  subtitle={module.subtitle}
                  description={module.description}
                  icon={module.icon}
                  color={module.color}
                  bgColor={module.bgColor}
                  lessons={module.lessons}
                  basePath="/beginner-course"
                  defaultOpen={index === 0}
                  totalDuration={`${module.lessons.reduce((a, l) => a + parseInt(l.duration), 0)} min`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-emerald-50 dark:bg-emerald-950/20 border-t border-emerald-100 dark:border-emerald-900/30">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Ready to Start Your Journey?
          </h2>
          <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
            Pehla lesson padhne ke baad confidence aayega. Simple Hindi mein samjhao.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/beginner-course/paise-invest-kyu">
              <Button size="lg" className="gap-2" data-testid="button-beginner-cta-primary">
                <Play className="w-4 h-4" />
                Pehla Lesson Shuru Karo
              </Button>
            </Link>
            <Link href="/calculators">
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-beginner-cta-secondary">
                Calculators Try Karo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-6 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-start gap-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50">
            <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <span className="font-medium text-slate-700 dark:text-slate-300">Education Only:</span> Rotech Shiksha is an education platform. We do not provide trading tips or investment advice. Always do your own research before making any financial decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
