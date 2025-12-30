import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  Menu, 
  ChevronDown, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  LayoutDashboard,
  Globe,
  Palette,
  BookOpen,
  GraduationCap,
  Calculator,
  FileText,
  Newspaper,
  Calendar,
  Scale,
  CreditCard,
  LineChart,
  TrendingUp,
  BarChart3,
  Video
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { motion } from "framer-motion";
import logoImage from "@assets/generated_images/professional_rotech_shiksha_logo.png";

interface NavChild {
  labelKey: string;
  href: string;
  icon: typeof BookOpen;
  description?: string;
}

interface NavItem {
  labelKey: string;
  href?: string;
  children?: NavChild[];
}

const toolsNavItems: NavChild[] = [
  { labelKey: "nav.calculators", href: "/calculators", icon: Calculator, description: "SIP, CAGR, Brokerage" },
  { labelKey: "nav.educationalVideos", href: "/educational-videos", icon: Video, description: "Seekhne ke Videos" },
  { labelKey: "nav.paperTrade", href: "/paper-trade", icon: LineChart, description: "Practice Trading karo" },
  { labelKey: "nav.brokers", href: "/compare-brokers", icon: Scale, description: "Brokers ki Comparison" },
  { labelKey: "nav.economicCalendar", href: "/economic-calendar", icon: Calendar, description: "Market Events" },
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

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const isDropdownActive = (items: NavChild[]) => {
    return items.some(item => isActive(item.href));
  };

  const NavDropdown = ({ label, items, testId }: { label: string; items: NavChild[]; testId: string }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white ${isDropdownActive(items) ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : ""}`}
          data-testid={testId}
        >
          {label}
          <ChevronDown className="w-3.5 h-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href}>
                <span
                  className={`w-full cursor-pointer flex items-center gap-3 ${isActive(item.href) ? "text-primary font-medium" : ""}`}
                  data-testid={`nav-${item.labelKey}`}
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div>{t(item.labelKey)}</div>
                    {item.description && (
                      <div className="text-xs text-muted-foreground">{item.description}</div>
                    )}
                  </div>
                </span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const MobileNavSection = ({ title, items, onClose }: { title: string; items: NavChild[]; onClose: () => void }) => (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 py-2">{title}</p>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <button
              className={`w-full flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-md text-left transition-colors ${
                isActive(item.href)
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground hover:bg-accent/50"
              }`}
              onClick={onClose}
              data-testid={`mobile-nav-${item.labelKey}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{t(item.labelKey)}</span>
            </button>
          </Link>
        );
      })}
    </div>
  );

  return (
    <motion.header 
      className="fixed top-0 md:top-11 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/30 dark:border-slate-700/30 shadow-[0_2px_20px_rgba(0,0,0,0.03)]"
      style={{ 
        top: 'env(safe-area-inset-top, 0px)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <style>{`
        @media (min-width: 768px) {
          header { top: 38px !important; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8" style={{ paddingLeft: 'max(0.75rem, env(safe-area-inset-left))', paddingRight: 'max(0.75rem, env(safe-area-inset-right))' }}>
        <div className="flex items-center justify-between h-14 gap-2 sm:gap-3 flex-nowrap">
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
                className="h-8 sm:h-9 md:h-11 w-auto object-contain"
              />
            </motion.div>
          </Link>

          <nav className="hidden xl:flex items-center gap-0.5">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white ${isActive("/") && location === "/" ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : ""}`}
                data-testid="nav-home"
              >
                {t("nav.home")}
              </Button>
            </Link>
            
            <Link href="/courses">
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white ${isActive("/courses") ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : ""}`}
                data-testid="nav-courses"
              >
                {t("nav.courses")}
              </Button>
            </Link>
            
            <Link href="/beginner-course">
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white ${isActive("/beginner-course") || isActive("/level-1") ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : ""}`}
                data-testid="nav-learning-path"
              >
                {t("nav.learningPath") || "Learning Path"}
              </Button>
            </Link>
            
            <NavDropdown 
              label={t("nav.tools") || "Tools"} 
              items={toolsNavItems} 
              testId="nav-tools-dropdown"
            />
            
            <Link href="/blog">
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white ${isActive("/blog") ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : ""}`}
                data-testid="nav-blog"
              >
                {t("nav.blog")}
              </Button>
            </Link>
            
            <Link href="/live-news">
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white ${isActive("/live-news") || isActive("/market-news") ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : ""}`}
                data-testid="nav-news"
              >
                {t("nav.news") || "News"}
              </Button>
            </Link>
            
            <Link href="/pricing">
              <Button
                variant="ghost"
                size="sm"
                className={`text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white ${isActive("/pricing") ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white" : ""}`}
                data-testid="nav-pricing"
              >
                {t("nav.pricing")}
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 flex-nowrap">
            <div className="hidden lg:block">
              <LanguageSelector />
            </div>
            
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="hidden lg:flex h-9 w-9"
            >
              {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 px-2 sm:px-3 h-9 flex-shrink-0" data-testid="button-user-menu">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline text-xs">{user?.fullName?.split(" ")[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
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
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} data-testid="button-logout">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button 
                onClick={handleLoginClick} 
                className="flex-shrink-0 flex items-center gap-1 h-8 px-2.5 sm:px-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-600/50 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                data-testid="button-login"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{t("nav.login")}</span>
              </button>
            )}

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="xl:hidden">
                <Button size="icon" variant="ghost" data-testid="button-mobile-menu">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0 overflow-y-auto">
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col min-h-full">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <img 
                      src={logoImage} 
                      alt="Rotech Shiksha" 
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                  
                  <div className="flex-1 p-3 space-y-5 overflow-y-auto">
                    <Link href="/">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-md text-left transition-colors ${
                          location === "/"
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-accent/50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="mobile-nav-home"
                      >
                        <span className="text-sm font-medium">{t("nav.home")}</span>
                      </button>
                    </Link>
                    
                    <Link href="/courses">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-md text-left transition-colors ${
                          isActive("/courses")
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-accent/50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="mobile-nav-courses"
                      >
                        <GraduationCap className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{t("nav.courses")}</span>
                      </button>
                    </Link>
                    
                    <Link href="/beginner-course">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-md text-left transition-colors ${
                          isActive("/beginner-course") || isActive("/level-1")
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-accent/50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="mobile-nav-learning-path"
                      >
                        <BookOpen className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{t("nav.learningPath") || "Learning Path"}</span>
                      </button>
                    </Link>
                    
                    <MobileNavSection 
                      title={t("nav.tools") || "Tools"} 
                      items={toolsNavItems} 
                      onClose={() => setMobileMenuOpen(false)} 
                    />
                    
                    <Link href="/blog">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-md text-left transition-colors ${
                          isActive("/blog")
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-accent/50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="mobile-nav-blog"
                      >
                        <FileText className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{t("nav.blog")}</span>
                      </button>
                    </Link>
                    
                    <Link href="/live-news">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-md text-left transition-colors ${
                          isActive("/live-news") || isActive("/market-news")
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-accent/50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="mobile-nav-news"
                      >
                        <Newspaper className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{t("nav.news") || "News"}</span>
                      </button>
                    </Link>
                    
                    <Link href="/pricing">
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-md text-left transition-colors ${
                          isActive("/pricing")
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-foreground hover:bg-accent/50"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid="mobile-nav-pricing"
                      >
                        <span className="text-sm font-medium">{t("nav.pricing")}</span>
                      </button>
                    </Link>
                    
                    <div className="pt-4 border-t border-border space-y-3">
                      <div className="flex items-center justify-between px-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Globe className="w-4 h-4" />
                          <span>{t("nav.language") || "Language"}</span>
                        </div>
                        <LanguageSelector />
                      </div>
                      
                      <div className="flex items-center justify-between px-3">
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
                  </div>
                  
                  <div className="border-t border-border p-4 bg-muted/30">
                    {isAuthenticated ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 py-2">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
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
