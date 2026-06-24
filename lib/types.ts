export type Brand = "armaf" | "rasasi" | "afnan" | "creed" | "dior" | "lataffa";
export type Gender = "hombre" | "mujer" | "unisex";
export type Badge = "mas-vendido" | "nuevo";

export interface PerfumeNotes {
  top: string;
  heart: string;
  base: string;
}

export interface PerfumeSeasons {
  invierno: number;
  primavera: number;
  verano: number;
  otono: number;
}

export interface PerfumeTimes {
  dia: number;
  noche: number;
}

export interface Perfume {
  brand: Brand;
  gender: Gender;
  image: string;
  notes: PerfumeNotes;
  seasons: PerfumeSeasons;
  times: PerfumeTimes;
  badge?: Badge;
}

export type PerfumeEntry = [string, Perfume];

export type PerfumeData = Record<string, Perfume>;
