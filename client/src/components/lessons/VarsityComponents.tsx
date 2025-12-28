import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Calculator,
  Download,
  FileText,
  CheckCircle,
  Target,
  MessageCircle,
  Sparkles,
  GraduationCap,
  User,
} from "lucide-react";

interface LessonHookProps {
  priyaLine: string;
  rohitLine: string;
}

export function LessonHook({ priyaLine, rohitLine }: LessonHookProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-br from-violet-50/80 to-sky-50/80 dark:from-violet-950/30 dark:to-sky-950/30 border-violet-200/50 dark:border-violet-800/50">
        <CardContent className="py-5 px-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span className="text-xs font-medium text-violet-600 dark:text-violet-400">Aaj ka lesson</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              </div>
              <div className="flex-1 bg-violet-100/50 dark:bg-violet-900/30 rounded-lg rounded-tl-none px-3 py-2">
                <p className="text-sm text-violet-800 dark:text-violet-200">
                  <span className="font-medium">Priya:</span> {priyaLine}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="flex-1 bg-sky-100/50 dark:bg-sky-900/30 rounded-lg rounded-tl-none px-3 py-2">
                <p className="text-sm text-sky-800 dark:text-sky-200">
                  <span className="font-medium">Rohit:</span> {rohitLine}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ToolBoxProps {
  tools?: Array<{
    name: string;
    href: string;
  }>;
}

export function ToolBox({ tools }: ToolBoxProps) {
  const defaultTools = [
    { name: "SIP Calculator", href: "/calculators/sip" },
    { name: "Brokerage Calculator", href: "/calculators/brokerage" },
  ];
  
  const toolList = tools || defaultTools;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mb-6"
    >
      <Card className="bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200/50 dark:border-emerald-800/50">
        <CardContent className="py-4 px-4">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Try These Tools</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {toolList.map((tool, index) => (
              <Link key={index} href={tool.href}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 gap-1.5"
                  data-testid={`button-tool-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {tool.name}
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface PriyaSummaryProps {
  points: string[];
  title?: string;
}

export function PriyaSummary({ points, title = "Summary by Priya" }: PriyaSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-8"
    >
      <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200 dark:border-violet-800">
        <CardContent className="py-5 px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">Priya</p>
              <h3 className="font-semibold text-foreground">{title}</h3>
            </div>
          </div>
          <ul className="space-y-2.5">
            {points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-violet-500 dark:text-violet-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface RohitActionStepProps {
  action: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function RohitActionStep({ action, description, buttonText, buttonHref }: RohitActionStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-6"
    >
      <Card className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30 border-sky-200 dark:border-sky-800">
        <CardContent className="py-5 px-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
              <Target className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-xs text-sky-600 dark:text-sky-400 font-medium">Rohit ka Action Step</p>
              <h3 className="font-semibold text-foreground">Aaj Ka Kaam</h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{action}</p>
          {description && (
            <p className="text-xs text-muted-foreground/80 mb-4 italic">"{description}"</p>
          )}
          {buttonText && buttonHref && (
            <Link href={buttonHref}>
              <Button size="sm" variant="default" className="gap-2" data-testid="button-action-step">
                {buttonText}
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface DownloadNotesProps {
  pdfUrl?: string;
  lessonSlug: string;
  lessonTitle: string;
}

export function DownloadNotes({ pdfUrl, lessonSlug, lessonTitle }: DownloadNotesProps) {
  const defaultPdfUrl = `/notes/${lessonSlug}.pdf`;
  const url = pdfUrl || defaultPdfUrl;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-6"
    >
      <Card className="bg-amber-50/80 dark:bg-amber-950/30 border-amber-200/50 dark:border-amber-800/50">
        <CardContent className="py-4 px-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">Notes PDF Download Karo</p>
                <p className="text-xs text-muted-foreground">{lessonTitle} ke notes</p>
              </div>
            </div>
            <a href={url} download target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="gap-2 bg-white dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300" data-testid="button-download-notes">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
