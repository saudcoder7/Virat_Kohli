"use client";

import { useState, useEffect, useRef } from "react";

interface UseTypewriterResult {
  displayed: string;
  done: boolean;
}

/**
 * Custom typewriter hook — types out text character by character.
 * Built from scratch with setTimeout/setInterval — no library.
 *
 * @param text - The full text to type out
 * @param speed - Milliseconds between each character (default: 100)
 * @param startDelay - Milliseconds before typing begins (default: 500)
 * @returns { displayed, done } — the currently visible text and whether typing is complete
 */
export function useTypewriter(
  text: string,
  speed: number = 100,
  startDelay: number = 500
): UseTypewriterResult {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset on text change
    setDisplayed("");
    setDone(false);
    indexRef.current = 0;

    // Start delay before typing begins
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1;
        const nextIndex = indexRef.current;

        if (nextIndex >= text.length) {
          setDisplayed(text);
          setDone(true);
          clearInterval(interval);
        } else {
          setDisplayed(text.slice(0, nextIndex));
        }
      }, speed);

      // Cleanup interval
      return () => clearInterval(interval);
    }, startDelay);

    // Cleanup start timeout
    return () => clearTimeout(startTimeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}
