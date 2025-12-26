import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  ChevronDown,
  Sun,
  Moon,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { StockSearch } from "./StockSearch";
import { LanguageSelector } from "./LanguageSelector";
import { motion } from "framer-motion";
import logoImage from "@assets/generated_images/professional_rotech_shiksha_logo.png";

interface NavItem {
  labelKey: string;
  href: string;
  children?: { labelKey: string; href: string }[];
}

/* ======================
   IPO REMOVED FROM HERE
   ====================== */
const navItemsConfig: NavItem[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.about", href: "/about" },
  {
    labelKey: "nav.courses",
    href: "/courses",
    children: [
      { labelKey: "nav.courses.basic", href: "/courses/basic" },
      { labelKey: "nav.courses.intermediate", href: "/courses/intermediate" },
      { labelKey: "nav.courses.advanced", href: "/courses/advanced" },
      { labelKey: "nav.courses.algo", href: "/courses/algo" },
    ],
  },
  {
    labelKey: "nav.tools",
    href: "/tools",
    children: [
      { labelKey: "nav.liveNews", href: "/live-news" },
      { labelKey: "nav.educationalVideos", href: "/educational-videos" },
      { labelKey: "nav.calculators", href: "/calculators" },
      { labelKey: "nav.brokers", href: "/compare-brokers" },
      // ❌ IPO REMOVED ONLY
      { labelKey: "nav.economicCalendar", href: "/economic-calendar" },
      { labelKey: "nav.paperTrade", href: "/paper-trade" },
      { labelKey: "nav.loansAndCreditCards", href: "/loans-credit-cards" },
    ],
  },
  { labelKey: "nav.pricing", href: "/pricing" },
];

export function Header() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout, setShowAuthPopup } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLoginClick = () => {
    setShowAuthPopup(true);
  };

  return (
    <motion.header
      className="fixed top-11 left-0 right-0 z-40 bg-white/95 dark:bg-background/95 backdrop-blur-md border-b border-slate-100 dark:border-border shadow-sm"
      style={{ top: "calc(44px + env(safe-area-inset-top, 0px))" }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/">
            <motion.div
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={logoImage}
                alt="Rotech Shiksha Logo"
                className="h-10 sm:h-12 w-auto"
              />
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItemsConfig.map((item) =>
              item.children ? (
                <DropdownMenu key={item.labelKey}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`gap-1 ${
                        location.startsWith(item.href) ? "bg-accent" : ""
                      }`}
                    >
                      {t(item.labelKey)}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link href={child.href}>
                          <span className="w-full cursor-pointer">
                            {t(child.labelKey)}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={location === item.href ? "bg-accent" : ""}
                  >
                    {t(item.labelKey)}
                  </Button>
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block w-56">
              <StockSearch variant="compact" />
            </div>
            <div className="hidden lg:block">
              <LanguageSelector />
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              className="hidden lg:flex"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </Button>

            {isAuthenticated ? (
              <Button onClick={logout} variant="outline">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button onClick={handleLoginClick}>Login</Button>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button size="icon" variant="ghost">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <nav className="flex flex-col gap-2 mt-6">
                  {navItemsConfig.map((item) =>
                    item.children ? (
                      item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {t(child.labelKey)}
                          </Button>
                        </Link>
                      ))
                    ) : (
                      <Link key={item.href} href={item.href}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {t(item.labelKey)}
                        </Button>
                      </Link>
                    ),
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
