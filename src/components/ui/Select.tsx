import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FieldVariant } from "@/components/ui/Input";

const variantStyles: Record<FieldVariant, string> = {
  light:
    "border-border-color bg-bg-card text-text-primary",
  dark: "border-text-light/15 bg-text-light/[0.06] text-text-light [&>option]:bg-bg-dark [&>option]:text-text-light",
};

const errorStyles: Record<FieldVariant, string> = {
  light: "border-error focus:border-error focus:ring-error/25",
  dark: "border-[#FCA5A5]/70 focus:border-[#FCA5A5] focus:ring-[#FCA5A5]/25",
};

const errorText: Record<FieldVariant, string> = {
  light: "text-error",
  dark: "text-[#FCA5A5]",
};

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  variant?: FieldVariant;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ variant = "light", error, className, id, children, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const errorId = `${fieldId}-error`;

    return (
      <span className="block">
        <span className="relative block">
          <select
            ref={ref}
            id={fieldId}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "w-full cursor-pointer appearance-none rounded-xl border px-4 py-3 pr-10 text-sm outline-none transition-all duration-200 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/30",
              variantStyles[variant],
              error && errorStyles[variant],
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown
            aria-hidden
            className={cn(
              "pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2",
              variant === "dark" ? "text-text-light/50" : "text-text-secondary"
            )}
          />
        </span>
        {error && (
          <span
            id={errorId}
            role="alert"
            className={cn("mt-1.5 block text-xs font-medium", errorText[variant])}
          >
            {error}
          </span>
        )}
      </span>
    );
  }
);

Select.displayName = "Select";
