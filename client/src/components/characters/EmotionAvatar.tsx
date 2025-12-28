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
    defaultBorder: "ring-2 ring-emerald-400 dark:ring-emerald-600",
    fallbackBg: "bg-emerald-100 dark:bg-emerald-900/50",
    fallbackText: "text-emerald-700 dark:text-emerald-300",
  },
  rohit: {
    avatar: rohitAvatar,
    displayName: "Rohit",
    defaultGradient: "bg-gradient-to-br from-blue-100 via-blue-50 to-sky-100 dark:from-blue-900/40 dark:via-blue-800/30 dark:to-sky-900/40",
    defaultBorder: "ring-2 ring-blue-400 dark:ring-blue-600",
    fallbackBg: "bg-blue-100 dark:bg-blue-900/50",
    fallbackText: "text-blue-700 dark:text-blue-300",
  },
};

const sizeConfig = {
  xs: { container: "w-8 h-8", padding: "p-0.5", badge: "w-5 h-5 -top-1 -right-1", iconSize: "w-3 h-3" },
  sm: { container: "w-10 h-10", padding: "p-0.5", badge: "w-5 h-5 -top-1 -right-1", iconSize: "w-3 h-3" },
  md: { container: "w-14 h-14", padding: "p-1", badge: "w-6 h-6 -top-1 -right-1", iconSize: "w-4 h-4" },
  lg: { container: "w-18 h-18", padding: "p-1", badge: "w-7 h-7 -top-1.5 -right-1.5", iconSize: "w-4 h-4" },
  xl: { container: "w-24 h-24", padding: "p-1.5", badge: "w-8 h-8 -top-2 -right-2", iconSize: "w-5 h-5" },
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
  const ringClass = hasEmotion ? emotionStyles.borderColor : config.defaultBorder;
  const shadowClass = hasEmotion ? emotionStyles.glowColor : "shadow-md";
  const animationClass = emotionStyles.animation;

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`
          ${sizeStyles.container} 
          rounded-full 
          ${config.defaultGradient} 
          ${ringClass}
          ${sizeStyles.padding} 
          ${shadowClass}
          ${animationClass}
          transition-all duration-300
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

      {emotionBadge && (
        <div
          className={`
            absolute ${sizeStyles.badge} 
            rounded-full 
            ${emotionStyles.badgeBg}
            border-2 border-current
            flex items-center justify-center
            shadow-md
            ${emotionStyles.badgeText}
          `}
          title={emotionBadge.label}
        >
          <emotionBadge.icon className={`${sizeStyles.iconSize}`} />
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
