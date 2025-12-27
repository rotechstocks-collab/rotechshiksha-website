import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Target,
  BookOpen,
  Shield,
  ArrowRight,
  GraduationCap,
  Users,
} from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

export default function About() {
  return (
    <div className="min-h-screen pt-28 bg-background">
      <SEOHead
        title="About Rotech Shiksha | Stock Market Education Platform"
        description="Learn about Rotech Shiksha - a beginner-friendly stock market education platform founded by Rohit Vaish. Free, honest, and focused on Indian retail investors."
        keywords="rotech shiksha about, stock market education india, rohit vaish, beginner investing"
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              About Rotech Shiksha
            </h1>
            <p className="text-sm text-muted-foreground">(Humari kahani)</p>
          </div>

          <div className="space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Rotech Shiksha ek beginner-friendly stock market education platform hai. 
                Humara goal simple hai: har Indian ko stock market ki basic samajh dena – 
                bina confusion, bina jargon ke.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Hum tips ya recommendations nahi dete. Hum sirf education dete hain – 
                taaki aap khud samajh ke apne decisions le sako.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-card/30">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Our Mission
            </h2>
            <p className="text-sm text-muted-foreground">(Humara mission)</p>
          </div>

          <div className="bg-white dark:bg-card rounded-lg border p-8 lg:p-12">
            <p className="text-lg text-center text-muted-foreground leading-relaxed">
              "Stock market ki basic knowledge har Indian tak pahunchana – 
              simple language me, practical examples ke saath, bilkul free."
            </p>
          </div>

          <div className="mt-8 p-6 bg-slate-100 dark:bg-card/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              This platform is built for beginners<br />
              to understand stock market basics without risk.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Founder
            </h2>
            <p className="text-sm text-muted-foreground">(Founder se miliye)</p>
          </div>

          <Card className="max-w-md mx-auto">
            <CardContent className="pt-8 pb-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-3xl font-bold text-slate-600 dark:text-slate-300">
                RV
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">Rohit Vaish</h3>
                <p className="text-muted-foreground">Founder – Rotech Shiksha</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Passionate about making stock market education accessible to every Indian beginner.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-card/30">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              What We Believe
            </h2>
            <p className="text-sm text-muted-foreground">(Humari soch)</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-card rounded-lg border p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-foreground">Education First</h3>
              <p className="text-sm text-muted-foreground">(Pehle padhai)</p>
              <p className="text-sm text-muted-foreground">
                Tips nahi, knowledge dete hain. Samjho, phir invest karo.
              </p>
            </div>

            <div className="bg-white dark:bg-card rounded-lg border p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-foreground">Risk Awareness</h3>
              <p className="text-sm text-muted-foreground">(Risk ko samjho)</p>
              <p className="text-sm text-muted-foreground">
                Har lesson me risk management – kyunki paisa bachana bhi zaroori hai.
              </p>
            </div>

            <div className="bg-white dark:bg-card rounded-lg border p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-foreground">Beginner Focus</h3>
              <p className="text-sm text-muted-foreground">(Beginners ke liye)</p>
              <p className="text-sm text-muted-foreground">
                Simple language, step-by-step lessons, koi confusion nahi.
              </p>
            </div>

            <div className="bg-white dark:bg-card rounded-lg border p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold text-foreground">Practical Learning</h3>
              <p className="text-sm text-muted-foreground">(Kaam ki baatein)</p>
              <p className="text-sm text-muted-foreground">
                Indian market ke real examples – jo actually kaam aaye.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Platform Highlights
            </h2>
            <p className="text-sm text-muted-foreground">(Kya milega yahan)</p>
          </div>

          <div className="bg-white dark:bg-card rounded-lg border p-8">
            <ul className="space-y-4">
              {[
                "8 structured learning levels – zero se confident investor tak",
                "Story-based learning with Rohit & Priya characters",
                "20+ free financial calculators (SIP, EMI, FD, etc.)",
                "Hindi-first content, English bhi available",
                "No tips, no recommendations – sirf education",
                "Early stage platform, growing learner community",
              ].map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-slate-800 dark:bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl lg:text-3xl font-bold">
            Ready to Start Learning?
          </h2>
          <p className="text-slate-300">(Seekhna shuru karein)</p>
          <p className="text-slate-300 max-w-xl mx-auto">
            Aaj hi Level 1 se shuru karo – bilkul free, bilkul asaan.
          </p>
          <div className="pt-4">
            <Link href="/learn/level-1" data-testid="link-about-start">
              <Button size="lg" className="bg-white text-slate-800 hover:bg-slate-100 gap-2" data-testid="button-about-start">
                Start Level 1
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-slate-100 dark:bg-card/50">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This website is for educational purposes only. 
            We do not provide investment advice. Invest at your own risk after proper research.
          </p>
        </div>
      </section>
    </div>
  );
}
