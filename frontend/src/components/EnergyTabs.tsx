import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Droplets, Sun, Wind, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnergyTabsProps {
  onTabChange?: (value: string) => void;
  children?: React.ReactNode;
}

export const EnergyTabs = ({ onTabChange, children }: EnergyTabsProps) => {
  const energyTypes = [
    { 
      id: "hydro", 
      label: "Hydro", 
      icon: Droplets, 
      color: "text-primary",
      glow: "shadow-glow-teal",
      activeColor: "data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border-primary/50"
    },
    { 
      id: "solar", 
      label: "Solar", 
      icon: Sun, 
      color: "text-solar",
      glow: "shadow-glow-solar",
      activeColor: "data-[state=active]:bg-solar/20 data-[state=active]:text-solar data-[state=active]:border-solar/50"
    },
    { 
      id: "wind", 
      label: "Wind", 
      icon: Wind, 
      color: "text-secondary",
      glow: "shadow-glow-blue",
      activeColor: "data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary data-[state=active]:border-secondary/50"
    },
    { 
      id: "thermal", 
      label: "Thermal", 
      icon: Flame, 
      color: "text-thermal",
      glow: "shadow-glow-thermal",
      activeColor: "data-[state=active]:bg-thermal/20 data-[state=active]:text-thermal data-[state=active]:border-thermal/50"
    },
  ];

  return (
    <Tabs defaultValue="hydro" onValueChange={onTabChange} className="w-full">
      <TabsList className="glass-panel h-auto p-2 grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {energyTypes.map((type) => (
          <TabsTrigger
            key={type.id}
            value={type.id}
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 border border-transparent",
              "hover:bg-white/5",
              type.activeColor,
              `data-[state=active]:${type.glow}`
            )}
          >
            <type.icon className={cn("w-4 h-4", type.color)} />
            <span className="font-semibold">{type.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};