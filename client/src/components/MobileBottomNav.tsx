import { Link, useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Home, BookOpen, Wrench, FileText, HelpCircle, CreditCard } from "lucide-react";

interface NavItem {
  labelKey: string;
  href: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { labelKey: "nav.home", href: "/", icon: Home },
  { labelKey: "nav.courses", href: "/courses", icon: BookOpen },
  { labelKey: "nav.tools", href: "/calculators", icon: Wrench },
  { labelKey: "nav.blog", href: "/blog", icon: FileText },
  { labelKey: "nav.faq", href: "/faq", icon: HelpCircle },
  { labelKey: "nav.pricing", href: "/pricing", icon: CreditCard },
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
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-background/95 backdrop-blur-md border-t border-slate-200 dark:border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)] rounded-t-2xl"
      style={{ 
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)'
      }}
      data-testid="mobile-bottom-nav"
    >
      <div className="flex items-center justify-around px-1 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link key={item.href} href={item.href}>
              <button
                className={`flex flex-col items-center justify-center min-w-[52px] py-1.5 px-2 rounded-xl transition-all duration-200 ${
                  active 
                    ? "text-primary bg-primary/10 scale-105" 
                    : "text-muted-foreground hover:text-foreground active:scale-95"
                }`}
                data-testid={`mobile-nav-${item.labelKey}`}
              >
                <Icon 
                  className={`w-5 h-5 mb-0.5 transition-transform ${
                    active ? "scale-110" : ""
                  }`} 
                  strokeWidth={active ? 2.5 : 2}
                />
                <span className={`text-[10px] font-medium leading-tight ${
                  active ? "font-semibold" : ""
                }`}>
                  {t(item.labelKey)}
                </span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
