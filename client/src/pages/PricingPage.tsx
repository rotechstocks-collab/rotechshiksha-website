import { PricingPlans } from "@/components/PricingPlans";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Shield, CheckCircle, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Is the free plan really free forever?",
    answer: "Yes! All our free content including ebooks, videos, and calculators remain free forever. There are no hidden charges or mandatory upgrades.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept UPI, bank transfers, and all major payment methods. After making the payment, simply upload the screenshot for verification.",
  },
  {
    question: "How long does plan activation take?",
    answer: "Once you upload the payment screenshot, our team verifies it within 24 hours. Most activations happen within a few hours during business hours.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes, you can upgrade anytime. If you have an existing plan, the remaining value will be adjusted in your upgrade cost.",
  },
  {
    question: "Do you provide trading tips or recommendations?",
    answer: "No, we are purely an educational platform. We teach you how to analyze markets and make your own informed decisions. We do not provide buy/sell tips.",
  },
  {
    question: "What if I'm not satisfied with the course?",
    answer: "We offer a 7-day money-back guarantee for paid plans. If you're not satisfied, contact our support team within 7 days for a full refund.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-28">
      <section className="py-8 bg-card/50 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">Pricing Plans</h1>
          <p className="text-muted-foreground mt-2">
            Start free, upgrade when you're ready for personalized guidance
          </p>
        </div>
      </section>

      <PricingPlans />

      <section className="py-16 bg-card/50">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border rounded-lg px-4"
                data-testid={`faq-${index}`}
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-10 h-10 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">100% Satisfaction Guarantee</h3>
                    <p className="text-muted-foreground mt-1">
                      Not happy with our course? Get a full refund within 7 days - no questions asked.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Instant access</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>7-day money back</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
