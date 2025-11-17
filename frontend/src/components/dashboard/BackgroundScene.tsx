import React from 'react';
import { Canvas } from '@react-three/fiber';

const BackgroundScene: React.FC = () => {

  return (
   <Canvas>
     <color attach="background" args={['#000000']} />
   </Canvas>
  );
}

export default BackgroundScene;