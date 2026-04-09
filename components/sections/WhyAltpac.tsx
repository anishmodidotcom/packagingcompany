"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const differentiators = [
  {
    number: "01",
    title: "Scale without the hand-off",
    body: "From 2,500 luxury boxes to 50 million e-commerce mailers — all from the same partner. No switching vendors as you grow.",
  },
  {
    number: "02",
    title: "Design team included",
    body: "Structural engineering, graphics, and material selection in-house. Free with every order. No agency retainer, no creative briefs lost in translation.",
  },
  {
    number: "03",
    title: "24-hour quotes, 7-day samples",
    body: "We don't do sales gauntlets. Tell us what you need and you'll have a real quote tomorrow and a physical sample in your hands next week.",
  },
  {
    number: "04",
    title: "Certified seven ways over",
    body: "ISO + FSC + BRCS + Sedex + SMETA + CTPAT + FSSC 22000. Your procurement team already audits against these. We've already passed.",
  },
];

export default function WhyAltpac() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-forest-950 py-32 md:py-44 lg:py-56 overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 max-w-3xl"
        >
          <SectionEyebrow className="mb-4">Why Altpac</SectionEyebrow>
          <h2
            className="font-display font-medium text-cream-50"
            style={{
              fontSize: "clamp(2rem, 3.75vw, 3.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Four reasons brands stop shopping around.
          </h2>
          <p className="mt-4 text-lg text-cream-50/70">
            Most packaging suppliers force you to choose between price, quality,
            speed, and sustainability. We don&apos;t.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.number}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group rounded-2xl border border-cream-50/15 bg-cream-50/5 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-kraft-500/50 md:p-10"
            >
              <span
                className="mb-4 block font-display font-light text-kraft-500"
                style={{ fontSize: "clamp(3rem, 5vw, 5rem)", lineHeight: 0.9 }}
              >
                {d.number}
              </span>
              <h3 className="mb-3 font-display text-xl font-medium text-cream-50">
                {d.title}
              </h3>
              <p className="text-base leading-relaxed text-cream-50/70">
                {d.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
