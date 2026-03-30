import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export const MetricCard = ({ icon: Icon, label, value, subtitle, className }: MetricCardProps) => (
  <div className={cn("rounded-lg border border-border bg-card p-4 space-y-2", className)}>
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-4 w-4 text-primary/70" />
      <span className="text-xs font-medium uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-2xl font-semibold tracking-tight text-foreground">{value}</div>
    {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
  </div>
);
