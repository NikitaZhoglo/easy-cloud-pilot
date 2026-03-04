import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface HeatmapCell {
  id: string;
  label: string;
  value: number; // 0-100
  status: "healthy" | "warning" | "critical" | "offline";
}

interface ClusterHeatmapProps {
  cells: HeatmapCell[];
  title: string;
  className?: string;
}

const getColor = (value: number, status: string) => {
  if (status === "offline") return "bg-muted";
  if (value >= 90) return "bg-destructive";
  if (value >= 75) return "bg-warning";
  if (value >= 50) return "bg-info";
  return "bg-success";
};

export function ClusterHeatmap({ cells, title, className }: ClusterHeatmapProps) {
  return (
    <div className={cn("bg-card rounded-lg border border-border p-5", className)}>
      <h3 className="text-sm font-semibold text-foreground mb-4">{title}</h3>
      <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-1.5">
        {cells.map((cell) => (
          <Tooltip key={cell.id}>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "aspect-square rounded-md cursor-pointer transition-all hover:scale-110 hover:ring-2 hover:ring-ring",
                  getColor(cell.value, cell.status)
                )}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{cell.label}</p>
              <p className="text-xs">Load: {cell.value}% • {cell.status}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-success" /> Low</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-info" /> Medium</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-warning" /> High</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-destructive" /> Critical</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-muted" /> Offline</span>
      </div>
    </div>
  );
}
