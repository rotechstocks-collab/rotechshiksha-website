import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { faqData, disclaimerText } from "@/content/faq-data";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pt-28">
      <SEOHead
        title="Beginner FAQ - Common Questions | Rotech Shiksha"
        description="Stock market beginners ke common questions. Simple Hindi me answers. Kya safe hai? Kitna paisa chahiye? Sab kuch yahan."
        keywords="stock market faq hindi, share market questions, beginner doubts, rotech shiksha faq"
      />

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-4">
              <HelpCircle className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Beginner FAQ
            </h1>
            <p className="text-sm text-muted-foreground mb-4">(Aam Sawaal – Simple Jawaab)</p>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Stock market beginners ke common questions. Honest answers, no sugarcoating.
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg bg-white dark:bg-card overflow-hidden"
                data-testid={`faq-item-${item.id}`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  data-testid={`faq-toggle-${item.id}`}
                >
                  <span className="font-medium text-foreground">{item.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform ${
                      openItems.includes(item.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openItems.includes(item.id) && (
                  <div className="px-5 pb-5">
                    <p className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Card className="mt-10 bg-slate-50 dark:bg-card/50 border-slate-200 dark:border-slate-700">
            <CardContent className="py-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Disclaimer:</strong> {disclaimerText}
              </p>
            </CardContent>
          </Card>

          <div className="mt-10 p-8 bg-slate-100 dark:bg-card/30 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">
              Aur sawaal hain?
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Humari learning levels me detailed explanations milenge. Step-by-step seekho.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/learn/level-1">
                <Button className="gap-2" data-testid="button-start-level1-faq">
                  Level 1 se Shuru Karo
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
          </div>
        </div>
      </section>
    </div>
  );
}
