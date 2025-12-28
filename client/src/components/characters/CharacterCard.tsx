import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { EmotionAvatar } from "./EmotionAvatar";
import { CharacterEmotion, getEmotionStyles } from "@/utils/characterEmotions";
import priyaAvatar from "@/assets/characters/priya_main_transparent.png";
import rohitAvatar from "@/assets/characters/rohit_main_transparent.png";

interface CharacterCardProps {
  name: "priya" | "rohit";
  role: string;
  quote: string;
  variant?: "default" | "compact" | "horizontal";
  emotion?: CharacterEmotion;
}

const characterData = {
  priya: {
    displayName: "Priya",
    color: "emerald",
    imagePath: priyaAvatar,
    fallbackInitial: "P",
    borderColor: "border-emerald-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    gradientBg: "bg-gradient-to-br from-emerald-100 via-emerald-50 to-green-100 dark:from-emerald-900/40 dark:via-emerald-800/30 dark:to-green-900/40",
    textColor: "text-emerald-700 dark:text-emerald-300",
    badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
  },
  rohit: {
    displayName: "Rohit",
    color: "blue",
    imagePath: rohitAvatar,
    fallbackInitial: "R",
    borderColor: "border-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    gradientBg: "bg-gradient-to-br from-blue-100 via-blue-50 to-sky-100 dark:from-blue-900/40 dark:via-blue-800/30 dark:to-sky-900/40",
    textColor: "text-blue-700 dark:text-blue-300",
    badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
  }
};

export function CharacterCard({ name, role, quote, variant = "default", emotion = "neutral" }: CharacterCardProps) {
  const character = characterData[name];

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
        <EmotionAvatar character={name} emotion={emotion} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`font-semibold ${character.textColor}`}>
              {character.displayName}
            </span>
            <Badge variant="secondary" className="text-xs">
              {role}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground truncate">{quote}</p>
        </div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <motion.div
        initial={{ opacity: 0, x: name === "priya" ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-visible">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <EmotionAvatar character={name} emotion={emotion} size="xl" />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <h3 className={`text-xl font-bold ${character.textColor}`}>
                    {character.displayName}
                  </h3>
                  <Badge className={character.badgeColor}>
                    {role}
                  </Badge>
                </div>
                <div className="relative">
                  <Quote className={`w-4 h-4 ${character.textColor} opacity-50 absolute -left-1 -top-1 hidden sm:block`} />
                  <p className="text-muted-foreground italic pl-0 sm:pl-5">
                    "{quote}"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full text-center overflow-visible">
        <CardContent className="pt-6 pb-6">
          <div className="flex justify-center mb-4">
            <EmotionAvatar character={name} emotion={emotion} size="xl" />
          </div>
          
          <h3 className={`text-xl font-bold mb-1 ${character.textColor}`}>
            {character.displayName}
          </h3>
          <Badge className={`${character.badgeColor} mb-3`}>
            {role}
          </Badge>
          
          <div className="relative mt-3">
            <Quote className={`w-4 h-4 ${character.textColor} opacity-40 absolute left-0 -top-1`} />
            <p className="text-sm text-muted-foreground italic px-4">
              "{quote}"
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface CharacterDuoProps {
  priyaQuote: string;
  rohitQuote: string;
  priyaRole?: string;
  rohitRole?: string;
  variant?: "default" | "compact" | "horizontal";
  priyaEmotion?: CharacterEmotion;
  rohitEmotion?: CharacterEmotion;
}

export function CharacterDuo({ 
  priyaQuote, 
  rohitQuote, 
  priyaRole = "Teri Mentor", 
  rohitRole = "Tera Learning Partner",
  variant = "default",
  priyaEmotion = "neutral",
  rohitEmotion = "neutral"
}: CharacterDuoProps) {
  if (variant === "compact") {
    return (
      <div className="space-y-3">
        <CharacterCard name="priya" role={priyaRole} quote={priyaQuote} variant="compact" emotion={priyaEmotion} />
        <CharacterCard name="rohit" role={rohitRole} quote={rohitQuote} variant="compact" emotion={rohitEmotion} />
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="space-y-4">
        <CharacterCard name="priya" role={priyaRole} quote={priyaQuote} variant="horizontal" emotion={priyaEmotion} />
        <CharacterCard name="rohit" role={rohitRole} quote={rohitQuote} variant="horizontal" emotion={rohitEmotion} />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <CharacterCard name="priya" role={priyaRole} quote={priyaQuote} emotion={priyaEmotion} />
      <CharacterCard name="rohit" role={rohitRole} quote={rohitQuote} emotion={rohitEmotion} />
    </div>
  );
}

export function CharacterAvatar({ 
  name, 
  size = "md", 
  emotion = "neutral" 
}: { 
  name: "priya" | "rohit"; 
  size?: "sm" | "md" | "lg"; 
  emotion?: CharacterEmotion;
}) {
  const sizeMap = { sm: "sm" as const, md: "md" as const, lg: "lg" as const };
  return <EmotionAvatar character={name} emotion={emotion} size={sizeMap[size]} />;
}
