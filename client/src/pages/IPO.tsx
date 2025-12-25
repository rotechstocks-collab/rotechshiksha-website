import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Calendar,
  TrendingUp,
  Building2,
  IndianRupee,
  Clock,
  CheckCircle,
  ArrowRight,
  Info,
  FileText,
  Users,
  Briefcase,
  ChevronLeft,
  CalendarDays,
  Landmark,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import { ipoData, getIPOById, formatCurrency, formatDate, getDaysRemaining, type IPO } from "@/lib/ipoData";
import { RocketGrowth, GrowthChart, CoinStack, ChartAnalysis } from "@/components/Illustrations";

const statusColors = {
  upcoming: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  ongoing: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  closed: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  listed: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
};

const statusLabels = {
  upcoming: "Upcoming",
  ongoing: "Open Now",
  closed: "Closed",
  listed: "Listed"
};

function IPOCard({ ipo }: { ipo: IPO }) {
  const daysRemaining = getDaysRemaining(ipo.status === "upcoming" ? ipo.openDate : ipo.closeDate);
  
  return (
    <Link href={`/ipo/${ipo.id}`} data-testid={`link-ipo-${ipo.id}`}>
      <Card className="h-full hover-elevate cursor-pointer group" data-testid={`card-ipo-${ipo.id}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {ipo.companyName.charAt(0)}
            </div>
            <Badge variant="outline" className={statusColors[ipo.status]}>
              {statusLabels[ipo.status]}
            </Badge>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {ipo.companyName}
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Briefcase className="w-3 h-3" />
            {ipo.industry}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Price Band</p>
              <p className="font-semibold text-foreground">
                Rs {ipo.issuePrice.min} - {ipo.issuePrice.max}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Issue Size</p>
              <p className="font-semibold text-foreground">{formatCurrency(ipo.issueSize * 10000000)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Lot Size</p>
              <p className="font-semibold text-foreground">{ipo.lotSize} Shares</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Min. Investment</p>
              <p className="font-semibold text-foreground">Rs {ipo.minInvestment.toLocaleString("en-IN")}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {ipo.status === "upcoming" ? (
                  <span>Opens: {formatDate(ipo.openDate)}</span>
                ) : ipo.status === "ongoing" ? (
                  <span>Closes: {formatDate(ipo.closeDate)}</span>
                ) : ipo.status === "closed" ? (
                  <span>Listing: {formatDate(ipo.listingDate || ipo.closeDate)}</span>
                ) : (
                  <span>Listed: {formatDate(ipo.listingDate || ipo.closeDate)}</span>
                )}
              </div>
              {(ipo.status === "upcoming" || ipo.status === "ongoing") && daysRemaining > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {daysRemaining} days
                </Badge>
              )}
            </div>
          </div>

          {ipo.subscriptionStatus && ipo.status !== "upcoming" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Subscription</span>
                <span className="font-semibold text-primary">{ipo.subscriptionStatus.total}x</span>
              </div>
              <Progress value={Math.min(ipo.subscriptionStatus.total * 10, 100)} className="h-2" />
            </div>
          )}

          {ipo.gmp && (
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-muted-foreground">GMP:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">+Rs {ipo.gmp}</span>
            </div>
          )}

          <Button variant="ghost" className="w-full mt-2 justify-between group-hover:text-primary" data-testid={`button-view-ipo-${ipo.id}`}>
            View Details
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

function IPOListing() {
  const [activeTab, setActiveTab] = useState("all");

  const ongoingIPOs = ipoData.filter(ipo => ipo.status === "ongoing");
  const upcomingIPOs = ipoData.filter(ipo => ipo.status === "upcoming");
  const closedIPOs = ipoData.filter(ipo => ipo.status === "closed" || ipo.status === "listed");

  const filteredIPOs = activeTab === "all" 
    ? ipoData 
    : activeTab === "ongoing" 
      ? ongoingIPOs 
      : activeTab === "upcoming" 
        ? upcomingIPOs 
        : closedIPOs;

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              IPO Hub
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Upcoming & Ongoing IPOs
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Track all upcoming and ongoing IPOs, view subscription status, GMP, and apply directly through your broker.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <Card className="text-center">
                <CardContent className="pt-4 pb-3">
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{ongoingIPOs.length}</div>
                  <div className="text-xs text-muted-foreground">Open Now</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4 pb-3">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{upcomingIPOs.length}</div>
                  <div className="text-xs text-muted-foreground">Upcoming</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4 pb-3">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{closedIPOs.length}</div>
                  <div className="text-xs text-muted-foreground">Recently Listed</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center relative"
          >
            <RocketGrowth size={200} />
            <motion.div
              className="absolute -top-4 -right-8"
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

        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all" data-testid="tab-all-ipos">All ({ipoData.length})</TabsTrigger>
            <TabsTrigger value="ongoing" data-testid="tab-ongoing-ipos">Open ({ongoingIPOs.length})</TabsTrigger>
            <TabsTrigger value="upcoming" data-testid="tab-upcoming-ipos">Upcoming ({upcomingIPOs.length})</TabsTrigger>
            <TabsTrigger value="closed" data-testid="tab-closed-ipos">Closed ({closedIPOs.length})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIPOs.map((ipo, index) => (
            <motion.div
              key={ipo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <IPOCard ipo={ipo} />
            </motion.div>
          ))}
        </div>

        {filteredIPOs.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No IPOs found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

function IPODetail({ id }: { id: string }) {
  const ipo = getIPOById(id);

  if (!ipo) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">IPO Not Found</h2>
          <p className="text-muted-foreground mb-4">The IPO you're looking for doesn't exist.</p>
          <Link href="/ipo">
            <Button data-testid="button-view-all-ipos-404">View All IPOs</Button>
          </Link>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(ipo.status === "upcoming" ? ipo.openDate : ipo.closeDate);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <Link href="/ipo">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back-to-ipos">
            <ChevronLeft className="w-4 h-4" />
            Back to IPOs
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                        {ipo.companyName.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{ipo.companyName}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Briefcase className="w-4 h-4" />
                          {ipo.industry}
                        </CardDescription>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          <Badge variant="outline" className={statusColors[ipo.status]}>
                            {statusLabels[ipo.status]}
                          </Badge>
                          {ipo.exchange.map(ex => (
                            <Badge key={ex} variant="secondary" className="text-xs">{ex}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    {ipo.gmp && (
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">GMP</p>
                        <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">+Rs {ipo.gmp}</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{ipo.about}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    IPO Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Price Band</p>
                      <p className="font-semibold text-lg text-foreground">
                        Rs {ipo.issuePrice.min} - Rs {ipo.issuePrice.max}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Issue Size</p>
                      <p className="font-semibold text-lg text-foreground">{formatCurrency(ipo.issueSize * 10000000)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Lot Size</p>
                      <p className="font-semibold text-lg text-foreground">{ipo.lotSize} Shares</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Minimum Investment</p>
                      <p className="font-semibold text-lg text-foreground">Rs {ipo.minInvestment.toLocaleString("en-IN")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Face Value</p>
                      <p className="font-semibold text-lg text-foreground">Rs 10</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Listing At</p>
                      <p className="font-semibold text-lg text-foreground">{ipo.exchange.join(", ")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {ipo.subscriptionStatus && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Subscription Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-4 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">QIB</p>
                        <p className="font-semibold text-lg text-foreground">{ipo.subscriptionStatus.qib}x</p>
                        <Progress value={Math.min(ipo.subscriptionStatus.qib * 10, 100)} className="h-2 mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">HNI</p>
                        <p className="font-semibold text-lg text-foreground">{ipo.subscriptionStatus.hni}x</p>
                        <Progress value={Math.min(ipo.subscriptionStatus.hni * 10, 100)} className="h-2 mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Retail</p>
                        <p className="font-semibold text-lg text-foreground">{ipo.subscriptionStatus.retail}x</p>
                        <Progress value={Math.min(ipo.subscriptionStatus.retail * 10, 100)} className="h-2 mt-2" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total</p>
                        <p className="font-semibold text-lg text-primary">{ipo.subscriptionStatus.total}x</p>
                        <Progress value={Math.min(ipo.subscriptionStatus.total * 10, 100)} className="h-2 mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Key Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {ipo.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Financial Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Revenue</p>
                      <p className="font-semibold text-foreground">{ipo.financials.revenue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Profit</p>
                      <p className="font-semibold text-foreground">{ipo.financials.profit}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Assets</p>
                      <p className="font-semibold text-foreground">{ipo.financials.assets}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Net Worth</p>
                      <p className="font-semibold text-foreground">{ipo.financials.netWorth}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    Important Dates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Bidding Period</span>
                      <span className="font-medium text-foreground">{ipo.keyDates.bidding}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Allotment Date</span>
                      <span className="font-medium text-foreground">{ipo.keyDates.allotment}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Refund Initiation</span>
                      <span className="font-medium text-foreground">{ipo.keyDates.refund}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Listing Date</span>
                      <span className="font-medium text-foreground">{ipo.keyDates.listing}</span>
                    </div>
                  </div>

                  {(ipo.status === "upcoming" || ipo.status === "ongoing") && daysRemaining > 0 && (
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">
                          {ipo.status === "upcoming" ? "Opens in" : "Closes in"}
                        </span>
                        <Badge variant="secondary">{daysRemaining} days</Badge>
                      </div>
                    </div>
                  )}

                  {ipo.status === "ongoing" && (
                    <Button className="w-full mt-4" size="lg" data-testid="button-apply-ipo">
                      <IndianRupee className="w-4 h-4 mr-2" />
                      Apply via Broker
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Landmark className="w-5 h-5 text-primary" />
                    Other Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Registrar</p>
                    <p className="text-sm font-medium text-foreground">{ipo.registrar}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Lead Manager</p>
                    <p className="text-sm font-medium text-foreground">{ipo.leadManager}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IPO() {
  const [, params] = useRoute("/ipo/:id");

  if (params?.id) {
    return <IPODetail id={params.id} />;
  }

  return <IPOListing />;
}
