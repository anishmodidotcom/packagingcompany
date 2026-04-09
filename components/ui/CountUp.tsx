"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  animate,
  useInView,
  useReducedMotion,
} from "motion/react";

interface CountUpProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
  isYear?: boolean;
  style?: React.CSSProperties;
}

export default function CountUp({
  target,
  suffix = "",
  duration = 2,
  className = "",
  isYear = false,
  style,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const format = (v: number) => {
      if (isYear) return String(Math.round(v));
      if (target >= 10000) return Math.round(v).toLocaleString();
      return String(Math.round(v));
    };

    if (prefersReducedMotion) {
      motionVal.set(target);
      setDisplay(format(target));
      return;
    }

    if (isInView) {
      const controls = animate(motionVal, target, {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
        onUpdate: (v) => setDisplay(format(v)),
      });
      return controls.stop;
    }
  }, [isInView, target, duration, motionVal, prefersReducedMotion, isYear]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
      {suffix}
    </span>
  );
}
