import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Download,
  FileText,
  Compass,
  Layers,
  Wrench,
  Zap,
  Clock,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Check,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { CharacterIntro, HeroCharacters } from "@/components/Characters";
import { CharacterAvatar } from "@/components/characters/CharacterAvatar";
import { HeroCharacterChat } from "@/components/characters/HeroCharacterChat";
import { StoryIntro, CTABlock } from "@/components/characters/StoryIntro";
import { CharacterDuo } from "@/components/characters/CharacterCard";
import { WhatsAppStrip } from "@/components/WhatsAppStrip";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { getProgress, UserProgress } from "@/lib/progress";
import { useToast } from "@/hooks/use-toast";

const FIRST_VISIT_KEY = "rotech-first-visit-complete";
const LEAD_STORAGE_KEY = "rotech-pdf-leads";

function isFirstVisit(): boolean {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem(FIRST_VISIT_KEY);
}
function markVisitComplete(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FIRST_VISIT_KEY, "true");
}

const stats = [
  { value: "10,000+", label: "Learners", labelHi: "सीखने वाले" },
  { value: "8", label: "Free Levels", labelHi: "Free Levels" },
  { value: "100%", label: "Free", labelHi: "Free" },
  { value: "4.8", label: "Rating", labelHi: "Rating" },
];

const whyLearnHere = [
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Market ko 10x easily samjhoge",
    titleHi: "Market को 10x आसानी से समझोगे",
    description: "Candlestick, trend, support/resistance — beginner friendly tarike se sikhoge.",
    descriptionHi: "Candlestick, trend, support/resistance — beginner friendly तरीके से सीखोगे।",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-900/30",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Fake tips se safe rahoge",
    titleHi: "Fake tips से safe रहोगे",
    description: "Risk control + common scams se bachna seekhoge. Ab koi bewakoof nahi bana payega.",
    descriptionHi: "Risk control + common scams से बचना सीखोगे। अब कोई बेवकूफ नहीं बना पाएगा।",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Paper trading se confidence build hoga",
    titleHi: "Paper trading से confidence build होगा",
    description: "Real market practice bina loss ke. Pehle seekho, phir invest karo.",
    descriptionHi: "Real market practice बिना loss के। पहले सीखो, फिर invest करो।",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
];

const exploreModules = [
  {
    title: "Courses",
    titleHi: "Courses",
    description: "8-level beginner to advanced course",
    descriptionHi: "Beginner se advanced tak 8 levels",
    icon: <GraduationCap className="w-6 h-6" />,
    href: "/courses",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Learning Path",
    titleHi: "Learning Path",
    description: "Step-by-step guided journey",
    descriptionHi: "Step-by-step guided journey",
    icon: <Compass className="w-6 h-6" />,
    href: "/beginner-course",
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Tools",
    titleHi: "Tools",
    description: "Calculators, paper trading, compare",
    descriptionHi: "Calculators, paper trading, compare",
    icon: <Wrench className="w-6 h-6" />,
    href: "/calculators",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    title: "Market Gyaan",
    titleHi: "Market Gyaan",
    description: "Tips, strategies & insights",
    descriptionHi: "Tips, strategies & insights",
    icon: <BookOpen className="w-6 h-6" />,
    href: "/blog",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    title: "News",
    titleHi: "News",
    description: "Latest market updates",
    descriptionHi: "Latest market updates",
    icon: <Newspaper className="w-6 h-6" />,
    href: "/live-news",
    color: "text-rose-600",
    bgColor: "bg-rose-100",
  },
];

