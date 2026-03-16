import { useState } from "react";
import { Menu, X, LogIn, UserPlus, Settings, Globe } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { cn } from "@/lib/utils";

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: LogIn, label: "Iniciar sesión", path: "/login", variant: "primary" as const },
    { icon: UserPlus, label: "Crear cuenta", path: "/login", variant: "secondary" as const },
    { icon: Settings, label: "Configuración", path: "#", variant: "ghost" as const },
    { icon: Globe, label: "Idioma", path: "#", variant: "ghost" as const },
  ];

  return (
    <>
      {/* Botón de hamburguesa */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 hover:shadow-glow-teal"
        aria-label="Abrir menú"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel lateral */}
          <div className="fixed top-0 right-0 h-full w-80 z-50 animate-slide-in">
            <GlassCard className="h-full rounded-none border-l border-white/10 p-6 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold font-orbitron bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Menú
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Items del menú */}
              <div className="space-y-4 flex-1">
                {menuItems.map((item, index) => (
                  <NeonButton
                    key={index}
                    variant={item.variant}
                    className={cn(
                      "w-full justify-start gap-3 text-lg py-6",
                      "border-2 transition-all duration-300",
                      "animate-fade-in"
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => {
                      setIsOpen(false);
                      window.location.href = item.path;
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </NeonButton>
                ))}
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-muted-foreground text-center">
                  EnergyTracker v2.0
                  <br />
                  Global Energy Analytics
                </p>
              </div>
            </GlassCard>
          </div>
        </>
      )}
    </>
  );
};
