'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { FASES_PROCESO } from '@/config/site'

function FaseCard({
  fase,
  index,
  total,
}: {
  fase: (typeof FASES_PROCESO)[0]
  index: number
  total: number
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 5) * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative flex flex-col gap-3 cursor-hover group"
    >
      {/* Número + ícono */}
      <div className="flex items-center gap-3 mb-1">
        <div className="relative">
          <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-sm font-bold text-zyvo-gold border border-zyvo-gold/25 group-hover:border-zyvo-gold/60 group-hover:bg-zyvo-gold/10 transition-all duration-300">
            {String(fase.numero).padStart(2, '0')}
          </div>
          {/* Línea conectora vertical (no en el último) */}
          {index < total - 1 && (
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-zyvo-gold/20 to-transparent md:hidden" />
          )}
        </div>
        <span className="text-2xl">{fase.icon}</span>
      </div>

      {/* Contenido */}
      <div className="glass rounded-xl p-5 flex-1 group-hover:border-zyvo-gold/20 transition-colors duration-300">
        <h3 className="text-zyvo-white font-semibold text-sm mb-2 leading-snug">{fase.nombre}</h3>
        <p className="text-zyvo-white/40 text-xs leading-relaxed">{fase.descripcion}</p>
      </div>
    </motion.div>
  )
}

export default function ProcesoTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef   = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section id="proceso" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(29,53,87,0.06)_50%,transparent_100%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zyvo-midnight/60 bg-zyvo-midnight/20 mb-4"
          >
            <span className="text-xs text-zyvo-white/40 font-medium tracking-widest uppercase">
              Metodología probada
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-6xl font-normal text-zyvo-white"
          >
            El método ZYVO en{' '}
            <span className="text-gradient-gold">10 fases</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-lg mx-auto text-zyvo-white/45 text-base"
          >
            Desde que nos conoces hasta que tu empresa opera de forma autónoma.
            Cada fase tiene entregables claros y métricas medibles.
          </motion.p>
        </div>

        {/* Línea de progreso horizontal */}
        <div className="hidden md:block relative mb-4 h-px bg-white/[0.05] mx-auto max-w-full overflow-hidden rounded-full">
          <motion.div
            style={{ width: lineWidth }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-zyvo-gold/60 via-zyvo-gold to-zyvo-gold/30"
          />
        </div>

        {/* Grid de fases: 5 + 5 en dos filas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-2">
          {FASES_PROCESO.slice(0, 5).map((fase, i) => (
            <FaseCard key={fase.numero} fase={fase} index={i} total={10} />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {FASES_PROCESO.slice(5).map((fase, i) => (
            <FaseCard key={fase.numero} fase={fase} index={i + 5} total={10} />
          ))}
        </div>

        {/* Nota final */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-zyvo-white/25 text-xs mt-12 font-mono"
        >
          Tiempo promedio de implementación inicial: 10–21 días hábiles
        </motion.p>
      </div>
    </section>
  )
}
