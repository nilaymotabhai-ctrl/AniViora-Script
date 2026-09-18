import { UserRound } from "lucide-react";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { SITE } from "@/lib/constants";

/** Our Founder — the founder story ships with the About page in Part 4. */
export default function Founder() {
  return (
    <ComingSoon
      icon={UserRound}
      eyebrow="Our Founder"
      title="Our Founder — Coming Soon"
      description={`The story of ${SITE.founder} — from Baldeogarh, Madhya Pradesh to building India's free Hindi animation script studio for thousands of creators.`}
      partNote="Arriving in Part 4"
    />
  );
}
