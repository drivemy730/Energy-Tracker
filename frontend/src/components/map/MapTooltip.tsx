import { X } from "lucide-react";

interface MapTooltipProps {
  country: string;
  capacity: number;
  historicalData?: Array<{ year: number; production: number }>;
  onClose: () => void;
}

/**
 * Tooltip simplificado que muestra solo:
 * - Nombre del país/proyecto
 * - Producción histórica total acumulada
 */
export const MapTooltip = ({
  country,
  capacity,
  historicalData,
  onClose,
}: MapTooltipProps) => {
  // Datos históricos por defecto si no hay
  const data = historicalData || [
    { year: 2020, production: capacity * 0.85 },
    { year: 2021, production: capacity * 0.90 },
    { year: 2022, production: capacity * 0.92 },
    { year: 2023, production: capacity * 0.95 },
  ];

  // Suma total de producción histórica
  const totalProduction = data.reduce((sum, item) => sum + item.production, 0);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 animate-scale-in">
      <div className="glass-card p-6 max-w-sm w-full space-y-4">
        {/* Header: nombre del país/proyecto */}
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-bold font-orbitron text-foreground">
            {country}
          </h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Producción histórica total */}
        <div className="pt-2 border-t border-white/10">
          <p className="text-sm text-muted-foreground">Producción Histórica Total (MW)</p>
          <p className="text-xl font-semibold text-primary">
            {totalProduction.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
