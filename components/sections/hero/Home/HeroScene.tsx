"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

const TEAL = "#5eead4";
const TEAL_DARK = "#0d9488";

function Core() {
  const group = useRef<Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += delta * 0.15;
    g.rotation.x += (state.pointer.y * 0.35 - g.rotation.x) * 0.05;
    g.position.x += (state.pointer.x * 0.25 - g.position.x) * 0.05;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh>
          <icosahedronGeometry args={[1.35, 24]} />
          <MeshDistortMaterial
            color={TEAL_DARK}
            emissive={TEAL_DARK}
            emissiveIntensity={0.25}
            roughness={0.15}
            metalness={0.85}
            distort={0.38}
            speed={1.8}
          />
        </mesh>

        <mesh scale={1.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={TEAL} wireframe transparent opacity={0.12} />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.35, 0.012, 16, 160]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, -0.5, 0.4]}>
        <torusGeometry args={[2.7, 0.008, 16, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduceMotion ? "demand" : "always"}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-4, -2, 2]} intensity={30} color={TEAL} />
      <pointLight position={[3, -3, -2]} intensity={12} color="#f59e0b" />
      <Core />
      <Sparkles count={70} scale={[7, 5, 3]} size={2.2} speed={0.35} color={TEAL} opacity={0.7} />
    </Canvas>
  );
}
