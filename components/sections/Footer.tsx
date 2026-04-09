"use client";

import { Globe, Link2, Share2, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import { products, industries } from "@/lib/data";

const companyLinks = [
  "About",
  "Sustainability",
  "B.I.R.D. Lab",
  "News",
  "Careers",
  "Contact",
];

export default function Footer() {
  return (
    <footer className="bg-forest-900 pt-20 pb-8">
      <Container>
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-10 pb-16 md:grid-cols-3 lg:grid-cols-5">
          {/* Column 1: Wordmark + social */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <span className="font-display text-2xl font-medium text-cream-50">
              alt<span className="text-kraft-500">pac</span>
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream-50/50">
              India&apos;s largest sustainable paper packaging manufacturer. A
              Canpac Trends company.
            </p>
            <div className="mt-5 flex gap-3">
              {[Globe, Link2, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-cream-50/10 text-cream-50/50 transition-colors duration-200 hover:border-kraft-500/40 hover:text-kraft-500"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-kraft-500">
              Products
            </h4>
            <ul className="flex flex-col gap-2">
              {products.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`#${p.slug}`}
                    className="text-sm text-cream-50/50 transition-colors duration-200 hover:text-cream-50"
                  >
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industries */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-kraft-500">
              Industries
            </h4>
            <ul className="flex flex-col gap-2">
              {industries.map((ind) => (
                <li key={ind.name}>
                  <a
                    href="#industries"
                    className="text-sm text-cream-50/50 transition-colors duration-200 hover:text-cream-50"
                  >
                    {ind.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-kraft-500">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-cream-50/50 transition-colors duration-200 hover:text-cream-50"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-kraft-500">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3 text-sm text-cream-50/50">
              <p>Altpac — a Canpac Trends Pvt Ltd company</p>
              <p>
                Ahmedabad · Mumbai · Bengaluru
                <br />
                Chennai · Delhi NCR
              </p>
              <a
                href="mailto:hello@altpac.co"
                className="text-cream-50 transition-colors hover:text-kraft-500"
              >
                hello@altpac.co
              </a>
              <p>+91 XX XXXX XXXX</p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-cream-50/60 transition-colors hover:text-kraft-500"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar — single row, copyright left, tagline right */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cream-50/10 pt-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-cream-50/40">
            <span>© 2026 Altpac. All rights reserved.</span>
            <a href="#" className="hover:text-cream-50/60">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cream-50/60">
              Terms
            </a>
            <a href="#" className="hover:text-cream-50/60">
              Cookies
            </a>
          </div>
          <span className="font-display text-sm italic text-cream-50/30">
            Crafted with care for brands that ship at scale
          </span>
        </div>
      </Container>
    </footer>
  );
}
