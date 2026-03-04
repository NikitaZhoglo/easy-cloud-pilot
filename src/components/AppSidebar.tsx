import {
  Server, LayoutDashboard, Database, Network, Shield, Users, LifeBuoy,
  Settings, ChevronLeft, Cloud, HardDrive, Activity, FolderOpen
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const providerItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "VDC Management", url: "/vdc", icon: Cloud },
  { title: "Nodes & Clusters", url: "/nodes", icon: Server },
  { title: "Quota Distributor", url: "/quotas", icon: HardDrive },
  { title: "Monitoring", url: "/monitoring", icon: Activity },
  { title: "User Management", url: "/users", icon: Users },
  { title: "Support", url: "/support", icon: LifeBuoy },
];

const tenantItems = [
  { title: "Dashboard", url: "/tenant", icon: LayoutDashboard },
  { title: "Virtual Machines", url: "/tenant/vms", icon: Server },
  { title: "Storage", url: "/tenant/storage", icon: Database },
  { title: "Networks", url: "/tenant/networks", icon: Network },
  { title: "Security", url: "/tenant/security", icon: Shield },
  { title: "Snapshots", url: "/tenant/snapshots", icon: FolderOpen },
  { title: "Support", url: "/tenant/support", icon: LifeBuoy },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isProvider = !location.pathname.startsWith("/tenant");
  const items = isProvider ? providerItems : tenantItems;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
            <Cloud className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-sidebar-accent-foreground tracking-tight">VDC Manager</span>
              <span className="text-[10px] text-sidebar-foreground">Cloud Platform</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Mode switcher */}
        {!collapsed && (
          <div className="px-3 mb-2">
            <div className="flex rounded-lg bg-sidebar-accent p-0.5">
              <NavLink
                to="/"
                end={false}
                className={cn(
                  "flex-1 text-center text-xs py-1.5 rounded-md transition-colors text-sidebar-foreground",
                  isProvider && "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                )}
                activeClassName=""
              >
                Provider
              </NavLink>
              <NavLink
                to="/tenant"
                end={false}
                className={cn(
                  "flex-1 text-center text-xs py-1.5 rounded-md transition-colors text-sidebar-foreground",
                  !isProvider && "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                )}
                activeClassName=""
              >
                Tenant
              </NavLink>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] uppercase tracking-widest">
            {isProvider ? "Infrastructure" : "Resources"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/" || item.url === "/tenant"}
                      className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to="/settings"
                className="text-sidebar-foreground hover:bg-sidebar-accent"
                activeClassName="bg-sidebar-accent text-sidebar-primary"
              >
                <Settings className="mr-2 h-4 w-4" />
                {!collapsed && <span>Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
