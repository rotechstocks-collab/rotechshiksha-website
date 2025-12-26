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
  User,
  GraduationCap,
  Languages,
} from "lucide-react";
import { motion } from "framer-motion";
import { level1Bilingual } from "@/content/lessons/level1-bilingual";
import { useLessonLanguage } from "@/context/LessonLanguageContext";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";
import { LessonScene } from "@/content/lessons/types";

export default function Level1Lesson() {
  const { lessonLang, toggleLanguage, labels } = useLessonLanguage();
  const content = level1Bilingual[lessonLang];
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
        label: labels.rohitSays,
        labelColor: "text-sky-600 dark:text-sky-400",
      };
    }
    if (speaker === "priya") {
      return {
        border: "border-l-4 border-l-violet-500",
        bg: "bg-violet-50/50 dark:bg-violet-950/20",
        iconBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
        label: labels.priyaSays,
        labelColor: "text-violet-600 dark:text-violet-400",
      };
    }
    return null;
  };

  const getSceneStyles = (type: string, speaker?: string) => {
    const speakerStyles = getSpeakerStyles(speaker);
    if (speakerStyles) {
      return `${speakerStyles.border} ${speakerStyles.bg}`;
    }
    switch (type) {
      case "scene":
        return "border-l-4 border-l-slate-400 bg-slate-50/50 dark:bg-slate-950/20";
      case "concept":
        return "border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20";
      case "summary":
        return "border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20";
      case "cta":
        return "border-l-4 border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/20";
      default:
        return "";
    }
  };

  const getIconBg = (type: string, speaker?: string) => {
    const speakerStyles = getSpeakerStyles(speaker);
    if (speakerStyles) return speakerStyles.iconBg;
    switch (type) {
      case "scene":
        return "bg-slate-100 text-slate-600 dark:bg-slate-900/50 dark:text-slate-400";
      case "concept":
        return "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400";
      case "summary":
        return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400";
      default:
        return "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400";
    }
  };

  const renderScene = (scene: LessonScene, index: number) => {
    const speakerStyles = getSpeakerStyles(scene.speaker);

    return (
      <StaggerItem key={scene.id}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
        >
          <Card
            className={`overflow-visible ${getSceneStyles(scene.type, scene.speaker)}`}
            data-testid={`card-scene-${scene.id}`}
          >
            {(scene.title || speakerStyles) && (
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${getIconBg(scene.type, scene.speaker)}`}>
                    {getSceneIcon(scene.type, scene.speaker)}
                  </div>
                  <div>
                    {speakerStyles && (
                      <span className={`text-sm font-semibold ${speakerStyles.labelColor}`}>
                        {speakerStyles.label}
                      </span>
                    )}
                    {scene.title && (
                      <CardTitle className="text-lg md:text-xl">{scene.title}</CardTitle>
                    )}
                  </div>
                </div>
              </CardHeader>
            )}
            <CardContent className={!scene.title && !speakerStyles ? "pt-4" : ""}>
              {scene.type === "summary" ? (
                <ul className="space-y-2">
                  {scene.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-3">
                  {scene.content.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={`leading-relaxed ${
                        paragraph.startsWith('"') || paragraph.startsWith("\"")
                          ? "italic font-medium text-foreground pl-4 border-l-2 border-muted-foreground/30"
                          : "text-muted-foreground"
                      }`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </StaggerItem>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <FadeInUp>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Link href="/courses" data-testid="link-back-to-courses">
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-white mb-4 -ml-2">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    {labels.backToCourses}
                  </Button>
                </Link>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <Badge className="bg-white/20 text-white border-0">{labels.levelBadge} 1</Badge>
                  <Badge variant="secondary" className="bg-emerald-400/20 text-emerald-100 border-0">
                    {labels.freeLabel}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-white/70">
                    <Clock className="w-4 h-4" />
                    5 {labels.readingTime}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2" data-testid="text-lesson-title">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-lg text-white/80">{subtitle}</p>
                )}
              </div>

              {/* Language Switcher */}
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

      {/* Character Legend */}
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400">
                <User className="w-4 h-4" />
              </div>
              <span className="text-muted-foreground">Rohit ({lessonLang === "hi" ? "Learner" : "Learner"})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-muted-foreground">Priya ({lessonLang === "hi" ? "Mentor" : "Mentor"})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-3xl mx-auto">
          <StaggerContainer className="space-y-4">
            {scenes.map((scene, index) => renderScene(scene, index))}
          </StaggerContainer>

          {/* Next Level CTA */}
          <FadeInUp delay={0.5}>
            <div className="mt-12 text-center">
              <Link href="/learn/level-2" data-testid="link-next-level">
                <Card className="hover-elevate cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-800">
                  <CardContent className="py-8">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
                        <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {lessonLang === "hi" 
                            ? "Level 2: Stock, Index aur IPO kya hote hain?" 
                            : "Level 2: What are Stock, Index and IPO?"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {lessonLang === "hi" ? "Agle level par jaayein" : "Continue to the next level"}
                        </p>
                      </div>
                      <Button className="mt-2" data-testid="button-next-level">
                        {labels.nextLevel}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </FadeInUp>

          {/* Back to Courses */}
          <div className="mt-8 text-center">
            <Link href="/courses" data-testid="link-explore-courses">
              <Button variant="outline">
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
