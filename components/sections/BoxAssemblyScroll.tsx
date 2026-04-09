"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Grain from "@/components/ui/Grain";

const stages = [
  {
    eyebrow: "STAGE 01 · THE MATERIAL",
    headline: "One flat sheet.",
    body: "FSC-certified kraft board. Sourced from responsibly managed forests. Zero plastic laminate. The starting point for every Altpac box.",
  },
  {
    eyebrow: "STAGE 02 · THE FOLD",
    headline: "Four folds.",
    body: "Precision die-cut at our Ahmedabad flagship plant on BOBST and Kongsberg equipment. Tolerances measured in fractions of a millimeter. Structural engineering meets paper craft.",
  },
  {
    eyebrow: "STAGE 03 · THE SEAL",
    headline: "One seal.",
    body: "Water-based adhesives. Magnetic closures for luxury lines. Food-safe coatings for FMCG. Built to protect what matters until it reaches your customer's hands.",
  },
  {
    eyebrow: "STAGE 04 · AT SCALE",
    headline: "A billion times a year.",
    body: "What you just watched happens 2,700 times an hour at Altpac. Across 5 plants. 70 million units a month. And every single one starts as a flat sheet of kraft.",
  },
];

function StagesStacked() {
  return (
    <div className="flex flex-col gap-10">
      {stages.map((stage) => (
        <div key={stage.eyebrow}>
          <span className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-kraft-500">
            {stage.eyebrow}
          </span>
          <h3
            className="mb-3 font-display font-medium text-forest-950"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
            }}
          >
            {stage.headline}
          </h3>
          <p className="max-w-[32ch] text-lg leading-relaxed text-ink-500">
            {stage.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function BoxAssemblyScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [scrollHintVisible, setScrollHintVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = mounted
    ? typeof window !== "undefined" && window.innerWidth < 768
    : false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Drive video currentTime from scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReducedMotion || isMobile) return;
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = latest * videoRef.current.duration;
    }
    if (latest > 0.05) {
      setScrollHintVisible(false);
    }
  });

  // Stage text opacity transforms
  const text1Opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.22, 0.28],
    [1, 1, 0, 0],
  );
  const text2Opacity = useTransform(
    scrollYProgress,
    [0.22, 0.28, 0.47, 0.53],
    [0, 1, 1, 0],
  );
  const text3Opacity = useTransform(
    scrollYProgress,
    [0.47, 0.53, 0.72, 0.78],
    [0, 1, 1, 0],
  );
  const text4Opacity = useTransform(
    scrollYProgress,
    [0.72, 0.78, 1, 1],
    [0, 1, 1, 1],
  );

  const textOpacities = [text1Opacity, text2Opacity, text3Opacity, text4Opacity];

  // Reduced motion: autoplay + stacked text
  if (prefersReducedMotion) {
    return (
      <section className="relative bg-cream-50 py-24 md:py-32 lg:py-40 overflow-hidden">
        <Grain />
        <Container className="relative z-10">
          <SectionEyebrow className="mb-4">The Craft</SectionEyebrow>
          <h2
            className="mb-6 font-display font-medium text-forest-950"
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Watch a billion-bag manufacturer make a box.
          </h2>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <video
                src="/box-assembly.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-3xl border border-line shadow-2xl shadow-forest-950/10"
              />
            </div>
            <StagesStacked />
          </div>
        </Container>
      </section>
    );
  }

  // Mobile: simpler layout with autoplay
  if (isMobile && mounted) {
    return (
      <section className="relative bg-cream-50 py-24 md:py-32 overflow-hidden">
        <Grain />
        <Container className="relative z-10">
          <SectionEyebrow className="mb-4">The Craft</SectionEyebrow>
          <h2
            className="mb-8 font-display font-medium text-forest-950"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Watch a billion-bag manufacturer make a box.
          </h2>
          <video
            src="/box-assembly.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="mb-12 w-full rounded-3xl border border-line shadow-2xl shadow-forest-950/10"
          />
          <StagesStacked />
        </Container>
      </section>
    );
  }

  // Desktop: scroll-scrubbed video
  return (
    <section ref={sectionRef} className="relative" style={{ height: "400vh" }}>
      {/* Sticky inner container — pinned while scrolling */}
      <div className="sticky top-0 h-screen overflow-hidden bg-cream-50">
        <Grain />
        <Container className="relative z-10 flex h-full flex-col justify-center">
          {/* Section intro */}
          <div className="mb-8">
            <SectionEyebrow className="mb-3">The Craft</SectionEyebrow>
            <h2
              className="font-display font-medium text-forest-950"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Watch a billion-bag manufacturer make a box.
            </h2>
            {/* Scroll hint */}
            <motion.div
              className="mt-3 flex items-center gap-2"
              animate={{ opacity: scrollHintVisible ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-display text-sm italic text-ink-500">
                Scroll to unfold
              </span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown className="h-4 w-4 text-ink-500" />
              </motion.span>
            </motion.div>
          </div>

          {/* Content area: text left, video right */}
          <div className="grid flex-1 grid-cols-5 items-center gap-10 pb-12">
            {/* Text column — 4 stacked stages, crossfading */}
            <div className="relative col-span-2 h-[300px]">
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.eyebrow}
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{ opacity: textOpacities[i] }}
                >
                  <span className="mb-3 block text-xs font-medium uppercase tracking-[0.15em] text-kraft-500">
                    {stage.eyebrow}
                  </span>
                  <h3
                    className="mb-4 font-display font-medium text-forest-950"
                    style={{
                      fontSize: "clamp(3rem, 5vw, 5rem)",
                      letterSpacing: "-0.02em",
                      lineHeight: 0.95,
                    }}
                  >
                    {stage.headline}
                  </h3>
                  <p className="max-w-[32ch] text-lg leading-relaxed text-ink-500">
                    {stage.body}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Video column */}
            <div className="col-span-3">
              <video
                ref={videoRef}
                src="/box-assembly.mp4"
                muted
                playsInline
                preload="auto"
                className="w-full rounded-3xl border border-line shadow-2xl shadow-forest-950/10"
              />
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
