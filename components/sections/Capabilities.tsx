"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { PencilRuler, Zap, FlaskConical, Microscope } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Grain from "@/components/ui/Grain";

const capabilities = [
  {
    icon: PencilRuler,
    title: "Design & Innovation",
    body: "Our in-house design team works with you from concept through consumer. Structural engineering, graphic design, and material selection — unified under one roof.",
    flagship: false,
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    body: "Dedicated sample-making team and specialized machines. First prototype in your hands within 7 working days on most projects.",
    flagship: false,
  },
  {
    icon: FlaskConical,
    title: "In-House Testing Lab",
    body: "State-of-the-art equipment to verify every spec: burst strength, compression, barrier properties, migration testing. Your QA team's job, done upstream.",
    flagship: false,
  },
  {
    icon: Microscope,
    title: "B.I.R.D. — Our R&D Lab",
    body: "Bharat Institute of Research & Development. New materials, new structures, new processes. Where next year's packaging gets built today.",
    flagship: true,
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-cream-50 py-32 md:py-44 lg:py-56 overflow-hidden">
      <Grain />
      <Container className="relative z-10">
        <motion.div
          ref={sectionRef}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16"
        >
          <SectionEyebrow className="mb-4">
            What We Do Beyond Manufacturing
          </SectionEyebrow>
          <h2
            className="font-display font-medium text-forest-950"
            style={{
              fontSize: "clamp(2rem, 3.75vw, 3.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Four things most packaging
            <br className="hidden md:block" /> suppliers don&apos;t offer.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="group relative rounded-2xl border border-line bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:border-kraft-500/30 md:p-10"
              >
                {cap.flagship && (
                  <span className="absolute right-6 top-6 rounded-full bg-kraft-500/10 px-3 py-1 text-xs font-medium text-kraft-600">
                    FLAGSHIP
                  </span>
                )}
                <Icon className="mb-5 h-8 w-8 text-kraft-500" strokeWidth={1.5} />
                <h3 className="mb-3 font-display text-xl font-medium text-forest-950">
                  {cap.title}
                </h3>
                <p className="text-base leading-relaxed text-ink-500">
                  {cap.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
