import {
  PRODUCT_LUXURY,
  PRODUCT_ECOMMERCE_BOXES,
  PRODUCT_RETAIL_BAGS,
  PRODUCT_CUSTOM_FOOD,
  PRODUCT_FOLDING_CARTONS,
  PRODUCT_RIGID_BOXES,
  PRODUCT_ECOMMERCE_MAILERS,
  PRODUCT_SOS_BAGS,
  PRODUCT_VBOTTOM_BAGS,
  PRODUCT_SWEETDISP,
  CERT_ISO,
  CERT_FSC,
  CERT_CTPAT,
  CERT_BRCS,
  CERT_SEDEX,
  CERT_SMETA,
  CERT_FSSC,
  BEAUTY_BLACK_BOX,
  TSHIRT_MAILER,
  BAGEL_KRAFT,
  LAZZARO_MAILER,
  PRODUCT_RETAIL_BAGS as RETAIL_IMG,
  GOLD_RIGID_BOX,
  PRODUCT_CUSTOM_FOOD as HEALTH_IMG,
  KRAFT_SHOPPING_BAG,
  DONUT_BAG,
  FACTORY_FLOOR,
  AERIAL_PLANT,
  DELIVERY_TRUCK,
  PRODUCT_DISPLAY,
} from "./images";

export interface Product {
  name: string;
  slug: string;
  image: string;
  description: string;
  moq: string;
  leadTime: string;
  materials: string;
}

export const products: Product[] = [
  {
    name: "Luxury Packaging",
    slug: "luxury-packaging",
    image: PRODUCT_LUXURY,
    description: "Premium rigid boxes, magnetic closures, foil stamping",
    moq: "2,500 units",
    leadTime: "4 weeks",
    materials: "FSC rigid board, specialty papers, water-based inks",
  },
  {
    name: "E-commerce Boxes",
    slug: "ecommerce-boxes",
    image: PRODUCT_ECOMMERCE_BOXES,
    description: "Corrugated mailer boxes engineered for transit",
    moq: "5,000 units",
    leadTime: "3 weeks",
    materials: "FSC-certified corrugated, water-based inks",
  },
  {
    name: "Retail Bags",
    slug: "retail-bags",
    image: PRODUCT_RETAIL_BAGS,
    description: "Branded paper bags for in-store retail",
    moq: "10,000 units",
    leadTime: "2 weeks",
    materials: "FSC kraft, twisted/flat handles, water-based inks",
  },
  {
    name: "Custom Food Packaging",
    slug: "custom-food-packaging",
    image: PRODUCT_CUSTOM_FOOD,
    description: "Food-safe packaging for QSR and food brands",
    moq: "10,000 units",
    leadTime: "3 weeks",
    materials: "FSSC 22000 certified, grease-resistant kraft",
  },
  {
    name: "Folding Cartons",
    slug: "folding-cartons",
    image: PRODUCT_FOLDING_CARTONS,
    description: "Precision-cut cartons for shelf-ready packaging",
    moq: "5,000 units",
    leadTime: "3 weeks",
    materials: "SBS/FBB board, UV/aqueous coatings",
  },
  {
    name: "Rigid Boxes",
    slug: "rigid-boxes",
    image: PRODUCT_RIGID_BOXES,
    description: "Handcrafted rigid boxes for premium products",
    moq: "2,500 units",
    leadTime: "4 weeks",
    materials: "Greyboard, specialty wraps, magnetic closures",
  },
  {
    name: "E-commerce Mailers",
    slug: "ecommerce-mailers",
    image: PRODUCT_ECOMMERCE_MAILERS,
    description: "Flat-pack mailers built for last-mile delivery",
    moq: "5,000 units",
    leadTime: "2 weeks",
    materials: "FSC kraft, peel-and-seal closures",
  },
  {
    name: "SOS Bags",
    slug: "sos-bags",
    image: PRODUCT_SOS_BAGS,
    description: "Square-bottom bags for food and retail",
    moq: "25,000 units",
    leadTime: "2 weeks",
    materials: "FSC kraft, food-safe coatings",
  },
  {
    name: "V-Bottom Bags",
    slug: "v-bottom-bags",
    image: PRODUCT_VBOTTOM_BAGS,
    description: "Classic V-bottom bags for bakeries and grocery",
    moq: "25,000 units",
    leadTime: "2 weeks",
    materials: "Natural kraft, grease-resistant options",
  },
  {
    name: "Sweetdisp",
    slug: "sweetdisp",
    image: PRODUCT_SWEETDISP,
    description: "Food-safe disposables sub-brand",
    moq: "10,000 units",
    leadTime: "2 weeks",
    materials: "Food-grade paperboard, compostable coatings",
  },
];

