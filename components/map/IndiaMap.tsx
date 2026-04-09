"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { plants, Plant } from "@/lib/data";

// Simplified SVG outline of India — stylised, artistic, not cartographically exact.
// Uses bezier curves capturing: wide north, Kathiawar peninsula left, pointed south.
const INDIA_PATH = `
M 210,45
C 195,48 175,55 160,65
C 148,73 140,80 132,90
C 124,100 118,108 115,118
C 108,135 105,148 108,160
L 112,175
C 114,185 118,195 122,205
C 125,212 128,218 130,225
C 132,235 130,242 125,252
C 118,265 112,275 108,288
L 105,295
C 103,302 100,310 98,318
C 95,330 92,340 90,348
C 88,356 87,365 88,372
C 90,380 92,388 95,395
C 98,405 102,412 108,418
C 115,428 122,435 130,440
C 138,445 148,452 158,458
C 168,464 175,470 180,478
C 184,485 188,492 192,498
C 195,505 198,510 200,518
C 202,525 205,530 210,535
C 215,540 218,542 222,540
C 228,535 232,528 238,520
C 242,512 245,505 248,498
C 252,488 255,480 258,472
C 262,462 265,452 268,442
C 270,435 272,428 275,420
C 278,412 280,405 282,398
C 285,388 288,378 290,368
C 292,360 293,352 292,345
C 290,335 288,328 285,320
C 282,312 278,305 275,298
C 272,288 270,280 268,272
C 265,262 262,252 260,242
C 258,232 256,222 255,212
C 254,202 255,192 258,182
C 260,175 262,168 265,162
C 268,155 270,148 272,140
C 275,130 278,120 280,112
C 282,105 282,98 280,92
C 275,82 268,75 260,68
C 252,62 245,58 238,55
C 230,52 222,48 210,45 Z
`;

// Gujarat/Kathiawar peninsula extension
const GUJARAT_PATH = `
M 108,160
C 98,158 88,160 80,168
C 72,178 68,190 70,202
C 72,212 75,218 80,222
C 85,228 90,235 95,240
C 100,248 105,255 108,262
C 110,268 112,272 115,275
C 118,268 118,262 118,255
C 118,248 120,242 125,252
`;

function PulsingPin({
  plant,
  isActive,
  index,
  onHover,
  onClick,
}: {
  plant: Plant;
  isActive: boolean;
  index: number;
  onHover: (i: number | null) => void;
  onClick: (i: number) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <g
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(index)}
      className="cursor-pointer"
    >
      {/* Pulsing ring */}
      {!prefersReducedMotion && (
        <motion.circle
          cx={plant.x}
          cy={plant.y}
          r={8}
          fill="none"
          stroke="#C89A5B"
          strokeWidth={1.5}
          animate={{
            r: [8, 16, 8],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.4,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Core dot */}
      <motion.circle
        cx={plant.x}
        cy={plant.y}
        r={isActive ? 7 : 5}
        fill="#C89A5B"
        stroke="#F8F3E7"
        strokeWidth={2}
        animate={{ r: isActive ? 7 : 5 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </g>
  );
}

export default function IndiaMap({
  activePlant,
  setActivePlant,
}: {
  activePlant: number | null;
  setActivePlant: (i: number | null) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-[400px] mx-auto lg:mx-0">
      <motion.svg
        viewBox="0 0 360 580"
        className="w-full h-auto"
        animate={
          prefersReducedMotion
            ? {}
            : { rotate: [0, 0.3, 0, -0.3, 0] }
        }
        transition={
          prefersReducedMotion
            ? {}
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {/* India outline */}
        <path
          d={INDIA_PATH}
          fill="none"
          stroke="#1E5A4A"
          strokeWidth={1.5}
          strokeDasharray="3 5"
          opacity={0.6}
        />
        <path
          d={GUJARAT_PATH}
          fill="none"
          stroke="#1E5A4A"
          strokeWidth={1.5}
          strokeDasharray="3 5"
          opacity={0.6}
        />

        {/* Faint fill */}
        <path d={INDIA_PATH} fill="#1E5A4A" opacity={0.05} />

        {/* Plant pins */}
        {plants.map((plant, i) => (
          <PulsingPin
            key={plant.city}
            plant={plant}
            isActive={activePlant === i}
            index={i}
            onHover={setActivePlant}
            onClick={setActivePlant}
          />
        ))}

        {/* City labels */}
        {plants.map((plant) => (
          <text
            key={`label-${plant.city}`}
            x={plant.x + 14}
            y={plant.y + 4}
            fill="#1E5A4A"
            fontSize={11}
            fontFamily="var(--font-body)"
            fontWeight={500}
            opacity={0.5}
          >
            {plant.city}
          </text>
        ))}
      </motion.svg>

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
