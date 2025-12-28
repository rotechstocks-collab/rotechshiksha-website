import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import priyaAvatar from "@/assets/characters/priya_main.png";
import rohitAvatar from "@/assets/characters/rohit_main.png";

const PRIYA_AVATAR = priyaAvatar;
const ROHIT_AVATAR = rohitAvatar;

interface GlobalStoryStripProps {
  className?: string;
}

export function GlobalStoryStrip({ className = "" }: GlobalStoryStripProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`bg-gradient-to-r from-emerald-50 via-blue-50 to-emerald-50 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-emerald-950/30 border-b border-emerald-200/50 dark:border-emerald-800/30 ${className}`}>
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="py-2 sm:py-3"
            >
              <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="flex -space-x-2 flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-100 via-emerald-50 to-green-100 dark:from-emerald-900/40 dark:via-emerald-800/30 dark:to-green-900/40 border-2 border-emerald-400 p-0.5 shadow-sm">
                      <img
                        src={PRIYA_AVATAR}
                        alt="Priya"
                        className="w-full h-full rounded-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-100 via-blue-50 to-sky-100 dark:from-blue-900/40 dark:via-blue-800/30 dark:to-sky-900/40 border-2 border-blue-400 p-0.5 shadow-sm">
                      <img
                        src={ROHIT_AVATAR}
                        alt="Rohit"
                        className="w-full h-full rounded-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 hidden sm:block">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3">
                      <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-200 truncate">
                        <span className="font-semibold">Priya:</span>{" "}
                        <span className="text-emerald-700 dark:text-emerald-300">"Confusion ho toh tension mat lo, step-by-step seekhenge!"</span>
                      </p>
                      <span className="hidden sm:inline text-muted-foreground">|</span>
                      <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 truncate">
                        <span className="font-semibold">Rohit:</span>{" "}
                        <span className="text-blue-700 dark:text-blue-300">"Main bhi tumhare saath seekh raha hoon!"</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0 sm:hidden">
                    <p className="text-xs text-emerald-800 dark:text-emerald-200">
                      <span className="font-semibold">Priya & Rohit</span> ke saath seekho!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href="/learn">
                    <Button 
                      size="sm" 
                      className="gap-1.5 text-xs sm:text-sm min-h-[32px] sm:min-h-[36px] bg-emerald-600 hover:bg-emerald-700 text-white"
                      data-testid="button-global-start-learning"
                    >
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">Start</span> Learning
                    </Button>
                  </Link>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsExpanded(false)}
                    className="w-7 h-7 sm:w-8 sm:h-8"
                    data-testid="button-collapse-story-strip"
                    aria-label="Collapse"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="py-1.5"
            >
              <button
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors w-full justify-center"
                data-testid="button-expand-story-strip"
              >
                <div className="flex -space-x-1">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40 border border-emerald-400 p-0.5">
                    <img
                      src={PRIYA_AVATAR}
                      alt="Priya"
                      className="w-full h-full rounded-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-100 to-sky-100 dark:from-blue-900/40 dark:to-sky-900/40 border border-blue-400 p-0.5">
                    <img
                      src={ROHIT_AVATAR}
                      alt="Rohit"
                      className="w-full h-full rounded-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
                <span>Priya & Rohit ke saath seekho</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
