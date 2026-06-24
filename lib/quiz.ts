import { PERFUME_ENTRIES } from "@/lib/data";
import type { Perfume, PerfumeEntry } from "@/lib/types";

export type QuizFamily = "fresco" | "floral" | "amaderado" | "oriental" | "gourmand";

export interface QuizAnswers {
  family: string | null;
  time: string | null;
  gender: string | null;
}

export const FAMILY_KEYWORDS: Record<QuizFamily, string[]> = {
  fresco: ["bergamota", "limón", "limon", "naranja", "lima", "mandarina", "pomelo", "cítrico", "citrico", "menta", "brisa", "acuático", "acuatico", "verde", "pepino", "té verde", "violeta"],
  floral: ["rosa", "jazmín", "jazmin", "iris", "lavanda", "loto", "frangipani", "lirio", "magnolia", "neroli", "floral", "peonía", "peonia"],
  amaderado: ["sándalo", "sandalo", "cedro", "madera", "oud", "vetiver", "patchouli", "musgo", "abedul", "guayaco"],
  oriental: ["ámbar", "ambar", "canela", "cardamomo", "azafrán", "azafran", "tabaco", "incienso", "especias", "resina", "almizcle", "ládano", "benjuí"],
  gourmand: ["vainilla", "caramelo", "chocolate", "café", "cafe", "coco", "mango", "durazno", "fresa", "miel", "pralinée", "praline", "toffee", "tiramisu", "dulce"],
};

export function quizScore(p: Perfume, answers: QuizAnswers): number {
  if (answers.gender === "hombre" && p.gender !== "hombre" && p.gender !== "unisex") return -1;
  if (answers.gender === "mujer" && p.gender !== "mujer" && p.gender !== "unisex") return -1;
  if (answers.gender === "unisex" && p.gender !== "unisex") return -1;

  const notesStr = Object.values(p.notes).join(" ").toLowerCase();
  const keywords = answers.family ? FAMILY_KEYWORDS[answers.family as QuizFamily] ?? [] : [];
  let familyScore = 0;
  keywords.forEach((kw) => {
    if (notesStr.includes(kw)) familyScore++;
  });

  let timeScore = 0;
  if (answers.time === "dia") timeScore = p.times.dia;
  if (answers.time === "noche") timeScore = p.times.noche;
  if (answers.time === "ambos") timeScore = (p.times.dia + p.times.noche) / 2;

  return familyScore * 40 + timeScore;
}

export function getQuizResults(answers: QuizAnswers, limit = 6): PerfumeEntry[] {
  return PERFUME_ENTRIES.map(([name, p]) => ({ name, p, score: quizScore(p, answers) }))
    .filter((x) => x.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ name, p }) => [name, p] as PerfumeEntry);
}
