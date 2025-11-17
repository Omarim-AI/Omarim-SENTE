
import React from 'react';
import { MeshProps } from '@react-three/fiber';

const PanelSystemsMatrix: React.FC<MeshProps> = (props) => {
  return (
    <mesh {...props}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial color={"#2f4f4f"} />
    </mesh>
  );
}

export default PanelSystemsMatrix;
