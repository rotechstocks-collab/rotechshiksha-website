import { useState } from "react";
import { Link } from "wouter";
import { SiWhatsapp, SiTelegram, SiInstagram, SiYoutube } from "react-icons/si";
import { AlertTriangle, Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// AnimatePresence is still used for the disclaimer section
import logoImage from "@assets/generated_images/professional_rotech_shiksha_logo.png";

const courseLinks = [
  { href: "/courses/basic", label: "Basic Course", testId: "footer-link-basic-course" },
  { href: "/courses/intermediate", label: "Intermediate", testId: "footer-link-intermediate-course" },
  { href: "/courses/advanced", label: "Advanced", testId: "footer-link-advanced-course" },
  { href: "/courses/algo", label: "Algo Trading", testId: "footer-link-algo-trading" },
];

const resourceLinks = [
  { href: "/calculators", label: "Calculators", testId: "footer-link-calculators" },
  { href: "/blog", label: "Market Gyaan", testId: "footer-link-blog" },
  { href: "/faq", label: "FAQ", testId: "footer-link-faq" },
  { href: "/pricing", label: "Pricing", testId: "footer-link-pricing" },
  { href: "/about", label: "About Us", testId: "footer-link-about" },
];

interface AccordionSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionSection({ title, children, defaultOpen = false }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-slate-200/60 dark:border-slate-700/50 md:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 md:hidden"
        data-testid={`footer-accordion-${title.toLowerCase()}`}
      >
        <h4 className="text-sm font-semibold text-slate-800 dark:text-white">{title}</h4>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <h4 className="hidden md:block text-sm font-semibold text-slate-800 dark:text-white mb-3">{title}</h4>
      <div className={`overflow-hidden transition-all duration-200 md:!max-h-none md:!opacity-100 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100'}`}>
        <div className="pb-3 md:pb-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  const socialLinks = [
    { href: "https://wa.me/918349024108", icon: SiWhatsapp, label: "whatsapp", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    { href: "https://t.me/Bharatfincap", icon: SiTelegram, label: "telegram", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { href: "https://instagram.com/rotechmultisolution", icon: SiInstagram, label: "instagram", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
    { href: "https://youtube.com/@rotechmultisolution", icon: SiYoutube, label: "youtube", color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  ];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-20 md:pb-0">
      <div 
        className="max-w-6xl mx-auto px-4 py-8 md:py-12" 
        style={{ paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))' }}
      >
        <div className="space-y-0 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
          <div className="pb-4 md:pb-0 border-b border-slate-200/60 dark:border-slate-700/50 md:border-0">
            <Link href="/">
              <img 
                src={logoImage} 
                alt="Rotech Shiksha Logo" 
                className="h-8 w-auto object-contain cursor-pointer"
                loading="lazy"
                data-testid="footer-logo"
              />
            </Link>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              India's trusted stock market education platform.
            </p>
            <div className="flex items-center gap-2 mt-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg ${social.color} transition-transform hover:scale-110`}
                  data-testid={`link-${social.label}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <AccordionSection title="Courses">
            <nav className="flex flex-col gap-2">
              {courseLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-sm md:text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 md:py-0" 
                  data-testid={link.testId}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </AccordionSection>

          <AccordionSection title="Resources">
            <nav className="flex flex-col gap-2">
              {resourceLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-sm md:text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 md:py-0" 
                  data-testid={link.testId}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </AccordionSection>

          <AccordionSection title="Contact">
            <div className="flex flex-col gap-2">
              <a 
                href="tel:+918349024108"
                className="flex items-center gap-2 text-sm md:text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 md:py-0"
              >
                <Phone className="w-4 h-4 md:w-3.5 md:h-3.5" />
                <span>+91 83490 24108</span>
              </a>
              <a 
                href="mailto:support@rotechshiksha.com"
                className="flex items-center gap-2 text-sm md:text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 md:py-0"
              >
                <Mail className="w-4 h-4 md:w-3.5 md:h-3.5" />
                <span>support@rotechshiksha.com</span>
              </a>
              <div className="flex items-center gap-2 text-sm md:text-xs text-slate-500 dark:text-slate-400 py-1 md:py-0">
                <MapPin className="w-4 h-4 md:w-3.5 md:h-3.5" />
                <span>India</span>
              </div>
            </div>
          </AccordionSection>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 p-4 md:p-5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-6">
                  <span className="font-medium text-slate-800 dark:text-slate-200">Disclaimer:</span> This platform is for educational purposes only. We do not provide investment advice or trading tips.
                  {!showFullDisclaimer && (
                    <button 
                      onClick={() => setShowFullDisclaimer(true)}
                      className="ml-1 text-emerald-600 dark:text-emerald-400 hover:underline font-medium inline-flex items-center gap-0.5"
                      data-testid="button-expand-disclaimer"
                    >
                      Read more
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  )}
                </p>
                <AnimatePresence>
                  {showFullDisclaimer && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-6 mt-2">
                        We are not affiliated with Zerodha, Groww, or any broker. Invest at your own risk after proper research. No guaranteed returns. Past performance is not indicative of future results. 
                        Consult a SEBI registered advisor before making investment decisions. Always do your own research before making any financial decisions.
                      </p>
                      <button 
                        onClick={() => setShowFullDisclaimer(false)}
                        className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium inline-flex items-center gap-0.5"
                        data-testid="button-collapse-disclaimer"
                      >
                        Show less
                        <ChevronUp className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} Rotech Shiksha. All rights reserved.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Made with care for Indian investors
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
