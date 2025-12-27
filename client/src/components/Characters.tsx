import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, HelpCircle, Sparkles, MessageCircle, BookOpen, FileText } from "lucide-react";

type CharacterType = "priya" | "rohit";
type CharacterMood = "explaining" | "questioning" | "celebrating" | "thinking" | "neutral";

interface CharacterProps {
  character: CharacterType;
  mood?: CharacterMood;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

const characterData = {
  priya: {
    name: "Priya",
    nameHi: "प्रिया",
    role: "Your Learning Companion",
    roleHi: "आपकी सीखने की साथी",
    color: "from-emerald-500 to-green-600",
    bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    textColor: "text-emerald-700 dark:text-emerald-300",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/20",
  },
  rohit: {
    name: "Rohit",
    nameHi: "रोहित",
    role: "Fellow Learner",
    roleHi: "साथी सीखने वाला",
    color: "from-slate-600 to-slate-800",
    bgColor: "bg-slate-100 dark:bg-slate-900/30",
    textColor: "text-slate-700 dark:text-slate-300",
    borderColor: "border-slate-200 dark:border-slate-700",
    lightBg: "bg-slate-50 dark:bg-slate-950/20",
  },
};

const MoodIcon = ({ mood, className = "w-4 h-4" }: { mood: CharacterMood; className?: string }) => {
  switch (mood) {
    case "explaining":
      return <Lightbulb className={className} />;
    case "questioning":
      return <HelpCircle className={className} />;
    case "celebrating":
      return <Sparkles className={className} />;
    case "thinking":
      return <MessageCircle className={className} />;
    case "neutral":
    default:
      return <BookOpen className={className} />;
  }
};

export function CharacterAvatar({ character, mood = "neutral", size = "md", showName = false }: CharacterProps) {
  const data = characterData[character];
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br ${data.color} flex items-center justify-center text-white font-bold shadow-md`}>
        {data.name.charAt(0)}
      </div>
      {showName && (
        <div>
          <p className={`font-medium ${data.textColor}`}>{data.name}</p>
          <p className="text-xs text-muted-foreground">{data.role}</p>
        </div>
      )}
    </div>
  );
}

interface StoryCardProps {
  character: CharacterType;
  type: "explanation" | "question" | "summary" | "tip";
  title?: string;
  children: React.ReactNode;
  isHindi?: boolean;
}

const TypeIcon = ({ type, className = "w-4 h-4" }: { type: StoryCardProps["type"]; className?: string }) => {
  switch (type) {
    case "explanation":
      return <Lightbulb className={className} />;
    case "question":
      return <HelpCircle className={className} />;
    case "summary":
      return <FileText className={className} />;
    case "tip":
      return <Sparkles className={className} />;
    default:
      return <BookOpen className={className} />;
  }
};

export function StoryCard({ character, type, title, children, isHindi = false }: StoryCardProps) {
  const data = characterData[character];
  
  const typeConfig = {
    explanation: {
      label: isHindi ? "समझाते हुए..." : "Explaining...",
      mood: "explaining" as CharacterMood,
    },
    question: {
      label: isHindi ? "सवाल..." : "Question...",
      mood: "questioning" as CharacterMood,
    },
    summary: {
      label: isHindi ? "सारांश" : "Summary",
      mood: "neutral" as CharacterMood,
    },
    tip: {
      label: isHindi ? "टिप" : "Pro Tip",
      mood: "celebrating" as CharacterMood,
    },
  };

  const config = typeConfig[type];

  return (
    <Card className={`${data.bgColor} ${data.borderColor} border overflow-visible`}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <CharacterAvatar character={character} mood={config.mood} size="md" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`font-semibold ${data.textColor}`}>{data.name}</span>
              <span className="text-xs text-muted-foreground">{config.label}</span>
              <TypeIcon type={type} className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            {title && (
              <h4 className="font-medium text-foreground mb-2">{title}</h4>
            )}
            <div className="text-sm text-foreground/90 leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DialogueProps {
  exchanges: Array<{
    character: CharacterType;
    message: string;
    type?: "explanation" | "question" | "answer";
  }>;
  isHindi?: boolean;
}

export function Dialogue({ exchanges }: DialogueProps) {
  return (
    <div className="space-y-3">
      {exchanges.map((exchange, index) => {
        const data = characterData[exchange.character];
        
        return (
          <div
            key={index}
            className={`flex items-start gap-3 ${exchange.character === "rohit" ? "flex-row-reverse" : ""}`}
          >
            <CharacterAvatar character={exchange.character} size="sm" />
            <div
              className={`max-w-[85%] rounded-lg px-4 py-2.5 ${
                exchange.character === "priya"
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100"
                  : "bg-slate-100 dark:bg-slate-900/30 text-slate-900 dark:text-slate-100"
              }`}
            >
              <p className="text-sm leading-relaxed">{exchange.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface CharacterIntroProps {
  isHindi?: boolean;
}

export function CharacterIntro({ isHindi = false }: CharacterIntroProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
        <CardContent className="p-5">
          <div className="flex items-center gap-4 mb-3">
            <CharacterAvatar character="priya" size="lg" />
            <div>
              <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-300">
                {isHindi ? "प्रिया" : "Priya"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isHindi ? "आपकी सीखने की साथी" : "Your Learning Companion"}
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {isHindi
              ? "मैं एक अनुभवी investor हूं जो complex concepts को simple तरीके से explain करती हूं। मेरे साथ step-by-step सीखो!"
              : "I'm an experienced investor who explains complex concepts in simple terms. Learn step-by-step with me!"}
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-700">
        <CardContent className="p-5">
          <div className="flex items-center gap-4 mb-3">
            <CharacterAvatar character="rohit" size="lg" />
            <div>
              <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300">
                {isHindi ? "रोहित" : "Rohit"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isHindi ? "साथी सीखने वाला" : "Fellow Learner"}
              </p>
            </div>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {isHindi
              ? "मैं भी तुम्हारी तरह beginner हूं। मेरे doubts देखो – शायद तुम्हारे मन में भी same questions हों!"
              : "I'm a beginner just like you. See my doubts – you might have the same questions too!"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export function HeroCharacters({ isHindi = false }: { isHindi?: boolean }) {
  return (
    <div className="flex items-center justify-center gap-6 py-4">
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
          P
        </div>
        <div className="text-center">
          <p className="font-semibold text-emerald-700 dark:text-emerald-300">
            {isHindi ? "प्रिया" : "Priya"}
          </p>
          <p className="text-xs text-muted-foreground">
            {isHindi ? "Expert Guide" : "Expert Guide"}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
          R
        </div>
        <div className="text-center">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            {isHindi ? "रोहित" : "Rohit"}
          </p>
          <p className="text-xs text-muted-foreground">
            {isHindi ? "Just Like You" : "Just Like You"}
          </p>
        </div>
      </div>
    </div>
  );
}
