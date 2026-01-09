import type {
  DigimonApiListResponse,
  DigimonListParams,
} from "@/types/digimon.types"
import { digimonAxios } from "../api"

export async function fetchDigimonList(params: DigimonListParams) {
  const response = await digimonAxios.get<DigimonApiListResponse>("/digimon", {
    params,
  })
  return response.data
}
