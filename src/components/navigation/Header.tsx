"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormatTab } from "@/context/FormatTabContext";
import { FORMAT_LABELS, type FormatTab } from "@/data/kohli-data";

const NAV_LINKS: { tab: FormatTab; href: string }[] = [
  { tab: "test", href: "#test-records" },
  { tab: "odi", href: "#odi-records" },
  { tab: "t20i", href: "#t20i-records" },
  { tab: "ipl", href: "#ipl-records" },
];

export default function Header() {
  const { activeTab, setActiveTab } = useFormatTab();
  const [scrollRatio, setScrollRatio] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isClickScrolling = useRef(false);
  const clickScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const ratio = Math.min(window.scrollY / (heroHeight - 80), 1);
      setScrollRatio(ratio);

      // Drive the specular sheen position via CSS custom property
      if (navRef.current) {
        const sheenX = 120 - ratio * 80; // moves from 120% to 40% as you scroll
        navRef.current.style.setProperty("--glass-sheen-x", `${sheenX}%`);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Scroll spy: highlight tab corresponding to section in view
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isClickScrolling.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const match = NAV_LINKS.find((link) => link.href === `#${id}`);
          if (match) {
            setActiveTab(match.tab);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_LINKS.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      if (clickScrollTimeout.current) {
        clearTimeout(clickScrollTimeout.current);
      }
    };
  }, [setActiveTab]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (tab: FormatTab, href: string) => {
    isClickScrolling.current = true;
    setActiveTab(tab);
    setIsMobileMenuOpen(false);

    if (clickScrollTimeout.current) {
      clearTimeout(clickScrollTimeout.current);
    }

    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    clickScrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  // ── Dynamic color interpolation ──
  // Over hero: white text. Scrolled: dark text.
  const r = Math.round(255 - scrollRatio * (255 - 26));
  const textColor = `rgb(${r}, ${r}, ${r})`;
  const dotColor =
    scrollRatio > 0
      ? `rgba(107, 114, 128, ${scrollRatio})`
      : "rgba(255, 255, 255, 0.3)";

  // ── Glass material interpolation ──
  const bgWhiteAlpha = 0.1 + scrollRatio * 0.6; // 0.1 → 0.7
  const borderWhiteAlpha = 0.2 + scrollRatio * 0.1; // 0.2 → 0.3
  const blurPx = 20; // constant strong blur
  const saturateVal = 1.8;

  return (
    <>
      <header
        ref={navRef}
        id="main-nav"
        className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-4xl rounded-full glass-nav"
        style={{
          background: `rgba(255, 255, 255, ${bgWhiteAlpha})`,
          backdropFilter: `blur(${blurPx}px) saturate(${saturateVal})`,
          WebkitBackdropFilter: `blur(${blurPx}px) saturate(${saturateVal})`,
          border: `1px solid rgba(255, 255, 255, ${borderWhiteAlpha})`,
          boxShadow: `inset 0 1px 0 rgba(255, 255, 255, ${0.4 - scrollRatio * 0.15}), 0 4px 24px rgba(0, 0, 0, ${0.04 + scrollRatio * 0.06})`,
          transition: "background 0.35s ease, border 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <div className="px-5 md:px-6 flex items-center justify-between h-14">
          {/* VK Monogram Wordmark */}
          <a
            href="#hero"
            className="flex items-center relative z-10"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span
              className="font-bold tracking-tighter"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                fontSize: "1.75rem",
                color: textColor,
                letterSpacing: "-0.04em",
              }}
            >
              VK
            </span>
          </a>

          {/* Desktop nav links */}
          <nav
            className="hidden md:flex items-center gap-1 relative z-10"
            aria-label="Format navigation"
          >
            {NAV_LINKS.map((link, i) => (
              <React.Fragment key={link.tab}>
                {i > 0 && (
                  <span
                    className="mx-3 text-[10px] select-none font-bold"
                    style={{ color: dotColor }}
                    aria-hidden
                  >
                    ·
                  </span>
                )}
                <motion.button
                  onClick={() => handleLinkClick(link.tab, link.href)}
                  className="relative px-2 py-1 text-lg font-medium cursor-pointer transition-opacity duration-200"
                  style={{
                    opacity: activeTab === link.tab ? 1 : 0.5,
                    color: textColor,
                    fontFamily: "var(--font-bebas-neue)",
                    letterSpacing: "0.08em",
                  }}
                  whileHover={{ opacity: 0.7 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  id={`nav-tab-${link.tab}`}
                  aria-label={`View ${FORMAT_LABELS[link.tab]} records`}
                >
                  {FORMAT_LABELS[link.tab].toUpperCase()}

                  {/* Active underline */}
                  {activeTab === link.tab && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[1.5px]"
                      style={{
                        background: textColor,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              </React.Fragment>
            ))}
          </nav>

          {/* Desktop CTA button */}
          <div className="hidden md:block relative z-10">
            <motion.a
              href="#test-records"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#test-records");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block text-xs font-bold tracking-widest px-4 py-2 border rounded-full transition-colors cursor-pointer"
              style={{
                fontFamily: "var(--font-bebas-neue)",
                letterSpacing: "0.08em",
                borderColor:
                  scrollRatio > 0.5
                    ? "rgba(26,26,26,0.3)"
                    : "rgba(255,255,255,0.4)",
                color: textColor,
              }}
              whileHover={{
                scale: 1.03,
                borderColor: textColor,
                backgroundColor: textColor,
                color: scrollRatio > 0.5 ? "#fafafa" : "#1a1a1a",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              EXPLORE RECORDS
            </motion.a>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center cursor-pointer z-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            id="mobile-menu-toggle"
          >
            {/* Top bar */}
            <span
              className="absolute w-5 h-[1.5px] rounded-full transition-all duration-300"
              style={{
                background: textColor,
                transform: isMobileMenuOpen
                  ? "translateY(0) rotate(45deg)"
                  : "translateY(-4px) rotate(0deg)",
              }}
            />
            {/* Middle bar */}
            <span
              className="absolute w-5 h-[1.5px] rounded-full transition-all duration-300"
              style={{
                background: textColor,
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
            />
            {/* Bottom bar */}
            <span
              className="absolute w-5 h-[1.5px] rounded-full transition-all duration-300"
              style={{
                background: textColor,
                transform: isMobileMenuOpen
                  ? "translateY(0) rotate(-45deg)"
                  : "translateY(4px) rotate(0deg)",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center md:hidden"
            id="mobile-menu"
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.tab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  onClick={() => handleLinkClick(link.tab, link.href)}
                  className="text-3xl font-medium cursor-pointer transition-opacity duration-200"
                  style={{
                    fontFamily: "var(--font-bebas-neue)",
                    letterSpacing: "0.1em",
                    color: "var(--color-text-primary)",
                    opacity: activeTab === link.tab ? 1 : 0.4,
                  }}
                >
                  {FORMAT_LABELS[link.tab]}
                  {activeTab === link.tab && (
                    <div
                      className="mt-1 h-[2px] w-full"
                      style={{ background: "var(--color-text-primary)" }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
