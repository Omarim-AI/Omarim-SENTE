
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

import DashboardPanels from './DashboardPanels';

const DashboardShell: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#000' }}>
      <button onClick={handleLogout} style={{ position: 'absolute', top: 20, right: 20, zIndex: 100, padding: '10px 20px', backgroundColor: '#FF0000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
      <Canvas camera={{ position: [0, 0, 25], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
        <DashboardPanels />
      </Canvas>
    </div>
  );
}

export default DashboardShell;
