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
  className?: string;
}

export const PipelineRibbon = ({ stages, className }: PipelineRibbonProps) => (
  <div className={cn("flex items-center gap-0 overflow-x-auto px-4 py-3 surface-elevated border-b border-border", className)}>
    {stages.map((stage, i) => (
      <div key={stage.id} className="flex items-center shrink-0">
        <div className="flex items-center gap-2">
          <div className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full text-xs border",
            stage.status === "complete" && "bg-pipeline-complete/20 border-pipeline-complete/40 text-pipeline-complete",
            stage.status === "active" && "bg-pipeline-active/20 border-pipeline-active/40 text-pipeline-active",
            stage.status === "pending" && "bg-pipeline-pending/20 border-pipeline-pending/40 text-muted-foreground",
          )}>
            {stage.status === "complete" && <Check className="h-3 w-3" />}
            {stage.status === "active" && <Loader2 className="h-3 w-3 animate-spin" />}
            {stage.status === "pending" && <Circle className="h-2 w-2" />}
          </div>
          <div>
            <div className={cn(
              "text-xs font-medium whitespace-nowrap",
              stage.status === "complete" && "text-pipeline-complete",
              stage.status === "active" && "text-pipeline-active",
              stage.status === "pending" && "text-muted-foreground",
            )}>
              {stage.label}
            </div>
            {stage.metrics && (
              <div className="text-[10px] text-muted-foreground font-mono">{stage.metrics}</div>
            )}
          </div>
        </div>
        {i < stages.length - 1 && (
          <div className={cn(
            "w-8 h-px mx-2",
            stage.status === "complete" ? "bg-pipeline-complete/40" : "bg-border"
          )} />
        )}
      </div>
    ))}
  </div>
);
