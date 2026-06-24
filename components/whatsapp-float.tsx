import { buildWaLink } from "@/lib/data";
import { WhatsappIcon } from "@/components/whatsapp-icon";

export function WhatsappFloat() {
  return (
    <a
      href={buildWaLink("Hola! Quisiera hacer una consulta sobre sus perfumes.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-105"
    >
      <WhatsappIcon className="size-6" />
    </a>
  );
}
