import { LayoutDashboard } from "lucide-react";
import { ComingSoon } from "@/components/sections/ComingSoon";

/**
 * Admin Dashboard — analytics, content & settings panels arrive in Part 10.
 */
export default function AdminDashboard() {
  return (
    <ComingSoon
      icon={LayoutDashboard}
      eyebrow="Admin Area"
      title="Admin Dashboard — Coming Soon"
      description="The mission-control panel: generation analytics, FAQ & content management, and site settings — gated behind admin authentication."
      partNote="Arriving in Part 10"
    />
  );
}
