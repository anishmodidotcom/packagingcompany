"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Grain from "@/components/ui/Grain";
import CountUp from "@/components/ui/CountUp";
import { stats } from "@/lib/data";

export default function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-cream-50 py-32 md:py-44 lg:py-56 overflow-hidden">
      <Grain />
      <Container className="relative z-10">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 text-center"
          ref={ref}
        >
          <SectionEyebrow>The Scale of Altpac</SectionEyebrow>
        </motion.div>

        <div className="grid grid-cols-2 gap-12 md:gap-16 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center ${
                i < stats.length - 1
                  ? "lg:border-r lg:border-line"
                  : ""
              }`}
            >
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                className="block whitespace-nowrap font-display font-light text-forest-950"
                style={{
                  fontSize: "clamp(3rem, 7vw, 7rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                }}
              />
              <span className="mt-4 text-base text-ink-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
