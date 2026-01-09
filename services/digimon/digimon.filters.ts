import type {
  DigimonListFilters,
  DigimonListItem,
  DigimonSortKey,
} from "@/types/digimon.types"

function normalize(value: string) {
  return value.trim().toLowerCase()
}

function compareById(a: DigimonListItem, b: DigimonListItem) {
  return a.id - b.id
}

function compareByField(
  a: DigimonListItem,
  b: DigimonListItem,
  sortKey: DigimonSortKey
) {
  if (sortKey === "id") {
    return compareById(a, b)
  }

  return a.name.localeCompare(b.name)
}

export function applyDigimonFilters(
  items: DigimonListItem[],
  filters: DigimonListFilters
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
