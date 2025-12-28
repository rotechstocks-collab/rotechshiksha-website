type CharacterName = "priya" | "rohit";
type AvatarSize = "sm" | "md" | "lg";

const AVATAR_PATHS = {
  priya: "/characters/avatars/priya.png",
  rohit: "/characters/avatars/rohit.png",
} as const;

const SIZE_CLASSES = {
  sm: "w-8 h-8",
  md: "w-12 h-12", 
  lg: "w-16 h-16",
} as const;

interface CharacterAvatarProps {
  character: CharacterName;
  size?: AvatarSize;
  className?: string;
}

export function CharacterAvatar({ 
  character, 
  size = "md", 
  className = "" 
}: CharacterAvatarProps) {
  const imagePath = AVATAR_PATHS[character];
  const sizeClass = SIZE_CLASSES[size];
  const characterName = character === "priya" ? "Priya" : "Rohit";

  return (
    <img
      src={imagePath}
      alt={characterName}
      loading="lazy"
      className={`rounded-full bg-white border border-gray-200 shadow-sm object-contain p-1 ${sizeClass} ${className}`}
      data-testid={`avatar-${character}`}
    />
  );
}
