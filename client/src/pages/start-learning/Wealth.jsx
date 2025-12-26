import { Link } from "wouter";
import { Target, LineChart, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Wealth() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">💰 Wealth Building</h1>

      <p className="text-muted-foreground mb-6">
        Ab focus hai long-term paisa banana aur galtiyon se bachna.
      </p>

      <div className="space-y-6">
        {/* Goal Setting */}
        <div className="border rounded-lg p-5 flex gap-4">
          <Target className="w-8 h-8 text-primary mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-1">Goal based investing</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Har investment ka ek clear goal hona chahiye.
            </p>
            <div className="bg-muted/40 p-3 rounded-md text-sm">
              🎯 Example: Ghar, retirement, bacchon ki padhai
            </div>
          </div>
        </div>

        {/* Compounding */}
        <div className="border rounded-lg p-5 flex gap-4">
          <LineChart className="w-8 h-8 text-primary mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-1">Power of Compounding</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Paisa paisa kamata hai — time ke saath magic hota hai.
            </p>
            <div className="bg-muted/40 p-3 rounded-md text-sm">
              📈 Jaldi start = zyada benefit
            </div>
          </div>
        </div>

        {/* Safety */}
        <div className="border rounded-lg p-5 flex gap-4">
          <Lock className="w-8 h-8 text-primary mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-1">
              Galtiyon se kaise bachein?
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Tips jo beginners ko loss se bachati hain.
            </p>
            <div className="bg-muted/40 p-3 rounded-md text-sm">
              🚫 Tips se door raho, patience rakho
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <Link href="/start-learning/investing">
          <a>
            <Button variant="outline">⬅ Back</Button>
          </a>
        </Link>

        <Link href="/dashboard">
          <a>
            <Button>Go to Dashboard 🚀</Button>
          </a>
        </Link>
      </div>
    </div>
  );
}
