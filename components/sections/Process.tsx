"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  MessageSquare,
  Package,
  CheckCircle2,
  Factory,
  Truck,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Grain from "@/components/ui/Grain";

const steps = [
  {
    number: "01",
    label: "Enquiry",
    icon: MessageSquare,
    title: "Tell us what you need",
    body: "Share your product specs, volumes, and timeline. Get a custom quote within 24 hours, not 24 days.",
    duration: "Day 1",
  },
  {
    number: "02",
    label: "Sample",
    icon: Package,
    title: "Get a physical sample",
    body: "We ship a real sample to your office — free across India — so you can test it against your product and your budget.",
    duration: "Week 1",
  },
  {
    number: "03",
    label: "Approve",
    icon: CheckCircle2,
    title: "Approve design + specs",
    body: "Work directly with our in-house design team to refine structure, print, and finishes. No third-party middlemen.",
    duration: "Week 2",
  },
  {
    number: "04",
    label: "Produce",
    icon: Factory,
    title: "Production at scale",
    body: "Your order runs at one of our five plants — wherever you need it delivered from. Koenig & Bauer presses. BOBST die-cutters.",
    duration: "Week 2–3",
  },
  {
    number: "05",
    label: "Deliver",
    icon: Truck,
    title: "Direct to your warehouse",
    body: "Our own fleet of trucks delivers across India. Same-day dispatch for repeat orders. Zero middlemen.",
    duration: "Week 3+",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative bg-cream-50 py-32 md:py-44 lg:py-56 overflow-hidden">
      <Grain />
      <Container className="relative z-10">
        <motion.div
          ref={ref}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-16 max-w-3xl"
        >
          <SectionEyebrow className="mb-4">How We Work</SectionEyebrow>
          <h2
            className="font-display font-medium text-forest-950"
            style={{
              fontSize: "clamp(2rem, 3.75vw, 3.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            From first call to first shipment in as little as 3 weeks.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-500">
            No endless back-and-forth. No sales gauntlet. Just the fastest way
            to get serious packaging into production.
          </p>
        </motion.div>

        {/* Desktop: horizontal row with connecting line */}
        <div className="relative hidden lg:block">
          {/* Connecting line behind cards */}
          <div className="absolute left-0 right-0 top-[72px] z-0 flex items-center px-8">
            <div className="h-px w-full bg-kraft-500/30" />
          </div>

          <div className="relative z-10 grid grid-cols-5 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.12,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="group rounded-2xl border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-kraft-500/30"
                >
                  <Icon
                    className="mb-4 h-8 w-8 text-kraft-500"
                    strokeWidth={1.5}
                  />
                  <span className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-kraft-500">
                    Step {step.number}
                  </span>
                  <h3 className="mb-2 font-display text-lg font-medium text-forest-950">
                    {step.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-ink-500">
                    {step.body}
                  </p>
                  <span className="inline-block rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-kraft-600">
                    {step.duration}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: stacked with vertical line */}
        <div className="relative lg:hidden">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-kraft-500/20" />
          <div className="flex flex-col gap-6 pl-14">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="relative rounded-2xl border border-line bg-white p-6"
                >
                  {/* Dot on the line */}
                  <div className="absolute -left-[42px] top-8 h-3 w-3 rounded-full bg-kraft-500" />
                  <Icon
                    className="mb-3 h-7 w-7 text-kraft-500"
                    strokeWidth={1.5}
                  />
                  <span className="mb-1 block text-xs font-medium uppercase tracking-[0.15em] text-kraft-500">
                    Step {step.number}
                  </span>
                  <h3 className="mb-2 font-display text-lg font-medium text-forest-950">
                    {step.title}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-ink-500">
                    {step.body}
                  </p>
                  <span className="inline-block rounded-full bg-cream-100 px-3 py-1 text-xs font-medium text-kraft-600">
                    {step.duration}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
