"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface InlineCTAProps {
  headline: string;
  subhead: string;
  primaryLabel: string;
  secondaryLabel: string;
  variant?: "cream" | "forest";
  onPrimaryClick?: () => void;
}

export default function InlineCTA({
  headline,
  subhead,
  primaryLabel,
  secondaryLabel,
  variant = "cream",
  onPrimaryClick,
}: InlineCTAProps) {
  const isDark = variant === "forest";

  return (
    <section
      className={`border-y py-20 ${
        isDark
          ? "border-cream-50/10 bg-forest-950"
          : "border-line bg-cream-50"
      }`}
    >
      <Container>
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h3
              className={`font-display text-2xl font-medium md:text-3xl ${
                isDark ? "text-cream-50" : "text-forest-950"
              }`}
              style={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}
            >
              {headline}
            </h3>
            <p
              className={`mt-3 text-base leading-relaxed ${
                isDark ? "text-cream-50/60" : "text-ink-500"
              }`}
            >
              {subhead}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              variant="primary"
              onClick={onPrimaryClick}
              className="text-sm"
            >
              {primaryLabel}
            </Button>
            <Button
              variant={isDark ? "secondary" : "ghost"}
              className="text-sm"
            >
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
