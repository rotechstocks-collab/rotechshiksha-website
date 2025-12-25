import { useState, useMemo } from "react";
import { useParams, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  Calculator,
  CheckCircle2,
  ArrowRight,
  IndianRupee,
  Calendar,
  Percent,
  ArrowLeft,
  PiggyBank,
  Wallet,
  ArrowDownUp,
  TrendingUp,
  Receipt,
  Heart,
  Shield,
  Building2,
  Banknote,
  CreditCard,
  LineChart,
  Landmark,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

function formatCurrency(value: number): string {
  if (value >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(2)} L`;
  return value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

interface CalculatorConfig {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  fields: CalculatorField[];
  calculate: (values: Record<string, number>) => CalculatorResult;
  info: {
    what: string;
    howItWorks: string;
    formula: string;
    example: string;
  };
  chartType?: "pie" | "bar";
}

interface CalculatorField {
  id: string;
  label: string;
  icon: JSX.Element;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  suffix?: string;
  format?: (v: number) => string;
}

interface CalculatorResult {
  primary: { label: string; value: number };
  secondary: Array<{ label: string; value: number; color?: string }>;
  chartData: Array<{ name: string; value: number; color: string }>;
}

const calculatorConfigs: Record<string, CalculatorConfig> = {
  sip: {
    id: "sip",
    name: "SIP Calculator",
    description: "Calculate returns on Systematic Investment Plans",
    icon: <PiggyBank className="w-6 h-6" />,
    fields: [
      { id: "monthly", label: "Monthly Investment", icon: <IndianRupee className="w-4 h-4" />, min: 100, max: 200000, step: 100, defaultValue: 5000, format: (v) => `${v}` },
      { id: "years", label: "Investment Period", icon: <Calendar className="w-4 h-4" />, min: 1, max: 40, step: 1, defaultValue: 10, suffix: "Years" },
      { id: "rate", label: "Expected Return (p.a.)", icon: <Percent className="w-4 h-4" />, min: 1, max: 30, step: 0.5, defaultValue: 12, suffix: "%" },
    ],
    calculate: (v) => {
      const monthlyRate = v.rate / 12 / 100;
      const months = v.years * 12;
      const futureValue = v.monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      const invested = v.monthly * months;
      const returns = futureValue - invested;
      return {
        primary: { label: "Total Value", value: futureValue },
        secondary: [
          { label: "Invested Amount", value: invested, color: "#3B82F6" },
          { label: "Est. Returns", value: returns, color: "#10B981" },
        ],
        chartData: [
          { name: "Invested", value: invested, color: "#3B82F6" },
          { name: "Returns", value: returns, color: "#10B981" },
        ],
      };
    },
    info: {
      what: "A Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds. It helps build wealth through disciplined investing.",
      howItWorks: "You invest a fixed amount monthly. The power of compounding grows your investment over time, as returns are reinvested to generate more returns.",
      formula: "FV = P × ((((1 + r)^n) - 1) / r) × (1 + r), where P = monthly investment, r = monthly rate, n = number of months",
      example: "If you invest Rs.5,000/month for 10 years at 12% annual return, your investment of Rs.6,00,000 grows to approximately Rs.11,61,695.",
    },
  },
  lumpsum: {
    id: "lumpsum",
    name: "Lumpsum Calculator",
    description: "Calculate returns on one-time investments",
    icon: <Wallet className="w-6 h-6" />,
    fields: [
      { id: "principal", label: "Investment Amount", icon: <IndianRupee className="w-4 h-4" />, min: 1000, max: 10000000, step: 1000, defaultValue: 100000 },
      { id: "years", label: "Investment Period", icon: <Calendar className="w-4 h-4" />, min: 1, max: 40, step: 1, defaultValue: 10, suffix: "Years" },
      { id: "rate", label: "Expected Return (p.a.)", icon: <Percent className="w-4 h-4" />, min: 1, max: 30, step: 0.5, defaultValue: 12, suffix: "%" },
    ],
    calculate: (v) => {
      const futureValue = v.principal * Math.pow(1 + v.rate / 100, v.years);
      const returns = futureValue - v.principal;
      return {
        primary: { label: "Total Value", value: futureValue },
        secondary: [
          { label: "Principal Amount", value: v.principal, color: "#3B82F6" },
          { label: "Est. Returns", value: returns, color: "#10B981" },
        ],
        chartData: [
          { name: "Principal", value: v.principal, color: "#3B82F6" },
          { name: "Returns", value: returns, color: "#10B981" },
        ],
      };
    },
    info: {
      what: "A lumpsum investment is a one-time investment where you invest the entire amount at once instead of spreading it over time.",
      howItWorks: "Your entire investment grows through compound interest from day one, potentially generating higher returns if markets perform well.",
      formula: "FV = P × (1 + r)^n, where P = principal, r = annual rate, n = years",
      example: "If you invest Rs.1,00,000 for 10 years at 12% annual return, it grows to approximately Rs.3,10,585.",
    },
  },
  swp: {
    id: "swp",
    name: "SWP Calculator",
    description: "Systematic Withdrawal Plan calculator",
    icon: <ArrowDownUp className="w-6 h-6" />,
    fields: [
      { id: "corpus", label: "Total Investment", icon: <IndianRupee className="w-4 h-4" />, min: 100000, max: 100000000, step: 10000, defaultValue: 1000000 },
      { id: "withdrawal", label: "Monthly Withdrawal", icon: <Wallet className="w-4 h-4" />, min: 1000, max: 500000, step: 1000, defaultValue: 10000 },
      { id: "rate", label: "Expected Return (p.a.)", icon: <Percent className="w-4 h-4" />, min: 1, max: 20, step: 0.5, defaultValue: 8, suffix: "%" },
      { id: "years", label: "Withdrawal Period", icon: <Calendar className="w-4 h-4" />, min: 1, max: 40, step: 1, defaultValue: 10, suffix: "Years" },
    ],
    calculate: (v) => {
      const monthlyRate = v.rate / 12 / 100;
      const months = v.years * 12;
      let balance = v.corpus;
      for (let i = 0; i < months && balance > 0; i++) {
        balance = balance * (1 + monthlyRate) - v.withdrawal;
      }
      const totalWithdrawn = v.withdrawal * months;
      return {
        primary: { label: "Final Balance", value: Math.max(0, balance) },
        secondary: [
          { label: "Total Withdrawn", value: totalWithdrawn, color: "#F59E0B" },
          { label: "Initial Corpus", value: v.corpus, color: "#3B82F6" },
        ],
        chartData: [
          { name: "Remaining", value: Math.max(0, balance), color: "#10B981" },
          { name: "Withdrawn", value: totalWithdrawn, color: "#F59E0B" },
        ],
      };
    },
    info: {
      what: "A Systematic Withdrawal Plan (SWP) lets you withdraw a fixed amount regularly from your mutual fund investment while the remaining amount continues to grow.",
      howItWorks: "You invest a lump sum, then withdraw fixed amounts monthly. The remaining corpus continues earning returns.",
      formula: "Balance = (Previous Balance × (1 + monthly rate)) - Monthly Withdrawal",
      example: "With Rs.10L corpus, Rs.10,000/month withdrawal at 8% return for 10 years, you withdraw Rs.12L total while corpus earns returns.",
    },
  },
  "mutual-fund": {
    id: "mutual-fund",
    name: "Mutual Fund Returns",
    description: "Calculate mutual fund investment returns",
    icon: <TrendingUp className="w-6 h-6" />,
    fields: [
      { id: "invested", label: "Amount Invested", icon: <IndianRupee className="w-4 h-4" />, min: 1000, max: 10000000, step: 1000, defaultValue: 100000 },
      { id: "current", label: "Current Value", icon: <TrendingUp className="w-4 h-4" />, min: 1000, max: 50000000, step: 1000, defaultValue: 150000 },
      { id: "years", label: "Investment Period", icon: <Calendar className="w-4 h-4" />, min: 1, max: 40, step: 1, defaultValue: 3, suffix: "Years" },
    ],
    calculate: (v) => {
      const absoluteReturn = ((v.current - v.invested) / v.invested) * 100;
      const cagr = (Math.pow(v.current / v.invested, 1 / v.years) - 1) * 100;
      const profit = v.current - v.invested;
      return {
        primary: { label: "CAGR", value: cagr },
        secondary: [
          { label: "Absolute Return", value: absoluteReturn, color: "#10B981" },
          { label: "Profit/Loss", value: profit, color: profit >= 0 ? "#10B981" : "#EF4444" },
        ],
        chartData: [
          { name: "Invested", value: v.invested, color: "#3B82F6" },
          { name: "Returns", value: Math.max(0, profit), color: "#10B981" },
        ],
      };
    },
    info: {
      what: "This calculator helps you understand your mutual fund investment performance by calculating returns metrics like CAGR and absolute returns.",
      howItWorks: "Enter your invested amount, current value, and time period to see your actual returns compared to the investment.",
      formula: "CAGR = ((Current Value / Invested Amount)^(1/Years) - 1) × 100",
      example: "If Rs.1L invested 3 years ago is now worth Rs.1.5L, your absolute return is 50% and CAGR is approximately 14.47%.",
    },
  },
  "income-tax": {
    id: "income-tax",
    name: "Income Tax Calculator",
    description: "Calculate your income tax liability (India)",
    icon: <Receipt className="w-6 h-6" />,
    fields: [
      { id: "income", label: "Annual Income", icon: <IndianRupee className="w-4 h-4" />, min: 0, max: 50000000, step: 10000, defaultValue: 1000000 },
      { id: "deductions", label: "80C Deductions", icon: <Shield className="w-4 h-4" />, min: 0, max: 150000, step: 5000, defaultValue: 150000 },
      { id: "hra", label: "HRA Exemption", icon: <Building2 className="w-4 h-4" />, min: 0, max: 500000, step: 5000, defaultValue: 0 },
    ],
    calculate: (v) => {
      const taxableIncome = Math.max(0, v.income - v.deductions - v.hra - 50000);
      let tax = 0;
      if (taxableIncome > 1500000) tax = 187500 + (taxableIncome - 1500000) * 0.3;
      else if (taxableIncome > 1200000) tax = 112500 + (taxableIncome - 1200000) * 0.25;
      else if (taxableIncome > 1000000) tax = 75000 + (taxableIncome - 1000000) * 0.2;
      else if (taxableIncome > 750000) tax = 37500 + (taxableIncome - 750000) * 0.15;
      else if (taxableIncome > 500000) tax = 12500 + (taxableIncome - 500000) * 0.1;
      else if (taxableIncome > 300000) tax = (taxableIncome - 300000) * 0.05;
      const cess = tax * 0.04;
      const totalTax = tax + cess;
      return {
        primary: { label: "Total Tax", value: totalTax },
        secondary: [
          { label: "Taxable Income", value: taxableIncome, color: "#3B82F6" },
          { label: "Tax + Cess", value: totalTax, color: "#EF4444" },
        ],
        chartData: [
          { name: "Net Income", value: v.income - totalTax, color: "#10B981" },
          { name: "Tax", value: totalTax, color: "#EF4444" },
        ],
      };
    },
    info: {
      what: "The Income Tax Calculator helps you estimate your tax liability under the new tax regime in India for the financial year.",
      howItWorks: "Enter your annual income and deductions. The calculator applies the applicable tax slabs and adds 4% cess.",
      formula: "Tax is calculated based on income slabs: 0-3L (0%), 3-6L (5%), 6-9L (10%), 9-12L (15%), 12-15L (20%), >15L (30%)",
      example: "For Rs.10L income with Rs.1.5L deductions, taxable income is Rs.7L, resulting in approximately Rs.33,800 tax.",
    },
  },
  ppf: {
    id: "ppf",
    name: "PPF Calculator",
    description: "Public Provident Fund returns calculator",
    icon: <Shield className="w-6 h-6" />,
    fields: [
      { id: "yearly", label: "Yearly Investment", icon: <IndianRupee className="w-4 h-4" />, min: 500, max: 150000, step: 500, defaultValue: 150000 },
      { id: "years", label: "Investment Period", icon: <Calendar className="w-4 h-4" />, min: 15, max: 50, step: 5, defaultValue: 15, suffix: "Years" },
      { id: "rate", label: "Interest Rate", icon: <Percent className="w-4 h-4" />, min: 6, max: 9, step: 0.1, defaultValue: 7.1, suffix: "%" },
    ],
    calculate: (v) => {
      let balance = 0;
      for (let i = 0; i < v.years; i++) {
        balance = (balance + v.yearly) * (1 + v.rate / 100);
      }
      const invested = v.yearly * v.years;
      const interest = balance - invested;
      return {
        primary: { label: "Maturity Amount", value: balance },
        secondary: [
          { label: "Total Investment", value: invested, color: "#3B82F6" },
          { label: "Interest Earned", value: interest, color: "#10B981" },
        ],
        chartData: [
          { name: "Invested", value: invested, color: "#3B82F6" },
          { name: "Interest", value: interest, color: "#10B981" },
        ],
      };
    },
    info: {
      what: "PPF is a government-backed long-term savings scheme with tax benefits under Section 80C and tax-free returns.",
      howItWorks: "Invest yearly (min Rs.500, max Rs.1.5L) for 15+ years. Interest compounds annually and the entire maturity is tax-free.",
      formula: "Balance = (Previous + Yearly) × (1 + rate), compounded annually",
      example: "Rs.1.5L yearly for 15 years at 7.1% gives approximately Rs.40.68L maturity (Rs.22.5L invested + Rs.18.18L interest).",
    },
  },
  epf: {
    id: "epf",
    name: "EPF Calculator",
    description: "Employee Provident Fund calculator",
    icon: <Building2 className="w-6 h-6" />,
    fields: [
      { id: "basic", label: "Monthly Basic + DA", icon: <IndianRupee className="w-4 h-4" />, min: 5000, max: 500000, step: 1000, defaultValue: 50000 },
      { id: "contribution", label: "Employee Contribution", icon: <Percent className="w-4 h-4" />, min: 12, max: 100, step: 1, defaultValue: 12, suffix: "%" },
      { id: "years", label: "Service Period", icon: <Calendar className="w-4 h-4" />, min: 1, max: 40, step: 1, defaultValue: 25, suffix: "Years" },
      { id: "rate", label: "Interest Rate", icon: <Percent className="w-4 h-4" />, min: 7, max: 10, step: 0.1, defaultValue: 8.25, suffix: "%" },
    ],
    calculate: (v) => {
      const monthlyContribution = (v.basic * v.contribution / 100) * 2;
      let balance = 0;
      for (let i = 0; i < v.years * 12; i++) {
        balance = (balance + monthlyContribution) * (1 + v.rate / 100 / 12);
      }
      const invested = monthlyContribution * v.years * 12;
      const interest = balance - invested;
      return {
        primary: { label: "EPF Balance", value: balance },
        secondary: [
          { label: "Total Contribution", value: invested, color: "#3B82F6" },
          { label: "Interest Earned", value: interest, color: "#10B981" },
        ],
        chartData: [
          { name: "Contribution", value: invested, color: "#3B82F6" },
          { name: "Interest", value: interest, color: "#10B981" },
        ],
      };
    },
    info: {
      what: "EPF is a retirement savings scheme where both employee and employer contribute 12% of basic salary monthly.",
      howItWorks: "12% from employee + 12% from employer (8.33% to pension, 3.67% to EPF). Interest is compounded monthly.",
      formula: "Monthly balance = (Previous + Contribution) × (1 + monthly rate)",
      example: "Rs.50,000 basic, 12% contribution for 25 years at 8.25% gives approximately Rs.1.07 Cr.",
    },
  },
  fd: {
    id: "fd",
    name: "FD Calculator",
    description: "Fixed Deposit maturity calculator",
    icon: <Banknote className="w-6 h-6" />,
    fields: [
      { id: "principal", label: "Principal Amount", icon: <IndianRupee className="w-4 h-4" />, min: 1000, max: 10000000, step: 1000, defaultValue: 100000 },
      { id: "rate", label: "Interest Rate", icon: <Percent className="w-4 h-4" />, min: 3, max: 10, step: 0.1, defaultValue: 7, suffix: "%" },
      { id: "years", label: "Tenure", icon: <Calendar className="w-4 h-4" />, min: 1, max: 10, step: 1, defaultValue: 5, suffix: "Years" },
    ],
    calculate: (v) => {
      const maturity = v.principal * Math.pow(1 + v.rate / 400, v.years * 4);
      const interest = maturity - v.principal;
      return {
        primary: { label: "Maturity Amount", value: maturity },
        secondary: [
          { label: "Principal", value: v.principal, color: "#3B82F6" },
          { label: "Interest Earned", value: interest, color: "#10B981" },
        ],
        chartData: [
          { name: "Principal", value: v.principal, color: "#3B82F6" },
          { name: "Interest", value: interest, color: "#10B981" },
        ],
      };
    },
    info: {
      what: "A Fixed Deposit is a low-risk investment where you deposit money for a fixed tenure and earn guaranteed interest.",
      howItWorks: "Deposit a lump sum for a fixed period. Interest is compounded quarterly and paid at maturity.",
      formula: "Maturity = Principal × (1 + r/4)^(4n), where r = annual rate, n = years",
      example: "Rs.1L deposited at 7% for 5 years with quarterly compounding matures to approximately Rs.1,41,478.",
    },
  },
  rd: {
    id: "rd",
    name: "RD Calculator",
    description: "Recurring Deposit returns calculator",
    icon: <Calendar className="w-6 h-6" />,
    fields: [
      { id: "monthly", label: "Monthly Deposit", icon: <IndianRupee className="w-4 h-4" />, min: 100, max: 100000, step: 100, defaultValue: 5000 },
      { id: "rate", label: "Interest Rate", icon: <Percent className="w-4 h-4" />, min: 3, max: 10, step: 0.1, defaultValue: 6.5, suffix: "%" },
      { id: "years", label: "Tenure", icon: <Calendar className="w-4 h-4" />, min: 1, max: 10, step: 1, defaultValue: 5, suffix: "Years" },
    ],
    calculate: (v) => {
      const n = v.years * 4;
      const r = v.rate / 400;
      const maturity = v.monthly * ((Math.pow(1 + r, n) - 1) / (1 - Math.pow(1 + r, -1/3)));
      const invested = v.monthly * v.years * 12;
      const interest = maturity - invested;
      return {
        primary: { label: "Maturity Amount", value: maturity },
        secondary: [
          { label: "Total Deposits", value: invested, color: "#3B82F6" },
          { label: "Interest Earned", value: interest, color: "#10B981" },
        ],
        chartData: [
          { name: "Deposits", value: invested, color: "#3B82F6" },
          { name: "Interest", value: interest, color: "#10B981" },
        ],
      };
    },
    info: {
      what: "A Recurring Deposit allows you to save a fixed amount monthly and earn interest, combining discipline with guaranteed returns.",
      howItWorks: "Deposit a fixed amount monthly. Interest is compounded quarterly on your growing balance.",
      formula: "RD uses quarterly compounding on monthly deposits",
      example: "Rs.5,000/month at 6.5% for 5 years gives approximately Rs.3.53L (Rs.3L deposited + Rs.53K interest).",
    },
  },
  emi: {
    id: "emi",
    name: "EMI Calculator",
    description: "Calculate loan EMI payments",
    icon: <CreditCard className="w-6 h-6" />,
    fields: [
      { id: "principal", label: "Loan Amount", icon: <IndianRupee className="w-4 h-4" />, min: 10000, max: 100000000, step: 10000, defaultValue: 5000000 },
      { id: "rate", label: "Interest Rate", icon: <Percent className="w-4 h-4" />, min: 5, max: 20, step: 0.1, defaultValue: 8.5, suffix: "%" },
      { id: "years", label: "Loan Tenure", icon: <Calendar className="w-4 h-4" />, min: 1, max: 30, step: 1, defaultValue: 20, suffix: "Years" },
    ],
    calculate: (v) => {
      const monthlyRate = v.rate / 12 / 100;
      const months = v.years * 12;
      const emi = v.principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayment = emi * months;
      const totalInterest = totalPayment - v.principal;
      return {
        primary: { label: "Monthly EMI", value: emi },
        secondary: [
          { label: "Principal", value: v.principal, color: "#3B82F6" },
          { label: "Total Interest", value: totalInterest, color: "#F59E0B" },
        ],
        chartData: [
          { name: "Principal", value: v.principal, color: "#3B82F6" },
          { name: "Interest", value: totalInterest, color: "#F59E0B" },
        ],
      };
    },
    info: {
      what: "EMI (Equated Monthly Installment) is the fixed payment you make monthly to repay a loan, covering both principal and interest.",
      howItWorks: "The EMI remains constant throughout the tenure. Initially, interest component is higher; later, principal repayment increases.",
      formula: "EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P = principal, r = monthly rate, n = months",
      example: "Rs.50L loan at 8.5% for 20 years has EMI of approximately Rs.43,391. Total payment: Rs.1.04 Cr.",
    },
  },
  gst: {
    id: "gst",
    name: "GST Calculator",
    description: "Calculate GST on goods and services",
    icon: <Percent className="w-6 h-6" />,
    fields: [
      { id: "amount", label: "Amount", icon: <IndianRupee className="w-4 h-4" />, min: 0, max: 10000000, step: 100, defaultValue: 10000 },
      { id: "rate", label: "GST Rate", icon: <Percent className="w-4 h-4" />, min: 0, max: 28, step: 1, defaultValue: 18, suffix: "%" },
    ],
    calculate: (v) => {
      const gstAmount = v.amount * v.rate / 100;
      const total = v.amount + gstAmount;
      const cgst = gstAmount / 2;
      const sgst = gstAmount / 2;
      return {
        primary: { label: "Total Amount", value: total },
        secondary: [
          { label: "Base Amount", value: v.amount, color: "#3B82F6" },
          { label: "GST Amount", value: gstAmount, color: "#F59E0B" },
        ],
        chartData: [
          { name: "Base", value: v.amount, color: "#3B82F6" },
          { name: "GST", value: gstAmount, color: "#F59E0B" },
        ],
      };
    },
    info: {
      what: "GST (Goods and Services Tax) is an indirect tax on supply of goods and services in India, replacing multiple cascading taxes.",
      howItWorks: "GST is added to the base price. It's split equally into CGST (Central) and SGST (State) for intra-state transactions.",
      formula: "GST = Base Amount × Rate%. Total = Base + GST",
      example: "On Rs.10,000 product with 18% GST: GST = Rs.1,800, Total = Rs.11,800 (CGST Rs.900 + SGST Rs.900).",
    },
  },
  elss: {
    id: "elss",
    name: "ELSS Calculator",
    description: "Tax-saving mutual fund calculator",
    icon: <Shield className="w-6 h-6" />,
    fields: [
      { id: "monthly", label: "Monthly Investment", icon: <IndianRupee className="w-4 h-4" />, min: 100, max: 50000, step: 500, defaultValue: 12500 },
      { id: "years", label: "Investment Period", icon: <Calendar className="w-4 h-4" />, min: 3, max: 30, step: 1, defaultValue: 10, suffix: "Years" },
      { id: "rate", label: "Expected Return", icon: <Percent className="w-4 h-4" />, min: 8, max: 20, step: 0.5, defaultValue: 12, suffix: "%" },
    ],
    calculate: (v) => {
      const monthlyRate = v.rate / 12 / 100;
      const months = v.years * 12;
      const futureValue = v.monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
      const invested = v.monthly * months;
      const returns = futureValue - invested;
      const taxSaved = Math.min(v.monthly * 12, 150000) * 0.3;
      return {
        primary: { label: "Total Value", value: futureValue },
        secondary: [
          { label: "Invested Amount", value: invested, color: "#3B82F6" },
          { label: "Est. Returns", value: returns, color: "#10B981" },
          { label: "Tax Saved/Year", value: taxSaved, color: "#8B5CF6" },
        ],
        chartData: [
          { name: "Invested", value: invested, color: "#3B82F6" },
          { name: "Returns", value: returns, color: "#10B981" },
        ],
      };
    },
    info: {
      what: "ELSS (Equity Linked Savings Scheme) is a tax-saving mutual fund with a 3-year lock-in period, offering deductions under Section 80C.",
      howItWorks: "Invest up to Rs.1.5L yearly for tax deduction. Minimum 3-year lock-in. Returns are market-linked.",
      formula: "Same as SIP formula. Tax saved = Investment × Tax slab rate (up to Rs.1.5L)",
      example: "Rs.12,500/month for 10 years at 12% gives ~Rs.29L. Annual tax saving: Rs.45,000 (at 30% slab).",
    },
  },
  "sukanya-samriddhi": {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi",
    description: "Calculate SSY scheme returns",
    icon: <Heart className="w-6 h-6" />,
    fields: [
      { id: "yearly", label: "Yearly Investment", icon: <IndianRupee className="w-4 h-4" />, min: 250, max: 150000, step: 250, defaultValue: 150000 },
      { id: "rate", label: "Interest Rate", icon: <Percent className="w-4 h-4" />, min: 7, max: 9, step: 0.1, defaultValue: 8.2, suffix: "%" },
    ],
    calculate: (v) => {
      let balance = 0;
      for (let i = 0; i < 15; i++) {
        balance = (balance + v.yearly) * (1 + v.rate / 100);
      }
      for (let i = 15; i < 21; i++) {
        balance = balance * (1 + v.rate / 100);
      }
      const invested = v.yearly * 15;
      const interest = balance - invested;
      return {
        primary: { label: "Maturity (21 yrs)", value: balance },
        secondary: [
          { label: "Total Investment", value: invested, color: "#3B82F6" },
          { label: "Interest Earned", value: interest, color: "#10B981" },
        ],
        chartData: [
          { name: "Invested", value: invested, color: "#3B82F6" },
          { name: "Interest", value: interest, color: "#10B981" },
        ],
      };
    },
    info: {
      what: "Sukanya Samriddhi Yojana (SSY) is a government savings scheme for girl children, offering high interest and tax benefits.",
      howItWorks: "Open account for girl child under 10. Deposit yearly for 15 years. Account matures when child turns 21.",
      formula: "Compound interest on yearly deposits for 15 years, then grows for 6 more years without deposits.",
      example: "Rs.1.5L yearly for 15 years at 8.2% matures to approximately Rs.69.27L after 21 years.",
    },
  },
  xirr: {
    id: "xirr",
    name: "XIRR Calculator",
    description: "Extended Internal Rate of Return",
    icon: <LineChart className="w-6 h-6" />,
    fields: [
      { id: "invested", label: "Total Invested", icon: <IndianRupee className="w-4 h-4" />, min: 1000, max: 10000000, step: 1000, defaultValue: 100000 },
      { id: "current", label: "Current Value", icon: <TrendingUp className="w-4 h-4" />, min: 1000, max: 50000000, step: 1000, defaultValue: 180000 },
      { id: "years", label: "Investment Period", icon: <Calendar className="w-4 h-4" />, min: 1, max: 30, step: 0.5, defaultValue: 5, suffix: "Years" },
    ],
    calculate: (v) => {
      const xirr = (Math.pow(v.current / v.invested, 1 / v.years) - 1) * 100;
      const absoluteReturn = ((v.current - v.invested) / v.invested) * 100;
      const profit = v.current - v.invested;
      return {
        primary: { label: "XIRR", value: xirr },
        secondary: [
          { label: "Absolute Return", value: absoluteReturn, color: "#10B981" },
          { label: "Profit", value: profit, color: "#10B981" },
        ],
        chartData: [
          { name: "Invested", value: v.invested, color: "#3B82F6" },
          { name: "Profit", value: Math.max(0, profit), color: "#10B981" },
        ],
      };
    },
    info: {
      what: "XIRR (Extended Internal Rate of Return) calculates the annualized return on investments made at irregular intervals.",
      howItWorks: "Unlike simple returns, XIRR accounts for the timing of each investment, giving a more accurate picture of performance.",
      formula: "XIRR uses iterative calculation: Sum of (Cash flow × (1+XIRR)^(-days/365)) = 0",
      example: "Rs.1L invested that becomes Rs.1.8L in 5 years has XIRR of approximately 12.47%.",
    },
  },
};

const bankSipConfigs = ["sbi-sip", "hdfc-sip", "icici-sip", "axis-sip", "kotak-sip", "lic-sip"];
bankSipConfigs.forEach((id) => {
  const bankName = id.replace("-sip", "").toUpperCase();
  calculatorConfigs[id] = {
    ...calculatorConfigs.sip,
    id,
    name: `${bankName} SIP Calculator`,
    description: `Calculate SIP returns for ${bankName} Mutual Funds`,
    icon: <Landmark className="w-6 h-6" />,
    info: {
      ...calculatorConfigs.sip.info,
      what: `Calculate potential returns on ${bankName} Mutual Fund SIP investments. ${bankName} offers various schemes across equity, debt, and hybrid categories.`,
    },
  };
});

export default function GenericCalculator() {
  const { id } = useParams<{ id: string }>();
  const config = id ? calculatorConfigs[id] : null;
  const [showContactModal, setShowContactModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();

  const [values, setValues] = useState<Record<string, number>>(() => {
    if (!config) return {};
    return config.fields.reduce((acc, f) => ({ ...acc, [f.id]: f.defaultValue }), {});
  });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { fullName: "", mobile: "", email: "", message: "" },
  });

  const result = useMemo(() => {
    if (!config) return null;
    return config.calculate(values);
  }, [config, values]);

  if (!config) {
    return (
      <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Calculator Not Found</h1>
          <Link href="/calculators">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Calculators
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: ContactFormData) => {
    try {
      const details = `Calculator: ${config.name}\n${config.fields.map((f) => `${f.label}: ${values[f.id]}${f.suffix || ""}`).join("\n")}\nResult: ${result?.primary.label}: Rs.${formatCurrency(result?.primary.value || 0)}`;
      const notes = data.message ? `${data.message}\n\n${details}` : details;

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          mobile: data.mobile,
          email: data.email,
          experience: "beginner",
          source: `calculator_${config.id}`,
          notes,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        toast({ title: "Thank you!", description: "Our team will contact you shortly." });
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="mb-6">
          <Link href="/calculators">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              All Calculators
            </Button>
          </Link>
        </div>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Financial Calculator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{config.name}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{config.description}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          <Card className="lg:col-span-3 shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {config.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">Calculate Your Returns</CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">Adjust the sliders to see results</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {config.fields.map((field) => (
                <div key={field.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{field.icon}</span>
                      <Label className="text-sm font-medium">{field.label}</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={values[field.id]}
                        onChange={(e) => setValues((v) => ({ ...v, [field.id]: Math.max(field.min, Math.min(field.max, Number(e.target.value))) }))}
                        className="w-28 h-9 text-right font-semibold"
                        data-testid={`input-${field.id}`}
                      />
                      {field.suffix && <span className="text-sm text-muted-foreground">{field.suffix}</span>}
                    </div>
                  </div>
                  <Slider
                    value={[values[field.id]]}
                    onValueChange={(v) => setValues((prev) => ({ ...prev, [field.id]: v[0] }))}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    className="py-2"
                    data-testid={`slider-${field.id}`}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{field.format ? field.format(field.min) : field.min}</span>
                    <span>{field.format ? field.format(field.max) : field.max}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="text-lg">Results</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground mb-1">{result?.primary.label}</p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                  {config.id.includes("tax") || config.id === "gst" || config.id === "xirr" || config.id === "mutual-fund"
                    ? result?.primary.label === "CAGR" || result?.primary.label === "XIRR"
                      ? `${result?.primary.value.toFixed(2)}%`
                      : `Rs. ${formatCurrency(result?.primary.value || 0)}`
                    : `Rs. ${formatCurrency(result?.primary.value || 0)}`}
                </p>
              </div>

              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={result?.chartData || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {result?.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `Rs. ${formatCurrency(value)}`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {result?.secondary.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className="font-semibold">
                      {item.label.includes("%") || item.label.includes("Return")
                        ? `${item.value.toFixed(2)}%`
                        : `Rs. ${formatCurrency(item.value)}`}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={() => setShowContactModal(true)}
                data-testid="button-start-investing"
              >
                Start Investing
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What is {config.name.replace(" Calculator", "")}?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{config.info.what}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{config.info.howItWorks}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Formula</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-mono text-sm">{config.info.formula}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Example</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{config.info.example}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{formSubmitted ? "Thank You!" : "Start Your Investment Journey"}</DialogTitle>
            <DialogDescription>
              {formSubmitted
                ? "Our team will contact you shortly to help you get started."
                : "Fill in your details and our experts will guide you."}
            </DialogDescription>
          </DialogHeader>
          {formSubmitted ? (
            <div className="flex flex-col items-center py-6">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
              <Button onClick={() => setShowContactModal(false)}>Close</Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} data-testid="input-contact-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="10-digit mobile number" {...field} data-testid="input-contact-mobile" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} data-testid="input-contact-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any questions or comments..." {...field} data-testid="input-contact-message" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" data-testid="button-submit-contact">
                  Submit
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
