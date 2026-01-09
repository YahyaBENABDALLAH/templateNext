"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import type { OnChangeFn, SortingState } from "@tanstack/react-table"
import { getPokemonListQueryOptions } from "@/services/pokemon/pokemon.queries"
import { PokemonControls } from "./pokemon-controls"
 
import {
  applyPokemonQueryUpdate,
  buildPokemonUrl,
  type PokemonQueryState,
  type PokemonQueryUpdate,
} from "./pokemon-search-params"
import type { PokemonSortKey } from "@/types/pokemon.types"
import { PokemonTable } from "./pokemon-table"

type PokemonPageClientProps = {
  query: PokemonQueryState
}

export function PokemonPageClient({ query }: PokemonPageClientProps) {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery(
    getPokemonListQueryOptions(query)
  )

  const updateQuery = React.useCallback(
    (updates: PokemonQueryUpdate) => {
      const next = applyPokemonQueryUpdate(query, updates)
      router.replace(buildPokemonUrl(next))
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
        sort: next.id as PokemonSortKey,
        order: next.desc ? "desc" : "asc",
      })
    },
    [sorting, updateQuery]
  )

  let content = null

  if (isLoading) {
    content = <div className="text-sm text-slate-600">Loading Pokemon...</div>
  } else if (isError) {
    content = <div className="text-sm text-red-600">Failed to load Pokemon.</div>
  } else if (!data || data.items.length === 0) {
    content = <div className="text-sm text-slate-600">No Pokemon found.</div>
  } else {
    content = (
      <div className="space-y-2">
        <div className="text-sm text-slate-600">
          {data.totalCount} Pokemon
        </div>
        <PokemonTable
          data={data.items}
          sorting={sorting}
          onSortingChange={handleSortingChange}
        />
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-4">
      <PokemonControls query={query} onUpdate={updateQuery} />
      {content}
    </div>
  )
}
