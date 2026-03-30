import { Upload, Database, FileCode, Layers, Cpu, BarChart3 } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import { MetricCard } from "@/components/MetricCard";
import { Button } from "@/components/ui/button";

const scopePreview = [
  { label: "Estimated Programs", value: "342", icon: FileCode },
  { label: "Copybooks Detected", value: "127", icon: Layers },
  { label: "Est. LOC Range", value: "185K–210K", icon: BarChart3 },
  { label: "Analysis Depth", value: "Full Stack", icon: Cpu },
];

const programTypes = [
  { type: "Batch", count: 198, pct: 58 },
  { type: "Online (CICS)", count: 112, pct: 33 },
  { type: "Utility", count: 32, pct: 9 },
];

const IntakePage = () => (
  <div className="space-y-6 max-w-6xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Application Intake & Scope Intelligence</h1>
      <p className="text-sm text-muted-foreground mt-1">Intelligence starts before GenAI generation</p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Intake Form */}
      <div className="lg:col-span-1 space-y-4">
        <SectionCard title="Source Configuration">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Technology</label>
              <div className="flex gap-2">
                {["COBOL", "PL/I", "RPG"].map(t => (
                  <button key={t} className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${t === "COBOL" ? "bg-primary/10 text-primary border-primary/30" : "bg-muted text-muted-foreground border-border hover:text-foreground"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</label>
              <div className="rounded-md border border-border bg-muted/50 px-3 py-2 text-sm text-foreground">Meridian Financial Group</div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Application</label>
              <div className="rounded-md border border-border bg-muted/50 px-3 py-2 text-sm text-foreground">Core Settlement Engine</div>
            </div>
            <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Drop source archive or connect to repository</p>
              <p className="text-[10px] text-muted-foreground mt-1">.zip, .tar.gz, Git URL</p>
            </div>
            <Button className="w-full">Begin Analysis</Button>
          </div>
        </SectionCard>
      </div>

      {/* Right: Scope Intelligence Preview */}
      <div className="lg:col-span-2 space-y-4">
        <SectionCard title="Scope Intelligence Preview" subtitle="Pre-analysis intelligence · Estimated from intake scan">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {scopePreview.map(m => (
              <MetricCard key={m.label} icon={m.icon} label={m.label} value={m.value} />
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Program Type Distribution</div>
              <div className="space-y-2">
                {programTypes.map(p => (
                  <div key={p.type} className="flex items-center gap-3">
                    <div className="w-20 text-xs text-muted-foreground">{p.type}</div>
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-primary/60" style={{ width: `${p.pct}%` }} />
                    </div>
                    <div className="w-16 text-right text-xs font-mono text-foreground">{p.count} <span className="text-muted-foreground">({p.pct}%)</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Expected Analysis Depth</div>
              <div className="grid grid-cols-2 gap-2">
                {["Structural Parsing", "Dependency Resolution", "Semantic Extraction", "Validation Pass"].map(d => (
                  <div key={d} className="flex items-center gap-2 rounded-md border border-border bg-muted/30 px-3 py-2">
                    <div className="h-2 w-2 rounded-full bg-status-success" />
                    <span className="text-xs text-foreground">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  </div>
);

export default IntakePage;
