import { SectionCard } from "@/components/SectionCard";
import { ArrowRight } from "lucide-react";
import config from "@/config/traceability.config.json";

const TraceabilityPage = () => (
  <div className="space-y-6 max-w-5xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{config.page.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{config.page.subtitle}</p>
    </div>

    <div className="space-y-4">
      {config.traces.map((t, i) => (
        <SectionCard key={i} title={`Trace #${i + 1}`}>
          <div className="space-y-4">
            <div className="rounded-md border border-status-warning/30 bg-status-warning/5 p-4">
              <div className="text-[10px] text-status-warning uppercase tracking-wider font-medium mb-1">{config.insightLabel}</div>
              <div className="text-sm text-foreground">{t.insight}</div>
            </div>

            <div className="flex justify-center"><ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" /></div>

            <div className="rounded-md border border-primary/30 bg-primary/5 p-4">
              <div className="text-[10px] text-primary uppercase tracking-wider font-medium mb-1">{config.specLabel}</div>
              <div className="text-sm font-mono text-foreground">{t.specSection}</div>
            </div>

            <div className="flex justify-center"><ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" /></div>

            <div className="rounded-md border border-border bg-muted/50 p-4">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-1">{config.codeLabel}</div>
              <div className="text-xs text-muted-foreground mb-2">{t.codeRef}</div>
              <pre className="text-xs font-mono text-foreground leading-relaxed whitespace-pre-wrap">{t.code}</pre>
            </div>
          </div>
        </SectionCard>
      ))}
    </div>
  </div>
);

export default TraceabilityPage;
