import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "healthy" | "warning" | "critical" | "offline" | "provisioning";
  label?: string;
  className?: string;
}

const statusConfig = {
  healthy: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  warning: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning" },
  critical: { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive animate-pulse-subtle" },
  offline: { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-muted-foreground" },
  provisioning: { bg: "bg-info/10", text: "text-info", dot: "bg-info animate-pulse-subtle" },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", config.bg, config.text, className)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
