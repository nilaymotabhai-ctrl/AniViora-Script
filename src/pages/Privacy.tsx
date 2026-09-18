import { ShieldCheck } from "lucide-react";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { SITE } from "@/lib/constants";

/**
 * Privacy Policy — full policy copy arrives with data integration in Part 8.
 */
export default function Privacy() {
  return (
    <ComingSoon
      icon={ShieldCheck}
      eyebrow="Legal"
      title="Privacy Policy — Coming Soon"
      description={`We are drafting a clear, honest privacy policy. The short version: ${SITE.name} is free, and we will never sell your data. Questions? Write to ${SITE.email}.`}
      partNote="Full policy in Part 8"
    />
  );
}
