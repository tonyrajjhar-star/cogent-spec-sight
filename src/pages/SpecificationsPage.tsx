import { SectionCard } from "@/components/SectionCard";
import { CoverageBar } from "@/components/CoverageBar";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { Eye, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";
import config from "@/config/specifications.config.json";

const SpecificationsPage = () => (
  <div className="space-y-6 max-w-6xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{config.page.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{config.page.subtitle}</p>
    </div>

    <div className="space-y-3">
      {config.specs.map(s => (
        <SectionCard
          key={s.program}
          title={s.program}
          action={
            <div className="flex items-center gap-2">
              <ConfidenceBadge level={s.confidence as "high" | "medium" | "review"} />
              <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-muted-foreground hover:text-foreground">
                <Eye className="h-3.5 w-3.5" /> {config.viewSpecLabel}
              </Button>
              <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-muted-foreground hover:text-foreground">
                <GitBranch className="h-3.5 w-3.5" /> {config.viewFlowLabel}
              </Button>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{config.coverageLabel}</div>
              <CoverageBar label="Structural" value={s.structural} />
              <CoverageBar label="Data Flow" value={s.dataFlow} />
              <CoverageBar label="Business Rules" value={s.businessRule} />
            </div>
            <div className="space-y-3">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{config.provenanceLabel}</div>
              <div className="space-y-2">
                {config.provenanceCategories.map(p => (
                  <div key={p.key} className="flex items-center gap-3">
                    <div className="w-28 text-xs text-muted-foreground">{p.label}</div>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className={`h-full rounded-full ${p.color}`} style={{ width: `${(s as any)[p.key]}%` }} />
                    </div>
                    <div className="w-10 text-right text-xs font-mono text-foreground">{(s as any)[p.key]}%</div>
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
