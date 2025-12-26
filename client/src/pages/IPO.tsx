import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface IPO {
  name: string;
  priceBand: string;
  openDate: string;
  closeDate: string;
  issueSize: string;
  status: string;
}

export default function IPO() {
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchIPOData = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://YOUR_API_ENDPOINT_HERE", {
        headers: {
          "X-RapidAPI-Key": "YOUR_API_KEY",
          "X-RapidAPI-Host": "YOUR_API_HOST",
        },
      });

      const data = await response.json();

      // API ke structure ke hisab se mapping
      const formatted = data.map((item: any) => ({
        name: item.companyName,
        priceBand: item.priceBand,
        openDate: item.openDate,
        closeDate: item.closeDate,
        issueSize: item.issueSize,
        status: item.status,
      }));

      setIpos(formatted);
      setError("");
    } catch (err) {
      setError("Failed to fetch IPO data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIPOData();

    // 🔁 AUTO REFRESH every 10 minutes
    const interval = setInterval(fetchIPOData, 600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Live IPO Listings</CardTitle>
          <p className="text-sm text-muted-foreground">
            Automatically updated IPO data
          </p>
        </CardHeader>

        <CardContent>
          {loading && <p>Loading IPO data...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full border text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="p-2 text-left">Company</th>
                    <th className="p-2">Price Band</th>
                    <th className="p-2">Open</th>
                    <th className="p-2">Close</th>
                    <th className="p-2">Issue Size</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ipos.map((ipo, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{ipo.name}</td>
                      <td className="p-2">{ipo.priceBand}</td>
                      <td className="p-2">{ipo.openDate}</td>
                      <td className="p-2">{ipo.closeDate}</td>
                      <td className="p-2">{ipo.issueSize}</td>
                      <td className="p-2">
                        <Badge variant="outline">{ipo.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Separator className="my-4" />

          <p className="text-xs text-muted-foreground">
            ⚠ Disclaimer: IPO data is fetched from third-party APIs for
            educational purposes only. This is not investment advice.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
