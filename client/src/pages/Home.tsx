import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  LineChart,
  PlayCircle,
  Calculator,
  GraduationCap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#F8FAFC] text-[#0F172A]">
      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Simple & Honest <br /> Stock Market Education
          </h1>

          <p className="mt-5 text-lg text-slate-600 max-w-xl">
            Learn stock market from scratch in simple Hindi. No fake promises.
            No paid tips. Only real knowledge.
          </p>

          <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-lg px-6 py-5">
            Start Learning Free
          </Button>
        </div>

        {/* Right Illustration */}
        <div className="flex justify-center">
          <img
            src="/attached_assets1/hero.png"
            alt="Stock Market Education"
            className="w-full max-w-md animate-[float_6s_ease-in-out_infinite]"
          />
        </div>
      </section>

      {/* ================= EXPLORE LEARNING ================= */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Explore Learning
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { icon: BookOpen, title: "Basics" },
            { icon: LineChart, title: "Trading" },
            { icon: PlayCircle, title: "Videos" },
            { icon: Calculator, title: "Tools" },
            { icon: GraduationCap, title: "Beginner" },
          ].map((item, i) => (
            <Card
              key={i}
              className="p-6 text-center rounded-2xl hover:shadow-lg transition-all cursor-pointer bg-white"
            >
              <item.icon className="mx-auto h-8 w-8 text-blue-600" />
              <p className="mt-4 font-medium">{item.title}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= LEARNING PATH ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Learning Modules
        </h2>
        <p className="text-center text-slate-600 mb-12">
          Structured path from basics to advanced trading
        </p>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Stock Market Basics",
              color: "bg-green-100 text-green-700",
            },
            {
              step: "2",
              title: "Technical Analysis",
              color: "bg-blue-100 text-blue-700",
            },
            {
              step: "3",
              title: "Options & Strategies",
              color: "bg-purple-100 text-purple-700",
            },
            {
              step: "4",
              title: "Algo Trading",
              color: "bg-orange-100 text-orange-700",
            },
          ].map((item, i) => (
            <Card key={i} className="p-6 rounded-2xl bg-white">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${item.color}`}
              >
                {item.step}
              </div>
              <h3 className="mt-4 font-semibold text-lg">{item.title}</h3>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
