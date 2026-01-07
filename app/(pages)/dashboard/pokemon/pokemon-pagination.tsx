"use client"

import { Button } from "@/components/ui/button";

type PokemonPaginationProps = {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (nextPage: number) => void;
};

export function PokemonPagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
}: PokemonPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const canPrevious = page > 1;
  const canNext = page < totalPages;

  const goToPage = (nextPage: number) => {
    const clampedPage = Math.min(Math.max(1, nextPage), totalPages);
    if (clampedPage !== page) {
      onPageChange(clampedPage);
    }
  };

  return (
    <div className="mt-4 flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => goToPage(page - 1)}
        disabled={!canPrevious}
      >
        Previous
      </Button>
      <span className="text-sm text-slate-600">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => goToPage(page + 1)}
        disabled={!canNext}
      >
        Next
      </Button>
    </div>
  );
}
