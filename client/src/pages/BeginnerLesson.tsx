import { useRoute, Redirect } from "wouter";
import { BeginnerLessonLayout } from "@/components/BeginnerLessonLayout";
import { getLessonBySlug } from "@/content/beginner-lessons";

export default function BeginnerLesson() {
  const [, params] = useRoute("/beginner-course/:slug");
  const slug = params?.slug;

  if (!slug) {
    return <Redirect to="/beginner-course" />;
  }

  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    return <Redirect to="/beginner-course" />;
  }

  return <BeginnerLessonLayout lesson={lesson} />;
}
