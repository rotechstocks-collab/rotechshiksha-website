import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { characterAssets } from '@/lib/characterAssets';
import { ArrowRight } from 'lucide-react';

interface ComicModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const comicPanels = [
  {
    character: 'rohit' as const,
    pose: 'confused' as const,
    text: 'Main trading start karna chahta hoon, par kahan se shuru karun?',
    translation: 'I want to start trading, but where should I begin?'
  },
  {
    character: 'priya' as const,
    pose: 'point' as const,
    text: 'Pehle basics samjho - market kaise kaam karta hai, charts padhna seekho.',
    translation: 'First understand the basics - how market works, learn to read charts.'
  },
  {
    character: 'priya' as const,
    pose: 'clipboard' as const,
    text: 'Fir paper trading karo - bina paisa lagaye practice karo!',
    translation: 'Then do paper trading - practice without risking real money!'
  }
];

function getPoseImage(character: 'priya' | 'rohit', pose: string): string {
  if (character === 'priya') {
    const priyaPoses = characterAssets.poses.priya;
    return priyaPoses[pose as keyof typeof priyaPoses] || priyaPoses.smile;
  } else {
    const rohitPoses = characterAssets.poses.rohit;
    return rohitPoses[pose as keyof typeof rohitPoses] || rohitPoses.thumb;
  }
}

export function ComicModal({ open, onOpenChange }: ComicModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" data-testid="comic-modal">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Priya & Rohit ka Trading Journey
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {comicPanels.map((panel, index) => (
            <div 
              key={index}
              className="relative bg-gradient-to-b from-muted/50 to-muted rounded-lg p-4 border"
              data-testid={`comic-panel-${index}`}
            >
              <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              
              <div className="flex justify-center mb-3 pt-4">
                <img
                  src={getPoseImage(panel.character, panel.pose)}
                  alt={panel.character}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                />
              </div>
              
              <div className="bg-background rounded-lg p-3 relative">
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-background" />
                <p className="text-sm font-medium text-foreground mb-1">
                  "{panel.text}"
                </p>
                <p className="text-xs text-muted-foreground italic">
                  {panel.translation}
                </p>
              </div>
              
              {index < comicPanels.length - 1 && (
                <div className="hidden md:flex absolute -right-2 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          Priya aur Rohit ke saath apni trading journey start karo!
        </div>
      </DialogContent>
    </Dialog>
  );
}
