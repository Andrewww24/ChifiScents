"use client";

import { motion } from "framer-motion";

const BRANDS = [
  "Tom Ford",
  "Creed",
  "Armaf",
  "Chanel",
  "Rasasi",
  "Dior",
  "Montale",
  "Versace",
  "Prada",
  "Hermès",
  "YSL",
  "Kilian",
  "Givenchy",
  "Gucci",
  "Valentino",
  "Mancera",
];

export function MarqueeBand() {
  const items = [...BRANDS, ...BRANDS];

  return (
    <div className="overflow-hidden border-y border-border bg-card/40 py-4">
      <motion.div
        className="flex w-max items-center gap-3 whitespace-nowrap text-sm text-muted-foreground"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {items.map((brand, i) => (
          <span key={`${brand}-${i}`} className="flex items-center gap-3">
            {brand}
            <span className="text-primary">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
