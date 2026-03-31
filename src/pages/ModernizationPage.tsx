import { SectionCard } from "@/components/SectionCard";
import { cn } from "@/lib/utils";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from "recharts";
import config from "@/config/modernization.config.json";

const riskColorMap: Record<string, { dot: string; bar: string }> = {
  low: { dot: "bg-status-success/60", bar: "bg-status-success" },
  medium: { dot: "bg-status-warning/60", bar: "bg-status-warning" },
  high: { dot: "bg-status-error/60", bar: "bg-status-error" },
};

const getBarColor = (v: number) => {
  if (v >= 80) return "hsl(152, 60%, 45%)";
  if (v >= 60) return "hsl(38, 92%, 55%)";
  return "hsl(0, 72%, 55%)";
};

const ModernizationPage = () => (
  <div className="space-y-6 max-w-6xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{config.page.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{config.page.subtitle}</p>
    </div>

    <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 flex items-center justify-between glow-primary">
      <div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{config.confidenceIndex.label}</div>
        <div className="text-4xl font-bold text-gradient-primary mt-1">{config.confidenceIndex.value}</div>
        <div className="text-xs text-muted-foreground mt-1">{config.confidenceIndex.description}</div>
      </div>
      <div className="text-6xl font-mono text-primary/20 font-bold">{config.confidenceIndex.grade}</div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <SectionCard title={config.complexity.title}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={config.complexity.data}>
              <PolarGrid stroke="hsl(220, 13%, 90%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(220, 10%, 46%)" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar dataKey="value" stroke="hsl(210, 85%, 45%)" fill="hsl(210, 85%, 45%)" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      <SectionCard title={config.risk.title}>
        <div className="space-y-3">
          {config.risk.data.map(r => {
            const colors = riskColorMap[r.level] || riskColorMap.high;
            return (
              <div key={r.category} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{r.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-foreground">{r.score}/100</span>
                    <div className={cn("h-3 w-3 rounded-full", colors.dot)} />
                  </div>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className={cn("h-full rounded-full", colors.bar)} style={{ width: `${r.score}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title={config.readiness.title}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={config.readiness.data} layout="vertical" margin={{ left: 0, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(220, 10%, 46%)" }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(220, 10%, 46%)" }} width={90} />
              <Tooltip contentStyle={{ background: "#fff", border: "1px solid hsl(220, 13%, 90%)", borderRadius: 6, fontSize: 12 }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {config.readiness.data.map((entry, i) => (
                  <Cell key={i} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  </div>
);

export default ModernizationPage;