const learningRoadmap = [
  {
    step: 1,
    title: "Basics Samjho",
    titleHi: "Basics समझो",
    description: "Stock market kya hai, shares kaise kaam karte hain",
    descriptionHi: "Stock market क्या है, shares कैसे काम करते हैं",
    icon: <BookOpen className="w-5 h-5" />,
    color: "bg-emerald-500",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    step: 2,
    title: "Practice with Tools",
    titleHi: "Tools se Practice",
    description: "Paper trading, SIP calculator, brokerage compare",
    descriptionHi: "Paper trading, SIP calculator, brokerage compare",
    icon: <Calculator className="w-5 h-5" />,
    color: "bg-blue-500",
    lightBg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    step: 3,
    title: "Advanced & Strategies",
    titleHi: "Advanced & Strategies",
    description: "Technical analysis, algo trading, portfolio building",
    descriptionHi: "Technical analysis, algo trading, portfolio building",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "bg-purple-500",
    lightBg: "bg-purple-50 dark:bg-purple-950/30",
  },
];

const mostUsedTools = [
  { 
    name: "SIP Calculator", 
    nameHi: "SIP Calculator",
    description: "Monthly investment growth calculate karo", 
    icon: <PiggyBank className="w-6 h-6" />, 
    href: "/calculators?calc=sip",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  { 
    name: "Paper Trade", 
    nameHi: "Paper Trade",
    description: "Bina risk ke trading practice karo", 
    icon: <LineChart className="w-6 h-6" />, 
    href: "/paper-trade",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  { 
    name: "Broker Compare", 
    nameHi: "Broker Compare",
    description: "Best broker select karo charges dekho", 
    icon: <BarChart3 className="w-6 h-6" />, 
    href: "/brokers",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
  },
  { 
    name: "EMI Calculator", 
    nameHi: "EMI Calculator",
    description: "Loan EMI aur interest calculate karo", 
    icon: <Calculator className="w-6 h-6" />, 
    href: "/calculators?calc=emi",
    color: "text-amber-600",
    bgColor: "bg-amber-50 dark:bg-amber-900/20",
  },
];

const faqs = [
  {
    question: "Kya ye course beginners ke liye hai?",
    questionHi: "क्या ये course beginners के लिए है?",
    answer: "Haan, bilkul! Yeh course zero knowledge se start hota hai. Koi prior experience ki zaroorat nahi. Simple Hindi mein step-by-step samjhayenge.",
    answerHi: "हां, बिल्कुल! यह course zero knowledge से start होता है। कोई prior experience की ज़रूरत नहीं। Simple Hindi में step-by-step समझाएंगे।",
  },
  {
    question: "Course kitne din mein complete hoga?",
    questionHi: "Course कितने दिन में complete होगा?",
    answer: "Apni speed pe depend karta hai. Agar daily 30 min doge, toh 2-3 weeks mein complete ho jayega. Lifetime access hai toh jaldi koi rush nahi.",
    answerHi: "अपनी speed पर depend करता है। अगर daily 30 min दोगे, तो 2-3 weeks में complete हो जाएगा। Lifetime access है तो जल्दी कोई rush नहीं।",
  },
  {
    question: "Kya investment tips milenge?",
    questionHi: "क्या investment tips मिलेंगे?",
    answer: "Nahi, hum SEBI registered advisor nahi hain. Yeh education platform hai - stock market samjhna sikhate hain, tips nahi dete. Decision aap khud loge.",
    answerHi: "नहीं, हम SEBI registered advisor नहीं हैं। यह education platform है - stock market समझना सिखाते हैं, tips नहीं देते। Decision आप खुद लोगे।",
  },
  {
    question: "Kya payment karna padega?",
    questionHi: "क्या payment करना पड़ेगा?",
    answer: "Abhi sab kuch FREE hai! 8 complete levels, calculators, paper trading - sab free. Future mein kuch premium features aa sakte hain, par core learning free rahega.",
    answerHi: "अभी सब कुछ FREE है! 8 complete levels, calculators, paper trading - सब free। Future में कुछ premium features आ सकते हैं, पर core learning free रहेगा।",
  },
  {
    question: "Mobile app hai kya?",
    questionHi: "Mobile app है क्या?",
    answer: "Abhi website hai jo mobile friendly hai. App jaldi aane wala hai. Browser mein bookmark kar lo - same experience milega.",
    answerHi: "अभी website है जो mobile friendly है। App जल्दी आने वाला है। Browser में bookmark कर लो - same experience मिलेगा।",
  },
  {
    question: "Priya aur Rohit kaun hain?",
    questionHi: "Priya और Rohit कौन हैं?",
    answer: "Priya tumhari guide hai jo concepts explain karti hai. Rohit tumhare jaisa learner hai jo sawal poochta hai. Dono ke saath story-based learning hai!",
    answerHi: "Priya तुम्हारी guide है जो concepts explain करती है। Rohit तुम्हारे जैसा learner है जो सवाल पूछता है। दोनों के साथ story-based learning है!",
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

function FAQItem({ faq, isHindi }: { faq: typeof faqs[0]; isHindi: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        data-testid={`faq-toggle-${faq.question.slice(0, 20)}`}
      >
        <span className="font-medium text-slate-900 dark:text-white pr-4">
          {isHindi ? faq.questionHi : faq.question}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {isHindi ? faq.answerHi : faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LeadCaptureSection({ isHindi }: { isHindi: boolean }) {
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/leads/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: contact.trim() }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setPdfUrl(data.pdfUrl || "/pdf/stock-market-beginner-checklist.pdf");
        toast({
          title: "Dhanyavaad!",
          description: "PDF ready hai - abhi download karo!",
        });
      } else {
        const leads = JSON.parse(localStorage.getItem(LEAD_STORAGE_KEY) || "[]");
        leads.push({ contact: contact.trim(), timestamp: new Date().toISOString() });
        localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(leads));
        setPdfUrl("/pdf/stock-market-beginner-checklist.pdf");
        toast({
          title: "Dhanyavaad!",
          description: "PDF ready hai!",
        });
      }
    } catch (error) {
      const leads = JSON.parse(localStorage.getItem(LEAD_STORAGE_KEY) || "[]");
      leads.push({ contact: contact.trim(), timestamp: new Date().toISOString() });
      localStorage.setItem(LEAD_STORAGE_KEY, JSON.stringify(leads));
      setPdfUrl("/pdf/stock-market-beginner-checklist.pdf");
      toast({
        title: "Dhanyavaad!",
        description: "PDF ready hai!",
      });
    }
    
    setIsSubmitting(false);
  };

  if (pdfUrl) {
    const pdfFeatures = [
      { icon: <CheckCircle className="w-4 h-4" />, text: "5 Steps to Start Investing" },
      { icon: <CheckCircle className="w-4 h-4" />, text: "Common Mistakes to Avoid" },
      { icon: <CheckCircle className="w-4 h-4" />, text: "Glossary + Tools" },
      { icon: <CheckCircle className="w-4 h-4" />, text: "Weekly Action Plan" },
    ];

    const handleShareOnWhatsApp = () => {
      const message = `Maine Rotech Shiksha se ye FREE Stock Market PDF download ki! Tum bhi download karo: ${window.location.origin}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden"
      >
        {/* Decorative blur circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200/40 dark:bg-emerald-800/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200/30 dark:bg-blue-800/15 rounded-full blur-3xl" />
        
        <div className="relative bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 dark:from-emerald-950/40 dark:via-slate-900/80 dark:to-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 rounded-2xl p-6 md:p-8">
          {/* Premium Badge */}
          <div className="flex justify-center mb-4">
            <Badge className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 px-3 py-1 gap-1.5">
              <Check className="w-3.5 h-3.5" />
              Premium PDF Ready
            </Badge>
          </div>
          
          {/* Main Content */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25"
            >
              <Check className="w-8 h-8 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Dhanyavaad!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Tumhara Premium PDF ready hai. Abhi download karo!
            </p>
          </div>

          {/* Download Button */}
          <div className="flex justify-center mb-4">
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex"
              data-testid="link-download-pdf"
            >
              <Button 
                size="lg" 
                className="gap-2 rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-[1.02]"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </Button>
            </a>
          </div>
          
          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-slate-500 dark:text-slate-400 mb-6">
            <span className="flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-500" />
              100% Free
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-500" />
              No Spam
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-500" />
              Instant Access
            </span>
          </div>

          {/* PDF Features Grid */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {pdfFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.3 }}
                className="flex items-center gap-2 bg-white/70 dark:bg-slate-800/50 rounded-lg px-3 py-2.5 border border-emerald-100 dark:border-emerald-900/50"
              >
                <span className="text-emerald-500">{feature.icon}</span>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-1 text-sm text-slate-600 dark:text-slate-400 mb-6">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span>10,000+ learners already downloaded this PDF</span>
          </div>

          {/* Divider */}
          <div className="border-t border-emerald-200/50 dark:border-emerald-800/50 pt-5">
            {/* Next Step Section */}
            <div className="bg-blue-50/80 dark:bg-blue-950/30 rounded-xl p-4 border border-blue-100 dark:border-blue-900/50">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                Next Step: Start Level 1 Free Course
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Link href="/courses/level1/lesson1" className="flex-1">
                  <Button variant="outline" className="w-full gap-2 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 btn-glow-primary" data-testid="button-start-level1">
                    <GraduationCap className="w-4 h-4" />
                    Start Level 1
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="gap-2 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                  onClick={handleShareOnWhatsApp}
                  data-testid="button-share-pdf-whatsapp"
                >
                  <Phone className="w-4 h-4" />
                  Share on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 md:p-8">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">
            Free PDF: Stock Market Beginner Checklist
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Simple Hinglish mein actionable steps – perfect for beginners
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          placeholder="Email ya WhatsApp number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
          data-testid="input-lead-capture"
        />
        <Button 
          type="submit" 
          className="w-full gap-2"
          disabled={isSubmitting || !contact.trim()}
          data-testid="button-send-pdf"
        >
          <Download className="w-4 h-4" />
          {isSubmitting ? "Sending..." : "Send me Free PDF"}
        </Button>
      </form>
      
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-3 text-center">
        No spam. Sirf learning updates. Unsubscribe anytime.
      </p>
    </div>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [showWelcome, setShowWelcome] = useState(false);
  const [progress, setProgress] = useState<UserProgress | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFirstVisit()) {
        setShowWelcome(true);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const handleCloseWelcome = () => {
    markVisitComplete();
    setShowWelcome(false);
  };

  const getContinueUrl = (): string | null => {
    if (!progress) return null;
    if (progress.completedLevels.length === 0 && progress.currentLevel <= 1) return null;
    const targetLevel = progress.currentLevel;
    if (targetLevel <= 8) {
      return `/courses/level${targetLevel}/lesson1`;
    }
    return "/courses";
  };
  const continueUrl = getContinueUrl();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="relative bg-slate-50 dark:bg-background">
      <Dialog open={showWelcome} onOpenChange={(open) => !open && handleCloseWelcome()}>
        <DialogContent className="max-w-md" data-testid="dialog-welcome-onboarding">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Rotech Shiksha mein Swagat Hai!
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Stock market seekho – Simple Hindi mein, Step by Step.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <CharacterAvatar character="priya" size="lg" />
              <div>
                <p className="font-medium text-foreground">Priya se Milo</p>
                <p className="text-sm text-muted-foreground">Tumhari Guide (Friend)</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg">
              <CharacterAvatar character="rohit" size="lg" />
              <div>
                <p className="font-medium text-foreground">Rohit se Milo</p>
                <p className="text-sm text-muted-foreground">Tumhare Saath Seekhne Wala</p>
              </div>
            </div>
            
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                100% FREE course – Koi hidden charges nahi
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                Simple Hindi mein samjhaya gaya
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                Story-based learning – Boring nahi hai
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link href="/beginner-course">
              <Button className="w-full gap-2" size="lg" onClick={handleCloseWelcome} data-testid="button-welcome-start-course">
                <Play className="w-4 h-4" />
                FREE Course Shuru Karo
              </Button>
            </Link>
            <Button variant="ghost" onClick={handleCloseWelcome} data-testid="button-welcome-explore">
              Pehle Website Explore Karunga
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <SEOHead
        title="Stock Market Seekho Hindi Mein – Bilkul Zero Se | Rotech Shiksha"
        description="Simple Hindi mein stock market seekho. Free beginner course with Priya & Rohit. Step-by-step learning for Indian investors. No prior knowledge needed."
        keywords="stock market course in hindi, stock market learning for beginners, share market basics hindi, learn investing india, rotech shiksha, free stock market course"
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <section className="pt-12 md:pt-16 pb-10 md:pb-14">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 text-sm px-4 py-1.5">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              100% FREE • Hindi Mein • Beginners Ke Liye
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
              Stock Market Seekho
              <br />
              <span className="text-primary">— Bilkul Zero Se</span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto mb-8">
              Simple Hindi + Story-based learning with Priya & Rohit ke saath.
              No jargon, no confusion – sirf clear understanding.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-medium">4.8</span> rating
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span><span className="font-medium">10,000+</span> learners</span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">100% Free</span>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm inline-block p-6 md:p-8 mb-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/beginner-course" data-testid="link-start-learning-hero">
                  <Button size="lg" className="w-full sm:w-auto gap-2 min-h-[52px] text-base px-6 btn-glow-primary" data-testid="button-start-learning-hero">
                    <Play className="w-5 h-5" />
                    Start Level 1 Free
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/calculators" data-testid="link-explore-tools">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 min-h-[52px] text-base px-6" data-testid="button-explore-tools">
                    <Calculator className="w-5 h-5" />
                    Explore Tools
                  </Button>
                </Link>
              </div>
              
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-4 text-center">
                No signup required • Sirf seekhna hai, invest nahi
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-4 text-center">
                <p className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">{isHindi ? stat.labelHi : stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <StoryIntro
        priyaLine="Yaar Rohit, investing kahan se start karun? Simple hai! Free course se shuru kar - basics se advanced tak!"
        rohitLine="Perfect! Ek hi platform pe sab kuch! Chal shuru karte hain!"
        priyaEmotion="excited"
        rohitEmotion="warning"
      />

      <div className="max-w-4xl mx-auto px-4 mb-8">
        <WhatsAppStrip />
      </div>

      <section className="py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Meet Your Learning Companions
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Priya explains, Rohit asks doubts you might have
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <CharacterAvatar character="priya" size="lg" emotion="excited" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Priya</h3>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">Your Expert Guide</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                "Main tumhe stock market simple Hindi mein samjhaungi. Koi jargon nahi, koi confusion nahi. Step by step seekhenge!"
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-4 mb-4">
                <CharacterAvatar character="rohit" size="lg" emotion="warning" />
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Rohit</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Fellow Learner (Just Like You)</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                "Main bhi tum jaisa beginner hoon. Jo sawal tumhare mann mein aaye, main Priya se poochunga – taaki hum dono samjhein!"
              </p>
            </div>
          </div>
          
          <HeroCharacterChat className="max-w-2xl mx-auto" />
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <LeadCaptureSection isHindi={isHindi} />
            </div>
            
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">
                PDF mein kya hai?
              </h3>
              <ul className="space-y-3">
                {[
                  "5 steps to start investing",
                  "Common mistakes se kaise bache",
                  "Best apps & tools list",
                  "Glossary of basic terms",
                  "Weekly learning checklist"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {continueUrl && progress && progress.completedLevels.length > 0 && (
        <section className="py-4">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Wapas Aane Par Swagat Hai!
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {progress.completedLevels.length} levels complete | Jahaan chhoda tha wahaan se shuru karo
                    </p>
                  </div>
                </div>
                <Link href={continueUrl}>
                  <Button className="gap-2 min-h-[44px]" data-testid="button-continue-learning-home">
                    <Play className="w-4 h-4" />
                    Aage Badho
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 mb-3">
              <Layers className="w-3.5 h-3.5 mr-1.5" />
              Explore Learning
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Apni Learning Journey Choose Karo
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Jo topic samajhna hai, woh select karo
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {exploreModules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={module.href} data-testid={`link-module-${module.title.toLowerCase().replace(' ', '-')}`}>
                  <div 
                    className="group bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-sm p-5 text-center interactive-card-hover h-full"
                    data-testid={`card-module-${module.title.toLowerCase().replace(' ', '-')}`}
                    tabIndex={0}
                  >
                    <div className={`w-12 h-12 ${module.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <span className={module.color}>{module.icon}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                      {isHindi ? module.titleHi : module.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {isHindi ? module.descriptionHi : module.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 mb-3">
              <Compass className="w-3.5 h-3.5 mr-1.5" />
              Your Learning Roadmap
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              3 Simple Steps Mein Seekho
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Step by step follow karo, confusion nahi hoga
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningRoadmap.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 h-full relative">
                  <div className={`w-10 h-10 ${step.color} text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4`}>
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {isHindi ? step.titleHi : step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isHindi ? step.descriptionHi : step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/beginner-course">
              <Button size="lg" className="gap-2" data-testid="button-start-roadmap">
                <Play className="w-4 h-4" />
                Learning Shuru Karo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a href="/pdf/stock-market-beginner-checklist.pdf" download target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-download-checklist-home">
                <Download className="w-4 h-4" />
                Quick Checklist PDF
              </Button>
            </a>
            <a href="/pdf/stock-market-beginner-guide.pdf" download target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-download-premium-book">
                <BookOpen className="w-4 h-4" />
                Download Premium Book (13 Pages)
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 mb-3">
              <Wrench className="w-3.5 h-3.5 mr-1.5" />
              Most Used Tools
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Practice Karo, Confidence Badhaao
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Free tools se apni skills test karo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {mostUsedTools.map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={tool.href} data-testid={`link-tool-${tool.name.toLowerCase().replace(' ', '-')}`}>
                  <div className="group bg-white dark:bg-card rounded-2xl border border-slate-200/60 dark:border-slate-700/60 shadow-sm p-5 interactive-card-hover flex items-center gap-4 h-full" tabIndex={0}>
                    <div className={`h-12 w-12 ${tool.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <span className={tool.color}>{tool.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">
                        {isHindi ? tool.nameHi : tool.name}
                      </h3>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-6 mt-1">
                        {tool.description}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/calculators">
              <Button variant="outline" className="gap-2" data-testid="button-explore-all-tools">
                Explore All Tools
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800 mb-3">
              {isHindi ? "क्यों यहां सीखें?" : "Why Learn Here?"}
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {isHindi ? "Course के बाद आप..." : "After This Course..."}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
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
                <div className="bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 rounded-2xl shadow-sm p-6 h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1" data-testid={`card-why-${index}`}>
                  <div className={`w-14 h-14 rounded-xl ${item.bgColor} flex items-center justify-center mb-4`}>
                    <span className={item.color}>{item.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                    {isHindi ? item.titleHi : item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {isHindi ? item.descriptionHi : item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 mb-3">
              <Star className="w-3.5 h-3.5 mr-1.5" />
              Learners Love Us
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Real Stories, Real Results
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl shadow-sm p-6 h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-4">
                    "{isHindi ? testimonial.textHi : testimonial.text}"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-semibold text-slate-600 dark:text-slate-300">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-slate-900 dark:text-white">{testimonial.name}</p>
                      <p className="text-xs text-slate-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 mb-3">
              <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
              Aksar Pooche Gaye Sawal
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Common doubts ke answers
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} isHindi={isHindi} />
            ))}
          </div>
        </div>
      </section>

      <CTABlock
        priyaLine="Sochna band, karna shuru! Aaj hi shuru karo – FREE hai!"
        rohitLine="Chal, aaj se start karte hain!"
        primaryButton={{
          text: "FREE Course Shuru Karo",
          href: "/beginner-course",
          testId: "button-final-cta-primary"
        }}
        secondaryButton={{
          text: "Tools Dekho",
          href: "/calculators",
          testId: "button-final-cta-secondary"
        }}
      />
    </div>
  );
}
