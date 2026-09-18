import { Briefcase } from "lucide-react";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { SITE } from "@/lib/constants";

/** Careers — collaboration and contributor openings ship in a later part. */
export default function Careers() {
  return (
    <ComingSoon
      icon={Briefcase}
      eyebrow="Careers"
      title="Careers — Coming Soon"
      description={`Want to help India's creators tell better stories? Volunteer, contributor and collaboration openings will appear here. Reach out anytime at ${SITE.email}.`}
      partNote="Arriving in a later part"
    />
  );
}
