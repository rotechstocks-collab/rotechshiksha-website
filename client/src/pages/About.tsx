import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  Target,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { MentorCharacter, LearnerCharacter, RocketGrowth, TargetGoal } from "@/components/Illustrations";
import { InvestingCharacter } from "@/components/SmallcaseIllustrations";
import { FadeInUp, ScaleIn, StaggerContainer, StaggerItem } from "@/components/AnimationWrappers";

const highlights = [
  { label: "Learning Levels", value: "8" },
  { label: "Community", value: "Growing" },
  { label: "Stage", value: "Early" },
  { label: "Focus", value: "Beginners" },
];

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Education First",
    subtitle: "(Pehle padhai)",
    description: "Tips nahi, knowledge dete hain – samjho, phir invest karo.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Risk Awareness",
    subtitle: "(Risk ko samjho)",
    description: "Har lesson me risk management – kyunki paisa bachana bhi zaroori hai.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Support",
    subtitle: "(Saath me seekho)",
    description: "Akele nahi, doosre beginners ke saath milke seekho.",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Practical Learning",
    subtitle: "(Kaam ki baatein)",
    description: "Real examples, Indian market se – jo actually kaam aaye.",
  },
];

const team = [
  {
    name: "Rohan Mehta",
    role: "Founder & Lead Educator",
    bio: "Passionate about making stock market education accessible to everyone in India.",
  },
  {
    name: "Sneha Iyer",
    role: "Content & Curriculum",
    bio: "Focused on creating beginner-friendly content with practical examples from Indian markets.",
  },
  {
    name: "Vikram Singh",
    role: "Technical Content",
    bio: "Helps simplify complex trading concepts for first-time learners.",
  },
];

export default function About() {
  const { isAuthenticated, setShowAuthPopup, setPendingAction } = useAuth();

  const handleGetStarted = () => {
    setPendingAction("start learning");
    setShowAuthPopup(true);
  };

  return (
    <div className="min-h-screen pt-28">
      <section className="relative py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FDF6F0] via-[#FFEEE4] to-[#FFF5EE] dark:from-background dark:via-background dark:to-background" />
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInUp className="space-y-6">
              <Badge variant="outline" className="bg-white/80 dark:bg-card/80 backdrop-blur-sm border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-400">
                About Us
              </Badge>
              <p className="text-sm text-muted-foreground">(Humari kahani)</p>
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-foreground">
                Financial Literacy for India
                <span className="bg-gradient-to-r from-[#4A90E2] to-[#4ECDC4] bg-clip-text text-transparent block mt-2">(Har Indian ke liye)</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Rotech Shiksha ka mission simple hai: stock market ki basic knowledge har Indian tak pahunchana. 
                Sahi jaankari ke saath, koi bhi samajhdaari se invest kar sakta hai.
              </p>
              <p className="text-muted-foreground">
                Humare courses practical examples ke saath banaye gaye hain – jo aaj ke Indian markets me kaam aayein.
              </p>
            </FadeInUp>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex justify-center relative"
            >
              <MentorCharacter size={240} />
              <motion.div
                className="absolute -top-8 -right-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <RocketGrowth size={100} />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
          >
            {highlights.map((item, index) => (
              <Card key={index} className="text-center" data-testid={`card-stat-${index}`}>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Values</h2>
            <p className="text-sm text-muted-foreground">(Humari soch)</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hum kya believe karte hain aur kyun
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-value-${index}`}>
                <CardContent className="pt-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                  {value.subtitle && <p className="text-xs text-muted-foreground">{value.subtitle}</p>}
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Meet Our Team</h2>
            <p className="text-sm text-muted-foreground">(Humari team se milo)</p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jo log Rotech Shiksha banate hain
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} data-testid={`card-team-${index}`}>
                <CardContent className="pt-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Why Choose Us</h2>
            <p className="text-sm text-muted-foreground">(Humein kyun chunein?)</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Bilkul free – koi hidden charges nahi",
              "Simple Hindi/English me content",
              "Indian markets ke real examples (NSE/BSE)",
              "Rohit & Priya ki story ke saath seekho",
              "Growing learner community",
              "Tips nahi – sirf education",
              "Apni speed se seekho",
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Ready to Start?
          </h2>
          <p className="text-lg opacity-90">(Shuru karne ke liye tayyar ho?)</p>
          <p className="max-w-2xl mx-auto opacity-90">
            Aaj hi seekhna shuru karo – bilkul free, bilkul asaan
          </p>
          {!isAuthenticated && (
            <Button
              size="lg"
              variant="secondary"
              onClick={handleGetStarted}
              data-testid="button-about-cta"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
