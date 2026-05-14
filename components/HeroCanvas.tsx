"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial, Torus } from "@react-three/drei";
import * as THREE from "three";

// A rotating "rail" torus surrounded by drifting stablecoin nodes — the 3D motif
// behind the hero. Powered by React Three Fiber.
function Rail() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.12;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
      <Torus ref={ref} args={[1.5, 0.42, 64, 128]}>
        <MeshDistortMaterial
          color="#6d5ef9"
          emissive="#4f3fd8"
          emissiveIntensity={0.55}
          roughness={0.15}
          metalness={0.9}
          distort={0.28}
          speed={1.6}
        />
      </Torus>
    </Float>
  );
}

function Coins() {
  const group = useRef<THREE.Group>(null);
  const coins = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const r = 2.8 + (i % 3) * 0.45;
        return {
          pos: [Math.cos(a) * r, (Math.sin(i * 1.7) * 1.6), Math.sin(a) * r] as [
            number,
            number,
            number,
          ],
          s: 0.12 + (i % 4) * 0.05,
        };
      }),
    [],
  );
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
  });
  return (
    <group ref={group}>
      {coins.map((c, i) => (
        <Float key={i} speed={2 + (i % 3)} floatIntensity={2} rotationIntensity={1.5}>
          <mesh position={c.pos}>
            <icosahedronGeometry args={[c.s, 0]} />
            <meshStandardMaterial
              color={i % 2 ? "#22d3ee" : "#a78bfa"}
              emissive={i % 2 ? "#22d3ee" : "#7c6cff"}
              emissiveIntensity={0.7}
              roughness={0.2}
              metalness={0.6}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[6, 6, 6]} intensity={120} color="#7c6cff" />
        <pointLight position={[-6, -4, 2]} intensity={70} color="#22d3ee" />
        <Rail />
        <Coins />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
