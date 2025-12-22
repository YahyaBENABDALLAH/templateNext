import { pokemonApi } from "./pokemon.api"
import type {
  PokemonApiListResponse,
  PokemonListParams,
} from "../domain/pokemon.types"

export async function fetchPokemonList(params: PokemonListParams) {
  const response = await pokemonApi.get<PokemonApiListResponse>("/pokemon", {
    params,
  })

  return response.data
}
