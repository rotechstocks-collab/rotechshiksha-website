import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Home, 
  User, 
  Briefcase, 
  Coins, 
  GraduationCap, 
  CreditCard,
  ExternalLink,
  Calculator,
  Check,
  X,
  AlertTriangle,
  TrendingUp,
  Clock,
  Percent,
  Building2,
  Scale
} from "lucide-react";

interface Provider {
  id: string;
  name: string;
  logo: string;
  description: string;
  benefits: string[];
  interestRate: string;
  processingFee: string;
  tenure: string;
  processingTime: string;
  specialBenefits: string;
  eligibility: string[];
  applyUrl: string;
  category: "home" | "personal" | "business" | "gold" | "education" | "creditcard";
  pros: string[];
  cons: string[];
}

const providers: Provider[] = [
  {
    id: "sbi-home",
    name: "SBI Home Loan",
    logo: "https://www.sbi.co.in/webfiles/uploads/images/sbi_logo.png",
    description: "India's largest bank offering competitive home loan rates with flexible repayment options.",
    benefits: ["Low interest rates starting 8.50%", "Loan up to Rs. 10 Crore", "Tenure up to 30 years", "Balance transfer facility"],
    interestRate: "8.50% - 9.85%",
    processingFee: "0.35% + GST",
    tenure: "Up to 30 years",
    processingTime: "7-10 days",
    specialBenefits: "No prepayment charges on floating rate loans",
    eligibility: ["Age: 18-70 years", "Min income: Rs. 25,000/month", "CIBIL: 650+"],
    applyUrl: "https://sbi.co.in/web/personal-banking/loans/home-loans",
    category: "home",
    pros: ["Lowest interest rates", "Long tenure options", "Strong customer service"],
    cons: ["Slower processing", "Extensive documentation"]
  },
  {
    id: "hdfc-home",
    name: "HDFC Home Loan",
    logo: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/67b37d67-8c3d-4e10-a435-8ad2f8b7c7b1",
    description: "Premium home loan solutions with quick approval and doorstep service.",
    benefits: ["Interest rates from 8.60%", "Loan up to Rs. 10 Crore", "Part prepayment allowed", "Dedicated relationship manager"],
    interestRate: "8.60% - 9.90%",
    processingFee: "0.50% + GST",
    tenure: "Up to 30 years",
    processingTime: "5-7 days",
    specialBenefits: "Top-up loan facility available",
    eligibility: ["Age: 21-65 years", "Min income: Rs. 30,000/month", "CIBIL: 700+"],
    applyUrl: "https://www.hdfc.com/housing-loans",
    category: "home",
    pros: ["Faster processing", "Excellent digital experience", "Flexible EMI options"],
    cons: ["Higher processing fee", "Stricter eligibility criteria"]
  },
  {
    id: "icici-home",
    name: "ICICI Home Loan",
    logo: "https://www.icicibank.com/etc.clientlibs/icicibank/clientlibs/clientlib-base/resources/images/logo.png",
    description: "Flexible home financing with instant approval and competitive rates.",
    benefits: ["Interest from 8.75%", "Digital application process", "Flexible repayment", "Insurance coverage options"],
    interestRate: "8.75% - 10.05%",
    processingFee: "0.50% + GST",
    tenure: "Up to 30 years",
    processingTime: "3-5 days",
    specialBenefits: "Instant in-principle approval",
    eligibility: ["Age: 23-65 years", "Min income: Rs. 25,000/month", "CIBIL: 680+"],
    applyUrl: "https://www.icicibank.com/personal-banking/loans/home-loan",
    category: "home",
    pros: ["Fastest approval", "Best digital experience", "Flexible terms"],
    cons: ["Slightly higher rates", "Urban focus"]
  },
  {
    id: "hdfc-personal",
    name: "HDFC Personal Loan",
    logo: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/67b37d67-8c3d-4e10-a435-8ad2f8b7c7b1",
    description: "Quick personal loans with minimal documentation and instant approval.",
    benefits: ["Loan up to Rs. 40 Lakh", "Interest from 10.50%", "No collateral required", "Quick disbursal"],
    interestRate: "10.50% - 21.00%",
    processingFee: "Up to 2.50%",
    tenure: "1-5 years",
    processingTime: "Same day",
    specialBenefits: "Pre-approved offers for existing customers",
    eligibility: ["Age: 21-60 years", "Min income: Rs. 25,000/month", "CIBIL: 700+"],
    applyUrl: "https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan",
    category: "personal",
    pros: ["Instant approval", "High loan amount", "Flexible tenure"],
    cons: ["Higher interest rates", "Processing fee applicable"]
  },
  {
    id: "icici-personal",
    name: "ICICI Personal Loan",
    logo: "https://www.icicibank.com/etc.clientlibs/icicibank/clientlibs/clientlib-base/resources/images/logo.png",
    description: "Instant personal loans with competitive rates and easy application.",
    benefits: ["Up to Rs. 50 Lakh", "Interest from 10.85%", "100% digital process", "Flexible EMI options"],
    interestRate: "10.85% - 19.00%",
    processingFee: "Up to 2.25%",
    tenure: "1-6 years",
    processingTime: "4 hours",
    specialBenefits: "Step-up EMI option available",
    eligibility: ["Age: 23-58 years", "Min income: Rs. 20,000/month", "CIBIL: 680+"],
    applyUrl: "https://www.icicibank.com/personal-banking/loans/personal-loan",
    category: "personal",
    pros: ["Quick disbursal", "Higher loan limits", "Digital process"],
    cons: ["Income criteria strict", "Limited tenure flexibility"]
  },
  {
    id: "bajaj-personal",
    name: "Bajaj Finserv Personal Loan",
    logo: "https://www.bajajfinserv.in/sites/default/files/logo.png",
    description: "Pre-approved personal loans with minimal documentation.",
    benefits: ["Loan up to Rs. 35 Lakh", "Interest from 11%", "Flexi loan option", "Part prepayment allowed"],
    interestRate: "11.00% - 22.00%",
    processingFee: "Up to 3.50%",
    tenure: "1-7 years",
    processingTime: "24 hours",
    specialBenefits: "Flexi loan with withdraw/deposit facility",
    eligibility: ["Age: 21-67 years", "Min income: Rs. 22,000/month", "CIBIL: 650+"],
    applyUrl: "https://www.bajajfinserv.in/personal-loan",
    category: "personal",
    pros: ["Flexi loan option", "Easy eligibility", "Longer tenure"],
    cons: ["Higher processing fee", "Variable rates"]
  },
  {
    id: "hdfc-business",
    name: "HDFC Business Loan",
    logo: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/67b37d67-8c3d-4e10-a435-8ad2f8b7c7b1",
    description: "Business loans for SMEs and enterprises with flexible terms.",
    benefits: ["Loan up to Rs. 50 Lakh", "Interest from 11.90%", "Collateral-free option", "Working capital support"],
    interestRate: "11.90% - 21.35%",
    processingFee: "Up to 2.00%",
    tenure: "1-4 years",
    processingTime: "3-5 days",
    specialBenefits: "Overdraft facility available",
    eligibility: ["Business age: 3+ years", "Turnover: Rs. 40 Lakh+", "CIBIL: 700+"],
    applyUrl: "https://www.hdfcbank.com/sme/borrow/working-capital-finance/business-loan",
    category: "business",
    pros: ["Flexible terms", "No collateral needed", "Quick processing"],
    cons: ["High turnover requirement", "Shorter tenure"]
  },
  {
    id: "icici-business",
    name: "ICICI Business Loan",
    logo: "https://www.icicibank.com/etc.clientlibs/icicibank/clientlibs/clientlib-base/resources/images/logo.png",
    description: "Instant business loans for growing your enterprise.",
    benefits: ["Up to Rs. 2 Crore", "Interest from 13%", "Digital application", "Flexible repayment"],
    interestRate: "13.00% - 20.00%",
    processingFee: "Up to 2.50%",
    tenure: "1-5 years",
    processingTime: "48 hours",
    specialBenefits: "GST-linked loans available",
    eligibility: ["Business age: 2+ years", "Turnover: Rs. 25 Lakh+", "CIBIL: 680+"],
    applyUrl: "https://www.icicibank.com/business-banking/loans/business-loan",
    category: "business",
    pros: ["Higher loan amount", "GST integration", "Longer tenure"],
    cons: ["Higher interest rates", "Documentation required"]
  },
  {
    id: "muthoot-gold",
    name: "Muthoot Gold Loan",
    logo: "https://www.muthootfinance.com/themes/muthoot/logo.png",
    description: "India's largest gold loan provider with instant disbursal.",
    benefits: ["Loan up to Rs. 2 Crore", "Interest from 12%", "No credit check", "Instant disbursal"],
    interestRate: "12.00% - 26.00%",
    processingFee: "1.00%",
    tenure: "3-24 months",
    processingTime: "30 minutes",
    specialBenefits: "No foreclosure charges",
    eligibility: ["Age: 18+ years", "Gold purity: 18-22 Karat", "No income proof needed"],
    applyUrl: "https://www.muthootfinance.com/gold-loan",
    category: "gold",
    pros: ["Instant disbursal", "No income proof", "Pan-India presence"],
    cons: ["Risk of gold seizure", "Higher interest rates"]
  },
  {
    id: "manappuram-gold",
    name: "Manappuram Gold Loan",
    logo: "https://www.manappuram.com/images/logo.png",
    description: "Quick gold loans with competitive rates and flexible repayment.",
    benefits: ["Loan up to Rs. 1.5 Crore", "Interest from 11%", "Multiple schemes", "Free locker facility"],
    interestRate: "11.00% - 27.00%",
    processingFee: "0.50%",
    tenure: "3-12 months",
    processingTime: "15 minutes",
    specialBenefits: "Gold ornaments insurance included",
    eligibility: ["Age: 18+ years", "Gold purity: 18-24 Karat", "Any occupation accepted"],
    applyUrl: "https://www.manappuram.com/gold-loan.html",
    category: "gold",
    pros: ["Lowest processing fee", "Insurance included", "Fast processing"],
    cons: ["Shorter tenure", "Branch visit required"]
  },
  {
    id: "sbi-education",
    name: "SBI Education Loan",
    logo: "https://www.sbi.co.in/webfiles/uploads/images/sbi_logo.png",
    description: "Comprehensive education loans for studies in India and abroad.",
    benefits: ["Loan up to Rs. 1.5 Crore", "Interest from 8.65%", "Moratorium period", "Tax benefits under Section 80E"],
    interestRate: "8.65% - 10.50%",
    processingFee: "Nil",
    tenure: "Up to 15 years",
    processingTime: "7-10 days",
    specialBenefits: "Interest subsidy for EWS students",
    eligibility: ["Age: 18-35 years", "Admission in recognized institution", "Co-borrower required"],
    applyUrl: "https://sbi.co.in/web/personal-banking/loans/education-loans",
    category: "education",
    pros: ["Lowest rates", "No processing fee", "Long repayment tenure"],
    cons: ["Collateral for high amounts", "Slower processing"]
  },
  {
    id: "hdfc-education",
    name: "HDFC Credila Education Loan",
    logo: "https://www.hdfccredila.com/images/logo.png",
    description: "Specialized education loans with 100% course financing.",
    benefits: ["Loan up to Rs. 75 Lakh", "Interest from 9.55%", "100% financing", "Quick sanction"],
    interestRate: "9.55% - 13.25%",
    processingFee: "1.00%",
    tenure: "Up to 12 years",
    processingTime: "5-7 days",
    specialBenefits: "Covers living expenses and travel",
    eligibility: ["Age: 16-35 years", "Valid admission letter", "Good academic record"],
    applyUrl: "https://www.hdfccredila.com/",
    category: "education",
    pros: ["100% course coverage", "Covers all expenses", "Flexible repayment"],
    cons: ["Higher interest than PSU banks", "Processing fee applicable"]
  },
  {
    id: "hdfc-regalia",
    name: "HDFC Regalia Credit Card",
    logo: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/67b37d67-8c3d-4e10-a435-8ad2f8b7c7b1",
    description: "Premium credit card with exceptional travel and lifestyle benefits.",
    benefits: ["4 reward points per Rs. 150", "Lounge access worldwide", "Golf privileges", "Concierge services"],
    interestRate: "3.49% per month",
    processingFee: "Rs. 2,500 + GST",
    tenure: "N/A",
    processingTime: "3-5 days",
    specialBenefits: "Complimentary Priority Pass membership",
    eligibility: ["Age: 21-60 years", "Income: Rs. 12 Lakh+/year", "Good credit history"],
    applyUrl: "https://www.hdfcbank.com/personal/pay/cards/credit-cards/regalia-credit-card",
    category: "creditcard",
    pros: ["Best travel rewards", "Premium lounge access", "Comprehensive insurance"],
    cons: ["High annual fee", "High income requirement"]
  },
  {
    id: "sbi-cashback",
    name: "SBI Cashback Credit Card",
    logo: "https://www.sbi.co.in/webfiles/uploads/images/sbi_logo.png",
    description: "Unlimited 5% cashback on online spends with no capping.",
    benefits: ["5% cashback on online", "1% cashback on other spends", "Fuel surcharge waiver", "No reward redemption hassle"],
    interestRate: "3.35% per month",
    processingFee: "Rs. 999 + GST",
    tenure: "N/A",
    processingTime: "7-10 days",
    specialBenefits: "Auto-credit cashback to statement",
    eligibility: ["Age: 21-60 years", "Income: Rs. 6 Lakh+/year", "CIBIL: 700+"],
    applyUrl: "https://www.sbicard.com/en/personal/credit-cards/shopping/cashback-sbi-card.page",
    category: "creditcard",
    pros: ["Unlimited cashback", "No points tracking", "Low annual fee"],
    cons: ["Limited travel benefits", "Lower rewards on offline"]
  },
  {
    id: "amex-platinum",
    name: "American Express Platinum",
    logo: "https://www.americanexpress.com/content/dam/amex/in/staticassets/brand/logo/amex-logo.svg",
    description: "Ultra-premium card with exclusive experiences and unmatched privileges.",
    benefits: ["Taj Epicure membership", "Marriott Bonvoy Gold", "Global lounge network", "Premium hotel programs"],
    interestRate: "3.50% per month",
    processingFee: "Rs. 60,000 + GST",
    tenure: "N/A",
    processingTime: "5-7 days",
    specialBenefits: "Rs. 60,000+ in annual benefits",
    eligibility: ["Age: 21-65 years", "Income: Rs. 24 Lakh+/year", "Excellent credit"],
    applyUrl: "https://www.americanexpress.com/in/credit-cards/platinum-card/",
    category: "creditcard",
    pros: ["Unmatched luxury benefits", "Best hotel program", "Concierge service"],
    cons: ["Very high annual fee", "Limited acceptance"]
  },
  {
    id: "axis-ace",
    name: "Axis Bank ACE Credit Card",
    logo: "https://www.axisbank.com/assets/images/logo.png",
    description: "Best-in-class cashback on utility bills and everyday spends.",
    benefits: ["5% cashback on bill payments", "4% on Swiggy, Zomato", "2% on everything else", "Welcome voucher worth Rs. 500"],
    interestRate: "3.40% per month",
    processingFee: "Rs. 499 + GST",
    tenure: "N/A",
    processingTime: "3-5 days",
    specialBenefits: "Google Pay integration for extra rewards",
    eligibility: ["Age: 21-60 years", "Income: Rs. 4.5 Lakh+/year", "CIBIL: 680+"],
    applyUrl: "https://www.axisbank.com/retail/cards/credit-card/axis-bank-ace-credit-card",
    category: "creditcard",
    pros: ["Best for bills", "Low annual fee", "Easy to get"],
    cons: ["Capped rewards", "Limited travel perks"]
  }
];

