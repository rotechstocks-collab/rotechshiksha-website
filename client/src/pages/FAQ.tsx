import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, HelpCircle, ChevronDown, BookOpen, GraduationCap } from "lucide-react";
import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { faqData, disclaimerText } from "@/content/faq-data";

const relatedBlogPosts = [
  { title: "Share Market kya hota hai?", slug: "share-market-kya-hota-hai" },
  { title: "Kya share market safe hai?", slug: "kya-share-market-safe-hai" },
  { title: "Kitne paise se start karein?", slug: "kitne-paise-se-start-karein" },
];

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
        title="Stock Market FAQ for Beginners – Rotech Shiksha"
        description="Common beginner questions answered honestly in Hinglish. Is it safe? How much money needed? No sales pitch, just education."
        keywords="stock market faq hindi, share market questions, beginner doubts, is stock market safe, how to start investing"
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

          <div className="mt-10 p-6 bg-slate-50 dark:bg-card/50 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-foreground">Related Articles</h3>
            </div>
            <div className="space-y-2">
              {relatedBlogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1" data-testid={`link-related-${post.slug}`}>
                    <ArrowRight className="w-4 h-4" />
                    {post.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Card className="mt-6 bg-slate-50 dark:bg-card/50 border-slate-200 dark:border-slate-700">
            <CardContent className="py-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Disclaimer:</strong> {disclaimerText}
              </p>
            </CardContent>
          </Card>

          <div className="mt-10 p-8 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/50 mb-4">
              <GraduationCap className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Ready to Start Learning?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Beginner Stock Market Course mein 13 lessons hain jo aapko zero se stock market samjhayenge.
            </p>
            <Link href="/beginner-course">
              <Button size="lg" className="gap-2 min-h-[48px] text-base font-semibold" data-testid="button-start-beginner-course-faq">
                Start Beginner Stock Market Course
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
