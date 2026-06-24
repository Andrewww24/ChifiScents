import type { Metadata, Viewport } from "next";
import { montserrat, cormorant } from "@/lib/fonts";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { WhatsappFloat } from "@/components/whatsapp-float";
import { FragranceModal } from "@/components/fragrance-modal";
import "./globals.css";

const SITE_URL = "https://chifrii-scents.vercel.app";
const OG_IMAGE = `${SITE_URL}/Perfumes/Armaf/club%20the%20nuit%20intense%20man.png`;
const TITLE = "ChifriScents · Colección Exclusiva de Perfumes";
const DESCRIPTION =
  "Descubre nuestra selección exclusiva de perfumes de lujo. Armaf, Creed, Dior, Rasasi, Lataffa, Afnan y más. Pedí por WhatsApp.";

export const metadata: Metadata = {
  title: TITLE,
  description:
    "Colección exclusiva de perfumes de lujo: Armaf, Creed, Dior, Rasasi, Lataffa y Afnan. Encontrá tu fragancia ideal y pedí por WhatsApp.",
  keywords: [
    "perfumes",
    "fragancias",
    "lujo",
    "Armaf",
    "Creed",
    "Dior",
    "Rasasi",
    "Lataffa",
    "Afnan",
    "Club de Nuit",
    "Sauvage",
    "Aventus",
  ],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    siteName: "ChifriScents",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 500, height: 500 }],
    locale: "es_CR",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`dark ${montserrat.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <Providers>
          <div className="pointer-events-none fixed inset-0 -z-10 bg-radial-fade" />
          <SiteHeader />
          {children}
          <SiteFooter />
          <WhatsappFloat />
          <BackToTop />
          <FragranceModal />
        </Providers>
      </body>
    </html>
  );
}
