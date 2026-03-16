import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Globe3D } from "./Globe3D";
import { CountryPointer } from "./CountryPointer";

interface Project {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: string;
  capacity: number;
  energyType: "hydro" | "solar" | "wind" | "thermal";
}

interface GlobeSceneProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

/**
 * Main 3D scene container with globe and country pointers
 * Handles coordinate conversion from lat/lng to 3D space
 */
export const GlobeScene = ({ projects, onProjectClick }: GlobeSceneProps) => {
  // Convert latitude and longitude to 3D coordinates on sphere
  const latLngToVector3 = (lat: number, lng: number, radius: number = 2.05) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return [x, y, z] as [number, number, number];
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      className="cursor-grab active:cursor-grabbing"
    >
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00e6d0" />

      {/* Starfield background */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Main globe */}
      <Globe3D />

      {/* Country pointers */}
      {projects.map((project) => (
        <CountryPointer
          key={project.id}
          position={latLngToVector3(project.lat, project.lng)}
          energyType={project.energyType}
          country={project.name}
          capacity={project.capacity}
          status={project.status}
          onClick={() => onProjectClick(project)}
          onHover={() => {}}
        />
      ))}

      {/* Camera controls - rotation and zoom */}
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />
    </Canvas>
  );
};
