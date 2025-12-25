import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Video, Award, Users, GraduationCap, Play, TrendingUp, Calculator, BarChart } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  href: string;
  delay: number;
}

function CategoryCard({ title, description, icon, color, bgColor, href, delay }: CategoryCardProps) {
  const testId = `link-category-${title.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <Link href={href} data-testid={testId}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          delay,
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          transition: { duration: 0.2, type: "spring", stiffness: 300 }
        }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer group"
        data-testid={`card-category-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className={`relative overflow-hidden rounded-2xl p-6 md:p-8 ${bgColor} border border-transparent group-hover:border-gray-200 dark:group-hover:border-gray-700 transition-all duration-300`}>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`w-full h-full rounded-full ${color}`}
            />
          </div>
          
          <motion.div 
            className={`inline-flex p-3 rounded-xl ${color} mb-4`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
          
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:translate-x-1 transition-transform duration-200">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
          
          <motion.div 
            className="mt-4 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: 'hsl(var(--primary))' }}
          >
            <span>Explore</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

export function VarsityHero() {
  const categories = [
    {
      title: "Modules",
      description: "Structured learning paths from basics to advanced trading concepts",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-100 dark:bg-blue-900/30",
      bgColor: "bg-blue-50/80 dark:bg-blue-950/20",
      href: "/courses",
    },
    {
      title: "Live Market",
      description: "Real-time market data, IPO tracking, and live news updates",
      icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-100 dark:bg-emerald-900/30",
      bgColor: "bg-emerald-50/80 dark:bg-emerald-950/20",
      href: "/ipo",
    },
    {
      title: "Videos",
      description: "Video tutorials with practical examples and real case studies",
      icon: <Play className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-100 dark:bg-purple-900/30",
      bgColor: "bg-purple-50/80 dark:bg-purple-950/20",
      href: "/courses",
    },
    {
      title: "Calculators",
      description: "20+ financial calculators for SIP, EMI, Tax planning and more",
      icon: <Calculator className="w-6 h-6 text-amber-600" />,
      color: "bg-amber-100 dark:bg-amber-900/30",
      bgColor: "bg-amber-50/80 dark:bg-amber-950/20",
      href: "/calculators",
    },
    {
      title: "Certified",
      description: "Get certified in stock market basics and trading strategies",
      icon: <Award className="w-6 h-6 text-rose-600" />,
      color: "bg-rose-100 dark:bg-rose-900/30",
      bgColor: "bg-rose-50/80 dark:bg-rose-950/20",
      href: "/courses",
    },
  ];

  return (
    <div className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-emerald-500/5"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <GraduationCap className="w-4 h-4" />
              </motion.span>
              Free Financial Education
            </motion.span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            Learn to Invest
            <br />
            <span className="text-primary">Confidently</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4"
          >
            India's most comprehensive stock market education platform. 
            Learn at your own pace with structured courses and practical examples.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span>10,000+ Learners</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>50+ Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart className="w-4 h-4 text-primary" />
              <span>100% Free</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              {...category}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
