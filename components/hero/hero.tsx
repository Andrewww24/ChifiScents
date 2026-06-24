import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ParticlesCanvas } from "@/components/hero/particles-canvas";
import { NovedadesCarousel } from "@/components/hero/novedades-carousel";

export function Hero() {
  return (
    <section id="inicio" className="relative flex flex-col items-center px-6 pt-40 pb-24 text-center">
      <ParticlesCanvas />
      <div className="pointer-events-none absolute left-1/2 top-10 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 size-[360px] rounded-full bg-primary/10 blur-[100px]" />

      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Experiencias exclusivas · 2026
      </p>
      <h1 className="font-heading mt-6 text-5xl font-light leading-tight text-foreground sm:text-7xl">
        Descubre Tu
        <br />
        <em className="text-glow text-primary not-italic">Fragancia</em>
      </h1>
      <p className="mt-6 max-w-md text-balance text-muted-foreground">
        Una delicada selección de perfumes de lujo para cada personalidad y ocasión especial.
      </p>
      <Link
        href="#coleccion"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
      >
        Ver Colección
        <ArrowRight className="size-4" />
      </Link>

      <NovedadesCarousel />
    </section>
  );
}
