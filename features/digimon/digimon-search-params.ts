import type {
  DigimonListQuery,
  DigimonSortKey,
  SortDirection,
} from "@/types/digimon.types";

export const DIGIMON_ROUTE = "/dashboard/digimon";

export const DIGIMON_PAGE_MIN = 1;
export const DIGIMON_PAGE_SIZES = [10, 20, 50] as const;
export type DigimonPageSize = (typeof DIGIMON_PAGE_SIZES)[number];

export const DIGIMON_SORT_KEYS: DigimonSortKey[] = ["id", "name"];
export type { DigimonSortKey };

export const DIGIMON_SORT_ORDERS: SortDirection[] = ["asc", "desc"];
export type DigimonSortOrder = SortDirection;

export const DIGIMON_LEVELS = [
  "Baby I",
  "Baby II",
  "Child",
  "Adult",
  "Perfect",
  "Ultimate",
  "Armor",
  "Hybrid",
  "Unknown",
] as const;
export type DigimonLevelFilter = (typeof DIGIMON_LEVELS)[number];

export const DIGIMON_ATTRIBUTES = [
  "Data",
  "Free",
  "Virus",
  "Vaccine",
  "Unknown",
  "Variable",
  "No Data",
] as const;
export type DigimonAttributeFilter = (typeof DIGIMON_ATTRIBUTES)[number];

export type DigimonQueryState = DigimonListQuery & {
  pageSize: DigimonPageSize;
  level: DigimonLevelFilter | "";
  attribute: DigimonAttributeFilter | "";
  xAntibody: boolean | null;
};

export const DIGIMON_QUERY_DEFAULTS: DigimonQueryState = {
  page: 1,
  pageSize: 20,
  keyword: "",
  sort: "id",
  order: "asc",
  level: "",
  attribute: "",
  xAntibody: null,
};

export type DigimonSearchParams = Partial<
  Record<
    | "page"
    | "pageSize"
    | "keyword"
    | "sort"
    | "order"
    | "level"
    | "attribute"
    | "xAntibody",
    string | string[]
  >
>;

const getParam = (
  searchParams: DigimonSearchParams,
  key: keyof DigimonSearchParams,
): string | undefined => {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
};

const parseListParam = <T extends string>(
  value: string | undefined,
  allowed: readonly T[],
): T | undefined => {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  return allowed.find((entry) => entry.toLowerCase() === normalized);
};

const parseBooleanParam = (
  value: string | undefined,
): boolean | undefined => {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  if (normalized === "true") {
    return true;
  }

  if (normalized === "false") {
    return false;
  }

  return undefined;
};

export const parseDigimonSearchParams = (
  searchParams: DigimonSearchParams,
): DigimonQueryState => {
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
  const sortValue = parseListParam(
    getParam(searchParams, "sort"),
    DIGIMON_SORT_KEYS,
  );
  const orderValue = parseListParam(
    getParam(searchParams, "order"),
    DIGIMON_SORT_ORDERS,
  );
  const levelValue = parseListParam(
    getParam(searchParams, "level"),
    DIGIMON_LEVELS,
  );
  const attributeValue = parseListParam(
    getParam(searchParams, "attribute"),
    DIGIMON_ATTRIBUTES,
  );
  const xAntibodyValue = parseBooleanParam(
    getParam(searchParams, "xAntibody"),
  );
  const defaults = DIGIMON_QUERY_DEFAULTS;

  return {
    page:
      pageValue !== undefined && pageValue >= DIGIMON_PAGE_MIN
        ? pageValue
        : defaults.page,
    pageSize:
      pageSizeValue !== undefined &&
      DIGIMON_PAGE_SIZES.includes(pageSizeValue as DigimonPageSize)
        ? (pageSizeValue as DigimonPageSize)
        : defaults.pageSize,
    keyword,
    sort: sortValue ?? defaults.sort,
    order: orderValue ?? defaults.order,
    level: levelValue ?? defaults.level,
    attribute: attributeValue ?? defaults.attribute,
    xAntibody:
      xAntibodyValue !== undefined ? xAntibodyValue : defaults.xAntibody,
  };
};

const PAGE_RESET_KEYS: Array<keyof DigimonQueryState> = [
  "pageSize",
  "keyword",
  "sort",
  "order",
  "level",
  "attribute",
  "xAntibody",
];

export type DigimonQueryUpdate = Partial<DigimonQueryState>;

export const applyDigimonQueryUpdate = (
  current: DigimonQueryState,
  updates: DigimonQueryUpdate,
): DigimonQueryState => {
  const next = {
    ...current,
    ...updates,
  };

  const shouldResetPage = PAGE_RESET_KEYS.some((key) => key in updates);
  if (shouldResetPage) {
    next.page = DIGIMON_QUERY_DEFAULTS.page;
  }

  return next;
};

type BuildDigimonSearchParamsOptions = {
  omitDefaults?: boolean;
};

export const buildDigimonSearchParams = (
  state: DigimonQueryState,
  options: BuildDigimonSearchParamsOptions = {},
): URLSearchParams => {
  const { omitDefaults = true } = options;
  const params = new URLSearchParams();
  const defaults = DIGIMON_QUERY_DEFAULTS;
  const keyword = state.keyword.trim();
  const level = state.level.trim();
  const attribute = state.attribute.trim();

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

  if (level && (!omitDefaults || level !== defaults.level)) {
    params.set("level", level);
  }

  if (attribute && (!omitDefaults || attribute !== defaults.attribute)) {
    params.set("attribute", attribute);
  }

  if (state.xAntibody !== null) {
    params.set("xAntibody", String(state.xAntibody));
  }

  return params;
};

export const buildDigimonUrl = (
  state: DigimonQueryState,
  options?: BuildDigimonSearchParamsOptions,
) => {
  const params = buildDigimonSearchParams(state, options);
  const queryString = params.toString();
  return queryString ? `${DIGIMON_ROUTE}?${queryString}` : DIGIMON_ROUTE;
};
