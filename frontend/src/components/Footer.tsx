import { Zap, Github, Mail, ExternalLink } from "lucide-react";

export const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Explorador", path: "/explorer" },
    { name: "Mapa Global", path: "/map" },
    { name: "Acerca de", path: "/about" },
  ];

  const resources = [
    { name: "Banco Mundial - Datos de Energía ONU " , url: "https://data.worldbank.org/topic/energy-and-mining" },
  ];

  return (
    <footer className="glass-panel border-t border-white/10 mt-auto relative overflow-hidden">
      {/* Animated Energy Pulse Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-glow-pulse" />
      
      <div className="container mx-auto px-4 py-12">

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm inline-flex items-center gap-1"
                  >
                    {resource.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm inline-flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="energysphere1@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center text-muted-foreground text-sm">
          <p>
            © {new Date().getFullYear()} HydroTracker - Explora el consumo global de energía
          </p>
          <p className="mt-2 text-xs">
            Visualización de datos para el consumo de energía hidroeléctrica, solar, eólica y térmica en todo el mundo
          </p>
        </div>
      </div>
    </footer>
  );
};
