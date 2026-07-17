"use client";

import React from "react";
import CountUpNumber from "@/components/ui/CountUpNumber";
import EditorialMoment from "@/components/ui/EditorialMoment";
import PhotoStrip from "@/components/ui/PhotoStrip";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { STATS } from "@/data/kohli-data";

export default function TestRecords() {
  const testStats = STATS.test;

  const moments = [
    {
      title: "254* vs South Africa, Pune",
      description:
        "His career-best Test score. Scoring a masterful 254* with 33 fours and 2 sixes, leading India to a dominant victory in Pune in 2019.",
      mediaType: "placeholder" as const,
    },
    {
      title: "30 Test Centuries",
      description:
        "An elite milestone placing him among the absolute legends of Test cricket, proving his prowess in the longest and most challenging format.",
      mediaType: "placeholder" as const,
    },
    {
      title: "First Indian No.1 in All Three Formats",
      description:
        "Reached the pinnacle of the ICC rankings across Tests, ODIs, and T20Is simultaneously in 2018, demonstrating unmatched adaptability.",
      mediaType: "placeholder" as const,
    },
    {
      title: "Historic Series Win in Australia (2018-19)",
      description:
        "Captained India to their first-ever Test series victory on Australian soil, cementing a historic milestone for Indian cricket leadership.",
      mediaType: "placeholder" as const,
    },
  ];

  return (
    <section
      id="test-records"
      className="py-20 md:py-28 bg-[var(--color-bg-primary)]"
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
              Test Records
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl text-sm md:text-base">
              A masterclass in endurance, technical precision, and captaincy.
              Virat Kohli redefined India&apos;s Test cricket mentality, driving them
              to become a force home and away.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 md:mb-28">
          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={testStats.matches} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Matches
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={testStats.runs} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Runs
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={testStats.centuries} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Centuries
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={testStats.double_centuries || 0} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Double 100s
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Photo Strip — visual index before editorial moments */}
        <div className="mb-20 md:mb-28 -mx-6">
          <PhotoStrip
            photos={[
              { alt: "Kohli batting in whites", placeholder: true },
              { alt: "Adelaide celebration", placeholder: true },
              { alt: "Cover drive in Tests", placeholder: true },
              { alt: "Australia series win 2018", placeholder: true },
              { alt: "254* innings Pune", placeholder: true },
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
              const el = document.querySelector("#test-records");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase cursor-pointer transition-opacity duration-200 hover:opacity-60"
            style={{
              fontFamily: "var(--font-bebas-neue)",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
            }}
          >
            <span>Explore Test Records</span>
            <span className="text-base">↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}
