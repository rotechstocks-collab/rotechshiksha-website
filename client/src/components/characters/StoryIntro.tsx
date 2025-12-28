import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface StoryIntroProps {
  priyaLine: string;
  rohitLine: string;
  variant?: "default" | "compact";
}

export function StoryIntro({ priyaLine, rohitLine, variant = "default" }: StoryIntroProps) {
  const isCompact = variant === "compact";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${isCompact ? "py-4 md:py-6" : "py-6 md:py-8"}`}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="relative">
          <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full" />
          <div className="space-y-3 pl-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">P</span>
              </div>
              <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg rounded-tl-none px-4 py-2.5 border border-emerald-100 dark:border-emerald-800/50">
                <p className="text-sm text-emerald-800 dark:text-emerald-200">
                  <span className="font-medium">Priya:</span> {priyaLine}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300">R</span>
              </div>
              <div className="flex-1 bg-blue-50 dark:bg-blue-900/20 rounded-lg rounded-tl-none px-4 py-2.5 border border-blue-100 dark:border-blue-800/50">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <span className="font-medium">Rohit:</span> {rohitLine}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface CTABlockProps {
  priyaLine: string;
  rohitLine: string;
  primaryButton: {
    text: string;
    href: string;
    testId: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
    testId: string;
  };
}

export function CTABlock({ priyaLine, rohitLine, primaryButton, secondaryButton }: CTABlockProps) {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium mb-4">
            <MessageCircle className="w-3.5 h-3.5" />
            Priya & Rohit
          </div>
          
          <div className="max-w-2xl mx-auto mb-6 space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-300">P</span>
              <p className="text-slate-700 dark:text-slate-300">
                <span className="font-medium text-emerald-700 dark:text-emerald-400">Priya:</span> {priyaLine}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300">R</span>
              <p className="text-slate-700 dark:text-slate-300">
                <span className="font-medium text-blue-700 dark:text-blue-400">Rohit:</span> {rohitLine}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={primaryButton.href}>
              <Button size="lg" className="gap-2 w-full sm:w-auto" data-testid={primaryButton.testId}>
                {primaryButton.text}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            {secondaryButton && (
              <Link href={secondaryButton.href}>
                <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto" data-testid={secondaryButton.testId}>
                  {secondaryButton.text}
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