export interface Industry {
  name: string;
  image: string;
  description: string;
  clients: string[];
}

export const industries: Industry[] = [
  {
    name: "Fashion",
    image: TSHIRT_MAILER,
    description:
      "Custom retail bags and mailers for fashion brands. Matte and gloss lamination, embossed logos, sustainable kraft options.",
    clients: ["Wilde & Co", "Client Logo", "Client Logo"],
  },
  {
    name: "Beauty",
    image: BEAUTY_BLACK_BOX,
    description:
      "Custom rigid boxes for premium beauty SKUs. Matte lamination, magnetic closure, FSC-certified board.",
    clients: ["Client Logo", "Client Logo", "Client Logo"],
  },
  {
    name: "E-commerce",
    image: LAZZARO_MAILER,
    description:
      "Transit-ready mailer boxes and flat-pack solutions built for last-mile delivery. Designed to survive the supply chain.",
    clients: ["Lazzaro", "Client Logo", "Client Logo"],
  },
  {
    name: "Electronics",
    image: PRODUCT_RIGID_BOXES,
    description:
      "Precision-fit packaging with foam inserts and anti-static options. Protection engineered for fragile products.",
    clients: ["Client Logo", "Client Logo", "Client Logo"],
  },
  {
    name: "FMCG",
    image: RETAIL_IMG,
    description:
      "High-volume folding cartons and retail-ready packaging. Shelf appeal at scale, with fast turnaround.",
    clients: ["Client Logo", "Client Logo", "Client Logo"],
  },
  {
    name: "Food",
    image: BAGEL_KRAFT,
    description:
      "FSSC 22000 certified food-contact packaging. Grease-resistant, microwave-safe, compostable options available.",
    clients: ["Lazzaro", "Client Logo", "Client Logo"],
  },
  {
    name: "Grocery",
    image: KRAFT_SHOPPING_BAG,
    description:
      "SOS bags, V-bottom bags, and branded carriers for grocery chains. Built for volume. Built for reuse.",
    clients: ["Client Logo", "Client Logo", "Client Logo"],
  },
  {
    name: "Health",
    image: DONUT_BAG,
    description:
      "Tamper-evident, food-safe, and pharma-compliant packaging solutions. Certified for the most regulated supply chains.",
    clients: ["Client Logo", "Client Logo", "Client Logo"],
  },
];

