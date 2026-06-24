"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BRAND_LABELS, buildWaLink } from "@/lib/data";
import { useFragranceModal } from "@/components/providers";
import { WhatsappIcon } from "@/components/whatsapp-icon";
import type { Perfume } from "@/lib/types";

export function ProductCard({
  name,
  perfume,
  index = 0,
  priority = false,
}: {
  name: string;
  perfume: Perfume;
  index?: number;
  priority?: boolean;
}) {
  const { open } = useFragranceModal();
  const brandLabel = BRAND_LABELS[perfume.brand];
  const message = `Hola! Me interesa el perfume *${name}* de *${brandLabel}*. ¿Me podés dar más información?`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.04 }}
    >
      <Card
        onClick={() => open([name, perfume])}
        className="group relative cursor-pointer gap-0 overflow-hidden border-border bg-card/60 p-0 transition-colors hover:border-primary"
      >
        {perfume.badge && (
          <Badge
            className="absolute left-3 top-3 z-10"
            variant={perfume.badge === "mas-vendido" ? "default" : "secondary"}
          >
            {perfume.badge === "mas-vendido" ? "🔥 Más vendido" : "✨ Nuevo"}
          </Badge>
        )}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={perfume.image}
            alt={name}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col gap-1 p-4">
          <p className="text-xs text-muted-foreground">{brandLabel}</p>
          <h3 className="font-heading truncate text-lg text-foreground">{name}</h3>
          <a
            href={buildWaLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
          >
            <WhatsappIcon className="size-3.5" />
            Pedir por WhatsApp
          </a>
        </div>
      </Card>
    </motion.div>
  );
}
