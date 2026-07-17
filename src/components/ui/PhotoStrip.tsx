"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface PhotoStripItem {
  src?: string;
  alt: string;
  placeholder?: boolean;
}

interface PhotoStripProps {
  photos: PhotoStripItem[];
  className?: string;
}

export default function PhotoStrip({ photos, className = "" }: PhotoStripProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`photo-strip ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {photos.map((photo, index) => (
        <motion.div
          key={index}
          className="photo-strip-thumb"
          variants={{
            hidden: { opacity: 0, scale: 0.92, y: 15 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              },
            },
          }}
          style={{
            width: "clamp(180px, 22vw, 260px)",
          }}
        >
          {photo.placeholder || !photo.src ? (
            <div
              className="w-full bg-[var(--color-bg-secondary)] border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center text-[var(--color-text-muted)] rounded-xl"
              style={{ aspectRatio: "3/2" }}
            >
              <span className="text-2xl mb-1 opacity-50">📸</span>
              <span className="text-[9px] font-mono font-semibold tracking-wider uppercase opacity-70 px-2 text-center leading-snug">
                {photo.alt}
              </span>
            </div>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full object-cover rounded-xl"
              style={{ aspectRatio: "3/2" }}
              loading="lazy"
            />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
