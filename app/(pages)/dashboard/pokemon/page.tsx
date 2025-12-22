import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"
 
 
import { DEFAULT_POKEMON_LIST_PARAMS } from "@/types/pokemon.types"
import { getPokemonListQueryOptions } from "@/services/pokemon/pokemon.queries"
import { PokemonProvider } from "@/context/pokemon-context"
import { PokemonTable } from "@/features/pokemon/pokemon-table"

export default async function TablePage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(
    getPokemonListQueryOptions(DEFAULT_POKEMON_LIST_PARAMS)
  )

  return (
    <section className="w-full px-4 pb-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonProvider>
          <PokemonTable />
        </PokemonProvider>
      </HydrationBoundary>
    </section>
  )
}
