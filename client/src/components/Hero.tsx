import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "wouter";
import {
  ArrowRight,
  Play,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { HeroInvestorScene } from "@/components/SmallcaseIllustrations";
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";

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
    { value: "20+", label: t("hero.stats.calculators"), color: "text-teal-500" },
    { value: "50+", label: t("hero.stats.ebooks"), color: "text-blue-500" },
    { value: "100+", label: t("hero.stats.videos"), color: "text-purple-500" },
    { value: "10K+", label: t("hero.stats.learners"), color: "text-coral-500" },
  ];

  const trustedBrokers = [
    { name: "Zerodha", color: "#387ED1" },
    { name: "Groww", color: "#4ECDC4" },
    { name: "Upstox", color: "#9B8CD7" },
    { name: "Angel", color: "#FF7B7B" },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF6F0] via-[#FFEEE4] to-[#FFF5EE] dark:from-background dark:via-background dark:to-background" />
      
      {/* Static blur elements for mobile (no animations for performance) */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl opacity-30 md:hidden" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl opacity-20 md:hidden" />
      
      {/* Animated blur elements for desktop */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-teal-400/20 rounded-full blur-3xl hidden md:block"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl hidden md:block"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl hidden lg:block"
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, delay: 4 }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full py-16 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <FadeInUp delay={0.1}>
              <Badge 
                variant="outline" 
                className="bg-white/80 dark:bg-card/80 backdrop-blur-sm border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400 px-4 py-2"
              >
                <Sparkles className="w-3 h-3 mr-2" />
                Free Stock Market Education
              </Badge>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 dark:text-foreground leading-tight">
                {t("hero.title")}
                <motion.span 
                  className="block bg-gradient-to-r from-[#4A90E2] to-[#4ECDC4] bg-clip-text text-transparent mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {t("hero.subtitle")}
                </motion.span>
              </h1>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <p className="text-lg text-slate-600 dark:text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                {t("hero.description")}
              </p>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/courses">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto text-base px-8 h-12 bg-gradient-to-r from-[#4A90E2] to-[#4ECDC4] hover:from-[#3A80D2] hover:to-[#3EBDB4] shadow-lg shadow-blue-500/25"
                      data-testid="button-see-courses"
                    >
                      See Courses
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </Link>
                
                {isAuthenticated ? (
                  <Link href="/calculators">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="w-full sm:w-auto text-base px-8 h-12 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-slate-200 dark:border-border hover:bg-white dark:hover:bg-card"
                        data-testid="button-try-calculators"
                      >
                        <TrendingUp className="w-5 h-5 mr-2 text-teal-500" />
                        Try Calculators
                      </Button>
                    </motion.div>
                  </Link>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto text-base px-8 h-12 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-slate-200 dark:border-border hover:bg-white dark:hover:bg-card"
                      onClick={handleGetStarted}
                      data-testid="button-start-learning"
                    >
                      <Play className="w-5 h-5 mr-2 text-teal-500" />
                      {t("hero.cta.start")}
                    </Button>
                  </motion.div>
                )}
              </div>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <div className="pt-6">
                <p className="text-sm text-slate-500 dark:text-muted-foreground mb-3">
                  Trusted by learners from top brokers
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                  {trustedBrokers.map((broker, i) => (
                    <motion.div
                      key={broker.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md"
                      style={{ backgroundColor: broker.color }}
                    >
                      {broker.name.charAt(0)}
                    </motion.div>
                  ))}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-sm text-slate-400 dark:text-muted-foreground"
                  >
                    +10 more
                  </motion.span>
                </div>
              </div>
            </FadeInUp>

            <StaggerContainer delay={0.7} className="grid grid-cols-4 gap-4 pt-6 border-t border-slate-200/50 dark:border-border/50">
              {stats.map((stat, i) => (
                <StaggerItem key={i} className="text-center lg:text-left">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-muted-foreground mt-1">{stat.label}</div>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <ScaleIn delay={0.3} className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                <HeroInvestorScene size={480} className="relative z-10" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-card rounded-2xl shadow-xl p-4 flex items-center gap-3 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-foreground">Timeless Asset Allocation</p>
                  <p className="text-xs text-slate-500 dark:text-muted-foreground">Build a diversified portfolio</p>
                </div>
                <Link href="/courses">
                  <Button size="sm" variant="outline" className="ml-2 text-teal-600 border-teal-200 hover:bg-teal-50 dark:text-teal-400 dark:border-teal-800 dark:hover:bg-teal-900/20">
                    Learn
                  </Button>
                </Link>
              </motion.div>
            </div>
          </ScaleIn>
        </div>
      </div>
    </section>
  );
}
