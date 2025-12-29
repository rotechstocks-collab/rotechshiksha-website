import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, Zap, Crown, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "wouter";

interface Plan {
  id: string;
  name: string;
  nameHi: string;
  price: number;
  originalPrice?: number;
  description: string;
  descriptionHi: string;
  features: { text: string; textHi: string; included: boolean }[];
  icon: React.ReactNode;
  popular?: boolean;
  color: string;
  ctaText: string;
  ctaTextHi: string;
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free Starter",
    nameHi: "Free Starter",
    price: 0,
    description: "Perfect for beginners starting their journey",
    descriptionHi: "Beginners ke liye perfect start",
    icon: <Star className="w-6 h-6" />,
    color: "emerald",
    ctaText: "Start Free Now",
    ctaTextHi: "Abhi Free Shuru Karo",
    features: [
      { text: "8 Complete Learning Levels", textHi: "8 Complete Learning Levels", included: true },
      { text: "84+ Video Lessons", textHi: "84+ Video Lessons", included: true },
      { text: "All Trading Calculators", textHi: "Sab Trading Calculators", included: true },
      { text: "Paper Trading Simulator", textHi: "Paper Trading Simulator", included: true },
      { text: "Community Access", textHi: "Community Access", included: true },
      { text: "Live Q&A Sessions", textHi: "Live Q&A Sessions", included: false },
      { text: "1-on-1 Mentorship", textHi: "1-on-1 Mentorship", included: false },
      { text: "Priority WhatsApp Support", textHi: "Priority WhatsApp Support", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro Learner",
    nameHi: "Pro Learner",
    price: 499,
    originalPrice: 999,
    description: "For serious learners wanting faster progress",
    descriptionHi: "Fast progress chahiye? Ye hai tumhare liye",
    icon: <Zap className="w-6 h-6" />,
    color: "blue",
    ctaText: "Upgrade Now",
    ctaTextHi: "Upgrade Karo",
    features: [
      { text: "Everything in Free Starter", textHi: "Free Starter ki sab cheezein", included: true },
      { text: "Weekly Live Q&A Sessions", textHi: "Weekly Live Q&A Sessions", included: true },
      { text: "Doubt Solving via WhatsApp", textHi: "WhatsApp pe Doubt Solving", included: true },
      { text: "Bonus Strategy PDFs", textHi: "Bonus Strategy PDFs", included: true },
      { text: "Early Access to New Content", textHi: "New Content ka Early Access", included: true },
      { text: "1-on-1 Mentorship", textHi: "1-on-1 Mentorship", included: false },
      { text: "Portfolio Review", textHi: "Portfolio Review", included: false },
      { text: "Certificate of Completion", textHi: "Certificate of Completion", included: false },
    ],
  },
  {
    id: "elite",
    name: "Elite Mentorship",
    nameHi: "Elite Mentorship",
    price: 2999,
    originalPrice: 4999,
    description: "Complete hand-holding for maximum results",
    descriptionHi: "Personal mentor ke saath complete guidance",
    icon: <Crown className="w-6 h-6" />,
    color: "purple",
    popular: true,
    ctaText: "Join Elite Now",
    ctaTextHi: "Elite Join Karo",
    features: [
      { text: "Everything in Pro Learner", textHi: "Pro Learner ki sab cheezein", included: true },
      { text: "4 Personal 1-on-1 Calls", textHi: "4 Personal 1-on-1 Calls", included: true },
      { text: "Portfolio Review & Guidance", textHi: "Portfolio Review & Guidance", included: true },
      { text: "30-Day Trading Bootcamp", textHi: "30-Day Trading Bootcamp", included: true },
      { text: "Certificate of Completion", textHi: "Certificate of Completion", included: true },
      { text: "Lifetime Community Access", textHi: "Lifetime Community Access", included: true },
      { text: "Priority Support Forever", textHi: "Priority Support Forever", included: true },
      { text: "Exclusive Strategy Sessions", textHi: "Exclusive Strategy Sessions", included: true },
    ],
  },
];

const colorClasses = {
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500/30",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/30",
    button: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/30",
    button: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white",
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
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const colors = colorClasses[plan.color as keyof typeof colorClasses];
            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${
                  plan.popular
                    ? "border-2 border-purple-500 md:scale-105 shadow-xl z-10"
                    : "border"
                }`}
                data-testid={`card-plan-${plan.id}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg px-4 py-1">
                    Best Value - Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-14 h-14 mx-auto rounded-xl ${colors.bg} ${colors.text} flex items-center justify-center mb-4`}
                  >
                    {plan.icon}
                  </div>
                  <CardTitle className="text-xl">{plan.nameHi}</CardTitle>
                  <CardDescription className="text-sm">{plan.descriptionHi}</CardDescription>
                </CardHeader>

                <CardContent className="text-center space-y-4 flex-1">
                  <div>
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through mr-2">
                        ₹{plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price === 0 ? "FREE" : `₹${plan.price}`}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground text-sm block mt-1">one-time payment</span>
                    )}
                    {plan.originalPrice && (
                      <Badge className="mt-2 bg-red-100 text-red-700 border-0">
                        {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}% OFF
                      </Badge>
                    )}
                  </div>

                  <ul className="space-y-2.5 text-left">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        {feature.included ? (
                          <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${colors.text}`} />
                        ) : (
                          <X className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground/50" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground/50 line-through'}`}>
                          {feature.textHi}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4">
                  {plan.price === 0 ? (
                    <Link href="/courses" className="w-full">
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        data-testid={`button-plan-${plan.id}`}
                      >
                        {isAuthenticated ? "Start Learning" : plan.ctaTextHi}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  ) : isAuthenticated ? (
                    <Link href={`/payment/${plan.id}`} className="w-full">
                      <Button
                        className={`w-full gap-2 ${colors.button}`}
                        data-testid={`button-plan-${plan.id}`}
                      >
                        {plan.ctaTextHi}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className={`w-full gap-2 ${colors.button}`}
                      onClick={() => handleGetPlan(plan.name)}
                      data-testid={`button-plan-${plan.id}`}
                    >
                      {plan.ctaTextHi}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Sab plans one-time payment hain. Koi monthly charges nahi. Ek baar pay karo, lifetime access lo.
        </p>
      </div>
    </section>
  );
}

export function ComparisonTable() {
  const features = [
    { name: "8 Complete Learning Levels", free: true, pro: true, elite: true },
    { name: "84+ Video Lessons", free: true, pro: true, elite: true },
    { name: "All Trading Calculators", free: true, pro: true, elite: true },
    { name: "Paper Trading Simulator", free: true, pro: true, elite: true },
    { name: "Community Access", free: true, pro: true, elite: true },
    { name: "Live Q&A Sessions", free: false, pro: "Weekly", elite: "Weekly + Priority" },
    { name: "WhatsApp Doubt Solving", free: false, pro: true, elite: "Priority" },
    { name: "Bonus Strategy PDFs", free: false, pro: true, elite: true },
    { name: "1-on-1 Mentorship Calls", free: false, pro: false, elite: "4 Calls" },
    { name: "Portfolio Review", free: false, pro: false, elite: true },
    { name: "30-Day Trading Bootcamp", free: false, pro: false, elite: true },
    { name: "Certificate of Completion", free: false, pro: false, elite: true },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-4 font-medium text-muted-foreground">Features</th>
            <th className="text-center py-4 px-4 font-semibold text-emerald-600">Free Starter</th>
            <th className="text-center py-4 px-4 font-semibold text-blue-600">Pro Learner</th>
            <th className="text-center py-4 px-4 font-semibold text-purple-600 bg-purple-50 dark:bg-purple-900/20 rounded-t-lg">Elite Mentorship</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, i) => (
            <tr key={i} className="border-b border-muted/30">
              <td className="py-3 px-4 text-foreground">{feature.name}</td>
              <td className="py-3 px-4 text-center">
                {feature.free === true ? (
                  <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                ) : feature.free === false ? (
                  <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                ) : (
                  <span className="text-emerald-600 font-medium">{feature.free}</span>
                )}
              </td>
              <td className="py-3 px-4 text-center">
                {feature.pro === true ? (
                  <Check className="w-5 h-5 text-blue-500 mx-auto" />
                ) : feature.pro === false ? (
                  <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                ) : (
                  <span className="text-blue-600 font-medium">{feature.pro}</span>
                )}
              </td>
              <td className="py-3 px-4 text-center bg-purple-50/50 dark:bg-purple-900/10">
                {feature.elite === true ? (
                  <Check className="w-5 h-5 text-purple-500 mx-auto" />
                ) : feature.elite === false ? (
                  <X className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                ) : (
                  <span className="text-purple-600 font-medium">{feature.elite}</span>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td className="py-4 px-4 font-semibold text-foreground">Price</td>
            <td className="py-4 px-4 text-center font-bold text-emerald-600">FREE</td>
            <td className="py-4 px-4 text-center">
              <span className="line-through text-muted-foreground text-xs">₹999</span>
              <span className="font-bold text-blue-600 ml-1">₹499</span>
            </td>
            <td className="py-4 px-4 text-center bg-purple-50/50 dark:bg-purple-900/10 rounded-b-lg">
              <span className="line-through text-muted-foreground text-xs">₹4999</span>
              <span className="font-bold text-purple-600 ml-1">₹2999</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
