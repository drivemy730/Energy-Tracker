import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface FilterPanelProps {
  capacityMin: number[];
  onCapacityChange: (value: number[]) => void;
  filteredCount: number;
  activeEnergyType: string;
  showFilters: boolean;
  onToggleFilters: () => void;
}

/**
 * Filter panel simplified: only capacity slider and project count
 */
export const FilterPanel = ({
  capacityMin,
  onCapacityChange,
  filteredCount,
  activeEnergyType,
  showFilters,
  onToggleFilters,
}: FilterPanelProps) => {
  return (
    <div className="lg:w-80 animate-slide-in">
      {/* Mobile filter toggle */}
      <button
        onClick={onToggleFilters}
        className="lg:hidden w-full glass-card p-4 mb-4 flex items-center justify-between hover:bg-white/[0.06] transition-colors"
      >
        <span className="font-semibold text-foreground">Filtros</span>
        <span className="text-muted-foreground">{showFilters ? "▲" : "▼"}</span>
      </button>

      <div className={`glass-card p-6 space-y-6 ${showFilters ? "" : "hidden lg:block"}`}>
        <h3 className="font-semibold font-orbitron text-foreground text-lg mb-4">
          Filtros
        </h3>

        {/* Capacity Slider */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Capacidad Mínima (MW)
          </Label>
          <div className="pt-2">
            <Slider
              value={capacityMin}
              onValueChange={onCapacityChange}
              max={50000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-muted-foreground">0 MW</span>
              <span className="text-sm font-medium text-primary">
                {capacityMin[0].toLocaleString()} MW
              </span>
              <span className="text-xs text-muted-foreground">50,000 MW</span>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-muted-foreground text-center">
            Mostrando{" "}
            <span className="text-primary font-semibold">{filteredCount}</span>{" "}
            proyectos {activeEnergyType}
          </p>
        </div>
      </div>
    </div>
  );
};
