import { ExternalLink } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { NeonButton } from "@/components/NeonButton";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background water-texture">
      <Navigation />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Acerca de EnergyTracker
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              EnergyTracker es una plataforma interactiva para explorar y analizar proyectos hidroeléctricos a nivel mundial. 
              Nuestra misión es democratizar el acceso a datos sobre infraestructura energética y promover la transparencia en el sector de energía renovable.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="glass-card p-8 md:p-12 mb-16 animate-scale-in">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Nuestra Misión
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                Creemos que el acceso a información precisa sobre proyectos hidroeléctricos es clave para la transición energética y la lucha contra el cambio climático.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                EnergyTracker combina datos globales de alta calidad provenientes de la ONU (Organización de las Naciones Unidas) y otras fuentes confiables, presentándolos en una interfaz moderna e intuitiva. 
                Esto permite a investigadores, periodistas, estudiantes y ciudadanos explorar y comprender la energía hidroeléctrica mundial de manera sencilla.
              </p>
            </div>
          </div>

          {/* Data Source */}
          <div className="glass-card p-8 md:p-12 mb-16 animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground text-center">
                Fuente de Datos
              </h2>
              <p className="text-muted-foreground leading-relaxed text-center">
                Todos los datos de proyectos hidroeléctricos en EnergyTracker provienen de{" "}
                <a
                  href="https://data.un.org/Default.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-glow transition-colors inline-flex items-center gap-1"
                >
                  la ONU (Organización de las Naciones Unidas)
                  <ExternalLink className="w-4 h-4" />
                </a>
                , una organización internacional que recopila y publica información estadística global sobre diversos temas, incluyendo energía y desarrollo sostenible.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center animate-scale-in">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Únete a la Comunidad
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              EnergyTracker es un proyecto de código abierto. Contribuye con código, reporta errores o explora los datos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeonButton
                variant="primary"
                glow
                onClick={() => window.open("https://data.un.org/Default.aspx", "_blank")}
              >
                Ver datos en la ONU
                <ExternalLink className="w-4 h-4 ml-2" />
              </NeonButton>
              <NeonButton
                variant="hero"
                glow
                onClick={() => window.open("https://github.com", "_blank")}
              >
                Contribuir en GitHub
                <ExternalLink className="w-4 h-4 ml-2" />
              </NeonButton>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
