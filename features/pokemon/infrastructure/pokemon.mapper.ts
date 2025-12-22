import type {
  PokemonApiListResponse,
  PokemonListItem,
} from "../domain/pokemon.types"

// The API list item doesn't include an id, so extract it from the URL.
const KEY_MATCHER = /\/pokemon\/(\d+)\/?$/

function extractPokemonKey(url: string) {
  const match = url.match(KEY_MATCHER)
  return match?.[1] ?? url
}

export function mapPokemonListResponse(
  response: PokemonApiListResponse
): PokemonListItem[] {
  return response.results.map((item) => ({
    key: extractPokemonKey(item.url),
    name: item.name,
    url: item.url,
  }))
}
