"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  Heart,
  Map,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  Star,
} from "lucide-react";

import { NavMain } from "@/components/features/navigation/nav-main";
import { NavProjects } from "@/components/features/navigation/nav-projects";
import { NavUser } from "@/components/nav-user";
import { SidebarBrand } from "@/components/sidebar-brand";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useI18n } from "@/context/i18n.context";
import { type NavItem, type ProjectNavItem, type User } from "@/types";

type SidebarData = {
  user: User;
  navMain: NavItem[];
  projects: ProjectNavItem[];
};

const data: SidebarData = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "",
  },
  navMain: [
    {
      translationKey: "nav.newFeature1",
      url: "#",
      icon: Star,
      order: 1,
      badge: (
        <Badge variant="danger" size="xs" aria-label="46 notifications">
          46
        </Badge>
      ),
    },
    {
      translationKey: "nav.newFeature2",
      url: "#",
      icon: Heart,
      order: 2,
    },
    {
      translationKey: "nav.newFeature3",
      url: "#",
      icon: Settings,
      order: 3,
    },
    {
      translationKey: "nav.main.playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      order: 10,
      items: [
        {
          translationKey: "nav.main.history",
          url: "/components",
        },
        {
          translationKey: "nav.main.changelog",
          url: "/dashboard",
        },
        {
          translationKey: "nav.main.starred",
          url: "/login",
        },
        {
          translationKey: "nav.main.settings",
          url: "/otp",
        },
      ],
    },
    {
      translationKey: "nav.main.models",
      url: "#",
      icon: Bot,
      order: 20,
      items: [
        {
          translationKey: "nav.main.genesis",
          url: "#",
        },
        {
          translationKey: "nav.main.explorer",
          url: "#",
        },
        {
          translationKey: "nav.main.quantum",
          url: "#",
        },
      ],
    },
    {
      translationKey: "nav.main.documentation",
      url: "#",
      icon: BookOpen,
      order: 30,
      items: [
        {
          translationKey: "nav.main.introduction",
          url: "#",
        },
        {
          translationKey: "nav.main.getStarted",
          url: "#",
        },
        {
          translationKey: "nav.main.tutorials",
          url: "#",
        },
        {
          translationKey: "nav.main.changelog",
          url: "#",
        },
      ],
    },
    {
      translationKey: "nav.main.settings",
      url: "#",
      icon: Settings2,
      order: 40,
      items: [
        {
          translationKey: "nav.main.general",
          url: "#",
        },
        {
          translationKey: "nav.main.team",
          url: "#",
        },
        {
          translationKey: "nav.main.billing",
          url: "#",
        },
        {
          translationKey: "nav.main.limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      translationKey: "nav.projects.designEngineering",
      url: "#",
      icon: Frame,
      order: 1,
    },
    {
      translationKey: "nav.projects.salesMarketing",
      url: "#",
      icon: PieChart,
      order: 2,
    },
    {
      translationKey: "nav.projects.travel",
      url: "#",
      icon: Map,
      order: 3,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { direction } = useI18n();
  return (
    <Sidebar
      side={direction === "rtl" ? "right" : "left"}
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
