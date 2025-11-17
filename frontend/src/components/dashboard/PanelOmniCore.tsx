
import React from 'react';
import { GroupProps } from '@react-three/fiber';

const PanelOmniCore: React.FC<GroupProps> = (props) => {
  return (
    <group {...props}>
      <mesh>
        <cylinderGeometry args={[1, 1, 0.5, 6]} />
        <meshStandardMaterial color={"purple"} emissive={"violet"} />
      </mesh>
      {/* TODO: Synaptic memory ribbons, evolution overlays, risk holograms */}
    </group>
  );
}

export default PanelOmniCore;
