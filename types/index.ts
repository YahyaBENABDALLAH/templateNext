import type { ReactNode } from "react"

import type { LucideIcon } from "lucide-react"

import type { PaymentStatus } from "@/enums"

export type BadgeTone =
  | "neutral"
  | "brand"
  | "info"
  | "success"
  | "warning"
  | "danger"

export type User = {
  name: string
  email: string
  avatar: string
}

export type NavSubItem = {
  title?: string
  translationKey?: string
  url: string
  isActive?: boolean
}

export type NavItem = {
  title?: string
  translationKey?: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  order?: number
  badge?: ReactNode
  items?: NavSubItem[]
}

export type ProjectNavItem = {
  name?: string
  translationKey?: string
  url: string
  icon: LucideIcon
  order?: number
  badge?: ReactNode
}

export type DashboardItem = {
  id: string
  title: string
  value: string | number
  subtitle: string
  icon: LucideIcon
  tone: BadgeTone
  highlighted?: boolean
}

export type StatCardProps = {
  item: DashboardItem
}

export type Payment = {
  id: string
  amount: number
  status: PaymentStatus
  email: string
}
