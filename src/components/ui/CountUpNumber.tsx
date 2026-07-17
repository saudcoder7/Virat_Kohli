"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface CountUpNumberProps {
  value: number;
  duration?: number; // in seconds
  prefix?: string;
  suffix?: string;
}

export default function CountUpNumber({
  value,
  duration = 1.5,
  prefix = "",
  suffix = "",
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setCount(value);
      return;
    }

    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalFrames = Math.min(Math.max(duration * 60, 20), 120);
    let frame = 0;

    const counter = () => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const easedProgress = progress * (2 - progress);
      const current = Math.round(easedProgress * (end - start) + start);

      setCount(current);

      if (frame < totalFrames) {
        requestAnimationFrame(counter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(counter);
  }, [value, duration, isInView, reducedMotion]);

  // Format count with commas if it's large (e.g. 14181 -> 14,181)
  const formattedCount = count.toLocaleString("en-US");

  return (
    <span ref={ref} className="font-bold tracking-tight">
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  );
}
