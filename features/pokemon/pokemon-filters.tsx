"use client"

import { Search } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type {
  PokemonSortKey,
  SortDirection,
} from "@/types/pokemon.types"
import { usePokemonTable } from "../../context/pokemon-context"

const SORT_OPTIONS: { value: PokemonSortKey; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "key", label: "Key" },
  { value: "url", label: "Url" },
]

const ORDER_OPTIONS: { value: SortDirection; label: string }[] = [
  { value: "asc", label: "Asc" },
  { value: "desc", label: "Desc" },
]

export function PokemonFilters() {
  const {
    filters,
    updateFilters,
    filteredCount,
    totalCount,
    isFetching,
  } = usePokemonTable()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <InputGroup className="w-full max-w-[280px]">
        <InputGroupAddon>
          <Search className="size-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search name, key, url"
          value={filters.search}
          onChange={(event) =>
            updateFilters({ search: event.currentTarget.value })
          }
        />
      </InputGroup>
      <Select
        value={filters.sortKey}
        onValueChange={(value) =>
          updateFilters({ sortKey: value as PokemonSortKey })
        }
      >
        <SelectTrigger className="h-9 min-w-[140px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={filters.sortDirection}
        onValueChange={(value) =>
          updateFilters({ sortDirection: value as SortDirection })
        }
      >
        <SelectTrigger className="h-9 min-w-[120px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          {ORDER_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <span>
          {filteredCount} of {totalCount}
        </span>
        {isFetching ? <span aria-live="polite">Refreshing...</span> : null}
      </div>
    </div>
  )
}
