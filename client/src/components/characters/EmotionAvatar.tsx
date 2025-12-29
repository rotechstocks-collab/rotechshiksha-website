import priyaAvatar from "@/assets/characters/priya_main_transparent.png";
import rohitAvatar from "@/assets/characters/rohit_main_transparent.png";
import { CharacterEmotion, getEmotionStyles, getEmotionBadge } from "@/utils/characterEmotions";

type CharacterName = "priya" | "rohit";

interface EmotionAvatarProps {
  character: CharacterName;
  emotion?: CharacterEmotion;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showBadge?: boolean;
  className?: string;
}

const characterConfig = {
  priya: {
    avatar: priyaAvatar,
    displayName: "Priya",
    defaultGradient: "bg-gradient-to-br from-emerald-100 via-emerald-50 to-green-100 dark:from-emerald-900/40 dark:via-emerald-800/30 dark:to-green-900/40",
    fallbackBg: "bg-emerald-100 dark:bg-emerald-900/50",
    fallbackText: "text-emerald-700 dark:text-emerald-300",
  },
  rohit: {
    avatar: rohitAvatar,
    displayName: "Rohit",
    defaultGradient: "bg-gradient-to-br from-blue-100 via-blue-50 to-sky-100 dark:from-blue-900/40 dark:via-blue-800/30 dark:to-sky-900/40",
    fallbackBg: "bg-blue-100 dark:bg-blue-900/50",
    fallbackText: "text-blue-700 dark:text-blue-300",
  },
};

const sizeConfig = {
  xs: { outer: "w-8 h-8", inner: "w-6 h-6", badge: "w-4 h-4 -top-0.5 -right-0.5", iconSize: "w-2.5 h-2.5" },
  sm: { outer: "w-10 h-10", inner: "w-8 h-8", badge: "w-5 h-5 -top-0.5 -right-0.5", iconSize: "w-3 h-3" },
  md: { outer: "w-14 h-14", inner: "w-11 h-11", badge: "w-5 h-5 -top-1 -right-1", iconSize: "w-3 h-3" },
  lg: { outer: "w-18 h-18", inner: "w-14 h-14", badge: "w-6 h-6 -top-1 -right-1", iconSize: "w-3.5 h-3.5" },
  xl: { outer: "w-24 h-24", inner: "w-20 h-20", badge: "w-7 h-7 -top-1.5 -right-1.5", iconSize: "w-4 h-4" },
};

export function EmotionAvatar({
  character,
  emotion = "neutral",
  size = "md",
  showBadge = true,
  className = "",
}: EmotionAvatarProps) {
  const config = characterConfig[character];
  const sizeStyles = sizeConfig[size];
  const emotionStyles = getEmotionStyles(emotion);
  const emotionBadge = showBadge ? getEmotionBadge(emotion) : null;

  const hasEmotion = emotion !== "neutral";

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeStyles.outer} ${className}`}>
      {/* Animated ring layer - behind avatar */}
      <div
        className={`
          absolute inset-0
          rounded-full
          ${emotionStyles.borderColor}
          ${hasEmotion ? emotionStyles.animation : ""}
        `}
        data-testid={`ring-${character}-${emotion}`}
      />

      {/* Fixed avatar layer - never moves */}
      <div
        className={`
          relative z-10
          ${sizeStyles.inner}
          rounded-full
          ${config.defaultGradient}
          border-2 border-white dark:border-gray-800
          shadow-sm
          overflow-hidden
        `}
        data-testid={`avatar-${character}-${emotion}`}
      >
        <img
          src={config.avatar}
          alt={`${config.displayName}${hasEmotion ? ` - ${emotion}` : ""}`}
          className="w-full h-full rounded-full object-contain"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <div
          className={`w-full h-full rounded-full ${config.fallbackBg} items-center justify-center hidden absolute inset-0`}
        >
          <span className={`font-bold ${config.fallbackText}`}>
            {config.displayName[0]}
          </span>
        </div>
      </div>

      {/* Fixed badge - never moves */}
      {emotionBadge && (
        <div
          className={`
            absolute z-20 ${sizeStyles.badge}
            rounded-full
            ${emotionStyles.badgeBg}
            border-2 border-current
            flex items-center justify-center
            shadow-md
            ${emotionStyles.badgeText}
          `}
          title={emotionBadge.label}
        >
          <emotionBadge.icon className={sizeStyles.iconSize} />
        </div>
      )}
    </div>
  );
}

export function PriyaAvatar(props: Omit<EmotionAvatarProps, "character">) {
  return <EmotionAvatar character="priya" {...props} />;
}

export function RohitAvatar(props: Omit<EmotionAvatarProps, "character">) {
  return <EmotionAvatar character="rohit" {...props} />;
}
