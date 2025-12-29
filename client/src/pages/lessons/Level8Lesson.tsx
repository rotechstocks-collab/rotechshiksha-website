import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Lightbulb,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle,
  ArrowRight,
  MessageCircle,
  TrendingUp,
  User,
  GraduationCap,
  Languages,
  Calculator,
  RotateCcw,
  Award,
  Target,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { level8Bilingual } from "@/content/lessons/level8-bilingual";
import { useLessonLanguage } from "@/context/LessonLanguageContext";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";
import { LessonScene } from "@/content/lessons/types";
import LessonQuiz from "@/components/LessonQuiz";
import { level8Quiz } from "@/content/quizzes/quiz-data";

export default function Level8Lesson() {
  const { lessonLang, toggleLanguage, labels } = useLessonLanguage();
  const content = level8Bilingual[lessonLang];
  const { title, subtitle, scenes } = content;

  const getSceneIcon = (type: string, speaker?: string) => {
    if (speaker === "rohit") return <User className="w-5 h-5" />;
    if (speaker === "priya") return <GraduationCap className="w-5 h-5" />;
    switch (type) {
      case "scene":
        return <MessageCircle className="w-5 h-5" />;
      case "concept":
        return <Lightbulb className="w-5 h-5" />;
      case "summary":
        return <CheckCircle className="w-5 h-5" />;
      case "cta":
        return <ArrowRight className="w-5 h-5" />;
      default:
        return <BookOpen className="w-5 h-5" />;
    }
  };

  const getSpeakerStyles = (speaker?: string) => {
    if (speaker === "rohit") {
      return {
        border: "border-l-4 border-l-sky-500",
        bg: "bg-sky-50/50 dark:bg-sky-950/20",
        iconBg: "bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400",
        label: "Rohit",
      };
    }
    if (speaker === "priya") {
      return {
        border: "border-l-4 border-l-violet-500",
        bg: "bg-violet-50/50 dark:bg-violet-950/20",
        iconBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
        label: "Priya",
      };
    }
    return {
      border: "border-l-4 border-l-slate-300 dark:border-l-slate-600",
      bg: "bg-slate-50/50 dark:bg-slate-900/30",
      iconBg: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
      label: null,
    };
  };

  const renderScene = (scene: LessonScene, index: number) => {
    const speakerStyles = getSpeakerStyles(scene.speaker);
    const isConcept = scene.type === "concept";
    const isSummary = scene.type === "summary";

    if (isSummary) {
      return (
        <StaggerItem key={scene.id}>
          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg">{scene.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {scene.content.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </StaggerItem>
      );
    }

    if (isConcept) {
      return (
        <StaggerItem key={scene.id}>
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <CardTitle className="text-lg">{scene.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {scene.content.map((line, i) => (
                  <p key={i} className={`text-foreground/90 ${line === "" ? "h-2" : ""}`}>{line}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      );
    }

    return (
      <StaggerItem key={scene.id}>
        <Card className={`${speakerStyles.border} ${speakerStyles.bg}`}>
          <CardContent className="py-4">
            <div className="flex gap-3">
              <div className={`p-2 rounded-md shrink-0 h-fit ${speakerStyles.iconBg}`}>
                {getSceneIcon(scene.type, scene.speaker)}
              </div>
              <div className="flex-1">
                {speakerStyles.label && (
                  <p className="text-sm font-medium text-muted-foreground mb-1">
                    {speakerStyles.label}
                  </p>
                )}
                {scene.title && !speakerStyles.label && (
                  <p className="text-sm font-semibold mb-2">{scene.title}</p>
                )}
                <div className="space-y-2">
                  {scene.content.map((line, i) => (
                    <p key={i} className="text-foreground/90">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </StaggerItem>
    );
  };

  return (
    <div className="page-bg">
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <FadeInUp>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-3xl mx-auto">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    Level 8 – Final
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-white/80">
                    <Clock className="w-4 h-4" />
                    <span>{lessonLang === "hi" ? "15 min padhne me" : "15 min read"}</span>
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{title}</h1>
                {subtitle && (
                  <p className="text-lg text-white/80">{subtitle}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleLanguage}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  data-testid="button-language-switcher"
                >
                  <Languages className="w-4 h-4 mr-2" />
                  {lessonLang === "hi" ? "हिन्दी" : "English"}
                </Button>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400">
                <User className="w-4 h-4" />
              </div>
              <span className="text-muted-foreground">Rohit (Learner)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-muted-foreground">Priya (Mentor)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-3xl mx-auto">
          <StaggerContainer className="space-y-4">
            {scenes.map((scene, index) => renderScene(scene, index))}
          </StaggerContainer>

          {/* Quiz Section */}
          <FadeInUp delay={0.3}>
            <div className="mt-10">
              <LessonQuiz quizData={level8Quiz} />
            </div>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <Card className="mt-10 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800">
              <CardContent className="py-6 text-center">
                <Award className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-3" />
                <p className="text-xl font-bold text-foreground mb-2">
                  {lessonLang === "hi" 
                    ? "Congratulations! Aap ab ek Confident Investor hain."
                    : "Congratulations! You're now a Confident Investor."}
                </p>
                <p className="text-muted-foreground">
                  {lessonLang === "hi" 
                    ? "\"Main bhi Rohit jaise seekh sakta hoon.\""
                    : "\"I can also learn like Rohit.\""}
                </p>
              </CardContent>
            </Card>
          </FadeInUp>

          <FadeInUp delay={0.5}>
            <div className="mt-12">
              <h3 className="text-xl font-bold text-center mb-6">
                {lessonLang === "hi" ? "Apni Journey Continue Karein" : "Continue Your Journey"}
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/courses" data-testid="link-revise-courses">
                  <Card className="h-full hover-elevate cursor-pointer border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                    <CardContent className="py-6 text-center">
                      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 inline-block mb-3">
                        <RotateCcw className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-semibold mb-1">
                        {lessonLang === "hi" ? "Apni Learning Dobara Revise Karein" : "Revise Your Learning"}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {lessonLang === "hi" ? "Saare levels phir se padhein" : "Read all levels again"}
                      </p>
                      <Button size="sm" variant="outline" className="mt-3" data-testid="button-revise-all">
                        {lessonLang === "hi" ? "Revise Karein" : "Revise"}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/calculators" data-testid="link-practice-calculators">
                  <Card className="h-full hover-elevate cursor-pointer border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                    <CardContent className="py-6 text-center">
                      <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50 inline-block mb-3">
                        <Calculator className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h4 className="font-semibold mb-1">
                        {lessonLang === "hi" ? "Calculators ka Use Karke Practice Karein" : "Practice with Calculators"}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {lessonLang === "hi" ? "SIP, Risk-Reward calculate karein" : "Calculate SIP, Risk-Reward"}
                      </p>
                      <Button size="sm" variant="outline" className="mt-3" data-testid="button-calculators">
                        {lessonLang === "hi" ? "Practice Karein" : "Practice"}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/paper-trade" data-testid="link-paper-trade">
                  <Card className="h-full hover-elevate cursor-pointer border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
                    <CardContent className="py-6 text-center">
                      <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 inline-block mb-3">
                        <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h4 className="font-semibold mb-1">
                        {lessonLang === "hi" ? "Apna Personal Investment Plan Banayein" : "Create Your Investment Plan"}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {lessonLang === "hi" ? "Paper trading se shuru karein" : "Start with paper trading"}
                      </p>
                      <Button size="sm" variant="outline" className="mt-3" data-testid="button-plan">
                        {lessonLang === "hi" ? "Plan Banayein" : "Create Plan"}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.6}>
            <Card className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-950/40 dark:to-orange-950/40 border-amber-300 dark:border-amber-700">
              <CardContent className="py-6 text-center">
                <Sparkles className="w-8 h-8 text-amber-600 dark:text-amber-400 mx-auto mb-3" />
                <p className="text-foreground font-medium">
                  {lessonLang === "hi" 
                    ? "\"Discipline se bade profits aate hain, tips se nahi.\""
                    : "\"Big profits come from discipline, not tips.\""}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  — Priya
                </p>
              </CardContent>
            </Card>
          </FadeInUp>

          <div className="mt-8 text-center">
            <Link href="/courses" data-testid="link-explore-courses">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                {labels.backToCourses}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
