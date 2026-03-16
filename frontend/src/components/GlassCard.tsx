import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "teal" | "blue" | "lime" | "none";
  style?: CSSProperties;
}

export const GlassCard = ({ children, className, hover = true, glow = "none", style }: GlassCardProps) => {
  const glowClasses = {
    teal: "hover:shadow-glow-teal",
    blue: "hover:shadow-glow-blue",
    lime: "hover:shadow-glow-lime",
    none: "",
  };

  return (
    <div
      className={cn(
        "glass-card",
        hover && "transition-all duration-300",
        glow !== "none" && glowClasses[glow],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
