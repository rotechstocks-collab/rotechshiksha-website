import { AllCalculators } from "@/components/Calculators";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeInUp, ScaleIn } from "@/components/AnimationWrappers";

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen pt-28 bg-gradient-to-b from-slate-50 to-white dark:from-background dark:to-background">
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-teal-50 to-white dark:from-background dark:via-background dark:to-background" />

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <FadeInUp>
            <div className="flex flex-col items-center text-center gap-4">
              <motion.div
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-teal-500 text-white flex items-center justify-center shadow-xl"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Calculator className="w-10 h-10" />
              </motion.div>

              <Badge className="bg-white shadow border text-blue-600">
                <Sparkles className="w-4 h-4 mr-1" /> Free Financial Tools
              </Badge>

              <h1 className="text-4xl font-bold text-slate-800 dark:text-foreground">
                Smart Financial Calculators
              </h1>

              <p className="max-w-2xl text-slate-600 dark:text-muted-foreground">
                SIP, Tax, Loan, Mutual Fund & Trading calculators – sab kuch ek
                jagah, easy aur accurate.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ===== CALCULATORS GRID ===== */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <FadeInUp delay={0.1}>
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-card/80 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-slate-800 dark:text-foreground">
                    All Calculators
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    Click to open calculator
                  </span>
                </div>

                {/* Existing Calculators Component */}
                <AllCalculators />
              </CardContent>
            </Card>
          </FadeInUp>

          {/* ===== INFO STRIP ===== */}
          <ScaleIn delay={0.3}>
            <Card className="mt-10 border border-dashed border-blue-200 dark:border-blue-500/30 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-500/10 dark:to-teal-500/10">
              <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-700 dark:text-muted-foreground max-w-2xl">
                  💡 Ye calculators beginners se leke advanced traders ke liye
                  banaye gaye hain. Har tool real-world logic par based hai
                  taaki aap better financial decisions le sako.
                </p>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-blue-600 font-semibold cursor-pointer"
                >
                  Learn how to use
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </CardContent>
            </Card>
          </ScaleIn>
        </div>
      </section>
    </div>
  );
}
