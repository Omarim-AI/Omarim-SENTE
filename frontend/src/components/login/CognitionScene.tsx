
import React from 'react';
import { Canvas } from '@react-three/fiber';
import CentralCognitionSphere from './CentralCognitionSphere';
import OrbitingAINodes from './OrbitingAINodes';

const CognitionScene: React.FC = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
        <ambientLight intensity={0.6} color="#ffffff" />
        <CentralCognitionSphere />
        <OrbitingAINodes />
      </Canvas>
    </div>
  );
};

export default CognitionScene;
