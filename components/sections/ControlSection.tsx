'use client'

import { motion } from 'framer-motion'
import { UserCheck, ScrollText, KeyRound, Database } from 'lucide-react'
import SectionHeading from './SectionHeading'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const PILARES = [
  { icon: UserCheck,  t: 'Human in the loop',    d: 'Las decisiones que importan pasan por una persona. El sistema propone, tú apruebas.' },
  { icon: ScrollText, t: 'Trazabilidad',         d: 'Cada acción queda registrada: qué se hizo, cuándo y por qué.' },
  { icon: KeyRound,   t: 'Permisos y auditoría', d: 'Defines quién puede hacer qué, y todo queda auditable.' },
  { icon: Database,   t: 'Tus datos son tuyos',  d: 'La información vive en tu infraestructura y bajo tu control.' },
]

export default function ControlSection() {
  return (
    <section id="control" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          n="05"
          eyebrow="Control y seguridad"
          title="Automatizar no es perder el control"
          intro="Un sistema serio se diseña para que mandes tú. Estos son los principios de base."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PILARES.map((p, i) => (
            <motion.div
              key={p.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
              className="rounded-2xl glass-card p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                <p.icon size={18} className="text-cyan" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{p.t}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{p.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
