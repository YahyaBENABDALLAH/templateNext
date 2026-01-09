export type DigimonApiListItem = {
  id: number
  name: string
  href: string
  image: string
}

export type DigimonApiPageable = {
  currentPage: number
  elementsOnPage: number
  totalElements: number
  totalPages: number
  previousPage: string | null
  nextPage: string | null
}

export type DigimonApiListResponse = {
  content: DigimonApiListItem[]
  pageable: DigimonApiPageable
}

export type DigimonListParams = {
  page?: number
  pageSize?: number
  name?: string
  level?: string
  attribute?: string
  xAntibody?: boolean
}

export type DigimonListItem = {
  id: number
  name: string
  image: string
}

export type DigimonListResult = {
  totalCount: number
  items: DigimonListItem[]
}

export type DigimonSortKey = "id" | "name"

export type SortDirection = "asc" | "desc"

export type DigimonListQuery = {
  page: number
  pageSize: number
  keyword: string
  sort: DigimonSortKey
  order: SortDirection
  level: string
  attribute: string
  xAntibody: boolean | null
}

export type DigimonListFilters = Pick<
  DigimonListQuery,
  "keyword" | "sort" | "order"
>
