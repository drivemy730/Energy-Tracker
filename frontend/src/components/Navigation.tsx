import { NavLink } from "react-router-dom";
import { Search, MapPin, Info, Home, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { HamburgerMenu } from "./HamburgerMenu";
import logo from "@/assets/logo.png";

export const Navigation = () => {
  const navItems = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Explorar", path: "/explorer", icon: BarChart3 },
    { name: "Mapa", path: "/map", icon: MapPin },
    { name: "Acerca de", path: "/about", icon: Info },
  ];

  const getLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      "px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2",
      isActive
        ? "text-primary shadow-glow-teal"
        : "text-foreground/80 hover:text-foreground hover:shadow-[0_0_15px_hsl(174_100%_45%/0.2)]"
    );

  return (
   <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 backdrop-blur-xl">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16 md:h-20"> {/* Navbar más compacta */}

      {/* Logo centrado verticalmente */}
      <NavLink to="/" className="relative flex items-center justify-center h-full group">
        {/* Glow opcional */}
        <div className="absolute inset-0 bg-white/10 rounded-lg blur opacity-20 group-hover:opacity-30 animate-glow-pulse"></div>

        {/* Logo redimensionado */}
        <img
          src={logo}
          alt="EnergyTracker Logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10 transition-transform duration-300 group-hover:scale-105"
        />
      </NavLink>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={getLinkClasses}>
            <item.icon className="w-4 h-4" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Hamburger Menu */}
      <HamburgerMenu />
    </div>
  </div>
</nav>
  );
};
