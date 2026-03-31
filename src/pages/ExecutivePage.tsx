import { MetricCard } from "@/components/MetricCard";
import { CoverageBar } from "@/components/CoverageBar";
import { SectionCard } from "@/components/SectionCard";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";
import config from "@/config/executive.config.json";

const ExecutivePage = () => (
  <div className="space-y-6 max-w-5xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{config.page.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">{config.page.subtitle}</p>
      </div>
      <ConfidenceBadge level={config.overallConfidence as "high" | "medium" | "review"} />
    </div>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {config.keyMetrics.map(m => (
        <MetricCard key={m.label} icon={getIcon(m.icon)} label={m.label} value={m.value} subtitle={m.subtitle} />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SectionCard title={config.riskPosture.title}>
        <div className="space-y-4">
          {config.riskPosture.items.map(r => (
            <div key={r.label} className="flex items-center gap-4">
              <div className={cn("h-4 w-4 rounded-full", r.color)} />
              <span className="text-sm text-foreground flex-1">{r.label}</span>
              <span className="text-xs font-medium uppercase text-muted-foreground">{r.level}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title={config.modernizationReadiness.title}>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={config.modernizationReadiness.radarData}>
              <PolarGrid stroke="hsl(220, 13%, 90%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(220, 10%, 46%)" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar dataKey="value" stroke="hsl(210, 85%, 45%)" fill="hsl(210, 85%, 45%)" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>

    <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 flex items-center justify-between glow-primary">
      <div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{config.confidenceIndex.label}</div>
        <div className="text-5xl font-bold text-gradient-primary mt-1">{config.confidenceIndex.value}</div>
      </div>
      <div className="space-y-2 text-right">
        {config.confidenceIndex.highlights.map((h, i) => (
          <div key={i} className={cn("text-xs", i === config.confidenceIndex.highlights.length - 1 ? "text-status-success flex items-center gap-1 justify-end" : "text-muted-foreground")}>
            {i === config.confidenceIndex.highlights.length - 1 && <CheckCircle2 className="h-3 w-3" />}
            {h}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ExecutivePage;
