import type { PaginationState } from "@tanstack/react-table"

export type PokemonApiListItem = {
  name: string
  url: string
}

export type PokemonApiListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: PokemonApiListItem[]
}

export type PokemonListItem = {
  key: string
  name: string
  url: string
}

export type PokemonListResult = {
  totalCount: number
  items: PokemonListItem[]
}

export type PokemonListParams = {
  limit: number
  offset: number
}

export type PokemonSortKey = "name" | "key" | "url"

export type SortDirection = "asc" | "desc"

export type PokemonListFilters = {
  search: string
  sortKey: PokemonSortKey
  sortDirection: SortDirection
}

export type PokemonPaginationState = PaginationState

export const DEFAULT_POKEMON_LIST_PARAMS: PokemonListParams = {
  limit: 20,
  offset: 0,
}

export const DEFAULT_POKEMON_PAGINATION: PokemonPaginationState = {
  pageIndex: 0,
  pageSize: DEFAULT_POKEMON_LIST_PARAMS.limit,
}

export const DEFAULT_POKEMON_LIST_FILTERS: PokemonListFilters = {
  search: "",
  sortKey: "name",
  sortDirection: "asc",
}
export const pokemonQueryKeys = {
  list: (pagination: PokemonPaginationState) =>
    ["pokemon", "list", pagination.pageIndex, pagination.pageSize] as const,
}
