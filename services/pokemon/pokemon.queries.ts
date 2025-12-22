import { PokemonListParams, PokemonListResult, pokemonQueryKeys } from "@/types/pokemon.types"
import { fetchPokemonList } from "./pokemon.api"
import { mapPokemonListResponse } from "./pokemon.mapper"

export async function getPokemonList(
  params: PokemonListParams
): Promise<PokemonListResult> {
  const response = await fetchPokemonList(params)
  return mapPokemonListResponse(response)
}

export const getPokemonListQueryOptions = (params: PokemonListParams) => ({
  queryKey: pokemonQueryKeys.list(params),
  queryFn: () => getPokemonList(params),
})