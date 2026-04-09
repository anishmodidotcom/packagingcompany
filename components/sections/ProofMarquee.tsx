"use client";

const items = [
  "1 Billion Bags / Year",
  "5 Plants Across India",
  "70M+ Units / Month",
  "1 Million Sq Ft",
  "FSC Certified",
  "ISO Certified",
  "BRCS · Sedex · SMETA · CTPAT · FSSC 22000",
  "Trusted by Lazzaro · Wilde & Co",
  "Zero Plastic by Design",
];

export default function ProofMarquee() {
  return (
    <section className="relative border-y border-line bg-cream-100 py-6 overflow-hidden">
      <div className="animate-marquee flex w-max items-center whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-display text-lg font-medium text-forest-950 md:text-2xl"
              style={{ letterSpacing: "-0.01em" }}
            >
              {item}
            </span>
            <span className="mx-6 inline-block h-2 w-2 shrink-0 rounded-full bg-kraft-500 md:mx-8" />
          </span>
        ))}
      </div>
    </section>
  );
}
