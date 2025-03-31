
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VulnerabilityCard } from "@/components/VulnerabilityCard";
import { fetchVulnerabilities } from "@/lib/supabase-service";
import { Loader2 } from "lucide-react";

export function RecentVulnerabilities() {
  const { data: vulnerabilities, isLoading, error } = useQuery({
    queryKey: ['vulnerabilities'],
    queryFn: fetchVulnerabilities
  });
  
  if (isLoading) {
    return (
      <Card className="col-span-1 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Vulnerabilities</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }
  
  if (error || !vulnerabilities) {
    return (
      <Card className="col-span-1 lg:col-span-3">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Vulnerabilities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Failed to load recent vulnerabilities
          </p>
        </CardContent>
      </Card>
    );
  }
  
  // Sort vulnerabilities by discovery date (newest first)
  const sortedVulnerabilities = [...vulnerabilities].sort(
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
        {recentVulnerabilities.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No vulnerabilities available
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {recentVulnerabilities.map((vulnerability) => (
              <VulnerabilityCard
                key={vulnerability.id}
                vulnerability={vulnerability}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