export interface Plant {
  name: string;
  city: string;
  state: string;
  capacity: string;
  specialty: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export const plants: Plant[] = [
  {
    name: "Flagship Plant",
    city: "Ahmedabad",
    state: "Gujarat",
    capacity: "25M+ units/month",
    specialty: "Folding cartons + luxury packaging",
    coordinates: [72.5714, 23.0225],
  },
  {
    name: "West Hub",
    city: "Mumbai",
    state: "Maharashtra",
    capacity: "15M+ units/month",
    specialty: "E-commerce + retail bags",
    coordinates: [72.8777, 19.076],
  },
  {
    name: "South-West Facility",
    city: "Bengaluru",
    state: "Karnataka",
    capacity: "12M+ units/month",
    specialty: "Custom food packaging + Sweetdisp",
    coordinates: [77.5946, 12.9716],
  },
  {
    name: "South Hub",
    city: "Chennai",
    state: "Tamil Nadu",
    capacity: "10M+ units/month",
    specialty: "Rigid boxes + export",
    coordinates: [80.2707, 13.0827],
  },
  {
    name: "North India Hub",
    city: "Delhi NCR",
    state: "Delhi",
    capacity: "8M+ units/month",
    specialty: "North India distribution + e-commerce boxes",
    coordinates: [77.1025, 28.7041],
  },
];

export interface Certification {
  name: string;
  fullName: string;
  image: string;
  description: string;
  whyItMatters: string;
}

export const certifications: Certification[] = [
  {
    name: "ISO",
    fullName: "International Organization for Standardization",
    image: CERT_ISO,
    description: "Certifies quality management systems across our operations.",
    whyItMatters: "Your ops team knows exactly what this means.",
  },
  {
    name: "FSC",
    fullName: "Forest Stewardship Council",
    image: CERT_FSC,
    description:
      "Certifies that paper fibers come from responsibly managed forests.",
    whyItMatters:
      "Mandatory for most European and US retail buyers.",
  },
  {
    name: "BRCS",
    fullName: "BRC Global Standard Food Safety",
    image: CERT_BRCS,
    description:
      "Certifies food-contact packaging meets global safety protocols.",
    whyItMatters:
      "Required for supplying major grocery and QSR chains.",
  },
  {
    name: "Sedex",
    fullName: "Supplier Ethical Data Exchange",
    image: CERT_SEDEX,
    description:
      "Certifies ethical labor and sustainable sourcing across the supply chain.",
    whyItMatters:
      "ESG teams audit against Sedex before approving vendors.",
  },
  {
    name: "SMETA",
    fullName: "Sedex Members Ethical Trade Audit",
    image: CERT_SMETA,
    description:
      "A four-pillar audit of labor, health, environment, and business ethics.",
    whyItMatters: "The most widely accepted ethical audit globally.",
  },
  {
    name: "CTPAT",
    fullName: "Customs-Trade Partnership Against Terrorism",
    image: CERT_CTPAT,
    description:
      "Certifies secure supply chain compliance for US-bound shipments.",
    whyItMatters: "Smooth customs clearance for exports to the US.",
  },
  {
    name: "FSSC 22000",
    fullName: "Food Safety System Certification",
    image: CERT_FSSC,
    description:
      "GFSI-recognized certification for food packaging manufacturers.",
    whyItMatters:
      "Required for Nestlé, Unilever, and most global CPG brands.",
  },
];

export const stats = [
  { value: 5, suffix: "", label: "Plants across India" },
  { value: 70, suffix: "M+", label: "Units per month" },
  { value: 1, suffix: "M", label: "Sq ft factory space" },
  { value: 1, suffix: "B+", label: "Paper bags per year" },
] as const;

export const impactStats = [
  { value: 98, suffix: "%", label: "of core SKUs are recyclable", icon: "Recycle" as const },
  { value: 12000, suffix: "", label: "tonnes of plastic displaced per year", icon: "TrendingDown" as const },
  { value: 45, suffix: "%", label: "of plant energy from renewables", icon: "Leaf" as const },
  { value: 2030, suffix: "", label: "target for net zero operations", icon: "Target" as const, isYear: true },
] as const;

export const infrastructurePanels = [
  {
    image: FACTORY_FLOOR,
    eyebrow: "THE FACTORY",
    headline: "5 plants. 1M+ sq ft. Running around the clock.",
    span: "col-span-7" as const,
  },
  {
    image: AERIAL_PLANT,
    eyebrow: "THE SCALE",
    headline: "Largest paper bag manufacturer in India.",
    span: "col-span-5" as const,
  },
  {
    image: DELIVERY_TRUCK,
    eyebrow: "THE FLEET",
    headline: "Company-owned trucks. Same-day dispatch across India.",
    span: "col-span-5" as const,
  },
  {
    image: FACTORY_FLOOR,
    eyebrow: "THE MACHINERY",
    headline: "Koenig & Bauer. BOBST. Kongsberg. AOKE. The industry's best.",
    span: "col-span-7" as const,
    objectPosition: "70% center",
  },
];
