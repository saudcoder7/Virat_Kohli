"use client";

import React from "react";

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative py-12 border-t"
      style={{
        background: "var(--color-bg-primary)",
        borderColor: "rgba(255, 255, 255, 0.05)",
      }}
    >
      <div className="section-container">
        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto text-center">
          <p
            className="text-xs leading-relaxed mb-6"
            style={{ color: "var(--color-text-muted)" }}
          >
            Unofficial fan tribute site. Not affiliated with or endorsed by
            Virat Kohli, BCCI, or any team. Images used are placeholders /
            properly licensed / credited to source.
          </p>

          {/* Divider */}
          <div
            className="w-16 h-[1px] mx-auto mb-6"
            style={{ background: "var(--color-accent-gold-dim)" }}
          />

          {/* Credits */}
          <div
            className="flex items-center justify-center gap-2 text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            <span>Built with</span>
            <span style={{ color: "var(--color-accent-gold)", opacity: 0.7 }}>
              ♥
            </span>
            <span>by fans, for fans</span>
          </div>

          <div
            className="mt-4 text-xs"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              color: "var(--color-text-muted)",
              opacity: 0.4,
            }}
          >
            Stats sourced from ESPNcricinfo &amp; IPL official site
          </div>
        </div>
      </div>
    </footer>
  );
}
