import { PokemonProvider } from "@/context/pokemon-context"
import { PokemonTable } from "@/features/pokemon/pokemon-table"

export default async function TablePage() {

  return (
    <section className="w-full pb-6 mt-6">
        <PokemonProvider>
          <PokemonTable />
        </PokemonProvider>
    </section>
  )
}
