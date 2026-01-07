"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { PokemonListItem } from "@/types/pokemon.types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const columns: ColumnDef<PokemonListItem>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue }) => `#${getValue<number>()}`,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => String(getValue<string>()),
  },
]

type PokemonTableProps = {
  data: PokemonListItem[]
  onRowClick?: (row: PokemonListItem) => void
}

export function PokemonTable({ data, onRowClick }: PokemonTableProps) {
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => String(row.id),
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={onRowClick ? "cursor-pointer" : undefined}
              onClick={onRowClick ? () => onRowClick(row.original) : undefined}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
