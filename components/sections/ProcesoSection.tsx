'use client'

import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const PASOS = [
  { n: '01', t: 'ConsultorIA',               d: 'Sesión 1a1 para mapear tu operación y dónde está la fricción.' },
  { n: '02', t: 'Revisión técnica',          d: 'Analizamos a fondo tus procesos, datos y herramientas actuales.' },
  { n: '03', t: 'Propuesta',                 d: 'Te presentamos qué sistema tiene sentido y en qué fases construirlo.' },
  { n: '04', t: 'Contrato y primer pago',    d: 'Acordamos alcance, tiempos y condiciones por escrito.' },
  { n: '05', t: 'Implementación por fases',  d: 'Construimos en entregas, no en un gran salto al vacío.' },
  { n: '06', t: 'Go-live y estabilización',  d: 'Salida a producción acompañada y ajuste fino.' },
  { n: '07', t: 'Continuidad',               d: 'Operación, monitoreo y mejora continua del sistema.' },
]

export default function ProcesoSection() {
  return (
    <section id="proceso" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          n="04"
          eyebrow="Cómo trabajamos"
          title="Siete pasos, de la ConsultorIA a la continuidad"
          intro="Un proceso claro y por fases. Sabes en qué punto estás en todo momento."
        />

        <ol className="mt-12 ml-3 relative border-l border-white/10">
          {PASOS.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
              className="relative pl-8 pb-8 last:pb-0"
            >
              <span className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-base border border-cyan/40 flex items-center justify-center">
                <span className="font-mono text-[10px] text-cyan">{p.n}</span>
              </span>
              <h3 className="font-display text-lg font-semibold text-ink">{p.t}</h3>
              <p className="mt-1 text-sm text-muted leading-relaxed">{p.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
