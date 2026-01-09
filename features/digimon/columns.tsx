import type { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader"
import type { DigimonListItem } from "@/types/digimon.types"

export const columns: ColumnDef<DigimonListItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(event) => event.stopPropagation()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ getValue, row }) => {
      const src = getValue<string>()

      if (!src) {
        return <span className="text-xs text-slate-500">No image</span>
      }

      return (
        <div className="flex h-10 w-10 items-center justify-center">
          <Image
            src={src}
            alt={row.original.name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-md object-contain"
          />
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ getValue }) => `#${getValue<number>()}`,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ getValue }) => String(getValue<string>()),
  },
]
