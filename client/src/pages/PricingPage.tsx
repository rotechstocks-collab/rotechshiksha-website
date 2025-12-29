import { PricingPlans, ComparisonTable } from "@/components/PricingPlans";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle, HelpCircle, Star, Users, Award, Clock, ArrowRight, Sparkles, MessageCircle, Quote } from "lucide-react";
import { Link } from "wouter";
import { CharacterAvatar } from "@/components/characters/CharacterAvatar";
import { SEOHead } from "@/components/SEOHead";

const faqs = [
  {
    question: "Free course hai toh paid kyun loon?",
    answer: "Free course mein 8 levels, 84+ videos, calculators - sab milta hai. Paid plans mein extra milta hai: Live sessions, personal mentorship, doubt solving, aur community support. Agar self-study se seekh sakte ho - free kaafi hai. Agar fast-track chahiye with guidance - paid plans help karenge.",
  },
  {
    question: "Kya investment tips milenge?",
    answer: "Nahi. Hum SEBI registered advisor nahi hain. Yeh education platform hai - stock market samajhna sikhate hain, tips nahi dete. Tumhe informed decisions lena sikhayenge - tips nahi denge.",
  },
  {
    question: "Refund policy kya hai?",
    answer: "7 din ka no-questions-asked refund. Agar khush nahi ho, paise wapas. Simple.",
  },
  {
    question: "Payment safe hai?",
    answer: "100% secure payment via Razorpay. UPI, cards, netbanking - sab supported hai. Koi data store nahi karte.",
  },
  {
    question: "Kitne din mein complete hoga course?",
    answer: "Free course: Daily 30 min doge toh 2-3 weeks mein. Elite bootcamp: 30 days structured program. Lifetime access hai, koi rush nahi.",
  },
  {
    question: "Kya certificate milega?",
    answer: "Elite Mentorship plan mein Certificate of Completion milta hai. Free aur Pro mein nahi.",
  },
  {
    question: "1-on-1 calls mein kya hoga?",
    answer: "Elite plan mein 4 personal video calls milte hain. Tumhare doubts, portfolio review, strategy discussion - sab discuss kar sakte ho.",
  },
  {
    question: "Beginners ke liye suitable hai?",
    answer: "100% haan! Zero knowledge se start hota hai. Priya & Rohit ke saath simple Hindi mein seekho. Koi jargon nahi.",
  },
];

const testimonials = [
  {
    name: "Amit Sharma",
    location: "Mumbai",
    text: "Pehle stock market se darta tha. Ab confidently invest karta hoon. Best free course!",
    rating: 5,
    plan: "Free Starter",
  },
  {
    name: "Priyanka Verma",
    location: "Delhi",
    text: "Elite mentorship liya - worth every rupee. Personal calls se bohot clarity aayi.",
    rating: 5,
    plan: "Elite Mentorship",
  },
  {
    name: "Rahul Gupta",
    location: "Bangalore",
    text: "Simple Hindi mein samjhaya. Finally stock market samajh aaya!",
    rating: 5,
    plan: "Pro Learner",
  },
];

