"use client";

import React, { useRef, useState, useEffect, lazy, Suspense, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWebGLSupport } from "@/lib/useWebGLSupport";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useTypewriter } from "@/lib/useTypewriter";
import { STATS } from "@/data/kohli-data";
import CountUpNumber from "@/components/ui/CountUpNumber";
import HeroFallback2D from "./HeroFallback2D";

const HeroCanvas3D = lazy(() => import("./HeroCanvas3D"));

// ── YouTube video ID for 82* vs Pakistan, T20 World Cup 2022, MCG ──
const HERO_VIDEO_ID = "sFqr784rava"; // Replace with actual highlight ID

// ── YouTube embed URL builder ──
function buildHeroEmbedUrl(videoId: string, muted: boolean): string {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${muted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&start=0`;
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const webglSupported = useWebGLSupport();
  const reducedMotion = useReducedMotion();
  const hasTriggeredVideo = useRef(false);

  // Typewriter for "Virat Kohli"
  const { displayed, done } = useTypewriter("Virat Kohli", 120, 600);

  // GSAP ScrollTrigger to drive scroll progress
  useEffect(() => {
    if (reducedMotion) return;

    let trigger: import("gsap/ScrollTrigger").ScrollTrigger | null = null;

    const initGSAP = async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsapModule.gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    };

    initGSAP();

    return () => {
      if (trigger) trigger.kill();
    };
  }, [reducedMotion]);

  // ── Video transition trigger: on first scroll ──
  useEffect(() => {
    if (reducedMotion || hasTriggeredVideo.current) return;

    // Trigger video on first meaningful scroll (> 2% progress)
    if (scrollProgress > 0.02 && done) {
      hasTriggeredVideo.current = true;
      setShowVideo(true);
    }
  }, [scrollProgress, done, reducedMotion]);

  // Mark video as visually ready after a brief delay for the iframe to load
  useEffect(() => {
    if (!showVideo) return;
    const timer = setTimeout(() => setVideoReady(true), 1200);
    return () => clearTimeout(timer);
  }, [showVideo]);

  // Toggle mute
  const handleToggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // Static hero fallback for reduced motion
  if (reducedMotion) {
    return (
      <section
        ref={sectionRef}
        id="hero"
        className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#050b14]"
      >
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-composite.png"
            alt="Virat Kohli"
            className="w-full h-full object-cover object-right opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030914] via-[#030914]/80 to-transparent z-[1]" />

        {/* Left-side stat overlay */}
        <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-6">
          <StatBlock label="INTERNATIONAL CENTURIES" value={STATS.career_totals.international_centuries} />
          <StatBlock label="TEST RUNS" value={STATS.test.runs} />
          <StatBlock label="ODI RUNS" value={STATS.odi.runs} suffix="+" />
        </div>

        {/* Bottom name */}
        <div className="absolute bottom-16 left-6 md:left-12 z-10">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white font-bold select-none leading-none uppercase"
            style={{
              fontFamily: "var(--font-bebas-neue)",
              letterSpacing: "-0.01em",
              textShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            Virat Kohli
          </h1>
          <p className="mt-2 text-xs md:text-sm font-semibold tracking-widest text-white/60 uppercase font-mono">
            Born November 5, 1988 · Delhi, India
          </p>
        </div>
      </section>
    );
  }

  const overlayOpacity = Math.max(0, 1 - scrollProgress * 2.2);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[200vh]"
    >
      {/* Sticky viewport container */}
      <div
        className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#030811]"
      >
        {/* ─── LAYER 1: 3D Canvas / 2D Fallback (photo poster) ─── */}
        <div
          className="absolute inset-0 w-full h-full z-[1] transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: videoReady ? 0 : 1 }}
        >
          {webglSupported ? (
            <Suspense
              fallback={<HeroFallback2D scrollProgress={scrollProgress} />}
            >
              <HeroCanvas3D scrollProgress={scrollProgress} />
            </Suspense>
          ) : (
            <HeroFallback2D scrollProgress={scrollProgress} />
          )}
        </div>

        {/* ─── LAYER 2: YouTube video embed (crossfades in) ─── */}
        {showVideo && (
          <div
            className="absolute inset-0 w-full h-full z-[2] transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: videoReady ? 1 : 0 }}
          >
            <div className="hero-video-container">
              <iframe
                key={`hero-yt-${isMuted}`}
                src={buildHeroEmbedUrl(HERO_VIDEO_ID, isMuted)}
                title="Virat Kohli 82* vs Pakistan — T20 World Cup 2022, MCG"
                allow="autoplay; encrypted-media"
                tabIndex={-1}
                aria-hidden="true"
                className="hero-video-iframe"
              />
            </div>

            {/* Dark gradient overlay for legibility over video */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#030914]/90 via-[#030914]/50 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030914]/70 via-transparent to-[#030914]/40 pointer-events-none" />
          </div>
        )}

        {/* ─── LEGIBILITY GRADIENT OVERLAYS ─── */}
        {/* Left side deep shading for stat stack and giant name */}
        <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#030914] via-[#030914]/85 to-transparent z-10 pointer-events-none" />
        {/* Bottom transition to light theme page background */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#fafafa] via-[#030914]/30 to-transparent z-10 pointer-events-none" />
        {/* Top bar shadow for nav legibility */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#030914]/80 to-transparent z-10 pointer-events-none" />

        {/* ─── UNMUTE / VIDEO INDICATOR (accessible) ─── */}
        <AnimatePresence>
          {showVideo && videoReady && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              onClick={handleToggleMute}
              className="hero-unmute-btn"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              title={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
              <span className="text-[10px] font-mono tracking-wider uppercase ml-1.5">
                {isMuted ? "UNMUTE" : "MUTED"}
              </span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* ─── OVERLAY CONTENT LAYER ─── */}
        <div
          className="absolute inset-0 w-full h-full z-20 pointer-events-none"
          style={{ opacity: overlayOpacity }}
        >
          <div className="w-full h-full max-w-[var(--content-max-width)] mx-auto px-6 md:px-12 py-24 flex flex-col justify-between">
            {/* Top spacer (to let header shine) */}
            <div className="h-10" />

            {/* Middle Row: Left Stats & Right Snapshot */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12 w-full mt-auto mb-6">

              {/* Left-side Vertical Stat Stack with CountUp */}
              <div className="flex flex-col gap-6 md:gap-8 justify-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={done ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col"
                >
                  <span
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none"
                    style={{ fontFamily: "var(--font-bebas-neue)" }}
                  >
                    <CountUpNumber value={STATS.career_totals.international_centuries} duration={2} />
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold tracking-wider text-white/50 font-mono mt-1">
                    INTERNATIONAL CENTURIES
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={done ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="flex flex-col"
                >
                  <span
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none"
                    style={{ fontFamily: "var(--font-bebas-neue)" }}
                  >
                    <CountUpNumber value={STATS.test.runs} duration={2.2} />
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold tracking-wider text-white/50 font-mono mt-1">
                    TEST RUNS
                  </span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={done ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col"
                >
                  <span
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none"
                    style={{ fontFamily: "var(--font-bebas-neue)" }}
                  >
                    <CountUpNumber value={STATS.odi.runs} duration={2.5} suffix="+" />
                  </span>
                  <span className="text-[10px] md:text-xs font-semibold tracking-wider text-white/50 font-mono mt-1">
                    ODI RUNS
                  </span>
                </motion.div>
              </div>

              {/* Right-side Floating "Career Snapshot" Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={done ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="w-full max-w-sm bg-[#0d1424]/80 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-md pointer-events-auto shadow-2xl self-end"
              >
                <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h3
                    className="text-sm font-bold tracking-widest text-white/80"
                    style={{ fontFamily: "var(--font-bebas-neue)" }}
                  >
                    CAREER SNAPSHOT
                  </h3>
                </div>

                {/* Snapshot grid rows */}
                <div className="flex flex-col gap-3 font-mono text-[11px] md:text-xs">
                  {/* TEST ROW */}
                  <div className="flex justify-between items-center py-1 hover:bg-white/5 px-2 rounded-lg transition-colors group">
                    <span className="font-bold text-white group-hover:text-amber-400 transition-colors">TEST</span>
                    <div className="text-white/60 flex gap-3">
                      <span>{STATS.test.matches} Matches</span>
                      <span className="text-white font-medium">{STATS.test.runs.toLocaleString()} Runs</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/50">RET</span>
                  </div>
                  {/* ODI ROW */}
                  <div className="flex justify-between items-center py-1 hover:bg-white/5 px-2 rounded-lg transition-colors group">
                    <span className="font-bold text-white group-hover:text-amber-400 transition-colors">ODI</span>
                    <div className="text-white/60 flex gap-3">
                      <span>{STATS.odi.matches} Matches</span>
                      <span className="text-white font-medium">{STATS.odi.runs.toLocaleString()} Runs</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">ACT</span>
                  </div>
                  {/* T20 ROW */}
                  <div className="flex justify-between items-center py-1 hover:bg-white/5 px-2 rounded-lg transition-colors group">
                    <span className="font-bold text-white group-hover:text-amber-400 transition-colors">T20I</span>
                    <div className="text-white/60 flex gap-3">
                      <span>{STATS.t20i.matches} Matches</span>
                      <span className="text-white font-medium">{STATS.t20i.runs.toLocaleString()} Runs</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/50">RET</span>
                  </div>
                  {/* IPL ROW */}
                  <div className="flex justify-between items-center py-1 hover:bg-white/5 px-2 rounded-lg transition-colors group">
                    <span className="font-bold text-white group-hover:text-amber-400 transition-colors">IPL</span>
                    <div className="text-white/60 flex gap-3">
                      <span>{STATS.ipl.matches} Matches</span>
                      <span className="text-white font-medium">{STATS.ipl.runs.toLocaleString()} Runs</span>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">ACT</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Row: Giant "VIRAT KOHLI" Name Typography */}
            <div className="flex flex-col w-full text-left mt-auto">
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white font-bold select-none leading-none -ml-1 uppercase"
                style={{
                  fontFamily: "var(--font-bebas-neue)",
                  letterSpacing: "-0.01em",
                  textShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
                }}
              >
                {displayed}
                {!done && <span className="typewriter-cursor" style={{ backgroundColor: "#ffffff" }} />}
              </h1>

              {/* Birthdate label — fades in after typing is done */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={done ? { opacity: 0.6, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="mt-2 text-xs md:text-sm font-semibold tracking-widest text-white/80 uppercase font-mono"
                style={{ textShadow: "0 2px 10px rgba(0, 0, 0, 0.4)" }}
              >
                Born November 5, 1988 · Delhi, India
              </motion.p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: done ? 0.4 : 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ opacity: Math.max(0, (done ? 0.4 : 0) - scrollProgress * 2) }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-widest uppercase text-white/40 font-mono">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center">
              <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-white/60 animate-bounce" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Static stat block (for reduced-motion fallback) ─── */
function StatBlock({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="flex flex-col">
      <span
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none"
        style={{ fontFamily: "var(--font-bebas-neue)" }}
      >
        {value.toLocaleString()}{suffix}
      </span>
      <span className="text-[10px] md:text-xs font-semibold tracking-wider text-white/50 font-mono mt-1">
        {label}
      </span>
    </div>
  );
}
