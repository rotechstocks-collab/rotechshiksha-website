import { Link } from "wouter";
import {
  BookOpen,
  PlayCircle,
  BadgeCheck,
  GraduationCap,
  Radio,
} from "lucide-react";

export default function Home() {
  return (
    <>
      {/* ================= HERO (VARSITY STYLE) ================= */}
      <section className="bg-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Free and open <br />
              <span className="text-gray-700">stock market education</span>
            </h1>

            <p className="text-gray-600 text-lg mb-8 max-w-xl">
              Rotech Solutions ek free platform hai jahan aap stock market,
              investing aur wealth building step-by-step simple Hindi me seekh
              sakte ho. No tips. No ads. Only education.
            </p>

            <Link
              href="/start-learning"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Start Learning
            </Link>
          </div>

          {/* RIGHT CARTOON */}
          <div className="flex justify-center">
            <img
              src="https://undraw.co/api/illustrations/financial_data.svg"
              alt="Stock market learning illustration"
              className="w-full max-w-md"
            />
          </div>
        </div>
      </section>

      {/* ================= MODULE BOXES (VARSITY STYLE) ================= */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-10">
            Explore Learning Modules
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <ModuleCard
              color="bg-blue-400"
              icon={<BookOpen />}
              title="Basics"
              link="/basics"
            />

            <ModuleCard
              color="bg-pink-300"
              icon={<Radio />}
              title="Live"
              link="/live-market"
            />

            <ModuleCard
              color="bg-yellow-400"
              icon={<PlayCircle />}
              title="Videos"
              link="/videos"
            />

            <ModuleCard
              color="bg-purple-300"
              icon={<BadgeCheck />}
              title="Certified"
              link="/courses"
            />

            <ModuleCard
              color="bg-green-400"
              icon={<GraduationCap />}
              title="Beginner"
              link="/start-learning"
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ================= MODULE CARD COMPONENT ================= */

function ModuleCard({
  icon,
  title,
  link,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  link: string;
  color: string;
}) {
  return (
    <Link href={link}>
      <div className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
        <div className={`${color} p-6 text-white`}>
          <div className="w-10 h-10">{icon}</div>
        </div>
        <div className="p-4 font-medium text-gray-800">{title}</div>
      </div>
    </Link>
  );
}
