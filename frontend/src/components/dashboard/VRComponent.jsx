import React from 'react';
import { VRButton, XR } from '@react-three/xr';

// This component wraps the scene and provides VR capabilities.
export default function VRComponent({ children }) {
    return (
        <>
            <VRButton />
            <XR>
                {children}
            </XR>
        </>
    );
}