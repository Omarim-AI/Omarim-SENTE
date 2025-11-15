import React from 'react';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';

// This component wraps the scene and provides VR capabilities.
export default function VRComponent({ children }) {
    return (
        <>
            <VRButton />
            <XR>
                <Controllers />
                <Hands />
                {children}
            </XR>
        </>
    );
}