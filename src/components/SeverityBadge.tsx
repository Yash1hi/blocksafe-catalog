
import { cn } from "@/lib/utils";
import { VulnerabilityLevel } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface SeverityBadgeProps {
  severity: VulnerabilityLevel;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const badgeClass = `badge-${severity}`;
  const label = severity.charAt(0).toUpperCase() + severity.slice(1);
  
  return (
    <Badge variant="outline" className={cn(badgeClass, "rounded-sm font-medium", className)}>
      {label}
    </Badge>
  );
}
