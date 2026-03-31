import { SectionCard } from "@/components/SectionCard";
import { MetricCard } from "@/components/MetricCard";
import { ArrowRight, AlertTriangle, RotateCw } from "lucide-react";
import { getIcon } from "@/lib/icons";
import config from "@/config/preprocessing.config.json";

const PreProcessingPage = () => (
  <div className="space-y-6 max-w-6xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{config.page.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{config.page.subtitle}</p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {config.inventory.map(m => <MetricCard key={m.label} icon={getIcon(m.icon)} label={m.label} value={m.value} />)}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SectionCard title={config.dependencySection.title} subtitle={config.dependencySection.subtitle}>
        <div className="space-y-3">
          {config.callGraph.map(c => (
            <div key={c.caller} className="rounded-md border border-border bg-muted/30 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono text-primary">{c.caller}</span>
                <span className="text-[10px] text-muted-foreground">Depth: {c.depth}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.callees.map(callee => (
                  <span key={callee} className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-[10px] font-mono text-foreground">
                    <ArrowRight className="h-2.5 w-2.5 text-primary/60" />
                    {callee}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-start gap-2 rounded-md border border-status-warning/30 bg-status-warning/5 p-3">
            <AlertTriangle className="h-4 w-4 text-status-warning shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-medium text-status-warning">{config.orphans.label} ({config.orphans.items.length})</div>
              <div className="text-[10px] text-muted-foreground mt-1">{config.orphans.items.join(", ")}</div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-md border border-status-error/30 bg-status-error/5 p-3">
            <RotateCw className="h-4 w-4 text-status-error shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-medium text-status-error">{config.cyclicDependency.label} ({config.cyclicDependency.count})</div>
              <div className="text-[10px] text-muted-foreground mt-1">{config.cyclicDependency.detail}</div>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title={config.decompositionSection.title} subtitle={config.decompositionSection.subtitle}>
        <div className="space-y-2">
          {config.decomposition.map(d => (
            <div key={d.unit} className="flex items-center gap-3 rounded-md border border-border bg-muted/30 p-3">
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{d.unit}</div>
                <div className="text-[10px] text-muted-foreground">{d.programs} programs · {d.reusable} reusable</div>
              </div>
              <span className={`text-[10px] font-medium rounded-full px-2 py-0.5 border ${d.type === "Batch" ? "text-primary border-primary/30 bg-primary/10" : "text-status-success border-status-success/30 bg-status-success/10"}`}>
                {d.type}
              </span>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  </div>
);

export default PreProcessingPage;
