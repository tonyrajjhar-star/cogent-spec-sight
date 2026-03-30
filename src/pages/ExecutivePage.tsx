import { MetricCard } from "@/components/MetricCard";
import { CoverageBar } from "@/components/CoverageBar";
import { SectionCard } from "@/components/SectionCard";
import { ConfidenceBadge } from "@/components/ConfidenceBadge";
import { FileCode, Layers, ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from "recharts";

const radarData = [
  { subject: "Business", value: 78 },
  { subject: "Technical", value: 85 },
  { subject: "Compliance", value: 65 },
  { subject: "Data", value: 68 },
  { subject: "Readiness", value: 72 },
];

const riskItems = [
  { label: "Business Risk", level: "medium", color: "bg-status-warning" },
  { label: "Technical Risk", level: "high", color: "bg-status-error" },
  { label: "Compliance Risk", level: "low", color: "bg-status-success" },
];

const ExecutivePage = () => (
  <div className="space-y-6 max-w-5xl">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Executive Summary</h1>
        <p className="text-sm text-muted-foreground mt-1">Meridian Financial Group · Core Settlement Engine</p>
      </div>
      <ConfidenceBadge level="medium" />
    </div>

    {/* Key Metrics */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <MetricCard icon={FileCode} label="Programs Analyzed" value="342" subtitle="100% parse rate" />
      <MetricCard icon={Layers} label="Lines of Code" value="196K" subtitle="Across 127 copybooks" />
      <MetricCard icon={ShieldCheck} label="Avg. Coverage" value="87.3%" subtitle="Spec completeness" />
      <MetricCard icon={TrendingUp} label="Effort Saved" value="62%" subtitle="vs. manual process" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Risk Posture */}
      <SectionCard title="Risk Posture">
        <div className="space-y-4">
          {riskItems.map(r => (
            <div key={r.label} className="flex items-center gap-4">
              <div className={cn("h-4 w-4 rounded-full", r.color)} />
              <span className="text-sm text-foreground flex-1">{r.label}</span>
              <span className="text-xs font-medium uppercase text-muted-foreground">{r.level}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Modernization Readiness Radar */}
      <SectionCard title="Modernization Readiness">
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(220, 14%, 18%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(215, 12%, 50%)" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar dataKey="value" stroke="hsl(185, 70%, 50%)" fill="hsl(185, 70%, 50%)" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>

    {/* Confidence */}
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 flex items-center justify-between glow-primary">
      <div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Modernization Confidence Index</div>
        <div className="text-5xl font-bold text-gradient-primary mt-1">72.4</div>
      </div>
      <div className="space-y-2 text-right">
        <div className="text-xs text-muted-foreground">3 programs need review</div>
        <div className="text-xs text-muted-foreground">12 dynamic SQL gaps</div>
        <div className="text-xs text-status-success flex items-center gap-1 justify-end">
          <CheckCircle2 className="h-3 w-3" /> 87% coverage achieved
        </div>
      </div>
    </div>
  </div>
);

export default ExecutivePage;
