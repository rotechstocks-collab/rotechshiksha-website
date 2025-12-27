import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, ArrowRight } from "lucide-react";
import { faqData } from "@/content/faq-data";
import { motion } from "framer-motion";

interface FAQSectionProps {
  limit?: number;
  showTitle?: boolean;
  showViewAllLink?: boolean;
}

export function FAQSection({ limit, showTitle = true, showViewAllLink = true }: FAQSectionProps) {
  const displayedFaqs = limit ? faqData.slice(0, limit) : faqData;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        {showTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 rounded-full bg-primary/10">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Aksar Poochhe Jaane Wale Sawaal
            </h2>
            <p className="text-muted-foreground">
              Beginners ke common questions ke simple answers
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {displayedFaqs.map((faq, index) => (
                  <AccordionItem key={faq.id} value={faq.id} data-testid={`faq-item-${faq.id}`}>
                    <AccordionTrigger 
                      className="text-left text-base font-medium hover:no-underline"
                      data-testid={`faq-trigger-${faq.id}`}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <p>{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>

        {showViewAllLink && limit && faqData.length > limit && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-6"
          >
            <Link href="/faq">
              <Button variant="outline" className="gap-2" data-testid="button-view-all-faq">
                Saare Sawaal Dekhein
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
