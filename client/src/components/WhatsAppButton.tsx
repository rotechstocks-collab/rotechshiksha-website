import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, GraduationCap, Users, Send, ChevronLeft, Share2, Shield, Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import priyaAvatar from "@/assets/characters/priya_main_transparent.png";

const WHATSAPP_NUMBER = "918085616343";
const POPUP_CLOSED_KEY = "whatsapp-popup-closed-session";
const WIDGET_OPEN_EVENT = "widget-opened";

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
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wasClosedInSession = sessionStorage.getItem(POPUP_CLOSED_KEY);
    if (wasClosedInSession) return;

    let hasTriggered = false;
    const triggerPopup = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      setShowPopup(true);
    };

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= 50) {
        triggerPopup();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    const timer = setTimeout(() => {
      triggerPopup();
      window.removeEventListener("scroll", handleScroll);
    }, 15000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  // Close when another widget opens (prevents overlap on mobile)
  useEffect(() => {
    const handleOtherWidgetOpen = (e: CustomEvent) => {
      if (e.detail !== "whatsapp" && isOpen) {
        setIsOpen(false);
        setShowForm(false);
      }
    };
    window.addEventListener(WIDGET_OPEN_EVENT, handleOtherWidgetOpen as EventListener);
    return () => window.removeEventListener(WIDGET_OPEN_EVENT, handleOtherWidgetOpen as EventListener);
  }, [isOpen]);

  // Dispatch event when this widget opens
  const notifyWidgetOpen = useCallback(() => {
    window.dispatchEvent(new CustomEvent(WIDGET_OPEN_EVENT, { detail: "whatsapp" }));
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem(POPUP_CLOSED_KEY, "true");
  };

  const handleMainClick = () => {
    handleClosePopup();
    if (!isOpen) {
      setIsOpen(true);
      notifyWidgetOpen();
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
    handleClosePopup();
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
    handleClosePopup();
  };

  return (
    <>
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
        className="fixed right-2 sm:right-4 bottom-20 md:bottom-6 z-50"
        data-testid="floating-whatsapp-container"
      >
        <AnimatePresence>
          {showPopup && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-[min(20rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] bg-card border rounded-xl shadow-xl overflow-hidden mb-2"
            >
              <div className="bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img 
                      src={priyaAvatar} 
                      alt="Priya" 
                      className="w-8 h-8 rounded-full border-2 border-white/30 bg-white/10"
                    />
                    <span className="font-semibold text-sm">Priya se baat karo</span>
                  </div>
                  <button
                    onClick={handleClosePopup}
                    className="p-1 rounded-full hover:bg-white/20 transition-colors"
                    aria-label="Close popup"
                    data-testid="button-close-whatsapp-popup"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm text-muted-foreground mb-3">
                  Free PDF book ya course help chahiye? Abhi message karo!
                </p>
                <Button 
                  onClick={handleMainClick}
                  className="w-full gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white"
                  data-testid="button-popup-whatsapp-chat"
                >
                  <SiWhatsapp className="w-4 h-4" />
                  Chat on WhatsApp
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-[min(20rem,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] bg-card border rounded-xl shadow-2xl overflow-hidden"
            >
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
              <div className="mb-3 p-2.5 bg-muted/30 rounded-lg border border-muted/50">
                <p className="text-sm text-foreground">
                  Hi! Main <span className="font-semibold text-[#25D366]">Priya</span> — tumhari stock market guide. Kaise help karun?
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!showForm ? (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-1.5"
                  >
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.message)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left hover-elevate active-elevate-2 bg-muted/30 transition-all group"
                        data-testid={`button-whatsapp-${action.id}`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                          <action.icon className="w-4 h-4 text-[#25D366]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground">{action.label}</p>
                          <p className="text-xs text-muted-foreground">{action.subtitle}</p>
                        </div>
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setShowForm(true)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-lg text-left hover-elevate active-elevate-2 bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 border border-[#25D366]/20 transition-all"
                      data-testid="button-whatsapp-custom"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                        <Send className="w-4 h-4 text-[#25D366]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">Custom Message</p>
                        <p className="text-xs text-muted-foreground">Tell us your goal</p>
                      </div>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-3"
                  >
                    <button
                      onClick={() => setShowForm(false)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="button-whatsapp-back"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                    
                    <div className="space-y-2.5">
                      <Input
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-10"
                        data-testid="input-whatsapp-name"
                      />
                      <Select value={goal} onValueChange={setGoal}>
                        <SelectTrigger className="h-10" data-testid="select-whatsapp-goal">
                          <SelectValue placeholder="I want to learn..." />
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
                      className="w-full gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white"
                      data-testid="button-whatsapp-submit"
                    >
                      <Send className="w-4 h-4" />
                      Start Chat
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-3 pt-2.5 border-t border-muted/50 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Shield className="w-3.5 h-3.5" />
                <span>No spam. Sirf learning support.</span>
              </div>
            </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isOpen && (
          <motion.button
            onClick={handleMainClick}
            className="w-12 h-12 md:w-14 md:h-14 bg-[#25D366] hover:bg-[#128C7E] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open WhatsApp chat"
            data-testid="button-open-whatsapp"
          >
            <SiWhatsapp className="w-6 h-6 md:w-7 md:h-7 text-white" />
          </motion.button>
        )}
      </div>
    </>
  );
}
