import { useRoute, Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  User, 
  GraduationCap,
  BookOpen 
} from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts, blogCategories } from "@/content/blog-data";
import { SEOHead } from "@/components/SEOHead";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const post = blogPosts.find((p) => p.slug === params?.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="py-8 text-center">
            <h2 className="text-xl font-semibold mb-2">Article nahi mila</h2>
            <p className="text-muted-foreground mb-4">
              Ye blog post exist nahi karta ya remove ho gaya hai.
            </p>
            <Link href="/blog">
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Blog pe wapas jaayein
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${post.title} | Rotech Shiksha`}
        description={post.shortDescription}
        keywords={`${post.title}, stock market hindi, share market learning`}
      />

      <article className="py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="gap-1 mb-6" data-testid="button-back-to-blog">
                <ArrowLeft className="w-4 h-4" />
                Blog pe wapas
              </Button>
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline">Level {post.relatedLevel}</Badge>
              <Badge variant="secondary">
                {blogCategories.find(c => c.id === post.category)?.hindiName}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedDate).toLocaleDateString("hi-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              {post.shortDescription}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="mb-8">
              <CardContent className="py-6">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {post.content.split("\n\n").map((block, index) => {
                    if (block.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-xl font-bold text-foreground mt-6 mb-3">
                          {block.replace("## ", "")}
                        </h2>
                      );
                    }
                    if (block.startsWith("### ")) {
                      return (
                        <h3 key={index} className="text-lg font-semibold text-foreground mt-4 mb-2">
                          {block.replace("### ", "")}
                        </h3>
                      );
                    }
                    if (block.includes("\n- ") || block.startsWith("- ")) {
                      const lines = block.split("\n");
                      return (
                        <ul key={index} className="list-disc list-inside mb-4 space-y-1">
                          {lines.map((line, i) => (
                            <li key={i} className="text-foreground leading-relaxed">
                              {line.replace(/^- /, "")}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    if (block.includes("\n1. ") || block.startsWith("1. ")) {
                      const lines = block.split("\n");
                      return (
                        <ol key={index} className="list-decimal list-inside mb-4 space-y-1">
                          {lines.map((line, i) => (
                            <li key={i} className="text-foreground leading-relaxed">
                              {line.replace(/^\d+\. /, "")}
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={index} className="text-foreground leading-relaxed mb-4">
                        {block}
                      </p>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="mb-8 bg-gradient-to-br from-sky-50 to-violet-50 dark:from-sky-950/30 dark:to-violet-950/30 border-sky-200 dark:border-sky-800">
              <CardContent className="py-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex gap-2">
                    <div className="p-1.5 rounded-md bg-sky-100 text-sky-600 dark:bg-sky-900/50 dark:text-sky-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="p-1.5 rounded-md bg-violet-100 text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Rohit & Priya ki Story
                  </span>
                </div>
                <p className="text-foreground italic leading-relaxed">
                  "{post.rohitPriyaStory}"
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800">
              <CardContent className="py-6 text-center">
                <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50 inline-block mb-4">
                  <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-lg font-medium text-foreground mb-4">
                  {post.ctaText}
                </p>
                <Link href={post.ctaLink}>
                  <Button className="gap-2" data-testid="button-go-to-level">
                    Level {post.relatedLevel} pe jaayein
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 pt-8 border-t"
          >
            <h3 className="text-lg font-semibold mb-4">Aur padhein</h3>
            <div className="grid gap-4">
              {blogPosts
                .filter((p) => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="hover-elevate cursor-pointer" data-testid={`related-blog-${relatedPost.id}`}>
                      <CardContent className="py-4">
                        <h4 className="font-medium text-foreground mb-1">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {relatedPost.shortDescription}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
