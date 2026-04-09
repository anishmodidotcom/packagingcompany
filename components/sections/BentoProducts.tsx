"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "motion/react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import Grain from "@/components/ui/Grain";
import { products } from "@/lib/data";

const filterChips = ["All", "By Industry", "By Material", "By Volume"];

const bentoLayout = [
  { colStart: 1, colEnd: 7, rowStart: 1, rowEnd: 3 },   // Luxury (large hero)
  { colStart: 7, colEnd: 10, rowStart: 1, rowEnd: 2 },   // E-commerce Boxes
  { colStart: 10, colEnd: 13, rowStart: 1, rowEnd: 2 },  // Retail Bags
  { colStart: 7, colEnd: 13, rowStart: 2, rowEnd: 3 },   // Custom Food (wide)
  { colStart: 1, colEnd: 5, rowStart: 3, rowEnd: 4 },    // Folding Cartons
  { colStart: 5, colEnd: 9, rowStart: 3, rowEnd: 4 },    // Rigid Boxes
  { colStart: 9, colEnd: 13, rowStart: 3, rowEnd: 4 },   // E-commerce Mailers
  { colStart: 1, colEnd: 5, rowStart: 4, rowEnd: 5 },    // SOS Bags
  { colStart: 5, colEnd: 9, rowStart: 4, rowEnd: 5 },    // V-Bottom Bags
  { colStart: 9, colEnd: 13, rowStart: 4, rowEnd: 5 },   // Sweetdisp
];

interface TileProps {
  product: (typeof products)[number];
  isLarge: boolean;
}

function ProductTile({ product, isLarge }: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || !tileRef.current) return;
      const rect = tileRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ rotateX: -y * 8, rotateY: x * 8 });
    },
    [prefersReducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setHovered(false);
  }, []);

  return (
    <motion.div
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white"
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* Image — always rendered, fills upper portion */}
      <div
        className="relative w-full shrink-0"
        style={{ flex: isLarge ? "1 1 0%" : "none", aspectRatio: isLarge ? undefined : "4/3" }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
        />
      </div>

      {/* Content */}
      <div className="relative flex shrink-0 flex-col gap-1 p-5">
        <h3 className="font-display text-lg font-medium text-forest-950 md:text-xl">
          {product.name}
        </h3>
        <p className="text-sm text-ink-500 line-clamp-1">{product.description}</p>
        <span className="mt-1 text-sm font-medium text-kraft-500 transition-colors duration-200 group-hover:text-kraft-600">
          Learn more →
        </span>
      </div>

      {/* Hover overlay with specs — only visible on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
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
        )}
      </AnimatePresence>
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
      className="relative bg-cream-50 py-24 md:py-32 lg:py-40 overflow-hidden"
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
              fontSize: "clamp(2.5rem, 4.5vw, 4.5rem)",
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

        {/* Filter chips */}
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

        {/* Bento grid — desktop */}
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

        {/* Mobile: stacked */}
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
