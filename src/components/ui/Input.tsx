import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type FieldVariant = "light" | "dark";

const variantStyles: Record<FieldVariant, string> = {
  light:
    "border-border-color bg-bg-card text-text-primary placeholder:text-text-secondary/50",
  dark: "border-text-light/15 bg-text-light/[0.06] text-text-light placeholder:text-text-light/40",
};

const errorStyles: Record<FieldVariant, string> = {
  light: "border-error focus:border-error focus:ring-error/25",
  dark: "border-[#FCA5A5]/70 focus:border-[#FCA5A5] focus:ring-[#FCA5A5]/25",
};

const errorText: Record<FieldVariant, string> = {
  light: "text-error",
  dark: "text-[#FCA5A5]",
};

const baseFieldStyles =
  "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/30";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: FieldVariant;
  /** Error message — renders below the field and marks it invalid. */
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "light", error, className, id, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const errorId = `${fieldId}-error`;

    return (
      <span className="block">
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            baseFieldStyles,
            variantStyles[variant],
            error && errorStyles[variant],
            className
          )}
          {...props}
        />
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

Input.displayName = "Input";
