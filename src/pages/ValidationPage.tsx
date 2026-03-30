import { SectionCard } from "@/components/SectionCard";
import { MetricCard } from "@/components/MetricCard";
import { ShieldCheck, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const heatmapPrograms = ["SETTL-MAIN", "PAY-BATCH", "SETTL-CALC", "CICS-MENU", "DB2-ACCESS", "ACCT-INQ", "BAL-UPD"];
const heatmapSections = ["Structure", "Data Flow", "Rules", "I/O", "Error Handling"];

const heatmapData: Record<string, number[]> = {
  "SETTL-MAIN": [98, 91, 88, 95, 82],
  "PAY-BATCH": [98, 94, 92, 97, 90],
  "SETTL-CALC": [94, 78, 71, 85, 65],
  "CICS-MENU": [97, 89, 85, 92, 80],
  "DB2-ACCESS": [91, 62, 55, 70, 48],
  "ACCT-INQ": [99, 96, 93, 98, 91],
  "BAL-UPD": [95, 85, 80, 88, 75],
};

const gaps = [
  { type: "Dynamic SQL", count: 12, severity: "high" },
  { type: "Conditional Logic (Nested)", count: 8, severity: "medium" },
  { type: "External Dependencies", count: 5, severity: "high" },
  { type: "Undocumented Copybooks", count: 3, severity: "low" },
];

const getCellColor = (v: number) => {
  if (v >= 90) return "bg-status-success/15 text-status-success border border-status-success/20";
  if (v >= 75) return "bg-status-warning/15 text-status-warning border border-status-warning/20";
  return "bg-status-error/15 text-status-error border border-status-error/20";
};

const ValidationPage = () => (
  <div className="space-y-6 max-w-6xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Validation & Coverage Intelligence</h1>
      <p className="text-sm text-muted-foreground mt-1">Establishing trust through measurable accuracy</p>
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <MetricCard icon={ShieldCheck} label="Overall Coverage" value="87.3%" subtitle="Across all programs" />
      <MetricCard icon={CheckCircle2} label="Auto-Generated" value="78%" subtitle="No manual intervention" />
      <MetricCard icon={Clock} label="Manual Corrections" value="14%" subtitle="Post-review refinement" />
      <MetricCard icon={AlertTriangle} label="Effort Saved" value="62%" subtitle="vs. manual specification" />
    </div>

    {/* Coverage Heatmap */}
    <SectionCard title="Coverage Heatmap" subtitle="Programs × Spec Sections · Color indicates coverage depth">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Program</th>
              {heatmapSections.map(s => (
                <th key={s} className="text-center py-2 px-2 text-muted-foreground font-medium">{s}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapPrograms.map(p => (
              <tr key={p}>
                <td className="py-1.5 pr-4 font-mono text-primary">{p}</td>
                {heatmapData[p].map((v, i) => (
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

    {/* Residual Gaps */}
    <SectionCard title="Residual Gap Classification" subtitle="Areas requiring additional review">
      <div className="space-y-2">
        {gaps.map(g => (
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
