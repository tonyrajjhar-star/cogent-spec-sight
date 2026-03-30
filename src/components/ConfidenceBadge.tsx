import { cn } from "@/lib/utils";

interface ConfidenceBadgeProps {
  level: "high" | "medium" | "review";
  className?: string;
}

const labels = { high: "High Confidence", medium: "Medium", review: "Review Required" };

export const ConfidenceBadge = ({ level, className }: ConfidenceBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
      level === "high" && "bg-confidence-high/15 text-confidence-high border border-confidence-high/30",
      level === "medium" && "bg-confidence-medium/15 text-confidence-medium border border-confidence-medium/30",
      level === "review" && "bg-confidence-review/15 text-confidence-review border border-confidence-review/30",
      className
    )}
  >
    <span className={cn(
      "h-1.5 w-1.5 rounded-full",
      level === "high" && "bg-confidence-high",
      level === "medium" && "bg-confidence-medium",
      level === "review" && "bg-confidence-review",
    )} />
    {labels[level]}
  </span>
);
