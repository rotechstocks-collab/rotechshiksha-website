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
    borderColor: "border-yellow-400 dark:border-yellow-500",
    glowColor: "shadow-yellow-200/50 dark:shadow-yellow-500/30",
    animation: "animate-none",
    badgeBg: "bg-yellow-100 dark:bg-yellow-900/50",
    badgeText: "text-yellow-700 dark:text-yellow-300",
  },
  think: {
    borderColor: "border-blue-400 dark:border-blue-500",
    glowColor: "shadow-blue-200/50 dark:shadow-blue-500/30",
    animation: "animate-pulse-slow",
    badgeBg: "bg-blue-100 dark:bg-blue-900/50",
    badgeText: "text-blue-700 dark:text-blue-300",
  },
  warning: {
    borderColor: "border-orange-400 dark:border-orange-500",
    glowColor: "shadow-orange-200/50 dark:shadow-orange-500/30",
    animation: "animate-shake",
    badgeBg: "bg-orange-100 dark:bg-orange-900/50",
    badgeText: "text-orange-700 dark:text-orange-300",
  },
  happy: {
    borderColor: "border-green-400 dark:border-green-500",
    glowColor: "shadow-green-200/50 dark:shadow-green-500/30",
    animation: "animate-bounce-subtle",
    badgeBg: "bg-green-100 dark:bg-green-900/50",
    badgeText: "text-green-700 dark:text-green-300",
  },
  sad: {
    borderColor: "border-gray-400 dark:border-gray-500",
    glowColor: "shadow-gray-200/50 dark:shadow-gray-500/30",
    animation: "animate-fade",
    badgeBg: "bg-gray-100 dark:bg-gray-800/50",
    badgeText: "text-gray-700 dark:text-gray-300",
  },
  confused: {
    borderColor: "border-purple-400 dark:border-purple-500",
    glowColor: "shadow-purple-200/50 dark:shadow-purple-500/30",
    animation: "animate-wobble",
    badgeBg: "bg-purple-100 dark:bg-purple-900/50",
    badgeText: "text-purple-700 dark:text-purple-300",
  },
  excited: {
    borderColor: "border-pink-400 dark:border-pink-500",
    glowColor: "shadow-pink-200/50 dark:shadow-pink-500/30",
    animation: "animate-pop",
    badgeBg: "bg-pink-100 dark:bg-pink-900/50",
    badgeText: "text-pink-700 dark:text-pink-300",
  },
  serious: {
    borderColor: "border-slate-500 dark:border-slate-400",
    glowColor: "shadow-slate-200/50 dark:shadow-slate-500/30",
    animation: "animate-none",
    badgeBg: "bg-slate-100 dark:bg-slate-800/50",
    badgeText: "text-slate-700 dark:text-slate-300",
  },
  neutral: {
    borderColor: "border-emerald-200 dark:border-emerald-700",
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
