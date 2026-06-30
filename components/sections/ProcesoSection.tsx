'use client'

import { motion } from 'framer-motion'

const PASOS = [
  {
    numero: '01',
    titulo: 'Diagnóstico',
    descripcion:
      'Auditamos tus procesos operativos, identificamos las fugas de tiempo y dinero, y entregamos un roadmap priorizado por impacto financiero real.',
    duracion: '1–3 días hábiles',
  },
  {
    numero: '02',
    titulo: 'Diseño e implementación',
    descripcion:
      'Construimos los sistemas, flujos y agentes sobre tu infraestructura. Sin vendor lock-in, sin dependencias externas. Todo queda en tu control.',
    duracion: '7–14 días hábiles',
  },
  {
    numero: '03',
    titulo: 'Estabilización y mejora',
    descripcion:
      'Monitoreamos el sistema en producción, corregimos lo que sea necesario y mejoramos de forma iterativa según los resultados reales.',
    duracion: 'Continuo',
  },
]

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export default function ProcesoSection() {
  return (
    <section id="proceso" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(29,53,87,0.07)_50%,transparent_100%)]" />

      {/* Decoraciones animadas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Líneas de datos horizontales */}
        <motion.div
          animate={{ opacity: [0, 0.08, 0], x: ['-5%', '5%', '-5%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 inset-x-0 h-px bg-linear-to-r from-transparent via-zyvo-blue/40 to-transparent"
        />
        <motion.div
          animate={{ opacity: [0, 0.06, 0], x: ['5%', '-5%', '5%'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-2/3 inset-x-0 h-px bg-linear-to-r from-transparent via-zyvo-gold/30 to-transparent"
        />
        {/* Centro pulsante */}
        <motion.div
          animate={{ opacity: [0.04, 0.10, 0.04], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-zyvo-blue/5 blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mb-14 space-y-3"
        >
          <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">Cómo trabajamos</p>
          <h2 className="font-(family-name:--font-instrument-serif) text-3xl md:text-5xl font-normal text-zyvo-white">
            De la auditoría al sistema en producción
          </h2>
        </motion.div>

        {/* Línea conectora animada — solo md+ */}
        <div className="hidden md:block relative h-px -mb-px mx-8" aria-hidden="true">
          {/* Línea base */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-zyvo-gold/20 to-transparent" />
          {/* Punto de luz que recorre la línea */}
          <motion.div
            animate={{ x: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
            className="absolute top-0 w-16 h-px bg-zyvo-gold/60"
          />
        </div>

        {/* 3 pasos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/4 rounded-2xl overflow-hidden border border-white/6">
          {PASOS.map((paso, i) => (
            <motion.div
              key={paso.numero}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: EASE }}
              whileHover={{
                scale: 1.02,
                backgroundColor: 'rgba(12,18,32,1)',
                borderColor: 'rgba(0,170,255,0.15)',
              }}
              className="bg-zyvo-dark p-8 flex flex-col gap-5 transition-colors duration-300"
            >
              {/* Número con pulso de opacidad */}
              <motion.span
                animate={{ opacity: [0.45, 0.75, 0.45] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 1 }}
                className="font-(family-name:--font-instrument-serif) text-5xl text-zyvo-gold/60 leading-none select-none"
              >
                {paso.numero}
              </motion.span>

              {/* Contenido */}
              <div className="space-y-2 flex-1">
                <h3 className="text-zyvo-white font-semibold text-lg">{paso.titulo}</h3>
                <p className="text-zyvo-white/45 text-sm leading-relaxed">{paso.descripcion}</p>
              </div>

              {/* Duración */}
              <div className="flex items-center gap-2 pt-4 border-t border-white/6">
                <div className="w-1 h-1 rounded-full bg-zyvo-gold/60" />
                <span className="text-zyvo-white/30 text-xs font-mono">{paso.duracion}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Garantía */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <span className="inline-flex items-center gap-2 text-xs text-zyvo-white/25">
            <span className="w-6 h-px bg-zyvo-gold/30" />
            ROI mínimo 3x o devolvemos la inversión. Sin letra pequeña.
            <span className="w-6 h-px bg-zyvo-gold/30" />
          </span>
        </motion.div>
      </div>
    </section>
  )
}
