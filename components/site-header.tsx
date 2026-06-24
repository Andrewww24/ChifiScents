"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#guia", label: "Guía" },
  { href: "#quiz", label: "Quiz" },
  { href: "#coleccion", label: "Colección" },
  { href: "#marcas", label: "Fragancias" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 transition-all duration-300 sm:px-10",
        scrolled
          ? "border-b border-border bg-background/80 py-3 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Link href="#inicio" className="font-heading text-xl tracking-wide text-foreground">
        Chifri<span className="text-primary">·</span>Scents
      </Link>
      <nav className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="transition-colors hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
