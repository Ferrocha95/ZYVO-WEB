interface SectionHeadingProps {
  n: string
  eyebrow: string
  title: string
  intro?: string
  center?: boolean
}

// Encabezado de sección reutilizable (server component).
export default function SectionHeading({ n, eyebrow, title, intro, center = false }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-cyan/80">
        {n} · {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight text-ink">
        {title}
      </h2>
      {intro && <p className="mt-4 text-muted leading-relaxed">{intro}</p>}
    </div>
  )
}
