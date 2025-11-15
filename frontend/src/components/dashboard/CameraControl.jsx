import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraControl({ target, zoom }) {
    const { camera } = useThree();

    useFrame((state, delta) => {
        const zoomValue = 5 * zoom;
        if (target) {
            const targetPosition = new THREE.Vector3(...target);
            camera.position.lerp(targetPosition.clone().add(new THREE.Vector3(0, 0, zoomValue)), 0.05);
            camera.lookAt(targetPosition);
        } else {
            const defaultTarget = new THREE.Vector3(0,0,0);
            camera.position.lerp(defaultTarget.clone().add(new THREE.Vector3(0, 0, 15 * zoom)), 0.05);
            camera.lookAt(defaultTarget);
        }
    });

    return null;
}