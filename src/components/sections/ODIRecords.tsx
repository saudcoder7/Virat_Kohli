"use client";

import React from "react";
import CountUpNumber from "@/components/ui/CountUpNumber";
import EditorialMoment from "@/components/ui/EditorialMoment";
import PhotoStrip from "@/components/ui/PhotoStrip";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { STATS } from "@/data/kohli-data";

export default function ODIRecords() {
  const odiStats = STATS.odi;

  const moments = [
    {
      title: "50th ODI Century, 2023 World Cup Semi-Final",
      description:
        "A monumental achievement. Kohli scored his historic 50th One Day International century in the semi-final vs New Zealand, surpassing Sachin Tendulkar's legendary record.",
      mediaType: "placeholder" as const,
    },
    {
      title: "Fastest to 14,000 ODI Runs",
      description:
        "Accelerated past the 14,000-run milestone during the 2025 ICC Champions Trophy, cementing his legacy as the most efficient run-machine in ODI history.",
      mediaType: "placeholder" as const,
    },
    {
      title: "765 Runs in 2023 World Cup",
      description:
        "A single-edition World Cup record, securing him the Player of the Tournament award on home soil after consistent, legendary batting displays.",
      mediaType: "placeholder" as const,
    },
    {
      title: "First Player to Score 50 ODI Centuries",
      description:
        "Surpassed the ultimate milestone of 49 centuries, becoming the sole holder of the most centuries in the ODI format of the game.",
      mediaType: "placeholder" as const,
    },
  ];

  return (
    <section
      id="odi-records"
      className="py-20 md:py-28 bg-[var(--color-bg-secondary)]"
    >
      <div className="section-container">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-accent)] mb-2 block">
              Format Spotlight
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                letterSpacing: "0.04em",
              }}
            >
              ODI Records
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl text-sm md:text-base">
              The undisputed king of run chases. In One Day Internationals,
              Kohli&apos;s consistency, pacing, and sheer hunger for centuries have
              rewritten the history books.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 md:mb-28">
          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={odiStats.matches} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Matches
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={odiStats.runs} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Runs
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={odiStats.centuries} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Centuries
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <span className="font-bold tracking-tight">
                {odiStats.average}
              </span>
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Average
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Photo Strip — visual index before editorial moments */}
        <div className="mb-20 md:mb-28 -mx-6">
          <PhotoStrip
            photos={[
              { alt: "50th ODI century celebration", placeholder: true },
              { alt: "World Cup 2023 batting", placeholder: true },
              { alt: "Chase master innings", placeholder: true },
              { alt: "Kohli ODI cover drive", placeholder: true },
              { alt: "Champions Trophy 2025", placeholder: true },
            ]}
          />
        </div>

        {/* Editorial Moment Blocks */}
        <div className="space-y-24 md:space-y-32">
          {moments.map((moment, index) => (
            <EditorialMoment
              key={index}
              title={moment.title}
              description={moment.description}
              mediaType={moment.mediaType}
              index={index}
            />
          ))}
        </div>

        {/* Section anchor link */}
        <div className="mt-20 md:mt-28 text-center">
          <button
            onClick={() => {
              const el = document.querySelector("#odi-records");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase cursor-pointer transition-opacity duration-200 hover:opacity-60"
            style={{
              fontFamily: "var(--font-bebas-neue)",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
            }}
          >
            <span>Explore ODI Records</span>
            <span className="text-base">↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}
