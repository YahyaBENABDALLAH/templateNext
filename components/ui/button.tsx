import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      muted: "btn-muted",
      success: "btn-success",
      warning: "btn-warning",
      danger: "btn-danger",
      outline: "btn-outline",
      link: "btn-link",
      disabled: "btn-disabled",
    },
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
      xl: "btn-xl",
      icon: "btn-icon",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "sm",
  },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant  ,
      size   ,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = Boolean(disabled || loading || variant === "disabled")

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={!asChild ? isDisabled : undefined}
        aria-disabled={isDisabled || undefined}
        data-disabled={isDisabled ? "true" : undefined}
        data-variant={variant}
        data-size={size}
        type={!asChild ? type : undefined}
        aria-busy={loading || undefined}
        {...props}
      >
      {loading ? (
          <Loader2 className={cn("animate-spin", children ? "me-2" : "")} />
        ) : (
          leftIcon && <span className="me-2">{leftIcon}</span>
        )}
        <Slottable>{children}</Slottable>
        {!loading && rightIcon ? <span className="ms-2">{rightIcon}</span> : null}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
