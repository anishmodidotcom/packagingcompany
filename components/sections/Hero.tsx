"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { ArrowRight, Clock, Package, Truck } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { FACTORY_FLOOR } from "@/lib/images";
import { certifications } from "@/lib/data";

const headlineLines = [
  { text: "One billion bags.", delay: 0 },
  { text: "Five plants.", delay: 0.12 },
  { text: "Zero plastic.", delay: 0.24, highlight: true },
];

export default function Hero({
  onSampleClick,
}: {
  onSampleClick: () => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const animProps = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: {
            type: "spring" as const,
            stiffness: 120,
            damping: 20,
            delay,
          },
        };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-forest-950 overflow-hidden"
    >
      <Container className="relative z-10 flex min-h-screen items-center pt-24 pb-16">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left column */}
          <div className="lg:col-span-7">
            <motion.span
              {...animProps(0)}
              className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.15em] text-kraft-500"
            >
              India&apos;s Largest Paper Bag Manufacturer
            </motion.span>

            <h1 className="mb-8">
              {headlineLines.map((line) => (
                <motion.span
                  key={line.text}
                  {...animProps(line.delay)}
                  className="block font-display font-medium text-cream-50"
                  style={{
                    fontSize: "clamp(3rem, 5.5vw, 6rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 0.95,
                  }}
                >
                  {line.highlight ? (
                    <>
                      <span className="italic text-kraft-500">Zero</span>{" "}
                      plastic.
                    </>
                  ) : (
                    line.text
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p
              {...animProps(0.36)}
              className="mb-10 max-w-lg text-lg leading-relaxed text-cream-50/75"
            >
              Sustainable packaging at industrial scale, for brands that refuse
              to compromise. A Canpac Trends company, trusted across Fashion,
              Beauty, FMCG, and E-commerce.
            </motion.p>

            <motion.div
              {...animProps(0.48)}
              className="flex flex-wrap items-center gap-4"
            >
              <Button
                variant="primary"
                magnetic
                onClick={onSampleClick}
                className="text-base"
              >
                Get a Quote in 24 Hours <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" className="text-base">
                Explore Our Work
              </Button>
            </motion.div>

            {/* Promise row */}
            <motion.div
              {...animProps(0.55)}
              className="mt-10 flex flex-col gap-4 md:flex-row md:gap-8"
            >
              {[
                { icon: Clock, label: "24-hour quotes", sub: "Real quotes in 24 hours, not 24 days" },
                { icon: Package, label: "7-day samples", sub: "Hold your product in your hands next week" },
                { icon: Truck, label: "Free shipping", sub: "From our fleet to your warehouse" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-kraft-500" strokeWidth={1.5} />
                    <div>
                      <span className="block text-sm font-medium text-cream-50">{item.label}</span>
                      <span className="text-xs text-cream-50/50">{item.sub}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Certifications strip */}
            <motion.div
              {...animProps(0.65)}
              className="mt-8 border-t border-cream-50/10 pt-6"
            >
              <span className="mb-3 block text-xs font-medium uppercase tracking-[0.12em] text-cream-50/40">
                Certified by
              </span>
              <div className="flex items-center gap-5 flex-wrap">
                {certifications.map((cert) => (
                  <div key={cert.name} className="group relative">
                    <Image
                      src={cert.image}
                      alt={cert.fullName}
                      width={24}
                      height={24}
                      className="h-6 w-auto brightness-0 invert opacity-40 transition-opacity duration-200 group-hover:opacity-80"
                      sizes="24px"
                    />
                    <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-forest-900 px-3 py-1.5 text-xs text-cream-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {cert.fullName}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column — hero image */}
          <div className="hidden lg:col-span-5 lg:block">
            <motion.div
              style={{ y: prefersReducedMotion ? 0 : imageY }}
              className="relative aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <Image
                src={FACTORY_FLOOR}
                alt="Altpac factory floor with industrial packaging machinery"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 0vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />

              {/* Floating metadata card */}
              <div
                className="absolute bottom-6 left-6 rounded-2xl border border-cream-50/10 px-5 py-4"
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  backgroundColor: "rgba(10, 46, 38, 0.6)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-sage-500" />
                  </span>
                  <span className="text-xs font-medium text-cream-50/80">
                    Live from our Ahmedabad facility
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
