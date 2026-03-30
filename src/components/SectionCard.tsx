import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const SectionCard = ({ title, subtitle, children, action, className }: SectionCardProps) => (
  <div className={cn("rounded-lg border border-border bg-card", className)}>
    <div className="flex items-center justify-between border-b border-border px-5 py-3">
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
    <div className="p-5">{children}</div>
  </div>
);
