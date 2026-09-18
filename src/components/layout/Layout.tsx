import { Outlet } from "react-router-dom";
import { useScrollTop } from "@/hooks/useScrollTop";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

/**
 * Shared site shell — Navbar + routed page content + Footer,
 * plus the global floating WhatsApp button on every page.
 */
export function Layout() {
  useScrollTop();

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
