'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

const PROBLEMAS = [
  'Tareas manuales que consumen horas de tu equipo cada semana',
  'Seguimiento lento, errores por descuido y datos dispersos',
  'Procesos que dependen de personas específicas para funcionar',
]

const BENEFICIOS = [
  { valor: '85%', texto: 'menos carga operativa manual' },
  { valor: '3x', texto: 'ROI mínimo garantizado' },
  { valor: '10 días', texto: 'entrega del primer sistema' },
]

export default function ProblemaValorSection() {
  return (
    <section id="problema" className="section-pad relative overflow-hidden">
      {/* Separador superior */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />

      {/* Floating tech orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ y: [0, -18, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-[10%] w-40 h-40 rounded-full bg-zyvo-blue/8 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 14, 0], opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-1/3 left-[5%] w-32 h-32 rounded-full bg-zyvo-gold/6 blur-2xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Columna izquierda — el problema */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5">
              <AlertTriangle size={12} className="text-red-400/80" />
              <span className="text-xs text-red-400/70 font-medium tracking-widest uppercase">
                Fuga operativa
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-(family-name:--font-instrument-serif) text-3xl md:text-4xl font-normal text-zyvo-white leading-snug">
                Tu empresa pierde dinero{' '}
                <span className="italic text-zyvo-white/65">todos los días</span>{' '}
                sin saberlo
              </h2>
              <p className="text-zyvo-white/60 text-sm leading-relaxed max-w-sm">
                La fuga operativa es el costo silencioso del desorden: tiempo,
                errores y procesos manuales que drenan el margen mes a mes.
              </p>
            </div>

            <ul className="space-y-3">
              {PROBLEMAS.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full border border-red-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                  </div>
                  <span className="text-zyvo-white/65 text-sm leading-relaxed">{p}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Columna derecha — la solución */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8 space-y-6">
              <div className="space-y-2">
                <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">
                  Lo que cambia con ZYVO
                </p>
                <h3 className="font-(family-name:--font-instrument-serif) text-2xl md:text-3xl text-zyvo-white leading-snug">
                  Procesos que se ejecutan solos.{' '}
                  <span className="text-gradient-gold">Sin depender de nadie.</span>
                </h3>
              </div>

              <p className="text-zyvo-white/60 text-sm leading-relaxed">
                Convertimos cada proceso repetitivo en un sistema autónomo.
                Tu equipo deja de ejecutar tareas y empieza a supervisar resultados.
              </p>

              {/* Métricas */}
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/6">
                {BENEFICIOS.map(b => (
                  <div key={b.valor} className="flex flex-col items-center gap-1 py-3">
                    <span className="text-zyvo-gold font-bold text-xl">{b.valor}</span>
                    <span className="text-zyvo-white/35 text-xs text-center leading-tight">{b.texto}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
