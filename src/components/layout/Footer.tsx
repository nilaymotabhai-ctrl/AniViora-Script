import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { FOOTER_COLUMNS, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { currentYear } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/ui/BrandIcons";

const SOCIAL_ICONS: Record<
  string,
  ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  YouTube: YoutubeIcon,
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
};

const ABOUT_CONTACT = [
  { icon: MapPin, label: SITE.location.short, href: undefined, ariaLabel: "Location" },
  { icon: Phone, label: SITE.phone, href: SITE.phoneHref, ariaLabel: "Phone" },
  { icon: Mail, label: SITE.email, href: SITE.emailHref, ariaLabel: "Email" },
];

/**
 * Site footer — deep purple band, 4 responsive columns:
 * About / Product / Company / Support + bottom legal bar.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bg-dark text-text-light">
      {/* Terracotta hairline + ambient glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-primary/70 to-transparent"
      />
      <div
        aria-hidden
        className="texture-dots-dark pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-accent-primary/10 blur-3xl"
      />

      <Container className="relative py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr]">
          {/* ---------- Column 1: About ---------- */}
          <div>
            <Logo dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-text-light/65">
              Where Stories Come Alive. India's #1 FREE Hindi Animation Script
              Generator.
            </p>

            <ul className="mt-5 space-y-2.5">
              {ABOUT_CONTACT.map(({ icon: Icon, label, href, ariaLabel }) => (
                <li key={label} className="flex items-start gap-2.5">
                  <Icon
                    className="mt-0.5 size-4 shrink-0 text-accent-primary"
                    aria-label={ariaLabel}
                  />
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-text-light/65 transition-colors hover:text-accent-primary"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-sm text-text-light/65">{label}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <ul className="mt-6 flex items-center gap-3" aria-label="Social media">
              {SOCIAL_LINKS.map(({ label, href }) => {
                const Icon = SOCIAL_ICONS[label];
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${SITE.name} on ${label}`}
                      className="flex size-10 items-center justify-center rounded-full border border-text-light/15 bg-text-light/5 text-text-light/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-primary hover:bg-accent-primary hover:text-text-light"
                    >
                      <Icon className="size-4" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ---------- Columns 2–4: Link groups ---------- */}
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-label={`Footer — ${column.title}`}>
              <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-text-light/85">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-accent-primary"
                />
                {column.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="group inline-flex items-center gap-2 text-sm text-text-light/60 transition-colors hover:text-accent-primary"
                    >
                      <span
                        aria-hidden
                        className="h-px w-0 bg-accent-primary transition-all duration-300 group-hover:w-3"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-text-light/10 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-text-light/50">
            © {currentYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="inline-flex flex-wrap items-center justify-center gap-1.5 text-xs text-text-light/50">
            Made with
            <Heart
              className="size-3.5 fill-accent-primary text-accent-primary"
              aria-label="love"
            />
            in Baldeogarh, MP, India by{" "}
            <span className="font-semibold text-text-light/80">
              {SITE.founder}
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
