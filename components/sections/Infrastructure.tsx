"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { infrastructurePanels } from "@/lib/data";

export default function Infrastructure() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-forest-950 py-24 md:py-32 lg:py-40 overflow-hidden">
      <Container className="relative z-10">
        <motion.div
          ref={sectionRef}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16"
        >
          <SectionEyebrow className="mb-4">Infrastructure</SectionEyebrow>
          <h2
            className="font-display font-medium text-cream-50"
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            A billion paper bags,
            <br className="hidden md:block" /> made the hard way.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-cream-50/60">
            1 million square feet of factory space. Koenig &amp; Bauer presses.
            BOBST die-cutters. An in-house R&amp;D lab. And our own fleet of
            trucks to deliver it all.
          </p>
        </motion.div>

        {/* 2×2 bento photo grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[320px]">
          {infrastructurePanels.map((panel, i) => (
            <motion.div
              key={panel.eyebrow}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="group relative overflow-hidden rounded-3xl min-h-[240px]"
              style={{
                gridColumn: panel.span === "col-span-7" ? "span 7" : "span 5",
              }}
            >
              <Image
                src={panel.image}
                alt={panel.headline}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectPosition:
                    "objectPosition" in panel
                      ? (panel as { objectPosition: string }).objectPosition
                      : "center",
                }}
              />
              {/* Strengthened gradient overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/40 to-transparent" />
              {/* Text overlay */}
              <div className="absolute bottom-0 left-0 p-6 transition-transform duration-300 group-hover:-translate-y-1 md:p-8">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-kraft-500">
                  {panel.eyebrow}
                </span>
                <p className="font-display text-lg font-medium text-cream-50 md:text-xl">
                  {panel.headline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
