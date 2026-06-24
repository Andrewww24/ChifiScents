import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/section-header";
import { Reveal } from "@/components/reveal";
import { buildWaLink } from "@/lib/data";

const STEPS = [
  {
    num: "01",
    icon: "🌿",
    title: "¿Qué notas te atraen?",
    desc: (
      <>
        Las fragancias se dividen en familias olfativas. Las <strong>amaderadas</strong> proyectan
        elegancia y calidez. Las <strong>frescas y cítricas</strong> son ligeras y energéticas. Las{" "}
        <strong>orientales y especiadas</strong> son intensas y seductoras. Las{" "}
        <strong>florales</strong> son románticas y femeninas.
      </>
    ),
    tags: ["🌲 Amaderado", "🍋 Cítrico", "🌶️ Oriental", "🌸 Floral", "🍬 Gourmand"],
  },
  {
    num: "02",
    icon: "🕐",
    title: "¿Para qué ocasión?",
    desc: (
      <>
        Los perfumes varían según la ocasión. Para el <strong>trabajo o el día a día</strong>{" "}
        buscá algo fresco y discreto. Para una <strong>cita o noche especial</strong> opta por
        algo más intenso y sensual. Para el <strong>deporte o verano</strong>, algo ligero y
        acuático.
      </>
    ),
    tags: ["☀️ Día", "🌙 Noche", "💼 Trabajo", "🎉 Fiesta", "🏖️ Verano"],
  },
];

export function GuiaSection() {
  return (
    <section id="guia" className="px-6 py-24 sm:px-10">
      <SectionHeader tag="Tu fragancia ideal" title="¿Cómo elegir tu perfume?" />
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal key={step.num} delay={i * 0.1}>
            <Card className="h-full border-border bg-card/60">
              <CardContent className="flex flex-col gap-4 px-6">
                <span className="text-xs text-muted-foreground">{step.num}</span>
                <span className="text-3xl">{step.icon}</span>
                <h3 className="font-heading text-xl text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-muted-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}

        <Reveal delay={0.2}>
          <Card className="h-full border-border bg-card/60">
            <CardContent className="flex h-full flex-col gap-4 px-6">
              <span className="text-xs text-muted-foreground">03</span>
              <span className="text-3xl">💬</span>
              <h3 className="font-heading text-xl text-foreground">¡Consultános!</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                ¿No sabés por dónde empezar o querés un perfume similar a uno de lujo? Escribinos
                por WhatsApp y te ayudamos a encontrar <strong>tu fragancia perfecta</strong> según
                tu personalidad y presupuesto.
              </p>
              <a
                href={buildWaLink("Hola! Me gustaría que me ayuden a elegir un perfume.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-transform hover:scale-105"
              >
                <MessageCircle className="size-4" />
                Pedir asesoría gratis
              </a>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
