import { keepPreviousData } from "@tanstack/react-query"
import {
  PokemonListParams,
  PokemonListResult,
  type PokemonPaginationState,
  pokemonQueryKeys,
} from "@/types/pokemon.types"
import { fetchPokemonList } from "./pokemon.api"
import { mapPokemonListResponse } from "./pokemon.mapper"

export async function getPokemonList(
  params: PokemonListParams
): Promise<PokemonListResult> {
  const response = await fetchPokemonList(params)
  return mapPokemonListResponse(response)
}

export function mapPaginationToListParams(
  pagination: PokemonPaginationState
): PokemonListParams {
  return {
    limit: pagination.pageSize,
    offset: pagination.pageIndex * pagination.pageSize,
  }
}

export const getPokemonListQueryOptions = (
  pagination: PokemonPaginationState
) => {
  const params = mapPaginationToListParams(pagination)

  return {
    queryKey: pokemonQueryKeys.list(pagination),
    queryFn: () => getPokemonList(params),
    placeholderData: keepPreviousData,
  }
}
