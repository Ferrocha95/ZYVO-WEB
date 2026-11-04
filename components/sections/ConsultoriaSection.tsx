'use client'

import { motion } from 'framer-motion'
import { Check, X, Clock, ArrowRight } from 'lucide-react'
import SectionHeading from './SectionHeading'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const INCLUYE = [
  'Mapeo de tu operación actual, área por área',
  'Identificación de los puntos de fricción reales',
  'Qué se puede sistematizar y en qué orden',
  'Un siguiente paso concreto, lo tomes con nosotros o no',
]

const NO_INCLUYE = [
  'No es una venta disfrazada',
  'No es un compromiso de compra',
  'No es soporte técnico ni configuración',
  'No promete resultados sin diagnóstico',
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function ConsultoriaSection() {
  return (
    <section id="consultoria" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          n="02"
          eyebrow="ConsultorIA 1a1"
          title="60 minutos para ver tu operación con claridad"
          intro="Una sesión uno a uno para entender dónde pierde el control tu empresa y qué tendría sentido sistematizar."
        />

        <div className="mt-6 fact-chip">
          <Clock size={14} className="text-cyan" />
          60 minutos · sin costo
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: EASE }}
            className="rounded-2xl border border-cyan/20 bg-cyan/4 p-6"
          >
            <h3 className="font-display text-lg font-semibold text-ink">Qué incluye</h3>
            <ul className="mt-4 space-y-3">
              {INCLUYE.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink/80">
                  <Check size={16} className="text-cyan shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
            className="rounded-2xl glass-card p-6"
          >
            <h3 className="font-display text-lg font-semibold text-ink">Qué no incluye</h3>
            <ul className="mt-4 space-y-3">
              {NO_INCLUYE.map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted">
                  <X size={16} className="text-grey shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => scrollTo('contacto')}
            className="inline-flex items-center gap-2 px-7 py-3.5 btn-primary"
          >
            Agendar ConsultorIA
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  )
}
