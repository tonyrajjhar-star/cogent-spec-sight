import { cn } from "@/lib/utils";

interface CoverageBarProps {
  label: string;
  value: number;
  className?: string;
}

export const CoverageBar = ({ label, value, className }: CoverageBarProps) => (
  <div className={cn("space-y-1", className)}>
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono text-foreground">{value}%</span>
    </div>
    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <div
        className={cn(
          "h-full rounded-full transition-all duration-500",
          value >= 90 ? "bg-status-success" : value >= 70 ? "bg-status-warning" : "bg-status-error"
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);
