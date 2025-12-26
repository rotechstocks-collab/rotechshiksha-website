import { Link } from "wouter";
import { Building2, PieChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Basics() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">📘 Stock Market Basics</h1>

      <p className="text-muted-foreground mb-6">
        Is section me aap stock market ki foundation seekhenge — bilkul zero se.
      </p>
      <div className="space-y-6">
        {/* Stock Market */}
        <div className="border rounded-lg p-5 flex gap-4">
          <Building2 className="w-8 h-8 text-primary mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-1">
              Stock Market kya hota hai?
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              Stock market ek jagah hoti hai jahan companies apne shares bechti
              hain aur investors unhe kharidte hain.
            </p>
            <div className="bg-muted/40 p-3 rounded-md text-sm">
              👨‍💼 Sochiye: Rahul ne company ka ek chhota hissa kharida.
            </div>
          </div>
        </div>

        {/* Share */}
        <div className="border rounded-lg p-5 flex gap-4">
          <PieChart className="w-8 h-8 text-primary mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-1">Share kya hota hai?</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Share ka matlab hota hai company ka ek chhota sa hissa.
            </p>
            <div className="bg-muted/40 p-3 rounded-md text-sm">
              🍕 Pizza ke 10 tukdon me se 1 tukda = 1 share
            </div>
          </div>
        </div>

        {/* NSE BSE */}
        <div className="border rounded-lg p-5 flex gap-4">
          <Users className="w-8 h-8 text-primary mt-1" />
          <div>
            <h2 className="font-semibold text-lg mb-1">
              NSE & BSE kya hote hain?
            </h2>
            <p className="text-sm text-muted-foreground mb-3">
              NSE aur BSE India ke do bade stock exchanges hain.
            </p>
            <div className="bg-muted/40 p-3 rounded-md text-sm">
              🏦 Yahin par shares kharide aur beche jaate hain
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 border rounded-xl p-6 bg-muted/30">
        <h3 className="text-xl font-semibold mb-2">
          📘 Free Beginner Checklist
        </h3>
        <p className="text-muted-foreground mb-4">
          Stock market start karne se pehle ye checklist zaroor dekhein.
        </p>
        <Button>Download Free PDF</Button>
      </div>
      <div className="mt-10 flex justify-between">
        <Link href="/start-learning">
          <a>
            <Button variant="outline">⬅ Back</Button>
          </a>
        </Link>

        <Link href="/start-learning/investing">
          <a>
            <Button>Next: Investing ➡</Button>
          </a>
        </Link>
      </div>
    </div>
  );
}
