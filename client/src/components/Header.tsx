import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
  MoreVertical,
  Globe,
  Palette,
  Wrench
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

const primaryNavItems: NavItem[] = [
  { labelKey: "nav.home", href: "/" },
  { labelKey: "nav.courses", href: "/courses" },
  { labelKey: "nav.calculators", href: "/calculators" },
  { labelKey: "nav.blog", href: "/blog" },
  { labelKey: "nav.faq", href: "/faq" },
];

const toolsNavItems: NavItem[] = [
  { labelKey: "nav.liveBusinessNews", href: "/live-news" },
  { labelKey: "nav.economicCalendar", href: "/economic-calendar" },
  { labelKey: "nav.brokers", href: "/compare-brokers" },
  { labelKey: "nav.loansAndCreditCards", href: "/loans-credit-cards" },
  { labelKey: "nav.paperTrade", href: "/paper-trade" },
];

const moreNavItems: NavItem[] = [
  { labelKey: "nav.pricing", href: "/pricing" },
  { labelKey: "nav.lessons", href: "/beginner-course" },
  { labelKey: "nav.learningLevels", href: "/level-1" },
  { labelKey: "nav.educationalVideos", href: "/educational-videos" },
];

export function Header() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout, setShowAuthPopup } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(5);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 380) {
        setVisibleItems(2);
      } else if (width < 480) {
        setVisibleItems(3);
      } else if (width < 640) {
        setVisibleItems(4);
      } else {
        setVisibleItems(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoginClick = () => {
    setShowAuthPopup(true);
  };

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const mobileVisibleItems = primaryNavItems.slice(0, visibleItems);
  const mobileOverflowItems = [...primaryNavItems.slice(visibleItems), ...toolsNavItems, ...moreNavItems];

  return (
    <motion.header 
      className="fixed top-0 md:top-11 left-0 right-0 z-40 bg-white/95 dark:bg-background/95 backdrop-blur-md border-b border-slate-100 dark:border-border shadow-sm"
      style={{ 
        top: 'env(safe-area-inset-top, 0px)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <style>{`
        @media (min-width: 768px) {
          header { top: 44px !important; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8" style={{ paddingLeft: 'max(0.5rem, env(safe-area-inset-left))', paddingRight: 'max(0.5rem, env(safe-area-inset-right))' }}>
        <div className="flex items-center justify-between h-14 md:h-16 gap-2">
          <Link href="/">
            <motion.div
              className="flex items-center cursor-pointer flex-shrink-0"
              data-testid="link-logo"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img 
                src={logoImage} 
                alt="Rotech Shiksha Logo" 
                className="h-7 sm:h-8 md:h-12 w-auto object-contain"
              />
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {primaryNavItems.map((item) =>
              item.children ? (
                <DropdownMenu key={item.labelKey}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`gap-1 ${isActive(item.href) ? "bg-accent" : ""}`}
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
                    className={isActive(item.href) ? "bg-accent" : ""}
                    data-testid={`nav-${item.labelKey}`}
                  >
                    {t(item.labelKey)}
                  </Button>
                </Link>
              )
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1" data-testid="nav-tools-desktop">
                  <Wrench className="w-4 h-4" />
                  {t("nav.tools") || "Tools"}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {toolsNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>
                      <span className="w-full cursor-pointer" data-testid={`nav-${item.labelKey}`}>
                        {t(item.labelKey)}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {moreNavItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-1" data-testid="nav-more-desktop">
                    {t("nav.more") || "More"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {moreNavItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>
                        <span className="w-full cursor-pointer" data-testid={`nav-${item.labelKey}`}>
                          {t(item.labelKey)}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          <nav 
            ref={navRef}
            className="flex lg:hidden items-center gap-0.5 flex-1 justify-center overflow-x-auto scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {mobileVisibleItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  className={`px-2 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap rounded-md transition-colors ${
                    isActive(item.href) 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                  data-testid={`mobile-nav-${item.labelKey}`}
                >
                  {t(item.labelKey)}
                </button>
              </Link>
            ))}
            
            {mobileOverflowItems.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="px-2 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md flex items-center gap-0.5"
                    data-testid="mobile-nav-more"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[160px]">
                  {mobileOverflowItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>
                        <span 
                          className={`w-full cursor-pointer ${isActive(item.href) ? "text-primary font-medium" : ""}`}
                          data-testid={`mobile-nav-more-${item.labelKey}`}
                        >
                          {t(item.labelKey)}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
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
                <Button size="icon" variant="ghost" data-testid="button-mobile-menu" className="h-9 w-9">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Settings Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <img 
                      src={logoImage} 
                      alt="Rotech Shiksha" 
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  
                  <div className="flex-1 p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        <span>{t("nav.language") || "Language"}</span>
                      </div>
                      <LanguageSelector />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Palette className="w-4 h-4" />
                        <span>{t("nav.theme") || "Theme"}</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={toggleTheme}
                        className="gap-2"
                        data-testid="mobile-theme-toggle"
                      >
                        {theme === "light" ? (
                          <>
                            <Moon className="w-4 h-4" />
                            <span className="text-xs">Dark</span>
                          </>
                        ) : (
                          <>
                            <Sun className="w-4 h-4" />
                            <span className="text-xs">Light</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t border-border p-4 bg-muted/30">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 py-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{user?.fullName}</p>
                            <p className="text-xs text-muted-foreground">{user?.mobile}</p>
                          </div>
                        </div>
                        <Link href="/dashboard">
                          <Button 
                            variant="outline" 
                            className="w-full justify-start gap-2"
                            onClick={() => setMobileMenuOpen(false)}
                            data-testid="mobile-dashboard"
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            {t("nav.dashboard")}
                          </Button>
                        </Link>
                        {user?.isAdmin && (
                          <Link href="/admin">
                            <Button 
                              variant="outline" 
                              className="w-full justify-start gap-2 mt-2"
                              onClick={() => setMobileMenuOpen(false)}
                              data-testid="mobile-admin"
                            >
                              <User className="w-4 h-4" />
                              {t("nav.adminPanel")}
                            </Button>
                          </Link>
                        )}
                        <Button 
                          variant="destructive" 
                          className="w-full justify-start gap-2 mt-2"
                          onClick={() => { logout(); setMobileMenuOpen(false); }}
                          data-testid="mobile-logout"
                        >
                          <LogOut className="w-4 h-4" />
                          {t("nav.logout")}
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        className="w-full gap-2"
                        onClick={() => { handleLoginClick(); setMobileMenuOpen(false); }}
                        data-testid="mobile-login"
                      >
                        <User className="w-4 h-4" />
                        {t("nav.login")}
                      </Button>
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
