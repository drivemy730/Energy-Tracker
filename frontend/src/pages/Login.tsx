import { useState } from "react";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Zap, Lock, Mail, User, Shield } from "lucide-react";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center water-texture p-6 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-solar/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />

      {/* Login/Signup Card */}
      <GlassCard className="w-full max-w-md p-8 space-y-6 relative z-10 animate-scale-in border-2 border-white/10">
        {/* Logo & Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4 relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-primary via-solar to-secondary rounded-full blur opacity-40 animate-glow-pulse" />
            <Zap className="w-12 h-12 text-primary relative z-10" />
          </div>
          <h1 className="text-3xl font-bold font-orbitron bg-gradient-to-r from-primary via-solar to-secondary bg-clip-text text-transparent">
            EnergyTracker
          </h1>
          <p className="text-sm text-muted-foreground">
            Plataforma Global de Análisis Energético
          </p>
        </div>

        {/* Tabs for Login / Create Account */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="glass-panel grid w-full grid-cols-2 p-1 mb-6">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:border data-[state=active]:border-primary/50 data-[state=active]:shadow-glow-teal rounded-lg transition-all"
            >
              <Shield className="w-4 h-4 mr-2" />
              Iniciar Sesión
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary data-[state=active]:border data-[state=active]:border-secondary/50 data-[state=active]:shadow-glow-blue rounded-lg transition-all"
            >
              <User className="w-4 h-4 mr-2" />
              Crear Cuenta
            </TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-4">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="login-email" className="text-sm text-muted-foreground">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="usuario@energytracker.com"
                    className="pl-10 glass-panel border-2 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-white/5 rounded-xl h-12 text-foreground placeholder:text-muted-foreground transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="login-password" className="text-sm text-muted-foreground">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 glass-panel border-2 border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 bg-white/5 rounded-xl h-12 text-foreground placeholder:text-muted-foreground transition-all"
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs text-primary hover:text-primary-glow transition-colors hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Submit Button */}
              <NeonButton variant="primary" className="w-full h-12 text-base mt-6" glow>
                Iniciar Sesión
              </NeonButton>
            </form>
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup" className="space-y-4">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="signup-username" className="text-sm text-muted-foreground">
                  Nombre de Usuario
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                  <Input
                    id="signup-username"
                    type="text"
                    placeholder="exploradorenergetico"
                    className="pl-10 glass-panel border-2 border-white/10 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 bg-white/5 rounded-xl h-12 text-foreground placeholder:text-muted-foreground transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-sm text-muted-foreground">
                  Correo Electrónico
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="usuario@energytracker.com"
                    className="pl-10 glass-panel border-2 border-white/10 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 bg-white/5 rounded-xl h-12 text-foreground placeholder:text-muted-foreground transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-sm text-muted-foreground">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 glass-panel border-2 border-white/10 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 bg-white/5 rounded-xl h-12 text-foreground placeholder:text-muted-foreground transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <NeonButton variant="secondary" className="w-full h-12 text-base mt-6" glow>
                Crear Cuenta
              </NeonButton>
            </form>
          </TabsContent>
        </Tabs>

        {/* Biometric Option (Visual Only) */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-4 text-muted-foreground bg-card">
              O autenticar con
            </span>
          </div>
        </div>

        <button className="w-full glass-panel p-4 rounded-xl hover:bg-white/10 transition-all duration-300 border-2 border-white/10 hover:border-accent/50 hover:shadow-glow-lime group">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary via-solar to-secondary animate-glow-pulse flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors font-medium">
              Autenticación Biométrica / SSO
            </span>
          </div>
        </button>
      </GlassCard>
    </div>
  );
};

export default Login;
