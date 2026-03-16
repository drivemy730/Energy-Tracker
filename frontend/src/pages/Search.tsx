import { useState } from "react";
import { Search as SearchIcon, ChevronRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { NeonButton } from "@/components/NeonButton";

// Mock data for demonstration
const mockProjects = [
  {
    id: 1,
    name: "Represa de las Tres Gargantas",
    capacity: 22500,
    status: "operational" as const,
    city: "Yichang, Hubei",
    country: "China",
  },
  {
    id: 2,
    name: "Itaipú Dam",
    capacity: 14000,
    status: "operational" as const,
    city: "Paraná",
    country: "Brasil/Paraguay",
  },
  {
    id: 3,
    name: "Belo Monte",
    capacity: 11233,
    status: "construction" as const,
    city: "Pará",
    country: "Brasil",
  },
  {
    id: 4,
    name: "Grand Ethiopian Renaissance Dam",
    capacity: 6450,
    status: "construction" as const,
    city: "Benishangul-Gumuz",
    country: "Etiopía",
  },
  {
    id: 5,
    name: "Baihetan Dam",
    capacity: 16000,
    status: "planned" as const,
    city: "Sichuan/Yunnan",
    country: "China",
  },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = mockProjects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-background water-texture">
      <Navigation />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Buscar por país o proyecto
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explora la base de datos de proyectos hidroeléctricos alrededor del mundo
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12 animate-scale-in">
            <div className="relative group">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
              <Input
                type="text"
                placeholder="Buscar por país, proyecto o ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg glass-panel border-white/20 focus:border-primary focus:shadow-glow-teal transition-all duration-300"
              />
            </div>
          </div>

          {/* Results Table */}
          <div className="glass-card overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Nombre del proyecto
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Capacidad (MW)
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Estado
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Ciudad/Región
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-foreground">{project.name}</div>
                        <div className="text-sm text-muted-foreground">{project.country}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-2xl font-bold text-primary">
                          {project.capacity.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={project.status} />
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{project.city}</td>
                      <td className="px-6 py-4">
                        <NeonButton
                          variant="ghost"
                          glow={false}
                          onClick={() => (window.location.href = `/project/${project.id}`)}
                          className="group"
                        >
                          Ver más
                          <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                        </NeonButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No se encontraron proyectos que coincidan con tu búsqueda.
                </p>
              </div>
            )}
          </div>

          {/* Mobile Cards View */}
          <div className="lg:hidden space-y-4 mt-6">
            {filteredProjects.map((project) => (
              <div key={project.id} className="glass-card p-4 animate-fade-in">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{project.name}</h3>
                    <p className="text-sm text-muted-foreground">{project.country}</p>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Capacidad:</span>
                    <span className="text-xl font-bold text-primary">
                      {project.capacity.toLocaleString()} MW
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Ubicación:</span>
                    <span className="text-sm text-foreground">{project.city}</span>
                  </div>
                </div>
                <NeonButton
                  variant="ghost"
                  glow={false}
                  onClick={() => (window.location.href = `/project/${project.id}`)}
                  className="w-full group"
                >
                  Ver más
                  <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                </NeonButton>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
