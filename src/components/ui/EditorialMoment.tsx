"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export type EditorialLayout =
  | "image-left"
  | "image-right"
  | "full-bleed-overlay"
  | "full-bleed-text-below";

const LAYOUT_CYCLE: EditorialLayout[] = [
  "full-bleed-overlay",
  "image-left",
  "image-right",
  "full-bleed-text-below",
];

export interface EditorialMomentProps {
  title: string;
  description: string;
  mediaType: "image" | "youtube" | "placeholder";
  mediaSrc?: string;
  mediaAlt?: string;
  layout?: EditorialLayout;
  index?: number;
}

export default function EditorialMoment({
  title,
  description,
  mediaType,
  mediaSrc,
  mediaAlt = "Record highlight",
  layout,
  index = 0,
}: EditorialMomentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reducedMotion = useReducedMotion();

  const resolvedLayout = layout || LAYOUT_CYCLE[index % LAYOUT_CYCLE.length];

  // Animation ease curve
  const ease = [0.25, 0.46, 0.45, 0.94] as const;

  // Animation variants
  const imageVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 1.08 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 1.2, ease },
        },
      };

  const titleVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, delay: 0.2, ease },
        },
      };

  const descVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: 0.35, ease },
        },
      };

  // ─── Media Renderer ───
  const renderMedia = (aspectClass: string, roundedClass: string = "rounded-lg") => {
    if (mediaType === "placeholder") {
      return (
        <div
          className={`editorial-placeholder ${aspectClass} ${roundedClass} w-full`}
        >
          <span className="text-5xl mb-3 opacity-60">📸</span>
          <span className="text-xs font-mono font-semibold tracking-wider uppercase opacity-80">
            Media Placeholder
          </span>
          <span className="text-[10px] mt-1 opacity-55 max-w-[200px] text-center">
            Set mediaType to &apos;image&apos; or &apos;youtube&apos;
          </span>
        </div>
      );
    }

    if (mediaType === "image" && mediaSrc) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={mediaSrc}
          alt={mediaAlt}
          className={`${aspectClass} ${roundedClass} w-full object-cover`}
          loading="lazy"
        />
      );
    }

    if (mediaType === "youtube" && mediaSrc) {
      return (
        <div className={`relative ${aspectClass} ${roundedClass} w-full overflow-hidden`}>
          <iframe
            src={`https://www.youtube.com/embed/${mediaSrc}`}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    return null;
  };

  // ═══════════════════════════════════════════════════════════
  //  LAYOUT: Full-bleed overlay — image fills block, text on top
  // ═══════════════════════════════════════════════════════════
  if (resolvedLayout === "full-bleed-overlay") {
    return (
      <div ref={ref} className="editorial-moment relative w-full">
        {/* Image container */}
        <motion.div
          className="editorial-moment-image relative w-full rounded-2xl overflow-hidden"
          style={{ minHeight: "60vh" }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={imageVariants}
        >
          {mediaType === "placeholder" ? (
            <div className="editorial-placeholder w-full h-full absolute inset-0 rounded-2xl" style={{ minHeight: "60vh" }}>
              <span className="text-6xl mb-3 opacity-50">📸</span>
              <span className="text-sm font-mono font-semibold tracking-wider uppercase opacity-70">
                Full-Bleed Media Slot
              </span>
              <span className="text-xs mt-2 opacity-50 max-w-[260px] text-center">
                Set mediaType &amp; mediaSrc props
              </span>
            </div>
          ) : mediaType === "image" && mediaSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mediaSrc}
              alt={mediaAlt}
              className="w-full h-full object-cover absolute inset-0"
              style={{ minHeight: "60vh" }}
              loading="lazy"
            />
          ) : mediaType === "youtube" && mediaSrc ? (
            <iframe
              src={`https://www.youtube.com/embed/${mediaSrc}`}
              title={title}
              className="absolute inset-0 w-full h-full border-0"
              style={{ minHeight: "60vh" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : null}

          {/* Gradient scrim */}
          <div className="editorial-scrim rounded-2xl" />

          {/* Overlaid text */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 lg:p-16 z-10">
            <motion.h3
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95]"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                letterSpacing: "0.02em",
              }}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={titleVariants}
            >
              {title}
            </motion.h3>
            <motion.p
              className="mt-4 md:mt-6 text-sm md:text-base text-white/80 max-w-xl leading-relaxed"
              style={{ fontFamily: "var(--font-inter)" }}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={descVariants}
            >
              {description}
            </motion.p>
          </div>
        </motion.div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  //  LAYOUT: Full-bleed text below — large image, text block underneath
  // ═══════════════════════════════════════════════════════════
  if (resolvedLayout === "full-bleed-text-below") {
    return (
      <div ref={ref} className="editorial-moment w-full">
        <motion.div
          className="editorial-moment-image w-full rounded-2xl overflow-hidden"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={imageVariants}
        >
          {renderMedia("aspect-[3/2]", "rounded-2xl")}
        </motion.div>

        <div className="mt-8 md:mt-12 max-w-3xl">
          <motion.h3
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
            style={{
              fontFamily: "var(--font-bebas-neue)",
              letterSpacing: "0.02em",
              color: "var(--color-text-primary)",
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={titleVariants}
          >
            {title}
          </motion.h3>
          <motion.p
            className="mt-4 md:mt-6 text-sm md:text-base leading-relaxed max-w-xl"
            style={{
              fontFamily: "var(--font-inter)",
              color: "var(--color-text-secondary)",
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={descVariants}
          >
            {description}
          </motion.p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════
  //  LAYOUT: Image-left / Image-right — split composition
  // ═══════════════════════════════════════════════════════════
  const isImageLeft = resolvedLayout === "image-left";

  return (
    <div
      ref={ref}
      className={`editorial-moment w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center`}
    >
      {/* Image */}
      <motion.div
        className={`editorial-moment-image md:col-span-7 rounded-2xl overflow-hidden ${
          isImageLeft ? "md:order-1" : "md:order-2"
        }`}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={imageVariants}
      >
        {renderMedia("aspect-[4/5] md:aspect-[3/4]", "rounded-2xl")}
      </motion.div>

      {/* Text */}
      <div
        className={`md:col-span-5 flex flex-col justify-center ${
          isImageLeft ? "md:order-2" : "md:order-1"
        }`}
      >
        <motion.h3
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]"
          style={{
            fontFamily: "var(--font-bebas-neue)",
            letterSpacing: "0.02em",
            color: "var(--color-text-primary)",
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          {title}
        </motion.h3>
        <motion.p
          className="mt-4 md:mt-6 text-sm md:text-base leading-relaxed"
          style={{
            fontFamily: "var(--font-inter)",
            color: "var(--color-text-secondary)",
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={descVariants}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}
