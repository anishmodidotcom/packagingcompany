"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import MegaDropdown from "./MegaDropdown";

const navLinks = [
  { label: "Products", href: "#products", hasMega: true },
  { label: "Industries", href: "#industries" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "About", href: "#about" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

export default function Nav({
  onSampleClick,
}: {
  onSampleClick: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out"
      style={{
        backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
        backgroundColor: scrolled ? "rgba(248, 243, 231, 0.85)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(26,26,26,0.08)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        {/* Wordmark */}
        <a href="#" className="flex flex-col">
          <span
            className={`font-display text-2xl font-medium tracking-tight transition-colors duration-300 ${
              scrolled ? "text-forest-950" : "text-cream-50"
            }`}
          >
            alt<span className="text-kraft-500">pac</span>
          </span>
          <span
            className={`-mt-1 text-[9px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
              scrolled ? "text-ink-500" : "text-cream-50/60"
            }`}
          >
            A Canpac Company
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.hasMega && setMegaOpen(true)}
              onMouseLeave={() => link.hasMega && setMegaOpen(false)}
            >
              <a
                href={link.href}
                className={`group relative inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${
                  scrolled
                    ? "text-forest-950 hover:text-kraft-600"
                    : "text-cream-50/80 hover:text-cream-50"
                }`}
              >
                {link.label}
                {link.hasMega && <ChevronDown className="h-3 w-3" />}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-kraft-500 transition-all duration-200 group-hover:w-full" />
              </a>
              {link.hasMega && <MegaDropdown isOpen={megaOpen} />}
            </div>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#contact"
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${
              scrolled
                ? "border-forest-950/20 text-forest-950 hover:bg-forest-950/5"
                : "border-cream-50/30 text-cream-50 hover:bg-cream-50/10"
            }`}
          >
            Talk to Sales
          </a>
          <button
            onClick={onSampleClick}
            className="rounded-full bg-kraft-500 px-5 py-2 text-sm font-medium text-forest-950 transition-colors duration-200 hover:bg-kraft-600"
          >
            Get a Quote
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden transition-colors duration-300 ${
            scrolled ? "text-forest-950" : "text-cream-50"
          }`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-80 overflow-y-auto bg-cream-50 shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className="font-display text-2xl font-medium text-forest-950">
                alt<span className="text-kraft-500">pac</span>
              </span>
              <button onClick={closeMobile} aria-label="Close menu">
                <X className="h-6 w-6 text-forest-950" />
              </button>
            </div>
            <div className="flex flex-col gap-1 p-6">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={closeMobile}
                  className="rounded-xl px-4 py-3 text-lg font-medium text-forest-950 transition-colors hover:bg-forest-950/5"
                >
                  {link.label}
                </a>
              ))}
              <hr className="my-4 border-line" />
              <a
                href="#contact"
                onClick={closeMobile}
                className="rounded-full border border-forest-950/20 px-5 py-3 text-center text-sm font-medium text-forest-950"
              >
                Talk to Sales
              </a>
              <button
                onClick={() => {
                  closeMobile();
                  onSampleClick();
                }}
                className="mt-2 rounded-full bg-kraft-500 px-5 py-3 text-sm font-medium text-forest-950"
              >
                Request a Sample
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
