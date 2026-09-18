import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { FieldVariant } from "@/components/ui/Input";

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

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: FieldVariant;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = "light", error, className, id, rows = 4, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const errorId = `${fieldId}-error`;

    return (
      <span className="block">
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/30",
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

Textarea.displayName = "Textarea";
