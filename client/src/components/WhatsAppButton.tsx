import { MessageCircle } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_NUMBER = "918349024108";
const WHATSAPP_MESSAGE = "Hi! I have a question about Rotech Multi Solution.";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
      aria-label="Chat on WhatsApp"
      data-testid="button-whatsapp"
    >
      <SiWhatsapp className="w-7 h-7" />
    </a>
  );
}
