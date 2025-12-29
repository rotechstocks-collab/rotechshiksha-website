import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, HelpCircle, ChevronDown, BookOpen, GraduationCap, Shield } from "lucide-react";
import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { faqData, disclaimerText } from "@/content/faq-data";

const relatedBlogPosts = [
  { title: "Share Market kya hota hai?", slug: "share-market-kya-hota-hai" },
  { title: "Kya share market safe hai?", slug: "kya-share-market-safe-hai" },
  { title: "Kitne paise se start karein?", slug: "kitne-paise-se-start-karein" },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>(["1", "2", "3"]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="page-bg pt-20">
      <SEOHead
        title="Stock Market Beginners ke Common Doubts – Rotech Shiksha"
        description="Har beginner ke mann me aane wale sawaal – honest answers, simple Hindi me. No sales pitch, just education."
        keywords="stock market faq hindi, share market questions, beginner doubts, is stock market safe, how to start investing"
      />

      <section className="py-8 lg:py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-3">
              <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Stock Market Beginners ke Common Doubts
            </h1>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              Yeh wahi sawal hain jo har beginner ke mann me aate hain — bilkul natural.
            </p>
          </div>

          <div className="space-y-3">
            {faqData.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg bg-white dark:bg-card overflow-hidden shadow-sm"
                data-testid={`faq-item-${item.id}`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-4 py-4 text-left flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors min-h-[56px]"
                  data-testid={`faq-toggle-${item.id}`}
                >
                  <span className="font-medium text-foreground text-sm sm:text-base leading-relaxed">{item.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5 transition-transform ${
                      openItems.includes(item.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openItems.includes(item.id) && (
                  <div className="px-4 pb-4 border-t border-border/30">
                    <p className="text-sm text-muted-foreground leading-relaxed pt-3">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-slate-50 dark:bg-card/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-foreground text-sm">Related Articles</h3>
            </div>
            <div className="space-y-1.5">
              {relatedBlogPosts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5" data-testid={`link-related-${post.slug}`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                    {post.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200/60 dark:border-slate-700/50 p-4">
            <div className="flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <span className="font-medium text-slate-700 dark:text-slate-300">Important:</span> {disclaimerText}
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/15 dark:to-teal-900/15 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/40 mb-3">
              <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1.5">
              Seekhna Shuru Karein
            </h3>
            <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto leading-relaxed">
              Rohit ne bhi yahin se shuruaat ki thi — aap bhi kar sakte ho.
            </p>
            <Link href="/beginner-course">
              <Button size="lg" className="w-full sm:w-auto gap-2 min-h-[48px] text-base" data-testid="button-start-beginner-course-faq">
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
