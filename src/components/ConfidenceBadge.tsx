import { cn } from "@/lib/utils";

interface ConfidenceBadgeProps {
  level: "high" | "medium" | "review";
  size?: "sm" | "md";
  className?: string;
}

const labels = { high: "High Confidence", medium: "Medium", review: "Review Required" };

export const ConfidenceBadge = ({ level, size = "md", className }: ConfidenceBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1.5 rounded-full font-medium border",
      size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs",
      level === "high" && "bg-confidence-high/10 text-confidence-high border-confidence-high/25",
      level === "medium" && "bg-confidence-medium/10 text-confidence-medium border-confidence-medium/25",
      level === "review" && "bg-confidence-review/10 text-confidence-review border-confidence-review/25",
      className
    )}
  >
    <span className={cn(
      "rounded-full",
      size === "sm" ? "h-1 w-1" : "h-1.5 w-1.5",
      level === "high" && "bg-confidence-high",
      level === "medium" && "bg-confidence-medium",
      level === "review" && "bg-confidence-review",
    )} />
    {labels[level]}
  </span>
);
