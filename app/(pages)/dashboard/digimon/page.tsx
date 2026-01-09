import { parseDigimonSearchParams } from "../../../../features/digimon/digimon-search-params";
import { DigimonPageClient } from "../../../../features/digimon/digimon-page-client";

type DigimonPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const DigimonPage = async ({ searchParams }: DigimonPageProps) => {
  const query = parseDigimonSearchParams(await searchParams);

  return (
    <section className="w-full">
      <DigimonPageClient query={query} />
    </section>
  );
};

export default DigimonPage;
