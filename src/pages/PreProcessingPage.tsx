import { SectionCard } from "@/components/SectionCard";
import { MetricCard } from "@/components/MetricCard";
import { FileCode, Layers, Hash, ArrowRight, AlertTriangle, RotateCw } from "lucide-react";

const inventory = [
  { icon: FileCode, label: "Total Programs", value: "342" },
  { icon: Layers, label: "Copybooks", value: "127" },
  { icon: Hash, label: "Lines of Code", value: "196,482" },
  { icon: ArrowRight, label: "Entry Points", value: "89" },
];

const callGraph = [
  { caller: "SETTL-MAIN", callees: ["SETTL-CALC", "SETTL-VAL", "DB2-ACCESS"], depth: 4 },
  { caller: "PAY-BATCH", callees: ["PAY-PROC", "PAY-REPORT", "UTIL-DATE"], depth: 3 },
  { caller: "CICS-MENU", callees: ["ACCT-INQ", "BAL-UPD", "SETTL-MAIN"], depth: 5 },
];

const orphans = ["UTIL-LEGACY", "TEST-PROG1", "CONV-TEMP"];

const decomposition = [
  { unit: "Settlement Processing", programs: 47, type: "Batch", reusable: 12 },
  { unit: "Payment Engine", programs: 38, type: "Batch", reusable: 8 },
  { unit: "Account Inquiry", programs: 29, type: "Online", reusable: 6 },
  { unit: "Reporting Suite", programs: 24, type: "Batch", reusable: 4 },
  { unit: "Data Maintenance", programs: 18, type: "Online", reusable: 3 },
];

const PreProcessingPage = () => (
  <div className="space-y-6 max-w-6xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Pre-Processing Intelligence</h1>
      <p className="text-sm text-muted-foreground mt-1">Structural analysis, dependency mapping, logical decomposition</p>
    </div>

    {/* Inventory */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {inventory.map(m => <MetricCard key={m.label} {...m} />)}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Call Graph */}
      <SectionCard title="Dependency Intelligence" subtitle="Interactive call graph summary">
        <div className="space-y-3">
          {callGraph.map(c => (
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

          {/* Orphans */}
          <div className="flex items-start gap-2 rounded-md border border-status-warning/30 bg-status-warning/5 p-3">
            <AlertTriangle className="h-4 w-4 text-status-warning shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-medium text-status-warning">Orphan Programs (3)</div>
              <div className="text-[10px] text-muted-foreground mt-1">{orphans.join(", ")}</div>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-md border border-status-error/30 bg-status-error/5 p-3">
            <RotateCw className="h-4 w-4 text-status-error shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-medium text-status-error">Cyclic Dependency (1)</div>
              <div className="text-[10px] text-muted-foreground mt-1">SETTL-CALC ↔ SETTL-VAL</div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Logical Decomposition */}
      <SectionCard title="Logical Decomposition" subtitle="Business-aligned program clusters">
        <div className="space-y-2">
          {decomposition.map(d => (
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
