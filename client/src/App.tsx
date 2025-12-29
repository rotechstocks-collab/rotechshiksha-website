import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense, useEffect, useCallback } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { LessonLanguageProvider } from "@/context/LessonLanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlobalStoryStrip } from "@/components/characters/GlobalStoryStrip";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { AuthModal } from "@/components/AuthModal";
import { LiveChat } from "@/components/LiveChat";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { HreflangTags } from "@/components/HreflangTags";
import { MarketTicker } from "@/components/market/MarketTicker";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageLoadingSkeleton } from "@/components/LoadingSkeleton";
import { ScrollToTop } from "@/components/ScrollToTop";

import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

const About = lazy(() => import("@/pages/About"));
const Courses = lazy(() => import("@/pages/Courses"));
const CalculatorHub = lazy(() => import("@/pages/CalculatorHub"));
const GenericCalculator = lazy(() => import("@/pages/GenericCalculator"));
const BrokerageCalculatorPage = lazy(() => import("@/pages/BrokerageCalculatorPage"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const Payment = lazy(() => import("@/pages/Payment"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Admin = lazy(() => import("@/pages/Admin"));
const Login = lazy(() => import("@/pages/Login"));
const BrokerComparison = lazy(() => import("@/pages/BrokerComparison"));
const EconomicCalendar = lazy(() => import("@/pages/EconomicCalendar"));
const PaperTrade = lazy(() => import("@/pages/PaperTrade"));
const EducationalVideos = lazy(() => import("@/pages/EducationalVideos"));
const LoansAndCreditCards = lazy(() => import("@/pages/LoansAndCreditCards"));
const LiveMarket = lazy(() => import("@/pages/LiveMarket"));
const Level1Lesson = lazy(() => import("@/pages/lessons/Level1Lesson"));
const Level2Lesson = lazy(() => import("@/pages/lessons/Level2Lesson"));
const Level3Lesson = lazy(() => import("@/pages/lessons/Level3Lesson"));
const Level4Lesson = lazy(() => import("@/pages/lessons/Level4Lesson"));
const Level5Lesson = lazy(() => import("@/pages/lessons/Level5Lesson"));
const Level6Lesson = lazy(() => import("@/pages/lessons/Level6Lesson"));
const Level7Lesson = lazy(() => import("@/pages/lessons/Level7Lesson"));
const Level8Lesson = lazy(() => import("@/pages/lessons/Level8Lesson"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const BeginnerCourse = lazy(() => import("@/pages/BeginnerCourse"));
const BeginnerLesson = lazy(() => import("@/pages/BeginnerLesson"));
const Level1Course = lazy(() => import("@/pages/Level1Course"));
const MarketNews = lazy(() => import("@/pages/MarketNews"));
const LiveNews = lazy(() => import("@/pages/LiveNews"));
const Learn = lazy(() => import("@/pages/Learn"));

function Router() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/courses" component={Courses} />
        <Route path="/courses/:level" component={Courses} />
        <Route path="/learn" component={Learn} />
        <Route path="/learning-path" component={Learn} />
        <Route path="/learn/level-1" component={Level1Lesson} />
        <Route path="/learn/level-2" component={Level2Lesson} />
        <Route path="/learn/level-3" component={Level3Lesson} />
        <Route path="/learn/level-4" component={Level4Lesson} />
        <Route path="/learn/level-5" component={Level5Lesson} />
        <Route path="/learn/level-6" component={Level6Lesson} />
        <Route path="/learn/level-7" component={Level7Lesson} />
        <Route path="/learn/level-8" component={Level8Lesson} />
        <Route path="/compare-brokers" component={BrokerComparison} />
        <Route path="/economic-calendar" component={EconomicCalendar} />
        <Route path="/paper-trade" component={PaperTrade} />
        <Route path="/videos" component={EducationalVideos} />
        <Route path="/educational-videos" component={EducationalVideos} />
        <Route path="/loans-credit-cards" component={LoansAndCreditCards} />
        <Route path="/live-market" component={LiveMarket} />
        <Route path="/calculators" component={CalculatorHub} />
        <Route path="/calculators/brokerage" component={BrokerageCalculatorPage} />
        <Route path="/calculators/:id" component={GenericCalculator} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/payment/:planId" component={Payment} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/faq" component={FAQ} />
        <Route path="/beginner-course" component={BeginnerCourse} />
        <Route path="/beginner-course/:slug" component={BeginnerLesson} />
        <Route path="/level-1" component={Level1Course} />
        <Route path="/market-news" component={MarketNews} />
        <Route path="/live-news" component={LiveNews} />
        <Route path="/:rest*" component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [location] = useLocation();

  // Debug scroll state
  const debugScrollState = useCallback(() => {
    const b = document.body;
    const h = document.documentElement;
    const root = document.getElementById("root");
    const header = document.getElementById("app-header");

    console.log("=== SCROLL DEBUG ===");
    console.log("body overflow:", getComputedStyle(b).overflow);
    console.log("html overflow:", getComputedStyle(h).overflow);
    console.log("root overflow:", root ? getComputedStyle(root).overflow : "no root");
    console.log("header found:", !!header, header?.getBoundingClientRect().height);
    console.log("active portals:", document.querySelectorAll("[data-radix-portal]").length);
    console.log("====================");
  }, []);

  // Hard reset overflow on all containers
  const hardResetOverflow = useCallback(() => {
    const nodes = [document.body, document.documentElement, document.getElementById("root")].filter(Boolean) as HTMLElement[];

    nodes.forEach((el) => {
      el.style.overflow = "";
      el.style.overflowY = "";
      el.style.height = "";
      el.style.minHeight = "";
      el.style.position = "";
      el.style.top = "";
      el.style.width = "";
      el.style.paddingRight = "";
      el.removeAttribute("data-scroll-locked");
    });

    // Clean stale Radix portal nodes
    document.querySelectorAll("[data-radix-portal]").forEach((node) => {
      if (!node.querySelector("[role='dialog'],[data-state='open'],[data-state='delayed-open']")) {
        node.remove();
      }
    });
  }, []);

  // Real-time header height tracker
  const setHeaderOffset = useCallback(() => {
    const header = document.getElementById("app-header");
    if (!header) {
      console.warn("app-header NOT FOUND");
      return;
    }
    const height = Math.ceil(header.getBoundingClientRect().height);
    if (height > 0) {
      document.documentElement.style.setProperty("--app-header-offset", `${height}px`);
      console.log("header offset set:", height);
    }
  }, []);

  // Force scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // ResizeObserver + VisualViewport for robust header offset at all zoom levels
  useEffect(() => {
    // Retry until we get a valid height (content might load async)
    let retryCount = 0;
    const maxRetries = 10;
    
    const trySetOffset = () => {
      const header = document.getElementById("app-header");
      if (!header) return false;
      const height = Math.ceil(header.getBoundingClientRect().height);
      if (height > 0) {
        document.documentElement.style.setProperty("--app-header-offset", `${height}px`);
        console.log("header offset set:", height);
        return true;
      }
      return false;
    };

    // Immediate try
    if (!trySetOffset()) {
      // Retry with increasing delays
      const retryInterval = setInterval(() => {
        retryCount++;
        if (trySetOffset() || retryCount >= maxRetries) {
          clearInterval(retryInterval);
        }
      }, 100);
      
      // Cleanup interval on unmount
      setTimeout(() => clearInterval(retryInterval), 2000);
    }

    const header = document.getElementById("app-header");
    if (!header) return;

    const ro = new ResizeObserver(() => setHeaderOffset());
    ro.observe(header);

    const vv = window.visualViewport;
    const onVV = () => setHeaderOffset();

    vv?.addEventListener("resize", onVV);
    vv?.addEventListener("scroll", onVV);

    window.addEventListener("resize", setHeaderOffset);
    window.addEventListener("load", setHeaderOffset);

    // Additional delayed measurements
    const t1 = setTimeout(setHeaderOffset, 100);
    const t2 = setTimeout(setHeaderOffset, 300);
    const t3 = setTimeout(setHeaderOffset, 500);
    const t4 = setTimeout(setHeaderOffset, 1000);

    return () => {
      ro.disconnect();
      vv?.removeEventListener("resize", onVV);
      vv?.removeEventListener("scroll", onVV);
      window.removeEventListener("resize", setHeaderOffset);
      window.removeEventListener("load", setHeaderOffset);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [location, setHeaderOffset]);

  // Unconditional hard reset on every route change
  useEffect(() => {
    const t = setTimeout(() => {
      hardResetOverflow();
      debugScrollState();
    }, 0);
    return () => clearTimeout(t);
  }, [location, hardResetOverflow, debugScrollState]);

  // Global event listeners for scroll recovery
  useEffect(() => {
    hardResetOverflow();

    const onVisibility = () => {
      if (document.visibilityState === "visible") hardResetOverflow();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") hardResetOverflow();
    };

    window.addEventListener("focus", hardResetOverflow);
    window.addEventListener("resize", hardResetOverflow);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("keydown", onKeyDown);

    // MutationObserver to catch any scroll-lock that gets stuck
    const observer = new MutationObserver(() => {
      const bodyOverflow = getComputedStyle(document.body).overflow;
      const hasScrollLock =
        bodyOverflow === "hidden" ||
        document.body.hasAttribute("data-scroll-locked") ||
        document.documentElement.hasAttribute("data-scroll-locked");

      if (hasScrollLock) requestAnimationFrame(hardResetOverflow);
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["style", "data-scroll-locked"] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "data-scroll-locked"] });

    return () => {
      observer.disconnect();
      window.removeEventListener("focus", hardResetOverflow);
      window.removeEventListener("resize", hardResetOverflow);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [hardResetOverflow]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LanguageProvider>
            <LessonLanguageProvider>
              <AuthProvider>
                <TooltipProvider>
                  <ScrollToTop />
                  <HreflangTags />
                  <div id="app-header" className="fixed top-0 left-0 right-0 z-50">
                    <MarketTicker />
                    <Header />
                  </div>
                  <div className="min-h-[100svh] bg-background safe-area-top overflow-x-hidden relative">
                    <GlobalStoryStrip />
                    <main className="pt-[var(--app-header-offset)] min-h-[100dvh] relative z-10 overflow-visible">
                      <div className="w-full">
                        <Router />
                      </div>
                    </main>
                    <Footer />
                    <div className="h-20 md:hidden" aria-hidden="true" />
                    <MobileBottomNav />
                    <div className="safe-area-bottom" />
                    <AuthModal />
                    <LiveChat />
                    <WhatsAppButton />
                  </div>
                  <Toaster />
                </TooltipProvider>
              </AuthProvider>
            </LessonLanguageProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
