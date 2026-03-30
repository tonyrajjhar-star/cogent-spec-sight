import { SectionCard } from "@/components/SectionCard";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { CoverageBar } from "@/components/CoverageBar";
import { UserCheck, ArrowRight } from "lucide-react";

const reviewedSpecs = [
  {
    program: "SETTL-MAIN", priorConfidence: "medium" as const, finalConfidence: "high" as const,
    sectionsChanged: 4, corrections: ["Business rule refinement", "Error handling clarification"],
    effortReduction: 71,
  },
  {
    program: "DB2-ACCESS", priorConfidence: "review" as const, finalConfidence: "medium" as const,
    sectionsChanged: 8, corrections: ["Dynamic SQL mapping", "External dependency documentation", "I/O specification"],
    effortReduction: 58,
  },
  {
    program: "SETTL-CALC", priorConfidence: "medium" as const, finalConfidence: "high" as const,
    sectionsChanged: 3, corrections: ["Calculation logic verification"],
    effortReduction: 74,
  },
];

const HumanValidatedPage = () => (
  <div className="space-y-6 max-w-5xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Human-Validated Specifications</h1>
      <p className="text-sm text-muted-foreground mt-1">Controlled human–AI collaboration with full governance</p>
    </div>

    <div className="space-y-4">
      {reviewedSpecs.map(s => (
        <SectionCard key={s.program} title={s.program} action={
          <div className="flex items-center gap-2">
            <ConfidenceBadge level={s.priorConfidence} />
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
            <ConfidenceBadge level={s.finalConfidence} />
          </div>
        }>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Sections Changed</div>
              <div className="text-2xl font-semibold text-foreground">{s.sectionsChanged}</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Corrections Applied</div>
              <div className="space-y-1">
                {s.corrections.map(c => (
                  <div key={c} className="flex items-center gap-2 text-xs text-foreground">
                    <UserCheck className="h-3 w-3 text-status-success" />{c}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <CoverageBar label="Manual Effort Reduction" value={s.effortReduction} />
            </div>
          </div>
        </SectionCard>
      ))}
    </div>
  </div>
);

export default HumanValidatedPage;
