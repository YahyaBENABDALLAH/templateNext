import { keepPreviousData } from "@tanstack/react-query"
import type { DigimonListQuery } from "@/types/digimon.types"
import { getDigimonListData } from "./digimon.service"

export const digimonQueryKeys = {
  list: (query: DigimonListQuery) =>
    [
      "digimon",
      "list",
      query.page,
      query.pageSize,
      query.keyword,
      query.sort,
      query.order,
      query.level,
      query.attribute,
      query.xAntibody,
    ] as const,
}

export const getDigimonListQueryOptions = (query: DigimonListQuery) => ({
  queryKey: digimonQueryKeys.list(query),
  queryFn: () => getDigimonListData(query),
  placeholderData: keepPreviousData,
})
