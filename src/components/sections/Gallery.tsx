"use client";

import React from "react";
import LazyYouTubeEmbed from "@/components/ui/LazyYouTubeEmbed";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";

interface GalleryVideo {
  title: string;
  subtitle: string;
  videoId: string;
  sizeClass: "gallery-item-lg" | "gallery-item-md" | "gallery-item-sm";
  aspectRatio: string;
}

const GALLERY_VIDEOS: GalleryVideo[] = [
  {
    title: "The King's Masterclass in Pune (254*)",
    subtitle: "Test Highlights vs South Africa",
    videoId: "", // Empty to trigger placeholder
    sizeClass: "gallery-item-lg",
    aspectRatio: "16/9",
  },
  {
    title: "Surpassing Tendulkar (50th Century)",
    subtitle: "Historic World Cup Semi-Final vs NZ",
    videoId: "",
    sizeClass: "gallery-item-md",
    aspectRatio: "9/16", // vertical portrait card vibe
  },
  {
    title: "Maiden T20 Ton vs AFG",
    subtitle: "Asia Cup 2022 Dubai",
    videoId: "",
    sizeClass: "gallery-item-sm",
    aspectRatio: "16/9",
  },
  {
    title: "Australia 2018 series win",
    subtitle: "Historic Captaincy Milestone",
    videoId: "",
    sizeClass: "gallery-item-sm",
    aspectRatio: "16/9",
  },
  {
    title: "973 Runs: The Unrepeatable IPL 2016",
    subtitle: "Incredible season run highlight",
    videoId: "",
    sizeClass: "gallery-item-lg",
    aspectRatio: "16/9",
  },
  {
    title: "76 in T20 WC Final 2024",
    subtitle: "Clutch final knock vs South Africa",
    videoId: "",
    sizeClass: "gallery-item-md",
    aspectRatio: "9/16",
  },
  {
    title: "RCB back-to-back title lift (2025-2026)",
    subtitle: "RCB Championship moments",
    videoId: "",
    sizeClass: "gallery-item-md",
    aspectRatio: "9/16",
  },
  {
    title: "Fastest 14,000 ODI Runs",
    subtitle: "Champions Trophy 2025 masterclass",
    videoId: "",
    sizeClass: "gallery-item-md",
    aspectRatio: "9/16",
  },
];

export default function Gallery() {
  return (
    <section
      id="highlights-gallery"
      className="py-20 md:py-28 bg-[var(--color-bg-primary)] border-t border-[var(--color-border-light)]"
    >
      <div className="section-container">
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-12 md:mb-16">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-accent)] mb-2 block">
              MEDIA HUB
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                letterSpacing: "0.04em",
              }}
            >
              HIGHLIGHTS GALLERY
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-xl text-sm md:text-base">
              Relive the career-defining moments, matches, and tournament triumphs of the run-machine. A premium curation of iconic highlight footage.
            </p>
          </div>
        </ScrollReveal>

        {/* Masonry Layout Grid */}
        <StaggerContainer className="gallery-masonry" staggerDelay={0.05}>
          {GALLERY_VIDEOS.map((video, idx) => (
            <StaggerItem
              key={idx}
              className={`relative group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] flex flex-col justify-end ${video.sizeClass}`}
            >
              {/* YouTube Embed */}
              <LazyYouTubeEmbed
                videoId={video.videoId}
                mode="inline"
                aspectRatio={video.aspectRatio}
                className="absolute inset-0 w-full h-full z-0"
                title={video.title}
              />

              {/* Cover Gradient Overlay for title visibility on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-4 md:p-6 pointer-events-none">
                <span className="text-[9px] font-mono text-[var(--color-accent-light)] uppercase tracking-widest font-semibold mb-1">
                  {video.subtitle}
                </span>
                <h4
                  className="text-white text-base md:text-lg font-bold leading-tight"
                  style={{ fontFamily: "var(--font-bebas-neue)", letterSpacing: "0.02em" }}
                >
                  {video.title}
                </h4>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
