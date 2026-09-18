import { ScrollText } from "lucide-react";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { SITE } from "@/lib/constants";

/**
 * Terms of Service — full terms copy arrives with data integration in Part 8.
 */
export default function Terms() {
  return (
    <ComingSoon
      icon={ScrollText}
      eyebrow="Legal"
      title="Terms of Service — Coming Soon"
      description={`Fair, readable terms are on the way. The spirit: scripts you generate with ${SITE.name} belong to you — use them freely on your channels. Questions? ${SITE.email}.`}
      partNote="Full terms in Part 8"
    />
  );
}
