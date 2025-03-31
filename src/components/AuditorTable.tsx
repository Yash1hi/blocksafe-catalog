
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateStatsFromDb } from "@/lib/supabase-service";
import { Loader2 } from "lucide-react";

export function AuditorTable() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['vulnerability-stats'],
    queryFn: calculateStatsFromDb
  });
  
  if (isLoading) {
    return (
      <Card className="col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Top Security Auditors</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }
  
  if (error || !stats) {
    return (
      <Card className="col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Top Security Auditors</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Failed to load auditor data
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const auditorData = Object.entries(stats.byAuditor)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Top Security Auditors</CardTitle>
      </CardHeader>
      <CardContent>
        {auditorData.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No auditor data available
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Auditor</TableHead>
                <TableHead className="text-right">Findings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditorData.map((auditor) => (
                <TableRow key={auditor.name}>
                  <TableCell className="font-medium">{auditor.name}</TableCell>
                  <TableCell className="text-right">{auditor.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
