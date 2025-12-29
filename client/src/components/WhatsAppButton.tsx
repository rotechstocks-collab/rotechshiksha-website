import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, GraduationCap, Users, Send, ChevronLeft } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const WHATSAPP_NUMBER = "918085616343";

const encodeWhatsAppMessage = (message: string): string => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

const quickActions = [
  {
    id: "book",
    icon: BookOpen,
    label: "Get Free Book",
    message: "Hi Priya, mujhe Free Stock Market Book chahiye. Please send karo.",
  },
  {
    id: "course",
    icon: GraduationCap,
    label: "Course Details",
    message: "Hi Priya, mujhe Stock Market Courses ke baare mein jaanna hai. Please details share karo.",
  },
  {
    id: "group",
    icon: Users,
    label: "Join WhatsApp Community",
    message: "Hi Priya, mujhe Rotech Shiksha WhatsApp Community join karni hai. Please add karo.",
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
    <div
      ref={popupRef}
      className="fixed right-4 bottom-20 md:bottom-6 z-50"
      data-testid="floating-whatsapp-container"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-72 bg-card border rounded-xl shadow-xl overflow-hidden"
          >
            <div className="bg-[#25D366] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SiWhatsapp className="w-5 h-5" />
                <span className="font-semibold text-sm">Chat with Priya</span>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowForm(false);
                }}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Close WhatsApp menu"
                data-testid="button-close-whatsapp-menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3">
              <AnimatePresence mode="wait">
                {!showForm ? (
                  <motion.div
                    key="actions"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-2"
                  >
                    {quickActions.map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.message)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover-elevate transition-all text-left"
                        data-testid={`button-whatsapp-${action.id}`}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                          <action.icon className="w-4 h-4 text-[#25D366]" />
                        </div>
                        <span className="text-sm font-medium">{action.label}</span>
                      </button>
                    ))}

                    <div className="pt-2 border-t">
                      <button
                        onClick={() => setShowForm(true)}
                        className="w-full flex items-center justify-center gap-2 p-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        data-testid="button-show-lead-form"
                      >
                        <Send className="w-3 h-3" />
                        Send Custom Message
                      </button>
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
        <motion.button
          onClick={handleMainClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
          aria-label="Chat with Priya on WhatsApp"
          data-testid="button-whatsapp"
        >
          <SiWhatsapp className="w-7 h-7" />
        </motion.button>

        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-md">
          Chat with Priya on WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-foreground" />
        </div>
      </div>
    </div>
  );
}
