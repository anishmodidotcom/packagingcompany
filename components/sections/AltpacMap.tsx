"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Grain from "@/components/ui/Grain";

type Plant = {
  id: string;
  name: string;
  state: string;
  role: string;
  specialty: string;
  capacity: string;
  top: string;
  left: string;
};

const PLANTS: Plant[] = [
  {
    id: "del",
    name: "Delhi NCR",
    state: "Delhi",
    role: "NORTH INDIA HUB",
    specialty: "North India distribution + e-commerce boxes",
    capacity: "8M+ units/month",
    top: "23%",
    left: "37%",
  },
  {
    id: "ahm",
    name: "Ahmedabad",
    state: "Gujarat",
    role: "FLAGSHIP PLANT",
    specialty: "Folding cartons + luxury packaging",
    capacity: "25M+ units/month",
    top: "40%",
    left: "26%",
  },
  {
    id: "mum",
    name: "Mumbai",
    state: "Maharashtra",
    role: "WEST HUB",
    specialty: "E-commerce + retail bags",
    capacity: "15M+ units/month",
    top: "52%",
    left: "27%",
  },
  {
    id: "blr",
    name: "Bengaluru",
    state: "Karnataka",
    role: "SOUTH-WEST FACILITY",
    specialty: "Custom food packaging + Sweetdisp",
    capacity: "12M+ units/month",
    top: "75%",
    left: "35%",
  },
  {
    id: "mad",
    name: "Chennai",
    state: "Tamil Nadu",
    role: "SOUTH HUB",
    specialty: "Rigid boxes + export",
    capacity: "10M+ units/month",
    top: "73%",
    left: "42%",
  },
];

export default function AltpacMap() {
  const [activePlant, setActivePlant] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative bg-cream-50 py-32 md:py-44 lg:py-56 overflow-hidden"
    >
      <Grain />
      <Container className="relative z-10">
        {/* Section header */}
        <div className="mb-20 max-w-3xl">
          <SectionEyebrow className="mb-6">Our Facilities</SectionEyebrow>
          <h2
            className="font-display font-medium text-forest-950 mb-6"
            style={{
              fontSize: "clamp(2rem, 3.75vw, 3.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Five plants. Strategically placed.
            <br className="hidden md:block" /> Always close to you.
          </h2>
          <p className="text-lg text-ink-500 leading-relaxed">
            From Ahmedabad to Chennai, our facilities sit near India&apos;s
            busiest ports and industrial hubs — so your packaging reaches you
            faster, cheaper, and with a lower footprint.
          </p>
        </div>

        {/* Map + sidebar layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-20 items-start">
          {/* Left: Map with pins */}
          <div className="relative w-full max-w-[520px] mx-auto md:mx-0">
            <div className="relative aspect-[8/9] w-full">
              {/* India PNG */}
              <Image
                src="/india-map.png"
                alt="Map of India showing Altpac plant locations"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                className="object-contain"
                priority
              />

              {/* Pins overlay */}
              {PLANTS.map((plant, i) => (
                <div
                  key={plant.id}
                  className="absolute"
                  style={{
                    top: plant.top,
                    left: plant.left,
                    transform: "translate(-50%, -50%)",
                  }}
                  onMouseEnter={() => setActivePlant(plant.id)}
                  onMouseLeave={() => setActivePlant(null)}
                >
                  {/* Pulsing outer ring */}
                  {!prefersReducedMotion && (
                    <motion.div
                      className="absolute top-1/2 left-1/2 h-8 w-8 rounded-full border-2 border-kraft-500"
                      style={{ transform: "translate(-50%, -50%)" }}
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.7, 0, 0.7],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeOut",
                      }}
                    />
                  )}
                  {/* Inner pin dot */}
                  <motion.div
                    className="relative h-3 w-3 cursor-pointer rounded-full bg-kraft-500 shadow-lg"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    data-cursor-hover
                  />
                  {/* City label */}
                  <div className="pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium text-forest-950/70">
                    {plant.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Plant list sidebar */}
          <div className="space-y-4">
            {PLANTS.map((plant) => (
              <div
                key={plant.id}
                onMouseEnter={() => setActivePlant(plant.id)}
                onMouseLeave={() => setActivePlant(null)}
                className={`rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                  activePlant === plant.id
                    ? "border-kraft-500/40 bg-white shadow-sm"
                    : "border-transparent hover:border-line hover:bg-white/60"
                }`}
                data-cursor-hover
              >
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-100">
                    <div
                      className={`h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                        activePlant === plant.id
                          ? "bg-kraft-500"
                          : "bg-forest-700/40"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="font-display text-lg font-medium text-forest-950">
                      {plant.name}, {plant.state}
                    </p>
                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-kraft-500 mt-0.5">
                      {plant.role}
                    </p>
                    <p className="mt-1.5 text-sm text-ink-500">
                      {plant.specialty} · {plant.capacity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
