import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "wouter";
import {
  Calculator,
  BookOpen,
  ArrowRight,
  Play,
} from "lucide-react";
import { motion } from "framer-motion";
import { InvestorCharacter } from "@/components/Illustrations";

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
    <section className="relative min-h-[85vh] flex items-center bg-white dark:bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-primary font-medium text-sm uppercase tracking-wide"
              >
                Free Stock Market Education
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"
              >
                {t("hero.title")}
                <span className="block text-primary mt-2">
                  {t("hero.subtitle")}
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="/calculators">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-base px-8 h-12"
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
                    className="w-full sm:w-auto text-base px-8 h-12"
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
                  className="w-full sm:w-auto text-base px-8 h-12"
                  onClick={handleGetStarted}
                  data-testid="button-start-learning"
                >
                  <Play className="w-5 h-5 mr-2" />
                  {t("hero.cta.start")}
                </Button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-4 gap-6 pt-8 border-t border-border/50"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-emerald-500/5 rounded-3xl transform rotate-3" />
              <div className="relative bg-gradient-to-br from-muted/50 to-muted/30 rounded-3xl p-8">
                <InvestorCharacter size={320} className="relative z-10" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
