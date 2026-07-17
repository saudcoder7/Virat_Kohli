"use client";

import React from "react";
import CountUpNumber from "@/components/ui/CountUpNumber";
import EditorialMoment from "@/components/ui/EditorialMoment";
import PhotoStrip from "@/components/ui/PhotoStrip";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { STATS } from "@/data/kohli-data";

export default function IPLRecords() {
  const iplStats = STATS.ipl;

  const moments = [
    {
      title: "973 Runs in IPL 2016 (All-Time Record)",
      description:
        "A legendary individual campaign. Scoring 4 centuries in a single season, leading RCB to the final and setting an untouchable standard for run scoring.",
      mediaType: "placeholder" as const,
    },
    {
      title: "All-Time Leading IPL Run-Scorer",
      description:
        "Leading the historic overall run charts in the tournament's history with consistency across more than a decade for a single franchise.",
      mediaType: "placeholder" as const,
    },
    {
      title: "Back-to-Back IPL Titles (2025, 2026)",
      description:
        "RCB made history by clinching back-to-back titles under Patidar's captaincy, breaking a long-standing drought on his 18th and 19th seasons.",
      mediaType: "placeholder" as const,
    },
    {
      title: "75* off 42 balls in the 2026 Final",
      description:
        "Player of the Match in the final vs Gujarat Titans, scoring his fastest IPL fifty to guide RCB to their historic title defense.",
      mediaType: "placeholder" as const,
    },
    {
      title: "One Franchise Across All Seasons",
      description:
        "A symbol of loyalty. Kohli is the only player to have played for a single franchise — Royal Challengers Bengaluru — across all seasons since 2008.",
      mediaType: "placeholder" as const,
    },
  ];

  return (
    <section
      id="ipl-records"
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
              IPL Records
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl text-sm md:text-base">
              The heartbeat of RCB. Kohli&apos;s journey in the Indian Premier League
              represents absolute dedication, culminating in back-to-back
              championship glory in 2025 and 2026.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 md:mb-28">
          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={iplStats.matches} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Matches
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={iplStats.runs} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Runs
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={iplStats.centuries} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Centuries
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={iplStats.titles_won?.length || 0} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              IPL Titles
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Photo Strip — visual index before editorial moments */}
        <div className="mb-20 md:mb-28 -mx-6">
          <PhotoStrip
            photos={[
              { alt: "RCB back-to-back champions trophy lift", placeholder: true },
              { alt: "973 runs season Kohli in orange cap", placeholder: true },
              { alt: "Fastest IPL fifty final vs GT", placeholder: true },
              { alt: "Virat Kohli passionate RCB shout", placeholder: true },
              { alt: "Chinnaswamy stadium crowd roar", placeholder: true },
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
              const el = document.querySelector("#ipl-records");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase cursor-pointer transition-opacity duration-200 hover:opacity-60"
            style={{
              fontFamily: "var(--font-bebas-neue)",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
            }}
          >
            <span>Explore IPL Records</span>
            <span className="text-base">↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}
