"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Clock, Truck, Package } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const reassurance = [
  { icon: Clock, text: "First response within 24 hours" },
  { icon: Truck, text: "Free sample shipping across India" },
  { icon: Package, text: "No minimum for prototypes" },
];

export default function FinalCTA({
  onSampleClick,
}: {
  onSampleClick: () => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative bg-forest-950 py-32 md:py-44 lg:py-56 overflow-hidden"
    >
      <Container className="relative z-10 text-center">
        <motion.div
          ref={sectionRef}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2
            className="mx-auto max-w-4xl font-display font-medium text-cream-50"
            style={{
              fontSize: "clamp(2rem, 3.75vw, 3.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Ready to see what a billion-bag manufacturer can build for you?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream-50/60">
            Request a sample in under 60 seconds. Or talk to our team about your
            volumes, timelines, and specs.
          </p>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            magnetic
            onClick={onSampleClick}
            className="text-base"
          >
            Get a Quote in 24 Hours
          </Button>
          <Button variant="secondary" className="text-base">
            Talk to a Packaging Strategist
          </Button>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          {reassurance.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-kraft-500" strokeWidth={1.5} />
                <span className="text-sm text-cream-50/60">{item.text}</span>
              </div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
