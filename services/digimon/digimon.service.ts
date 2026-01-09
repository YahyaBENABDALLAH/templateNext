import type {
  DigimonListParams,
  DigimonListQuery,
  DigimonListResult,
} from "@/types/digimon.types"
import { fetchDigimonList } from "./digimon.api"
import { applyDigimonFilters } from "./digimon.filters"
import { mapDigimonListResponse } from "./digimon.mapper"

function buildDigimonListParams(query: DigimonListQuery): DigimonListParams {
  const keyword = query.keyword.trim()
  const level = query.level.trim()
  const attribute = query.attribute.trim()

  const params: DigimonListParams = {
    page: Math.max(0, query.page - 1),
    pageSize: query.pageSize,
  }

  if (keyword) {
    params.name = keyword
  }

  if (level) {
    params.level = level
  }

  if (attribute) {
    params.attribute = attribute
  }

  if (query.xAntibody !== null) {
    params.xAntibody = query.xAntibody
  }

  return params
}

export async function getDigimonListData(
  query: DigimonListQuery
): Promise<DigimonListResult> {
  const response = await fetchDigimonList(buildDigimonListParams(query))
  const list = mapDigimonListResponse(response)

  const sorted = applyDigimonFilters(list.items, query)

  return {
    items: sorted,
    totalCount: list.totalCount,
  }
}
