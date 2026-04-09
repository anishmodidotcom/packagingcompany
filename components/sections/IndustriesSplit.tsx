"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { industries } from "@/lib/data";

export default function IndustriesSplit() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  const current = industries[active];

  return (
    <section
      id="industries"
      className="relative bg-forest-950 py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <Container className="relative z-10">
        <motion.div
          ref={sectionRef}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16"
        >
          <SectionEyebrow className="mb-4">Industries We Serve</SectionEyebrow>
          <h2
            className="font-display font-medium text-cream-50"
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Built for brands that ship at scale.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-cream-50/60">
            Eight industries. One industrial partner.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — industry list */}
          <div className="flex flex-col">
            {industries.map((industry, i) => (
              <button
                key={industry.name}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group flex items-center justify-between border-b border-cream-50/10 py-4 text-left transition-all duration-300 ${
                  active === i ? "translate-x-4" : ""
                }`}
              >
                <span
                  className={`font-display text-2xl font-medium transition-colors duration-300 md:text-4xl ${
                    active === i ? "text-kraft-500" : "text-cream-50/60"
                  }`}
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {industry.name}
                </span>
                <ArrowRight
                  className={`h-5 w-5 transition-all duration-300 ${
                    active === i
                      ? "translate-x-0 text-kraft-500 opacity-100"
                      : "-translate-x-4 text-cream-50/40 opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right — image + details */}
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={prefersReducedMotion ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? {} : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={`${current.name} packaging by Altpac`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-kraft-500">
                  Case in Point
                </span>
                <p className="text-base leading-relaxed text-cream-50/80">
                  {current.description}
                </p>

                {/* Client logos placeholder */}
                <div className="mt-6 flex items-center gap-3">
                  {current.clients.map((client, ci) => (
                    <div
                      key={ci}
                      className="flex h-10 items-center rounded-lg border border-cream-50/10 px-4"
                    >
                      <span className="text-xs font-medium text-cream-50/50">
                        {client}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
