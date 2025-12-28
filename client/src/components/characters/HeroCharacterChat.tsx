import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'wouter';
import { ArrowRight, BookOpen, Calculator } from 'lucide-react';
import { CharacterChat } from './CharacterChat';
import { motion } from 'framer-motion';

interface HeroCharacterChatProps {
  className?: string;
}

const heroConversation = [
  {
    character: 'rohit' as const,
    pose: 'confused' as const,
    message: "Yaar, mujhe trading seekhni hai par samajh nahi aa raha kahan se shuru karun?"
  },
  {
    character: 'priya' as const,
    pose: 'point' as const,
    message: "Simple hai! Pehle basics samjho - stock kya hai, market kaise kaam karta hai. Fir step-by-step aage badho."
  },
  {
    character: 'rohit' as const,
    pose: 'idea' as const,
    message: "Lekin kya yeh free hai? Aur Hindi mein milega?"
  },
  {
    character: 'priya' as const,
    pose: 'smile' as const,
    message: "Haan! Yahan sab kuch Hinglish mein hai aur beginners ke liye bilkul free. Chalo start karein!"
  }
];

export function HeroCharacterChat({ className = '' }: HeroCharacterChatProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={className}
    >
      <Card className="p-4 md:p-6 bg-gradient-to-br from-background to-muted/30 border-2" data-testid="hero-character-chat">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">Priya & Rohit ki Baat</span>
        </div>
        
        <CharacterChat messages={heroConversation} className="mb-6" />
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Link href="/courses" className="flex-1">
            <Button className="w-full" data-testid="button-hero-start-learning">
              <BookOpen className="w-4 h-4 mr-2" />
              Start Learning
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/calculators" className="flex-1">
            <Button variant="outline" className="w-full" data-testid="button-hero-calculators">
              <Calculator className="w-4 h-4 mr-2" />
              Try Calculators
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
