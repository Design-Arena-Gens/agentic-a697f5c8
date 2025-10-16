"use client";

import { RoundedBox, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

type EarbudProps = {
  mirror?: boolean;
};

export function AirbudsModel() {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (!group.current) return;
    group.current.rotation.y = Math.sin(elapsed / 4) * 0.3;
    group.current.rotation.x = Math.cos(elapsed / 5) * 0.08;
    group.current.position.y = Math.sin(elapsed / 2.5) * 0.04;
  });

  return (
    <group ref={group} dispose={null}>
      <Float rotationIntensity={0.4} floatIntensity={0.4} speed={2.2}>
        <RoundedBox args={[1.6, 0.32, 1]} radius={0.18} smoothness={12} position={[0, -0.52, 0]}>
          <meshStandardMaterial
            color="#eaeef7"
            metalness={0.35}
            roughness={0.45}
            envMapIntensity={1.2}
          />
        </RoundedBox>
      </Float>

      <Earbud />
      <Earbud mirror />

      <AccentLights />
    </group>
  );
}

function Earbud({ mirror }: EarbudProps) {
  const direction = mirror ? 1 : -1;

  return (
    <group
      position={[direction * 0.42, 0.08, direction * 0.22]}
      rotation={[mirror ? -0.12 : 0.12, mirror ? Math.PI / 1.9 : -Math.PI / 1.9, mirror ? -0.2 : 0.2]}
    >
      <mesh position={[0, 0.24, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.23, 48, 48]} />
        <meshStandardMaterial
          color="#f6f7fb"
          metalness={0.25}
          roughness={0.28}
          envMapIntensity={1.2}
        />
      </mesh>

      <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.09, 0.1, 0.58, 40]} />
        <meshStandardMaterial
          color="#f4f6fb"
          metalness={0.3}
          roughness={0.35}
          envMapIntensity={1}
        />
      </mesh>

      <mesh position={[0, 0.31, direction * 0.1]}>
        <cylinderGeometry args={[0.1, 0.1, 0.06, 48]} />
        <meshStandardMaterial
          color="#0ea5e9"
          metalness={0.8}
          roughness={0.1}
          emissive="#38bdf8"
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh position={[0, -0.49, 0]}>
        <sphereGeometry args={[0.07, 40, 40]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.38} metalness={0.2} />
      </mesh>

      <mesh position={[direction * 0.12, 0.02, direction * 0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.015, 24, 120]} />
        <meshStandardMaterial color="#c7d2fe" metalness={0.75} roughness={0.22} />
      </mesh>
    </group>
  );
}

function AccentLights() {
  return (
    <group>
      <pointLight position={[0, 1.2, 1.2]} intensity={0.8} color="#93c5fd" />
      <pointLight position={[0.6, 0.6, -1.2]} intensity={0.7} color="#f0abfc" />
      <pointLight position={[-0.8, -0.2, 0.8]} intensity={0.6} color="#fde68a" />
    </group>
  );
}
