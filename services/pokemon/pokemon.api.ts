import type { PokemonApiListResponse, PokemonListParams } from "@/types/pokemon.types"
import { pokemonAxios } from "../api"

export async function fetchPokemonList(params: PokemonListParams) {
  const response = await pokemonAxios.get<PokemonApiListResponse>("/pokemon", {
    params,
  })
  return response.data
}

