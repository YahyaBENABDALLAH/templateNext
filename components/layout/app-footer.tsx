"use client"

import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"
import { useI18n } from "@/context/i18n.context"

type AppFooterProps = HTMLAttributes<HTMLElement>

function AppFooter({ className, ...props }: AppFooterProps) {
  const { t } = useI18n()
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        "flex w-full items-center justify-center px-4 py-3 text-center text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      © {currentYear} {t("footer.copyright")}
    </footer>
  )
}

export { AppFooter }
