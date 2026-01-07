import type { PokemonQueryState } from "./pokemon-search-params";

type PokemonQuerySummaryProps = {
  query: PokemonQueryState;
};

const formatValue = (value: string | number) => {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : "none";
  }

  return String(value);
};

export function PokemonQuerySummary({ query }: PokemonQuerySummaryProps) {
  const entries = [
    ["page", query.page],
    ["pageSize", query.pageSize],
    ["keyword", query.keyword],
    ["sort", query.sort],
    ["order", query.order],
    ["types", query.types.length > 0 ? query.types.join(", ") : "all"],
  ] as const;

  return (
    <section className="mt-4 rounded-md border bg-slate-50 p-3 text-xs text-slate-700">
      <dl className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
        {entries.map(([label, value]) => (
          <div key={label} className="flex items-center gap-2">
            <dt className="text-slate-500  font-semibold uppercase underline">{label}</dt>
            <dd className="font-medium text-slate-800">
              {formatValue(value)}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
