import type {
  PokemonListItem,
  PokemonListParams,
} from "../domain/pokemon.types"
import { mapPokemonListResponse } from "../infrastructure/pokemon.mapper"
import { fetchPokemonList } from "../infrastructure/pokemon.repository"

export async function getPokemonList(
  params: PokemonListParams
): Promise<PokemonListItem[]> {
  const response = await fetchPokemonList(params)
  return mapPokemonListResponse(response)
}
