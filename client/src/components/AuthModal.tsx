import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { leadFormSchema, otpVerifySchema, type LeadFormData, type OtpVerifyData } from "@shared/schema";
import { Loader2, Phone, CheckCircle, Shield, TrendingUp } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

type Step = "details" | "otp" | "success";

export function AuthModal() {
  const { showAuthPopup, setShowAuthPopup, login, pendingAction } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>("details");
  const [mobile, setMobile] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);

  const detailsForm = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fullName: "",
      mobile: "",
      email: "",
      experience: "beginner",
      investmentRange: "",
    },
  });

  const otpForm = useForm<OtpVerifyData>({
    resolver: zodResolver(otpVerifySchema),
    defaultValues: {
      mobile: "",
      otp: "",
    },
  });

  const handleDetailsSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/auth/send-otp", data);
      const result = await response.json();
      if (response.ok) {
        setMobile(data.mobile);
        otpForm.setValue("mobile", data.mobile);
        setIsTestMode(result.testMode || false);
        setStep("otp");
        toast({
          title: "OTP Sent!",
          description: result.testOtpHint || `OTP sent to +91 ${data.mobile}`,
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpSubmit = async (data: OtpVerifyData) => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/auth/verify-otp", {
        mobile: mobile,
        otp: data.otp,
      });
      const result = await response.json();
      if (response.ok) {
        login(result);
        setStep("success");
        toast({
          title: "Login Successful!",
          description: "Welcome to Rotech Shiksha!",
        });
        setTimeout(() => {
          setShowAuthPopup(false);
          setStep("details");
          setIsTestMode(false);
          detailsForm.reset();
          otpForm.reset();
        }, 1500);
      } else {
        toast({
          title: "OTP Verification Failed",
          description: result.message || "Please enter the correct OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Verification failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setIsSubmitting(true);
    try {
      const response = await apiRequest("POST", "/api/auth/resend-otp", { mobile });
      if (response.ok) {
        toast({
          title: "OTP Resent!",
          description: `New OTP sent to +91 ${mobile}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend OTP",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setShowAuthPopup(false);
    setStep("details");
    setIsTestMode(false);
    detailsForm.reset();
    otpForm.reset();
  };

  return (
    <Dialog open={showAuthPopup} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === "details" && (
          <>
            <DialogHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <DialogTitle className="text-xl">Start Learning Stock Market</DialogTitle>
              <DialogDescription>
                {pendingAction
                  ? `Complete registration to ${pendingAction}`
                  : "100% Free Learning | No Spam"}
              </DialogDescription>
            </DialogHeader>

            <Form {...detailsForm}>
              <form onSubmit={detailsForm.handleSubmit(handleDetailsSubmit)} className="space-y-4">
                <FormField
                  control={detailsForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          data-testid="input-full-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={detailsForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            +91
                          </span>
                          <Input
                            placeholder="9876543210"
                            className="pl-12"
                            maxLength={10}
                            {...field}
                            data-testid="input-mobile"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={detailsForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={detailsForm.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Market Experience</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-experience">
                            <SelectValue placeholder="Select your experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={detailsForm.control}
                  name="investmentRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Investment Range (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-investment">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="below-50k">Below 50,000</SelectItem>
                          <SelectItem value="50k-1l">50,000 - 1 Lakh</SelectItem>
                          <SelectItem value="1l-5l">1 Lakh - 5 Lakhs</SelectItem>
                          <SelectItem value="5l-10l">5 Lakhs - 10 Lakhs</SelectItem>
                          <SelectItem value="above-10l">Above 10 Lakhs</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  data-testid="button-submit-details"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <Phone className="mr-2 h-4 w-4" />
                      Continue with Mobile
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  Your information is secure and will not be shared
                </p>
              </form>
            </Form>
          </>
        )}

        {step === "otp" && (
          <>
            <DialogHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <DialogTitle className="text-xl">Verify Your Mobile</DialogTitle>
              <DialogDescription>
                Enter the 6-digit OTP sent to +91 {mobile}
              </DialogDescription>
              {isTestMode && (
                <div className="mt-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                    Testing Mode: Use OTP 123456
                  </p>
                  <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    SMS not configured. Use test OTP to continue.
                  </p>
                </div>
              )}
            </DialogHeader>

            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-6">
                <FormField
                  control={otpForm.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={field.onChange}
                          data-testid="input-otp"
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                  data-testid="button-verify-otp"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Continue"
                  )}
                </Button>

                <div className="flex items-center justify-between text-sm">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setStep("details")}
                    data-testid="button-change-number"
                  >
                    Change Number
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendOtp}
                    disabled={isSubmitting}
                    data-testid="button-resend-otp"
                  >
                    Resend OTP
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}

        {step === "success" && (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-500" />
            </div>
            <DialogTitle className="text-xl">Welcome!</DialogTitle>
            <DialogDescription>
              You are now logged in. Start your stock market learning journey!
            </DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
