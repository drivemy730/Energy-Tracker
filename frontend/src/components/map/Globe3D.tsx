import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import earthMap from "@/assets/MUNDI.jpg"; // ruta de tu textura

/**
 * 3D Globe con textura de mapa mundi y wireframe futurista
 * Mantiene rotación automática y es compatible con CountryPointers
 */
export const Globe3D = () => {
  const globeRef = useRef<THREE.Mesh>(null);

  // Auto-rotación
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  // Carga la textura del mapa
  const texture = useLoader(THREE.TextureLoader, earthMap);

  return (
    <group>
      {/* Globo principal con textura */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.4}
          roughness={0.7}
          emissive="#00e6d0"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Wireframe futurista */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial
          color="#00e6d0"
          wireframe
          transparent
          opacity={0.1}
        />
      </Sphere>
    </group>
  );
};
