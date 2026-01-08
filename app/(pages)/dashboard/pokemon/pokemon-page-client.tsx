"use client"

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getPokemonListQueryOptions } from "@/services/pokemon/pokemon.queries"
import { PokemonTable } from "@/components/features/pokemon/pokemon-table"
import { PokemonControls } from "./pokemon-controls"
 
import {
  applyPokemonQueryUpdate,
  buildPokemonUrl,
  type PokemonQueryState,
  type PokemonQueryUpdate,
} from "./pokemon-search-params"

type PokemonPageClientProps = {
  query: PokemonQueryState
}

export function PokemonPageClient({ query }: PokemonPageClientProps) {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery(
    getPokemonListQueryOptions(query)
  )

  const updateQuery = (updates: PokemonQueryUpdate) => {
    const next = applyPokemonQueryUpdate(query, updates)
    router.replace(buildPokemonUrl(next))
  }

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
        <PokemonTable data={data.items} />
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
