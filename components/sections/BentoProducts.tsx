"use client";

import { useState, useRef, useCallback } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useMotionValue,
  useTransform,
} from "motion/react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Grain from "@/components/ui/Grain";
import { products } from "@/lib/data";

const filterChips = ["All", "By Industry", "By Material", "By Volume"];

const bentoLayout = [
  { colStart: 1, colEnd: 7, rowStart: 1, rowEnd: 3 },
  { colStart: 7, colEnd: 10, rowStart: 1, rowEnd: 2 },
  { colStart: 10, colEnd: 13, rowStart: 1, rowEnd: 2 },
  { colStart: 7, colEnd: 13, rowStart: 2, rowEnd: 3 },
  { colStart: 1, colEnd: 5, rowStart: 3, rowEnd: 4 },
  { colStart: 5, colEnd: 9, rowStart: 3, rowEnd: 4 },
  { colStart: 9, colEnd: 13, rowStart: 3, rowEnd: 4 },
  { colStart: 1, colEnd: 5, rowStart: 4, rowEnd: 5 },
  { colStart: 5, colEnd: 9, rowStart: 4, rowEnd: 5 },
  { colStart: 9, colEnd: 13, rowStart: 4, rowEnd: 5 },
];

interface TileProps {
  product: (typeof products)[number];
  isLarge: boolean;
}

function ProductTile({ product, isLarge }: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-200, 200], [4, -4]);
  const rotateY = useTransform(mx, [-200, 200], [-4, 4]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || !tileRef.current) return;
      const rect = tileRef.current.getBoundingClientRect();
      mx.set(e.clientX - rect.left - rect.width / 2);
      my.set(e.clientY - rect.top - rect.height / 2);
    },
    [prefersReducedMotion, mx, my],
  );

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white"
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      data-cursor-hover
    >
      <div
        className="relative w-full shrink-0"
        style={{
          flex: isLarge ? "1 1 0%" : "none",
          aspectRatio: isLarge ? undefined : "4/3",
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes={
            isLarge
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
      </div>

      <div className="relative flex shrink-0 flex-col gap-1 p-5">
        <h3 className="font-display text-lg font-medium text-forest-950 md:text-xl">
          {product.name}
        </h3>
        <p className="text-sm text-ink-500 line-clamp-1">
          {product.description}
        </p>
        <span className="mt-1 text-sm font-medium text-kraft-500 transition-colors duration-200 group-hover:text-kraft-600">
          Learn more →
        </span>
      </div>

      {/* Spec overlay — only shows on hover via parent variant */}
      <motion.div
        variants={{
          rest: { opacity: 0, y: 12 },
          hover: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-x-0 bottom-0 rounded-b-3xl bg-forest-950/95 px-5 py-4"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div className="flex flex-col gap-1.5 text-sm text-cream-50/80">
          <span>
            <span className="text-kraft-500">MOQ:</span> {product.moq}
          </span>
          <span>
            <span className="text-kraft-500">Lead time:</span>{" "}
            {product.leadTime}
          </span>
          <span>
            <span className="text-kraft-500">Materials:</span>{" "}
            {product.materials}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BentoProducts() {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="products"
      className="relative bg-cream-50 py-32 md:py-44 lg:py-56 overflow-hidden"
    >
      <Grain />
      <Container className="relative z-10">
        <motion.div
          ref={sectionRef}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <SectionEyebrow className="mb-4">Our Products</SectionEyebrow>
          <h2
            className="font-display font-medium text-forest-950"
            style={{
              fontSize: "clamp(2rem, 3.75vw, 3.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            Packaging, engineered for every shelf.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-500">
            From e-commerce mailers at scale to luxury rigid boxes for hero
            SKUs. Ten product lines. Infinite configurations.
          </p>
        </motion.div>

        <div className="mb-10 flex flex-wrap gap-3">
          {filterChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                activeFilter === chip
                  ? "bg-kraft-500 text-forest-950"
                  : "border border-line bg-white text-ink-500 hover:border-kraft-500/30"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        <div className="hidden lg:grid lg:grid-cols-12 lg:auto-rows-[280px] gap-4">
          {products.map((product, i) => {
            const layout = bentoLayout[i];
            return (
              <div
                key={product.slug}
                style={{
                  gridColumn: `${layout.colStart} / ${layout.colEnd}`,
                  gridRow: `${layout.rowStart} / ${layout.rowEnd}`,
                }}
              >
                <ProductTile product={product} isLarge={i === 0} />
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          {products.map((product) => (
            <div key={product.slug} className="h-[360px]">
              <ProductTile product={product} isLarge={false} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
