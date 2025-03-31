
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateStats } from "@/lib/data";
import { Shield, AlertTriangle, Check, AlertCircle, Activity } from "lucide-react";

export function DashboardStats() {
  const stats = calculateStats();
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Vulnerabilities</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            Documented vulnerabilities in the catalog
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
          <AlertTriangle className="h-4 w-4 text-blocksafe-danger" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.bySeverity.critical}</div>
          <p className="text-xs text-muted-foreground">
            High-impact vulnerabilities requiring immediate attention
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Patched</CardTitle>
          <Check className="h-4 w-4 text-blocksafe-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.patchedCount}</div>
          <p className="text-xs text-muted-foreground">
            Vulnerabilities with available fixes or patches
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Recent (30d)</CardTitle>
          <Activity className="h-4 w-4 text-blocksafe-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.recentCount}</div>
          <p className="text-xs text-muted-foreground">
            Recently discovered in the last 30 days
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
