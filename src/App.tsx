import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import ProviderDashboard from "@/pages/ProviderDashboard";
import TenantDashboard from "@/pages/TenantDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<ProviderDashboard />} />
            <Route path="/vdc" element={<ProviderDashboard />} />
            <Route path="/nodes" element={<ProviderDashboard />} />
            <Route path="/quotas" element={<ProviderDashboard />} />
            <Route path="/monitoring" element={<ProviderDashboard />} />
            <Route path="/users" element={<ProviderDashboard />} />
            <Route path="/support" element={<ProviderDashboard />} />
            <Route path="/settings" element={<ProviderDashboard />} />
            <Route path="/tenant" element={<TenantDashboard />} />
            <Route path="/tenant/vms" element={<TenantDashboard />} />
            <Route path="/tenant/storage" element={<TenantDashboard />} />
            <Route path="/tenant/networks" element={<TenantDashboard />} />
            <Route path="/tenant/security" element={<TenantDashboard />} />
            <Route path="/tenant/snapshots" element={<TenantDashboard />} />
            <Route path="/tenant/support" element={<TenantDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
