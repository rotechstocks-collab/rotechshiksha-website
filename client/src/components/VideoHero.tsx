import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "wouter";
import { Calculator, BookOpen, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export function VideoHero() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const { t } = useLanguage();

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setPendingAction("start learning");
      setShowAuthPopup(true);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80"
        >
          <source
            src="https://cdn.pixabay.com/video/2020/07/30/46026-446130818_large.mp4"
            type="video/mp4"
          />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 w-full py-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Free Stock Market Education</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              Building a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                financially aware
              </span>
              <br />
              and confident India
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed"
            >
              Learn stock market investing from basics to advanced strategies. 
              Free calculators, IPO tracking, and structured courses for every learner.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start gap-4 pt-4"
            >
              <Link href="/calculators">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 h-14 bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-lg shadow-emerald-500/25"
                  data-testid="button-explore-calculators"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Explore Calculators
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              {isAuthenticated ? (
                <Link href="/courses">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto text-base px-8 h-14 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                    data-testid="button-start-learning"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start Learning
                  </Button>
                </Link>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base px-8 h-14 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                  onClick={handleGetStarted}
                  data-testid="button-start-learning"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Learning
                </Button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              {[
                { value: "20+", label: "Calculators" },
                { value: "50+", label: "E-books" },
                { value: "100+", label: "Videos" },
                { value: "10K+", label: "Learners" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="text-center md:text-left"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
