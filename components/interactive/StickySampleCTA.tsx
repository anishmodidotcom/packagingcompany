"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Package } from "lucide-react";

export default function StickySampleCTA({
  onClick,
}: {
  onClick: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={onClick}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-kraft-500 px-6 py-3.5 text-sm font-medium text-forest-950 shadow-lg shadow-forest-950/10 transition-colors duration-200 hover:bg-kraft-600"
        >
          <Package className="h-4 w-4" />
          <span className="hidden sm:inline">Request a Sample</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
