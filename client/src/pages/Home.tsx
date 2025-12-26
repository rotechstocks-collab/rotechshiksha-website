import { Card, CardContent } from "@/components/ui/card";
import {
  PiggyBank,
  Wallet,
  BarChart3,
  Shield,
  Banknote,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  const calculators = [
    {
      title: "SIP Calculator",
      icon: PiggyBank,
      bg: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Lumpsum Calculator",
      icon: Wallet,
      bg: "bg-blue-100 text-blue-700",
    },
    {
      title: "Income Tax",
      icon: BarChart3,
      bg: "bg-purple-100 text-purple-700",
    },
    { title: "PPF Calculator", icon: Shield, bg: "bg-cyan-100 text-cyan-700" },
    {
      title: "FD Calculator",
      icon: Banknote,
      bg: "bg-amber-100 text-amber-700",
    },
    {
      title: "EMI Calculator",
      icon: IndianRupee,
      bg: "bg-rose-100 text-rose-700",
    },
    { title: "Brokerage", icon: TrendingUp, bg: "bg-teal-100 text-teal-700" },
  ];

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold leading-tight">
          Free & Simple Financial Education
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl">
          Learn investing, trading and personal finance with easy tools and
          beginner‑friendly explanations.
        </p>
      </section>

      {/* VARSITY STYLE CALCULATORS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold">Popular Calculators</h2>
          <p className="text-muted-foreground mt-2">
            Simple tools to plan your money better
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {calculators.map((item, i) => {
            const Icon = item.icon;
            return (
              <Card
                key={i}
                className="rounded-xl border hover:border-muted-foreground/30 transition"
              >
                <CardContent className="p-4 text-center space-y-3">
                  <div
                    className={`w-12 h-12 mx-auto rounded-xl ${item.bg} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-medium">{item.title}</h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-4">Why Learn With Us?</h2>
          <p className="text-muted-foreground max-w-3xl">
            Our platform is inspired by Zerodha Varsity — simple language,
            practical examples and clean design so anyone can learn finance
            without fear or confusion.
          </p>
        </div>
      </section>
    </div>
  );
}
