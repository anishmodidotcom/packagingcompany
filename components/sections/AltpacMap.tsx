"use client";

import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { MapPin } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Grain from "@/components/ui/Grain";
import IndiaMap from "@/components/map/IndiaMap";
import { plants } from "@/lib/data";

export default function AltpacMap() {
  const [activePlant, setActivePlant] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
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
          <SectionEyebrow className="mb-4">Our Facilities</SectionEyebrow>
          <h2
            className="font-display font-medium text-forest-950"
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Five plants. Strategically placed.
            <br className="hidden md:block" /> Always close to you.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-500">
            From Ahmedabad to Chennai, our facilities sit near India&apos;s
            busiest ports and industrial hubs — so your packaging reaches you
            faster, cheaper, and with a lower footprint.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Map */}
          <IndiaMap
            activePlant={activePlant}
            setActivePlant={setActivePlant}
          />

          {/* Plant list sidebar */}
          <div className="flex flex-col gap-2">
            {plants.map((plant, i) => (
              <button
                key={plant.city}
                onMouseEnter={() => setActivePlant(i)}
                onMouseLeave={() => setActivePlant(null)}
                onClick={() => setActivePlant(i)}
                className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition-all duration-200 ${
                  activePlant === i
                    ? "border-kraft-500/40 bg-white shadow-sm"
                    : "border-transparent hover:border-line hover:bg-white/60"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${
                    activePlant === i
                      ? "bg-kraft-500 text-forest-950"
                      : "bg-forest-950/5 text-forest-700"
                  }`}
                >
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg font-medium text-forest-950">
                    {plant.city}, {plant.state}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-[0.1em] text-kraft-500">
                    {plant.name}
                  </p>
                  <p className="mt-1.5 text-sm text-ink-500">
                    {plant.specialty} · {plant.capacity}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
