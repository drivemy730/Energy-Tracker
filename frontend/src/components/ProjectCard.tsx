import { GlassCard } from "./GlassCard";
import { StatusBadge } from "./StatusBadge";
import { Zap, MapPin, Building2 } from "lucide-react";

interface ProjectCardProps {
  name: string;
  country: string;
  countryFlag: string;
  company: string;
  capacity: number;
  status: "operational" | "construction" | "planned" | "decommissioned";
}

export const ProjectCard = ({
  name,
  country,
  countryFlag,
  company,
  capacity,
  status,
}: ProjectCardProps) => {
  return (
    <GlassCard glow="teal" className="p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base truncate text-foreground">{name}</h3>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="text-lg mr-1">{countryFlag}</span>
            <span>{country}</span>
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Capacity - Large Display */}
      <div className="flex items-baseline gap-2 py-2">
        <Zap className="w-5 h-5 text-primary animate-glow-pulse" />
        <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {capacity.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground">MW</span>
      </div>

      {/* Company */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-white/5">
        <Building2 className="w-3.5 h-3.5" />
        <span className="truncate">{company}</span>
      </div>

      {/* Sparkline Placeholder (visual only) */}
      <div className="h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
        <div className="flex items-end gap-1 h-4">
          {[40, 60, 45, 70, 55, 65, 50].map((height, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-primary/60 to-primary rounded-full"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
