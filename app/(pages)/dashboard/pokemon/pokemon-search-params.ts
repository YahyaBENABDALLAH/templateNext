import type {
  PokemonListQuery,
  PokemonSortKey,
  SortDirection,
} from "@/types/pokemon.types";

export const POKEMON_ROUTE = "/dashboard/pokemon";

export const POKEMON_QUERY_KEYS = [
  "page",
  "pageSize",
  "keyword",
  "sort",
  "order",
  "type",
] as const;
export type PokemonQueryKey = (typeof POKEMON_QUERY_KEYS)[number];

export const POKEMON_PAGE_MIN = 1;
export const POKEMON_PAGE_SIZES = [10, 20, 50] as const;
export type PokemonPageSize = (typeof POKEMON_PAGE_SIZES)[number];

export const POKEMON_SORT_KEYS: PokemonSortKey[] = ["id", "name"];
export type { PokemonSortKey };

export const POKEMON_SORT_ORDERS: SortDirection[] = ["asc", "desc"];
export type PokemonSortOrder = SortDirection;

export const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;
export type PokemonTypeFilter = (typeof POKEMON_TYPES)[number];

export type PokemonQueryState = PokemonListQuery & {
  pageSize: PokemonPageSize;
  types: PokemonTypeFilter[];
};

export const POKEMON_QUERY_DEFAULTS: PokemonQueryState = {
  page: 1,
  pageSize: 20,
  keyword: "",
  sort: "id",
  order: "asc",
  types: [],
};

type SearchParamsLike = {
  get: (key: string) => string | null;
};

export type PokemonSearchParams =
  | Record<string, string | string[] | undefined>
  | SearchParamsLike;

const readParam = (
  searchParams: PokemonSearchParams,
  key: PokemonQueryKey,
): string | undefined => {
  if (typeof (searchParams as SearchParamsLike).get === "function") {
    const value = (searchParams as SearchParamsLike).get(key);
    return value ?? undefined;
  }

  const value = searchParams[key];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

const parseIntegerParam = (value: string | undefined): number | undefined => {
  if (!value) {
    return undefined;
  }

  const numberValue = Number(value);
  if (!Number.isInteger(numberValue)) {
    return undefined;
  }

  return numberValue;
};

const parseEnumParam = <T extends string>(
  value: string | undefined,
  allowed: readonly T[],
): T | undefined => {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  return allowed.includes(normalized as T) ? (normalized as T) : undefined;
};

const parseKeywordParam = (value: string | undefined): string => {
  if (!value) {
    return "";
  }

  return value.trim();
};

const parseTypeListParam = (
  value: string | undefined,
  allowed: readonly PokemonTypeFilter[],
): PokemonTypeFilter[] => {
  if (!value) {
    return [];
  }

  const unique = new Set<PokemonTypeFilter>();
  value
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry): entry is PokemonTypeFilter =>
      allowed.includes(entry as PokemonTypeFilter),
    )
    .forEach((entry) => unique.add(entry));

  return Array.from(unique);
};

export const parsePokemonSearchParams = (
  searchParams: PokemonSearchParams,
): PokemonQueryState => {
  const pageValue = parseIntegerParam(readParam(searchParams, "page"));
  const pageSizeValue = parseIntegerParam(readParam(searchParams, "pageSize"));
  const keyword = parseKeywordParam(readParam(searchParams, "keyword"));
  const sortValue = parseEnumParam(
    readParam(searchParams, "sort"),
    POKEMON_SORT_KEYS,
  );
  const orderValue = parseEnumParam(
    readParam(searchParams, "order"),
    POKEMON_SORT_ORDERS,
  );
  const typesValue = parseTypeListParam(
    readParam(searchParams, "type"),
    POKEMON_TYPES,
  );

  return {
    page:
      pageValue !== undefined && pageValue >= POKEMON_PAGE_MIN
        ? pageValue
        : POKEMON_QUERY_DEFAULTS.page,
    pageSize:
      pageSizeValue !== undefined &&
      POKEMON_PAGE_SIZES.includes(pageSizeValue as PokemonPageSize)
        ? (pageSizeValue as PokemonPageSize)
        : POKEMON_QUERY_DEFAULTS.pageSize,
    keyword,
    sort: sortValue ?? POKEMON_QUERY_DEFAULTS.sort,
    order: orderValue ?? POKEMON_QUERY_DEFAULTS.order,
    types: typesValue,
  };
};

const PAGE_RESET_KEYS: Array<keyof PokemonQueryState> = [
  "pageSize",
  "keyword",
  "sort",
  "order",
  "types",
];

export type PokemonQueryUpdate = Partial<PokemonQueryState>;

export const applyPokemonQueryUpdate = (
  current: PokemonQueryState,
  updates: PokemonQueryUpdate,
): PokemonQueryState => {
  const next = {
    ...current,
    ...updates,
  };

  const shouldResetPage = PAGE_RESET_KEYS.some((key) => key in updates);
  if (shouldResetPage) {
    next.page = POKEMON_QUERY_DEFAULTS.page;
  }

  return next;
};

type BuildPokemonSearchParamsOptions = {
  omitDefaults?: boolean;
};

export const buildPokemonSearchParams = (
  state: PokemonQueryState,
  options: BuildPokemonSearchParamsOptions = {},
): URLSearchParams => {
  const { omitDefaults = true } = options;
  const params = new URLSearchParams();
  const keyword = state.keyword.trim();

  const shouldInclude = <T,>(value: T, fallback: T) =>
    !omitDefaults || value !== fallback;

  if (shouldInclude(state.page, POKEMON_QUERY_DEFAULTS.page)) {
    params.set("page", String(state.page));
  }

  if (shouldInclude(state.pageSize, POKEMON_QUERY_DEFAULTS.pageSize)) {
    params.set("pageSize", String(state.pageSize));
  }

  if (keyword && shouldInclude(keyword, POKEMON_QUERY_DEFAULTS.keyword)) {
    params.set("keyword", keyword);
  }

  if (shouldInclude(state.sort, POKEMON_QUERY_DEFAULTS.sort)) {
    params.set("sort", state.sort);
  }

  if (shouldInclude(state.order, POKEMON_QUERY_DEFAULTS.order)) {
    params.set("order", state.order);
  }

  if (state.types.length > 0) {
    params.set("type", state.types.join(","));
  }

  return params;
};

export const buildPokemonUrl = (
  state: PokemonQueryState,
  options?: BuildPokemonSearchParamsOptions,
) => {
  const params = buildPokemonSearchParams(state, options);
  const queryString = params.toString();
  return queryString ? `${POKEMON_ROUTE}?${queryString}` : POKEMON_ROUTE;
};
