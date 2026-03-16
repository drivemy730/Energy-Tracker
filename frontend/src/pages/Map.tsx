import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Sun, Wind, Flame } from "lucide-react";
import { GlobeScene } from "@/components/map/GlobeScene";
import { MapTooltip } from "@/components/map/MapTooltip";
import { FilterPanel } from "@/components/map/FilterPanel";

type EnergyProject = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: string;
  capacity: number;
  energyType: "hydro" | "solar" | "wind" | "thermal";
};

/**
 * Mock project data for visualization
 * TODO: Replace with API integration
 * API endpoint: /api/energy-projects?type={energyType}&status={status}
 */
const projectLocations: EnergyProject[] = [
  { id: 1, name: "Tres Gargantas", lat: 30.8, lng: 111, status: "operational", capacity: 22500, energyType: "hydro" },
  { id: 2, name: "Itaipú", lat: -25.4, lng: -54.6, status: "operational", capacity: 14000, energyType: "hydro" },
  { id: 3, name: "Belo Monte", lat: -3.1, lng: -51.8, status: "construction", capacity: 11233, energyType: "hydro" },
  { id: 4, name: "GERD", lat: 11.2, lng: 35.1, status: "construction", capacity: 6450, energyType: "hydro" },
  { id: 5, name: "Baihetan", lat: 28.2, lng: 103, status: "planned", capacity: 16000, energyType: "hydro" },
  { id: 6, name: "Longyangxia Solar", lat: 36.0, lng: 100.8, status: "operational", capacity: 850, energyType: "solar" },
  { id: 7, name: "Gansu Wind", lat: 40.0, lng: 96.0, status: "operational", capacity: 7965, energyType: "wind" },
  { id: 8, name: "Jaitapur Nuclear", lat: 16.6, lng: 73.3, status: "planned", capacity: 9900, energyType: "thermal" },
];

export default function Map() {
  const [capacityMin, setCapacityMin] = useState([0]);
  const [activeEnergyType, setActiveEnergyType] = useState<"hydro" | "solar" | "wind" | "thermal">("hydro");
  const [statusFilters, setStatusFilters] = useState({
    operational: true,
    construction: true,
    planned: true,
  });
  const [showFilters, setShowFilters] = useState(true);
  const [selectedProject, setSelectedProject] = useState<EnergyProject | null>(null);

  // Filter projects by energy type and status
  const filteredProjects = projectLocations.filter(
    (project) =>
      project.energyType === activeEnergyType &&
      statusFilters[project.status as keyof typeof statusFilters] &&
      project.capacity >= capacityMin[0]
  );

  return (
    <div className="min-h-screen flex flex-col bg-background water-texture">
      <Navigation />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold font-orbitron bg-gradient-to-r from-primary via-solar to-secondary bg-clip-text text-transparent">
              Mapa Global de Energía 3D
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explora proyectos energéticos en un globo interactivo con visualización en tiempo real
            </p>
            
            {/* Energy Type Layer Toggles */}
            <div className="flex justify-center">
              <Tabs value={activeEnergyType} onValueChange={(v) => setActiveEnergyType(v as any)}>
                <TabsList className="glass-panel p-2 inline-flex gap-2">
                  <TabsTrigger 
                    value="hydro"
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary/50 data-[state=active]:shadow-glow-teal flex items-center gap-2 rounded-lg"
                  >
                    <Droplets className="w-4 h-4" />
                    Hydro
                  </TabsTrigger>
                  <TabsTrigger 
                    value="solar"
                    className="data-[state=active]:bg-solar/20 data-[state=active]:text-solar data-[state=active]:border data-[state=active]:border-solar/50 data-[state=active]:shadow-glow-solar flex items-center gap-2 rounded-lg"
                  >
                    <Sun className="w-4 h-4" />
                    Solar
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wind"
                    className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary data-[state=active]:border data-[state=active]:border-secondary/50 data-[state=active]:shadow-glow-blue flex items-center gap-2 rounded-lg"
                  >
                    <Wind className="w-4 h-4" />
                    Wind
                  </TabsTrigger>
                  <TabsTrigger 
                    value="thermal"
                    className="data-[state=active]:bg-thermal/20 data-[state=active]:text-thermal data-[state=active]:border data-[state=active]:border-thermal/50 data-[state=active]:shadow-glow-thermal flex items-center gap-2 rounded-lg"
                  >
                    <Flame className="w-4 h-4" />
                    Thermal
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* 3D Globe Container */}
            <div className="flex-1 glass-card p-4 relative animate-scale-in">
              <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
                <GlobeScene
                  projects={filteredProjects}
                  onProjectClick={(project) => setSelectedProject(project)}
                />
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-glow-teal" />
                  <span className="text-sm text-muted-foreground">Hydro</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-solar shadow-glow-solar" />
                  <span className="text-sm text-muted-foreground">Solar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary shadow-glow-blue" />
                  <span className="text-sm text-muted-foreground">Wind</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-thermal shadow-glow-thermal" />
                  <span className="text-sm text-muted-foreground">Thermal</span>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>🖱️ Arrastra para rotar • 🔍 Scroll para zoom • 📍 Click en puntos para detalles</p>
              </div>
            </div>

            {/* Filters Panel */}
            <FilterPanel
              capacityMin={capacityMin}
              onCapacityChange={setCapacityMin}
              filteredCount={filteredProjects.length}
              activeEnergyType={activeEnergyType}
              showFilters={showFilters}
              onToggleFilters={() => setShowFilters(!showFilters)}
            />
          </div>

          {/* Tooltip Modal */}
          {selectedProject && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
                onClick={() => setSelectedProject(null)}
              />
              
              {/* Tooltip */}
              <MapTooltip
                country={selectedProject.name}
                capacity={selectedProject.capacity}
                onClose={() => setSelectedProject(null)}
              />
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
