import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Clock, CheckCircle, Play, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Lesson {
  id: string;
  slug: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
  isLocked?: boolean;
}

interface ModuleCardProps {
  moduleNumber: number;
  title: string;
  subtitle?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  lessons: Lesson[];
  basePath: string;
  defaultOpen?: boolean;
  totalDuration?: string;
}

export function ModuleCard({
  moduleNumber,
  title,
  subtitle,
  description,
  icon,
  color,
  bgColor,
  lessons,
  basePath,
  defaultOpen = false,
  totalDuration,
}: ModuleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const completedCount = lessons.filter((l) => l.isCompleted).length;
  const progress = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  return (
    <div 
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm"
      data-testid={`module-card-${moduleNumber}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 md:p-6 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        data-testid={`module-toggle-${moduleNumber}`}
      >
        <div className={cn("p-3 rounded-xl flex-shrink-0", bgColor)}>
          <div className={color}>{icon}</div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="text-xs font-medium">
              Module {moduleNumber}
            </Badge>
            {subtitle && (
              <span className="text-xs text-muted-foreground hidden sm:inline">
                {subtitle}
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Play className="w-3.5 h-3.5" />
              {lessons.length} chapters
            </span>
            {totalDuration && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {totalDuration}
              </span>
            )}
            {completedCount > 0 && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-3.5 h-3.5" />
                {completedCount}/{lessons.length} done
              </span>
            )}
          </div>
          
          {progress > 0 && progress < 100 && (
            <div className="mt-3 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
        
        <ChevronDown 
          className={cn(
            "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="border-t border-slate-100 dark:border-slate-800">
              <div className="p-4 md:p-6 pt-4 space-y-1">
                {lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    href={`${basePath}/${lesson.slug}`}
                    data-testid={`lesson-link-${lesson.slug}`}
                  >
                    <div 
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg transition-all group",
                        lesson.isLocked 
                          ? "opacity-50 cursor-not-allowed" 
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
                      )}
                    >
                      <div className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 border",
                        lesson.isCompleted 
                          ? "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-muted-foreground"
                      )}>
                        {lesson.isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : lesson.isLocked ? (
                          <Lock className="w-3.5 h-3.5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <span className={cn(
                          "text-sm font-medium transition-colors",
                          lesson.isCompleted 
                            ? "text-muted-foreground" 
                            : "text-slate-900 dark:text-white group-hover:text-primary"
                        )}>
                          {lesson.title}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-muted-foreground">
                          {lesson.duration}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <Link href={`${basePath}/${lessons[0]?.slug}`}>
                  <Button className="w-full gap-2" data-testid={`button-start-module-${moduleNumber}`}>
                    <Play className="w-4 h-4" />
                    {completedCount > 0 ? "Continue Module" : "Start Module"}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
