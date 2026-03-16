import { GlassCard } from "@/components/GlassCard";
import { StatusBadge } from "@/components/StatusBadge";
import { NeonButton } from "@/components/NeonButton";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  Zap,
  Droplets,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-react";
import turbineImage from "@/assets/turbine-icon.jpg";

const ProjectDetail = () => {
  const project = {
    name: "Three Gorges Dam",
    country: "China",
    countryFlag: "🇨🇳",
    location: "Sandouping, Yichang, Hubei",
    company: "China Yangtze Power Co., Ltd.",
    capacity: 22500,
    status: "operational" as const,
    commissioned: 2012,
    cost: "$28.5 billion",
    type: "Gravity Dam",
    height: "181 meters",
    length: "2,335 meters",
  };

  const timeline = [
    { phase: "Planned", year: 1992, status: "completed" },
    { phase: "Construction", year: 1994, status: "completed" },
    { phase: "Partial Operation", year: 2003, status: "completed" },
    { phase: "Full Operation", year: 2012, status: "active" },
  ];

  return (
    <div className="min-h-screen bg-background water-texture">
      {/* Hero Header */}
      <div className="relative h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${turbineImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-8">
          {/* Back Button */}
          <NeonButton variant="ghost" className="w-fit mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explorer
          </NeonButton>

          {/* Project Title */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{project.countryFlag}</span>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  {project.name}
                </h1>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{project.location}</span>
              </div>
            </div>
            <StatusBadge status={project.status} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12 -mt-8">
        {/* Key Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <GlassCard glow="teal" className="p-6">
            <Zap className="w-8 h-8 text-primary mb-3 animate-glow-pulse" />
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {project.capacity.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground mt-1">Megawatts (MW)</div>
            {/* Capacity Gauge (Visual) */}
            <div className="mt-4">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[95%] bg-gradient-to-r from-primary to-secondary rounded-full shadow-glow-teal" />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <Calendar className="w-8 h-8 text-secondary mb-3" />
            <div className="text-3xl font-bold">{project.commissioned}</div>
            <div className="text-sm text-muted-foreground mt-1">Commissioned</div>
          </GlassCard>

          <GlassCard className="p-6">
            <TrendingUp className="w-8 h-8 text-accent mb-3" />
            <div className="text-3xl font-bold">{project.cost}</div>
            <div className="text-sm text-muted-foreground mt-1">Total Investment</div>
          </GlassCard>

          <GlassCard className="p-6">
            <Droplets className="w-8 h-8 text-info mb-3" />
            <div className="text-3xl font-bold">{project.height}</div>
            <div className="text-sm text-muted-foreground mt-1">Dam Height</div>
          </GlassCard>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Project Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Operating Company</div>
                  <div className="font-medium">{project.company}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Dam Type</div>
                  <div className="font-medium">{project.type}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Dam Length</div>
                  <div className="font-medium">{project.length}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Location</div>
                  <div className="font-medium">{project.country}</div>
                </div>
              </div>
            </GlassCard>

            {/* Timeline */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold mb-6">Project Timeline</h2>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
                
                {/* Timeline Nodes */}
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <div key={i} className="relative flex items-center gap-4">
                      {/* Node */}
                      <div
                        className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                          item.status === "active"
                            ? "bg-primary shadow-glow-teal animate-glow-pulse"
                            : "bg-white/10 border border-white/20"
                        }`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.status === "active" ? "bg-background" : "bg-primary"
                          }`}
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 glass-panel p-4 rounded-xl">
                        <div className="font-semibold">{item.phase}</div>
                        <div className="text-sm text-muted-foreground">{item.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Capacity Chart (Visual Placeholder) */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold mb-4">Power Generation</h2>
              <div className="h-48 flex items-end justify-between gap-2">
                {[85, 92, 78, 95, 88, 91, 87, 94, 89, 93, 90, 96].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${value}%` }}
                    />
                    <div className="text-xs text-muted-foreground">
                      {i + 1}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground text-center mt-4">
                Monthly output for the past year
              </div>
            </GlassCard>
          </div>

          {/* Right Column: Gallery & Additional Info */}
          <div className="space-y-6">
            {/* Image Gallery */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" />
                Gallery
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary/50 transition-colors cursor-pointer group"
                  >
                    <ImageIcon className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-3">
                <NeonButton variant="primary" className="w-full" glow>
                  Download Report
                </NeonButton>
                <NeonButton variant="secondary" className="w-full">
                  Export Data
                </NeonButton>
                <NeonButton variant="ghost" className="w-full">
                  Share Project
                </NeonButton>
              </div>
            </GlassCard>

            {/* Environmental Impact (Visual Placeholder) */}
            <GlassCard className="p-6">
              <h2 className="text-xl font-semibold mb-4">Environmental Impact</h2>
              <div className="space-y-4">
                {[
                  { label: "CO₂ Offset", value: "100M tons/year", color: "success" },
                  { label: "Water Usage", value: "Optimized", color: "info" },
                  { label: "Ecosystem", value: "Monitored", color: "warning" },
                ].map((metric, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{metric.label}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-${metric.color} rounded-full`}
                        style={{ width: `${75 + i * 5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
