import { useQuery } from "@tanstack/react-query";
import { energyApi, EnergyType } from "../lib/api/energy.Api"; // FIXED PATH

export function useEnergyData(energyType: EnergyType, year: number)
 {
  return useQuery({
    queryKey: ["energy", energyType, year], // Simplified key
    queryFn: () => energyApi.getEnergyByTypeAndYear(energyType, year), // Fixed function name
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}