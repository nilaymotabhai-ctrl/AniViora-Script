import { motion } from "framer-motion";
import { SITE } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

const WHATSAPP_GREEN = "#25D366";

/**
 * Global floating WhatsApp button — fixed bottom-right on every page
 * (mounted once in Layout). Pulsing glow, hover scale + tooltip.
 */
export function WhatsAppFloat() {
  return (
    <motion.a
      href={SITE.whatsappChatHref}
      target="_blank"
      rel="noreferrer"
      aria-label={`Chat with ${SITE.name} on WhatsApp`}
      className="group fixed bottom-5 right-5 z-[70] sm:bottom-6 sm:right-6"
      initial={{ opacity: 0, scale: 0, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 1.1,
        type: "spring",
        stiffness: 260,
        damping: 16,
      }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      {/* Pulse ring */}
      <span
        aria-hidden
        className="absolute inset-0 animate-ping rounded-full opacity-30 [animation-duration:2.4s]"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      />

      {/* Button */}
      <span
        className="relative flex size-14 items-center justify-center rounded-full text-white shadow-[0_12px_32px_-8px_rgba(37,211,102,0.65)] transition-shadow duration-300 group-hover:shadow-[0_16px_40px_-8px_rgba(37,211,102,0.8)]"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      >
        <WhatsAppIcon className="size-7" aria-hidden />
      </span>

      {/* Hover tooltip (desktop) */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full bg-bg-dark px-3.5 py-2 text-xs font-semibold text-text-light opacity-0 shadow-card-hover transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block"
      >
        Chat with us
      </span>
    </motion.a>
  );
}
