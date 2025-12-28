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
import { StockSearch } from "./StockSearch";
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
          className={`gap-1 font-medium ${isDropdownActive(items) ? "bg-accent text-accent-foreground" : ""}`}
          data-testid={testId}
        >
          {label}
          <ChevronDown className="w-4 h-4" />
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
      className="fixed top-0 md:top-11 left-0 right-0 z-40 bg-white/95 dark:bg-background/95 backdrop-blur-md border-b border-slate-100 dark:border-border"
      style={{ 
        top: 'env(safe-area-inset-top, 0px)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <style>{`
        @media (min-width: 768px) {
          header { top: 38px !important; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8" style={{ paddingLeft: 'max(0.75rem, env(safe-area-inset-left))', paddingRight: 'max(0.75rem, env(safe-area-inset-right))' }}>
        <div className="flex items-center justify-between h-14 md:h-16 gap-4">
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

          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/">
              <Button
                variant="ghost"
                className={`font-medium ${isActive("/") && location === "/" ? "bg-accent text-accent-foreground" : ""}`}
                data-testid="nav-home"
              >
                {t("nav.home")}
              </Button>
            </Link>
            
            <Link href="/courses">
              <Button
                variant="ghost"
                className={`font-medium ${isActive("/courses") ? "bg-accent text-accent-foreground" : ""}`}
                data-testid="nav-courses"
              >
                {t("nav.courses")}
              </Button>
            </Link>
            
            <Link href="/beginner-course">
              <Button
                variant="ghost"
                className={`font-medium ${isActive("/beginner-course") || isActive("/level-1") ? "bg-accent text-accent-foreground" : ""}`}
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
                className={`font-medium ${isActive("/blog") ? "bg-accent text-accent-foreground" : ""}`}
                data-testid="nav-blog"
              >
                {t("nav.blog")}
              </Button>
            </Link>
            
            <Link href="/live-news">
              <Button
                variant="ghost"
                className={`font-medium ${isActive("/live-news") || isActive("/market-news") ? "bg-accent text-accent-foreground" : ""}`}
                data-testid="nav-news"
              >
                {t("nav.news") || "News"}
              </Button>
            </Link>
            
            <Link href="/pricing">
              <Button
                variant="ghost"
                className={`font-medium ${isActive("/pricing") ? "bg-accent text-accent-foreground" : ""}`}
                data-testid="nav-pricing"
              >
                {t("nav.pricing")}
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden xl:block w-52">
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
                      <span className="hidden xl:inline">{user?.fullName?.split(" ")[0]}</span>
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
                <Button onClick={handleLoginClick} data-testid="button-login">
                  {t("nav.login")}
                </Button>
              )}
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button size="icon" variant="ghost" data-testid="button-mobile-menu" className="h-10 w-10">
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
