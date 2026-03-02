"use client";

import { Suspense, useRef, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";

function Model() {
  const { scene } = useGLTF("/man_rice.glb");
  const ref = useRef<THREE.Group>(null);
  const isInteracting = useRef(false);

  // Optimize: traverse once to reduce draw calls
  const optimizedScene = useCallback(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.frustumCulled = true;
        if (mesh.material) {
          (mesh.material as THREE.Material).precision = "lowp";
        }
      }
    });
    return scene;
  }, [scene]);

  useFrame((_, delta) => {
    if (ref.current && !isInteracting.current) {
      ref.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group
      ref={ref}
      onPointerDown={() => (isInteracting.current = true)}
      onPointerUp={() => (isInteracting.current = false)}
      onPointerLeave={() => (isInteracting.current = false)}
    >
      <primitive object={optimizedScene()} scale={1} />
    </group>
  );
}

useGLTF.preload("/man_rice.glb");

export function ModelViewer() {
  return (
    <div className="w-full aspect-square rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 40 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={2}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
