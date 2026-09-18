import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type CardPadding = "none" | "sm" | "md" | "lg";

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8 md:p-10",
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  /** Adds a subtle lift + deeper shadow on hover. */
  hoverable?: boolean;
  /** Render on the light-peach info background instead of white. */
  info?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { padding = "md", hoverable = false, info = false, className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-card border shadow-card transition-all duration-300 ease-out",
          info
            ? "border-border-color/70 bg-bg-info"
            : "border-border-color bg-bg-card",
          hoverable &&
            "hover:-translate-y-1 hover:border-accent-primary/30 hover:shadow-card-hover",
          paddingStyles[padding],
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

/* ---------- Optional sub-components for structure ---------- */

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4 space-y-1.5", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-h4 font-heading", className)} {...props} />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-text-secondary", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-6 flex items-center gap-3", className)}
      {...props}
    />
  );
}
