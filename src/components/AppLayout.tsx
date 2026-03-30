import { Outlet } from "react-router-dom";
import { PipelineRibbon, PipelineStage } from "@/components/PipelineRibbon";
import { SidebarNavItem } from "@/components/SidebarNavItem";
import {
  Upload, GitBranch, BarChart3, FileText, Layers, ShieldCheck,
  UserCheck, TrendingUp, Link2, LayoutDashboard, Cpu
} from "lucide-react";

const pipelineStages: PipelineStage[] = [
  { id: "intake", label: "Code Intake", status: "complete", metrics: "342 programs" },
  { id: "structural", label: "Structural Analysis", status: "complete", metrics: "98.2% parsed" },
  { id: "dependency", label: "Dependency Mapping", status: "complete", metrics: "1,247 refs" },
  { id: "semantic", label: "Semantic Extraction", status: "active", metrics: "Processing..." },
  { id: "specgen", label: "Spec Generation", status: "pending" },
  { id: "validation", label: "Validation", status: "pending" },
  { id: "insights", label: "Insights", status: "pending" },
];

const navItems = [
  { to: "/", icon: Upload, label: "Application Intake", badge: "1" },
  { to: "/pipeline", icon: Cpu, label: "Processing Pipeline", badge: "2" },
  { to: "/pre-processing", icon: BarChart3, label: "Pre-Processing Intelligence", badge: "3" },
  { to: "/specifications", icon: FileText, label: "Program Specifications", badge: "4" },
  { to: "/functional", icon: Layers, label: "Functional Mapping", badge: "5" },
  { to: "/validation", icon: ShieldCheck, label: "Validation & Coverage", badge: "6" },
  { to: "/human-validated", icon: UserCheck, label: "Human-Validated Specs", badge: "7" },
  { to: "/modernization", icon: TrendingUp, label: "Modernization Insights", badge: "8" },
  { to: "/traceability", icon: Link2, label: "Insight-to-Code Trace", badge: "9" },
  { to: "/executive", icon: LayoutDashboard, label: "Executive Summary", badge: "10" },
];

export const AppLayout = () => (
  <div className="flex h-screen overflow-hidden">
    {/* Sidebar */}
    <aside className="w-64 shrink-0 border-r border-border bg-sidebar flex flex-col">
      <div className="flex items-center gap-2 px-4 py-4 border-b border-border">
        <div className="h-8 w-8 rounded-md bg-primary/20 flex items-center justify-center">
          <GitBranch className="h-4 w-4 text-primary" />
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">CodeLens AI</div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Reverse Engineering</div>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map(item => (
          <SidebarNavItem key={item.to} {...item} />
        ))}
      </nav>
      <div className="border-t border-border p-3">
        <div className="rounded-md bg-muted/50 px-3 py-2 text-[10px] text-muted-foreground">
          <span className="uppercase tracking-wider font-medium">Evidence-Backed</span>
          <br />Reverse Engineering Platform
        </div>
      </div>
    </aside>

    {/* Main content */}
    <div className="flex-1 flex flex-col overflow-hidden">
      <PipelineRibbon stages={pipelineStages} />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  </div>
);
