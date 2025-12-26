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

/* ✅ IPO COMPLETELY REMOVED FROM TOOLS */
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

  return (
    <motion.header
      className="fixed top-11 left-0 right-0 z-40 bg-white/95 dark:bg-background/95 backdrop-blur-md border-b border-slate-100 dark:border-border shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/">
            <img
              src={logoImage}
              alt="Rotech Shiksha"
              className="h-10 cursor-pointer"
            />
          </Link>

          <nav className="hidden lg:flex gap-1">
            {navItemsConfig.map((item) =>
              item.children ? (
                <DropdownMenu key={item.labelKey}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      {t(item.labelKey)}{" "}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link href={child.href}>{t(child.labelKey)}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost">{t(item.labelKey)}</Button>
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" onClick={toggleTheme}>
              {theme === "light" ? <Moon /> : <Sun />}
            </Button>

            {isAuthenticated ? (
              <Button variant="outline" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>
            ) : (
              <Button onClick={() => setShowAuthPopup(true)}>Login</Button>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button size="icon" variant="ghost">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                {navItemsConfig.map((item) =>
                  item.children ? (
                    <div key={item.labelKey}>
                      <p className="font-semibold mt-4">{t(item.labelKey)}</p>
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            {t(child.labelKey)}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link key={item.href} href={item.href}>
                      <Button variant="ghost" className="w-full justify-start">
                        {t(item.labelKey)}
                      </Button>
                    </Link>
                  ),
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
