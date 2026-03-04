import { Server, Cpu, MemoryStick, HardDrive, Plus, Power, Copy, ArrowUpRight } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { CapacityDonut } from "@/components/CapacityDonut";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const vms = [
  { name: "web-server-01", status: "healthy" as const, os: "Ubuntu 22.04", cpu: 4, ram: "8 GB", disk: "80 GB", ip: "10.0.1.10" },
  { name: "db-primary", status: "healthy" as const, os: "Debian 12", cpu: 8, ram: "32 GB", disk: "500 GB", ip: "10.0.1.20" },
  { name: "worker-node-03", status: "warning" as const, os: "CentOS 9", cpu: 2, ram: "4 GB", disk: "40 GB", ip: "10.0.1.33" },
  { name: "staging-api", status: "offline" as const, os: "Ubuntu 22.04", cpu: 2, ram: "4 GB", disk: "60 GB", ip: "10.0.1.40" },
  { name: "redis-cache", status: "healthy" as const, os: "Alpine 3.18", cpu: 2, ram: "16 GB", disk: "20 GB", ip: "10.0.1.50" },
];

const quotas = [
  { label: "CPU Cores", used: 18, total: 32, unit: "cores" },
  { label: "RAM", used: 64, total: 128, unit: "GB" },
  { label: "SSD Storage", used: 700, total: 1000, unit: "GB" },
  { label: "Public IPs", used: 3, total: 5, unit: "" },
];

export default function TenantDashboard() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Cloud Resources</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your virtual machines, storage, and network</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New VM
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Server} label="Virtual Machines" value="5" change="3 running" changeType="up" />
        <MetricCard icon={Cpu} label="CPU Allocated" value="18 / 32" change="56% of quota" changeType="neutral" />
        <MetricCard icon={MemoryStick} label="RAM Allocated" value="64 GB" change="50% of quota" changeType="neutral" />
        <MetricCard icon={HardDrive} label="Storage Used" value="700 GB" change="70% of quota" changeType="neutral" />
      </div>

      {/* Quota Visualizer */}
      <div className="bg-card rounded-lg border border-border p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-foreground">Resource Quotas</h3>
          <Button variant="outline" size="sm" className="text-xs gap-1">
            Request More <ArrowUpRight className="h-3 w-3" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quotas.map((q) => {
            const pct = Math.round((q.used / q.total) * 100);
            return (
              <div key={q.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{q.label}</span>
                  <span className="text-xs text-muted-foreground">{q.used} / {q.total} {q.unit}</span>
                </div>
                <Progress value={pct} className="h-2" />
                <p className="text-xs text-muted-foreground">{pct}% used</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* VM List */}
      <div className="bg-card rounded-lg border border-border">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Virtual Machines</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs">Filter</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground p-4">Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-4">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-4">OS</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-4">CPU</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-4">RAM</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-4">Disk</th>
                <th className="text-left text-xs font-medium text-muted-foreground p-4">IP</th>
                <th className="text-right text-xs font-medium text-muted-foreground p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vms.map((vm) => (
                <tr key={vm.name} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                  <td className="p-4">
                    <span className="text-sm font-medium text-foreground font-mono">{vm.name}</span>
                  </td>
                  <td className="p-4"><StatusBadge status={vm.status} /></td>
                  <td className="p-4 text-sm text-muted-foreground">{vm.os}</td>
                  <td className="p-4 text-sm text-foreground">{vm.cpu} cores</td>
                  <td className="p-4 text-sm text-foreground">{vm.ram}</td>
                  <td className="p-4 text-sm text-foreground">{vm.disk}</td>
                  <td className="p-4 text-sm text-muted-foreground font-mono">{vm.ip}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Power">
                        <Power className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Clone">
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs">Console</Button>
                    </div>
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
