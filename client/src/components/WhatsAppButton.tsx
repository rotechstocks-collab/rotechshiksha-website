import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, GraduationCap, Users, Send, ChevronLeft, Share2, Shield, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import priyaAvatar from "@/assets/characters/priya_main_transparent.png";

const WHATSAPP_NUMBER = "918085616343";

const encodeWhatsAppMessage = (message: string): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const quickActions = [
  {
    id: "book",
    icon: BookOpen,
    label: "Get Free Book",
    subtitle: "Premium PDF Guide",
    message: "Hi Priya, mujhe Free Stock Market Book chahiye. Please send karo.",
  },
  {
    id: "course",
    icon: GraduationCap,
    label: "Course Details",
    subtitle: "8 Level Learning Path",
    message: "Hi Priya, mujhe Stock Market Courses ke baare mein jaanna hai. Please details share karo.",
  },
  {
    id: "group",
    icon: Users,
    label: "Join Community",
    subtitle: "10,000+ Members",
    message: "Hi Priya, mujhe Rotech Shiksha WhatsApp Community join karni hai. Please add karo.",
  },
  {
    id: "share",
    icon: Share2,
    label: "Share PDF",
    subtitle: "Share with friends",
    message: "Check out Rotech Shiksha - Free Stock Market Education in Hindi! https://rotechshiksha.com",
  },
];

const goalOptions = [
  { value: "basics", label: "Stock Market Basics" },
  { value: "sip", label: "SIP & Mutual Funds" },
  { value: "trading", label: "Intraday Trading" },
  { value: "options", label: "Options Trading" },
];

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowForm(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleMainClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      window.open(
        encodeWhatsAppMessage("Hi Priya, Mujhe Stock Market seekhna hai. Please guide karo (0 to Hero)."),
        "_blank"
      );
    }
  };

  const handleQuickAction = (message: string) => {
    window.open(encodeWhatsAppMessage(message), "_blank");
    setIsOpen(false);
  };

  const handleFormSubmit = () => {
    if (!name.trim() || !goal) return;
    const selectedGoal = goalOptions.find((g) => g.value === goal)?.label || goal;
    const message = `Hi Priya, My name is ${name}. I want to learn ${selectedGoal}. Please guide me from 0 to Hero.`;
    window.open(encodeWhatsAppMessage(message), "_blank");
    setIsOpen(false);
    setShowForm(false);
    setName("");
    setGoal("");
  };

  return (
    <>
      {/* Dim overlay when widget is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 md:hidden"
            onClick={() => {
              setIsOpen(false);
              setShowForm(false);
            }}
            data-testid="whatsapp-overlay"
          />
        )}
      </AnimatePresence>
      
      <div
        ref={popupRef}
        className="fixed right-4 bottom-24 md:bottom-6 z-50"
        data-testid="floating-whatsapp-container"
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-80 bg-card border rounded-xl shadow-2xl overflow-hidden"
            >
            {/* Premium Header with Priya Avatar */}
            <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={priyaAvatar} 
                      alt="Priya" 
                      className="w-10 h-10 rounded-full border-2 border-white/30 bg-white/10"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-[#25D366]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm">Priya</span>
                      <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">Verified</span>
                    </div>
                    <p className="text-xs text-white/80">Reply within 1 minute</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowForm(false);
                  }}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Close WhatsApp menu"
                  data-testid="button-close-whatsapp-menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-3">
              {/* Greeting Message */}
              <div className="mb-3 p-2.5 bg-muted/30 rounded-lg border border-muted/50">
                <p className="text-sm text-foreground">
                  Hi! Main <span className="font-semibold text-[#25D366]">Priya</span> — tumhari stock market guide. Kaise help karun?
                </p>
              </div>
              
              <AnimatePresence mode="wait">
                {!showForm ? (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2"
                  >
                    {quickActions.map((action, idx) => (
                      <motion.button
                        key={action.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.2 }}
                        onClick={() => handleQuickAction(action.message)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-all text-left border border-transparent hover:border-[#25D366]/20"
                        data-testid={`button-whatsapp-${action.id}`}
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                          <action.icon className="w-5 h-5 text-[#25D366]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium block">{action.label}</span>
                          <span className="text-xs text-muted-foreground">{action.subtitle}</span>
                        </div>
                      </motion.button>
                    ))}

                    <div className="pt-3 border-t">
                      <button
                        onClick={() => setShowForm(true)}
                        className="w-full flex items-center justify-center gap-2 p-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                        data-testid="button-show-lead-form"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Send Custom Message
                      </button>
                    </div>
                    
                    {/* Trust Note - Hinglish */}
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground pt-1">
                      <Shield className="w-3 h-3" />
                      <span>No spam. Sirf learning support.</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <button
                      onClick={() => setShowForm(false)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="button-back-to-actions"
                    >
                      <ChevronLeft className="w-3 h-3" />
                      Back
                    </button>

                    <div className="space-y-2">
                      <Input
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-sm"
                        data-testid="input-lead-name"
                      />
                      <Select value={goal} onValueChange={setGoal}>
                        <SelectTrigger className="text-sm" data-testid="select-lead-goal">
                          <SelectValue placeholder="What do you want to learn?" />
                        </SelectTrigger>
                        <SelectContent>
                          {goalOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      onClick={handleFormSubmit}
                      disabled={!name.trim() || !goal}
                      className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2"
                      data-testid="button-send-to-priya"
                    >
                      <SiWhatsapp className="w-4 h-4" />
                      Send to Priya
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {/* Pulse ring animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        
        <motion.button
          onClick={handleMainClick}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-lg shadow-[#25D366]/30 flex items-center justify-center hover:shadow-xl hover:shadow-[#25D366]/40 transition-all"
          aria-label="Chat with Priya on WhatsApp"
          data-testid="button-whatsapp"
        >
          <SiWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
        </motion.button>

        {/* Premium Tooltip with Priya avatar */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-card border shadow-lg rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
          <div className="flex items-center gap-2">
            <img src={priyaAvatar} alt="Priya" className="w-6 h-6 rounded-full" />
            <div>
              <p className="text-xs font-medium text-foreground">Chat with Priya</p>
              <p className="text-[10px] text-muted-foreground">Online now</p>
            </div>
          </div>
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-card" />
        </div>
      </div>
    </div>
    </>
  );
}
