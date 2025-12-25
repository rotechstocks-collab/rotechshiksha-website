import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "wouter";
import {
  Calculator,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

function FloatingCoin({ delay, duration, x, y, size }: { delay: number; duration: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ y: 0, opacity: 0.6, rotate: 0 }}
      animate={{ 
        y: [-20, 20, -20], 
        opacity: [0.4, 0.8, 0.4],
        rotate: [0, 10, -10, 0]
      }}
      transition={{ 
        duration, 
        delay, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
    >
      <div 
        className="rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg"
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full flex items-center justify-center text-amber-900 font-bold" style={{ fontSize: size * 0.5 }}>
          ₹
        </div>
      </div>
    </motion.div>
  );
}

function FloatingChart({ delay, x, y }: { delay: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none opacity-20"
      style={{ left: x, top: y }}
      initial={{ opacity: 0.1 }}
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 4, delay, repeat: Infinity }}
    >
      <svg width="120" height="60" viewBox="0 0 120 60" className="text-primary">
        <motion.polyline
          points="0,50 20,40 40,45 60,25 80,35 100,15 120,20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: 2 }}
        />
      </svg>
    </motion.div>
  );
}

function CandleStick({ delay, x, y, isGreen }: { delay: number; x: string; y: string; isGreen: boolean }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: [0, 1, 1, 0], opacity: [0, 0.6, 0.6, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity }}
    >
      <div className="flex flex-col items-center">
        <div className={`w-0.5 h-4 ${isGreen ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <div className={`w-3 h-8 rounded-sm ${isGreen ? 'bg-emerald-500' : 'bg-red-500'}`} />
        <div className={`w-0.5 h-4 ${isGreen ? 'bg-emerald-500' : 'bg-red-500'}`} />
      </div>
    </motion.div>
  );
}

function AnimatedShape({ delay, x, y, color }: { delay: number; x: string; y: string; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none blur-3xl"
      style={{ left: x, top: y }}
      initial={{ scale: 0.8, opacity: 0.1 }}
      animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.2, 0.1] }}
      transition={{ duration: 8, delay, repeat: Infinity }}
    >
      <div className={`w-64 h-64 rounded-full ${color}`} />
    </motion.div>
  );
}

export function Hero() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const { t } = useLanguage();

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setPendingAction("start learning");
      setShowAuthPopup(true);
    }
  };

  const stats = [
    { value: "20+", label: t("hero.stats.calculators") },
    { value: "50+", label: t("hero.stats.ebooks") },
    { value: "100+", label: t("hero.stats.videos") },
    { value: "10K+", label: t("hero.stats.learners") },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      <AnimatedShape delay={0} x="10%" y="20%" color="bg-primary/20" />
      <AnimatedShape delay={2} x="70%" y="60%" color="bg-emerald-500/15" />
      <AnimatedShape delay={4} x="80%" y="10%" color="bg-blue-500/10" />
      
      <FloatingCoin delay={0} duration={6} x="5%" y="30%" size={40} />
      <FloatingCoin delay={1} duration={5} x="90%" y="25%" size={32} />
      <FloatingCoin delay={2} duration={7} x="15%" y="70%" size={28} />
      <FloatingCoin delay={3} duration={6} x="85%" y="65%" size={36} />
      <FloatingCoin delay={1.5} duration={5.5} x="50%" y="15%" size={24} />
      
      <FloatingChart delay={0} x="8%" y="45%" />
      <FloatingChart delay={2} x="75%" y="35%" />
      
      <CandleStick delay={0} x="20%" y="20%" isGreen={true} />
      <CandleStick delay={1} x="78%" y="50%" isGreen={false} />
      <CandleStick delay={2} x="25%" y="75%" isGreen={true} />
      <CandleStick delay={3} x="70%" y="80%" isGreen={true} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t("hero.badge")}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            <span className="bg-gradient-to-r from-emerald-600 via-primary to-blue-600 bg-clip-text text-transparent">
              {t("hero.title")}
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {t("hero.subtitle")}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="relative mx-auto max-w-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-emerald-500/20 to-blue-500/20 blur-xl rounded-3xl" />
            <div className="relative bg-card/60 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("hero.description")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/calculators">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base px-8 py-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 shadow-lg shadow-emerald-500/25"
                data-testid="button-explore-calculators"
              >
                <Calculator className="w-5 h-5 mr-2" />
                {t("hero.cta.calculators")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <Link href="/courses">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto text-base px-8 py-6 backdrop-blur-sm bg-background/50"
                  data-testid="button-start-learning"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  {t("hero.cta.start")}
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base px-8 py-6 backdrop-blur-sm bg-background/50"
                onClick={handleGetStarted}
                data-testid="button-start-learning"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {t("hero.cta.start")}
              </Button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
