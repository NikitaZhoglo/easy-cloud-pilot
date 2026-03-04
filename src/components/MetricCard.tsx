import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  iconClassName?: string;
  className?: string;
}

export function MetricCard({ icon: Icon, label, value, change, changeType = "neutral", iconClassName, className }: MetricCardProps) {
  return (
    <div className={cn("bg-card rounded-lg border border-border p-5 flex items-start gap-4", className)}>
      <div className={cn("p-2.5 rounded-lg bg-primary/10", iconClassName)}>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold text-foreground mt-0.5">{value}</p>
        {change && (
          <p className={cn("text-xs mt-1", {
            "text-success": changeType === "up",
            "text-destructive": changeType === "down",
            "text-muted-foreground": changeType === "neutral",
          })}>
            {changeType === "up" && "↑ "}{changeType === "down" && "↓ "}{change}
          </p>
        )}
      </div>
    </div>
  );
}
