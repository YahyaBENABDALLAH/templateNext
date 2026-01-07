import type {
  PokemonApiDetailResponse,
  PokemonApiListResponse,
  PokemonApiTypeResponse,
  PokemonListParams,
} from "@/types/pokemon.types"
import { pokemonAxios } from "../api"

export async function fetchPokemonList(params: PokemonListParams) {
  const response = await pokemonAxios.get<PokemonApiListResponse>("/pokemon", {
    params,
  })
  return response.data
}

export async function fetchPokemonByNameOrId(keyword: string) {
  const response = await pokemonAxios.get<PokemonApiDetailResponse>(
    `/pokemon/${keyword}`
  )
  return response.data
}

export async function fetchPokemonByType(type: string) {
  const response = await pokemonAxios.get<PokemonApiTypeResponse>(
    `/type/${type}`
  )
  return response.data
}
