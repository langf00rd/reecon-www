"use client";

import PixelBlast from "@/components/pixel-blast";

export default function HeroBackground() {
  return (
    <div className="w-screen h-screen fixed top-0 left-0">
      <PixelBlast
        variant="triangle"
        pixelSize={2}
        color="#8a8a8a"
        patternScale={3}
        patternDensity={1}
        enableRipples
        rippleSpeed={0.6}
        rippleThickness={0.1}
        rippleIntensityScale={1}
        speed={10}
        transparent
        edgeFade={0.5}
      />
    </div>
  );
}
