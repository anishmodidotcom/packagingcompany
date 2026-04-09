"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring, motion } from "motion/react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 250, damping: 25, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on devices with hover capability
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        !!target.closest(
          "a, button, [role='button'], [data-cursor-hover], input, select, textarea",
        ),
      );
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const size = isHovering ? 36 : 12;

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] rounded-full hidden md:block"
      style={{
        x,
        y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        backgroundColor: isHovering
          ? "var(--color-kraft-500)"
          : "var(--color-forest-950)",
        opacity: isHovering ? 0.3 : 0.2,
        transition:
          "width 0.25s ease, height 0.25s ease, background-color 0.25s ease, opacity 0.2s ease, margin 0.25s ease",
      }}
    />
  );
}
