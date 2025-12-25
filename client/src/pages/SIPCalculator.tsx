import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
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
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  PiggyBank,
  TrendingUp,
  Calculator,
  CheckCircle2,
  ArrowRight,
  IndianRupee,
  Calendar,
  Percent,
  Target,
  ShieldCheck,
  Sparkles,
  Clock,
  Wallet,
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
  if (value >= 10000000) {
    return `${(value / 10000000).toFixed(2)} Cr`;
  } else if (value >= 100000) {
    return `${(value / 100000).toFixed(2)} L`;
  }
  return value.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

function AnimatedValue({ value, prefix = "" }: { value: number; prefix?: string }) {
  return (
    <span className="tabular-nums transition-all duration-300">
      {prefix}{formatCurrency(value)}
    </span>
  );
}

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [timePeriod, setTimePeriod] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [showContactModal, setShowContactModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      message: "",
    },
  });

  const calculateSIP = () => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timePeriod * 12;
    const futureValue =
      monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    const totalInvestment = monthlyInvestment * months;
    const totalReturns = futureValue - totalInvestment;
    const wealthGained = ((futureValue - totalInvestment) / totalInvestment) * 100;
    return { futureValue, totalInvestment, totalReturns, wealthGained };
  };

  const result = calculateSIP();

  const chartData = [
    { name: "Invested Amount", value: result.totalInvestment, color: "#3B82F6" },
    { name: "Est. Returns", value: result.totalReturns, color: "#10B981" },
  ];

  const onSubmit = async (data: ContactFormData) => {
    try {
      const sipDetails = `SIP: Rs.${monthlyInvestment.toLocaleString()}/month for ${timePeriod} years at ${expectedReturn}% (Est. Value: Rs.${formatCurrency(result.futureValue)})`;
      const notes = data.message 
        ? `${data.message}\n\n${sipDetails}`
        : sipDetails;

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          mobile: data.mobile,
          email: data.email,
          experience: "beginner",
          source: "sip_calculator",
          notes: notes,
        }),
      });

      if (response.ok) {
        setFormSubmitted(true);
        toast({
          title: "Thank you for your interest!",
          description: "Our team will contact you shortly.",
        });
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleStartInvesting = () => {
    setShowContactModal(true);
    setFormSubmitted(false);
    form.reset();
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Financial Calculator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            SIP Calculator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Plan your investments with our SIP calculator. See how small, regular investments
            can grow into significant wealth over time.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          <Card className="lg:col-span-3 shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10">
                  <PiggyBank className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <CardTitle className="text-xl">Calculate Your Returns</CardTitle>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Adjust the sliders to see your potential returns
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-muted-foreground" />
                      <Label className="text-sm font-medium">Monthly Investment</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(Math.max(100, Math.min(200000, Number(e.target.value))))}
                        className="w-32 h-9 text-right font-semibold"
                        data-testid="input-monthly-investment"
                      />
                    </div>
                  </div>
                  <Slider
                    value={[monthlyInvestment]}
                    onValueChange={(v) => setMonthlyInvestment(v[0])}
                    min={100}
                    max={200000}
                    step={100}
                    className="py-2"
                    data-testid="slider-monthly-investment"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>100</span>
                    <span>2L</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <Label className="text-sm font-medium">Investment Period</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(Math.max(1, Math.min(40, Number(e.target.value))))}
                        className="w-20 h-9 text-right font-semibold"
                        data-testid="input-time-period"
                      />
                      <span className="text-sm text-muted-foreground">Years</span>
                    </div>
                  </div>
                  <Slider
                    value={[timePeriod]}
                    onValueChange={(v) => setTimePeriod(v[0])}
                    min={1}
                    max={40}
                    step={1}
                    className="py-2"
                    data-testid="slider-time-period"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1 Yr</span>
                    <span>40 Yrs</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Percent className="w-4 h-4 text-muted-foreground" />
                      <Label className="text-sm font-medium">Expected Return (p.a.)</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(Math.max(1, Math.min(30, Number(e.target.value))))}
                        className="w-20 h-9 text-right font-semibold"
                        data-testid="input-expected-return"
                      />
                      <span className="text-sm text-muted-foreground">%</span>
                    </div>
                  </div>
                  <Slider
                    value={[expectedReturn]}
                    onValueChange={(v) => setExpectedReturn(v[0])}
                    min={1}
                    max={30}
                    step={0.5}
                    className="py-2"
                    data-testid="slider-expected-return"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <Button
                  size="lg"
                  className="w-full h-12 text-base gap-2"
                  onClick={handleStartInvesting}
                  data-testid="button-start-investing"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Investing
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 shadow-lg border-0 bg-card/80 backdrop-blur">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">Your Returns</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      animationDuration={500}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`₹${formatCurrency(value)}`, ""]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-xs text-muted-foreground">Invested</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-muted-foreground">Returns</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Invested Amount</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    <AnimatedValue value={result.totalInvestment} prefix="₹" />
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-500/10">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-muted-foreground">Est. Returns</span>
                  </div>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    <AnimatedValue value={result.totalReturns} prefix="+₹" />
                  </span>
                </div>

                <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="font-medium">Total Value</span>
                  </div>
                  <span className="text-xl font-bold text-primary">
                    <AnimatedValue value={result.futureValue} prefix="₹" />
                  </span>
                </div>

                <div className="text-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    Wealth gained: <span className="text-emerald-600 font-medium">{result.wealthGained.toFixed(0)}%</span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 border-0 shadow-md bg-card/80">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 shrink-0">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Power of Compounding</h3>
                <p className="text-sm text-muted-foreground">
                  Start early and let your money work for you. Even small amounts grow significantly over time.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-md bg-card/80">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Rupee Cost Averaging</h3>
                <p className="text-sm text-muted-foreground">
                  SIP helps you buy more units when prices are low and fewer when high, averaging your cost.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-md bg-card/80">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 shrink-0">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Disciplined Investing</h3>
                <p className="text-sm text-muted-foreground">
                  Regular investments build financial discipline and help you stay committed to your goals.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-12">
          <Card className="p-8 border-0 shadow-lg bg-card/80">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calculator className="w-5 h-5 text-primary" />
              </div>
              What is SIP?
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                A Systematic Investment Plan (SIP) is a smart and disciplined way of investing in mutual funds.
                Instead of investing a lump sum amount, you invest a fixed sum regularly (usually monthly).
                This approach helps you benefit from rupee cost averaging and the power of compounding.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                SIP is ideal for retail investors who want to build wealth over time without worrying about
                market timing. You can start with as little as Rs. 500 per month and increase it as your
                income grows.
              </p>
            </div>
          </Card>

          <Card className="p-8 border-0 shadow-lg bg-card/80">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              How SIP Calculator Works
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our SIP calculator uses the compound interest formula to estimate your returns:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm mb-4">
                M = P × ({`{(1 + r)^n - 1}`} / r) × (1 + r)
              </div>
              <ul className="text-muted-foreground space-y-2">
                <li><strong>M</strong> = Maturity amount (final corpus)</li>
                <li><strong>P</strong> = Monthly investment amount</li>
                <li><strong>r</strong> = Monthly rate of return (annual rate / 12 / 100)</li>
                <li><strong>n</strong> = Total number of payments (years × 12)</li>
              </ul>
            </div>
          </Card>

          <Card className="p-8 border-0 shadow-lg bg-card/80">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
              </div>
              Benefits of SIP Investment
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Start Small", desc: "Begin with just Rs. 500/month and increase gradually" },
                { title: "No Market Timing", desc: "Invest regularly without worrying about market ups and downs" },
                { title: "Rupee Cost Averaging", desc: "Average out your investment cost over time" },
                { title: "Power of Compounding", desc: "Earn returns on your returns for exponential growth" },
                { title: "Financial Discipline", desc: "Build a habit of regular savings and investing" },
                { title: "Flexibility", desc: "Pause, stop, or modify your SIP anytime" },
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-8 border-0 shadow-lg bg-card/80">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <IndianRupee className="w-5 h-5 text-purple-600" />
              </div>
              Example Calculation
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Let's say you invest <strong>Rs. 10,000 per month</strong> for <strong>20 years</strong> with
                an expected annual return of <strong>12%</strong>:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly SIP:</span>
                  <span className="font-semibold">Rs. 10,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Investment Period:</span>
                  <span className="font-semibold">20 years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Investment:</span>
                  <span className="font-semibold">Rs. 24,00,000</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-muted-foreground">Estimated Returns:</span>
                  <span className="font-semibold text-emerald-600">Rs. 75,91,479</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Total Value:</span>
                  <span className="font-bold text-primary">Rs. 99,91,479</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This shows how a monthly investment of Rs. 10,000 can grow to almost Rs. 1 Crore over 20 years,
                with Rs. 75 lakh coming purely from returns!
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Start Your Investment Journey
            </DialogTitle>
            <DialogDescription>
              Fill in your details and our investment advisor will contact you.
            </DialogDescription>
          </DialogHeader>

          {formSubmitted ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Thank You!</h3>
              <p className="text-muted-foreground">
                We've received your request. Our investment advisor will contact you shortly.
              </p>
              <Button
                className="mt-6"
                onClick={() => setShowContactModal(false)}
                data-testid="button-close-modal"
              >
                Close
              </Button>
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
                        <Input placeholder="Enter your full name" {...field} data-testid="input-contact-name" />
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
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} data-testid="input-contact-email" />
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
                        <Textarea
                          placeholder="Tell us about your investment goals..."
                          className="resize-none"
                          {...field}
                          data-testid="input-contact-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                  data-testid="button-submit-contact"
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
