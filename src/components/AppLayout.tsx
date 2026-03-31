import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PipelineRibbon } from "@/components/PipelineRibbon";
import { SidebarNavItem } from "@/components/SidebarNavItem";
import { GitBranch, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import appConfig from "@/config/app.config.json";

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const pipelineStages = appConfig.pipelineStages.map(s => ({
    id: s.id,
    label: s.label,
    status: s.status as "complete" | "active" | "pending",
    metrics: s.metrics,
  }));

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-sidebar flex flex-col transition-transform duration-200 lg:static lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
              <GitBranch className="h-4 w-4 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{appConfig.app.name}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{appConfig.app.tagline}</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {appConfig.navigation.map(item => (
            <SidebarNavItem key={item.to} to={item.to} icon={getIcon(item.icon)} label={item.label} badge={item.badge} onClick={() => setSidebarOpen(false)} />
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <div className="rounded-md bg-muted/50 px-3 py-2 text-[10px] text-muted-foreground">
            <span className="uppercase tracking-wider font-medium">{appConfig.app.footerText}</span>
            <br />{appConfig.app.footerSubtext}
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-muted-foreground hover:text-foreground">
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-foreground">{appConfig.app.name}</span>
        </div>
        <PipelineRibbon
          stages={pipelineStages}
          onStageClick={(stageId) => {
            const stage = appConfig.pipelineStages.find(s => s.id === stageId);
            if (stage?.route) navigate(stage.route);
          }}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
