import { Link } from "react-router-dom";
import { ROUTES, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import brandMark from "@/assets/brand.svg";

interface LogoProps {
  /** Invert text for dark backgrounds (footer). */
  dark?: boolean;
  className?: string;
}

/**
 * AniViora Craft logo — play-button monogram + wordmark.
 */
export function Logo({ dark = false, className }: LogoProps) {
  return (
    <Link
      to={ROUTES.home}
      aria-label={`${SITE.name} — Home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <img
        src={brandMark}
        alt=""
        width={36}
        height={36}
        className="size-9 rounded-[10px] transition-transform duration-300 ease-out group-hover:scale-105 group-hover:-rotate-3"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-lg font-bold tracking-tight",
            dark ? "text-text-light" : "text-text-primary"
          )}
        >
          AniViora{" "}
          <span className="text-accent-primary">Craft</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[10px] font-medium uppercase tracking-[0.16em]",
            dark ? "text-text-light/60" : "text-text-secondary"
          )}
        >
          {SITE.tagline}
        </span>
      </span>
    </Link>
  );
}
