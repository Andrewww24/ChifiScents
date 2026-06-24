"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function pageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export function PaginationControls({
  page,
  totalPages,
  onPageChange,
  targetId,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  targetId: string;
}) {
  if (totalPages <= 1) return null;

  function goTo(p: number) {
    if (p < 1 || p > totalPages) return;
    onPageChange(p);
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5">
      <Button variant="outline" size="icon-sm" disabled={page === 1} onClick={() => goTo(page - 1)}>
        <ChevronLeft className="size-4" />
      </Button>
      {pageNumbers(page, totalPages).map((n, i) =>
        n === "…" ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <Button
            key={n}
            variant={n === page ? "default" : "outline"}
            size="icon-sm"
            onClick={() => goTo(n)}
          >
            {n}
          </Button>
        ),
      )}
      <Button
        variant="outline"
        size="icon-sm"
        disabled={page === totalPages}
        onClick={() => goTo(page + 1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
