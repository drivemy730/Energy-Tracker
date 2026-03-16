import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Droplets,
  Plus,
  Edit,
  Trash2,
  Download,
  Mail,
  FileSpreadsheet,
  Search,
  MoreVertical,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminPanel = () => {
  const mockTableData = [
    {
      id: "PRJ-001",
      name: "Three Gorges Dam",
      country: "China",
      capacity: 22500,
      status: "operational" as const,
    },
    {
      id: "PRJ-002",
      name: "Itaipu Dam",
      country: "Brazil/Paraguay",
      capacity: 14000,
      status: "operational" as const,
    },
    {
      id: "PRJ-003",
      name: "Grand Ethiopian Dam",
      country: "Ethiopia",
      capacity: 6450,
      status: "construction" as const,
    },
    {
      id: "PRJ-004",
      name: "Xiluodu Dam",
      country: "China",
      capacity: 13860,
      status: "operational" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background water-texture">
      {/* Top Bar */}
      <header className="h-16 glass-panel border-b border-white/10 sticky top-0 z-50 backdrop-blur-xl">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Droplets className="w-6 h-6 text-primary animate-glow-pulse" />
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">Project Management</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NeonButton variant="ghost" className="gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden md:inline">Send Report</span>
            </NeonButton>
            <NeonButton variant="primary" className="gap-2" glow>
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">New Project</span>
            </NeonButton>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Projects", value: "1,200", change: "+12%" },
            { label: "Active", value: "850", change: "+5%" },
            { label: "Construction", value: "280", change: "+18%" },
            { label: "Planned", value: "70", change: "+8%" },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-4 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-success">{stat.change}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Main Content */}
        <GlassCard className="p-6">
          {/* Table Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-1">Projects Database</h2>
              <p className="text-sm text-muted-foreground">
                Manage and update hydroelectric projects
              </p>
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 glass-panel border-white/10 focus:border-primary/50 bg-white/5 w-64"
                />
              </div>
              <NeonButton variant="ghost" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </NeonButton>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    ID
                  </th>
                  <th className="pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Country
                  </th>
                  <th className="pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">
                    Capacity (MW)
                  </th>
                  <th className="pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="pb-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockTableData.map((project, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="py-4 text-sm text-muted-foreground">{project.id}</td>
                    <td className="py-4 font-medium">{project.name}</td>
                    <td className="py-4 text-sm text-muted-foreground">{project.country}</td>
                    <td className="py-4 text-right font-mono">
                      {project.capacity.toLocaleString()}
                    </td>
                    <td className="py-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="py-4">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-primary/20 rounded-lg transition-colors text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-destructive/20 rounded-lg transition-colors text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (Visual) */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">1-4</span> of{" "}
              <span className="font-medium text-foreground">1,200</span> projects
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, "...", 50].map((page, i) => (
                <button
                  key={i}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    page === 1
                      ? "bg-primary text-primary-foreground shadow-glow-teal"
                      : "glass-panel hover:bg-white/10"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Email Report Preview (Visual) */}
        <GlassCard className="p-6 border-2 border-accent/30 shadow-glow-lime">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/20 border border-accent/50">
              <FileSpreadsheet className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1 flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                Automated Excel Report
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Monthly project summary exported and sent to stakeholders
              </p>
              <div className="flex gap-3">
                <NeonButton variant="secondary" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Excel
                </NeonButton>
                <NeonButton variant="ghost" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Send Now
                </NeonButton>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminPanel;
