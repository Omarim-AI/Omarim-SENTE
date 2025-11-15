import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useDrag } from '@use-gesture/react';
import * as THREE from 'three';

export default function CognitionSphere(props) {
  const meshRef = useRef();
  const [{ rotation }, api] = useSpring(() => ({
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 200, friction: 50 },
  }));

  const bind = useDrag(({ movement: [mx, my] }) => {
    const yRotation = (mx / 100);
    const xRotation = (my / 100);
    api.start({ rotation: [xRotation, yRotation, 0] });
  }, {
      from: () => [0, 0]
  });

  useFrame(() => {
    // This is for any other animations you might want to add later
  });

  return (
    <a.mesh {...props} {...bind()} ref={meshRef} rotation={rotation}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial
        color="#20559A"
        emissive="#00ffff"
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.1}
      />
    </a.mesh>
  );
}