const categoryConfig = [
  { id: "home", labelKey: "loans.tabs.home", icon: Home },
  { id: "personal", labelKey: "loans.tabs.personal", icon: User },
  { id: "business", labelKey: "loans.tabs.business", icon: Briefcase },
  { id: "gold", labelKey: "loans.tabs.gold", icon: Coins },
  { id: "education", labelKey: "loans.tabs.education", icon: GraduationCap },
  { id: "creditcard", labelKey: "loans.tabs.creditcard", icon: CreditCard }
];

function EMICalculator() {
  const { t } = useLanguage();
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenure, setTenure] = useState(12);

  const calculations = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    const totalAmount = emi * tenure;
    const totalInterest = totalAmount - loanAmount;
    
    return {
      emi: isNaN(emi) ? 0 : Math.round(emi),
      totalInterest: isNaN(totalInterest) ? 0 : Math.round(totalInterest),
      totalAmount: isNaN(totalAmount) ? 0 : Math.round(totalAmount)
    };
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          {t("loans.emiCalculator")}
        </CardTitle>
        <CardDescription>{t("loans.emiCalculatorDesc")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label className="flex justify-between">
              {t("loans.loanAmount")}
              <span className="text-primary font-semibold">{formatCurrency(loanAmount)}</span>
            </Label>
            <Slider
              value={[loanAmount]}
              onValueChange={(v) => setLoanAmount(v[0])}
              min={100000}
              max={10000000}
              step={50000}
              data-testid="slider-loan-amount"
            />
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="mt-2"
              data-testid="input-loan-amount"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between">
              {t("loans.interestRateLabel")}
              <span className="text-primary font-semibold">{interestRate}%</span>
            </Label>
            <Slider
              value={[interestRate]}
              onValueChange={(v) => setInterestRate(v[0])}
              min={5}
              max={30}
              step={0.25}
              data-testid="slider-interest-rate"
            />
            <Input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-2"
              step="0.25"
              data-testid="input-interest-rate"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex justify-between">
              {t("loans.tenureMonths")}
              <span className="text-primary font-semibold">{tenure}</span>
            </Label>
            <Slider
              value={[tenure]}
              onValueChange={(v) => setTenure(v[0])}
              min={6}
              max={360}
              step={6}
              data-testid="slider-tenure"
            />
            <Input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="mt-2"
              data-testid="input-tenure"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">{t("loans.monthlyEmi")}</p>
            <p className="text-2xl font-bold text-primary" data-testid="text-monthly-emi">
              {formatCurrency(calculations.emi)}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">{t("loans.totalInterest")}</p>
            <p className="text-2xl font-bold text-orange-500" data-testid="text-total-interest">
              {formatCurrency(calculations.totalInterest)}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">{t("loans.totalAmount")}</p>
            <p className="text-2xl font-bold text-green-600" data-testid="text-total-amount">
              {formatCurrency(calculations.totalAmount)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProviderCard({ provider, isSelected, onToggleCompare }: { 
  provider: Provider; 
  isSelected: boolean;
  onToggleCompare: (id: string) => void;
}) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className={`h-full transition-all duration-200 ${isSelected ? 'ring-2 ring-primary' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-lg p-2 flex items-center justify-center border">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">{provider.name}</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {provider.interestRate}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`compare-${provider.id}`}
                checked={isSelected}
                onCheckedChange={() => onToggleCompare(provider.id)}
                data-testid={`checkbox-compare-${provider.id}`}
              />
              <Label htmlFor={`compare-${provider.id}`} className="text-xs text-muted-foreground cursor-pointer">
                {t("loans.compare")}
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{provider.description}</p>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Key Benefits:</p>
            <ul className="space-y-1">
              {provider.benefits.slice(0, 4).map((benefit, i) => (
                <li key={i} className="text-sm flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Processing:</span>
              <span className="font-medium">{provider.processingFee}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Time:</span>
              <span className="font-medium">{provider.processingTime}</span>
            </div>
          </div>

          <div className="bg-accent/50 rounded-lg p-3">
            <p className="text-sm">
              <TrendingUp className="w-4 h-4 inline mr-1 text-primary" />
              <strong>Special:</strong> {provider.specialBenefits}
            </p>
          </div>

          <Button asChild className="w-full gap-2">
            <a 
              href={provider.applyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              data-testid={`button-apply-${provider.id}`}
            >
              {t("loans.applyNow")}
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            You will be redirected to the official website
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ComparisonTable({ selectedProviders }: { selectedProviders: Provider[] }) {
  const { t } = useLanguage();
  if (selectedProviders.length < 2) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="py-8 text-center">
          <Scale className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">{t("loans.selectAtLeast2")}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scale className="w-5 h-5" />
          {t("loans.comparison")} ({selectedProviders.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-medium">{t("loans.feature")}</th>
              {selectedProviders.map(p => (
                <th key={p.id} className="text-center p-3 font-medium min-w-[180px]">
                  <div className="flex flex-col items-center gap-2">
                    <Building2 className="w-8 h-8 text-primary" />
                    <span>{p.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3 font-medium">{t("loans.interestRate")}</td>
              {selectedProviders.map(p => (
                <td key={p.id} className="text-center p-3">{p.interestRate}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium">{t("loans.processingFee")}</td>
              {selectedProviders.map(p => (
                <td key={p.id} className="text-center p-3">{p.processingFee}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium">{t("loans.tenure")}</td>
              {selectedProviders.map(p => (
                <td key={p.id} className="text-center p-3">{p.tenure}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-3 font-medium">{t("loans.processingTime")}</td>
              {selectedProviders.map(p => (
                <td key={p.id} className="text-center p-3">{p.processingTime}</td>
              ))}
            </tr>
            <tr className="border-b bg-green-50 dark:bg-green-900/20">
              <td className="p-3 font-medium text-green-700 dark:text-green-300">{t("loans.pros")}</td>
              {selectedProviders.map(p => (
                <td key={p.id} className="p-3">
                  <ul className="space-y-1">
                    {p.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1 text-xs">
                        <Check className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr className="bg-red-50 dark:bg-red-900/20">
              <td className="p-3 font-medium text-red-700 dark:text-red-300">{t("loans.cons")}</td>
              {selectedProviders.map(p => (
                <td key={p.id} className="p-3">
                  <ul className="space-y-1">
                    {p.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1 text-xs">
                        <X className="w-3 h-3 text-red-500 shrink-0 mt-0.5" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-3 font-medium">{t("loans.applyNow")}</td>
              {selectedProviders.map(p => (
                <td key={p.id} className="text-center p-3">
                  <Button asChild size="sm">
                    <a href={p.applyUrl} target="_blank" rel="noopener noreferrer">
                      {t("loans.applyNow")} <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

export default function LoansAndCreditCards() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("home");
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setSelectedForCompare(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const filteredProviders = providers.filter(p => p.category === activeCategory);
  const selectedProviders = providers.filter(p => selectedForCompare.includes(p.id));

  const clearComparison = () => setSelectedForCompare([]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge variant="outline" className="mb-4">
            {t("nav.tools")}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4" data-testid="heading-loans-creditcards">
            {t("loans.title")}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("loans.subtitle")}
          </p>
        </motion.div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent">
            {categoryConfig.map((cat) => {
              const Icon = cat.icon;
              return (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid={`tab-${cat.id}`}
                >
                  <Icon className="w-4 h-4" />
                  {t(cat.labelKey)}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categoryConfig.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    isSelected={selectedForCompare.includes(provider.id)}
                    onToggleCompare={toggleCompare}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {selectedForCompare.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
              <h2 className="text-xl font-semibold">{t("loans.compareSelected")}</h2>
              <Button variant="outline" size="sm" onClick={clearComparison}>
                {t("common.close")}
              </Button>
            </div>
            <ComparisonTable selectedProviders={selectedProviders} />
          </motion.div>
        )}

        <div className="mb-8">
          <EMICalculator />
        </div>

        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200">{t("loans.disclaimer")}</h3>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {t("loans.disclaimerText")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
