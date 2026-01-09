"use client"

import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useI18n } from "@/context/i18n.context"
import { type NavItem } from "@/types"

type NavMainProps = {
  items: NavItem[]
}

export function NavMain({ items }: NavMainProps) {
  const { t } = useI18n()
  const sortedItems = [...items].sort(
    (a, b) =>
      (a.order ?? Number.POSITIVE_INFINITY) -
      (b.order ?? Number.POSITIVE_INFINITY)
  )

  const getLabel = (item: { translationKey?: string; title?: string }) =>
    (item.translationKey ? t(item.translationKey) : item.title) ??
    item.translationKey ??
    ""

  return (
    <SidebarGroup>
      <SidebarGroupLabel><p className="uppercase text-nowrap text-sm font-medium">{t("nav.sections.administrative")}</p></SidebarGroupLabel>
      <SidebarMenu>
        {sortedItems.map((item) => {
          const label = getLabel(item)
          const hasChildren = !!item.items?.length
          const itemKey = item.translationKey ?? item.title ?? item.url

          const button = (
            <SidebarMenuButton
              asChild
              tooltip={label}
              isActive={item.isActive}
              showChevron={hasChildren}
              badge={item.badge}
            >
              <Link
                href={item.url}
                className="font-semibold text-sm"
              >
                {item.icon && (
                  <item.icon
                    strokeWidth={2.5}
                    className="text-muted-foreground/80"
                  />
                )}
                <span>{label}</span>
              </Link>
            </SidebarMenuButton>
          )

          if (!hasChildren) {
            return <SidebarMenuItem key={itemKey}>{button}</SidebarMenuItem>
          }

          return (
            <Collapsible
              key={itemKey}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>{button}</CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const subLabel = getLabel(subItem)
                      const subKey =
                        subItem.translationKey ?? subItem.title ?? subItem.url

                      return (
                        <SidebarMenuSubItem key={subKey}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.isActive}
                          >
                            <Link href={subItem.url}>
                              <span>{subLabel}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
