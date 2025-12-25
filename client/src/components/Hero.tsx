import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "wouter";
import {
  TrendingUp,
  BookOpen,
  Video,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  Clock,
} from "lucide-react";

export function Hero() {
  const { isAuthenticated, setShowAuthPopup } = useAuth();
  const { t } = useLanguage();

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setShowAuthPopup(true);
    }
  };

  return (
    <section className="relative pt-32 pb-16 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="px-3 py-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                Free Stock Market Education
              </Badge>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                {t("hero.title")}
                <span className="text-primary block mt-2">{t("hero.subtitle")}</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                {t("hero.description")}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link href="/courses">
                    <Button size="lg" className="w-full sm:w-auto" data-testid="button-explore-courses">
                      {t("hero.cta.explore")}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    onClick={handleGetStarted}
                    data-testid="button-get-started"
                  >
                    {t("hero.cta.start")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
                <Link href="/live-market">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                    data-testid="button-live-market"
                  >
                    Live Market Data
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">50+</div>
                  <div className="text-xs text-muted-foreground">Ebooks</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Video className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">100+</div>
                  <div className="text-xs text-muted-foreground">Videos</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">10K+</div>
                  <div className="text-xs text-muted-foreground">Learners</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">5+</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-card rounded-lg border border-card-border p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Course Highlights</h3>
                <Badge variant="outline" className="text-emerald-600 border-emerald-600/30">
                  100% Free
                </Badge>
              </div>

              <div className="space-y-3">
                {[
                  "Complete Stock Market Basics",
                  "Technical Analysis & Chart Reading",
                  "Options & Futures Trading",
                  "Algo Trading Introduction",
                  "Live Market Practice Sessions",
                  "Risk Management Strategies",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Self-paced learning - Start anytime</span>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
