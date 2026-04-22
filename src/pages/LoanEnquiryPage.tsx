import { SectionCard } from "@/components/SectionCard";
import { MetricCard } from "@/components/MetricCard";
import { getIcon } from "@/lib/icons";
import config from "@/config/loan-enquiry.config.json";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

type MetricItem = { label: string; value: number; max?: number; unit?: string; color?: string };

const colorMap: Record<string, string> = {
  coverage: "hsl(var(--status-success))",
  accuracy: "hsl(var(--status-info))",
  primary: "hsl(var(--primary))",
  accent: "hsl(var(--accent))",
  used: "hsl(var(--status-success))",
  unused: "hsl(var(--status-warning))",
  missing: "hsl(var(--status-error))",
};

const resolveColor = (key?: string) => colorMap[key || "primary"] || colorMap.primary;

const MetricBarChart = ({ items, height = 220 }: { items: MetricItem[]; height?: number }) => {
  const data = items.map(i => ({
    name: i.label,
    value: i.value,
    display: `${i.value}${i.unit || ""}`,
    fill: resolveColor(i.color),
    max: i.max,
  }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 16, right: 12, left: -8, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))" }}
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 8,
            fontSize: 12,
          }}
          formatter={(_v: number, _n, p: any) => [p.payload.display, p.payload.name]}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const UsageBars = ({ items }: { items: { label: string; value: number; color: string }[] }) => {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  return (
    <div className="space-y-3">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {items.map((i, idx) => (
          <div
            key={idx}
            style={{ width: `${(i.value / total) * 100}%`, background: resolveColor(i.color) }}
            title={`${i.label}: ${i.value}`}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map((i, idx) => (
          <div key={idx} className="rounded-md border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: resolveColor(i.color) }} />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{i.label}</span>
            </div>
            <div className="mt-1.5 text-2xl font-semibold text-foreground">{i.value}</div>
            <div className="text-[11px] font-mono text-muted-foreground">
              {((i.value / total) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProgramMetrics = ({ items }: { items: { label: string; value: string; icon: string }[] }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
    {items.map((i, idx) => (
      <MetricCard key={idx} icon={getIcon(i.icon)} label={i.label} value={i.value} />
    ))}
  </div>
);

const TechColumn = ({ tech }: { tech: typeof config.technologyComparison.java }) => {
  const Icon = getIcon(tech.icon);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-1">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-base font-semibold text-foreground">{tech.label}</h3>
      </div>

      <SectionCard title={tech.coreMetrics.title} subtitle="Bar charts (counts / percentages)">
        <MetricBarChart items={tech.coreMetrics.items as MetricItem[]} />
      </SectionCard>

      <SectionCard title={tech.usageMetrics.title} subtitle="Used vs Unused vs Missing">
        <UsageBars items={tech.usageMetrics.items as { label: string; value: number; color: string }[]} />
      </SectionCard>

      <SectionCard title={tech.programMetrics.title}>
        <ProgramMetrics items={tech.programMetrics.items} />
      </SectionCard>
    </div>
  );
};

const LoanEnquiryPage = () => (
  <div className="space-y-6 max-w-7xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{config.page.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{config.page.subtitle}</p>
    </div>

    <SectionCard title={config.functionSpec.title} subtitle={config.functionSpec.subtitle}>
      <MetricBarChart items={config.functionSpec.metrics as MetricItem[]} height={260} />
    </SectionCard>

    <div>
      <div className="mb-3 px-1">
        <h2 className="text-lg font-semibold text-foreground">{config.technologyComparison.title}</h2>
        <p className="text-xs text-muted-foreground">{config.technologyComparison.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <TechColumn tech={config.technologyComparison.java} />
        <TechColumn tech={config.technologyComparison.plsql} />
      </div>
    </div>
  </div>
);

export default LoanEnquiryPage;
