import { useGesture } from '@use-gesture/react';

export default function GestureControl({ onZoom }) {
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