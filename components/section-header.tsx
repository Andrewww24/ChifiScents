export function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-12 flex flex-col items-center text-center">
      <span className="text-xs uppercase tracking-[0.25em] text-primary">{tag}</span>
      <h2 className="font-heading mt-3 text-4xl text-foreground">{title}</h2>
      <div className="mt-4 h-px w-16 bg-primary/40" />
    </div>
  );
}
