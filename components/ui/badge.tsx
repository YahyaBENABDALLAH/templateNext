import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("badge", {
  variants: {
    variant: {
      neutral: "badge-neutral",
      brand: "badge-brand",
      info: "badge-info",
      success: "badge-success",
      warning: "badge-warning",
      danger: "badge-danger",
    },
    size: {
      xs: "badge-xs",
      sm: "badge-sm",
      md: "badge-md",
      lg: "badge-lg",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "sm",
  },
});

type BadgeElement = React.ComponentRef<"span">;

export interface BadgeProps
  extends Omit<React.ComponentPropsWithoutRef<"span">, "children">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

const Badge = React.forwardRef<BadgeElement, BadgeProps>(
  (
    {
      asChild = false,
      className,
      variant = "neutral",
      size = "sm",
      label,
      leftIcon,
      rightIcon,
      children,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "span";
    const content = children ?? label;
    const computedLabel =
      ariaLabel || (typeof content === "string" ? content : label);

    return (
      <Comp
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        data-slot="badge"
        data-variant={variant}
        data-size={size}
        aria-label={computedLabel}
        {...props}
      >
        {leftIcon ? (
          <span className="badge-icon" aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}
        {content ? <span className="badge-text">{content}</span> : null}
        {rightIcon ? (
          <span className="badge-icon" aria-hidden="true">
            {rightIcon}
          </span>
        ) : null}
      </Comp>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
