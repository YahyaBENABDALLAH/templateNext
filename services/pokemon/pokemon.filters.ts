// Keep list filtering and sorting typed and centralized.
import type {
  PokemonListFilters,
  PokemonListItem,
  PokemonSortKey,
} from "@/types/pokemon.types"

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function compareById(a: PokemonListItem, b: PokemonListItem) {
  return a.id - b.id
}

function compareByField(
  a: PokemonListItem,
  b: PokemonListItem,
  sortKey: PokemonSortKey
) {
  if (sortKey === "id") {
    return compareById(a, b)
  }

  return a.name.localeCompare(b.name)
}

export function applyPokemonFilters(
  items: PokemonListItem[],
  filters: PokemonListFilters
) {
  const search = normalize(filters.keyword)

  const filtered = search
    ? items.filter((item) =>
        [item.name, String(item.id)].some((value) =>
          normalize(value).includes(search)
        )
      )
    : items

  const sorted = [...filtered].sort((a, b) =>
    compareByField(a, b, filters.sort)
  )

  if (filters.order === "desc") {
    sorted.reverse()
  }

  return sorted
}
