'use client'

import { motion } from 'framer-motion'
import { Workflow, Target, Code2 } from 'lucide-react'
import SectionHeading from './SectionHeading'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const SISTEMAS = [
  {
    icon: Workflow,
    nombre: 'Sistema operativo agéntico',
    desc: 'Agentes que operan áreas de tu empresa con criterio y bajo tus reglas.',
    puntos: [
      'Ejecutan tareas y procesos, no solo responden',
      'Escalan a una persona cuando toca decidir',
      'Dejan registro de todo lo que hacen',
    ],
  },
  {
    icon: Target,
    nombre: 'Sistema comercial inteligente',
    desc: 'Captación, seguimiento y cierre asistidos, con todo trazable.',
    puntos: [
      'Ningún prospecto se queda sin seguimiento',
      'Pipeline siempre actualizado',
      'Visibilidad de cada conversación',
    ],
  },
  {
    icon: Code2,
    nombre: 'Apps y plataformas a medida',
    desc: 'Software propio para tu operación, no plantillas genéricas.',
    puntos: [
      'Diseñado alrededor de tu proceso real',
      'Integra lo que ya usas',
      'Tuyo, sin dependencias ocultas',
    ],
  },
]

export default function SistemasSection() {
  return (
    <section id="sistemas" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          n="03"
          eyebrow="Sistemas"
          title="Tres formas de sistematizar tu empresa"
          intro="Según dónde esté tu fricción, el sistema toma una forma distinta. La ConsultorIA define cuál."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {SISTEMAS.map((s, i) => (
            <motion.div
              key={s.nombre}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              className="flex flex-col rounded-2xl border border-white/8 bg-surface/40 p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                <s.icon size={18} className="text-cyan" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{s.nombre}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.desc}</p>
              <ul className="mt-4 space-y-2">
                {s.puntos.map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm text-ink/70">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
