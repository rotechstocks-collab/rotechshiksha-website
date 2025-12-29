import { Link, useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Home, BookOpen, Calculator, HelpCircle, CreditCard } from "lucide-react";

interface NavItem {
  labelKey: string;
  fallbackLabel: string;
  href: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { labelKey: "nav.home", fallbackLabel: "Home", href: "/", icon: Home },
  { labelKey: "nav.courses", fallbackLabel: "Courses", href: "/courses", icon: BookOpen },
  { labelKey: "nav.tools", fallbackLabel: "Tools", href: "/calculators", icon: Calculator },
  { labelKey: "nav.faq", fallbackLabel: "FAQ", href: "/faq", icon: HelpCircle },
  { labelKey: "nav.pricing", fallbackLabel: "Pricing", href: "/pricing", icon: CreditCard },
];

export function MobileBottomNav() {
  const [location] = useLocation();
  const { t } = useLanguage();

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/98 dark:bg-slate-900/98 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-700/50"
      style={{ 
        paddingBottom: 'max(8px, env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)'
      }}
      data-testid="mobile-bottom-nav"
    >
      <div className="flex items-stretch justify-around h-14">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={`flex flex-col items-center justify-center flex-1 min-w-[56px] h-full px-1 transition-colors duration-150 ${
                  active 
                    ? "text-emerald-600 dark:text-emerald-400" 
                    : "text-slate-500 dark:text-slate-400"
                }`}
                data-testid={`mobile-nav-${item.labelKey}`}
              >
                <Icon 
                  className="w-5 h-5 mb-1" 
                  strokeWidth={active ? 2.2 : 1.8}
                />
                <span className={`text-[10px] leading-none truncate max-w-[48px] text-center ${
                  active ? "font-semibold" : "font-medium"
                }`}>
                  {t(item.labelKey) || item.fallbackLabel}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
