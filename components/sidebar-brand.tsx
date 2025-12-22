"use client";

import Image from "next/image";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const LOGO_COMPACT_SRC = "/assets/logobkam.svg";
const LOGO_WIDE_SRC = "/assets/Logobkmwide.svg";

export function SidebarBrand() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size="lg"
          className={cn(
            "h-auto px-2  "
          )}
        >
          <div
            className={cn(
              "flex items-center" 
            )}
          >
            <Image
              src={isCollapsed ? LOGO_COMPACT_SRC : LOGO_WIDE_SRC}
              alt="Bank Al-Maghrib"
              width={isCollapsed ? 48 : 139}
              height={isCollapsed ? 48 : 32}
              className={isCollapsed ? "h-8 w-8" : "h-8 w-auto"}
              priority
            />
            <SidebarTrigger className={cn(isCollapsed ? "size-8" : "ms-auto")} />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
