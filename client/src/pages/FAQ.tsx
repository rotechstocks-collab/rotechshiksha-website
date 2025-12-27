import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { FAQSection } from "@/components/FAQSection";
import { SEOHead } from "@/components/SEOHead";
import { disclaimerText } from "@/content/faq-data";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="FAQ - Aksar Poochhe Jaane Wale Sawaal | Rotech Shiksha"
        description="Rotech Shiksha ke baare me common questions. Beginners ke liye simple Hindi me answers."
        keywords="rotech shiksha faq, stock market questions hindi, share market doubts"
      />

      <div className="py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1 mb-6" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
                Home pe wapas
              </Button>
            </Link>
          </motion.div>
        </div>

        <FAQSection showTitle={true} showViewAllLink={false} />

        <div className="max-w-3xl mx-auto px-4 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
              <CardContent className="py-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/50">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Important Disclaimer
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {disclaimerText}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="py-8 text-center">
                <h3 className="text-lg font-semibold mb-2">
                  Aur sawaal hain?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Humare learning levels me detailed explanations milenge.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/learn/level-1">
                    <Button className="gap-2" data-testid="button-start-learning-faq">
                      Learning Shuru Karein
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button variant="outline" className="gap-2" data-testid="button-read-blog-faq">
                      Blog Padhein
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
