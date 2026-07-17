"use client";

import React from "react";

interface HeroFallback2DProps {
  scrollProgress: number;
}

/**
 * Full-bleed 2D parallax fallback for the hero when WebGL is unavailable.
 * Image fills the entire viewport with a subtle scroll-driven parallax.
 */
export default function HeroFallback2D({
  scrollProgress,
}: HeroFallback2DProps) {
  const scale = 1.05 + scrollProgress * 0.04;
  const translateY = scrollProgress * -20;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Full-viewport blurred/darkened backdrop layer */}
      <div className="absolute inset-0 w-full h-full select-none pointer-events-none z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-composite.png"
          alt=""
          className="w-full h-full object-cover scale-150 blur-3xl brightness-[0.25] opacity-90"
        />
      </div>

      {/* Foreground sharp image — fills viewport, weighted right */}
      <div
        className="absolute inset-0 w-full h-full z-10"
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
          transition: "transform 0.15s ease-out",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-composite.png"
          alt="Virat Kohli composite portrait and celebration pose"
          className="w-full h-full object-cover select-none"
          style={{
            objectPosition: "75% center",
          }}
        />
      </div>

      {/* Soft vignette overlay for content readability */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
