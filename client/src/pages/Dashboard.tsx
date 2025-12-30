import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import {
  User,
  BookOpen,
  Video,
  Calculator,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Download,
  Play,
  Crown,
} from "lucide-react";

const freeResources = [
  { title: "Stock Market Basics Ebook", type: "ebook", category: "Basic" },
  { title: "Candlestick Patterns Guide", type: "ebook", category: "Basic" },
  { title: "Introduction to Trading", type: "video", category: "Basic" },
  { title: "NSE & BSE Explained", type: "video", category: "Basic" },
  { title: "Technical Analysis Basics", type: "ebook", category: "Intermediate" },
  { title: "RSI Indicator Tutorial", type: "video", category: "Intermediate" },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();

  const { data: payments } = useQuery({
    queryKey: ["/api/payments/user"],
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="page-bg flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  const pendingPayments = Array.isArray(payments) 
    ? payments.filter((p: any) => p.status === "pending") 
    : [];
  const approvedPayments = Array.isArray(payments) 
    ? payments.filter((p: any) => p.status === "approved") 
    : [];

  return (
    <div className="page-bg">
      <section className="py-8 bg-card/50 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                {user.fullName?.charAt(0) || "U"}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Welcome, {user.fullName?.split(" ")[0] || "User"}!
                </h1>
                <p className="text-muted-foreground">+91 {user.mobile}</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card data-testid="card-stat-resources">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10">
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50+</div>
                    <div className="text-sm text-muted-foreground">Free Resources</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-stat-videos">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/10">
                    <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100+</div>
                    <div className="text-sm text-muted-foreground">Video Lessons</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-stat-calculators">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-emerald-500/10">
                    <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">4</div>
                    <div className="text-sm text-muted-foreground">Calculators</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-stat-plan">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-amber-500/10">
                    <Crown className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {approvedPayments.length > 0 ? "Pro" : "Free"}
                    </div>
                    <div className="text-sm text-muted-foreground">Current Plan</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Free Resources</CardTitle>
                    <Link href="/courses">
                      <Button variant="ghost" size="sm" data-testid="button-view-all-courses">
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                  <CardDescription>Download ebooks and watch video tutorials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {freeResources.map((resource, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover-elevate"
                        data-testid={`resource-${index}`}
                      >
                        <div className="flex items-center gap-3">
                          {resource.type === "ebook" ? (
                            <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Play className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-foreground">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">{resource.category}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          {resource.type === "ebook" ? "Download" : "Watch"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learning Progress</CardTitle>
                  <CardDescription>Track your course completion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Basic Level</span>
                      <span className="text-muted-foreground">0/10 completed</span>
                    </div>
                    <Progress value={0} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Intermediate Level</span>
                      <span className="text-muted-foreground">0/12 completed</span>
                    </div>
                    <Progress value={0} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Advanced Level</span>
                      <span className="text-muted-foreground">0/10 completed</span>
                    </div>
                    <Progress value={0} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Algo Trading</span>
                      <span className="text-muted-foreground">0/10 completed</span>
                    </div>
                    <Progress value={0} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Full Name</span>
                    <p className="font-medium">{user.fullName}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Mobile</span>
                    <p className="font-medium">+91 {user.mobile}</p>
                  </div>
                  {user.email && (
                    <div className="space-y-2">
                      <span className="text-sm text-muted-foreground">Email</span>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <span className="text-sm text-muted-foreground">Experience Level</span>
                    <p className="font-medium capitalize">{user.experience}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingPayments.length > 0 ? (
                    <div className="space-y-3">
                      {pendingPayments.map((payment: any) => (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10"
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span className="text-sm">₹{payment.amount} - Pending</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : approvedPayments.length > 0 ? (
                    <div className="space-y-3">
                      {approvedPayments.map((payment: any) => (
                        <div
                          key={payment.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10"
                        >
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="text-sm">₹{payment.amount} - Active</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Upgrade to unlock premium features
                      </p>
                      <Link href="/pricing">
                        <Button size="sm" data-testid="button-upgrade">
                          View Plans
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/calculators">
                    <Button variant="ghost" className="w-full justify-start">
                      <Calculator className="w-4 h-4 mr-2" />
                      Trading Calculators
                    </Button>
                  </Link>
                  <Link href="/live-market">
                    <Button variant="ghost" className="w-full justify-start">
                      <Video className="w-4 h-4 mr-2" />
                      Live Market
                    </Button>
                  </Link>
                  <Link href="/courses">
                    <Button variant="ghost" className="w-full justify-start">
                      <BookOpen className="w-4 h-4 mr-2" />
                      All Courses
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
