"use client";

import React from "react";
import PhotoStrip from "@/components/ui/PhotoStrip";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function FanZone() {
  return (
    <section
      id="fan-zone"
      className="py-20 md:py-28 bg-[#0a0e18] text-white overflow-hidden"
    >
      <div className="section-container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-accent-light)] mb-2 block">
              FAN ZONE
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                letterSpacing: "0.04em",
              }}
            >
              THE FAITHFUL
            </h2>
            <p className="text-white/60 max-w-xl text-sm md:text-base">
              A tribute to the billions of fans who have walked this journey with him. The stadium banners, the electric atmospheres, the shared roars, and the absolute loyalty.
            </p>
          </div>
        </ScrollReveal>

        {/* Closing Photo Strip */}
        <div className="-mx-6">
          <PhotoStrip
            photos={[
              { alt: "Chinnaswamy RCB stand wave", placeholder: true },
              { alt: "Wankhede World Cup flags", placeholder: true },
              { alt: "Boy from Delhi fan placard", placeholder: true },
              { alt: "Virat Kohli signature sign off", placeholder: true },
              { alt: "Fans wearing jersey number 18", placeholder: true },
              { alt: "MCG stadium lights & flags", placeholder: true },
              { alt: "Galle Sri Lanka traveling fans", placeholder: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
