"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BRAND_LABELS, PERFUME_ENTRIES } from "@/lib/data";
import { useCollectionSearch } from "@/components/providers";

export function NovedadesCarousel() {
  const { jumpToPerfume } = useCollectionSearch();
  const nuevos = PERFUME_ENTRIES.filter(([, p]) => p.badge === "nuevo");

  if (nuevos.length === 0) return null;

  const items = [...nuevos, ...nuevos];

  return (
    <div className="mt-14 w-full max-w-xl">
      <p className="mb-3 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Novedades
      </p>
      <div className="no-scrollbar overflow-hidden">
        <motion.div
          className="flex w-max gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {items.map(([name, p], i) => (
            <a
              key={`${name}-${i}`}
              href="#coleccion"
              onClick={() => jumpToPerfume(name)}
              className="flex w-56 shrink-0 items-center gap-3 rounded-xl border border-border bg-card/70 p-2.5 transition-colors hover:border-primary"
            >
              <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image src={p.image} alt={name} fill sizes="48px" className="object-contain" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-[0.7rem] text-muted-foreground">
                  {BRAND_LABELS[p.brand]}
                </span>
                <span className="truncate text-sm text-foreground">{name}</span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
