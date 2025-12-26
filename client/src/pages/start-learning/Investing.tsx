import { Link } from "wouter";
import { TrendingUp, Target, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Investing() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">
        📈 Investing – Paisa Kaise Grow Kare
      </h1>

      <p className="text-muted-foreground mb-8">
        Investing ka matlab hota hai aaj thoda paisa lagakar future me zyada
        paisa banana — bina tension ke.
      </p>

      <div className="space-y-8">
        {/* LONG TERM */}
        <div className="border rounded-xl p-6 flex gap-4 hover:shadow-md transition">
          <TrendingUp className="w-9 h-9 text-primary animate-pulse" />
          <div>
            <h2 className="font-semibold text-lg mb-2">
              Long-Term Investing kya hota hai?
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Achhi company me saalon tak invested rehna hi long-term investing
              hota hai.
            </p>
            <div className="bg-muted/40 p-3 rounded-md text-sm">
              📘 Story: Ramesh ne 2015 me ek company li aur 10 saal tak rakhi.
            </div>
          </div>
        </div>

        {/* GOALS */}
        <div className="border rounded-xl p-6 flex gap-4 hover:shadow-md transition">
          <Target className="w-9 h-9 text-primary animate-bounce" />
          <div>
            <h2 className="font-semibold text-lg mb-2">Goal-Based Investing</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Investing bina goal ke nahi hoti — har paisa ka purpose hota hai.
            </p>
            <div className="bg-muted/40 p-3 rounded-md text-sm">
              🎯 Goal: Ghar • Bachchon ki padhai • Retirement
            </div>
          </div>
        </div>

        {/* RISK */}
        <div className="border rounded-xl p-6 flex gap-4 hover:shadow-md transition">
          <ShieldCheck className="w-9 h-9 text-primary animate-pulse" />
          <div>
            <h2 className="font-semibold text-lg mb-2">
              Risk ka matlab kya hota hai?
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Zyada return = thoda zyada risk. Samajh ke invest karna zaroori
              hai.
            </p>
            <div className="bg-muted/40 p-3 rounded-md text-sm">
              🛡️ Rule: Kabhi bhi bina samjhe paisa mat lagao
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-10 border rounded-xl p-6 bg-muted/30">
        <h3 className="text-xl font-semibold mb-2">
          🚀 Investing Ready Checklist
        </h3>
        <p className="text-muted-foreground mb-4">
          Pehla investment karne se pehle ye steps zaroor check karo.
        </p>
        <Button>Download Free Checklist</Button>
      </div>

      {/* NAVIGATION */}
      <div className="mt-10 flex justify-between">
        <Link href="/start-learning/basics">
          <Button variant="outline">⬅ Basics</Button>
        </Link>

        <Link href="/start-learning/wealth">
          <Button>Next: Wealth Building ➡</Button>
        </Link>
      </div>
    </div>
  );
}
