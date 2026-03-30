import { SectionCard } from "@/components/SectionCard";
import { cn } from "@/lib/utils";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from "recharts";

const complexityData = [
  { subject: "Business Complexity", value: 78 },
  { subject: "Technical Complexity", value: 85 },
  { subject: "Transparency", value: 72 },
  { subject: "Rule Density", value: 91 },
  { subject: "Data Complexity", value: 68 },
];

const riskMatrix = [
  { category: "Business Risk", level: "medium", score: 62 },
  { category: "Technical Risk", level: "high", score: 78 },
  { category: "Compliance Risk", level: "low", score: 35 },
  { category: "Data Migration Risk", level: "medium", score: 58 },
];

const readinessData = [
  { name: "Decoupling", value: 72 },
  { name: "Code Quality", value: 81 },
  { name: "Predictability", value: 68 },
  { name: "Test Coverage", value: 45 },
  { name: "Documentation", value: 88 },
];

const getRiskColor = (level: string) => {
  if (level === "low") return "bg-status-success text-status-success";
  if (level === "medium") return "bg-status-warning text-status-warning";
  return "bg-status-error text-status-error";
};

const getBarColor = (v: number) => {
  if (v >= 80) return "hsl(152, 60%, 45%)";
  if (v >= 60) return "hsl(38, 92%, 55%)";
  return "hsl(0, 72%, 55%)";
};

const ModernizationPage = () => (
  <div className="space-y-6 max-w-6xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Modernization & Decision Intelligence</h1>
      <p className="text-sm text-muted-foreground mt-1">Decision-grade intelligence for boardroom readiness</p>
    </div>

    {/* Modernization Confidence Index */}
    <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 flex items-center justify-between glow-primary">
      <div>
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Modernization Confidence Index</div>
        <div className="text-4xl font-bold text-gradient-primary mt-1">72.4</div>
        <div className="text-xs text-muted-foreground mt-1">Moderate confidence · Review recommended for 3 risk areas</div>
      </div>
      <div className="text-6xl font-mono text-primary/20 font-bold">B+</div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Complexity Radar */}
      <SectionCard title="Understanding & Complexity">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={complexityData}>
              <PolarGrid stroke="hsl(220, 14%, 18%)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(215, 12%, 50%)" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
              <Radar dataKey="value" stroke="hsl(185, 70%, 50%)" fill="hsl(185, 70%, 50%)" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>

      {/* Risk Matrix */}
      <SectionCard title="Risk Exposure">
        <div className="space-y-3">
          {riskMatrix.map(r => (
            <div key={r.category} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{r.category}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-foreground">{r.score}/100</span>
                  <div className={cn("h-3 w-3 rounded-full", getRiskColor(r.level).split(" ")[0] + "/60")} />
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className={cn("h-full rounded-full", getRiskColor(r.level).split(" ")[0])} style={{ width: `${r.score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Readiness */}
      <SectionCard title="Modernization Readiness">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={readinessData} layout="vertical" margin={{ left: 0, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(215, 12%, 50%)" }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(215, 12%, 50%)" }} width={90} />
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(220, 14%, 18%)", borderRadius: 6, fontSize: 12 }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {readinessData.map((entry, i) => (
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
