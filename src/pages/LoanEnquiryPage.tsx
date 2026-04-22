import { SectionCard } from "@/components/SectionCard";
import { CoverageBar } from "@/components/CoverageBar";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { MetricCard } from "@/components/MetricCard";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { getIcon } from "@/lib/icons";
import config from "@/config/loan-enquiry.config.json";

type Metric = { label: string; value: number };
type Usage = { used: number; unused: number; missing: number };

const ViewSpecAction = ({ confidence }: { confidence: "high" | "medium" | "review" }) => (
  <div className="flex items-center gap-2">
    <ConfidenceBadge level={confidence} />
    <Button variant="ghost" size="sm" className="text-xs gap-1.5 text-muted-foreground hover:text-foreground">
      <Eye className="h-3.5 w-3.5" /> {config.viewSpecLabel}
    </Button>
  </div>
);

const CoverageList = ({ items }: { items: Metric[] }) => (
  <div className="space-y-3">
    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
      {config.coverageLabel}
    </div>
    {items.map((m) => (
      <CoverageBar key={m.label} label={m.label} value={m.value} />
    ))}
  </div>
);

const UsageTiles = ({ usage }: { usage: Usage }) => (
  <div className="space-y-3">
    <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
      {config.usageLabel}
    </div>
    <div className="grid grid-cols-3 gap-3">
      <div className="relative rounded-lg border border-border bg-card p-3 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-status-success" />
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{config.usageCategories[0].label}</div>
        <div className="text-2xl font-semibold text-foreground mt-1">{usage.used}</div>
      </div>
      <div className="relative rounded-lg border border-border bg-card p-3 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-status-warning" />
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{config.usageCategories[1].label}</div>
        <div className="text-2xl font-semibold text-foreground mt-1">{usage.unused}</div>
      </div>
      <div className="relative rounded-lg border border-border bg-card p-3 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-status-error" />
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{config.usageCategories[2].label}</div>
        <div className="text-2xl font-semibold text-foreground mt-1">{usage.missing}</div>
      </div>
    </div>
  </div>
);

const EndpointsMetrics = ({ items, usage }: { items: { label: string; value: string; icon: string }[]; usage: Usage }) => (
  <div className="space-y-4 pt-2">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((i, idx) => (
        <MetricCard key={idx} icon={getIcon(i.icon)} label={i.label} value={i.value} />
      ))}
    </div>
    <UsageList usage={usage} />
  </div>
);

const TechSection = ({ tech }: { tech: typeof config.technologyComparison.java }) => {
  const Icon = getIcon(tech.icon);
  return (
    <SectionCard
      title={tech.label}
      action={<ViewSpecAction confidence={tech.confidence as "high" | "medium" | "review"} />}
    >
      <div className="flex items-center gap-2 mb-4 -mt-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-xs text-muted-foreground">{tech.label} technology stack metrics</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CoverageList items={tech.coreMetrics} />
        <UsageList usage={tech.usage} />
      </div>

      <div className="mt-5 pt-5 border-t border-border">
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-2">
          {config.programLabel}
        </div>
        <EndpointsMetrics items={tech.endpointsMetrics} usage={tech.usage} />
      </div>
    </SectionCard>
  );
};

const LoanEnquiryPage = () => (
  <div className="space-y-6 max-w-7xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{config.page.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{config.page.subtitle}</p>
    </div>

    <SectionCard
      title={config.functionSpec.title}
      action={<ViewSpecAction confidence={config.functionSpec.confidence as "high" | "medium" | "review"} />}
    >
      <p className="text-xs text-muted-foreground mb-4 -mt-1">{config.functionSpec.subtitle}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CoverageList items={config.functionSpec.metrics} />
      </div>
    </SectionCard>

    <div>
      <div className="mb-3 px-1">
        <h2 className="text-lg font-semibold text-foreground">{config.technologyComparison.title}</h2>
        <p className="text-xs text-muted-foreground">{config.technologyComparison.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TechSection tech={config.technologyComparison.java} />
        <TechSection tech={config.technologyComparison.plsql} />
      </div>
    </div>
  </div>
);

export default LoanEnquiryPage;
