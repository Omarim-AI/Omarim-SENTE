import { useGesture } from '@use-gesture/react';
import React from 'react';

interface GestureControlProps {
  onZoom: (zoom: number) => void;
}

const GestureControl: React.FC<GestureControlProps> = ({ onZoom }) => {
  useGesture({
    onPinch: ({ offset: [d] }) => {
      onZoom(d / 100);
    }
  }, {
    target: window,
    eventOptions: { passive: false }
  });

  return null;
}

export default GestureControl;
