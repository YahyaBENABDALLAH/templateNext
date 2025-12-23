"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import type { OnChangeFn } from "@tanstack/react-table"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useDebouncedValue } from "@/hooks/use-debounced-value"
import {
  DEFAULT_POKEMON_LIST_FILTERS,
  DEFAULT_POKEMON_PAGINATION,
  type PokemonListFilters,
  type PokemonListItem,
  type PokemonListResult,
  type PokemonPaginationState,
} from "@/types/pokemon.types"
import { getPokemonListQueryOptions } from "@/services/pokemon/pokemon.queries"
import { applyPokemonFilters } from "@/services/pokemon/pokemon.filters"

function getInitialPagination(
  searchParams: ReturnType<typeof useSearchParams>
): PokemonPaginationState {
  const pageParam = Number(searchParams?.get("page"))
  const pageSizeParam = Number(searchParams?.get("pageSize"))

  const pageSize =
    Number.isFinite(pageSizeParam) && pageSizeParam > 0
      ? pageSizeParam
      : DEFAULT_POKEMON_PAGINATION.pageSize

  const pageIndex =
    Number.isFinite(pageParam) && pageParam > 0
      ? Math.max(pageParam - 1, 0)
      : DEFAULT_POKEMON_PAGINATION.pageIndex

  return { pageIndex, pageSize }
}

type PokemonContextValue = {
  items: PokemonListItem[]
  filters: PokemonListFilters
  totalCount: number
  filteredCount: number
  isLoading: boolean
  isFetching: boolean
  pagination: PokemonPaginationState
  pageCount: number
  error: Error | null
  updateFilters: (next: Partial<PokemonListFilters>) => void
  resetFilters: () => void
  onPaginationChange: OnChangeFn<PokemonPaginationState>
}

const PokemonContext = React.createContext<PokemonContextValue | null>(null)

function PokemonProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [pagination, setPagination] = React.useState<PokemonPaginationState>(() =>
    getInitialPagination(searchParams)
  )
  const [filters, setFilters] = React.useState<PokemonListFilters>(
    DEFAULT_POKEMON_LIST_FILTERS
  )

  const handlePaginationChange = React.useCallback<
    OnChangeFn<PokemonPaginationState>
  >((updater) => {
    setPagination((current) => {
      const next =
        typeof updater === "function"
          ? (updater as (old: PokemonPaginationState) => PokemonPaginationState)(
              current
            )
          : updater
      const pageSizeChanged = next.pageSize !== current.pageSize

      return {
        ...next,
        pageIndex: pageSizeChanged ? 0 : Math.max(next.pageIndex, 0),
      }
    })
  }, [])

  React.useEffect(() => {
    const nextPage = pagination.pageIndex + 1
    const nextPageSize = pagination.pageSize
    const currentPage = Number(searchParams.get("page"))
    const currentPageSize = Number(searchParams.get("pageSize"))

    if (currentPage === nextPage && currentPageSize === nextPageSize) {
      return
    }

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(nextPage))
    params.set("pageSize", String(nextPageSize))
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, [pagination, pathname, router, searchParams])

  // Debounce the search so we don't re-filter on every keystroke.
  const debouncedSearch = useDebouncedValue(filters.search, 300)

  const query = useQuery(getPokemonListQueryOptions(pagination))
  const data: PokemonListResult | undefined = query.data
  const totalCount = data?.totalCount ?? 0
  const rawItems = data?.items ?? []
  const pageCount =
    pagination.pageSize > 0
      ? Math.ceil(totalCount / pagination.pageSize)
      : 0

  const items = React.useMemo(() => {
    return applyPokemonFilters(rawItems, {
      ...filters,
      search: debouncedSearch,
    })
  }, [rawItems, filters, debouncedSearch])

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
      pagination,
      pageCount,
      error,
      updateFilters,
      resetFilters,
      onPaginationChange: handlePaginationChange,
    }),
    [
      items,
      filters,
      totalCount,
      pagination,
      pageCount,
      query.isLoading,
      query.isFetching,
      error,
      updateFilters,
      resetFilters,
      handlePaginationChange,
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
