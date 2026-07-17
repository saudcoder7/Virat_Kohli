"use client";

import dynamic from "next/dynamic";
import Header from "@/components/navigation/Header";
import Footer from "@/components/footer/Footer";

// Dynamic imports for heavy or browser-only components
const HeroSection = dynamic(
  () => import("@/components/hero/HeroSection"),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-screen flex items-center justify-center bg-[var(--color-bg-primary)]"
      >
        <div
          className="text-2xl tracking-widest text-[var(--color-text-secondary)] opacity-50"
          style={{
            fontFamily: "var(--font-bebas-neue)",
          }}
        >
          LOADING...
        </div>
      </div>
    ),
  }
);

const IntroHighlights = dynamic(
  () => import("@/components/sections/IntroHighlights"),
  { ssr: false }
);

const TestRecords = dynamic(
  () => import("@/components/sections/TestRecords"),
  { ssr: false }
);

const ODIRecords = dynamic(
  () => import("@/components/sections/ODIRecords"),
  { ssr: false }
);

const T20IRecords = dynamic(
  () => import("@/components/sections/T20IRecords"),
  { ssr: false }
);

const IPLRecords = dynamic(
  () => import("@/components/sections/IPLRecords"),
  { ssr: false }
);

const Gallery = dynamic(
  () => import("@/components/sections/Gallery"),
  { ssr: false }
);

const FanZone = dynamic(
  () => import("@/components/sections/FanZone"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* Light Theme Navigation Header */}
      <Header />

      {/* ───── Section 1: Full-Viewport Hero ───── */}
      <HeroSection />

      {/* ───── Section 2: Intro Highlights (3 Defining Moments) ───── */}
      <IntroHighlights />

      {/* ───── Format-Specific Record Sections ───── */}
      <TestRecords />
      <ODIRecords />
      <T20IRecords />
      <IPLRecords />

      {/* ───── Highlights Gallery ───── */}
      <Gallery />

      {/* ───── Fan Zone ───── */}
      <FanZone />

      {/* ───── Footer ───── */}
      <Footer />
    </main>
  );
}
