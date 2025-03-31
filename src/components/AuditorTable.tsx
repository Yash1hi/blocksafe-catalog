
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { calculateStats } from "@/lib/data";

export function AuditorTable() {
  const stats = calculateStats();
  
  const auditorData = Object.entries(stats.byAuditor)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Top Security Auditors</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
