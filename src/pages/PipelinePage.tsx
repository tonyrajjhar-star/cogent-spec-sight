import { SectionCard } from "@/components/SectionCard";
import { Check, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";
import config from "@/config/pipeline.config.json";

const statusIcons = {
  complete: { Icon: Check, label: "Complete", cls: "text-status-success" },
  active: { Icon: Loader2, label: "Processing", cls: "text-primary" },
  pending: { Icon: Circle, label: "Pending", cls: "text-muted-foreground" },
};

const PipelinePage = () => (
  <div className="space-y-6 max-w-5xl">
    <div>
      <h1 className="text-2xl font-semibold text-foreground">{config.page.title}</h1>
      <p className="text-sm text-muted-foreground mt-1">{config.page.subtitle}</p>
    </div>

    <div className="space-y-4">
      {config.stages.map((stage) => {
        const status = stage.status as keyof typeof statusIcons;
        const { Icon: StatusIcon, label: statusLabel, cls } = statusIcons[status];
        const StageIcon = getIcon(stage.icon);

        return (
          <SectionCard
            key={stage.id}
            title={stage.label}
            subtitle={stage.duration}
            action={
              <div className={cn("flex items-center gap-1.5 text-xs font-medium", cls)}>
                <StatusIcon className={cn("h-3.5 w-3.5", status === "active" && "animate-spin", status === "pending" && "h-3 w-3")} />
                {statusLabel}
              </div>
            }
          >
            {stage.metrics.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 grid grid-cols-3 gap-3">
                  {stage.metrics.map(m => (
                    <div key={m.label} className="space-y-1">
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{m.label}</div>
                      <div className="text-lg font-semibold font-mono text-foreground">{m.value}</div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Artifacts</div>
                  <div className="space-y-1">
                    {stage.artifacts.map(a => (
                      <div key={a} className="flex items-center gap-2 text-xs text-foreground">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground italic">Awaiting upstream completion</div>
            )}

            {status === "active" && (
              <div className="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-primary animate-pulse-glow" style={{ width: "82%" }} />
              </div>
            )}
          </SectionCard>
        );
      })}
    </div>
  </div>
);

export default PipelinePage;
