import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarNavItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badge?: string;
}

export const SidebarNavItem = ({ to, icon: Icon, label, badge }: SidebarNavItemProps) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) => cn(
      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
      isActive
        ? "bg-primary/10 text-primary border border-primary/20"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    )}
  >
    <Icon className="h-4 w-4 shrink-0" />
    <span className="truncate">{label}</span>
    {badge && (
      <span className="ml-auto text-[10px] font-mono bg-muted rounded px-1.5 py-0.5">{badge}</span>
    )}
  </RouterNavLink>
);
