import type { Metadata, Viewport } from "next";
import CustomCursor from "@/components/ui/CustomCursor";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0A2E26",
};

export const metadata: Metadata = {
  title: "Altpac — India's Largest Sustainable Paper Packaging Manufacturer",
  description:
    "One billion paper bags per year. Five plants across India. FSC, ISO, BRCS certified. Sustainable packaging at industrial scale for Fashion, Beauty, FMCG, E-commerce, and more. A Canpac Trends company.",
  metadataBase: new URL("https://altpac.co"),
  openGraph: {
    title: "Altpac — India's Largest Sustainable Paper Packaging Manufacturer",
    description:
      "Sustainable packaging at industrial scale. 5 plants, 70M+ units/month, 7 global certifications. A Canpac Trends company.",
    images: [
      {
        url: "https://cdn.prod.website-files.com/65f3ed84591ee1aee2e2a5f0/660db7689f79632a4292c0ee_Infrastructure-img-1.webp",
        width: 1200,
        height: 630,
        alt: "Altpac factory floor",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-cream-50 text-ink-900 font-body antialiased">
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
