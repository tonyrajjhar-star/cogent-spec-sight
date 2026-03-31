import { SectionCard } from "@/components/SectionCard";
import { CoverageBar } from "@/components/CoverageBar";
import config from "@/config/functional.config.json";

const domains = [...new Set(config.mappings.map(m => m.domain))];

const FunctionalPage = () => (
  <div className="space-y-6 max-w-6xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{config.page.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{config.page.subtitle}</p>
    </div>

    <div className="flex flex-wrap gap-2">
      {domains.map(d => (
        <div key={d} className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          {d} <span className="text-muted-foreground ml-1">({config.mappings.filter(m => m.domain === d).length})</span>
        </div>
      ))}
    </div>

    <SectionCard title={config.tableTitle} subtitle={config.tableSubtitle}>
      <div className="divide-y divide-border">
        {config.mappings.map(m => (
          <div key={m.program} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
            <div className="w-28 text-sm font-mono text-primary shrink-0">{m.program}</div>
            <div className="flex-1">
              <div className="text-sm text-foreground">{m.function}</div>
              <div className="text-[10px] text-muted-foreground">{m.domain}</div>
            </div>
            <div className="w-40 shrink-0">
              <CoverageBar label="Clarity" value={m.clarity} />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  </div>
);

export default FunctionalPage;
