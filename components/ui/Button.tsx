"use client";

import { useRef, useState, useCallback, ReactNode, ButtonHTMLAttributes } from "react";
import { useReducedMotion } from "motion/react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  magnetic?: boolean;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-kraft-500 text-forest-950 hover:bg-kraft-600 font-medium",
  secondary:
    "border border-cream-50/30 text-cream-50 hover:bg-cream-50/10 font-medium",
  ghost:
    "border border-forest-950/20 text-forest-950 hover:bg-forest-950/5 font-medium",
};

export default function Button({
  variant = "primary",
  magnetic = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!magnetic || prefersReducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const dist = Math.sqrt(distX * distX + distY * distY);
      if (dist < 40) {
        setOffset({ x: distX * 0.15, y: distY * 0.15 });
      }
    },
    [magnetic, prefersReducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm transition-all duration-200 ${variantStyles[variant]} ${className}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
      {...props}
    >
      {children}
    </button>
  );
}
