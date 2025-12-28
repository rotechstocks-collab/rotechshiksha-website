import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  ChevronLeft,
  Clock,
  BookOpen,
  Lightbulb,
  CheckCircle,
  User,
  GraduationCap,
  MessageCircle,
  Shield,
  Home,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { motion } from "framer-motion";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";
import { LessonHook, ToolBox, PriyaSummary, RohitActionStep, DownloadNotes } from "@/components/lessons/VarsityComponents";

export interface LessonScene {
  id: string;
  type: "dialogue" | "concept" | "example" | "summary";
  speaker?: "rohit" | "priya";
  content: string[];
  title?: string;
}

export interface LessonData {
  slug: string;
  moduleNumber: number;
  lessonNumber: number;
  title: string;
  duration: string;
  scenes: LessonScene[];
  prevLesson?: { slug: string; title: string };
  nextLesson?: { slug: string; title: string };
}

interface BeginnerLessonLayoutProps {
  lesson: LessonData;
}

export function BeginnerLessonLayout({ lesson }: BeginnerLessonLayoutProps) {
  const getSceneIcon = (type: string, speaker?: string) => {
    if (speaker === "rohit") return <User className="w-5 h-5" />;
    if (speaker === "priya") return <GraduationCap className="w-5 h-5" />;
    switch (type) {
      case "dialogue":
        return <MessageCircle className="w-5 h-5" />;
      case "concept":
        return <Lightbulb className="w-5 h-5" />;
      case "example":
        return <BookOpen className="w-5 h-5" />;
      case "summary":
        return <CheckCircle className="w-5 h-5" />;
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
        label: "Rohit:",
        labelColor: "text-sky-600 dark:text-sky-400",
      };
    }
    if (speaker === "priya") {
      return {
        border: "border-l-4 border-l-violet-500",
        bg: "bg-violet-50/50 dark:bg-violet-950/20",
        iconBg: "bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400",
        label: "Priya:",
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
      case "dialogue":
        return "border-l-4 border-l-slate-400 bg-slate-50/50 dark:bg-slate-950/20";
      case "concept":
        return "border-l-4 border-l-amber-500 bg-amber-50/50 dark:bg-amber-950/20";
      case "example":
        return "border-l-4 border-l-teal-500 bg-teal-50/50 dark:bg-teal-950/20";
      case "summary":
        return "border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20";
      default:
        return "";
    }
  };

  const getIconBg = (type: string, speaker?: string) => {
    const speakerStyles = getSpeakerStyles(speaker);
    if (speakerStyles) return speakerStyles.iconBg;
    switch (type) {
      case "dialogue":
        return "bg-slate-100 text-slate-600 dark:bg-slate-900/50 dark:text-slate-400";
      case "concept":
        return "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400";
      case "example":
        return "bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400";
      case "summary":
        return "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400";
      default:
        return "bg-slate-100 text-slate-600 dark:bg-slate-900/50 dark:text-slate-400";
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
                    <p key={idx} className="leading-relaxed text-muted-foreground">
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
      <SEOHead
        title={`${lesson.title} – Rotech Shiksha`}
        description={`Learn ${lesson.title} in simple Hinglish. Beginner-friendly stock market education.`}
        keywords="stock market hindi, share market basics, learn investing india"
      />

      <section className="py-8 lg:py-12 bg-slate-50 dark:bg-card/30 border-b">
        <div className="max-w-3xl mx-auto px-4">
          <FadeInUp>
            <div className="flex items-center gap-2 mb-4">
              <Link href="/beginner-course" data-testid="link-course-home">
                <Button variant="ghost" size="sm" className="gap-1" data-testid="button-course-home">
                  <Home className="w-4 h-4" />
                  Course
                </Button>
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Badge variant="outline" className="text-xs">
                Module {lesson.moduleNumber}
              </Badge>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Lesson {lesson.lessonNumber}</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
              {lesson.title}
            </h1>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{lesson.duration} read</span>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="py-8 lg:py-12">
        <div className="max-w-3xl mx-auto px-4">
          <LessonHook
            priyaLine="Aaj hum ek important concept samjhenge – dhyan se padho!"
            rohitLine="Haan Priya, main ready hoon seekhne ke liye!"
          />

          <ToolBox />

          <StaggerContainer>
            <div className="space-y-6">
              {lesson.scenes.map((scene, index) => renderScene(scene, index))}
            </div>
          </StaggerContainer>

          <PriyaSummary
            points={[
              "Aaj ka concept samajh liya – basics clear ho gaye.",
              "Practical example se theory connect hui.",
              "Ab agle lesson mein aur deep dive karenge.",
            ]}
          />

          <RohitActionStep
            action="Aaj jo seekha usse apne notes mein likho aur ek calculator try karo."
            description="Practice se hi confidence aata hai!"
            buttonText="Calculators Try Karo"
            buttonHref="/calculators"
          />

          <DownloadNotes
            lessonSlug={lesson.slug}
            lessonTitle={lesson.title}
          />
        </div>
      </section>

      <section className="py-6 border-t">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {lesson.prevLesson ? (
              <Link href={`/beginner-course/${lesson.prevLesson.slug}`} data-testid="link-prev-lesson">
                <Button variant="outline" className="w-full sm:w-auto gap-2 min-h-[44px]" data-testid="button-prev-lesson">
                  <ChevronLeft className="w-4 h-4" />
                  <span className="truncate max-w-[200px]">{lesson.prevLesson.title}</span>
                </Button>
              </Link>
            ) : (
              <div />
            )}

            {lesson.nextLesson ? (
              <Link href={`/beginner-course/${lesson.nextLesson.slug}`} data-testid="link-next-lesson">
                <Button className="w-full sm:w-auto gap-2 min-h-[44px]" data-testid="button-next-lesson">
                  <span className="truncate max-w-[200px]">{lesson.nextLesson.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link href="/beginner-course" data-testid="link-finish-course">
                <Button className="w-full sm:w-auto gap-2 min-h-[44px]" data-testid="button-finish-course">
                  <CheckCircle className="w-4 h-4" />
                  Course Complete
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="py-6 border-t">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/30">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-1">
                Education Only
              </p>
              <p className="text-xs text-amber-700/80 dark:text-amber-300/80">
                Rotech Shiksha is an education platform. We do not provide trading tips or investment advice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
