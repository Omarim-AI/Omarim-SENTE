
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Starfield from './Starfield';

export default function BackgroundScene() {

  return (
    <Canvas camera={{ position: [0, 0, 25], fov: 60, near: 1, far: 1000 }}>
      {/* Lighting */}
      <ambientLight intensity={0.6} color="white" />

      {/* Environment */}
      <color attach="background" args={['#000011']} />

      <Suspense fallback={null}>
        <Starfield />
      </Suspense>

      {/* Camera Controls */}
      <OrbitControls enableZoom={true} minDistance={1} maxDistance={50} autoRotate={true} autoRotateSpeed={0.2} />
    </Canvas>
  );
}
