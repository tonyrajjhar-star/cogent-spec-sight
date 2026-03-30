import { SectionCard } from "@/components/SectionCard";
import { CoverageBar } from "@/components/CoverageBar";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { FileText, Eye, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

const specs = [
  {
    program: "SETTL-MAIN", confidence: "high" as const,
    structural: 96, dataFlow: 91, businessRule: 88,
    fromCode: 82, inferred: 14, humanRefined: 4,
  },
  {
    program: "PAY-BATCH", confidence: "high" as const,
    structural: 98, dataFlow: 94, businessRule: 92,
    fromCode: 88, inferred: 10, humanRefined: 2,
  },
  {
    program: "SETTL-CALC", confidence: "medium" as const,
    structural: 94, dataFlow: 78, businessRule: 71,
    fromCode: 65, inferred: 28, humanRefined: 7,
  },
  {
    program: "CICS-MENU", confidence: "high" as const,
    structural: 97, dataFlow: 89, businessRule: 85,
    fromCode: 79, inferred: 16, humanRefined: 5,
  },
  {
    program: "DB2-ACCESS", confidence: "review" as const,
    structural: 91, dataFlow: 62, businessRule: 55,
    fromCode: 48, inferred: 38, humanRefined: 14,
  },
];

const SpecificationsPage = () => (
  <div className="space-y-6 max-w-6xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Program Specifications</h1>
      <p className="text-sm text-muted-foreground mt-1">Spec quality, coverage, and provenance for each program</p>
    </div>

    <div className="space-y-3">
      {specs.map(s => (
        <SectionCard
          key={s.program}
          title={s.program}
          action={
            <div className="flex items-center gap-2">
              <ConfidenceBadge level={s.confidence} />
              <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-muted-foreground hover:text-foreground">
                <Eye className="h-3.5 w-3.5" /> View Spec
              </Button>
              <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-muted-foreground hover:text-foreground">
                <GitBranch className="h-3.5 w-3.5" /> View Flow
              </Button>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Spec Coverage</div>
              <CoverageBar label="Structural" value={s.structural} />
              <CoverageBar label="Data Flow" value={s.dataFlow} />
              <CoverageBar label="Business Rules" value={s.businessRule} />
            </div>
            <div className="space-y-3">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Spec Provenance</div>
              <div className="space-y-2">
                {[
                  { label: "Derived from Code", value: s.fromCode, color: "bg-primary" },
                  { label: "AI Inferred", value: s.inferred, color: "bg-status-warning" },
                  { label: "Human Refined", value: s.humanRefined, color: "bg-status-success" },
                ].map(p => (
                  <div key={p.label} className="flex items-center gap-3">
                    <div className="w-28 text-xs text-muted-foreground">{p.label}</div>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${p.color}`} style={{ width: `${p.value}%` }} />
                    </div>
                    <div className="w-10 text-right text-xs font-mono text-foreground">{p.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>
      ))}
    </div>
  </div>
);

export default SpecificationsPage;
