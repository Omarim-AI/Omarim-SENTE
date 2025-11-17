
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CentralCognitionSphere: React.FC = () => {
  const sphereRef = useRef<THREE.Mesh>(null!);
  const haloRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Pulse intensity mapping (dynamic pulse)
    const pulseIntensity = (Math.sin(time * 1.5) + 1) / 2; // Oscillates between 0 and 1
    if (sphereRef.current) {
      const coreMaterial = sphereRef.current.material as THREE.MeshStandardMaterial;
      coreMaterial.emissiveIntensity = pulseIntensity * 2;
    }
    if (haloRef.current) {
      const haloMaterial = haloRef.current.material as THREE.MeshBasicMaterial;
      haloMaterial.opacity = pulseIntensity * 0.5;
      haloRef.current.scale.set(1, 1, 1).multiplyScalar(1 + pulseIntensity * 0.2);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Neon Core */}
      <mesh ref={sphereRef} scale={[2.5, 2.5, 2.5]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={'#00aaff'}
          emissive={'#00aaff'}
          emissiveIntensity={1}
          toneMapped={false}
          roughness={0.1}
          metalness={0.5}
        />
      </mesh>

      {/* Adaptive Halo */}
      <mesh ref={haloRef} scale={[2.5, 2.5, 2.5]}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshBasicMaterial
          color={'#00aaff'} // Starting with a single color
          transparent
          opacity={0.5}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default CentralCognitionSphere;
