"use client";

import { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { plants } from "@/lib/data";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@3/countries-110m.json";

// India ISO 3166-1 numeric code
const INDIA_ID = "356";

function PulsingRing({
  index,
  prefersReducedMotion,
}: {
  index: number;
  prefersReducedMotion: boolean | null;
}) {
  if (prefersReducedMotion) return null;
  return (
    <motion.circle
      r={6}
      fill="none"
      stroke="#C89A5B"
      strokeWidth={1.5}
      animate={{
        r: [6, 14, 6],
        opacity: [0.7, 0, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: index * 0.4,
        ease: "easeInOut",
      }}
    />
  );
}

function IndiaMap({
  activePlant,
  setActivePlant,
}: {
  activePlant: number | null;
  setActivePlant: (i: number | null) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[460px] mx-auto lg:mx-0">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [82, 22],
          scale: 1000,
        }}
        width={500}
        height={560}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies
              .filter((geo) => geo.id === INDIA_ID)
              .map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#F2EBD9"
                  stroke="#0A2E26"
                  strokeWidth={1.5}
                  strokeDasharray="2 4"
                  strokeOpacity={0.3}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
          }
        </Geographies>

        {/* Plant markers */}
        {plants.map((plant, i) => (
          <Marker
            key={plant.city}
            coordinates={plant.coordinates}
            onMouseEnter={() => setActivePlant(i)}
            onMouseLeave={() => setActivePlant(null)}
            onClick={() => setActivePlant(i)}
            style={{
              default: { cursor: "pointer" },
              hover: { cursor: "pointer" },
              pressed: { cursor: "pointer" },
            }}
          >
            {/* Pulsing outer ring */}
            <PulsingRing
              index={i}
              prefersReducedMotion={prefersReducedMotion}
            />

            {/* Core dot */}
            <motion.circle
              r={activePlant === i ? 8 : 6}
              fill="#C89A5B"
              stroke="#F8F3E7"
              strokeWidth={2}
              animate={{ r: activePlant === i ? 8 : 6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />

            {/* City label */}
            <text
              x={14}
              y={4}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                fontWeight: 500,
                fill: "#1E5A4A",
                opacity: 0.6,
              }}
            >
              {plant.city}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      {/* Popover card on hover */}
      <AnimatePresence>
        {activePlant !== null && (
          <motion.div
            key={plants[activePlant].city}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-4 z-20 w-64 -translate-x-1/2 rounded-2xl border border-line bg-white/95 p-5 shadow-lg"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-kraft-500">
              {plants[activePlant].name}
            </p>
            <p className="mt-1 font-display text-lg font-medium text-forest-950">
              {plants[activePlant].city},{" "}
              {plants[activePlant].state}
            </p>
            <div className="mt-3 space-y-1 text-sm text-ink-500">
              <p>
                <span className="font-medium text-ink-900">Capacity:</span>{" "}
                {plants[activePlant].capacity}
              </p>
              <p>
                <span className="font-medium text-ink-900">Specialty:</span>{" "}
                {plants[activePlant].specialty}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(IndiaMap);
