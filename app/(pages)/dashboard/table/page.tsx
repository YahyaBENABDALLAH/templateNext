import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

import { getPokemonListQueryOptions } from "@/features/pokemon/application/pokemon.queries"
import {
  DEFAULT_POKEMON_LIST_PARAMS,
} from "@/features/pokemon/domain/pokemon.types"
import { PokemonProvider } from "@/features/pokemon/presentation/pokemon-context"
import { PokemonTable } from "@/features/pokemon/presentation/pokemon-table"

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
