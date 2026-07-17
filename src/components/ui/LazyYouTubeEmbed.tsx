"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

// ── Global autoplay manager ──
// Caps simultaneous autoplaying embeds to prevent mobile perf issues.
const MAX_CONCURRENT = 2;
const activeEmbeds = new Set<string>();
const listeners = new Map<string, () => void>();

function registerEmbed(id: string, onStateChange: () => void): boolean {
  listeners.set(id, onStateChange);
  if (activeEmbeds.size < MAX_CONCURRENT) {
    activeEmbeds.add(id);
    return true;
  }
  return false;
}

function unregisterEmbed(id: string) {
  activeEmbeds.delete(id);
  listeners.delete(id);
  // Notify waiting embeds that a slot opened
  for (const [waitingId, cb] of listeners) {
    if (!activeEmbeds.has(waitingId) && activeEmbeds.size < MAX_CONCURRENT) {
      activeEmbeds.add(waitingId);
      cb();
    }
  }
}

function deactivateEmbed(id: string) {
  activeEmbeds.delete(id);
  // Notify waiting embeds that a slot opened
  for (const [waitingId, cb] of listeners) {
    if (!activeEmbeds.has(waitingId) && activeEmbeds.size < MAX_CONCURRENT) {
      activeEmbeds.add(waitingId);
      cb();
    }
  }
}

// ── YouTube embed URL builder ──
function buildEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
}

// ── Component ──
export interface LazyYouTubeEmbedProps {
  videoId: string;
  mode?: "background" | "inline";
  className?: string;
  opacity?: number;
  aspectRatio?: string;
  title?: string;
}

export default function LazyYouTubeEmbed({
  videoId,
  mode = "inline",
  className = "",
  opacity = 1,
  aspectRatio = "16/9",
  title = "Video embed",
}: LazyYouTubeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const embedId = useRef(`yt-${videoId}-${Math.random().toString(36).slice(2, 8)}`);

  const handleStateChange = useCallback(() => {
    setIsActive(true);
  }, []);

  // Intersection observer for lazy loading + visibility tracking
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !videoId) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          // Try to claim an autoplay slot
          const got = registerEmbed(embedId.current, handleStateChange);
          if (got) setIsActive(true);
        } else {
          // Scrolled out of view — release slot
          if (isActive) {
            deactivateEmbed(embedId.current);
            setIsActive(false);
          }
        }
      },
      {
        rootMargin: "300px 0px",
        threshold: 0,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      unregisterEmbed(embedId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, handleStateChange]);

  // ── Placeholder state (no videoId) ──
  if (!videoId) {
    if (mode === "background") {
      return (
        <div
          ref={containerRef}
          className={`yt-bg-container ${className}`}
          style={{ opacity }}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="text-center text-white/40">
              <span className="text-3xl block mb-2">🎬</span>
              <span className="text-[10px] font-mono tracking-wider uppercase">
                Video BG Slot
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-xl bg-[var(--color-bg-secondary)] border-2 border-dashed border-[var(--color-border)] ${className}`}
        style={{ aspectRatio }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-text-muted)]">
          <span className="text-3xl mb-2">🎬</span>
          <span className="text-[10px] font-mono font-semibold tracking-wider uppercase opacity-80">
            Video Placeholder
          </span>
          <span className="text-[9px] mt-1 opacity-50">
            Set videoId prop to embed
          </span>
        </div>
      </div>
    );
  }

  // ── Background mode ──
  if (mode === "background") {
    return (
      <div
        ref={containerRef}
        className={`yt-bg-container ${className}`}
        style={{ opacity }}
      >
        {isNearViewport && isActive && (
          <iframe
            src={buildEmbedUrl(videoId)}
            title={title}
            allow="autoplay; encrypted-media"
            tabIndex={-1}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }

  // ── Inline mode ──
  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ aspectRatio }}
    >
      {isNearViewport && isActive ? (
        <iframe
          src={buildEmbedUrl(videoId)}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="autoplay; encrypted-media"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
