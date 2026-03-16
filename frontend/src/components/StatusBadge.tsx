import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "operational" | "construction" | "planned" | "decommissioned";
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    operational: {
      label: "Operational",
      classes: "bg-success/20 text-success border-success/50 shadow-glow-teal",
    },
    construction: {
      label: "Under Construction",
      classes: "bg-warning/20 text-warning border-warning/50",
    },
    planned: {
      label: "Planned",
      classes: "bg-info/20 text-info border-info/50 shadow-glow-blue",
    },
    decommissioned: {
      label: "Decommissioned",
      classes: "bg-muted/40 text-muted-foreground border-muted",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm animate-glow-pulse",
        config.classes,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
      {config.label}
    </span>
  );
};
