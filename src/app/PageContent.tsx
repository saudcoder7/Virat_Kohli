"use client";

import dynamic from "next/dynamic";
import SectionErrorBoundary from "@/components/ui/SectionErrorBoundary";

// ── Loading skeletons — shown while each JS chunk downloads ──────────────────

function HeroSkeleton() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#030811]">
      <div
        className="text-3xl tracking-widest text-white opacity-20"
        style={{ fontFamily: "var(--font-bebas-neue)" }}
      >
        KING KOHLI
      </div>
    </div>
  );
}

function SectionSkeleton({ label }: { label: string }) {
  return (
    <div className="w-full py-24 flex items-center justify-center bg-[var(--color-bg-primary)]">
      <div
        className="text-sm tracking-widest opacity-20"
        style={{
          fontFamily: "var(--font-bebas-neue)",
          color: "var(--color-text-secondary)",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ── ssr:false dynamic imports — MUST live in a Client Component ───────────────
// Isolates all browser-only code (Three.js, GSAP, YouTube embeds) from SSR.
// Each section fails independently via SectionErrorBoundary.

const HeroSection = dynamic(
  () => import("@/components/hero/HeroSection"),
  { ssr: false, loading: () => <HeroSkeleton /> }
);

const IntroHighlights = dynamic(
  () => import("@/components/sections/IntroHighlights"),
  { ssr: false, loading: () => <SectionSkeleton label="DEFINING MOMENTS" /> }
);

const TestRecords = dynamic(
  () => import("@/components/sections/TestRecords"),
  { ssr: false, loading: () => <SectionSkeleton label="TEST RECORDS" /> }
);

const ODIRecords = dynamic(
  () => import("@/components/sections/ODIRecords"),
  { ssr: false, loading: () => <SectionSkeleton label="ODI RECORDS" /> }
);

const T20IRecords = dynamic(
  () => import("@/components/sections/T20IRecords"),
  { ssr: false, loading: () => <SectionSkeleton label="T20I RECORDS" /> }
);

const IPLRecords = dynamic(
  () => import("@/components/sections/IPLRecords"),
  { ssr: false, loading: () => <SectionSkeleton label="IPL RECORDS" /> }
);

const Gallery = dynamic(
  () => import("@/components/sections/Gallery"),
  { ssr: false, loading: () => <SectionSkeleton label="GALLERY" /> }
);

const FanZone = dynamic(
  () => import("@/components/sections/FanZone"),
  { ssr: false, loading: () => <SectionSkeleton label="FAN ZONE" /> }
);

// ── PageContent — each section independently error-bounded ───────────────────

export default function PageContent() {
  return (
    <>
      <SectionErrorBoundary sectionName="Hero" fallback={<HeroSkeleton />}>
        <HeroSection />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Intro Highlights">
        <IntroHighlights />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Test Records">
        <TestRecords />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="ODI Records">
        <ODIRecords />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="T20I Records">
        <T20IRecords />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="IPL Records">
        <IPLRecords />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Gallery">
        <Gallery />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="Fan Zone">
        <FanZone />
      </SectionErrorBoundary>
    </>
  );
}
