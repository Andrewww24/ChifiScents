"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress";
import { BRAND_LABELS, WHEN_META, buildWaLink } from "@/lib/data";
import { useFragranceModal } from "@/components/providers";
import { WhatsappIcon } from "@/components/whatsapp-icon";

export function FragranceModal() {
  const { entry, close } = useFragranceModal();
  if (!entry) return null;

  const [name, p] = entry;
  const brandLabel = BRAND_LABELS[p.brand];
  const message = `Hola! Me interesa el perfume *${name}* de *${brandLabel}*. ¿Me podés dar más información?`;

  return (
    <Dialog open onOpenChange={(open) => !open && close()}>
      <DialogContent className="max-w-3xl gap-6 p-6 sm:max-w-3xl">
        <DialogTitle className="sr-only">{name}</DialogTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Image src={p.image} alt={name} fill sizes="(min-width: 640px) 40vw, 80vw" className="object-contain p-6" />
          </div>

          <div className="flex flex-col">
            <p className="text-xs uppercase tracking-[0.2em] text-primary">{brandLabel}</p>
            <h2 className="font-heading mt-1 text-3xl text-foreground">{name}</h2>
            <div className="mt-4 h-px w-full bg-border" />

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <NoteColumn label="Salida" value={p.notes.top} />
              <NoteColumn label="Corazón" value={p.notes.heart} />
              <NoteColumn label="Fondo" value={p.notes.base} />
            </div>

            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Cuándo usarlo
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              {WHEN_META.map((m) => {
                const value = p[m.type][m.key as keyof (typeof p)[typeof m.type]];
                return (
                  <div key={m.key} className="flex items-center gap-2.5 text-xs">
                    <span>{m.icon}</span>
                    <span className="w-16 shrink-0 text-muted-foreground">{m.label}</span>
                    <Progress value={value} className="flex-1">
                      <ProgressTrack>
                        <ProgressIndicator style={{ backgroundColor: m.color }} />
                      </ProgressTrack>
                    </Progress>
                    <span className="w-7 shrink-0 text-right text-muted-foreground">{value}</span>
                  </div>
                );
              })}
            </div>

            <a
              href={buildWaLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-105"
            >
              <WhatsappIcon className="size-4" />
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function NoteColumn({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">{label}</span>
      <span className="text-xs text-foreground">{value}</span>
    </div>
  );
}
