import { NeonButton } from "@/components/NeonButton";
import { GlassCard } from "@/components/GlassCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Droplets, Zap, Globe, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-hydro-bg.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col water-texture">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />

        {/* Animated Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float animation-delay-2000" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
            <Zap className="w-12 h-12 text-primary animate-glow-pulse" />
            <h1 className="text-5xl md:text-6xl font-bold font-orbitron bg-gradient-to-r from-primary via-solar to-secondary bg-clip-text text-transparent">
              Energy Tracker
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl lg:text-4xl leading-snug text-muted-foreground mb-8 max-w-4xl mx-auto animate-fade-in animation-delay-200">
            Explora el consumo global de energía
          </p>

          {/* Subtagline / descripción */}
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed text-muted-foreground/80 mb-8 max-w-3xl mx-auto animate-fade-in animation-delay-300">
            Compara el uso de energía hidroeléctrica, solar, eólica y térmica por país y rango de tiempo
          </p>

          {/* Global Consumption Gauge */}
          <GlassCard className="max-w-3xl mx-auto p-8 mb-10 animate-scale-in animation-delay-400">
            <div className="text-center space-y-6">
              <h3 className="text-base md:text-lg text-muted-foreground uppercase tracking-wider">Tipos de Energía</h3>
              
              {/* Energy Icons */}
              <div className="grid grid-cols-4 gap-6 justify-items-center">
                <div className="flex flex-col items-center">
                  <Droplets className="w-10 h-10 text-primary" aria-label="Hidro" role="img" />
                  <span className="text-sm md:text-base text-muted-foreground mt-1">Hidro</span>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="w-10 h-10 text-solar" aria-label="Solar" role="img" />
                  <span className="text-sm md:text-base text-muted-foreground mt-1">Solar</span>
                </div>
                <div className="flex flex-col items-center">
                  <Globe className="w-10 h-10 text-secondary" aria-label="Eólica" role="img" />
                  <span className="text-sm md:text-base text-muted-foreground mt-1">Eólica</span>
                </div>
                <div className="flex flex-col items-center">
                  <Droplets className="w-10 h-10 text-thermal" aria-label="Térmica" role="img" />
                  <span className="text-sm md:text-base text-muted-foreground mt-1">Térmica</span>
                </div>
              </div>

              {/* Invitation to create account */}
              <p className="text-base md:text-lg text-muted-foreground/80 mt-6">
                ¡Crea una cuenta para descargar documentos con la información que busques!
              </p>
            </div>
          </GlassCard>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animation-delay-600">
            <NeonButton 
              variant="hero" 
              className="text-lg px-8 py-6 group"
              onClick={() => window.location.href = "/explorer"}
            >
              Explorar por país
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </NeonButton>
            <NeonButton 
              variant="secondary" 
              className="text-lg px-8 py-6"
              onClick={() => window.location.href = "/map"}
            >
              Ver mapa global
            </NeonButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
