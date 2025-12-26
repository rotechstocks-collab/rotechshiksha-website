import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function StartLearning() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4 text-center">
        📘 Start Learning Stock Market
      </h1>

      <p className="text-center text-muted-foreground mb-10">
        Zero se start karke step-by-step stock market seekhiye.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* BASICS */}
        <div className="border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">🧠 Stock Market Basics</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Stock market kya hota hai, share, NSE, BSE, demat – sab basics.
          </p>

          <Link href="/start-learning/basics">
            <a className="block">
              <Button className="w-full">Start Basics</Button>
            </a>
          </Link>
        </div>

        {/* INVESTING */}
        <div className="border rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">📈 Investing & Growth</h2>
          <p className="text-sm text-muted-foreground mb-4">
            SIP, mutual funds, compounding aur long-term strategy.
          </p>

          <Link href="/start-learning/investing">
            <a className="block">
              <Button className="w-full" variant="outline">
                Learn Investing
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
