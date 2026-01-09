"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import type { OnChangeFn, SortingState } from "@tanstack/react-table"
import { getDigimonListQueryOptions } from "@/services/digimon/digimon.queries"
import type { DigimonSortKey } from "@/types/digimon.types"
import { DigimonControls } from "./digimon-controls"
import {
  applyDigimonQueryUpdate,
  buildDigimonUrl,
  type DigimonQueryState,
  type DigimonQueryUpdate,
} from "./digimon-search-params"
import { DigimonTable } from "./digimon-table"

type DigimonPageClientProps = {
  query: DigimonQueryState
}

export function DigimonPageClient({ query }: DigimonPageClientProps) {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery(
    getDigimonListQueryOptions(query)
  )

  const updateQuery = React.useCallback(
    (updates: DigimonQueryUpdate) => {
      const next = applyDigimonQueryUpdate(query, updates)
      router.replace(buildDigimonUrl(next))
    },
    [query, router]
  )

  const sorting = React.useMemo<SortingState>(
    () => [{ id: query.sort, desc: query.order === "desc" }],
    [query.order, query.sort]
  )

  const handleSortingChange = React.useCallback<OnChangeFn<SortingState>>(
    (updater) => {
      const nextSorting =
        typeof updater === "function" ? updater(sorting) : updater
      const next = nextSorting[0]

      if (!next) {
        return
      }

      updateQuery({
        sort: next.id as DigimonSortKey,
        order: next.desc ? "desc" : "asc",
      })
    },
    [sorting, updateQuery]
  )

  let content = null

  if (isLoading) {
    content = <div className="text-sm text-slate-600">Loading Digimon...</div>
  } else if (isError) {
    content = (
      <div className="text-sm text-red-600">Failed to load Digimon.</div>
    )
  } else if (!data || data.items.length === 0) {
    content = <div className="text-sm text-slate-600">No Digimon found.</div>
  } else {
    content = (
      <div className="space-y-2">
        <DigimonTable
          data={data.items}
          sorting={sorting}
          onSortingChange={handleSortingChange}
        />
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-4">
      <DigimonControls query={query} onUpdate={updateQuery} />
      {content}
    </div>
  )
}
