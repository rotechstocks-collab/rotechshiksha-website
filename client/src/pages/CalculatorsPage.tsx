import { AllCalculators } from "@/components/Calculators";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Info, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInUp, ScaleIn } from "@/components/AnimationWrappers";
import { FloatingCoins } from "@/components/SmallcaseIllustrations";

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen pt-28">
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF6F0] via-[#FFEEE4] to-[#FFF5EE] dark:from-background dark:via-background dark:to-background" />
        <motion.div
          className="absolute top-10 right-20 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <FadeInUp className="flex items-center gap-4">
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4A90E2] to-[#4ECDC4] text-white flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Calculator className="w-8 h-8" />
              </motion.div>
              <div>
                <Badge variant="outline" className="mb-2 bg-white/80 dark:bg-card/80 backdrop-blur-sm border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Free Tools
                </Badge>
                <h1 className="text-3xl font-bold text-slate-800 dark:text-foreground">Trading Calculators</h1>
                <p className="text-slate-600 dark:text-muted-foreground">Essential tools for smarter trading decisions</p>
              </div>
            </FadeInUp>
            
            <ScaleIn delay={0.2} className="hidden md:block">
              <FloatingCoins size={120} />
            </ScaleIn>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white/50 dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <FadeInUp delay={0.1}>
            <AllCalculators />
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <Card className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-500/10 dark:to-teal-500/10 border-blue-100 dark:border-blue-500/20">
              <CardContent className="p-5 flex items-start gap-4">
                <motion.div
                  className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 10 }}
                >
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <div className="text-sm">
                  <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">How to use these calculators</p>
                  <p className="text-blue-700/80 dark:text-blue-400/80 leading-relaxed">
                    These calculators help you make informed trading decisions. The SIP calculator shows
                    how your investments can grow over time. Use the Risk-Reward calculator to evaluate
                    trade setups. Position sizing helps determine how much to invest per trade based on
                    your risk tolerance. The brokerage calculator shows all trading costs including STT,
                    GST, and exchange charges.
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
