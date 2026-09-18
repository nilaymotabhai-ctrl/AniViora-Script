import { KeyRound } from "lucide-react";
import { ComingSoon } from "@/components/sections/ComingSoon";

/**
 * Admin Login — Supabase-auth gated form arrives in Part 9.
 */
export default function AdminLogin() {
  return (
    <ComingSoon
      icon={KeyRound}
      eyebrow="Admin Area"
      title="Admin Login — Coming Soon"
      description="Secure founder access to the AniViora Craft dashboard — protected by Supabase authentication with a hardened login form."
      partNote="Arriving in Part 9"
    />
  );
}
