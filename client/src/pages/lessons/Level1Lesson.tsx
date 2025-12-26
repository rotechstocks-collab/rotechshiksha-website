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
  Globe,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { level1Content, level1Labels } from "@/content/lessons/level1";
import { FadeInUp, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";

export default function Level1Lesson() {
  const { title, subtitle, scenes } = level1Content;
  const labels = level1Labels;

  const getSceneIcon = (type: string) => {
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

  const getSceneLabel = (type: string) => {
    switch (type) {
      case "scene":
        return labels.storyLabel;
      case "concept":
        return labels.conceptLabel;
      case "summary":
        return labels.summaryLabel;
      default:
        return "";
    }
  };

  const getSceneStyles = (type: string) => {
    switch (type) {
      case "scene":
        return "border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20";
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
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-white/20 text-white border-0">{labels.levelBadge}</Badge>
                  <Badge variant="secondary" className="bg-emerald-400/20 text-emerald-100 border-0">
                    {labels.freeLabel}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-white/70">
                    <Clock className="w-4 h-4" />
                    {labels.readingTime}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2" data-testid="text-lesson-title">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-lg text-white/80">{subtitle}</p>
                )}
              </div>

              {/* Language Switcher Placeholder */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled
                  className="bg-white/10 border-white/30 text-white/70 cursor-not-allowed"
                  data-testid="button-language-placeholder"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {labels.languagePlaceholder}
                  <Badge variant="secondary" className="ml-2 text-xs bg-white/20 text-white/70 border-0">
                    {labels.comingSoon}
                  </Badge>
                </Button>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <StaggerContainer className="space-y-6">
            {scenes.map((scene, index) => (
              <StaggerItem key={scene.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`overflow-visible ${getSceneStyles(scene.type)}`}
                    data-testid={`card-scene-${scene.id}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${
                          scene.type === "scene" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400" :
                          scene.type === "concept" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400" :
                          scene.type === "summary" ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" :
                          "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                        }`}>
                          {getSceneIcon(scene.type)}
                        </div>
                        <div>
                          {getSceneLabel(scene.type) && (
                            <Badge variant="outline" className="text-xs mb-1">
                              {getSceneLabel(scene.type)}
                            </Badge>
                          )}
                          {scene.title && (
                            <CardTitle className="text-lg md:text-xl">{scene.title}</CardTitle>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
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
                              className={`text-muted-foreground leading-relaxed ${
                                paragraph.startsWith('"') ? "italic font-medium text-foreground" : ""
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
            ))}
          </StaggerContainer>

          {/* Next Level CTA */}
          <FadeInUp delay={0.5}>
            <div className="mt-12 text-center">
              <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700">
                <CardContent className="py-8">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-3 rounded-full bg-slate-200 dark:bg-slate-700">
                      <BookOpen className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Level 2: Stock, Index aur IPO kya hote hain?</h3>
                      <p className="text-sm text-muted-foreground">{labels.comingSoon}</p>
                    </div>
                    <Button disabled className="mt-2" data-testid="button-next-level-disabled">
                      {labels.nextLevel}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
