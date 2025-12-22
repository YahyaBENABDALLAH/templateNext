// Keep list filtering and sorting typed and centralized.
import type {
  PokemonListFilters,
  PokemonListItem,
  PokemonSortKey,
} from "../domain/pokemon.types"

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function compareByKey(a: PokemonListItem, b: PokemonListItem) {
  const aKey = Number(a.key)
  const bKey = Number(b.key)

  if (Number.isFinite(aKey) && Number.isFinite(bKey)) {
    return aKey - bKey
  }

  return a.key.localeCompare(b.key)
}

function compareByField(
  a: PokemonListItem,
  b: PokemonListItem,
  sortKey: PokemonSortKey
) {
  if (sortKey === "key") {
    return compareByKey(a, b)
  }

  return a[sortKey].localeCompare(b[sortKey])
}

export function applyPokemonFilters(
  items: PokemonListItem[],
  filters: PokemonListFilters
) {
  const search = normalize(filters.search)

  const filtered = search
    ? items.filter((item) =>
        [item.name, item.key, item.url].some((value) =>
          normalize(value).includes(search)
        )
      )
    : items

  const sorted = [...filtered].sort((a, b) =>
    compareByField(a, b, filters.sortKey)
  )

  if (filters.sortDirection === "desc") {
    sorted.reverse()
  }

  return sorted
}
