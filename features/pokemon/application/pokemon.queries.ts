import type { PokemonListParams } from "../domain/pokemon.types"
import { getPokemonList } from "./get-pokemon-list"

export const pokemonQueryKeys = {
  list: (params: PokemonListParams) => ["pokemon", "list", params] as const,
}

export const getPokemonListQueryOptions = (params: PokemonListParams) => ({
  queryKey: pokemonQueryKeys.list(params),
  queryFn: () => getPokemonList(params),
  staleTime: 60_000,
})
