import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import priyaAvatar from "@/assets/characters/priya_main_transparent.png";
import rohitAvatar from "@/assets/characters/rohit_main_transparent.png";

interface CharacterCardProps {
  name: "priya" | "rohit";
  role: string;
  quote: string;
  variant?: "default" | "compact" | "horizontal";
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

export function CharacterCard({ name, role, quote, variant = "default" }: CharacterCardProps) {
  const character = characterData[name];

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-card border">
        <div className={`relative flex-shrink-0 w-12 h-12 rounded-full ${character.gradientBg} border-2 ${character.borderColor} p-1 shadow-sm`}>
          <img
            src={character.imagePath}
            alt={`${character.displayName} - ${role}`}
            className="w-full h-full rounded-full object-contain"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
          <div 
            className={`w-full h-full rounded-full ${character.bgColor} items-center justify-center hidden absolute inset-0`}
          >
            <span className={`text-lg font-bold ${character.textColor}`}>
              {character.fallbackInitial}
            </span>
          </div>
        </div>
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
              <div className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full ${character.gradientBg} border-2 ${character.borderColor} p-1.5 shadow-lg`}>
                <img
                  src={character.imagePath}
                  alt={`${character.displayName} - ${role}`}
                  className="w-full h-full rounded-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div 
                  className={`w-full h-full rounded-full ${character.bgColor} items-center justify-center hidden absolute inset-0`}
                >
                  <span className={`text-2xl font-bold ${character.textColor}`}>
                    {character.fallbackInitial}
                  </span>
                </div>
              </div>
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
          <div className={`relative inline-block mb-4 w-24 h-24 md:w-28 md:h-28 rounded-full ${character.gradientBg} border-2 ${character.borderColor} p-1.5 shadow-lg mx-auto`}>
            <img
              src={character.imagePath}
              alt={`${character.displayName} - ${role}`}
              className="w-full h-full rounded-full object-contain"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div 
              className={`w-full h-full rounded-full ${character.bgColor} items-center justify-center hidden absolute inset-0`}
            >
              <span className={`text-3xl font-bold ${character.textColor}`}>
                {character.fallbackInitial}
              </span>
            </div>
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
}

export function CharacterDuo({ 
  priyaQuote, 
  rohitQuote, 
  priyaRole = "Teri Mentor", 
  rohitRole = "Tera Learning Partner",
  variant = "default"
}: CharacterDuoProps) {
  if (variant === "compact") {
    return (
      <div className="space-y-3">
        <CharacterCard name="priya" role={priyaRole} quote={priyaQuote} variant="compact" />
        <CharacterCard name="rohit" role={rohitRole} quote={rohitQuote} variant="compact" />
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="space-y-4">
        <CharacterCard name="priya" role={priyaRole} quote={priyaQuote} variant="horizontal" />
        <CharacterCard name="rohit" role={rohitRole} quote={rohitQuote} variant="horizontal" />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <CharacterCard name="priya" role={priyaRole} quote={priyaQuote} />
      <CharacterCard name="rohit" role={rohitRole} quote={rohitQuote} />
    </div>
  );
}

export function CharacterAvatar({ name, size = "md" }: { name: "priya" | "rohit"; size?: "sm" | "md" | "lg" }) {
  const character = characterData[name];
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };
  const paddingClasses = {
    sm: "p-0.5",
    md: "p-1",
    lg: "p-1.5"
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]} rounded-full ${character.gradientBg} border-2 ${character.borderColor} ${paddingClasses[size]} shadow-sm`}>
      <img
        src={character.imagePath}
        alt={character.displayName}
        className="w-full h-full rounded-full object-contain"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div 
        className={`w-full h-full rounded-full ${character.bgColor} items-center justify-center hidden absolute inset-0`}
      >
        <span className={`font-bold ${character.textColor}`}>
          {character.fallbackInitial}
        </span>
      </div>
    </div>
  );
}
