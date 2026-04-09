"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";

const LOGOS = [
  { name: "AURORA", shape: "circle" },
  { name: "NIMBUS", shape: "square" },
  { name: "KORA", shape: "triangle" },
  { name: "Maison", shape: "serif" },
  { name: "LUMEN", shape: "dots" },
  { name: "VIREO", shape: "cross" },
  { name: "HEXA", shape: "hex" },
  { name: "ORBIT", shape: "ring" },
] as const;

function LogoShape({ logo }: { logo: (typeof LOGOS)[number] }) {
  switch (logo.shape) {
    case "circle":
      return (
        <svg viewBox="0 0 100 40" className="h-8 w-auto">
          <circle cx="20" cy="20" r="12" fill="currentColor" opacity="0.4" />
          <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="38" y="26" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="500" fill="currentColor">AURORA</text>
        </svg>
      );
    case "square":
      return (
        <svg viewBox="0 0 100 40" className="h-8 w-auto">
          <rect x="6" y="10" width="20" height="20" fill="currentColor" opacity="0.5" />
          <text x="32" y="26" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" fill="currentColor">NIMBUS</text>
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 100 40" className="h-8 w-auto">
          <polygon points="10,28 20,10 30,28" fill="currentColor" opacity="0.4" />
          <polygon points="18,28 28,12 38,28" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x="44" y="26" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="500" fill="currentColor">KORA</text>
        </svg>
      );
    case "serif":
      return (
        <svg viewBox="0 0 100 40" className="h-8 w-auto">
          <text x="10" y="27" fontFamily="Georgia, serif" fontSize="18" fontWeight="400" fill="currentColor" fontStyle="italic">Maison</text>
        </svg>
      );
    case "dots":
      return (
        <svg viewBox="0 0 100 40" className="h-8 w-auto">
          <circle cx="10" cy="20" r="3" fill="currentColor" />
          <circle cx="18" cy="20" r="3" fill="currentColor" opacity="0.7" />
          <circle cx="26" cy="20" r="3" fill="currentColor" opacity="0.4" />
          <text x="36" y="26" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="600" fill="currentColor">LUMEN</text>
        </svg>
      );
    case "cross":
      return (
        <svg viewBox="0 0 100 40" className="h-8 w-auto">
          <rect x="12" y="8" width="4" height="24" fill="currentColor" />
          <rect x="2" y="18" width="24" height="4" fill="currentColor" />
          <text x="34" y="26" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" fill="currentColor">VIREO</text>
        </svg>
      );
    case "hex":
      return (
        <svg viewBox="0 0 100 40" className="h-8 w-auto">
          <polygon points="20,6 32,13 32,27 20,34 8,27 8,13" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <text x="40" y="26" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="500" fill="currentColor">HEXA</text>
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 100 40" className="h-8 w-auto">
          <circle cx="15" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
          <text x="30" y="26" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="400" fill="currentColor" letterSpacing="2">ORBIT</text>
        </svg>
      );
  }
}

export default function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="border-t border-line bg-cream-50 py-16 md:py-20">
      <Container>
        <motion.div
          ref={ref}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <p className="mb-10 text-xs font-medium uppercase tracking-[0.15em] text-ink-500">
            Trusted by 150+ brands across India
          </p>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-8 lg:gap-4">
            {LOGOS.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.3,
                  delay: i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="flex items-center justify-center px-4 py-3 text-forest-950/40 transition-colors duration-300 hover:text-forest-950"
              >
                <LogoShape logo={logo} />
              </motion.div>
            ))}
          </div>
          <p className="mt-8 font-display text-xs italic text-ink-500/60">
            Real client logos coming soon — ask us about active collaborations.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
