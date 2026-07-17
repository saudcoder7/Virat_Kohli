"use client";

import React from "react";
import CountUpNumber from "@/components/ui/CountUpNumber";
import EditorialMoment from "@/components/ui/EditorialMoment";
import PhotoStrip from "@/components/ui/PhotoStrip";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { STATS } from "@/data/kohli-data";

export default function T20IRecords() {
  const t20Stats = STATS.t20i;

  const moments = [
    {
      title: "76 in the 2024 T20 World Cup Final",
      description:
        "A clutch final act. In his last T20I appearance, Kohli anchored India's innings with a brilliant, match-winning 76 off 59 balls vs South Africa, earning Player of the Match honors.",
      mediaType: "placeholder" as const,
    },
    {
      title: "Player of the Tournament, ICC World T20 2016",
      description:
        "Unparalleled dominance in tournament play. Scored 273 runs at a staggering average of 136.50, carrying India single-handedly to the semi-finals.",
      mediaType: "placeholder" as const,
    },
    {
      title: "Maiden T20I Century at the Asia Cup 2022",
      description:
        "Broke a 1,000+ day century drought in style. Kohli scored an unbeaten 122* off just 61 balls against Afghanistan at Dubai, registering his first ever T20I ton.",
      mediaType: "placeholder" as const,
    },
  ];

  return (
    <section
      id="t20i-records"
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
              T20I Records
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl text-sm md:text-base">
              Precision, athleticism, and clutch performances. Kohli retired from
              T20Is at the ultimate peak — lifting the World Cup in 2024 as the
              final&apos;s hero.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 md:mb-28">
          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={t20Stats.matches} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Matches
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={t20Stats.runs} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Runs
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <CountUpNumber value={t20Stats.centuries} />
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-secondary)]">
              Centuries
            </div>
          </StaggerItem>

          <StaggerItem className="bg-white p-6 rounded-xl border border-[var(--color-border)] shadow-[var(--shadow-sm)] text-center">
            <div className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-1">
              <span className="font-bold tracking-tight">
                {t20Stats.average}
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
              { alt: "T20 World Cup 2024 final moment", placeholder: true },
              { alt: "Iconic six vs Pakistan MCG", placeholder: true },
              { alt: "T20 WC 2016 tournament hero", placeholder: true },
              { alt: "First T20I century Dubai", placeholder: true },
              { alt: "Virat Kohli T20 run chase stance", placeholder: true },
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
              const el = document.querySelector("#t20i-records");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase cursor-pointer transition-opacity duration-200 hover:opacity-60"
            style={{
              fontFamily: "var(--font-bebas-neue)",
              letterSpacing: "0.1em",
              color: "var(--color-text-secondary)",
            }}
          >
            <span>Explore T20I Records</span>
            <span className="text-base">↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}
