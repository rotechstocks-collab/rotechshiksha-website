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
import logoImage from "@assets/generated_images/professional_rotech_shiksha_logo.png";

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
      { labelKey: "nav.liveNews", href: "/live-news" },
      { labelKey: "nav.educationalVideos", href: "/educational-videos" },
      { labelKey: "nav.calculators", href: "/calculators" },
      { labelKey: "nav.brokers", href: "/compare-brokers" },
      { labelKey: "nav.ipo", href: "/ipo" },
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
      style={{ top: 'calc(44px + env(safe-area-inset-top, 0px))' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8" style={{ paddingLeft: 'max(1rem, env(safe-area-inset-left))', paddingRight: 'max(1rem, env(safe-area-inset-right))' }}>
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/">
            <motion.div
              className="flex items-center cursor-pointer"
              data-testid="link-logo"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={logoImage} 
                alt="Rotech Shiksha Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
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
              data-testid="button-theme-toggle"
              className="hidden lg:flex"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <div className="hidden lg:block">
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
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button size="icon" variant="ghost" data-testid="button-mobile-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 border-b border-border mb-4">
                    <img 
                      src={logoImage} 
                      alt="Rotech Shiksha" 
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  
                  <nav className="flex flex-col gap-1 flex-1">
                    {navItemsConfig.map((item, index) =>
                      item.children ? (
                        <motion.div 
                          key={item.labelKey} 
                          className="space-y-1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <span className="px-4 py-3 text-sm font-semibold text-muted-foreground block">
                            {t(item.labelKey)}
                          </span>
                          {item.children.map((child) => (
                            <Link key={child.href} href={child.href}>
                              <Button
                                variant="ghost"
                                className="w-full justify-start pl-8 min-h-[44px] text-base"
                                onClick={() => setMobileMenuOpen(false)}
                                data-testid={`mobile-nav-${child.labelKey}`}
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
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link href={item.href}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start min-h-[44px] text-base"
                              onClick={() => setMobileMenuOpen(false)}
                              data-testid={`mobile-nav-${item.labelKey}`}
                            >
                              {t(item.labelKey)}
                            </Button>
                          </Link>
                        </motion.div>
                      )
                    )}
                  </nav>
                  
                  <div className="border-t border-border pt-4 mt-4 space-y-3">
                    <div className="flex items-center justify-between px-4">
                      <span className="text-sm text-muted-foreground">{t("nav.language") || "Language"}</span>
                      <LanguageSelector />
                    </div>
                    
                    <div className="flex items-center justify-between px-4">
                      <span className="text-sm text-muted-foreground">{t("nav.theme") || "Theme"}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={toggleTheme}
                        data-testid="mobile-theme-toggle"
                      >
                        {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                      </Button>
                    </div>
                    
                    {isAuthenticated ? (
                      <div className="px-4 space-y-2">
                        <div className="flex items-center gap-2 py-2">
                          <User className="w-5 h-5 text-muted-foreground" />
                          <span className="text-sm font-medium">{user?.fullName}</span>
                        </div>
                        <Link href="/dashboard">
                          <Button 
                            variant="outline" 
                            className="w-full min-h-[44px]"
                            onClick={() => setMobileMenuOpen(false)}
                            data-testid="mobile-dashboard"
                          >
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            {t("nav.dashboard")}
                          </Button>
                        </Link>
                        {user?.isAdmin && (
                          <Link href="/admin">
                            <Button 
                              variant="outline" 
                              className="w-full min-h-[44px]"
                              onClick={() => setMobileMenuOpen(false)}
                              data-testid="mobile-admin"
                            >
                              <User className="w-4 h-4 mr-2" />
                              {t("nav.adminPanel")}
                            </Button>
                          </Link>
                        )}
                        <Button 
                          variant="destructive" 
                          className="w-full min-h-[44px]"
                          onClick={() => { logout(); setMobileMenuOpen(false); }}
                          data-testid="mobile-logout"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          {t("nav.logout")}
                        </Button>
                      </div>
                    ) : (
                      <div className="px-4">
                        <Button 
                          className="w-full min-h-[44px]"
                          onClick={() => { handleLoginClick(); setMobileMenuOpen(false); }}
                          data-testid="mobile-login"
                        >
                          {t("nav.login")}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
