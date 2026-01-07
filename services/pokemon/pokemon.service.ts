import type { PokemonListQuery, PokemonListResult } from "@/types/pokemon.types"
import { fetchPokemonByNameOrId, fetchPokemonByType, fetchPokemonList } from "./pokemon.api"
import { applyPokemonFilters } from "./pokemon.filters"
import {
  mapPokemonDetailResponse,
  mapPokemonListResponse,
  mapPokemonTypeResponse,
} from "./pokemon.mapper"

const emptyResult: PokemonListResult = {
  items: [],
  totalCount: 0,
}

function paginateItems(
  items: PokemonListResult["items"],
  page: number,
  pageSize: number
) {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}

export async function getPokemonListData(
  query: PokemonListQuery
): Promise<PokemonListResult> {
  const keyword = query.keyword
  const activeTypes = query.types

  if (keyword) {
    try {
      const detail = await fetchPokemonByNameOrId(keyword.toLowerCase())
      if (
        activeTypes.length > 0 &&
        !detail.types.some((entry) => activeTypes.includes(entry.type.name))
      ) {
        return emptyResult
      }

      if (query.page !== 1) {
        return {
          items: [],
          totalCount: 1,
        }
      }

      return {
        items: [mapPokemonDetailResponse(detail)],
        totalCount: 1,
      }
    } catch {
      return emptyResult
    }
  }

  if (activeTypes.length > 0) {
    const responses = await Promise.all(
      activeTypes.map((type) => fetchPokemonByType(type))
    )
    const itemsById = new Map<number, PokemonListResult["items"][number]>()

    responses.forEach((response) => {
      mapPokemonTypeResponse(response).forEach((item) => {
        itemsById.set(item.id, item)
      })
    })

    const items = Array.from(itemsById.values())
    const sorted = applyPokemonFilters(items, query)

    return {
      items: paginateItems(sorted, query.page, query.pageSize),
      totalCount: sorted.length,
    }
  }

  const response = await fetchPokemonList({
    limit: query.pageSize,
    offset: (query.page - 1) * query.pageSize,
  })
  const list = mapPokemonListResponse(response)
  const sorted = applyPokemonFilters(list.items, query)

  return {
    items: sorted,
    totalCount: list.totalCount,
  }
}
