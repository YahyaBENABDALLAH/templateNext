import { parsePokemonSearchParams } from "../../../../features/pokemon/pokemon-search-params";
import { PokemonPageClient } from "../../../../features/pokemon/pokemon-page-client";

type PokemonPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const PokemonPage = async ({ searchParams }: PokemonPageProps) => {
  const query = parsePokemonSearchParams(await searchParams);

  return (
    <section className="w-full ">
      <PokemonPageClient query={query} />
    </section>
  );
};

export default PokemonPage;
