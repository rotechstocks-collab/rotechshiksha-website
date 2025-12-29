import { motion } from "framer-motion";
import { SiWhatsapp } from "react-icons/si";
import { Button } from "@/components/ui/button";
import priyaImg from "@/assets/characters/priya_main_transparent.png";
import rohitImg from "@/assets/characters/rohit_main_transparent.png";

const WHATSAPP_LINK = "https://wa.me/918085616343?text=Hi%20Priya%2C%20Mujhe%20Stock%20Market%20seekhna%20hai.%20Please%20guide%20karo%20(0%20to%20Hero).";

export function WhatsAppStrip() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#25D366]/10 via-[#25D366]/5 to-[#25D366]/10 dark:from-[#25D366]/20 dark:via-[#25D366]/10 dark:to-[#25D366]/20 border border-[#25D366]/20 rounded-xl p-4 md:p-5"
      data-testid="whatsapp-strip"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            <img
              src={priyaImg}
              alt="Priya"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white dark:border-gray-800 object-cover"
            />
            <img
              src={rohitImg}
              alt="Rohit"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white dark:border-gray-800 object-cover"
            />
          </div>
          <div>
            <p className="text-sm md:text-base font-medium text-foreground">
              Confused? Priya WhatsApp pe help karegi
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Free guidance for your stock market journey
            </p>
          </div>
        </div>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-whatsapp-strip-chat"
        >
          <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white gap-2 whitespace-nowrap">
            <SiWhatsapp className="w-4 h-4" />
            Chat Now
          </Button>
        </a>
      </div>
    </motion.div>
  );
}
