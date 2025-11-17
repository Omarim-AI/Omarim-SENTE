
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface OrbitingAINodeProps {
  position: [number, number, number];
}

const OrbitingAINode: React.FC<OrbitingAINodeProps> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const glowIntensity = (Math.sin(time + position[0]) + 1) / 2;

    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = glowIntensity * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color="#00aaff"
        emissive="#00aaff"
        emissiveIntensity={1}
        toneMapped={false}
      />
    </mesh>
  );
};

const OrbitingAINodes: React.FC = () => {
  const nodes = [
    { position: [5, 0, 0] },
    { position: [-5, 0, 0] },
    { position: [0, 5, 0] },
    { position: [0, -5, 0] },
  ];

  return (
    <group>
      {nodes.map((node, index) => (
        <OrbitingAINode key={index} position={node.position as [number, number, number]} />
      ))}
    </group>
  );
};

export default OrbitingAINodes;
