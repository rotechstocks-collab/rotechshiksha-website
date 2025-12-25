import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Calculator,
  PiggyBank,
  Wallet,
  ArrowDownUp,
  TrendingUp,
  Receipt,
  Heart,
  Shield,
  Building2,
  Banknote,
  Calendar,
  CreditCard,
  Percent,
  LineChart,
  Landmark,
} from "lucide-react";
import { CalculatorIllustration, CoinStack, GrowthChart } from "@/components/Illustrations";

interface CalculatorItem {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  category: "investment" | "tax" | "government" | "banking" | "loan";
  popular?: boolean;
}

const calculators: CalculatorItem[] = [
  {
    id: "sip",
    name: "SIP Calculator",
    description: "Calculate returns on systematic investment plans",
    icon: <PiggyBank className="w-6 h-6" />,
    category: "investment",
    popular: true,
  },
  {
    id: "lumpsum",
    name: "Lumpsum Calculator",
    description: "Calculate returns on one-time investments",
    icon: <Wallet className="w-6 h-6" />,
    category: "investment",
    popular: true,
  },
  {
    id: "swp",
    name: "SWP Calculator",
    description: "Systematic Withdrawal Plan calculator",
    icon: <ArrowDownUp className="w-6 h-6" />,
    category: "investment",
  },
  {
    id: "mutual-fund",
    name: "Mutual Fund Returns",
    description: "Calculate mutual fund investment returns",
    icon: <TrendingUp className="w-6 h-6" />,
    category: "investment",
  },
  {
    id: "income-tax",
    name: "Income Tax Calculator",
    description: "Calculate your income tax liability (India)",
    icon: <Receipt className="w-6 h-6" />,
    category: "tax",
    popular: true,
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi",
    description: "Calculate SSY scheme returns",
    icon: <Heart className="w-6 h-6" />,
    category: "government",
  },
  {
    id: "ppf",
    name: "PPF Calculator",
    description: "Public Provident Fund returns calculator",
    icon: <Shield className="w-6 h-6" />,
    category: "government",
    popular: true,
  },
  {
    id: "epf",
    name: "EPF Calculator",
    description: "Employee Provident Fund calculator",
    icon: <Building2 className="w-6 h-6" />,
    category: "government",
  },
  {
    id: "fd",
    name: "FD Calculator",
    description: "Fixed Deposit maturity calculator",
    icon: <Banknote className="w-6 h-6" />,
    category: "banking",
    popular: true,
  },
  {
    id: "rd",
    name: "RD Calculator",
    description: "Recurring Deposit returns calculator",
    icon: <Calendar className="w-6 h-6" />,
    category: "banking",
  },
  {
    id: "emi",
    name: "EMI Calculator",
    description: "Calculate loan EMI payments",
    icon: <CreditCard className="w-6 h-6" />,
    category: "loan",
    popular: true,
  },
  {
    id: "gst",
    name: "GST Calculator",
    description: "Calculate GST on goods and services",
    icon: <Percent className="w-6 h-6" />,
    category: "tax",
  },
  {
    id: "xirr",
    name: "XIRR Calculator",
    description: "Extended Internal Rate of Return",
    icon: <LineChart className="w-6 h-6" />,
    category: "investment",
  },
  {
    id: "elss",
    name: "ELSS Calculator",
    description: "Tax-saving mutual fund calculator",
    icon: <Shield className="w-6 h-6" />,
    category: "investment",
  },
  {
    id: "sbi-sip",
    name: "SBI SIP Calculator",
    description: "SBI Mutual Fund SIP calculator",
    icon: <Landmark className="w-6 h-6" />,
    category: "banking",
  },
  {
    id: "hdfc-sip",
    name: "HDFC SIP Calculator",
    description: "HDFC Mutual Fund SIP calculator",
    icon: <Landmark className="w-6 h-6" />,
    category: "banking",
  },
  {
    id: "icici-sip",
    name: "ICICI SIP Calculator",
    description: "ICICI Prudential SIP calculator",
    icon: <Landmark className="w-6 h-6" />,
    category: "banking",
  },
  {
    id: "axis-sip",
    name: "Axis SIP Calculator",
    description: "Axis Mutual Fund SIP calculator",
    icon: <Landmark className="w-6 h-6" />,
    category: "banking",
  },
  {
    id: "kotak-sip",
    name: "Kotak SIP Calculator",
    description: "Kotak Mahindra SIP calculator",
    icon: <Landmark className="w-6 h-6" />,
    category: "banking",
  },
  {
    id: "lic-sip",
    name: "LIC SIP Calculator",
    description: "LIC Mutual Fund SIP calculator",
    icon: <Landmark className="w-6 h-6" />,
    category: "banking",
  },
];

const categoryLabels = {
  investment: "Investment",
  tax: "Tax",
  government: "Government Schemes",
  banking: "Banking",
  loan: "Loans",
};

const categoryColors = {
  investment: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  tax: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  government: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  banking: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  loan: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function CalculatorHub() {
  const categories = ["investment", "tax", "government", "banking", "loan"] as const;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              Financial Calculators
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Free Financial Calculators
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Plan your investments, calculate taxes, and make informed financial decisions
              with our comprehensive suite of calculators.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center relative"
          >
            <CalculatorIllustration size={180} />
            <motion.div
              className="absolute -top-4 -right-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <GrowthChart size={120} />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-8"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <CoinStack size={80} />
            </motion.div>
          </motion.div>
        </div>

        {categories.map((category) => {
          const categoryCalcs = calculators.filter((c) => c.category === category);
          if (categoryCalcs.length === 0) return null;

          return (
            <section key={category} className="mb-12">
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <span className={`p-1.5 rounded-lg ${categoryColors[category]}`}>
                  {category === "investment" && <TrendingUp className="w-4 h-4" />}
                  {category === "tax" && <Receipt className="w-4 h-4" />}
                  {category === "government" && <Shield className="w-4 h-4" />}
                  {category === "banking" && <Landmark className="w-4 h-4" />}
                  {category === "loan" && <CreditCard className="w-4 h-4" />}
                </span>
                {categoryLabels[category]} Calculators
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryCalcs.map((calc) => (
                  <Link key={calc.id} href={`/calculators/${calc.id}`}>
                    <Card
                      className="h-full hover-elevate cursor-pointer transition-all group"
                      data-testid={`card-calculator-${calc.id}`}
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className={`p-2.5 rounded-xl ${categoryColors[calc.category]}`}>
                            {calc.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {calc.name}
                              </h3>
                              {calc.popular && (
                                <Badge variant="secondary" className="text-xs">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {calc.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
