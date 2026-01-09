"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DIGIMON_ATTRIBUTES,
  DIGIMON_LEVELS,
  DIGIMON_PAGE_SIZES,
  DIGIMON_SORT_KEYS,
  DIGIMON_SORT_ORDERS,
  type DigimonAttributeFilter,
  type DigimonLevelFilter,
  type DigimonPageSize,
  type DigimonQueryState,
  type DigimonQueryUpdate,
  type DigimonSortKey,
  type DigimonSortOrder,
} from "./digimon-search-params";

type DigimonControlsProps = {
  query: DigimonQueryState;
  onUpdate: (updates: DigimonQueryUpdate) => void;
};

export function DigimonControls({ query, onUpdate }: DigimonControlsProps) {
  const levelValue = query.level || "all";
  const attributeValue = query.attribute || "all";
  const xAntibodyValue =
    query.xAntibody === null ? "all" : query.xAntibody ? "true" : "false";

  return (
    <section className="mt-4 grid gap-4 rounded-md border p-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      <div className="space-y-2">
        <Label htmlFor="digimon-keyword">Keyword</Label>
        <Input
          id="digimon-keyword"
          placeholder="Search by name or ID"
          value={query.keyword}
          onChange={(event) => onUpdate({ keyword: event.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Level</Label>
        <Select
          value={levelValue}
          onValueChange={(value) =>
            onUpdate({
              level: value === "all" ? "" : (value as DigimonLevelFilter),
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            {DIGIMON_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Attribute</Label>
        <Select
          value={attributeValue}
          onValueChange={(value) =>
            onUpdate({
              attribute:
                value === "all" ? "" : (value as DigimonAttributeFilter),
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All attributes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All attributes</SelectItem>
            {DIGIMON_ATTRIBUTES.map((attribute) => (
              <SelectItem key={attribute} value={attribute}>
                {attribute}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>X-Antibody</Label>
        <Select
          value={xAntibodyValue}
          onValueChange={(value) =>
            onUpdate({
              xAntibody:
                value === "all" ? null : value === "true" ? true : false,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Yes</SelectItem>
            <SelectItem value="false">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Sort by</Label>
        <Select
          value={query.sort}
          onValueChange={(value) => onUpdate({ sort: value as DigimonSortKey })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {DIGIMON_SORT_KEYS.map((key) => (
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
            onUpdate({ order: value as DigimonSortOrder })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            {DIGIMON_SORT_ORDERS.map((order) => (
              <SelectItem key={order} value={order}>
                {order === "asc" ? "Ascending" : "Descending"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Page size</Label>
        <Select
          value={String(query.pageSize)}
          onValueChange={(value) =>
            onUpdate({ pageSize: Number(value) as DigimonPageSize })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Page size" />
          </SelectTrigger>
          <SelectContent>
            {DIGIMON_PAGE_SIZES.map((size) => (
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
