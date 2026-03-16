import { GlassCard } from "@/components/GlassCard";
import { TrendingUp, TrendingDown, Droplets, Sun, Wind, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnergyCardProps {
  country: string;
  countryFlag: string;
  consumption: number;
  unit?: string;
  change: number;
  energyType: "hydro" | "solar" | "wind" | "thermal";
}

const energyConfig = {
  hydro: {
    icon: Droplets,
    color: "text-primary",
    glow: "shadow-glow-teal",
    gradient: "from-primary/20 to-transparent"
  },
  solar: {
    icon: Sun,
    color: "text-solar",
    glow: "shadow-glow-solar",
    gradient: "from-solar/20 to-transparent"
  },
  wind: {
    icon: Wind,
    color: "text-secondary",
    glow: "shadow-glow-blue",
    gradient: "from-secondary/20 to-transparent"
  },
  thermal: {
    icon: Flame,
    color: "text-thermal",
    glow: "shadow-glow-thermal",
    gradient: "from-thermal/20 to-transparent"
  }
};

export const EnergyCard = ({ 
  country, 
  countryFlag, 
  consumption, 
  unit = "TWh",
  change,
  energyType 
}: EnergyCardProps) => {
  const config = energyConfig[energyType];
  const Icon = config.icon;
  const isPositive = change >= 0;

  return (
    <GlassCard className={cn("p-6 space-y-4 hover:scale-[1.02] transition-all duration-300", config.glow)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{countryFlag}</span>
          <div>
            <h3 className="font-semibold text-lg">{country}</h3>
            <p className="text-xs text-muted-foreground capitalize">{energyType} Energy</p>
          </div>
        </div>
        <Icon className={cn("w-8 h-8 animate-glow-pulse", config.color)} />
      </div>

      {/* Consumption */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold font-orbitron">{consumption.toLocaleString()}</span>
          <span className="text-muted-foreground text-sm">{unit}</span>
        </div>

        {/* Change Indicator */}
        <div className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-success" />
          ) : (
            <TrendingDown className="w-4 h-4 text-destructive" />
          )}
          <span className={cn(
            "text-sm font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? "+" : ""}{change.toFixed(1)}% vs. previous period
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className={cn("absolute inset-y-0 left-0 rounded-full bg-gradient-to-r", config.gradient)}
            style={{ width: `${Math.min(Math.abs(change) * 10, 100)}%` }}
          />
        </div>
      </div>

      {/* Mini Chart Placeholder */}
      <div className="h-16 flex items-end gap-1">
        {[40, 55, 48, 62, 58, 70, 65, 75].map((height, i) => (
          <div
            key={i}
            className={cn("flex-1 rounded-t bg-gradient-to-t opacity-50", config.gradient)}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </GlassCard>
  );
};