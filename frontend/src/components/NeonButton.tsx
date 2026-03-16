import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "hero" | "primary" | "secondary" | "ghost";
  glow?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const NeonButton = ({ 
  variant = "primary", 
  glow = true, 
  children, 
  className,
  ...props 
}: NeonButtonProps) => {
  const variantStyles = {
    hero: "bg-white/10 text-foreground border-2 border-primary hover:bg-white/20 hover:border-primary-glow",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary-glow",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 border border-secondary-glow",
    ghost: "bg-transparent text-foreground border border-white/20 hover:bg-white/10",
  };

  const glowStyles = {
    hero: "shadow-glow-teal hover:shadow-glow-teal",
    primary: "shadow-glow-teal hover:shadow-glow-teal",
    secondary: "shadow-glow-blue hover:shadow-glow-blue",
    ghost: "",
  };

  return (
    <Button
      className={cn(
        "rounded-xl font-semibold transition-all duration-300",
        variantStyles[variant],
        glow && glowStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
