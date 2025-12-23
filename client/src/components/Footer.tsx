import { Link } from "wouter";
import { SiWhatsapp, SiTelegram, SiInstagram, SiYoutube } from "react-icons/si";
import { AlertTriangle, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground">
              Rotech
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Learn stock market trading with India's trusted education platform.
              From basics to advanced algo trading, we cover everything.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/918349024108"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover-elevate active-elevate-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                data-testid="link-whatsapp"
              >
                <SiWhatsapp className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/Bharatfincap"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover-elevate active-elevate-2 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                data-testid="link-telegram"
              >
                <SiTelegram className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/rotechmultisolution"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover-elevate active-elevate-2 bg-pink-500/10 text-pink-600 dark:text-pink-400"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@rotechmultisolution"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md hover-elevate active-elevate-2 bg-red-500/10 text-red-600 dark:text-red-400"
                data-testid="link-youtube"
              >
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/courses/basic">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Basic Course
                </span>
              </Link>
              <Link href="/courses/intermediate">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Intermediate Course
                </span>
              </Link>
              <Link href="/courses/advanced">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Advanced Course
                </span>
              </Link>
              <Link href="/courses/algo">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Algo Trading
                </span>
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/calculators">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Calculators
                </span>
              </Link>
              <Link href="/live-market">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Live Market
                </span>
              </Link>
              <Link href="/startup-connect">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Startup Connect
                </span>
              </Link>
              <Link href="/pricing">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  Pricing Plans
                </span>
              </Link>
              <Link href="/about">
                <span className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  About Us
                </span>
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="tel:+918349024108"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Phone className="w-4 h-4" />
                <span>+91 83490 24108</span>
              </a>
              <a 
                href="mailto:support@rotechshiksha.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
              >
                <Mail className="w-4 h-4" />
                <span>support@rotechshiksha.com</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-start gap-2 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">
                <strong>Disclaimer:</strong> Stock market investments are subject to market risks.
                This platform is for educational purposes only. We do not provide any buy/sell recommendations.
                No guaranteed returns. Past performance is not indicative of future results.
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rotech. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
