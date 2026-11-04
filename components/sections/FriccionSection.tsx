'use client'

import { motion } from 'framer-motion'
import { Crown, Layers, Brain, Repeat, EyeOff, AlertTriangle } from 'lucide-react'
import SectionHeading from './SectionHeading'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const SENALES = [
  { icon: Crown,         titulo: 'Todo depende de ti',      desc: 'Nada avanza sin que tú lo apruebes, lo revises o lo resuelvas.' },
  { icon: Layers,        titulo: 'Información dispersa',     desc: 'Datos en WhatsApp, Excel y correo, sin una fuente única confiable.' },
  { icon: Brain,         titulo: 'Seguimiento por memoria', desc: 'Los pendientes viven en la cabeza del equipo, no en un sistema.' },
  { icon: Repeat,        titulo: 'Tareas repetitivas',      desc: 'Cada semana se van horas en lo mismo: copiar, pegar, reenviar.' },
  { icon: EyeOff,        titulo: 'Poca visibilidad',        desc: 'No ves en tiempo real cómo va la operación hasta que algo falla.' },
  { icon: AlertTriangle, titulo: 'Se rompe con el volumen', desc: 'Lo que funciona con pocos clientes deja de funcionar al crecer.' },
]

export default function FriccionSection() {
  return (
    <section id="friccion" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          n="01"
          eyebrow="Fricción operativa"
          title="Las señales de que tu operación depende de ti"
          intro="Si reconoces varias de estas, tu empresa está creciendo a costa de tu tiempo y tu control. Ahí es donde entra un sistema."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SENALES.map((s, i) => (
            <motion.div
              key={s.titulo}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
              className="rounded-2xl border border-white/8 bg-surface/40 p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
                <s.icon size={18} className="text-cyan" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">{s.titulo}</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
