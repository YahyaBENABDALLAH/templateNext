import type { PokemonListParams, PokemonListResult } from "../domain/pokemon.types"
import { mapPokemonListResponse } from "../infrastructure/pokemon.mapper"
import { fetchPokemonList } from "../infrastructure/pokemon.repository"

export async function getPokemonList(
  params: PokemonListParams
): Promise<PokemonListResult> {
  const response = await fetchPokemonList(params)
  return mapPokemonListResponse(response)
}
