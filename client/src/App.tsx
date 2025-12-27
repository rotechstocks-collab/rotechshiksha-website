import { Switch, Route } from "wouter";
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
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { AuthModal } from "@/components/AuthModal";
import { LiveChat } from "@/components/LiveChat";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { HreflangTags } from "@/components/HreflangTags";
import { LiveTicker } from "@/components/LiveTicker";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import CalculatorHub from "@/pages/CalculatorHub";
import GenericCalculator from "@/pages/GenericCalculator";
import BrokerageCalculatorPage from "@/pages/BrokerageCalculatorPage";
import PricingPage from "@/pages/PricingPage";
import Payment from "@/pages/Payment";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import BrokerComparison from "@/pages/BrokerComparison";
import EconomicCalendar from "@/pages/EconomicCalendar";
import PaperTrade from "@/pages/PaperTrade";
import EducationalVideos from "@/pages/EducationalVideos";
import LoansAndCreditCards from "@/pages/LoansAndCreditCards";
import Level1Lesson from "@/pages/lessons/Level1Lesson";
import Level2Lesson from "@/pages/lessons/Level2Lesson";
import Level3Lesson from "@/pages/lessons/Level3Lesson";
import Level4Lesson from "@/pages/lessons/Level4Lesson";
import Level5Lesson from "@/pages/lessons/Level5Lesson";
import Level6Lesson from "@/pages/lessons/Level6Lesson";
import Level7Lesson from "@/pages/lessons/Level7Lesson";
import Level8Lesson from "@/pages/lessons/Level8Lesson";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import FAQ from "@/pages/FAQ";
import BeginnerCourse from "@/pages/BeginnerCourse";
import BeginnerLesson from "@/pages/BeginnerLesson";
import Level1Course from "@/pages/Level1Course";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:level" component={Courses} />
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
      <Route path="/educational-videos" component={EducationalVideos} />
      <Route path="/loans-credit-cards" component={LoansAndCreditCards} />
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <LessonLanguageProvider>
            <AuthProvider>
            <TooltipProvider>
              <HreflangTags />
              <div className="hidden md:block">
                <LiveTicker />
              </div>
              <div className="min-h-screen bg-background md:pt-11 safe-area-top">
                <div className="hidden md:block">
                  <Header />
                </div>
                <main className="pt-0">
                  <Router />
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
  );
}

export default App;
