import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import { MessageCircle, X, Send, Loader2, TrendingUp, TrendingDown } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  message: string;
  isAdmin: boolean;
  createdAt: string;
}

interface MarketSnippet {
  name: string;
  price: number;
  change: number;
}

const defaultSnippets: MarketSnippet[] = [
  { name: "NIFTY", price: 24180.80, change: 0.65 },
  { name: "BANKNIFTY", price: 52340.15, change: -0.47 },
];

export function LiveChat() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [snippets] = useState<MarketSnippet[]>(defaultSnippets);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/chat/messages?sessionId=${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!isAuthenticated) {
      setPendingAction("send a message");
      setShowAuthPopup(true);
      return;
    }

    setIsSending(true);
    try {
      const response = await apiRequest("POST", "/api/chat/messages", {
        message: message.trim(),
        sessionId,
        isAdmin: false,
      });
      if (response.ok) {
        const newMessage = await response.json();
        setMessages((prev) => [...prev, newMessage]);
        setMessage("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          message: "Hi! Need help with stock market learning? Ask me anything!",
          isAdmin: true,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  return (
    <>
      <Button
        size="lg"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
        onClick={handleOpen}
        data-testid="button-open-chat"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 shadow-xl" data-testid="chat-window">
          <CardHeader className="flex flex-row items-center justify-between gap-4 py-3 px-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <CardTitle className="text-sm font-medium">Live Support</CardTitle>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              data-testid="button-close-chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>

          <div className="px-4 py-2 bg-muted/50 border-b">
            <div className="flex items-center justify-between text-xs">
              {snippets.map((s) => (
                <div key={s.name} className="flex items-center gap-1">
                  <span className="font-medium">{s.name}</span>
                  <span
                    className={
                      s.change >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {s.change >= 0 ? (
                      <TrendingUp className="w-3 h-3 inline" />
                    ) : (
                      <TrendingDown className="w-3 h-3 inline" />
                    )}
                    {s.change >= 0 ? "+" : ""}
                    {s.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <CardContent className="p-0">
            <ScrollArea className="h-72 p-4" ref={scrollRef}>
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isAdmin ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          msg.isAdmin
                            ? "bg-muted text-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            <form
              onSubmit={sendMessage}
              className="p-4 border-t flex items-center gap-2"
            >
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                data-testid="input-chat-message"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isSending || !message.trim()}
                data-testid="button-send-message"
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
