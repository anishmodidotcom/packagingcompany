"use client";

import { memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { plants } from "@/lib/data";

const WIDTH = 500;
const HEIGHT = 580;

// Pre-computed SVG path from India GeoJSON via d3-geo geoMercator projection
// center: [82, 23], scale: 900, translate: [250, 290]
const INDIA_PATH =
  "M184.027,64.226L187.168,121.08L195.022,139.603L202.876,152.451L210.73,167.021L218.584,176.067L226.438,188.657L242.146,202.943L257.854,211.818L273.562,211.818L289.27,215.357L304.978,220.653L320.686,229.448L336.394,252.139L344.248,264.257L352.102,281.452L359.956,307.002L367.81,310.388L378.805,303.612L391.372,298.517L403.938,303.612L407.08,320.518L418.075,312.08L427.5,298.517L430.642,290L422.788,281.452L430.642,264.257L446.35,241.697L462.058,227.692L477.765,220.653L485.619,217.123L490.332,206.498L485.619,199.382L469.911,194.027L462.058,202.943L446.35,211.818L430.642,220.653L422.788,229.448L414.934,246.925L407.08,255.609L399.226,255.609L391.372,246.925L375.664,246.925L367.81,252.139L359.956,264.257L359.956,281.452L358.385,293.41L352.102,301.915L344.248,307.002L328.54,315.458L320.686,323.885L304.978,340.656L289.27,360.64L278.274,368.925L265.708,378.835L254.712,393.638L242.146,406.737L234.292,423.038L226.438,439.263L223.296,453.805L221.726,463.47L218.584,487.537L215.442,498.726L210.73,514.667L199.735,521.03L187.168,530.562L179.314,533.736L171.46,519.44L163.606,503.513L155.752,490.737L144.757,474.718L138.473,463.47L136.903,447.349L130.619,431.16L125.907,423.038L119.624,406.737L113.341,385.423L108.628,370.579L105.487,355.658L102.345,342.327L97.633,328.928L94.491,320.518L89.779,315.458L78.783,322.202L69.358,325.567L64.646,328.928L53.65,322.202L42.655,318.833L33.23,308.696L45.796,303.612L50.509,293.41L41.084,286.585L37.942,276.307L45.796,267.707L53.65,246.925L61.504,229.448L77.212,208.273L94.491,194.027L114.912,176.067L129.049,159.751L122.765,141.444L116.482,117.351L124.336,98.578L155.752,83.402Z";

// Pre-computed pin positions from the same projection
const PIN_POSITIONS = [
  { x: 101.9, y: 289.6 },  // Ahmedabad
  { x: 106.7, y: 356.1 },  // Mumbai
  { x: 180.8, y: 455.9 },  // Bengaluru
  { x: 222.8, y: 454.1 },  // Chennai
  { x: 173.1, y: 190.4 },  // Delhi NCR
];

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
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto"
        role="img"
        aria-label="Map of India showing Altpac plant locations"
      >
        {/* India outline */}
        <path
          d={INDIA_PATH}
          fill="#D4C9AE"
          stroke="#1E5A4A"
          strokeWidth={2}
          strokeOpacity={0.6}
          strokeDasharray="4 4"
        />

        {/* Plant markers */}
        {PIN_POSITIONS.map((pos, i) => (
          <g
            key={plants[i].city}
            transform={`translate(${pos.x}, ${pos.y})`}
            onMouseEnter={() => setActivePlant(i)}
            onMouseLeave={() => setActivePlant(null)}
            onClick={() => setActivePlant(i)}
            style={{ cursor: "pointer" }}
          >
            {/* Pulsing ring */}
            {!prefersReducedMotion && (
              <motion.circle
                cx={0}
                cy={0}
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
                  delay: i * 0.4,
                  ease: "easeInOut",
                }}
              />
            )}

            {/* Core dot */}
            <motion.circle
              cx={0}
              cy={0}
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
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 500,
                fill: "#1E5A4A",
                opacity: 0.6,
              }}
            >
              {plants[i].city}
            </text>
          </g>
        ))}
      </svg>

      {/* Popover */}
      <AnimatePresence>
        {activePlant !== null && (
          <motion.div
            key={plants[activePlant].city}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-4 top-4 z-20 w-64 rounded-2xl border border-line bg-white/95 p-5 shadow-lg"
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
