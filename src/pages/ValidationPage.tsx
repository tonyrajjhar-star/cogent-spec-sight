import { SectionCard } from "@/components/SectionCard";
import { MetricCard } from "@/components/MetricCard";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import config from "@/config/validation.config.json";

const getCellColor = (v: number) => {
  if (v >= 90) return "bg-status-success/15 text-status-success border border-status-success/20";
  if (v >= 75) return "bg-status-warning/15 text-status-warning border border-status-warning/20";
  return "bg-status-error/15 text-status-error border border-status-error/20";
};

const ValidationPage = () => (
  <div className="space-y-6 max-w-6xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{config.page.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{config.page.subtitle}</p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {config.summaryMetrics.map(m => (
        <MetricCard key={m.label} icon={getIcon(m.icon)} label={m.label} value={m.value} subtitle={m.subtitle} />
      ))}
    </div>

    <SectionCard title={config.heatmap.title} subtitle={config.heatmap.subtitle}>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Program</th>
              {config.heatmap.sections.map(s => (
                <th key={s} className="text-center py-2 px-2 text-muted-foreground font-medium">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {config.heatmap.programs.map(p => (
              <tr key={p.name}>
                <td className="py-1.5 pr-4 font-mono text-primary">{p.name}</td>
                {p.values.map((v, i) => (
                  <td key={i} className="py-1.5 px-1">
                    <div className={cn("rounded px-2 py-1 text-center font-mono text-[11px] font-medium", getCellColor(v))}>
                      {v}%
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>

    <SectionCard title={config.gaps.title} subtitle={config.gaps.subtitle}>
      <div className="space-y-2">
        {config.gaps.items.map(g => (
          <div key={g.type} className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-2 w-2 rounded-full",
                g.severity === "high" && "bg-status-error",
                g.severity === "medium" && "bg-status-warning",
                g.severity === "low" && "bg-muted-foreground"
              )} />
              <span className="text-sm text-foreground">{g.type}</span>
            </div>
            <span className="text-sm font-mono text-foreground">{g.count} <span className="text-muted-foreground">instances</span></span>
          </div>
        ))}
      </div>
    </SectionCard>
  </div>
);

export default ValidationPage;
