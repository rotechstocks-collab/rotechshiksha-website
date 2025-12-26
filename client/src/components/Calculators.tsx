import { calculatorsData } from "@/data/calculators";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

export default function Calculators() {
  return (
    <div className="space-y-16">
      {calculatorsData.map((section) => (
        <section key={section.title}>
          {/* SECTION HEADER */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-foreground">
              {section.title}
            </h2>
            <span className="text-sm px-3 py-1 rounded-full bg-slate-100 dark:bg-muted">
              {section.items.length} tools
            </span>
          </div>

          {/* GRID */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {section.items.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link href={item.href}>
                  <Card
                    className="group h-full cursor-pointer border border-slate-200 dark:border-border 
                    bg-white dark:bg-card shadow-sm hover:shadow-2xl transition-all duration-300"
                  >
                    <CardContent className="p-5 flex flex-col h-full">
                      {/* ICON */}
                      <div
                        className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 
                        text-white flex items-center justify-center mb-4"
                      >
                        <item.icon className="w-6 h-6" />
                      </div>

                      {/* TITLE */}
                      <h3 className="font-semibold text-slate-800 dark:text-foreground mb-1">
                        {item.title}
                      </h3>

                      {/* DESC */}
                      <p className="text-sm text-muted-foreground flex-grow">
                        {item.description}
                      </p>

                      {/* CTA */}
                      <div className="mt-4 flex items-center justify-between text-sm font-medium text-blue-600">
                        Open Calculator
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
