"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Grain from "@/components/ui/Grain";
import { certifications } from "@/lib/data";

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-cream-50 py-24 md:py-32 lg:py-40 overflow-hidden">
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
            Certified + Accountable
          </SectionEyebrow>
          <h2
            className="font-display font-medium text-forest-950"
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Certified to the standards your
            <br className="hidden md:block" /> procurement team already audits
            for.
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-ink-500">
            Seven independent certifications. Regularly audited. Globally
            recognized. These are not vanity badges — they are the baseline your
            compliance team already knows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`group rounded-2xl border border-line bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:border-kraft-500/30 ${
                i === 6 ? "sm:col-start-1 lg:col-start-2" : ""
              }`}
            >
              <div className="mb-5 flex h-16 items-center">
                <Image
                  src={cert.image}
                  alt={cert.fullName}
                  width={64}
                  height={64}
                  className="h-16 w-auto object-contain"
                  sizes="64px"
                />
              </div>
              <h3 className="font-display text-xl font-medium text-forest-950">
                {cert.name} — {cert.fullName}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {cert.description}
              </p>
              <p className="mt-3 font-display text-sm italic text-kraft-500">
                Why it matters: {cert.whyItMatters}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
