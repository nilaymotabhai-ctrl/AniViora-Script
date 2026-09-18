import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type ContainerSize = "default" | "narrow" | "wide" | "full";

const sizeStyles: Record<ContainerSize, string> = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
  full: "max-w-none",
};

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  /** Remove horizontal padding (edge-to-edge content). */
  bleed?: boolean;
}

/**
 * Centered page container — max-w-7xl with responsive padding by default.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "default", bleed = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          sizeStyles[size],
          !bleed && "px-4 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";
