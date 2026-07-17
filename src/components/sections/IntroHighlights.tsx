"use client";

import React from "react";
import EditorialMoment from "@/components/ui/EditorialMoment";
import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * IntroHighlights — Punchy "highlight reel" intro section.
 * 3 of Kohli's most iconic moments, presented using the editorial
 * moment-block format. Replaces the exhaustive milestone timeline.
 */

const INTRO_MOMENTS = [
  {
    title: "2011 WORLD CUP CHAMPION",
    description:
      "A 22-year-old Virat Kohli helped carry Sachin Tendulkar on his shoulders as India lifted the ODI World Cup at the Wankhede Stadium — a moment that changed Indian cricket forever. The boy from Delhi was just getting started.",
    mediaType: "placeholder" as const,
    mediaAlt: "Young Virat Kohli celebrating India's 2011 World Cup win at the Wankhede Stadium",
    layout: "full-bleed-overlay" as const,
  },
  {
    title: "50TH ODI CENTURY",
    description:
      "November 15, 2023 — 2023 World Cup semi-final against New Zealand in Mumbai. Kohli reached his 50th ODI century, surpassing Sachin Tendulkar's all-time record of 49. A packed Wankhede witnessed history.",
    mediaType: "placeholder" as const,
    mediaAlt: "Virat Kohli celebrates his 50th ODI century against New Zealand in the 2023 World Cup semi-final",
    layout: "image-right" as const,
  },
  {
    title: "254* — THE MASTERCLASS",
    description:
      "October 2019, Pune. Against South Africa, Kohli played the longest innings of his life — an unbeaten 254 off 336 balls with 33 fours and 2 sixes. His career-best Test score and a monument to patience, will, and sheer class.",
    mediaType: "placeholder" as const,
    mediaAlt: "Virat Kohli celebrates his career-best 254* against South Africa in Pune",
    layout: "image-left" as const,
  },
];

export default function IntroHighlights() {
  return (
    <section
      id="intro-highlights"
      className="py-20 md:py-28 bg-[var(--color-bg-primary)]"
    >
      <div className="section-container">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 md:mb-24 max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-accent)] mb-2 block">
              The Defining Moments
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                letterSpacing: "0.04em",
              }}
            >
              Three Innings That Changed Everything
            </h2>
            <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed">
              Before the records, the centuries, and the debates about greatness — there
              were moments that defined the man. These are the innings etched into
              cricket&apos;s memory.
            </p>
          </div>
        </ScrollReveal>

        {/* Editorial Moment Blocks */}
        <div className="space-y-24 md:space-y-32">
          {INTRO_MOMENTS.map((moment, index) => (
            <EditorialMoment
              key={index}
              title={moment.title}
              description={moment.description}
              mediaType={moment.mediaType}
              mediaAlt={moment.mediaAlt}
              layout={moment.layout}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
