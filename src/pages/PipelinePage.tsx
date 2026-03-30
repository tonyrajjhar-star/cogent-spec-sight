import { SectionCard } from "@/components/SectionCard";
import { Check, Loader2, Circle, FileText, GitBranch, Brain, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  {
    id: "structural", label: "Structural Analysis", status: "complete" as const,
    icon: FileText, duration: "2m 14s",
    metrics: [
      { label: "Programs Parsed", value: "342 / 342" },
      { label: "Copybooks Resolved", value: "127 / 127" },
      { label: "Parse Success Rate", value: "100%" },
    ],
    artifacts: ["AST Trees", "Symbol Tables", "Division Maps"],
  },
  {
    id: "dependency", label: "Dependency Mapping", status: "complete" as const,
    icon: GitBranch, duration: "1m 48s",
    metrics: [
      { label: "Call References", value: "1,247" },
      { label: "Orphan Programs", value: "3" },
      { label: "Cyclic Dependencies", value: "1" },
    ],
    artifacts: ["Call Graph", "Dependency Matrix", "Orphan Report"],
  },
  {
    id: "semantic", label: "Semantic Extraction", status: "active" as const,
    icon: Brain, duration: "In Progress...",
    metrics: [
      { label: "Business Rules Extracted", value: "1,847" },
      { label: "Data Flow Paths", value: "4,291" },
      { label: "Programs Processed", value: "281 / 342" },
    ],
    artifacts: ["Rule Catalog", "Data Lineage"],
  },
  {
    id: "specgen", label: "Specification Generation", status: "pending" as const,
    icon: FileText, duration: "—",
    metrics: [],
    artifacts: [],
  },
  {
    id: "validation", label: "Coverage Validation", status: "pending" as const,
    icon: ShieldCheck, duration: "—",
    metrics: [],
    artifacts: [],
  },
];

const PipelinePage = () => (
  <div className="space-y-6 max-w-5xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Processing Orchestration</h1>
      <p className="text-sm text-muted-foreground mt-1">Multi-engine analysis pipeline · Not a single AI call</p>
    </div>

    <div className="space-y-4">
      {stages.map((stage) => (
        <SectionCard
          key={stage.id}
          title={stage.label}
          subtitle={stage.duration}
          action={
            <div className={cn(
              "flex items-center gap-1.5 text-xs font-medium",
              stage.status === "complete" && "text-status-success",
              stage.status === "active" && "text-primary",
              stage.status === "pending" && "text-muted-foreground",
            )}>
              {stage.status === "complete" && <><Check className="h-3.5 w-3.5" /> Complete</>}
              {stage.status === "active" && <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Processing</>}
              {stage.status === "pending" && <><Circle className="h-3 w-3" /> Pending</>}
            </div>
          }
        >
          {stage.metrics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 grid grid-cols-3 gap-3">
                {stage.metrics.map(m => (
                  <div key={m.label} className="space-y-1">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</div>
                    <div className="text-lg font-semibold font-mono text-foreground">{m.value}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Artifacts</div>
                <div className="space-y-1">
                  {stage.artifacts.map(a => (
                    <div key={a} className="flex items-center gap-2 text-xs text-foreground">
                      <div className="h-1 w-1 rounded-full bg-primary" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground italic">Awaiting upstream completion</div>
          )}

          {stage.status === "active" && (
            <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary animate-pulse-glow" style={{ width: "82%" }} />
            </div>
          )}
        </SectionCard>
      ))}
    </div>
  </div>
);

export default PipelinePage;
