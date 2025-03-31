
import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateStatsFromDb } from "@/lib/supabase-service";
import { Loader2 } from "lucide-react";

export function SeverityChart() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['vulnerability-stats'],
    queryFn: calculateStatsFromDb
  });
  
  if (isLoading) {
    return (
      <Card className="col-span-1 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Vulnerabilities by Severity</CardTitle>
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
          <CardTitle className="text-sm font-medium">Vulnerabilities by Severity</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            Failed to load severity data
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const data = [
    { name: "Critical", value: stats.bySeverity.critical, color: "#FF5252" },
    { name: "High", value: stats.bySeverity.high, color: "#FF7676" },
    { name: "Medium", value: stats.bySeverity.medium, color: "#FFD740" },
    { name: "Low", value: stats.bySeverity.low, color: "#29B6F6" },
    { name: "Info", value: stats.bySeverity.info, color: "#66BB6A" }
  ].filter(item => item.value > 0);

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Vulnerabilities by Severity</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No severity data available
          </p>
        ) : (
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => percent > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} vulnerabilities`, 'Count']}
                  contentStyle={{ background: '#112240', borderColor: '#1F2937', borderRadius: '0.375rem' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
