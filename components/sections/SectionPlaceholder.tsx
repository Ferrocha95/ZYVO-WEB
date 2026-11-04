interface SectionPlaceholderProps {
  id: string
  n: string
  eyebrow: string
  title: string
}

// Stub temporal de sección. Mantiene el ancla (id) y la estructura de la home
// mientras cada sección real se construye en su fase. Se retira al implementarla.
export default function SectionPlaceholder({ id, n, eyebrow, title }: SectionPlaceholderProps) {
  return (
    <section id={id} className="scroll-mt-24 px-6 py-20">
      <div className="max-w-5xl mx-auto rounded-2xl border border-dashed border-white/10 bg-surface/30 px-6 py-14 text-center">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted">
          {n} · {eyebrow}
        </span>
        <h2 className="mt-3 font-display text-2xl md:text-3xl text-ink">{title}</h2>
        <p className="mt-2 text-sm text-muted">Sección en construcción — llega en una fase siguiente.</p>
      </div>
    </section>
  )
}
