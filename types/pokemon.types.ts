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
  id: number
  name: string
}

export type PokemonListResult = {
  totalCount: number
  items: PokemonListItem[]
}

export type PokemonListParams = {
  limit: number
  offset: number
}

export type PokemonSortKey = "id" | "name"

export type SortDirection = "asc" | "desc"

export type PokemonListQuery = {
  page: number
  pageSize: number
  keyword: string
  sort: PokemonSortKey
  order: SortDirection
  types: string[]
}

export type PokemonListFilters = Pick<
  PokemonListQuery,
  "keyword" | "sort" | "order"
>

export type PokemonApiDetailResponse = {
  id: number
  name: string
  types: Array<{
    type: {
      name: string
    }
  }>
}

export type PokemonApiTypeResponse = {
  pokemon: Array<{
    pokemon: PokemonApiListItem
  }>
}
