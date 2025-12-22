"use client"

import { useI18n } from "@/context/i18n.context"

export default function Home() {
  const { t } = useI18n()

  return (
    <div className="flex flex-1 items-center justify-center text-xl font-semibold">
      {t("common.home")}
    </div>
  )
}
