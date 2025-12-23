import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Rocket,
  Building2,
  TrendingUp,
  Users,
  FileText,
  Upload,
  CheckCircle,
  Loader2,
  IndianRupee,
  Briefcase,
  Mail,
  Phone,
  Eye,
  Heart,
} from "lucide-react";
import type { Startup, Investor } from "@shared/schema";

const industries = [
  "Fintech",
  "EdTech",
  "HealthTech",
  "AgriTech",
  "E-commerce",
  "SaaS",
  "AI/ML",
  "CleanTech",
  "Logistics",
  "Real Estate",
  "Media & Entertainment",
  "Other",
];

const stages = [
  { value: "idea", label: "Idea Stage" },
  { value: "early", label: "Early Stage (MVP)" },
  { value: "growth", label: "Growth Stage" },
];

const investmentRanges = [
  "Under 10 Lakhs",
  "10-50 Lakhs",
  "50 Lakhs - 1 Crore",
  "1-5 Crores",
  "5-10 Crores",
  "Above 10 Crores",
];

export default function StartupConnect() {
  const { user, isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("browse");
  const [startupFormSubmitted, setStartupFormSubmitted] = useState(false);
  const [investorFormSubmitted, setInvestorFormSubmitted] = useState(false);

  const [startupForm, setStartupForm] = useState({
    startupName: "",
    founderName: "",
    mobile: user?.mobile || "",
    email: "",
    industry: "",
    investmentRequired: "",
    businessModel: "",
    revenueProjection: "",
    stage: "",
    pitchDeckUrl: "",
  });

  const [investorForm, setInvestorForm] = useState({
    name: "",
    mobile: user?.mobile || "",
    email: "",
    investmentAmountRange: "",
    interestedIndustry: "",
    investmentType: "",
  });

  const { data: liveStartups = [], isLoading: loadingStartups } = useQuery<Startup[]>({
    queryKey: ["/api/startups"],
  });

  const { data: investorProfile } = useQuery<Investor | null>({
    queryKey: ["/api/investors/me"],
    enabled: isAuthenticated,
  });

  const submitStartup = useMutation({
    mutationFn: async (data: typeof startupForm) => {
      const res = await apiRequest("POST", "/api/startups", {
        ...data,
        investmentRequired: parseInt(data.investmentRequired) || 0,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Startup Listed!", description: "Your startup is under review." });
      setStartupFormSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/startups"] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const submitInvestor = useMutation({
    mutationFn: async (data: typeof investorForm) => {
      const res = await apiRequest("POST", "/api/investors", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Registered!", description: "You can now browse and invest in startups." });
      setInvestorFormSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ["/api/investors/me"] });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const markInterest = useMutation({
    mutationFn: async (startupId: string) => {
      const res = await apiRequest("POST", "/api/investor-interests", { startupId });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Interest Marked!", description: "The startup founder will be notified." });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const handleStartupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setPendingAction("list your startup");
      setShowAuthPopup(true);
      return;
    }
    submitStartup.mutate(startupForm);
  };

  const handleInvestorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setPendingAction("register as investor");
      setShowAuthPopup(true);
      return;
    }
    submitInvestor.mutate(investorForm);
  };

  const handleMarkInterest = (startupId: string) => {
    if (!isAuthenticated) {
      setPendingAction("show interest in startup");
      setShowAuthPopup(true);
      return;
    }
    if (!investorProfile) {
      toast({ title: "Register First", description: "Please register as an investor to show interest", variant: "destructive" });
      setActiveTab("investor");
      return;
    }
    markInterest.mutate(startupId);
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <Badge className="mb-4">Tata Funding / Startup Connect</Badge>
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Connect Startups with Investors
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            List your startup for funding or invest in promising Indian startups.
            A platform to bridge the gap between innovative ideas and capital.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" onClick={() => setActiveTab("startup")} data-testid="button-list-startup">
              <Rocket className="w-5 h-5 mr-2" />
              List Your Startup
            </Button>
            <Button size="lg" variant="outline" onClick={() => setActiveTab("investor")} data-testid="button-become-investor">
              <TrendingUp className="w-5 h-5 mr-2" />
              Invest in Startups
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="browse" data-testid="tab-browse">
                <Building2 className="w-4 h-4 mr-2" />
                Browse Startups
              </TabsTrigger>
              <TabsTrigger value="startup" data-testid="tab-startup">
                <Rocket className="w-4 h-4 mr-2" />
                List Startup
              </TabsTrigger>
              <TabsTrigger value="investor" data-testid="tab-investor">
                <TrendingUp className="w-4 h-4 mr-2" />
                Become Investor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="browse">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Live Startups</h2>
                  <Badge variant="secondary">{liveStartups.length} Active</Badge>
                </div>

                {loadingStartups ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : liveStartups.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <Rocket className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No startups listed yet. Be the first to list!</p>
                      <Button className="mt-4" onClick={() => setActiveTab("startup")}>
                        List Your Startup
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {liveStartups.map((startup) => (
                      <Card key={startup.id} data-testid={`card-startup-${startup.id}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <CardTitle className="text-xl">{startup.startupName}</CardTitle>
                              <CardDescription>{startup.founderName}</CardDescription>
                            </div>
                            <Badge>{startup.industry}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {startup.businessModel}
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <IndianRupee className="w-4 h-4 text-muted-foreground" />
                              <span>{(startup.investmentRequired / 100000).toFixed(0)} Lakhs</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-muted-foreground" />
                              <span className="capitalize">{startup.stage} Stage</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleMarkInterest(startup.id)}
                            data-testid={`button-interest-${startup.id}`}
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            Interested
                          </Button>
                          {startup.pitchDeckUrl && (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={startup.pitchDeckUrl} target="_blank" rel="noopener noreferrer">
                                <FileText className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="startup">
              {startupFormSubmitted ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Startup Submitted!</h3>
                    <p className="text-muted-foreground">
                      Your startup listing is under review. We'll notify you once it's approved.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>List Your Startup</CardTitle>
                    <CardDescription>Fill in the details to get your startup listed for investors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleStartupSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startupName">Startup Name *</Label>
                          <Input
                            id="startupName"
                            value={startupForm.startupName}
                            onChange={(e) => setStartupForm({ ...startupForm, startupName: e.target.value })}
                            required
                            data-testid="input-startup-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="founderName">Founder Name *</Label>
                          <Input
                            id="founderName"
                            value={startupForm.founderName}
                            onChange={(e) => setStartupForm({ ...startupForm, founderName: e.target.value })}
                            required
                            data-testid="input-founder-name"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile Number *</Label>
                          <Input
                            id="mobile"
                            value={startupForm.mobile}
                            onChange={(e) => setStartupForm({ ...startupForm, mobile: e.target.value })}
                            required
                            data-testid="input-startup-mobile"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={startupForm.email}
                            onChange={(e) => setStartupForm({ ...startupForm, email: e.target.value })}
                            required
                            data-testid="input-startup-email"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Industry / Sector *</Label>
                          <Select
                            value={startupForm.industry}
                            onValueChange={(value) => setStartupForm({ ...startupForm, industry: value })}
                          >
                            <SelectTrigger data-testid="select-industry">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              {industries.map((ind) => (
                                <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Stage *</Label>
                          <Select
                            value={startupForm.stage}
                            onValueChange={(value) => setStartupForm({ ...startupForm, stage: value })}
                          >
                            <SelectTrigger data-testid="select-stage">
                              <SelectValue placeholder="Select stage" />
                            </SelectTrigger>
                            <SelectContent>
                              {stages.map((s) => (
                                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="investmentRequired">Investment Required (in Rupees) *</Label>
                        <Input
                          id="investmentRequired"
                          type="number"
                          value={startupForm.investmentRequired}
                          onChange={(e) => setStartupForm({ ...startupForm, investmentRequired: e.target.value })}
                          placeholder="e.g., 5000000 for 50 Lakhs"
                          required
                          data-testid="input-investment"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessModel">Business Model Description *</Label>
                        <Textarea
                          id="businessModel"
                          value={startupForm.businessModel}
                          onChange={(e) => setStartupForm({ ...startupForm, businessModel: e.target.value })}
                          placeholder="Describe your business model, target market, and value proposition..."
                          rows={4}
                          required
                          data-testid="input-business-model"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="revenueProjection">Revenue / Growth Projection (Optional)</Label>
                        <Textarea
                          id="revenueProjection"
                          value={startupForm.revenueProjection}
                          onChange={(e) => setStartupForm({ ...startupForm, revenueProjection: e.target.value })}
                          placeholder="Share your revenue projections or growth metrics..."
                          rows={3}
                          data-testid="input-revenue"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pitchDeck">Pitch Deck URL (Optional)</Label>
                        <Input
                          id="pitchDeck"
                          type="url"
                          value={startupForm.pitchDeckUrl}
                          onChange={(e) => setStartupForm({ ...startupForm, pitchDeckUrl: e.target.value })}
                          placeholder="Link to your pitch deck (Google Drive, Dropbox, etc.)"
                          data-testid="input-pitch-deck"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={submitStartup.isPending}
                        data-testid="button-submit-startup"
                      >
                        {submitStartup.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Rocket className="w-4 h-4 mr-2" />
                        )}
                        Submit Startup
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="investor">
              {investorProfile || investorFormSubmitted ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <CheckCircle className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">You're Registered!</h3>
                    <p className="text-muted-foreground mb-4">
                      You can now browse and show interest in startups.
                    </p>
                    <Button onClick={() => setActiveTab("browse")}>
                      Browse Startups
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Register as Investor</CardTitle>
                    <CardDescription>Join our investor network to discover promising startups</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleInvestorSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="invName">Your Name *</Label>
                          <Input
                            id="invName"
                            value={investorForm.name}
                            onChange={(e) => setInvestorForm({ ...investorForm, name: e.target.value })}
                            required
                            data-testid="input-investor-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="invMobile">Mobile Number *</Label>
                          <Input
                            id="invMobile"
                            value={investorForm.mobile}
                            onChange={(e) => setInvestorForm({ ...investorForm, mobile: e.target.value })}
                            required
                            data-testid="input-investor-mobile"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="invEmail">Email *</Label>
                        <Input
                          id="invEmail"
                          type="email"
                          value={investorForm.email}
                          onChange={(e) => setInvestorForm({ ...investorForm, email: e.target.value })}
                          required
                          data-testid="input-investor-email"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Investment Amount Range *</Label>
                          <Select
                            value={investorForm.investmentAmountRange}
                            onValueChange={(value) => setInvestorForm({ ...investorForm, investmentAmountRange: value })}
                          >
                            <SelectTrigger data-testid="select-investment-range">
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              {investmentRanges.map((range) => (
                                <SelectItem key={range} value={range}>{range}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Investment Type *</Label>
                          <Select
                            value={investorForm.investmentType}
                            onValueChange={(value) => setInvestorForm({ ...investorForm, investmentType: value })}
                          >
                            <SelectTrigger data-testid="select-investment-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equity">Equity</SelectItem>
                              <SelectItem value="debt">Debt</SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Interested Industry *</Label>
                        <Select
                          value={investorForm.interestedIndustry}
                          onValueChange={(value) => setInvestorForm({ ...investorForm, interestedIndustry: value })}
                        >
                          <SelectTrigger data-testid="select-interested-industry">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Industries</SelectItem>
                            {industries.map((ind) => (
                              <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={submitInvestor.isPending}
                        data-testid="button-submit-investor"
                      >
                        {submitInvestor.isPending ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <TrendingUp className="w-4 h-4 mr-2" />
                        )}
                        Register as Investor
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
