"use client"

import * as React from "react"
import {
  type OnChangeFn,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import type { DigimonListItem } from "@/types/digimon.types"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { columns } from "./columns"

type DigimonTableProps = {
  data: DigimonListItem[]
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
  onRowClick?: (row: DigimonListItem) => void
}

export function DigimonTable({
  data,
  sorting,
  onSortingChange,
  onRowClick,
}: DigimonTableProps) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => String(row.id),
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    state: {
      sorting,
      rowSelection,
    },
  })

  const hasSelection = table.getSelectedRowModel().rows.length > 0
  const handlePrimaryClick = () => {
    const selectedRows = table.getSelectedRowModel().rows

    if (selectedRows.length === 0) {
      return
    }

    const message = selectedRows
      .map((row) => `key=${row.id}, id=${row.original.id}`)
      .join("\n")

    window.alert(message)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end">
        <Button
          variant="primary"
          disabled={!hasSelection}
          onClick={handlePrimaryClick}
        >
          Primary action
        </Button>
      </div>
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
                data-state={row.getIsSelected() ? "selected" : undefined}
                onClick={
                  onRowClick ? () => onRowClick(row.original) : undefined
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
