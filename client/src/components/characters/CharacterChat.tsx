import { getPoseUrl, type PriyaPose, type RohitPose } from '@/../public/characters/poses';

interface ChatMessage {
  character: 'priya' | 'rohit';
  pose: PriyaPose | RohitPose;
  message: string;
}

interface CharacterChatProps {
  messages: ChatMessage[];
  className?: string;
}

export function CharacterChat({ messages, className = '' }: CharacterChatProps) {
  return (
    <div className={`space-y-4 ${className}`} data-testid="character-chat">
      {messages.map((msg, index) => {
        const isRohit = msg.character === 'rohit';
        const characterName = isRohit ? 'Rohit' : 'Priya';
        const imageUrl = getPoseUrl(msg.character, msg.pose);
        
        return (
          <div
            key={index}
            className={`flex items-start gap-3 ${isRohit ? 'flex-row' : 'flex-row-reverse'}`}
            data-testid={`chat-message-${index}`}
          >
            <div className="flex-shrink-0">
              <img
                src={imageUrl}
                alt={characterName}
                loading="lazy"
                className="w-12 h-12 md:w-16 md:h-16 object-contain"
              />
            </div>
            <div 
              className={`flex-1 max-w-[75%] ${isRohit ? '' : 'text-right'}`}
            >
              <span className="text-xs font-medium text-muted-foreground block mb-1">
                {characterName}
              </span>
              <div 
                className={`inline-block px-4 py-2 rounded-2xl text-sm ${
                  isRohit 
                    ? 'bg-muted text-foreground rounded-tl-none' 
                    : 'bg-primary text-primary-foreground rounded-tr-none'
                }`}
              >
                {msg.message}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
