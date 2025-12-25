import { Link } from "wouter";
import { SiWhatsapp, SiTelegram, SiInstagram, SiYoutube } from "react-icons/si";
import { AlertTriangle, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logoImage from "@assets/generated_images/professional_rotech_shiksha_logo.png";

export function Footer() {
  const socialLinks = [
    { href: "https://wa.me/918349024108", icon: SiWhatsapp, label: "whatsapp", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
    { href: "https://t.me/Bharatfincap", icon: SiTelegram, label: "telegram", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
    { href: "https://instagram.com/rotechmultisolution", icon: SiInstagram, label: "instagram", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
    { href: "https://youtube.com/@rotechmultisolution", icon: SiYoutube, label: "youtube", color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-card dark:to-background border-t border-slate-100 dark:border-card-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12" style={{ paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))', paddingBottom: 'max(3rem, env(safe-area-inset-bottom))' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <img 
                src={logoImage} 
                alt="Rotech Shiksha Logo" 
                className="h-10 w-auto object-contain cursor-pointer"
                loading="lazy"
                data-testid="footer-logo"
              />
            </Link>
            <p className="text-sm text-slate-600 dark:text-muted-foreground leading-relaxed">
              Learn stock market trading with India's trusted education platform.
              From basics to advanced algo trading, we cover everything.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-md ${social.color}`}
                  data-testid={`link-${social.label}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold text-slate-800 dark:text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/courses/basic", label: "Basic Course", testId: "footer-link-basic-course" },
                { href: "/courses/intermediate", label: "Intermediate Course", testId: "footer-link-intermediate-course" },
                { href: "/courses/advanced", label: "Advanced Course", testId: "footer-link-advanced-course" },
                { href: "/courses/algo", label: "Algo Trading", testId: "footer-link-algo-trading" },
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-sm text-slate-500 dark:text-muted-foreground hover:text-[#4A90E2] dark:hover:text-primary cursor-pointer transition-colors duration-200" 
                    data-testid={link.testId}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold text-slate-800 dark:text-foreground">Resources</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/calculators", label: "Calculators", testId: "footer-link-calculators" },
                { href: "/live-market", label: "Live Market", testId: "footer-link-live-market" },
                { href: "/startup-connect", label: "Startup Connect", testId: "footer-link-startup-connect" },
                { href: "/pricing", label: "Pricing Plans", testId: "footer-link-pricing" },
                { href: "/about", label: "About Us", testId: "footer-link-about" },
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-sm text-slate-500 dark:text-muted-foreground hover:text-[#4A90E2] dark:hover:text-primary cursor-pointer transition-colors duration-200" 
                    data-testid={link.testId}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold text-slate-800 dark:text-foreground">Contact</h4>
            <div className="flex flex-col gap-3">
              <motion.a 
                href="tel:+918349024108"
                className="flex items-center gap-2 text-sm text-slate-500 dark:text-muted-foreground hover:text-[#4A90E2] dark:hover:text-primary transition-colors duration-200"
                whileHover={{ x: 4 }}
              >
                <Phone className="w-4 h-4" />
                <span>+91 83490 24108</span>
              </motion.a>
              <motion.a 
                href="mailto:support@rotechshiksha.com"
                className="flex items-center gap-2 text-sm text-slate-500 dark:text-muted-foreground hover:text-[#4A90E2] dark:hover:text-primary transition-colors duration-200"
                whileHover={{ x: 4 }}
              >
                <Mail className="w-4 h-4" />
                <span>support@rotechshiksha.com</span>
              </motion.a>
              <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>India</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 pt-8 border-t border-slate-200 dark:border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <motion.div 
              className="flex items-start gap-2 p-4 rounded-lg bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                <strong>Disclaimer:</strong> Stock market investments are subject to market risks.
                This platform is for educational purposes only. We do not provide any buy/sell recommendations.
                No guaranteed returns. Past performance is not indicative of future results.
              </p>
            </motion.div>
            <p className="text-sm text-slate-500 dark:text-muted-foreground">
              © {new Date().getFullYear()} Rotech Shiksha. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
