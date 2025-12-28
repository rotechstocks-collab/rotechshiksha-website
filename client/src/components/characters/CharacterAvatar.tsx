import { EmotionAvatar } from "./EmotionAvatar";
import { CharacterEmotion } from "@/utils/characterEmotions";

type CharacterName = "priya" | "rohit";
type AvatarSize = "sm" | "md" | "lg";

interface CharacterAvatarProps {
  character: CharacterName;
  size?: AvatarSize;
  className?: string;
  emotion?: CharacterEmotion;
}

export function CharacterAvatar({ 
  character, 
  size = "md", 
  className = "",
  emotion = "neutral"
}: CharacterAvatarProps) {
  const sizeMap = { sm: "sm" as const, md: "md" as const, lg: "lg" as const };
  
  return (
    <EmotionAvatar 
      character={character} 
      emotion={emotion} 
      size={sizeMap[size]} 
      className={className}
    />
  );
}
