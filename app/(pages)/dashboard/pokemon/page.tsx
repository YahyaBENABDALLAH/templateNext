import { parsePokemonSearchParams } from "./pokemon-search-params";
import { PokemonPageClient } from "./pokemon-page-client";
import { PokemonQuerySummary } from "./pokemon-query-summary";

type PokemonPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const PokemonPage = async ({ searchParams }: PokemonPageProps) => {
  const query = parsePokemonSearchParams(await searchParams);

  return (
    <section className="w-full ">
      <PokemonQuerySummary query={query} />
      <PokemonPageClient query={query} />
    </section>
  );
};

export default PokemonPage;
