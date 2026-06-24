import rawPerfumes from "@/data/perfumes.json";
import type { Brand, PerfumeData, PerfumeEntry } from "@/lib/types";

function normalize(data: PerfumeData): PerfumeData {
  const out: PerfumeData = {};
  for (const [name, p] of Object.entries(data)) {
    out[name] = { ...p, image: p.image.startsWith("/") ? p.image : `/${p.image}` };
  }
  return out;
}

export const PERFUME_DATA: PerfumeData = normalize(rawPerfumes as PerfumeData);

export const PERFUME_ENTRIES: PerfumeEntry[] = Object.entries(PERFUME_DATA);

export const BRAND_LABELS: Record<Brand, string> = {
  armaf: "Armaf",
  rasasi: "Rasasi",
  afnan: "Afnan",
  creed: "Creed",
  dior: "Dior",
  lataffa: "Lataffa",
};

export const BRANDS: Brand[] = ["afnan", "armaf", "creed", "dior", "lataffa", "rasasi"];

export const WA_NUM = "50687086834";

export function buildWaLink(message: string) {
  return `https://wa.me/${WA_NUM}?text=${encodeURIComponent(message)}`;
}

export const WHEN_META = [
  { key: "invierno", label: "Invierno", icon: "❄️", color: "#6ab0f5", type: "seasons" as const },
  { key: "primavera", label: "Primavera", icon: "🌸", color: "#69f0ae", type: "seasons" as const },
  { key: "verano", label: "Verano", icon: "☀️", color: "#ff6e40", type: "seasons" as const },
  { key: "otono", label: "Otoño", icon: "🍂", color: "#ffab40", type: "seasons" as const },
  { key: "dia", label: "Día", icon: "🔆", color: "#ffd740", type: "times" as const },
  { key: "noche", label: "Noche", icon: "🌙", color: "#7986cb", type: "times" as const },
];

export const ITEMS_PER_PAGE = 15;
