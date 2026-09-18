/**
 * AniViora Craft — Global site constants.
 * Single source of truth for company info, routes and navigation.
 */

export const SITE = {
  name: "AniViora Craft",
  tagline: "Where Stories Come Alive",
  hindiTagline: "Kahaniyan Jahan Zinda Hoti Hain",
  description:
    "Free AI-powered Hindi 2D animation script generator for YouTube creators.",
  founder: "Dev Chaurasiya",
  location: {
    line1: "Baldeogarh, Tikamgarh District",
    line2: "Madhya Pradesh 472111, India",
    full: "Baldeogarh, Tikamgarh District, Madhya Pradesh 472111, India",
    short: "Baldeogarh, Tikamgarh, Madhya Pradesh, India",
  },
  phone: "+91 7067967637",
  phoneHref: "tel:+917067967637",
  whatsapp: "+91 7067967637",
  whatsappHref: "https://wa.me/917067967637",
  whatsappMessage:
    "Namaste! AniViora Craft se custom script ke bare mein baat karni thi.",
  whatsappChatHref: `https://wa.me/917067967637?text=${encodeURIComponent(
    "Namaste! AniViora Craft se custom script ke bare mein baat karni thi."
  )}`,
  email: "contact@anivioracraft.com",
  emailHref: "mailto:contact@anivioracraft.com",
} as const;

export const ROUTES = {
  home: "/",
  generator: "/generator",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
  privacy: "/privacy",
  terms: "/terms",
  // Content pages (ship fully in later parts)
  examples: "/examples",
  blog: "/blog",
  features: "/features",
  founder: "/founder",
  careers: "/careers",
  // Admin
  adminLogin: "/admin/login",
  adminDashboard: "/admin",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export interface NavLinkItem {
  label: string;
  path: RoutePath;
}

/** Primary navigation shown in the Navbar. */
export const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", path: ROUTES.home },
  { label: "Generator", path: ROUTES.generator },
  { label: "About", path: ROUTES.about },
  { label: "Contact", path: ROUTES.contact },
  { label: "FAQ", path: ROUTES.faq },
];

/** Footer column structure. */
export const FOOTER_COLUMNS: { title: string; links: NavLinkItem[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Script Generator", path: ROUTES.generator },
      { label: "Examples Gallery", path: ROUTES.examples },
      { label: "Blog", path: ROUTES.blog },
      { label: "Features", path: ROUTES.features },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: ROUTES.about },
      { label: "Our Founder", path: ROUTES.founder },
      { label: "Contact", path: ROUTES.contact },
      { label: "Careers", path: ROUTES.careers },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", path: ROUTES.faq },
      { label: "Contact Support", path: ROUTES.contact },
      { label: "Privacy Policy", path: ROUTES.privacy },
      { label: "Terms of Service", path: ROUTES.terms },
    ],
  },
];

/** Social profiles (icons resolved by label in the Footer). */
export const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://youtube.com/@AniVioraCraft" },
  { label: "Instagram", href: "https://instagram.com/anivioracraft" },
  { label: "Facebook", href: "https://facebook.com/anivioracraft" },
  { label: "Twitter", href: "https://twitter.com/anivioracraft" },
] as const;
