import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CharacterTip } from "@/components/characters/CharacterTip";
import { characterCopy } from "@/content/characterCopy";
import { StoryIntro, CTABlock } from "@/components/characters/StoryIntro";
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
  ArrowRight,
} from "lucide-react";

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
    id: "brokerage",
    name: "Brokerage Calculator",
    description: "Calculate trading charges and net profit/loss",
    icon: <TrendingUp className="w-6 h-6" />,
    category: "investment",
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
  investment: {
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    icon: "text-emerald-600 dark:text-emerald-400",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  },
  tax: {
    bg: "bg-orange-50 dark:bg-orange-950/20",
    icon: "text-orange-600 dark:text-orange-400",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400",
  },
  government: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    icon: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  },
  banking: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    icon: "text-purple-600 dark:text-purple-400",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400",
  },
  loan: {
    bg: "bg-rose-50 dark:bg-rose-950/20",
    icon: "text-rose-600 dark:text-rose-400",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
  },
};

export default function CalculatorHub() {
  const categories = ["investment", "tax", "government", "banking", "loan"] as const;
  const popularCalcs = calculators.filter(c => c.popular);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f9fc' }}>
      <StoryIntro
        priyaLine="Investing se pehle calculation important hai. Yeh tools try kar – returns pata chal jayega!"
        rohitLine="SIP calculator se shuru karta hoon – kitna invest karna chahiye yeh samajh aayega!"
      />

      <section className="section">
        <div className="page-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              <Calculator className="w-4 h-4" />
              20+ Free Tools
            </span>
            <h1 className="varsity-h1 mb-3">
              Financial Calculators
            </h1>
            <p className="varsity-body max-w-2xl mx-auto">
              Apne investment plan karo, tax calculate karo, aur informed decisions lo.
              <br />
              <span className="text-sm text-slate-500">Sab FREE hai - koi signup nahi chahiye.</span>
            </p>
          </motion.div>

        <div className="max-w-2xl mx-auto mb-10">
          <CharacterTip
            character="priya"
            pose="clipboard"
            title={characterCopy.calculators.tipTitle}
            message={characterCopy.calculators.tipMessage}
          />
        </div>

        <section className="mb-16">
          <h2 className="text-xl font-semibold text-foreground mb-6">Popular Calculators</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCalcs.map((calc, index) => {
              const colors = categoryColors[calc.category];
              return (
                <motion.div
                  key={calc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/calculators/${calc.id}`}>
                    <div
                      className="soft-card-hover p-4 h-full flex flex-col items-center text-center cursor-pointer"
                      data-testid={`card-calc-${calc.id}`}
                    >
                      <div className={`w-12 h-12 rounded-2xl ${colors.bg} ${colors.icon} flex items-center justify-center mb-3`}>
                        {calc.icon}
                      </div>
                      <h3 className="text-sm font-medium text-foreground">{calc.name}</h3>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {categories.map((category) => {
          const categoryCalcs = calculators.filter(c => c.category === category);
          const colors = categoryColors[category];
          
          return (
            <section key={category} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  {categoryLabels[category]}
                </h2>
                <Badge className={`${colors.badge} border-0`} variant="outline">
                  {categoryCalcs.length} tools
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {categoryCalcs.map((calc, index) => (
                  <motion.div
                    key={calc.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={`/calculators/${calc.id}`}>
                      <div
                        className="soft-card-hover p-5 h-full flex items-start gap-4 cursor-pointer group"
                        data-testid={`card-calc-${calc.id}`}
                      >
                        <div className={`w-12 h-12 rounded-2xl ${colors.bg} ${colors.icon} flex items-center justify-center shrink-0`}>
                          {calc.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                            {calc.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {calc.description}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}
        </div>
      </section>

      <CTABlock
        priyaLine="Calculator use karne ke baad courses bhi dekh – investing samajh aayegi!"
        rohitLine="Haan, pehle calculate karo, phir seekho – best approach hai!"
        primaryButton={{
          text: "Course Dekho",
          href: "/courses",
          testId: "button-calc-cta-primary"
        }}
        secondaryButton={{
          text: "SIP Calculator Try Karo",
          href: "/calculators/sip",
          testId: "button-calc-cta-secondary"
        }}
      />
    </div>
  );
}
