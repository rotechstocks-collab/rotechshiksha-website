import { Hero } from "@/components/Hero";
import { LiveVideoSection } from "@/components/LiveVideoSection";
import { CourseCards } from "@/components/CourseCards";
import { PricingPlans } from "@/components/PricingPlans";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Shield,
  TrendingUp,
  Users,
  ArrowRight,
  BookOpen,
  Video,
  Calculator,
  PiggyBank,
  Target,
  Lightbulb,
  GraduationCap,
  IndianRupee,
  BarChart3,
  Wallet,
  Calendar,
  Briefcase,
} from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";
import {
  CalculatorIllustration,
  BookLearning,
  TargetGoal,
  RocketGrowth,
  LearnerCharacter,
  MentorCharacter,
  PiggyBank as PiggyBankIllustration,
  ChartAnalysis,
  GrowthChart,
} from "@/components/Illustrations";
import {
  InvestingCharacter,
  GrowthArrowIllustration,
  PortfolioCard,
  PhoneWithChart,
  StockBasket,
  FloatingCoins,
} from "@/components/SmallcaseIllustrations";
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem, HoverLift } from "@/components/AnimationWrappers";
import { MarketNewsSection } from "@/components/MarketNewsSection";
import { Skeleton } from "@/components/ui/skeleton";
import { useIPOList, formatDate as formatIPODate, type IPOData } from "@/lib/ipoApi";

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

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const popularCalculators = [
  { id: "sip", name: "SIP Calculator", icon: <PiggyBank className="w-6 h-6" />, color: "from-emerald-500 to-teal-500" },
  { id: "emi", name: "EMI Calculator", icon: <IndianRupee className="w-6 h-6" />, color: "from-blue-500 to-indigo-500" },
  { id: "fd", name: "FD Calculator", icon: <Wallet className="w-6 h-6" />, color: "from-amber-500 to-orange-500" },
  { id: "income-tax", name: "Income Tax", icon: <BarChart3 className="w-6 h-6" />, color: "from-purple-500 to-pink-500" },
  { id: "ppf", name: "PPF Calculator", icon: <Shield className="w-6 h-6" />, color: "from-cyan-500 to-blue-500" },
  { id: "mutual-fund", name: "Mutual Fund", icon: <TrendingUp className="w-6 h-6" />, color: "from-rose-500 to-red-500" },
];

const learningFeatures = [
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Comprehensive Ebooks",
    description: "50+ ebooks covering basics to advanced trading strategies in easy language",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    icon: <Video className="w-7 h-7" />,
    title: "Video Tutorials",
    description: "100+ video lessons with practical examples and real case studies",
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  },
  {
    icon: <Calculator className="w-7 h-7" />,
    title: "20+ Calculators",
    description: "SIP, EMI, Tax, PPF and more calculators to plan your finances",
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: <GraduationCap className="w-7 h-7" />,
    title: "Structured Learning",
    description: "Step-by-step courses from beginner to advanced levels",
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
];

const whyChooseUs = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Practical Knowledge",
    description: "Learn with real market examples",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Simple Language",
    description: "No jargon, easy to understand",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "100% Free",
    description: "Quality education for everyone",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Support",
    description: "Learn with 10,000+ investors",
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer",
    content: "Finally understood technical analysis after going through the intermediate course. The charts make so much sense now!",
  },
  {
    name: "Priya Patel",
    role: "Business Owner",
    content: "Started as a complete beginner. The step-by-step approach helped me build confidence in the stock market.",
  },
  {
    name: "Amit Kumar",
    role: "College Student",
    content: "The algo trading section opened my eyes to systematic trading. Great introduction without overwhelming jargon.",
  },
];

function IPOCardSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="pt-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <Skeleton className="w-20 h-5" />
        </div>
        <div>
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-1" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
        <Skeleton className="h-8 w-full" />
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();
  const { t } = useLanguage();
  const { data: ipoData, isLoading: isIPOLoading } = useIPOList();
  
  const featuredIPOs = (ipoData?.ipos || [])
    .filter((ipo: IPOData) => ipo.status === "ongoing" || ipo.status === "upcoming")
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Hero />

      <LiveVideoSection />

      <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-3 gap-8 items-center mb-12">
            <motion.div {...fadeInUp} className="lg:col-span-2 space-y-4">
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                <Calculator className="w-3 h-3 mr-1" />
                Popular Tools
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Financial Calculators
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Plan your investments, calculate returns, and make informed financial decisions
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-center"
            >
              <CalculatorIllustration size={140} />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {popularCalculators.map((calc, index) => (
              <motion.div
                key={calc.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link href={`/calculators/${calc.id}`}>
                  <Card className="hover-elevate cursor-pointer group h-full" data-testid={`card-calc-${calc.id}`}>
                    <CardContent className="p-4 text-center space-y-3">
                      <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${calc.color} text-white flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                        {calc.icon}
                      </div>
                      <h3 className="text-sm font-medium text-foreground">{calc.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="text-center">
            <Link href="/calculators">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-view-all-calculators">
                View All 20 Calculators
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <LearnerCharacter size={220} />
                <motion.div
                  className="absolute -top-4 -right-4"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <BookLearning size={100} />
                </motion.div>
              </div>
            </motion.div>
            <motion.div {...fadeInUp} className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {t("home.features.title")}
              </h2>
              <p className="text-muted-foreground max-w-xl">
                {t("home.features.subtitle")}
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full hover-elevate" data-testid={`card-feature-${index}`}>
                  <CardContent className="pt-6 space-y-4">
                    <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center`}>
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <motion.div {...fadeInUp} className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Why Choose Us?
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Join thousands of learners who trust us for their financial education journey
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <TargetGoal size={160} />
                <motion.div
                  className="absolute -bottom-4 -left-8"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <PiggyBankIllustration size={100} />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="text-center space-y-4 p-6"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CourseCards />

      <section className="py-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            <motion.div {...fadeInUp} className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                IPO Hub
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Upcoming & Ongoing IPOs
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Track the latest IPO opportunities, view subscription status, and stay updated with new listings
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-center"
            >
              <div className="relative">
                <RocketGrowth size={160} />
                <motion.div
                  className="absolute -top-4 -right-8"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <GrowthChart size={100} />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {isIPOLoading ? (
              [...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <IPOCardSkeleton />
                </motion.div>
              ))
            ) : featuredIPOs.length > 0 ? (
              featuredIPOs.map((ipo: IPOData, index: number) => (
              <motion.div
                key={ipo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/ipo/${ipo.id}`} data-testid={`link-ipo-home-${ipo.id}`}>
                  <Card className="h-full hover-elevate cursor-pointer group" data-testid={`card-ipo-home-${ipo.id}`}>
                    <CardContent className="pt-5 space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                          {ipo.companyName.charAt(0)}
                        </div>
                        <Badge variant="outline" className={statusColors[ipo.status]}>
                          {statusLabels[ipo.status]}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {ipo.companyName}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Briefcase className="w-3 h-3" />
                          {ipo.industry || "General"}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">Price Band</p>
                          <p className="font-semibold text-foreground">
                            Rs {ipo.issuePrice.min} - {ipo.issuePrice.max}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Min. Investment</p>
                          <p className="font-semibold text-foreground">
                            Rs {ipo.minInvestment.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
                        <Calendar className="w-4 h-4" />
                        {ipo.status === "upcoming" ? (
                          <span>Opens: {formatIPODate(ipo.openDate)}</span>
                        ) : (
                          <span>Closes: {formatIPODate(ipo.closeDate)}</span>
                        )}
                      </div>
                      {ipo.gmp && (
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                          <span className="text-muted-foreground">GMP:</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">+Rs {ipo.gmp}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-muted-foreground">No active IPOs at the moment. Check back soon!</p>
              </div>
            )}
          </div>

          <motion.div {...fadeInUp} className="text-center">
            <Link href="/ipo">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-view-all-ipos">
                View All IPOs
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white/50 dark:bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 right-20 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-400/15 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
          <MarketNewsSection limit={6} showTitle={true} />
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start mb-12">
            <motion.div {...fadeInUp} className="lg:col-span-2 space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {t("home.testimonials.title")}
              </h2>
              <p className="text-muted-foreground max-w-xl">
                {t("home.testimonials.subtitle")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-center"
            >
              <MentorCharacter size={160} />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
              >
                <Card className="h-full" data-testid={`card-testimonial-${index}`}>
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                    <div className="pt-2 border-t border-border">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PricingPlans />

      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-center"
            >
              <ChartAnalysis size={200} />
            </motion.div>
            <motion.div {...fadeInUp} className="text-center lg:text-left space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {t("home.community.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("home.community.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    data-testid="button-join-whatsapp"
                  >
                    <SiWhatsapp className="w-5 h-5 mr-2" />
                    {t("home.community.whatsapp")}
                  </Button>
                </a>
                <a
                  href="https://t.me/rotechmultisolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full"
                    data-testid="button-join-telegram"
                  >
                    <SiTelegram className="w-5 h-5 mr-2 text-blue-500" />
                    {t("home.community.telegram")}
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-48 h-48 border border-white/20 rounded-full"
            animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <motion.div {...fadeInUp} className="lg:col-span-2 text-center lg:text-left space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                {t("home.cta.title")}
              </h2>
              <p className="max-w-xl opacity-90 text-lg">
                {t("home.cta.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/calculators">
                  <Button size="lg" variant="secondary" className="shadow-lg" data-testid="button-cta-calculators">
                    <Calculator className="w-4 h-4 mr-2" />
                    Explore Calculators
                  </Button>
                </Link>
                {isAuthenticated ? (
                  <Link href="/courses">
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" data-testid="button-cta-explore">
                      {t("hero.cta.explore")}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    onClick={() => {
                      setPendingAction("access free courses");
                      setShowAuthPopup(true);
                    }}
                    data-testid="button-cta-start"
                  >
                    {t("home.cta.button")}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
              <p className="text-sm opacity-75 flex items-center justify-center lg:justify-start gap-2">
                <Shield className="w-4 h-4" />
                {t("home.cta.note")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:flex justify-center"
            >
              <RocketGrowth size={180} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
