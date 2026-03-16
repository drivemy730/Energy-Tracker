import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { EnergyTabs } from "@/components/EnergyTabs";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Search, ChevronDown, BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEnergyData } from "../hooks/useEnergyData"; // ADD THIS IMPORT
import { EnergyType } from "../lib/api/energy.Api"; // ADD THIS IMPORT

const Explorer = () => {
  const [activeTab, setActiveTab] = useState<EnergyType>("HYDRO");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [viewMode, setViewMode] = useState<"year" | "average">("year");
  const [selectedYear, setSelectedYear] = useState(2022); // Start with recent year
  const [rangeStart, setRangeStart] = useState(2010);
  const [compareOpen, setCompareOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [compareSearchQuery, setCompareSearchQuery] = useState("");

  // 🎯 REPLACE MOCK DATA WITH REAL DATA HOOK
  const { data: energyData, isLoading, isError } = useEnergyData(activeTab, selectedYear);

  // 🎯 TRANSFORM REAL DATA TO TABLE FORMAT
  const transformEnergyData = (data: any[]) => 
    {
    if (!data) return [];
    
    return data.map(item => ({
      country: item.countryName,
      flag: "🌍", // You can add flag logic later
      production: Math.round(item.value || 0),
      unit: item.unit || 'MW'
    }));
  };

  // 🎯 GET CURRENT DATA - REAL OR MOCK FALLBACK
  const getCurrentData = () => {
    if (energyData && energyData.length > 0) {
      return transformEnergyData(energyData);
    }
    
    // Fallback mock data if no real data
    const mockData = {
      HYDRO: [
        { country: "China", flag: "🇨🇳", production: 1280000, unit: "MW" },
        { country: "Brazil", flag: "🇧🇷", production: 405000, unit: "MW" },
        { country: "Canada", flag: "🇨🇦", production: 382000, unit: "MW" },
        { country: "USA", flag: "🇺🇸", production: 285000, unit: "MW" },
      ],
      SOLAR: [
        { country: "China", flag: "🇨🇳", production: 320000, unit: "MW" },
        { country: "USA", flag: "🇺🇸", production: 165000, unit: "MW" },
        { country: "Japan", flag: "🇯🇵", production: 92000, unit: "MW" },
        { country: "Germany", flag: "🇩🇪", production: 58000, unit: "MW" },
      ],
      WIND: [
        { country: "China", flag: "🇨🇳", production: 690000, unit: "MW" },
        { country: "USA", flag: "🇺🇸", production: 380000, unit: "MW" },
        { country: "Germany", flag: "🇩🇪", production: 132000, unit: "MW" },
        { country: "India", flag: "🇮🇳", production: 92000, unit: "MW" },
      ],
      GEO: [
        { country: "USA", flag: "🇺🇸", production: 3700, unit: "MW" },
        { country: "Indonesia", flag: "🇮🇩", production: 2300, unit: "MW" },
        { country: "Philippines", flag: "🇵🇭", production: 1900, unit: "MW" },
      ],
      NUCLEAR: [
        { country: "USA", flag: "🇺🇸", production: 800000, unit: "MW" },
        { country: "France", flag: "🇫🇷", production: 380000, unit: "MW" },
        { country: "China", flag: "🇨🇳", production: 320000, unit: "MW" },
      ],
    };
    
    return mockData[activeTab] || [];
  };

  const currentData = getCurrentData();

  // 🎯 UPDATE TAB CHANGE TO USE EnergyType
  const handleTabChange = (tab: string) => {
    setActiveTab(tab as EnergyType);
    setHasSearched(false); // Reset search when changing tabs
  };

  const handleToggleMode = (mode: "year" | "average") => {
    setViewMode(mode);
  };

  // 🎯 UPDATE YEAR CHANGE - REFETCHES DATA
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    // React Query will automatically refetch when year changes
  };

  const handleRangeChange = (start: number) => {
    setRangeStart(start);
  };

  // 🎯 SEARCH FUNCTIONALITY
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
  };

  const handleCompareToggle = () => {
    setCompareOpen(!compareOpen);
  };

  const handleCompareSearch = (query: string) => {
    setCompareSearchQuery(query);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
    setCompareSearchQuery("");
  };

  const handleCountryRemove = (country: string) => {
    setSelectedCountries((prev) => prev.filter((c) => c !== country));
  };

  // 🎯 GET COUNTRY SUGGESTIONS FROM REAL DATA
  const getCountrySuggestions = () => {
    if (!compareSearchQuery.trim() || !energyData) return [];
    
    return Array.from(new Set(energyData.map(item => item.countryName )))
      .filter(country => 
        country.toLowerCase().includes(compareSearchQuery.toLowerCase())
      )
      .slice(0, 6) // Limit to 6 suggestions
      .map(country => ({ country, flag: "🌍" }));
  };

  const countrySuggestions = getCountrySuggestions();

  const handleViewDetail = (country: string) => {
    console.log("View detail for:", country);
  };

  const years = Array.from({ length: 10 }, (_, i) => 2015 + i); // Recent years 2015-2024
  const rangeYears = Array.from({ length: 7 }, (_, i) => 1993 + i * 5);

  return (
    <div className="min-h-screen flex flex-col water-texture">
      <Navigation />

      <main className="flex-1 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold font-orbitron bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Energy Explorer
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compara el consumo entre tipos de energía y países
            </p>
            
            {/* 🎯 DATA STATUS INDICATOR */}
            {energyData && (
              <GlassCard className="inline-block px-4 py-2 bg-green-500/20 border-green-500/50">
                <div className="text-sm text-green-400">
                  ✅ Live {activeTab.toLowerCase()} data ({energyData.length} countries)
                </div>
              </GlassCard>
            )}
            {isLoading && (
              <GlassCard className="inline-block px-4 py-2 bg-yellow-500/20 border-yellow-500/50">
                <div className="text-sm text-yellow-400">
                  🔄 Cargando {activeTab.toLowerCase()} data...
                </div>
              </GlassCard>
            )}
            {isError && (
              <GlassCard className="inline-block px-4 py-2 bg-red-500/20 border-red-500/50">
                <div className="text-sm text-red-400">
                  ❌ Error cargando la informacion. 
                </div>
              </GlassCard>
            )}
          </div>

          {/* Tabs */}
          <EnergyTabs onTabChange={handleTabChange}>
            
            {/* Search Bar */}
            <GlassCard className="p-6 mb-6 relative">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Buscar país..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-11 h-12 glass-panel border-white/10 focus:border-primary/50 bg-white/5 rounded-xl text-lg"
                  />

                  {/* 🎯 REAL DATA SUGGESTIONS */}
                  {searchQuery.trim() && energyData && (
                    <div className="absolute top-full left-0 w-full bg-white/5 backdrop-blur-md mt-1 rounded-lg max-h-48 overflow-y-auto shadow-glow-teal z-10">
                      {Array.from(new Set(energyData.map(item => item.countryName)))
                        .filter(country => 
                          country.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .slice(0, 8)
                        .map((country) => (
                          <button
                            key={country}
                            onClick={() => {
                              setSearchQuery(country);
                              setHasSearched(true);
                            }}
                            className="w-full text-left px-4 py-2 text-foreground hover:bg-primary/20 transition-colors rounded-lg"
                          >
                            {country}
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                <NeonButton
                  variant="primary"
                  onClick={handleSearch}
                  className="h-12 px-8"
                >
                  Buscar
                </NeonButton>
              </div>
            </GlassCard>

            {/* Top Control Panel */}
            <GlassCard className="p-6 mb-6 space-y-6">
              {/* Segmented Toggle */}
              <div className="flex justify-center">
                <div className="inline-flex glass-panel rounded-xl p-1">
                  <button
                    onClick={() => handleToggleMode("year")}
                    className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                      viewMode === "year"
                        ? "bg-primary/20 text-primary shadow-glow-teal"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Por año
                  </button>
                  <button
                    onClick={() => handleToggleMode("average")}
                    className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                      viewMode === "average"
                        ? "bg-primary/20 text-primary shadow-glow-teal"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Promedio 5 años
                  </button>
                </div>
              </div>

              {/* Year Chip Selector - Active in "Por año" mode */}
              <div
                className={`space-y-3 transition-opacity duration-300 ${
                  viewMode === "year" ? "opacity-100" : "opacity-30 pointer-events-none"
                }`}
              >
                <label className="text-sm font-medium text-foreground text-center block">
                  Año seleccionado: {selectedYear}
                </label>
                <div className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-2 pb-2 min-w-max justify-center">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => handleYearChange(year)}
                        className={`px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                          selectedYear === year
                            ? "bg-primary/20 text-primary border border-primary/50 shadow-glow-teal"
                            : "glass-panel text-muted-foreground hover:text-foreground hover:bg-white/5"
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5-Year Period Slider - Active in "Promedio 5 años" mode */}
              <div
                className={`space-y-3 transition-opacity duration-300 ${
                  viewMode === "average" ? "opacity-100" : "opacity-30 pointer-events-none"
                }`}
              >
                <label className="text-sm font-medium text-foreground text-center block">
                  Periodo: {rangeStart}–{rangeStart + 5}
                </label>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={rangeYears.indexOf(rangeStart)}
                  onChange={(e) => handleRangeChange(rangeYears[parseInt(e.target.value)])}
                  className="w-full h-3 rounded-full appearance-none bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-glow-teal transition-all"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  {rangeYears.map((year) => (
                    <span key={year}>{year}</span>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Results Area */}
            {!hasSearched ? (
              <GlassCard className="p-12 text-center">
                <p className="text-muted-foreground text-lg">
              "Busca un país para mostrar sus metricas de energía." </p>
              </GlassCard>
            ) : (
              <div className="grid lg:grid-cols-[1fr,400px] gap-6">
                {/* Main Table */}
                <GlassCard className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Vista:{" "}
                        {viewMode === "year"
                          ? `Por año — Año: ${selectedYear}`
                          : `Promedio 5 años — Periodo: ${rangeStart}–${rangeStart + 5}`}
                      </p>
                    </div>
                    <NeonButton
                      variant="ghost"
                      onClick={handleCompareToggle}
                      className="gap-2"
                    >
                      <BarChart3 className="w-4 h-4" />
                      Comparar países
                      {selectedCountries.length > 0 && (
                        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
                          {selectedCountries.length}
                        </span>
                      )}
                    </NeonButton>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10 hover:bg-transparent">
                        <TableHead className="text-foreground font-semibold">País</TableHead>
                        <TableHead className="text-foreground font-semibold text-right">
                          Producción total ({currentData[0]?.unit || 'MW'})
                        </TableHead>
                        <TableHead className="text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentData
                        .filter((row) =>
                          row.country.toLowerCase().includes(searchQuery.trim().toLowerCase())
                        )
                        .map((row) => {
                          const maxProduction = Math.max(...currentData.map((d) => d.production));
                          const percentage = maxProduction > 0 ? (row.production / maxProduction) * 100 : 0;

                          return (
                            <TableRow
                              key={row.country}
                              className="border-white/10 hover:bg-white/5"
                            >
                              <TableCell className="font-medium">
                                <span className="mr-2">{row.flag}</span>
                                {row.country}
                              </TableCell>
                              <TableCell className="text-right text-muted-foreground">
                                <div className="flex flex-col gap-1">
                                  <span>{row.production.toLocaleString()}</span>
                                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                    <div
                                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 ease-out shadow-glow-teal"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell className="text-right"></TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </GlassCard>

                {/* Compare Panel */}
                {compareOpen && (
                  <GlassCard className="p-6 space-y-4 animate-slide-in-right">
                    <div>
                      <h3 className="font-semibold font-orbitron text-lg mb-2">
                        Comparación
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {viewMode === "year"
                          ? `Año ${selectedYear}`
                          : `Promedio 5 años (${rangeStart}–${rangeStart + 5})`}
                      </p>
                    </div>

                    {/* Search Bar Inside Compare Panel */}
                    <div className="space-y-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search country to compare..."
                          value={compareSearchQuery}
                          onChange={(e) => handleCompareSearch(e.target.value)}
                          className="pl-10 h-10 glass-panel border-white/10 focus:border-primary/50 bg-white/5 rounded-lg"
                        />
                      </div>

                      {/* 🎯 REAL COUNTRY SUGGESTIONS */}
                      {countrySuggestions.length > 0 && (
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                          {countrySuggestions.map((item) => (
                            <button
                              key={item.country}
                              onClick={() => handleCountrySelect(item.country)}
                              disabled={selectedCountries.includes(item.country)}
                              className={`w-full px-3 py-2 rounded-lg text-sm text-left transition-all duration-300 ${
                                selectedCountries.includes(item.country)
                                  ? "glass-panel text-muted-foreground opacity-50 cursor-not-allowed"
                                  : "glass-panel text-foreground hover:bg-white/10 hover:text-primary"
                              }`}
                            >
                              {item.flag} {item.country}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Selected Countries Pills */}
                    {selectedCountries.length > 0 && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Países seleccionados
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedCountries.map((country) => {
                            const countryData = currentData.find((d) => d.country === country);
                            return (
                              <div
                                key={country}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/20 text-primary border border-primary/50"
                              >
                                <span className="text-sm">
                                  {countryData?.flag} {country}
                                </span>
                                <button
                                  onClick={() => handleCountryRemove(country)}
                                  className="hover:text-primary/80 transition-colors"
                                >
                                  ×
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Horizontal Bars Visualization */}
                    {selectedCountries.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-white/10">
                        {currentData
                          .filter((row) => selectedCountries.includes(row.country))
                          .map((row) => {
                            const maxProduction = Math.max(...currentData.map((d) => d.production));
                            const percentage = maxProduction > 0 ? (row.production / maxProduction) * 100 : 0;

                            return (
                              <div key={row.country} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="text-foreground font-medium">
                                    {row.flag} {row.country}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {row.production.toLocaleString()} {row.unit}
                                  </span>
                                </div>
                                <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 ease-out shadow-glow-teal"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </GlassCard>
                )}
              </div>
            )}
          </EnergyTabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explorer;