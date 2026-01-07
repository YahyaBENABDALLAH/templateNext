import type {
  PokemonApiDetailResponse,
  PokemonApiListResponse,
  PokemonApiTypeResponse,
  PokemonListItem,
  PokemonListResult,
} from "@/types/pokemon.types"

const ID_MATCHER = /\/pokemon\/(\d+)\/?$/

function extractPokemonId(url: string) {
  const match = url.match(ID_MATCHER)
  if (!match) {
    return 0
  }

  const id = Number(match[1])
  return Number.isFinite(id) ? id : 0
}

export function mapPokemonListResponse(
  response: PokemonApiListResponse
): PokemonListResult {
  const items: PokemonListItem[] = response.results.map((item) => ({
    id: extractPokemonId(item.url),
    name: item.name,
  }))

  return {
    items,
    totalCount: response.count,
  }
}

export function mapPokemonTypeResponse(
  response: PokemonApiTypeResponse
): PokemonListItem[] {
  return response.pokemon.map((entry) => ({
    id: extractPokemonId(entry.pokemon.url),
    name: entry.pokemon.name,
  }))
}

export function mapPokemonDetailResponse(
  response: PokemonApiDetailResponse
): PokemonListItem {
  return {
    id: response.id,
    name: response.name,
  }
}
