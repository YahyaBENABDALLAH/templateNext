"use client"

import { DataTable } from "@/components/ui/data-table"
import { pokemonColumns } from "./pokemon-columns"
import { PokemonFilters } from "./pokemon-filters"
import { usePokemonTable } from "../../context/pokemon-context"

export function PokemonTable() {
  const {
    items,
    isLoading,
    error,
    pagination,
    pageCount,
    onPaginationChange,
  } = usePokemonTable()

  return (
    <section className="flex w-full flex-col gap-4">
      <PokemonFilters />
      {error ? (
        <p className="text-destructive text-sm">
          Failed to load Pokemon list. {error.message}
        </p>
      ) : null}
      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading Pokemon...</p>
      ) : (
        <DataTable
          columns={pokemonColumns}
          data={items}
          getRowId={(row) => row.key}
          pagination={pagination}
          pageCount={pageCount}
          manualPagination
          onPaginationChange={onPaginationChange}
        />
      )}
    </section>
  )
}
