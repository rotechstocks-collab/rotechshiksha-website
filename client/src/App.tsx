import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { LiveTicker } from "@/components/LiveTicker";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { LiveChat } from "@/components/LiveChat";
import { WhatsAppButton } from "@/components/WhatsAppButton";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import LiveNews from "@/pages/LiveNews";
import CalculatorsPage from "@/pages/CalculatorsPage";
import PricingPage from "@/pages/PricingPage";
import Payment from "@/pages/Payment";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import StartupConnect from "@/pages/StartupConnect";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/courses" component={Courses} />
      <Route path="/courses/:level" component={Courses} />
      <Route path="/live-news" component={LiveNews} />
      <Route path="/calculators" component={CalculatorsPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/payment/:planId" component={Payment} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/login" component={Login} />
      <Route path="/startup-connect" component={StartupConnect} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background">
              <LiveTicker />
              <Header />
              <main className="pt-0">
                <Router />
              </main>
              <Footer />
              <AuthModal />
              <LiveChat />
              <WhatsAppButton />
            </div>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
