"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Perfume, PerfumeEntry } from "@/lib/types";

interface FragranceModalState {
  entry: PerfumeEntry | null;
  open: (entry: PerfumeEntry) => void;
  close: () => void;
}

interface CollectionSearchState {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  jumpToPerfume: (name: string) => void;
}

const FragranceModalContext = createContext<FragranceModalState | null>(null);
const CollectionSearchContext = createContext<CollectionSearchState | null>(null);

export function Providers({ children }: { children: ReactNode }) {
  const [entry, setEntry] = useState<PerfumeEntry | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const open = useCallback((next: PerfumeEntry) => setEntry(next), []);
  const close = useCallback(() => setEntry(null), []);
  const jumpToPerfume = useCallback((name: string) => setSearchTerm(name), []);

  const modalValue = useMemo(() => ({ entry, open, close }), [entry, open, close]);
  const searchValue = useMemo(
    () => ({ searchTerm, setSearchTerm, jumpToPerfume }),
    [searchTerm, jumpToPerfume],
  );

  return (
    <FragranceModalContext.Provider value={modalValue}>
      <CollectionSearchContext.Provider value={searchValue}>{children}</CollectionSearchContext.Provider>
    </FragranceModalContext.Provider>
  );
}

export function useFragranceModal() {
  const ctx = useContext(FragranceModalContext);
  if (!ctx) throw new Error("useFragranceModal must be used within Providers");
  return ctx;
}

export function useCollectionSearch() {
  const ctx = useContext(CollectionSearchContext);
  if (!ctx) throw new Error("useCollectionSearch must be used within Providers");
  return ctx;
}

export type { Perfume };
