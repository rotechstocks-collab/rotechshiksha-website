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
    borderColor: "border-4 border-yellow-400 dark:border-yellow-500",
    glowColor: "",
    animation: "animate-ring-yellow",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-yellow-500 dark:text-yellow-400",
  },
  think: {
    borderColor: "border-4 border-blue-400 dark:border-blue-500",
    glowColor: "",
    animation: "animate-ring-blue",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-blue-500 dark:text-blue-400",
  },
  warning: {
    borderColor: "border-4 border-orange-500 dark:border-orange-400",
    glowColor: "",
    animation: "animate-ring-orange",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-orange-500 dark:text-orange-400",
  },
  happy: {
    borderColor: "border-4 border-green-400 dark:border-green-500",
    glowColor: "",
    animation: "animate-ring-green",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-green-500 dark:text-green-400",
  },
  sad: {
    borderColor: "border-4 border-gray-400 dark:border-gray-500",
    glowColor: "",
    animation: "animate-ring-gray",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-gray-500 dark:text-gray-400",
  },
  confused: {
    borderColor: "border-4 border-purple-400 dark:border-purple-500",
    glowColor: "",
    animation: "animate-ring-purple",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-purple-500 dark:text-purple-400",
  },
  excited: {
    borderColor: "border-4 border-pink-500 dark:border-pink-400",
    glowColor: "",
    animation: "animate-ring-pink",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-pink-500 dark:text-pink-400",
  },
  serious: {
    borderColor: "border-4 border-slate-500 dark:border-slate-400",
    glowColor: "",
    animation: "animate-ring-slate",
    badgeBg: "bg-white dark:bg-gray-900",
    badgeText: "text-slate-500 dark:text-slate-400",
  },
  neutral: {
    borderColor: "border-2 border-gray-200 dark:border-gray-700",
    glowColor: "",
    animation: "",
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
    icon: HelpCircle,
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
