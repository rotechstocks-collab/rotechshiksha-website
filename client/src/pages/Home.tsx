import { Hero } from "@/components/Hero";
import { CourseCards } from "@/components/CourseCards";
import { PricingPlans } from "@/components/PricingPlans";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "wouter";
import {
  Shield,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  BookOpen,
  Video,
  Calculator,
  ChartBar,
} from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Comprehensive Ebooks",
    description: "50+ ebooks covering basics to advanced trading strategies",
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: "Video Tutorials",
    description: "100+ video lessons with practical examples and case studies",
  },
  {
    icon: <Calculator className="w-6 h-6" />,
    title: "Trading Calculators",
    description: "SIP, Risk-Reward, Position Size, and Brokerage calculators",
  },
  {
    icon: <ChartBar className="w-6 h-6" />,
    title: "Live Market Analysis",
    description: "Real-time market data with educational insights",
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    content: "Finally understood technical analysis after going through the intermediate course. The charts make so much sense now!",
  },
  {
    name: "Priya Patel",
    role: "Business Owner",
    content: "Started as a complete beginner. The step-by-step approach helped me build confidence in the stock market.",
  },
  {
    name: "Amit Kumar",
    role: "College Student",
    content: "The algo trading section opened my eyes to systematic trading. Great introduction without overwhelming jargon.",
  },
];

export default function Home() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const { t } = useLanguage();

  const handleJoinCommunity = () => {
    if (!isAuthenticated) {
      setPendingAction("join our community");
      setShowAuthPopup(true);
    }
  };

  const translatedFeatures = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t("home.features.ebooks.title"),
      description: t("home.features.ebooks.description"),
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: t("home.features.videos.title"),
      description: t("home.features.videos.description"),
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: t("home.features.calculators.title"),
      description: t("home.features.calculators.description"),
    },
    {
      icon: <ChartBar className="w-6 h-6" />,
      title: t("home.features.analysis.title"),
      description: t("home.features.analysis.description"),
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {t("home.features.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {translatedFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover-elevate" data-testid={`card-feature-${index}`}>
                <CardContent className="pt-6 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CourseCards />

      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {t("home.testimonials.title")}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("home.testimonials.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} data-testid={`card-testimonial-${index}`}>
                <CardContent className="pt-6 space-y-4">
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <PricingPlans />

      <section className="py-16 lg:py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {t("home.community.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("home.community.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  data-testid="button-join-whatsapp"
                >
                  <SiWhatsapp className="w-5 h-5 mr-2" />
                  {t("home.community.whatsapp")}
                </Button>
              </a>
              <a
                href="https://t.me/rotechmultisolution"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  data-testid="button-join-telegram"
                >
                  <SiTelegram className="w-5 h-5 mr-2 text-blue-500" />
                  {t("home.community.telegram")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              {t("home.cta.title")}
            </h2>
            <p className="max-w-2xl mx-auto opacity-90">
              {t("home.cta.subtitle")}
            </p>
            {isAuthenticated ? (
              <Link href="/courses">
                <Button size="lg" variant="secondary" data-testid="button-cta-explore">
                  {t("hero.cta.explore")}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                variant="secondary"
                onClick={() => {
                  setPendingAction("access free courses");
                  setShowAuthPopup(true);
                }}
                data-testid="button-cta-start"
              >
                {t("home.cta.button")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
            <p className="text-sm opacity-75 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              {t("home.cta.note")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
