"use client"

import Link from "next/link"

import { Folder, Forward, MoreHorizontal, Trash2 } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { useI18n } from "@/context/i18n.context"
import { type ProjectNavItem } from "@/types"

type NavProjectsProps = {
  projects: ProjectNavItem[]
}

export function NavProjects({ projects }: NavProjectsProps) {
  const { isMobile } = useSidebar()
  const { t } = useI18n()

  const sortedProjects = [...projects].sort(
    (a, b) =>
      (a.order ?? Number.POSITIVE_INFINITY) -
      (b.order ?? Number.POSITIVE_INFINITY)
  )
  const getLabel = (item: { translationKey?: string; name?: string }) =>
    (item.translationKey ? t(item.translationKey) : item.name) ??
    item.translationKey ??
    ""

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:visible">
      <SidebarGroupLabel><p className="uppercase text-nowrap text-sm font-medium  ">{t("nav.sections.operations")}</p></SidebarGroupLabel>
      <SidebarMenu>
        {sortedProjects.map((item) => {
          const label = getLabel(item)
          const key = item.translationKey ?? item.name ?? item.url

          return (
            <SidebarMenuItem key={key}>
              <SidebarMenuButton asChild tooltip={label} badge={item.badge}>
                <Link href={item.url} className="font-semibold text-sm">
                  <item.icon
                    strokeWidth={2.5}
                    className="text-muted-foreground/80"
                  />
                  <span>{label}</span>
                </Link>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal className="text-sidebar-foreground/70"/>
                    <span className="sr-only">{t("nav.more")}</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <Folder className="text-muted-foreground" />
                    <span>{t("nav.actions.viewProject")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Forward className="text-muted-foreground" />
                    <span>{t("nav.actions.shareProject")}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Trash2 className="text-muted-foreground" />
                    <span>{t("nav.actions.deleteProject")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )
        })}
        <SidebarMenuItem>
          <SidebarMenuButton
            className=""
            tooltip={t("nav.more")}
          >
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>{t("nav.more")}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  ) 
}
