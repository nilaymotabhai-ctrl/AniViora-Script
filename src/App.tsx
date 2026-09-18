import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "@/lib/constants";
import { Layout } from "@/components/layout/Layout";

// Public pages
import Home from "@/pages/Home";
import Generator from "@/pages/Generator";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

// Content pages (footer destinations, filled in later parts)
import Examples from "@/pages/Examples";
import Blog from "@/pages/Blog";
import Features from "@/pages/Features";
import Founder from "@/pages/Founder";
import Careers from "@/pages/Careers";

// Admin pages
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";

/**
 * AniViora Craft — application root.
 * All routes are wrapped in the shared Layout (Navbar + Footer).
 * Route protection for /admin arrives with Supabase auth in Part 9.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Public */}
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.generator} element={<Generator />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.contact} element={<Contact />} />
          <Route path={ROUTES.faq} element={<FAQ />} />
          <Route path={ROUTES.privacy} element={<Privacy />} />
          <Route path={ROUTES.terms} element={<Terms />} />

          {/* Content */}
          <Route path={ROUTES.examples} element={<Examples />} />
          <Route path={ROUTES.blog} element={<Blog />} />
          <Route path={ROUTES.features} element={<Features />} />
          <Route path={ROUTES.founder} element={<Founder />} />
          <Route path={ROUTES.careers} element={<Careers />} />

          {/* Admin (guarded from Part 9) */}
          <Route path={ROUTES.adminLogin} element={<AdminLogin />} />
          <Route path={ROUTES.adminDashboard} element={<AdminDashboard />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
