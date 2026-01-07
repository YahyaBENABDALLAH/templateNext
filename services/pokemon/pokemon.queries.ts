import { keepPreviousData } from "@tanstack/react-query"
import type { PokemonListQuery } from "@/types/pokemon.types"
import { getPokemonListData } from "./pokemon.service"

export const pokemonQueryKeys = {
  list: (query: PokemonListQuery) =>
    [
      "pokemon",
      "list",
      query.page,
      query.pageSize,
      query.keyword,
      query.sort,
      query.order,
      query.types,
    ] as const,
}

export const getPokemonListQueryOptions = (query: PokemonListQuery) => ({
  queryKey: pokemonQueryKeys.list(query),
  queryFn: () => getPokemonListData(query),
  placeholderData: keepPreviousData,
})
