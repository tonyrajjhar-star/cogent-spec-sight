import { cn } from "@/lib/utils";

interface CoverageBarProps {
  label: string;
  value: number;
  showLabel?: boolean;
  height?: "sm" | "md" | "lg";
  className?: string;
}

const heightMap = { sm: "h-1", md: "h-1.5", lg: "h-2.5" };

export const CoverageBar = ({ label, value, showLabel = true, height = "md", className }: CoverageBarProps) => (
  <div className={cn("space-y-1", className)}>
    {showLabel && (
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{value}%</span>
      </div>
    )}
    <div className={cn("w-full rounded-full bg-muted overflow-hidden", heightMap[height])}>
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
