'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { METRICAS } from '@/config/site'
import type { LucideIcon } from 'lucide-react'

type Metrica = {
  valor: number
  sufijo: string
  prefijo?: string
  label: string
  descripcion: string
  icon: LucideIcon
  color: string
}

function MetricaCard({ metrica, index }: { metrica: Metrica; index: number }) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const Icon   = metrica.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative bg-zyvo-dark p-10 flex flex-col items-center text-center gap-4 group hover:bg-[#0D1525] transition-colors duration-300"
    >
      {/* Línea decorativa derecha (separador) */}
      {index < METRICAS.length - 1 && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/4 hidden lg:block" />
      )}

      {/* Ícono */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all duration-300"
        style={{
          background: `${metrica.color}10`,
          border: `1px solid ${metrica.color}20`,
        }}
      >
        <Icon size={20} style={{ color: metrica.color }} />
      </div>

      {/* Valor animado */}
      <div className="space-y-1">
        <div className="flex items-baseline justify-center gap-0.5">
          {metrica.prefijo && (
            <span className="text-3xl font-bold" style={{ color: metrica.color }}>
              {metrica.prefijo}
            </span>
          )}
          <span className="text-5xl md:text-6xl font-bold text-zyvo-white tabular-nums">
            {inView ? (
              <CountUp
                end={metrica.valor}
                duration={2.5}
                decimals={metrica.valor % 1 !== 0 ? 1 : 0}
                separator=","
                useEasing
              />
            ) : '0'}
          </span>
          <span className="text-2xl font-semibold ml-0.5" style={{ color: metrica.color }}>
            {metrica.sufijo}
          </span>
        </div>
        <p className="text-zyvo-white font-semibold text-base">{metrica.label}</p>
      </div>

      <p className="text-zyvo-white/35 text-xs leading-relaxed max-w-45">
        {metrica.descripcion}
      </p>

      {/* Línea inferior decorativa en hover */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-16 transition-all duration-500 rounded-full"
        style={{ background: metrica.color }}
      />
    </motion.div>
  )
}

export default function MetricasSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="metricas" className="section-padding relative overflow-hidden">
      {/* Fondo oscuro con gradiente dorado sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(212,175,55,0.04)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(8,12,20,0.5)_100%)]" />

      {/* Línea decorativa superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-linear-to-r from-transparent via-zyvo-gold/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-(family-name:--font-instrument-serif) text-4xl md:text-6xl font-normal text-zyvo-white mb-4"
          >
            Números que{' '}
            <span className="text-gradient-gold italic">importan</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-zyvo-white/40 text-base max-w-md mx-auto"
          >
            Sin vanity metrics. Solo los indicadores financieros que tu empresa puede medir.
          </motion.p>
        </div>

        {/* Grid de métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/4 rounded-2xl overflow-hidden border border-white/6">
          {METRICAS.map((metrica, index) => (
            <MetricaCard key={metrica.label} metrica={metrica} index={index} />
          ))}
        </div>

        {/* Nota de garantía */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm text-zyvo-white/40">
            <span className="w-4 h-px bg-zyvo-gold/40" />
            Métricas promedio medidas en clientes activos. ROI garantizado contractualmente.
            <span className="w-4 h-px bg-zyvo-gold/40" />
          </span>
        </motion.div>
      </div>
    </section>
  )
}
