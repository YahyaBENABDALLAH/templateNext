"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/sidebar.context";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pe-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  badge,
  showChevron = false,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  badge?: React.ReactNode | null;
  showChevron?: boolean;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const isSlottable = asChild && React.isValidElement(children);
  const Comp = isSlottable ? Slot : "button";
  const { isMobile, state } = useSidebar();

  const renderContent = (content: React.ReactNode) => {
    const hasBadge = badge !== null && badge !== undefined;

    return (
      <>
        <span className="flex min-w-0 flex-1 items-center gap-2 [&>span:last-child]:truncate">
          {content}
        </span>
        {(hasBadge || showChevron) && (
          <span className=" flex shrink-0 items-center gap-1 text-sidebar-foreground/80 group-data-[collapsible=icon]:hidden">
            {hasBadge && <>{badge}</>}
            {showChevron && (
              <ChevronRight
                aria-hidden="true"
                data-slot="sidebar-menu-chevron"
                className="ms-1 size-4 shrink-0 text-sidebar-foreground/70 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            )}
          </span>
        )}
      </>
    );
  };

  const slottedChild =
    isSlottable && React.isValidElement(children)
      ? React.cloneElement(children, {}, renderContent(children.props.children))
      : null;

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className, " ")}
      {...props}
    >
      {isSlottable ? slottedChild : renderContent(children)}
    </Comp>
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

export { SidebarMenuButton };
