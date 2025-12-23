import { useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { TrendingUp, Phone, Shield, BookOpen, Video, Calculator } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, setShowAuthPopup } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, setLocation]);

  const handleLogin = () => {
    setShowAuthPopup(true);
  };

  return (
    <div className="min-h-screen pt-12 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30">
          <svg viewBox="0 0 200 100" className="w-full h-full text-primary/10">
            <path
              d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="animate-pulse"
            />
            <path
              d="M0,60 Q25,40 50,60 T100,60 T150,60 T200,60"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.3"
              className="animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4">
        <Card className="backdrop-blur-sm bg-card/95">
          <CardContent className="pt-8 pb-8 space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Rotech Shiksha
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  Start learning stock market – Free
                </p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handleLogin}
              data-testid="button-continue-mobile"
            >
              <Phone className="w-5 h-5 mr-2" />
              Continue with Mobile Number
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                100% Free Learning | No Spam
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-center text-muted-foreground mb-4">
                What you'll get access to:
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-xs text-muted-foreground">50+ Ebooks</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="text-xs text-muted-foreground">100+ Videos</p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="text-xs text-muted-foreground">Calculators</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
