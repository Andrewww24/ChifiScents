"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product-card";
import { PaginationControls } from "@/components/collection/pagination-controls";
import { SectionHeader } from "@/components/section-header";
import { BRANDS, BRAND_LABELS, ITEMS_PER_PAGE, PERFUME_ENTRIES } from "@/lib/data";
import { useCollectionSearch } from "@/components/providers";

const GENDERS = [
  { value: "all", label: "Todos" },
  { value: "hombre", label: "♂ Hombre" },
  { value: "mujer", label: "♀ Mujer" },
  { value: "unisex", label: "⚥ Unisex" },
];

export function Collection() {
  const { searchTerm, setSearchTerm } = useCollectionSearch();
  const [brand, setBrand] = useState("all");
  const [gender, setGender] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return PERFUME_ENTRIES.filter(([name, p]) => {
      const matchBrand = brand === "all" || p.brand === brand;
      const matchGender = gender === "all" || p.gender === gender;
      const matchQuery = !q || name.toLowerCase().includes(q);
      return matchBrand && matchGender && matchQuery;
    });
  }, [brand, gender, searchTerm]);

  const filterKey = `${brand}|${gender}|${searchTerm}`;
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey);
  if (filterKey !== prevFilterKey) {
    setPrevFilterKey(filterKey);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <section id="coleccion" className="px-6 py-24 sm:px-10">
      <SectionHeader tag="Nuestras Fragancias" title="La Colección" />

      <div id="marcas" className="mx-auto mb-5 flex max-w-4xl justify-center">
        <Tabs value={brand} onValueChange={setBrand}>
          <TabsList className="h-auto! flex-wrap justify-center gap-2 bg-transparent p-0">
            <TabsTrigger value="all" className="h-auto! rounded-full border border-border px-3.5 py-1.5 data-active:border-primary data-active:bg-primary/10">
              Todas
            </TabsTrigger>
            {BRANDS.map((b) => (
              <TabsTrigger
                key={b}
                value={b}
                className="h-auto! rounded-full border border-border px-3.5 py-1.5 data-active:border-primary data-active:bg-primary/10"
              >
                {BRAND_LABELS[b]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="mx-auto mb-8 flex justify-center">
        <Tabs value={gender} onValueChange={setGender}>
          <TabsList className="h-auto! flex-wrap justify-center gap-2 bg-transparent p-0">
            {GENDERS.map((g) => (
              <TabsTrigger
                key={g.value}
                value={g.value}
                className="h-auto! rounded-full border border-border px-3.5 py-1.5 data-active:border-primary data-active:bg-primary/10"
              >
                {g.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="relative mx-auto mb-10 max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar fragancia..."
          className="h-10 pl-9 pr-9"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            aria-label="Limpiar"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">No se encontraron fragancias.</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {pageItems.map(([name, p], i) => (
            <ProductCard key={name} name={name} perfume={p} index={i} priority={page === 1 && i < 3} />
          ))}
        </div>
      )}

      <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} targetId="coleccion" />
    </section>
  );
}
