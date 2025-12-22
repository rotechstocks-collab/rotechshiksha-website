import { AllCalculators } from "@/components/Calculators";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, Info } from "lucide-react";

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen pt-28">
      <section className="py-8 bg-card/50 border-b">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Trading Calculators</h1>
              <p className="text-muted-foreground">Essential tools for smarter trading decisions</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <AllCalculators />

          <Card className="mt-8 bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-700 dark:text-blue-300">How to use these calculators</p>
                <p className="text-blue-600 dark:text-blue-400">
                  These calculators help you make informed trading decisions. The SIP calculator shows
                  how your investments can grow over time. Use the Risk-Reward calculator to evaluate
                  trade setups. Position sizing helps determine how much to invest per trade based on
                  your risk tolerance. The brokerage calculator shows all trading costs including STT,
                  GST, and exchange charges.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
