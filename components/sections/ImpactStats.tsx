"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Recycle, TrendingDown, Leaf, Target } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Grain from "@/components/ui/Grain";
import CountUp from "@/components/ui/CountUp";
import { impactStats } from "@/lib/data";

const iconMap = {
  Recycle,
  TrendingDown,
  Leaf,
  Target,
} as const;

export default function ImpactStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="sustainability"
      className="relative bg-cream-50 py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <Grain />
      <Container className="relative z-10">
        <motion.div
          ref={sectionRef}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16"
        >
          <SectionEyebrow className="mb-4">Our Impact</SectionEyebrow>
          <h2
            className="font-display font-medium text-forest-950"
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Sustainability, in numbers
            <br className="hidden md:block" /> we can actually show you.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-500">
            We don&apos;t talk about &ldquo;pushing boundaries.&rdquo; We
            publish our numbers.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6 lg:gap-8">
          {impactStats.map((stat, i) => {
            const Icon = iconMap[stat.icon];
            return (
              <motion.div
                key={stat.label}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="flex flex-col items-start"
              >
                <Icon
                  className="mb-4 h-6 w-6 text-kraft-500"
                  strokeWidth={1.5}
                />
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  isYear={"isYear" in stat && stat.isYear ? true : false}
                  className="font-display text-6xl font-light text-forest-950 md:text-8xl lg:text-[96px]"
                  style={{
                    letterSpacing: "-0.04em",
                    lineHeight: 0.9,
                  }}
                />
                <span className="mt-3 text-base text-ink-500">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 border-t border-line pt-12 text-center"
        >
          <p
            className="mx-auto max-w-3xl font-display text-2xl font-medium italic text-forest-950 md:text-3xl"
            style={{ lineHeight: 1.3 }}
          >
            &ldquo;Sustainability is a measurement, not a marketing line.&rdquo;
          </p>
          <cite className="mt-4 block text-sm font-medium uppercase tracking-[0.12em] text-ink-500 not-italic">
            — The Altpac Team
          </cite>
        </motion.blockquote>
      </Container>
    </section>
  );
}
