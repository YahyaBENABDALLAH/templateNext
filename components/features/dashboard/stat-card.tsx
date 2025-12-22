import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { type StatCardProps } from "@/types"

export function StatCard({ item }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 shadow-xs transition-shadow",
        item.highlighted ? "ring-2 ring-indigo-400" : "ring-1 ring-transparent"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{item.title}</p>
          <p className="text-xl md:text-2xl xl:text-3xl font-semibold">
            {item.value}
          </p >
        </div>

        <Badge
          variant={item.tone}
          leftIcon={<item.icon aria-hidden="true" className="size-6" />}
          aria-label={item.title}
          className="p-3"
        />
      </div>

      <div className="mt-4 h-px w-full bg-border" />
      <p className="mt-3 text-sm text-muted-foreground">{item.subtitle}</p>
    </div>
  )
}
