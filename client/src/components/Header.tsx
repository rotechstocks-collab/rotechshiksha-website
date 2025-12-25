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
import { Menu, ChevronDown, Sun, Moon, User, LogOut, LayoutDashboard } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { StockSearch } from "./StockSearch";
import { LanguageSelector } from "./LanguageSelector";
import { motion } from "framer-motion";
import logoIcon from "@assets/generated_images/rotech_shiksha_stock_education_icon.png";

interface NavItem {
  labelKey: string;
  href: string;
  children?: { labelKey: string; href: string }[];
}

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
      { labelKey: "nav.calculators", href: "/calculators" },
      { labelKey: "nav.brokers", href: "/compare-brokers" },
      { labelKey: "nav.ipo", href: "/ipo" },
      { labelKey: "nav.economicCalendar", href: "/economic-calendar" },
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              data-testid="link-logo"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={logoIcon} 
                alt="Rotech Shiksha Logo" 
                className="w-10 h-10 rounded-lg object-contain"
              />
              <div className="hidden sm:flex flex-col leading-tight">
                <span className="text-lg font-bold text-[#1a365d] dark:text-blue-400 tracking-tight">
                  ROTECH
                </span>
                <span className="text-xs font-semibold text-[#22c55e] dark:text-emerald-400 -mt-0.5">
                  SHIKSHA
                </span>
              </div>
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItemsConfig.map((item) =>
              item.children ? (
                <DropdownMenu key={item.labelKey}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`gap-1 ${location.startsWith(item.href) ? "bg-accent" : ""}`}
                      data-testid={`nav-${item.labelKey}`}
                    >
                      {t(item.labelKey)}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild>
                        <Link href={child.href}>
                          <span
                            className="w-full cursor-pointer"
                            data-testid={`nav-${child.labelKey}`}
                          >
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
                    data-testid={`nav-${item.labelKey}`}
                  >
                    {t(item.labelKey)}
                  </Button>
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:block w-56">
              <StockSearch variant="compact" />
            </div>
            
            <LanguageSelector />
            
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2" data-testid="button-user-menu">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user?.fullName?.split(" ")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <span className="flex items-center gap-2 cursor-pointer w-full" data-testid="link-dashboard">
                        <LayoutDashboard className="w-4 h-4" />
                        {t("nav.dashboard")}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  {user?.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <span className="flex items-center gap-2 cursor-pointer w-full" data-testid="link-admin">
                          <User className="w-4 h-4" />
                          {t("nav.adminPanel")}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout} data-testid="button-logout">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={handleLoginClick} data-testid="button-login">
                {t("nav.login")}
              </Button>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button size="icon" variant="ghost" data-testid="button-mobile-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <nav className="flex flex-col gap-2 mt-8">
                  {navItemsConfig.map((item, index) =>
                    item.children ? (
                      <motion.div 
                        key={item.labelKey} 
                        className="space-y-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="px-4 py-2 text-sm font-semibold text-muted-foreground">
                          {t(item.labelKey)}
                        </span>
                        {item.children.map((child) => (
                          <Link key={child.href} href={child.href}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start pl-8"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {t(child.labelKey)}
                            </Button>
                          </Link>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link href={item.href}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {t(item.labelKey)}
                          </Button>
                        </Link>
                      </motion.div>
                    )
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
