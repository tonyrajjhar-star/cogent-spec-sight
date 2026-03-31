import { cn } from "@/lib/utils";
import { Check, Loader2, Circle } from "lucide-react";

export interface PipelineStage {
  id: string;
  label: string;
  status: "complete" | "active" | "pending";
  metrics?: string;
}

interface PipelineRibbonProps {
  stages: PipelineStage[];
  compact?: boolean;
  className?: string;
  onStageClick?: (stageId: string) => void;
}

export const PipelineRibbon = ({ stages, compact = false, className, onStageClick }: PipelineRibbonProps) => (
  <div className={cn(
    "flex items-center gap-0 overflow-x-auto surface-elevated border-b border-border",
    compact ? "px-3 py-2" : "px-4 py-3",
    className
  )}>
    {stages.map((stage, i) => (
      <div key={stage.id} className="flex items-center shrink-0">
        <button
          onClick={() => onStageClick?.(stage.id)}
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1 transition-colors",
            onStageClick ? "hover:bg-muted cursor-pointer" : "cursor-default"
          )}
        >
          <div className={cn(
            "flex items-center justify-center rounded-full border",
            compact ? "h-5 w-5" : "h-6 w-6",
            stage.status === "complete" && "bg-pipeline-complete/10 border-pipeline-complete/30 text-pipeline-complete",
            stage.status === "active" && "bg-pipeline-active/10 border-pipeline-active/30 text-pipeline-active",
            stage.status === "pending" && "bg-muted border-border text-muted-foreground",
          )}>
            {stage.status === "complete" && <Check className="h-3 w-3" />}
            {stage.status === "active" && <Loader2 className="h-3 w-3 animate-spin" />}
            {stage.status === "pending" && <Circle className="h-2 w-2" />}
          </div>
          <div className="hidden sm:block">
            <div className={cn(
              "font-medium whitespace-nowrap",
              compact ? "text-[10px]" : "text-xs",
              stage.status === "complete" && "text-pipeline-complete",
              stage.status === "active" && "text-pipeline-active",
              stage.status === "pending" && "text-muted-foreground",
            )}>
              {stage.label}
            </div>
            {stage.metrics && !compact && (
              <div className="text-[10px] text-muted-foreground font-mono">{stage.metrics}</div>
            )}
          </div>
        </button>
        {i < stages.length - 1 && (
          <div className={cn(
            "h-px mx-1",
            compact ? "w-4" : "w-6",
            stage.status === "complete" ? "bg-pipeline-complete/30" : "bg-border"
          )} />
        )}
      </div>
    ))}
  </div>
);
