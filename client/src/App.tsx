import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense } from "react";
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
import { AnimatePresence, motion } from "framer-motion";

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

function AnimatedRoutes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.12, ease: "easeInOut" }}
      >
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
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
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
                  <MarketTicker />
                  <div className="min-h-screen bg-background safe-area-top overflow-x-hidden relative">
                    <Header />
                    <GlobalStoryStrip />
                    <main className="pt-14 md:pt-[102px] pb-20 md:pb-0 relative z-0">
                      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <AnimatedRoutes />
                      </div>
                    </main>
                    <Footer />
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
