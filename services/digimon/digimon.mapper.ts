import type {
  DigimonApiListResponse,
  DigimonListItem,
  DigimonListResult,
} from "@/types/digimon.types"

export function mapDigimonListResponse(
  response: DigimonApiListResponse
): DigimonListResult {
  const items: DigimonListItem[] = response.content.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
  }))

  return {
    items,
    totalCount: response.pageable.totalElements,
  }
}
