"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { products } from "@/lib/data";

interface MegaDropdownProps {
  isOpen: boolean;
}

export default function MegaDropdown({ isOpen }: MegaDropdownProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute left-1/2 top-full mt-2 w-[680px] -translate-x-1/2 rounded-2xl border border-line p-6"
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(248, 243, 231, 0.92)",
          }}
        >
          <div className="mb-4">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-kraft-500">
              Our Products
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <a
                key={product.slug}
                href={`#${product.slug}`}
                className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors duration-150 hover:bg-forest-950/5"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-cream-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-forest-950">
                    {product.name}
                  </p>
                  <p className="text-xs text-ink-500 line-clamp-1">
                    {product.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
