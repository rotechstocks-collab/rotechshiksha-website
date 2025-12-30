import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Upload,
  CheckCircle,
  Copy,
  QrCode,
  Building2,
  CreditCard,
  Loader2,
  ArrowLeft,
  Star,
  Zap,
  Crown,
} from "lucide-react";
import { Link } from "wouter";

const plans = {
  basic: {
    name: "Starter",
    price: 99,
    icon: <Zap className="w-6 h-6" />,
    features: ["1 AI stock analysis", "1 hour live session", "Q&A with expert", "Priority support"],
  },
  pro: {
    name: "Pro",
    price: 999,
    icon: <Crown className="w-6 h-6" />,
    features: [
      "1 month live market learning",
      "Daily strategy explanation",
      "Algo trading introduction",
      "Risk & psychology training",
      "Certificate of completion",
    ],
  },
};

export default function Payment() {
  const [, params] = useRoute("/payment/:planId");
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, setShowAuthPopup } = useAuth();
  const { toast } = useToast();
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const planId = params?.planId as keyof typeof plans;
  const plan = plans[planId];

  if (!isAuthenticated) {
    return (
      <div className="page-bg flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-muted-foreground">Please login to continue with payment</p>
            <Button onClick={() => setShowAuthPopup(true)} data-testid="button-login-payment">
              Login to Continue
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="page-bg flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-muted-foreground">Invalid plan selected</p>
            <Link href="/pricing">
              <Button data-testid="button-back-pricing">Back to Pricing</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
    }
  };

  const handleSubmit = async () => {
    if (!screenshot) {
      toast({
        title: "Error",
        description: "Please upload payment screenshot",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Convert file to base64 for storage
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      reader.readAsDataURL(screenshot);
      const base64Data = await base64Promise;

      const response = await apiRequest("POST", "/api/payments", {
        planId,
        amount: plan.price,
        screenshotUrl: base64Data,
        fileName: screenshot.name,
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Payment Submitted!",
          description: "We'll verify and activate your plan within 24 hours.",
        });
      } else {
        throw new Error("Failed to submit payment");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  if (isSubmitted) {
    return (
      <div className="page-bg flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">Payment Submitted!</h2>
              <p className="text-muted-foreground">
                Thank you for your payment. Our team will verify it and activate your {plan.name} plan within 24 hours.
              </p>
            </div>
            <div className="pt-4 space-y-3">
              <Link href="/dashboard">
                <Button className="w-full" data-testid="button-go-dashboard">
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full" data-testid="button-go-home">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="page-bg">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        <Link href="/pricing">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pricing
          </Button>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  {plan.icon}
                </div>
                <div>
                  <CardTitle>{plan.name} Plan</CardTitle>
                  <CardDescription>One-time payment</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-4xl font-bold text-foreground">₹{plan.price}</div>

              <div className="space-y-3">
                <p className="font-medium text-foreground">What you get:</p>
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Details</CardTitle>
                <CardDescription>Make payment using any method below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-primary" />
                    <span className="font-medium">UPI ID</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <span className="flex-1 font-mono text-sm">rotech@upi</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard("rotech@upi", "UPI ID")}
                      data-testid="button-copy-upi"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-primary" />
                    <span className="font-medium">Bank Transfer</span>
                  </div>
                  <div className="space-y-2 p-3 bg-muted rounded-lg text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account Name:</span>
                      <span className="font-medium">Rotech Shiksha</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account No:</span>
                      <span className="font-mono">1234567890123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IFSC:</span>
                      <span className="font-mono">HDFC0001234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bank:</span>
                      <span>HDFC Bank</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upload Payment Screenshot</CardTitle>
                <CardDescription>
                  After making payment, upload the screenshot for verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="screenshot">Payment Screenshot</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    {screenshot ? (
                      <div className="space-y-2">
                        <CheckCircle className="w-8 h-8 mx-auto text-emerald-500" />
                        <p className="text-sm font-medium">{screenshot.name}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setScreenshot(null)}
                        >
                          Change file
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer space-y-2 block">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <input
                          id="screenshot"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                          data-testid="input-screenshot"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={!screenshot || isSubmitting}
                  data-testid="button-submit-payment"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Payment"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
