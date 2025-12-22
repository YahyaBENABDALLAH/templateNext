"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import { useDebouncedValue } from "@/hooks/use-debounced-value"
import {
  DEFAULT_POKEMON_LIST_FILTERS,
  DEFAULT_POKEMON_LIST_PARAMS,
  type PokemonListFilters,
  type PokemonListItem,
  type PokemonListResult,
} from "../domain/pokemon.types"
import { applyPokemonFilters } from "../application/pokemon.filters"
import { getPokemonListQueryOptions } from "../application/pokemon.queries"

type PokemonContextValue = {
  items: PokemonListItem[]
  filters: PokemonListFilters
  totalCount: number
  filteredCount: number
  isLoading: boolean
  isFetching: boolean
  error: Error | null
  updateFilters: (next: Partial<PokemonListFilters>) => void
  resetFilters: () => void
}

const PokemonContext = React.createContext<PokemonContextValue | null>(null)

function PokemonProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = React.useState<PokemonListFilters>(
    DEFAULT_POKEMON_LIST_FILTERS
  )

  // Debounce the search so we don't re-filter on every keystroke.
  const debouncedSearch = useDebouncedValue(filters.search, 300)

  const query = useQuery(getPokemonListQueryOptions(DEFAULT_POKEMON_LIST_PARAMS))
  const data: PokemonListResult | undefined = query.data
  const totalCount = data?.totalCount ?? 0
  const rawItems = data?.items ?? []

  const items = React.useMemo(() => {
    return applyPokemonFilters(rawItems, {
      ...filters,
      search: debouncedSearch,
    })
  }, [rawItems, filters.sortDirection, filters.sortKey, debouncedSearch])

  const updateFilters = React.useCallback(
    (next: Partial<PokemonListFilters>) => {
      setFilters((current) => ({ ...current, ...next }))
    },
    []
  )

  const resetFilters = React.useCallback(() => {
    setFilters(DEFAULT_POKEMON_LIST_FILTERS)
  }, [])

  const error = query.error instanceof Error ? query.error : null

  const value = React.useMemo<PokemonContextValue>(
    () => ({
      items,
      filters,
      totalCount,
      filteredCount: items.length,
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      error,
      updateFilters,
      resetFilters,
    }),
    [
      items,
      filters,
      totalCount,
      query.isLoading,
      query.isFetching,
      error,
      updateFilters,
      resetFilters,
    ]
  )

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  )
}

function usePokemonTable() {
  const context = React.useContext(PokemonContext)

  if (!context) {
    throw new Error("usePokemonTable must be used within a PokemonProvider")
  }

  return context
}

export { PokemonProvider, usePokemonTable }
