
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HolisticVibe: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Animate the vibe - subtle pulsation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Pulsate scale
      const scale = 1 + 0.05 * Math.sin(clock.getElapsedTime());
      meshRef.current.scale.set(scale, scale, scale);

      // Slowly shift color
      const hue = (clock.getElapsedTime() / 10) % 1;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissive.setHSL(hue, 0.5, 0.5);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color={'#ff88cc'}
        emissive={'#ff88cc'}
        emissiveIntensity={1.5}
        transparent={true}
        opacity={0.3}
        wireframe={true}
      />
    </mesh>
  );
};

export default HolisticVibe;
