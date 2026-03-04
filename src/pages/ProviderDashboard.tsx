import { Server, Cpu, MemoryStick, HardDrive, Cloud, AlertTriangle, ArrowUpRight } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { CapacityDonut } from "@/components/CapacityDonut";
import { ClusterHeatmap } from "@/components/ClusterHeatmap";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";

// Mock data
const generateHeatmapCells = () => {
  const statuses: Array<"healthy" | "warning" | "critical" | "offline"> = ["healthy", "warning", "critical", "offline"];
  return Array.from({ length: 40 }, (_, i) => {
    const value = Math.floor(Math.random() * 100);
    let status: "healthy" | "warning" | "critical" | "offline";
    if (i === 12 || i === 33) status = "offline";
    else if (value >= 90) status = "critical";
    else if (value >= 75) status = "warning";
    else status = "healthy";
    return { id: `node-${i + 1}`, label: `Node ${i + 1}`, value, status };
  });
};

const recentAlerts = [
  { id: 1, message: "Node 13 went offline — storage controller timeout", time: "2 min ago", severity: "critical" as const },
  { id: 2, message: "Cluster B approaching CPU capacity (87%)", time: "15 min ago", severity: "warning" as const },
  { id: 3, message: "VDC 'acme-prod' backup completed successfully", time: "1h ago", severity: "healthy" as const },
  { id: 4, message: "Auto-scaling triggered for VDC 'startup-dev'", time: "3h ago", severity: "healthy" as const },
];

const vdcList = [
  { name: "acme-prod", status: "healthy" as const, vms: 24, cpu: 96, ram: "384 GB" },
  { name: "startup-dev", status: "healthy" as const, vms: 8, cpu: 32, ram: "128 GB" },
  { name: "finance-staging", status: "warning" as const, vms: 12, cpu: 48, ram: "192 GB" },
  { name: "legacy-migration", status: "provisioning" as const, vms: 0, cpu: 16, ram: "64 GB" },
];

export default function ProviderDashboard() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Infrastructure Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Bird's eye view of your cloud platform</p>
        </div>
        <Button className="gap-2">
          <Cloud className="h-4 w-4" />
          New VDC
        </Button>
      </div>

      {/* Top metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Server} label="Physical Nodes" value="42" change="2 added this week" changeType="up" />
        <MetricCard icon={Cloud} label="Active VDCs" value="18" change="+3 this month" changeType="up" />
        <MetricCard icon={Cpu} label="Total vCPUs" value="1,280" change="68% allocated" changeType="neutral" />
        <MetricCard icon={MemoryStick} label="Total RAM" value="5.12 TB" change="72% allocated" changeType="neutral" />
      </div>

      {/* Capacity donuts + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-5 lg:col-span-1">
          <h3 className="text-sm font-semibold text-foreground mb-5">Cluster Capacity</h3>
          <div className="grid grid-cols-2 gap-6">
            <CapacityDonut value={68} label="CPU" used="870 cores" total="1,280 cores" color="text-metric-cpu" />
            <CapacityDonut value={72} label="RAM" used="3.7 TB" total="5.12 TB" color="text-metric-ram" />
            <CapacityDonut value={54} label="Storage" used="42 TB" total="78 TB" color="text-metric-disk" />
            <CapacityDonut value={31} label="Network" used="3.1 Gbps" total="10 Gbps" color="text-metric-network" />
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-5 lg:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Recent Alerts</h3>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              View all <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <div className="flex-1 space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
                <AlertTriangle className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                  alert.severity === "critical" ? "text-destructive" : 
                  alert.severity === "warning" ? "text-warning" : "text-success"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{alert.time}</p>
                </div>
                <StatusBadge status={alert.severity} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cluster Heatmap */}
      <ClusterHeatmap cells={generateHeatmapCells()} title="Node Load Heatmap — Cluster A" />

      {/* Active VDCs */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Active Virtual Data Centers</h3>
          <Button variant="outline" size="sm" className="text-xs">
            View all VDCs
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground p-4">Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-4">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-4">VMs</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-4">CPU Cores</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-4">RAM</th>
                <th className="text-right text-xs font-medium text-muted-foreground p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vdcList.map((vdc) => (
                <tr key={vdc.name} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <span className="text-sm font-medium text-foreground">{vdc.name}</span>
                  </td>
                  <td className="p-4">
                    <StatusBadge status={vdc.status} />
                  </td>
                  <td className="p-4 text-sm text-foreground">{vdc.vms}</td>
                  <td className="p-4 text-sm text-foreground">{vdc.cpu}</td>
                  <td className="p-4 text-sm text-foreground">{vdc.ram}</td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="text-xs">Manage</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
