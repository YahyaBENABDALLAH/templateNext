"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/select/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  POKEMON_SORT_KEYS,
  POKEMON_SORT_ORDERS,
  POKEMON_PAGE_SIZES,
  POKEMON_TYPES,
} from "./pokemon-search-params";
import type {
  PokemonQueryState,
  PokemonQueryUpdate,
  PokemonPageSize,
  PokemonSortKey,
  PokemonSortOrder,
  PokemonTypeFilter,
} from "./pokemon-search-params";

type TypeMultiSelectProps = {
  value: PokemonTypeFilter[];
  onChange: (next: PokemonTypeFilter[]) => void;
};

function TypeMultiSelect({ value, onChange }: TypeMultiSelectProps) {
  const sanitizeValues = (values: string[]) =>
    POKEMON_TYPES.filter((type) => values.includes(type));
  const options = POKEMON_TYPES.map((type) => ({
    label: type,
    value: type,
  }));

  return (
    <div className="space-y-2">
      <Label>Types</Label>
      <div className="flex items-center gap-2">
        <MultiSelect
          options={options}
          onValueChange={(values) => onChange(sanitizeValues(values))}
          defaultValue={value}
          placeholder="All types"
          searchable={false}
        />
      </div>
    </div>
  );
}

type PokemonControlsProps = {
  query: PokemonQueryState;
  onUpdate: (updates: PokemonQueryUpdate) => void;
};

export function PokemonControls({
  query,
  onUpdate,
}: PokemonControlsProps) {
  return (
    <section className="mt-4 grid gap-4 rounded-md border p-4 sm:grid-cols-2 lg:grid-cols-5">
      <div className="space-y-2">
        <Label htmlFor="pokemon-keyword">Keyword</Label>
        <Input
          id="pokemon-keyword"
          placeholder="Search by name or ID"
          value={query.keyword}
          onChange={(event) =>
            onUpdate({ keyword: event.target.value })
          }
        />
      </div>
      <div className="space-y-2">
        <Label>Sort by</Label>
        <Select
          value={query.sort}
          onValueChange={(value) =>
            onUpdate({ sort: value as PokemonSortKey })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {POKEMON_SORT_KEYS.map((key) => (
              <SelectItem key={key} value={key}>
                {key === "id" ? "ID" : "Name"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Order</Label>
        <Select
          value={query.order}
          onValueChange={(value) =>
            onUpdate({ order: value as PokemonSortOrder })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            {POKEMON_SORT_ORDERS.map((order) => (
              <SelectItem key={order} value={order}>
                {order === "asc" ? "Ascending" : "Descending"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <TypeMultiSelect
        value={query.types}
        onChange={(types) => onUpdate({ types })}
      />
      <div className="space-y-2">
        <Label>Page size</Label>
        <Select
          value={String(query.pageSize)}
          onValueChange={(value) =>
            onUpdate({ pageSize: Number(value) as PokemonPageSize })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            {POKEMON_PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
