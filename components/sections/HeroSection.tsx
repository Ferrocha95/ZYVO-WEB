'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const

// Hechos de proceso — fila bajo el hero
const FACTS = ['Human in the loop', 'Trazabilidad', 'Roadmap por fases', 'ConsultorIA sin costo']

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6"
    >
      {/* Glow central suave cian→azul */}
      <div
        className="absolute inset-0 -z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 42%, rgba(0,229,255,0.10) 0%, rgba(47,107,255,0.06) 35%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full pt-28 pb-16 grid grid-cols-1 lg:grid-cols-[56%_44%] gap-12 items-center">

        {/* ── Columna copy ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center lg:items-start gap-7 text-center lg:text-left">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-surface/40"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
            <span className="text-xs text-muted font-medium tracking-[0.18em] uppercase">
              Sistemas inteligentes · Human in the loop
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            className="font-display font-extrabold text-5xl md:text-6xl lg:text-[64px] leading-[1.05] tracking-tight text-ink"
          >
            Crece sin perder
            <br className="hidden sm:block" />
            el <span className="text-gradient">control</span>.
          </motion.h1>

          {/* Subtítulo (placeholder) */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.6, ease: EASE }}
            className="max-w-xl text-base md:text-lg text-muted leading-relaxed"
          >
            Diseñamos e implementamos sistemas inteligentes que operan tu empresa
            con criterio, trazabilidad y tu equipo siempre al mando.
            {/* TODO: copy definitivo del subtítulo */}
          </motion.p>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.55, ease: EASE }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-1"
          >
            <button
              onClick={() => scrollTo('contacto')}
              className="flex items-center gap-2 px-8 py-3.5 btn-primary"
            >
              ConsultorIA gratuita
              <ArrowRight size={15} />
            </button>
            <button
              onClick={() => scrollTo('proceso')}
              className="flex items-center gap-2 px-8 py-3.5 btn-ghost text-sm"
            >
              Ver cómo trabajamos
            </button>
          </motion.div>

          {/* Fila de hechos de proceso */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 mt-2 border-t border-white/6 w-full justify-center lg:justify-start"
          >
            {FACTS.map(fact => (
              <li key={fact} className="fact-chip">
                <span className="w-1 h-1 rounded-full bg-cyan" />
                {fact}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ── Columna visual (placeholder: sistema por capas) ───────── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
          className="hidden lg:block"
        >
          <SystemLayersPlaceholder />
        </motion.div>
      </div>
    </section>
  )
}

// Visual provisional: capas de un sistema con nodos conectados.
// Se reemplaza por el visual definitivo en una fase posterior.
function SystemLayersPlaceholder() {
  const layers = [
    { y: 40,  label: 'Interfaz' },
    { y: 120, label: 'Agentes' },
    { y: 200, label: 'Datos' },
  ]
  return (
    <div className="relative mx-auto w-full max-w-md aspect-square rounded-2xl border border-white/8 bg-surface/30 overflow-hidden">
      <svg viewBox="0 0 320 320" className="w-full h-full" aria-hidden="true">
        {/* conexiones verticales */}
        {[80, 160, 240].map(x => (
          <line key={x} x1={x} y1="60" x2={x} y2="260" stroke="url(#g)" strokeWidth="1" opacity="0.35" />
        ))}
        {/* capas */}
        {layers.map((l, i) => (
          <g key={l.label}>
            <rect
              x="40" y={l.y} width="240" height="40" rx="10"
              fill="none" stroke="url(#g)" strokeWidth="1.5" opacity={0.55 - i * 0.08}
            />
            {[80, 160, 240].map(x => (
              <circle key={x} cx={x} cy={l.y + 20} r="5" fill="#00E5FF" opacity={0.8 - i * 0.15} />
            ))}
          </g>
        ))}
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="320" y2="320" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#2F6BFF" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute bottom-3 left-0 right-0 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
        visual provisional
      </span>
    </div>
  )
}
