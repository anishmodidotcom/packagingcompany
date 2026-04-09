"use client";

export default function SectionEyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block font-body text-xs font-medium uppercase tracking-[0.15em] text-kraft-500 ${className}`}
    >
      {children}
    </span>
  );
}