const trustBadges = [
  { icon: <Users className="w-5 h-5" />, text: "10,000+ Learners" },
  { icon: <Star className="w-5 h-5" />, text: "4.8 Rating" },
  { icon: <Award className="w-5 h-5" />, text: "100% Core Free" },
  { icon: <Clock className="w-5 h-5" />, text: "Lifetime Access" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Pricing Plans - Free vs Paid | Rotech Shiksha Stock Market Course"
        description="Compare Rotech Shiksha pricing plans. Free Starter, Pro Learner, Elite Mentorship. 8 levels FREE forever. Upgrade for personal mentorship & live sessions."
        keywords="rotech shiksha pricing, stock market course price, free stock market course, paid mentorship india"
      />

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 mb-4">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            8 Levels FREE Forever
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Apna Plan Choose Karo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Core learning <span className="font-semibold text-emerald-600">100% FREE</span> hai. 
            Extra guidance chahiye? Upgrade karo - no pressure.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {trustBadges.map((badge, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border shadow-sm">
                <span className="text-primary">{badge.icon}</span>
                <span className="text-sm font-medium text-foreground">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Priya-Rohit Dialogue */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-card dark:bg-card border rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <CharacterAvatar character="rohit" size="md" />
              <div className="flex-1 bg-blue-50 dark:bg-blue-900/30 rounded-xl rounded-tl-none p-4">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Rohit:</span> Yaar Priya, free course hai toh paid kyun loon?
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 flex-row-reverse">
              <CharacterAvatar character="priya" size="md" />
              <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl rounded-tr-none p-4">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Priya:</span> Free mein poora course hai - 8 levels, 84 videos, calculators. Par agar tujhe fast-track chahiye, personal guidance chahiye, ya trading bootcamp mein join karna hai - tab paid plans help karenge. Think of it as gym - free mein equipment mil jaata hai, par personal trainer extra hota hai!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <PricingPlans />

      {/* Comparison Table */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Free vs Paid - Kya Milega?
            </h2>
            <p className="text-muted-foreground">
              Detailed comparison - clear picture lo
            </p>
          </div>
          
          <div className="bg-card dark:bg-card rounded-2xl border shadow-sm p-4 md:p-6">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* Why Upgrade Section */}
      <section className="py-10 bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Paid Plans Kyun Worth Hain?
            </h2>
            <p className="text-muted-foreground">
              Free se bhi seekh sakte ho. Par ye extra benefits milte hain:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Faster Progress",
                titleHi: "Tez Progress",
                desc: "Live sessions aur mentorship se doubts turant solve. Self-study mein jo 3 weeks lagta, mentorship mein 1 week.",
                icon: "🚀",
              },
              {
                title: "Personal Guidance",
                titleHi: "Personal Guidance",
                desc: "Tumhari situation ke hisab se advice. Generic videos vs customized mentorship - bada difference.",
                icon: "🎯",
              },
              {
                title: "Accountability",
                titleHi: "Accountability",
                desc: "Paid hone se commitment badhti hai. Bootcamp structure mein disciplined learning hoti hai.",
                icon: "💪",
              },
            ].map((item, i) => (
              <Card key={i} className="p-6 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{item.titleHi}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Learners Kya Kehte Hain
            </h2>
            <p className="text-muted-foreground">Real reviews from real learners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-6" data-testid={`card-testimonial-${i}`}>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-primary/30 mb-2" />
                <p className="text-foreground mb-4" data-testid={`text-testimonial-${i}`}>{t.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{t.plan}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-10 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 mb-4">
              <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
              FAQs
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Aksar Pooche Jaane Wale Sawal
            </h2>
            <p className="text-muted-foreground">
              Koi doubt hai? Yahan dekho
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`} 
                className="bg-card dark:bg-card border rounded-xl overflow-hidden"
                data-testid={`faq-${index}`}
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <span className="font-medium text-foreground pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Risk Reversal / Guarantee */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-bold text-xl text-foreground mb-2">
                  7-Day Money Back Guarantee
                </h3>
                <p className="text-muted-foreground mb-4">
                  Khush nahi ho? 7 din ke andar full refund - koi sawal nahi. Hum chahte hain ki tum confident hokar seekho.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm">
                  {["Secure Payment", "Instant Access", "No Hidden Charges", "Cancel Anytime"].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-foreground">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Start?
          </h2>
          <p className="text-muted-foreground mb-6">
            Free se shuru karo. Upgrade karna hai toh baad mein bhi kar sakte ho.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/courses">
              <Button size="lg" variant="outline" className="gap-2" data-testid="button-cta-start-free">
                Start Free Course
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#plans">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" data-testid="button-cta-view-premium">
                View Premium Plans
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Educational content only. We are not SEBI registered advisors.
          </p>
        </div>
      </section>
    </div>
  );
}
