import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "@/content/blog-data";
import { SEOHead } from "@/components/SEOHead";

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Market Gyaan - Stock Market Blog | Rotech Shiksha"
        description="Share market ke baare me simple Hindi articles. Beginners ke liye easy guides, tips, aur Rohit-Priya stories."
        keywords="stock market blog hindi, share market articles, investing tips hindi, market gyaan"
      />

      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Market Gyaan
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Share market ke concepts simple Hindi me. Beginners ke liye easy-to-read articles.
            </p>
          </motion.div>

          <div className="space-y-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover-elevate" data-testid={`blog-card-${post.id}`}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        Level {post.relatedLevel}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedDate).toLocaleDateString("hi-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <CardTitle className="text-xl leading-tight">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.shortDescription}
                    </p>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="gap-2" data-testid={`button-read-${post.id}`}>
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 text-center"
          >
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="py-8">
                <h3 className="text-lg font-semibold mb-2">
                  Aur seekhna hai?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Humare 8-level learning path se stock market basics se advanced tak seekho.
                </p>
                <Link href="/courses">
                  <Button className="gap-2" data-testid="button-explore-courses">
                    Explore Learning Path
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
