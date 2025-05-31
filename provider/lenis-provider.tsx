"use client"; // Mark as client component

import { ReactLenis } from "lenis/react";
import { FC, ReactNode, useRef } from "react";

interface LenisScrollProviderProps {
  children: ReactNode;
}

const LenisScrollProvider: FC<LenisScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<any>(null);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1, // Smoothness factor (0 to 1, lower is smoother)
        duration: 1.5, // Duration of scroll animation
        smoothWheel: true, // Enable smooth scrolling for mouse wheel
        touchMultiplier: 2, // Multiplier for touch scrolling speed
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisScrollProvider;
