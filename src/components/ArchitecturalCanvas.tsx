import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function Tower() {
  const groupRef = useRef<Group>(null);

  useFrame(({ pointer }, rawDelta) => {
    const group = groupRef.current;
    if (!group) return;
    const delta = Math.min(rawDelta, 0.05);
    group.rotation.y += delta * 0.09;
    group.rotation.x += (pointer.y * 0.06 - group.rotation.x) * (1 - Math.exp(-3 * delta));
    group.rotation.z += (-pointer.x * 0.04 - group.rotation.z) * (1 - Math.exp(-3 * delta));
  });

  const floors = Array.from({ length: 17 }, (_, index) => ({
    y: -4.6 + index * 0.57,
    rotation: index * 0.035,
    scale: 1 - Math.abs(index - 8) * 0.012,
  }));

  return (
    <group ref={groupRef} rotation={[0.06, -0.45, -0.03]}>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[2.25, 10.3, 1.7]} />
        <meshStandardMaterial color="#252420" metalness={0.55} roughness={0.34} />
      </mesh>
      {floors.map((floor, index) => (
        <mesh
          castShadow
          key={floor.y}
          position={[0, floor.y, 0]}
          rotation-y={floor.rotation}
          scale-x={floor.scale}
        >
          <boxGeometry args={[3.5, 0.12, 2.75]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#cfb584" : "#91836b"}
            metalness={0.72}
            roughness={0.22}
          />
        </mesh>
      ))}
      <mesh position={[0, 5.45, 0]} castShadow>
        <cylinderGeometry args={[1.28, 1.6, 0.4, 6]} />
        <meshStandardMaterial color="#cfb584" metalness={0.78} roughness={0.18} />
      </mesh>
    </group>
  );
}

export default function ArchitecturalCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.2, 14.5], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 6]} intensity={3.2} color="#fff2d4" castShadow />
      <pointLight position={[-5, -1, 4]} intensity={18} color="#a9c1c7" />
      <Tower />
      <Environment resolution={64}>
        <Lightformer intensity={2.2} position={[0, 6, 2]} scale={[8, 8, 1]} />
        <Lightformer
          intensity={1.4}
          color="#d9b778"
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[12, 2, 1]}
        />
      </Environment>
    </Canvas>
  );
}