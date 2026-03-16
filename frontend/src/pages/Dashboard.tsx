import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { ProjectCard } from "@/components/ProjectCard";
import { NeonButton } from "@/components/NeonButton";
import {
  Search,
  Filter,
  ChevronDown,
  Menu,
  Droplets,
  MapPin,
  Zap,
  Layers,
  Plus,
  Minus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import worldMap from "@/assets/world-map-glow.jpg";
import { useEnergyData } from "../hooks/useEnergyData"; // ADD THIS IMPORT

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 🎯 REPLACE MOCK DATA WITH REAL DATA HOOK
  const { data: hydroData, isLoading, isError } = useEnergyData('HYDRO', 2022);

  // 🎯 TRANSFORM REAL DATA TO PROJECT FORMAT
  const realProjects = hydroData?.map((energyItem, index) => ({
    name: `${energyItem.countryName} Hydro Plant`,
    country: energyItem.countryName,
    countryFlag: "🌍", // You can add flag logic later
    company: "National Energy Co.",
    capacity: Math.round(energyItem.value), // Use real energy value
    status: "operational" as const, // Default status
  })) || [];

  // 🎯 CALCULATE REAL STATS FROM DATA
  const totalCapacity = realProjects.reduce((sum, project) => sum + project.capacity, 0);
  const uniqueCountries = [...new Set(realProjects.map(p => p.country))].length;

  const mockProjects = [
    {
      name: "Three Gorges Dam",
      country: "China",
      countryFlag: "🇨🇳",
      company: "China Yangtze Power",
      capacity: 22500,
      status: "operational" as const,
    },
    {
      name: "Itaipu Dam",
      country: "Brazil/Paraguay",
      countryFlag: "🇧🇷",
      company: "Itaipu Binacional",
      capacity: 14000,
      status: "operational" as const,
    },
    // ... keep other mock projects as fallback
  ];

  // 🎯 USE REAL DATA IF AVAILABLE, OTHERWUSE MOCK DATA
  const displayProjects = realProjects.length > 0 ? realProjects : mockProjects;
  const projectsCount = realProjects.length > 0 ? realProjects.length : mockProjects.length;

  return (
    <div className="min-h-screen bg-background water-texture">
      {/* Top Navigation Bar */}
      <header className="h-16 glass-panel border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="h-full px-6 flex items-center justify-between gap-4">
          {/* Left: Logo + Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Droplets className="w-6 h-6 text-primary animate-glow-pulse" />
              <span className="font-bold text-lg hidden sm:inline">HydroTracker</span>
            </div>
          </div>

          {/* Center: Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects, countries, companies..."
                className="pl-10 glass-panel border-white/10 focus:border-primary/50 bg-white/5 h-10 rounded-xl"
              />
            </div>
          </div>

          {/* Right: Filters + Avatar */}
          <div className="flex items-center gap-3">
            <NeonButton variant="ghost" className="h-10 gap-2">
              <Filter className="w-4 h-4" />
              <span className="hidden md:inline">Filters</span>
            </NeonButton>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-primary shadow-glow-teal" />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar (Collapsible) */}
        {sidebarOpen && (
          <aside className="w-64 glass-panel border-r border-white/10 p-4 space-y-4 animate-slide-in overflow-y-auto">
            <div className="space-y-2">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Navigation
              </div>
              {[
                { icon: MapPin, label: "Explorer", active: true },
                { icon: Zap, label: "Analytics", active: false },
                { icon: Layers, label: "Projects", active: false },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                    item.active
                      ? "bg-primary/20 text-primary border border-primary/50 shadow-glow-teal"
                      : "hover:bg-white/5 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* 🎯 DATA STATUS INDICATOR */}
            <GlassCard className="p-3 bg-white/5">
              <div className="text-xs text-muted-foreground mb-2">Data Status</div>
              {isLoading && (
                <div className="text-sm text-yellow-400">🔄 Loading real hydro data...</div>
              )}
              {isError && (
                <div className="text-sm text-red-400">❌ Error loading data</div>
              )}
              {hydroData && (
                <div className="text-sm text-green-400">✅ Live hydro data ({hydroData.length} records)</div>
              )}
            </GlassCard>

            {/* Filters Section */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Filters
              </div>
              
              {/* Status Filter */}
              <div className="space-y-2 mb-4">
                <div className="text-xs text-muted-foreground mb-2">Status</div>
                {["operational", "construction", "planned"].map((status) => (
                  <label key={status} className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground transition-colors">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-primary"
                    />
                    <span className="capitalize text-muted-foreground">{status}</span>
                  </label>
                ))}
              </div>

              {/* Capacity Range */}
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground mb-2">Capacity (MW)</div>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="25000"
                    className="w-full h-2 rounded-full appearance-none bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-glow-teal"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0</span>
                    <span>25,000</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 flex overflow-hidden">
          {/* Center: Map View */}
          <div className="flex-1 relative">
            <div className="absolute inset-0">
              <img
                src={worldMap}
                alt="Interactive world map"
                className="w-full h-full object-cover"
              />
              
              {/* Map Overlay UI */}
              <div className="absolute top-4 left-4 space-y-2">
                <GlassCard className="p-3 space-y-2">
                  <div className="text-xs text-muted-foreground mb-2">Legend</div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-success shadow-glow-teal" />
                      <span className="text-xs">Operational</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-warning" />
                      <span className="text-xs">Construction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-info shadow-glow-blue" />
                      <span className="text-xs">Planned</span>
                    </div>
                  </div>
                </GlassCard>

                {/* Zoom Controls */}
                <GlassCard className="p-2 flex flex-col gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                  <div className="border-t border-white/10" />
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                </GlassCard>
              </div>

              {/* 🎯 REAL DATA STATS OVERLAY */}
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3">
                {[
                  { label: "Total Projects", value: projectsCount.toString(), icon: Layers },
                  { label: "Total Capacity", value: `${Math.round(totalCapacity / 1000)} GW`, icon: Zap },
                  { label: "Countries", value: uniqueCountries.toString(), icon: MapPin },
                ].map((stat, i) => (
                  <GlassCard key={i} className="p-3 backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">{stat.label}</span>
                    </div>
                    <div className="text-lg font-bold">{stat.value}</div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Project List */}
          <aside className="w-96 glass-panel border-l border-white/10 overflow-y-auto">
            <div className="p-4 border-b border-white/10 sticky top-0 bg-card/50 backdrop-blur-xl z-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold">Projects</h2>
                <button className="text-xs text-primary hover:text-primary-glow flex items-center gap-1">
                  Sort <ChevronDown className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                {projectsCount} projects found
                {hydroData && <span className="text-green-400 ml-2">• LIVE</span>}
              </p>
            </div>

            {/* 🎯 LOADING STATE */}
            {isLoading && (
              <div className="p-4 text-center text-muted-foreground">
                Loading hydro energy data...
              </div>
            )}

            {/* 🎯 ERROR STATE */}
            {isError && (
              <div className="p-4 text-center text-red-400">
                Failed to load data. Using sample projects.
              </div>
            )}

            <div className="p-4 space-y-4">
              {displayProjects.map((project, i) => (
                <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                  <ProjectCard {...project} />
                </div>
              ))}
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;