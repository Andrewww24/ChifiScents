"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { ProductCard } from "@/components/product-card";
import { getQuizResults, type QuizAnswers } from "@/lib/quiz";
import { cn } from "@/lib/utils";

interface QuizOption {
  value: string;
  icon: string;
  label: string;
  desc: string;
}

const QUESTIONS: { key: keyof QuizAnswers; question: string; options: QuizOption[] }[] = [
  {
    key: "family",
    question: "¿Qué tipo de aroma te atrae más?",
    options: [
      { value: "fresco", icon: "🌿", label: "Fresco & Natural", desc: "Cítrico, verde, acuático" },
      { value: "floral", icon: "🌹", label: "Floral", desc: "Rosa, jazmín, lavanda" },
      { value: "amaderado", icon: "🪵", label: "Amaderado", desc: "Cedro, sándalo, oud" },
      { value: "oriental", icon: "🌶️", label: "Oriental & Especiado", desc: "Ámbar, canela, especias" },
      { value: "gourmand", icon: "🍫", label: "Dulce & Gourmand", desc: "Vainilla, caramelo, coco" },
    ],
  },
  {
    key: "time",
    question: "¿Para qué momento del día?",
    options: [
      { value: "dia", icon: "☀️", label: "De día", desc: "Trabajo, salidas, deporte" },
      { value: "noche", icon: "🌙", label: "De noche", desc: "Cenas, fiestas, citas" },
      { value: "ambos", icon: "✨", label: "Cualquier momento", desc: "Versátil, todo el día" },
    ],
  },
  {
    key: "gender",
    question: "¿Para quién es?",
    options: [
      { value: "hombre", icon: "♂️", label: "Para él", desc: "Fragancias masculinas" },
      { value: "mujer", icon: "♀️", label: "Para ella", desc: "Fragancias femeninas" },
      { value: "unisex", icon: "⚥", label: "Unisex", desc: "Para cualquiera" },
    ],
  },
];

const EMPTY_ANSWERS: QuizAnswers = { family: null, time: null, gender: null };

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(EMPTY_ANSWERS);
  const [selected, setSelected] = useState<string | null>(null);

  function selectOption(value: string) {
    setSelected(value);
    setTimeout(() => {
      const key = QUESTIONS[step].key;
      setAnswers((prev) => ({ ...prev, [key]: value }));
      setSelected(null);
      setStep((s) => s + 1);
    }, 280);
  }

  function retry() {
    setAnswers(EMPTY_ANSWERS);
    setStep(0);
  }

  const isResults = step >= QUESTIONS.length;
  const results = isResults ? getQuizResults(answers) : [];

  return (
    <section id="quiz" className="px-6 py-24 sm:px-10">
      <SectionHeader tag="Encontrá tu fragancia ideal" title="Quiz de Fragancias" />
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-center gap-2">
          {QUESTIONS.map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={cn(
                  "size-2.5 rounded-full transition-colors",
                  step >= i ? "bg-primary" : "bg-muted",
                )}
              />
              {i < QUESTIONS.length - 1 && (
                <div
                  className={cn(
                    "h-px w-10 transition-colors",
                    step > i ? "bg-primary" : "bg-muted",
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!isResults ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="font-heading mb-8 text-center text-2xl text-foreground">
                {QUESTIONS[step].question}
              </h3>
              <div
                className={cn(
                  "grid gap-4",
                  QUESTIONS[step].options.length > 3
                    ? "sm:grid-cols-3 md:grid-cols-5"
                    : "sm:grid-cols-3",
                )}
              >
                {QUESTIONS[step].options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => selectOption(opt.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border border-border bg-card/50 px-4 py-6 text-center transition-all hover:border-primary",
                      selected === opt.value && "border-primary bg-primary/10",
                    )}
                  >
                    <span className="text-3xl">{opt.icon}</span>
                    <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    <span className="text-xs text-muted-foreground">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="mb-6 text-center text-sm text-primary">
                ✦ Encontramos estas fragancias para vos
              </p>
              {results.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground">
                  No encontramos coincidencias. Probá con otras opciones.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                  {results.map(([name, p], i) => (
                    <ProductCard key={name} name={name} perfume={p} index={i} />
                  ))}
                </div>
              )}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={retry}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  ↩ Hacer el quiz de nuevo
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
