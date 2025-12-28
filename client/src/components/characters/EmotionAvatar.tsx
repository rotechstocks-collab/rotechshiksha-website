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
    defaultBorder: "border-emerald-400 dark:border-emerald-600",
    fallbackBg: "bg-emerald-100 dark:bg-emerald-900/50",
    fallbackText: "text-emerald-700 dark:text-emerald-300",
  },
  rohit: {
    avatar: rohitAvatar,
    displayName: "Rohit",
    defaultGradient: "bg-gradient-to-br from-blue-100 via-blue-50 to-sky-100 dark:from-blue-900/40 dark:via-blue-800/30 dark:to-sky-900/40",
    defaultBorder: "border-blue-400 dark:border-blue-600",
    fallbackBg: "bg-blue-100 dark:bg-blue-900/50",
    fallbackText: "text-blue-700 dark:text-blue-300",
  },
};

const sizeConfig = {
  xs: { container: "w-6 h-6", padding: "p-0.5", border: "border", badge: "w-3 h-3 -top-0.5 -right-0.5", iconSize: "w-2 h-2" },
  sm: { container: "w-8 h-8", padding: "p-0.5", border: "border-2", badge: "w-4 h-4 -top-0.5 -right-0.5", iconSize: "w-2.5 h-2.5" },
  md: { container: "w-12 h-12", padding: "p-1", border: "border-2", badge: "w-5 h-5 -top-1 -right-1", iconSize: "w-3 h-3" },
  lg: { container: "w-16 h-16", padding: "p-1", border: "border-2", badge: "w-6 h-6 -top-1 -right-1", iconSize: "w-3.5 h-3.5" },
  xl: { container: "w-20 h-20", padding: "p-1.5", border: "border-2", badge: "w-7 h-7 -top-1 -right-1", iconSize: "w-4 h-4" },
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

  const borderClass = emotion !== "neutral" ? emotionStyles.borderColor : config.defaultBorder;
  const shadowClass = emotion !== "neutral" ? `shadow-lg ${emotionStyles.glowColor}` : "shadow-sm";
  const animationClass = emotionStyles.animation;

  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className={`
          ${sizeStyles.container} 
          rounded-full 
          ${config.defaultGradient} 
          ${sizeStyles.border} 
          ${borderClass} 
          ${sizeStyles.padding} 
          ${shadowClass}
          ${animationClass}
          transition-all duration-300
        `}
        data-testid={`avatar-${character}-${emotion}`}
      >
        <img
          src={config.avatar}
          alt={`${config.displayName}${emotion !== "neutral" ? ` - ${emotion}` : ""}`}
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
            flex items-center justify-center
            shadow-sm
            border border-white dark:border-gray-800
          `}
          title={emotionBadge.label}
        >
          <emotionBadge.icon className={`${sizeStyles.iconSize} ${emotionBadge.className}`} />
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
