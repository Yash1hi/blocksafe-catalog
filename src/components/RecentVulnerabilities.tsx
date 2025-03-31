
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VulnerabilityCard } from "@/components/VulnerabilityCard";
import { vulnerabilitiesData } from "@/lib/data";

export function RecentVulnerabilities() {
  // Sort vulnerabilities by discovery date (newest first)
  const sortedVulnerabilities = [...vulnerabilitiesData].sort(
    (a, b) => new Date(b.discoveryDate).getTime() - new Date(a.discoveryDate).getTime()
  );
  
  // Take the 4 most recent
  const recentVulnerabilities = sortedVulnerabilities.slice(0, 4);

  return (
    <Card className="col-span-1 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Recent Vulnerabilities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {recentVulnerabilities.map((vulnerability) => (
            <VulnerabilityCard
              key={vulnerability.id}
              vulnerability={vulnerability}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
