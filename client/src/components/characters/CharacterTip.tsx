import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getPoseUrl, type PriyaPose, type RohitPose } from '@/../public/characters/poses';
import { ComicModal } from './ComicModal';
import { Lightbulb } from 'lucide-react';

interface CharacterTipProps {
  character: 'priya' | 'rohit';
  pose: PriyaPose | RohitPose;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  showComicButton?: boolean;
}

export function CharacterTip({
  character,
  pose,
  title,
  message,
  actionLabel,
  onAction,
  showComicButton = false
}: CharacterTipProps) {
  const [showComic, setShowComic] = useState(false);
  const imageUrl = getPoseUrl(character, pose);
  const characterName = character === 'priya' ? 'Priya' : 'Rohit';

  return (
    <>
      <Card className="p-4 flex items-start gap-4 bg-gradient-to-r from-background to-muted/30">
        <div className="flex-shrink-0">
          <img
            src={imageUrl}
            alt={`${characterName} - ${pose}`}
            loading="lazy"
            className="h-14 w-14 rounded-full object-contain bg-white shadow-sm border border-gray-200 p-1"
            data-testid={`img-character-${character}-${pose}`}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-sm text-foreground">{characterName} says:</span>
          </div>
          <h4 className="font-medium text-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground line-clamp-2">{message}</p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {actionLabel && onAction && (
              <Button 
                size="sm" 
                onClick={onAction}
                data-testid={`button-character-action-${character}`}
              >
                {actionLabel}
              </Button>
            )}
            {showComicButton && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowComic(true)}
                data-testid={`button-see-example-${character}`}
              >
                See Example
              </Button>
            )}
          </div>
        </div>
      </Card>
      
      {showComicButton && (
        <ComicModal 
          open={showComic} 
          onOpenChange={setShowComic}
        />
      )}
    </>
  );
}
