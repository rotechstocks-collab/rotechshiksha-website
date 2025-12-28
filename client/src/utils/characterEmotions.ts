import { Smile, Brain, AlertTriangle, PartyPopper, Frown, HelpCircle, Sparkles, Target } from "lucide-react";

export type CharacterEmotion = 
  | "smile" 
  | "think" 
  | "warning" 
  | "happy" 
  | "sad" 
  | "confused" 
  | "excited" 
  | "serious"
  | "neutral";

interface EmotionStyles {
  borderColor: string;
  glowColor: string;
  animation: string;
  badgeBg: string;
  badgeText: string;
}

interface EmotionBadge {
  icon: typeof Smile;
  label: string;
  className: string;
}

const emotionStylesMap: Record<CharacterEmotion, EmotionStyles> = {
  smile: {
    borderColor: "ring-4 ring-yellow-400 dark:ring-yellow-500",
    glowColor: "shadow-lg shadow-yellow-400/60 dark:shadow-yellow-500/40",
    animation: "animate-none",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-yellow-500 dark:text-yellow-400",
  },
  think: {
    borderColor: "ring-4 ring-blue-400 dark:ring-blue-500",
    glowColor: "shadow-lg shadow-blue-400/60 dark:shadow-blue-500/40",
    animation: "animate-pulse-slow",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-blue-500 dark:text-blue-400",
  },
  warning: {
    borderColor: "ring-4 ring-orange-500 dark:ring-orange-400",
    glowColor: "shadow-lg shadow-orange-500/60 dark:shadow-orange-400/40",
    animation: "animate-shake",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-orange-500 dark:text-orange-400",
  },
  happy: {
    borderColor: "ring-4 ring-green-400 dark:ring-green-500",
    glowColor: "shadow-lg shadow-green-400/60 dark:shadow-green-500/40",
    animation: "animate-bounce-subtle",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-green-500 dark:text-green-400",
  },
  sad: {
    borderColor: "ring-4 ring-gray-400 dark:ring-gray-500",
    glowColor: "shadow-lg shadow-gray-400/50 dark:shadow-gray-500/30",
    animation: "animate-fade",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-gray-500 dark:text-gray-400",
  },
  confused: {
    borderColor: "ring-4 ring-purple-400 dark:ring-purple-500",
    glowColor: "shadow-lg shadow-purple-400/60 dark:shadow-purple-500/40",
    animation: "animate-wobble",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-purple-500 dark:text-purple-400",
  },
  excited: {
    borderColor: "ring-4 ring-pink-500 dark:ring-pink-400",
    glowColor: "shadow-xl shadow-pink-500/70 dark:shadow-pink-400/50",
    animation: "animate-pop",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-pink-500 dark:text-pink-400",
  },
  serious: {
    borderColor: "ring-4 ring-slate-500 dark:ring-slate-400",
    glowColor: "shadow-lg shadow-slate-400/50 dark:shadow-slate-500/30",
    animation: "animate-none",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-slate-500 dark:text-slate-400",
  },
  neutral: {
    borderColor: "",
    glowColor: "",
    animation: "animate-none",
    badgeBg: "",
    badgeText: "",
  },
};

const emotionBadgeMap: Record<CharacterEmotion, EmotionBadge> = {
  smile: {
    icon: Smile,
    label: "Smiling",
    className: "text-yellow-600 dark:text-yellow-400",
  },
  think: {
    icon: Brain,
    label: "Thinking",
    className: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    className: "text-orange-600 dark:text-orange-400",
  },
  happy: {
    icon: PartyPopper,
    label: "Happy",
    className: "text-green-600 dark:text-green-400",
  },
  sad: {
    icon: Frown,
    label: "Sad",
    className: "text-gray-600 dark:text-gray-400",
  },
  confused: {
    icon: HelpCircle,
    label: "Confused",
    className: "text-purple-600 dark:text-purple-400",
  },
  excited: {
    icon: Sparkles,
    label: "Excited",
    className: "text-pink-600 dark:text-pink-400",
  },
  serious: {
    icon: Target,
    label: "Serious",
    className: "text-slate-600 dark:text-slate-400",
  },
  neutral: {
    icon: Smile,
    label: "",
    className: "",
  },
};

export function getEmotionStyles(emotion: CharacterEmotion = "neutral"): EmotionStyles {
  return emotionStylesMap[emotion] || emotionStylesMap.neutral;
}

export function getEmotionBadge(emotion: CharacterEmotion = "neutral"): EmotionBadge | null {
  if (emotion === "neutral") return null;
  return emotionBadgeMap[emotion] || null;
}

export function getEmotionClasses(emotion: CharacterEmotion = "neutral"): string {
  const styles = getEmotionStyles(emotion);
  return `${styles.borderColor} ${styles.glowColor} ${styles.animation}`.trim();
}

export function combineEmotionWithBase(
  baseClasses: string,
  emotion: CharacterEmotion = "neutral"
): string {
  const emotionClasses = getEmotionClasses(emotion);
  if (!emotionClasses) return baseClasses;
  
  const baseParts = baseClasses.split(" ").filter(c => !c.startsWith("border-") && !c.startsWith("shadow-") && !c.startsWith("animate-"));
  return `${baseParts.join(" ")} ${emotionClasses}`.trim();
}
