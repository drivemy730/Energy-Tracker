import { api } from "./client";

// =============================================================
// TYPES
// =============================================================

export type EnergyType = 'HYDRO' | 'WIND' | 'SOLAR' | 'GEO' | 'NUCLEAR';

export interface EnergyData {
  countryCode: string;
  countryName: string;
  year: number;
  value: number;
  unit: string;
  energyType: EnergyType;
}

export interface CountryComparisonPayload {
  energyType: EnergyType;
  countryCodes: string[];
  year: number;
}

export interface MultiCountryRequest {
  energyType: EnergyType;
  year: number;
  countryCodes: string[];
  page?: number;
  size?: number;
}

// =============================================================
// ENERGY API — KEEPS ALL YOUR ORIGINAL METHODS + ADDS THE MISSING ONE
// =============================================================

// ==================== BASIC DATA ====================

// ADD THIS MISSING FUNCTION that useEnergyData needs
export const getEnergyByTypeAndYear = async (
  energyType: EnergyType, 
  year: number
): Promise<EnergyData[]> => {
  return api.get<EnergyData[]>(`/${energyType.toLowerCase()}?year=${year}`);
};

// KEEP ALL YOUR ORIGINAL FUNCTIONS
export const getCountryEnergy = async (
  energyType: EnergyType, 
  countryCode: string, 
  startYear?: number, 
  endYear?: number
): Promise<EnergyData[]> => {
  const params = new URLSearchParams();
  if (startYear) params.append("startYear", startYear.toString());
  if (endYear) params.append("endYear", endYear.toString());

  return api.get<EnergyData[]>(`/${energyType}/${countryCode}?${params.toString()}`);
};

export const getYearlyTotals = async (
  energyType: EnergyType, 
  startYear?: number, 
  endYear?: number
): Promise<{ year: number; total: number }[]> => {
  const params = new URLSearchParams();
  if (startYear) params.append("startYear", startYear.toString());
  if (endYear) params.append("endYear", endYear.toString());

  return api.get<{ year: number; total: number }[]>(`/totals/${energyType}?${params.toString()}`);
};

export const getFiveYearAverages = async (
  energyType: EnergyType, 
  countryCode: string
): Promise<any> => {
  return api.get(`/averages/${energyType}/${countryCode}`);
};

// ==================== COMPARISONS ====================

export const compareCountries = async (
  payload: CountryComparisonPayload
): Promise<any> => {
  return api.post(`/compare/countries`, payload);
};

export const compareEnergyTypes = async (
  countryCode: string, 
  year: number
): Promise<any> => {
  return api.get(`/compare/energy-types/${countryCode}?year=${year}`);
};

// ==================== MULTI-COUNTRY OPERATIONS ====================

export const getMultiCountryData = async ({
  energyType,
  year,
  countryCodes,
  page = 0,
  size = 50
}: MultiCountryRequest): Promise<{
  data: EnergyData[];
  total: number;
  page: number;
  size: number;
}> => {
  const params = new URLSearchParams();
  countryCodes.forEach(c => params.append("countries", c));
  params.append("page", page.toString());
  params.append("size", size.toString());

  return api.get(`/multi-country/${energyType}/year/${year}?${params.toString()}`);
};

export const getMultiCountryAverages = async (
  energyType: EnergyType, 
  countryCodes: string[]
): Promise<any> => {
  const params = new URLSearchParams();
  countryCodes.forEach(c => params.append("countries", c));

  return api.get(`/multi-country/${energyType}/five-year-averages?${params.toString()}`);
};

// ==================== SEARCH / METADATA ====================

export const searchCountries = async (
  query: string, 
  exactMatch: boolean = false
): Promise<Array<{ code: string; name: string }>> => {
  const params = new URLSearchParams();
  params.append("query", query);
  if (exactMatch) params.append("exactMatch", "true");

  return api.get<Array<{ code: string; name: string }>>(`/search/countries?${params.toString()}`);
};

export const checkDataAvailability = async (countryCode: string): Promise<any> => {
  return api.get(`/availability/${countryCode}`);
};

export const getEnergyUnits = async (): Promise<Record<EnergyType, string>> => {
  return api.get<Record<EnergyType, string>>(`/units`);
};

export const getSystemMetadata = async (): Promise<any> => {
  return api.get(`/metadata`);
};

// ==================== UTILITY ====================

export const healthCheck = async (): Promise<{ status: string; timestamp: string }> => {
  return api.get<{ status: string; timestamp: string }>(`/health`);
};

// ==================== EXPORT ALL ====================

export const energyApi = {
  // NEW FUNCTION (the one useEnergyData needs)
  getEnergyByTypeAndYear,
  
  // ALL YOUR ORIGINAL FUNCTIONS
  getCountryEnergy,
  getYearlyTotals,
  getFiveYearAverages,
  compareCountries,
  compareEnergyTypes,
  getMultiCountryData,
  getMultiCountryAverages,
  searchCountries,
  checkDataAvailability,
  getEnergyUnits,
  getSystemMetadata,
  healthCheck,
};