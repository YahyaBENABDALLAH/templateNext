import type {
  PokemonApiListResponse,
  PokemonListItem,
  PokemonListResult,
} from "@/types/pokemon.types"

const KEY_MATCHER = /\/pokemon\/(\d+)\/?$/

function extractPokemonKey(url: string) {
  const match = url.match(KEY_MATCHER)
  return match?.[1] ?? url
}

export function mapPokemonListResponse(
  response: PokemonApiListResponse
): PokemonListResult {
  const items: PokemonListItem[] = response.results.map((item) => ({
    key: extractPokemonKey(item.url),
    name: item.name,
    url: item.url,
  }))

  return {
    items,
    totalCount: response.count,
  }
}
