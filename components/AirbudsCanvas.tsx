"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, PresentationControls } from "@react-three/drei";
import { Suspense } from "react";
import { AirbudsModel } from "./AirbudsModel";

export default function AirbudsCanvas() {
  return (
    <Canvas
      camera={{ position: [0.4, 0.8, 1.6], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#f7f9fd"]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} castShadow />

      <Suspense fallback={null}>
        <PresentationControls
          global
          zoom={1}
          polar={[-Math.PI / 6, Math.PI / 4]}
          azimuth={[-Math.PI / 6, Math.PI / 6]}
          config={{ mass: 2, tension: 400 }}
          snap
        >
          <group position={[0, -0.15, 0]}>
            <AirbudsModel />
          </group>
        </PresentationControls>
        <ContactShadows
          position={[0, -0.7, 0]}
          opacity={0.32}
          scale={8}
          blur={2.8}
          far={4.2}
        />
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
}
