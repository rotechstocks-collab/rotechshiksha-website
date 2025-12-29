import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Zap, Crown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "wouter";

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  color: string;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "Start your learning journey",
    icon: <Star className="w-6 h-6" />,
    color: "emerald",
    features: [
      "Access to all free ebooks",
      "All free video tutorials",
      "Financial calculators",
      "Basic market analysis",
      "Community access",
    ],
  },
  {
    id: "basic",
    name: "Starter",
    price: 99,
    description: "Get personalized guidance",
    icon: <Zap className="w-6 h-6" />,
    color: "blue",
    features: [
      "Everything in Free",
      "1 AI stock analysis",
      "1 hour live session",
      "Q&A with expert",
      "Priority support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 999,
    description: "Complete learning experience",
    icon: <Crown className="w-6 h-6" />,
    color: "purple",
    popular: true,
    features: [
      "Everything in Starter",
      "1 month live market learning",
      "Daily strategy explanation",
      "Algo trading introduction",
      "Risk & psychology training",
      "Personalized guidance",
      "Certificate of completion",
    ],
  },
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/30",
  },
};

export function PricingPlans() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();

  const handleGetPlan = (planName: string) => {
    if (!isAuthenticated) {
      setPendingAction(`subscribe to ${planName} plan`);
      setShowAuthPopup(true);
    }
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Core learning FREE hai. Premium plans mein personalized guidance milti hai - live sessions, expert Q&A, aur 1-on-1 support.
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8 max-w-3xl mx-auto">
          <p className="text-sm text-center text-blue-800 dark:text-blue-200">
            <span className="font-semibold">Kyun Paid Plans?</span> 8 levels ka content 100% free hai. Par agar aapko live guidance, personal mentorship, ya trading strategies ki deep dive chahiye - toh premium plans help karte hain. Ye optional hai - free content se bhi bahut kuch seekh sakte ho!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const colors = colorClasses[plan.color as keyof typeof colorClasses];
            return (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.popular
                    ? "border-primary scale-105 shadow-lg"
                    : ""
                }`}
                data-testid={`card-plan-${plan.id}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg">
                    Best Value
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-14 h-14 mx-auto rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}
                  >
                    {plan.icon}
                  </div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="text-center space-y-6">
                  <div>
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price === 0 ? "Free" : `₹${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground"> /one-time</span>
                    )}
                  </div>

                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.text}`}
                        />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  {plan.price === 0 ? (
                    isAuthenticated ? (
                      <Link href="/dashboard" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full"
                          data-testid={`button-plan-${plan.id}`}
                        >
                          Go to Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleGetPlan(plan.name)}
                        data-testid={`button-plan-${plan.id}`}
                      >
                        Get Started Free
                      </Button>
                    )
                  ) : isAuthenticated ? (
                    <Link href={`/payment/${plan.id}`} className="w-full">
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        data-testid={`button-plan-${plan.id}`}
                      >
                        Buy Now
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleGetPlan(plan.name)}
                      data-testid={`button-plan-${plan.id}`}
                    >
                      Buy Now
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans are one-time payments. No recurring charges.
        </p>
      </div>
    </section>
  );
}
