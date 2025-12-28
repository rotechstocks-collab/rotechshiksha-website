import { PricingPlans } from "@/components/PricingPlans";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, CheckCircle, HelpCircle, Star, Users, Award, Clock } from "lucide-react";

const faqs = [
  {
    question: "Kya ye course sach mein FREE hai?",
    questionEn: "Is this course really FREE?",
    answer: "Haan bilkul! 8 levels, calculators, paper trading - sab FREE hai. Koi hidden charges nahi. Future mein premium features aa sakte hain, par core learning hamesha free rahega.",
    answerEn: "Yes, absolutely! 8 levels, calculators, paper trading - all FREE. No hidden charges. Premium features may come in future, but core learning stays free forever.",
  },
  {
    question: "Course kitne din mein complete hoga?",
    questionEn: "How long does it take to complete?",
    answer: "Apni speed pe depend karta hai. Daily 30 min doge toh 2-3 weeks mein complete. Lifetime access hai toh koi rush nahi - apni pace se seekho.",
    answerEn: "Depends on your speed. 30 min daily = 2-3 weeks to complete. Lifetime access means no rush - learn at your own pace.",
  },
  {
    question: "Kya investment tips milenge?",
    questionEn: "Will I get investment tips?",
    answer: "Nahi. Hum SEBI registered advisor nahi hain. Yeh education platform hai - stock market samajhna sikhate hain, tips nahi dete. Decision aap khud informed loge!",
    answerEn: "No. We're not SEBI registered advisors. This is education platform - we teach market understanding, not tips. You make your own informed decisions!",
  },
  {
    question: "Beginners ke liye suitable hai?",
    questionEn: "Is it suitable for beginners?",
    answer: "100% haan! Zero knowledge se start hota hai. Simple Hindi mein samjhayenge - koi jargon nahi. Priya & Rohit ke saath story-based learning hai.",
    answerEn: "100% yes! Starts from zero knowledge. Simple Hindi explanations - no jargon. Story-based learning with Priya & Rohit.",
  },
  {
    question: "Mobile app hai kya?",
    questionEn: "Is there a mobile app?",
    answer: "Abhi website hai jo mobile friendly hai - phone pe perfectly kaam karta hai. App jaldi aa raha hai. Browser bookmark kar lo!",
    answerEn: "Currently it's a mobile-friendly website - works perfectly on phone. App coming soon. Bookmark in browser!",
  },
  {
    question: "Priya aur Rohit kaun hain?",
    questionEn: "Who are Priya and Rohit?",
    answer: "Priya tumhari expert guide hai jo concepts samjhaati hai. Rohit tumhare jaisa learner hai jo sawal poochta hai. Dono ke saath interactive learning!",
    answerEn: "Priya is your expert guide who explains concepts. Rohit is a learner like you who asks questions. Interactive learning with both!",
  },
];

const trustBadges = [
  { icon: <Users className="w-5 h-5" />, text: "10,000+ Learners", textHi: "10,000+ सीखने वाले" },
  { icon: <Star className="w-5 h-5" />, text: "4.8 Rating", textHi: "4.8 Rating" },
  { icon: <Award className="w-5 h-5" />, text: "100% Free", textHi: "100% Free" },
  { icon: <Clock className="w-5 h-5" />, text: "Lifetime Access", textHi: "Lifetime Access" },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f9fc' }}>
      <section className="section">
        <div className="page-container text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Simple & Transparent
          </span>
          <h1 className="varsity-h1 mb-3">
            Pricing Plans
          </h1>
          <p className="varsity-body max-w-xl mx-auto mb-8">
            Start free, upgrade when you're ready for personalized guidance.
            <br />
            <span className="text-sm">Koi hidden charges nahi - jo dikhta hai wohi milta hai.</span>
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-8">
            {trustBadges.map((badge, i) => (
              <div key={i} className="trust-badge">
                <span className="text-blue-600">{badge.icon}</span>
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PricingPlans />

      <section className="section-sm">
        <div className="page-container max-w-3xl">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              FAQs
            </span>
            <h2 className="varsity-h2 mb-2">
              Aksar Pooche Jaane Wale Sawal
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Common doubts ke answers - simple Hindi mein
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="soft-card overflow-hidden">
                <Accordion type="single" collapsible>
                  <AccordionItem value={`faq-${index}`} className="border-none" data-testid={`faq-${index}`}>
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <span className="font-medium text-slate-900 dark:text-white">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="page-container">
          <div className="soft-card p-6 md:p-8 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30 border-blue-200 dark:border-blue-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">
                    100% Satisfaction Guarantee
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Khush nahi ho? 7 din ke andar full refund - koi sawal nahi.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  "Secure payment",
                  "Instant access",
                  "7-day money back"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
