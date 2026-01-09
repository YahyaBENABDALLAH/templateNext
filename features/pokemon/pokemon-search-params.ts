import type {
  PokemonListQuery,
  PokemonSortKey,
  SortDirection,
} from "@/types/pokemon.types";

export const POKEMON_ROUTE = "/dashboard/pokemon";

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

export type PokemonSearchParams = Partial<
  Record<
    "page" | "pageSize" | "keyword" | "sort" | "order" | "type",
    string | string[]
  >
>;

const getParam = (
  searchParams: PokemonSearchParams,
  key: keyof PokemonSearchParams,
): string | undefined => {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
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

const parseTypeListParam = (
  value: string | undefined,
): PokemonTypeFilter[] => {
  if (!value) {
    return [];
  }

  const unique = new Set<PokemonTypeFilter>();
  value
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter((entry): entry is PokemonTypeFilter =>
      POKEMON_TYPES.includes(entry as PokemonTypeFilter),
    )
    .forEach((entry) => unique.add(entry));

  return Array.from(unique);
};

export const parsePokemonSearchParams = (
  searchParams: PokemonSearchParams,
): PokemonQueryState => {
  const toInt = (value: string | undefined) => {
    if (!value) {
      return undefined;
    }

    const numberValue = Number(value);
    return Number.isInteger(numberValue) ? numberValue : undefined;
  };

  const pageValue = toInt(getParam(searchParams, "page"));
  const pageSizeValue = toInt(getParam(searchParams, "pageSize"));
  const keyword = (getParam(searchParams, "keyword") ?? "").trim();
  const sortValue = parseEnumParam(
    getParam(searchParams, "sort"),
    POKEMON_SORT_KEYS,
  );
  const orderValue = parseEnumParam(
    getParam(searchParams, "order"),
    POKEMON_SORT_ORDERS,
  );
  const typesValue = parseTypeListParam(getParam(searchParams, "type"));
  const defaults = POKEMON_QUERY_DEFAULTS;

  return {
    page:
      pageValue !== undefined && pageValue >= POKEMON_PAGE_MIN
        ? pageValue
        : defaults.page,
    pageSize:
      pageSizeValue !== undefined &&
      POKEMON_PAGE_SIZES.includes(pageSizeValue as PokemonPageSize)
        ? (pageSizeValue as PokemonPageSize)
        : defaults.pageSize,
    keyword,
    sort: sortValue ?? defaults.sort,
    order: orderValue ?? defaults.order,
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
  const defaults = POKEMON_QUERY_DEFAULTS;
  const keyword = state.keyword.trim();

  const entries: Array<[string, string | number, string | number]> = [
    ["page", state.page, defaults.page],
    ["pageSize", state.pageSize, defaults.pageSize],
    ["sort", state.sort, defaults.sort],
    ["order", state.order, defaults.order],
  ];

  for (const [key, value, fallback] of entries) {
    if (!omitDefaults || value !== fallback) {
      params.set(key, String(value));
    }
  }

  if (keyword && (!omitDefaults || keyword !== defaults.keyword)) {
    params.set("keyword", keyword);
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
