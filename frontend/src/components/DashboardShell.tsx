import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { ARButton, XR } from '@react-three/xr';

import CognitionSphere from './CognitionSphere';
import PanelBioGenesis from './dashboard/PanelBioGenesis';
import PanelSystemsMatrix from './dashboard/PanelSystemsMatrix';
import PanelOmniCore from './dashboard/PanelOmniCore';
import PanelQuantum from './dashboard/PanelQuantum';
import DashboardEffects from './DashboardEffects';
import MultiUserPaths from './dashboard/MultiUserPaths';
import VRComponent from './dashboard/VRComponent';
import VoiceControl from './dashboard/VoiceControl';
import GestureControl from './dashboard/GestureControl';
import CameraControl from './dashboard/CameraControl';
import LogoutButton from './LogoutButton';

const DashboardShell: React.FC = () => {
  const [cameraTarget, setCameraTarget] = useState<[number, number, number] | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [isBioGenesisOpen, setBioGenesisOpen] = useState<boolean>(true);
  const [isSystemsMatrixOpen, setSystemsMatrixOpen] = useState<boolean>(true);
  const [isOmniCoreOpen, setOmniCoreOpen] = useState<boolean>(true);
  const [isQuantumOpen, setQuantumOpen] = useState<boolean>(true);

  const handleVoiceCommand = (command: string) => {
    if (command.includes("focus on biogenesis")) {
      setCameraTarget([-5, 3, 0]);
    } else if (command.includes("focus on systems")) {
      setCameraTarget([5, 3, 0]);
    } else if (command.includes("focus on omnicore")) {
      setCameraTarget([-5, -3, 0]);
    } else if (command.includes("focus on quantum")) {
      setCameraTarget([5, -3, 0]);
    } else if (command.includes("reset view")) {
      setCameraTarget([0, 0, 15]);
      setZoom(1);
    } else if (command.includes("open biogenesis")) {
      setBioGenesisOpen(true);
    } else if (command.includes("close biogenesis")) {
      setBioGenesisOpen(false);
    } else if (command.includes("open systems")) {
      setSystemsMatrixOpen(true);
    } else if (command.includes("close systems")) {
      setSystemsMatrixOpen(false);
    } else if (command.includes("open omnicore")) {
      setOmniCoreOpen(true);
    } else if (command.includes("close omnicore")) {
      setOmniCoreOpen(false);
    } else if (command.includes("open quantum")) {
      setQuantumOpen(true);
    } else if (command.includes("close quantum")) {
      setQuantumOpen(false);
    }
  };

  const handleZoom = (zoomValue: number) => {
    setZoom(zoomValue);
  };

  return (
    <>
      <ARButton />
      <Canvas>
        <XR store={undefined}>
          <VRComponent />
          <fog attach="fog" args={['#000510', 5, 20]} />
          <Suspense fallback={null}>
            <CognitionSphere position={[0, 0, 0]} />

            {isBioGenesisOpen && <PanelBioGenesis position={[-5, 3, 0]} />}
            {isSystemsMatrixOpen && <PanelSystemsMatrix position={[5, 3, 0]} />}
            {isOmniCoreOpen && <PanelOmniCore position={[-5, -3, 0]} />}
            {isQuantumOpen && <PanelQuantum position={[5, -3, 0]} />}

            <LogoutButton position={[8, -5, 2]} />
            

            <DashboardEffects />
            <MultiUserPaths />
            <CameraControl target={cameraTarget ?? undefined} zoom={zoom} />
          </Suspense>
        </XR>
      </Canvas>
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
        <Link to="/council-review" style={{ color: 'white', textDecoration: 'none', padding: '10px', background: 'rgba(0,0,0,0.5)', borderRadius: '5px' }}>
            Council Review
        </Link>
      </div>
      <VoiceControl onCommand={handleVoiceCommand} />
      <GestureControl onZoom={handleZoom} />
    </>
  );
}

export default DashboardShell;
