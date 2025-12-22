"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import type { PokemonListItem } from "@/types/pokemon.types"

function formatName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export const pokemonColumns: ColumnDef<PokemonListItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => formatName(row.getValue("name") as string),
  },
  {
    accessorKey: "key",
    header: "Key",
    cell: ({ row }) => (
      <Badge label={row.getValue("key") as string} size="xs" />
    ),
  },
  {
    accessorKey: "url",
    header: "Url",
    cell: ({ row }) => {
      const url = row.getValue("url") as string
      return (
        <Link
          className="text-primary max-w-[260px] truncate underline"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {url}
        </Link>
      )
    },
  },
]
