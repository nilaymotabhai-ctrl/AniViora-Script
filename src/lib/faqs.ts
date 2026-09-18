import { ROUTES, SITE } from "@/lib/constants";

export interface FaqAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  /** Optional pill links rendered under the answer. */
  actions?: FaqAction[];
}

/**
 * Canonical FAQ dataset — the Home page previews the first 6,
 * the dedicated /faq page renders the full list.
 */
export const FAQS: FaqItem[] = [
  {
    question: "Is this really 100% free?",
    answer:
      "Yes! Completely free forever. No hidden charges, no subscription, no credit card required.",
  },
  {
    question: "How accurate are the generated Hindi scripts?",
    answer:
      "Our AI is specifically trained on viral Hindi animation content and uses natural bolchal/Bundeli Hindi. No mushkil Sanskrit words.",
  },
  {
    question: "Can I use these scripts for my YouTube channel commercially?",
    answer:
      "Absolutely! You own 100% rights to any script you generate. Use them for monetized videos.",
  },
  {
    question: "What formats can I download the scripts in?",
    answer:
      "You can download in PDF, DOCX, or TXT format. Or directly copy to clipboard.",
  },
  {
    question: "How long does it take to generate a script?",
    answer:
      "Typically 30-60 seconds for a complete script depending on length.",
  },
  {
    question: "Do I need to sign up or create an account?",
    answer:
      "No signup required! Just visit the generator page and start creating.",
    actions: [{ label: "Open Generator", href: ROUTES.generator }],
  },
  {
    question: "How is AniViora different from ChatGPT?",
    answer:
      "We're specifically trained for Hindi storytelling with proper viral structure, smart character selection, and cultural context.",
  },
  {
    question: "Can I edit the generated scripts?",
    answer:
      "Yes! The scripts are fully editable. Use them as-is or customize them.",
  },
  {
    question: "What if I need a custom script for a specific idea?",
    answer: `Contact our team via WhatsApp ${SITE.phone} or the contact form. We offer custom script services.`,
    actions: [
      { label: "WhatsApp Now", href: SITE.whatsappChatHref, external: true },
      { label: "Contact Form", href: ROUTES.contact },
    ],
  },
  {
    question: "How can I contact AniViora Craft?",
    answer: `Reach us at ${SITE.phone} or visit the Contact page. Based in Baldeogarh, Tikamgarh District, MP.`,
    actions: [
      { label: "Contact Page", href: ROUTES.contact },
      { label: `Call ${SITE.phone}`, href: SITE.phoneHref, external: true },
    ],
  },
];
