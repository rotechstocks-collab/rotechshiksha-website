import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowRight, Calendar } from "lucide-react";
import { blogPosts, blogCategories, BlogCategory } from "@/content/blog-data";
import { SEOHead } from "@/components/SEOHead";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "all">("all");

  const filteredPosts = activeCategory === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="page-bg">
      <SEOHead
        title="Market Gyaan – Stock Market Blog in Hindi | Rotech Shiksha"
        description="Stock market articles in simple Hinglish. Beginner questions answered, no trading tips. Educational content only."
        keywords="stock market blog hindi, share market articles, investing guide hindi, market gyaan, beginner stock questions"
      />

      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Market Gyaan (Blog)
            </h1>
            <p className="text-sm text-muted-foreground mb-4">(Share market ki basic baatein)</p>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Simple Hinglish me stock market concepts. Beginners ke liye easy-to-read articles.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory("all")}
              data-testid="button-category-all"
            >
              All
            </Button>
            {blogCategories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
                data-testid={`button-category-${cat.id}`}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {activeCategory !== "all" && (
            <div className="mb-8 p-4 bg-slate-50 dark:bg-card/50 rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                {blogCategories.find(c => c.id === activeCategory)?.description}
              </p>
            </div>
          )}

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover-elevate" data-testid={`blog-card-${post.id}`}>
                <CardContent className="py-5 px-6">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">
                      Level {post.relatedLevel}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {blogCategories.find(c => c.id === post.category)?.hindiName}
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
                  
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.shortDescription}
                  </p>
                  
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="outline" size="sm" className="gap-2" data-testid={`button-read-${post.id}`}>
                      Padhein
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Is category me abhi koi article nahi hai.</p>
            </div>
          )}

          <div className="mt-12 p-8 bg-slate-50 dark:bg-card/50 rounded-lg text-center">
            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 inline-block mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Aur detail me seekhna hai?
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
              Humare 8-level structured learning path se stock market zero se advanced tak seekho.
            </p>
            <Link href="/courses">
              <Button className="gap-2" data-testid="button-explore-courses">
                Learning Path Dekho
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-slate-100 dark:bg-card/30 rounded-lg">
            <p className="text-xs text-center text-muted-foreground">
              <strong>Disclaimer:</strong> Ye articles sirf educational purpose ke liye hain. 
              Koi bhi buy/sell recommendation nahi hai. Invest karne se pehle apni research karein.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
