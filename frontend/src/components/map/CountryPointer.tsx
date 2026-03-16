import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CountryPointerProps {
  position: [number, number, number];
  energyType: "hydro" | "solar" | "wind" | "thermal";
  country: string;
  capacity: number;
  status: string;
  onClick: () => void;
  onHover: (hover: boolean) => void;
}

/**
 * Energy pointer marker on the globe
 * Color-coded by energy type with animated pulse effect
 */
export const CountryPointer = ({
  position,
  energyType,
  onClick,
  onHover,
}: CountryPointerProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Color mapping for energy types
  const colors = {
    hydro: "#00e6d0",
    solar: "#ffd23f",
    wind: "#3ab7ff",
    thermal: "#ff6b6b",
  };

  // Pulse animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.2;
      meshRef.current.scale.setScalar(hovered ? scale * 1.5 : scale);
    }
  });

  return (
    <group position={position}>
      {/* Main pointer */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(true);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(false);
        }}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color={colors[energyType]}
          emissive={colors[energyType]}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Outer glow ring */}
      <mesh>
        <ringGeometry args={[0.06, 0.09, 32]} />
        <meshBasicMaterial
          color={colors[energyType]}
          transparent
          opacity={hovered ? 0.4 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
