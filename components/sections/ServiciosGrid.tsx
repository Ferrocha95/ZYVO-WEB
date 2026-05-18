'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { PRODUCTOS_AGENTICOS, SERVICIOS_ARQUITECTURA } from '@/config/site'
import type { LucideIcon } from 'lucide-react'

type Servicio = {
  id: string
  categoria: string
  titulo: string
  descripcion: string
  precio: string | null
  precioDetalle?: string
  cta: string
  ctaHref: string
  icon: LucideIcon
  destacado: boolean
  tags: string[]
}

function ServicioCard({ servicio, index }: { servicio: Servicio; index: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = servicio.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative glass rounded-2xl p-8 flex flex-col gap-5 cursor-hover group overflow-hidden transition-all duration-400"
      style={{
        borderColor: hovered ? 'rgba(212,175,55,0.25)' : 'rgba(255,255,255,0.08)',
        boxShadow: hovered ? '0 20px 60px rgba(212,175,55,0.07)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.04)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Badge de categoría */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex flex-col gap-3 flex-1">
          <span className="text-xs font-mono text-zyvo-white/30 tracking-widest uppercase">
            {servicio.categoria}
          </span>

          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300"
            style={{
              background: hovered ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${hovered ? 'rgba(212,175,55,0.25)' : 'rgba(255,255,255,0.08)'}`,
            }}
          >
            <Icon size={20} style={{ color: hovered ? '#D4AF37' : 'rgba(255,255,255,0.5)' }} />
          </div>
        </div>

        {servicio.destacado && (
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-zyvo-gold/10 text-zyvo-gold border border-zyvo-gold/20 whitespace-nowrap">
            Recomendado
          </span>
        )}
      </div>

      {/* Título y descripción */}
      <div className="relative space-y-2 flex-1">
        <h3 className="text-zyvo-white font-semibold text-xl leading-snug">{servicio.titulo}</h3>
        <p className="text-zyvo-white/45 text-sm leading-relaxed">{servicio.descripcion}</p>
      </div>

      {/* Tags de stack */}
      <div className="relative flex flex-wrap gap-1.5">
        {servicio.tags.map(tag => (
          <span
            key={tag}
            className="text-xs font-mono text-zyvo-white/30 px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Precio + CTA */}
      <div className="relative flex items-center justify-between pt-4 border-t border-white/[0.06]">
        <div>
          {servicio.precio ? (
            <>
              <p className="text-zyvo-gold font-semibold text-sm">{servicio.precio}</p>
              {servicio.precioDetalle && (
                <p className="text-zyvo-white/25 text-xs">{servicio.precioDetalle}</p>
              )}
            </>
          ) : (
            <p className="text-zyvo-white/30 text-xs">Precio a medida</p>
          )}
        </div>

        <motion.a
          href={servicio.ctaHref}
          target={servicio.ctaHref.startsWith('mailto') ? undefined : undefined}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 text-sm font-semibold text-zyvo-gold hover:text-zyvo-white transition-colors duration-200"
        >
          {servicio.ctaHref.startsWith('mailto') ? <Mail size={14} /> : <ArrowUpRight size={14} />}
          {servicio.cta}
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function ServiciosGrid() {
  return (
    <section id="servicios" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_50%_0%,rgba(10,36,99,0.12)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zyvo-blue/40 bg-zyvo-blue/10 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-xs text-blue-300/70 font-medium tracking-widest uppercase">
              Portfolio de soluciones
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-6xl font-normal text-zyvo-white"
          >
            Lo que construimos{' '}
            <span className="italic text-zyvo-white/60">para ti</span>
          </motion.h2>
        </div>

        {/* Productos Agénticos */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-xs font-mono text-zyvo-gold/60 tracking-widest uppercase">
              01 — Productos Agénticos
            </span>
            <div className="flex-1 h-px bg-zyvo-gold/15" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTOS_AGENTICOS.map((s, i) => (
              <ServicioCard key={s.id} servicio={s} index={i} />
            ))}
          </div>
        </div>

        {/* Servicios de Arquitectura */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-xs font-mono text-zyvo-white/30 tracking-widest uppercase">
              02 — Servicios de Arquitectura
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICIOS_ARQUITECTURA.map((s, i) => (
              <ServicioCard key={s.id} servicio={s} index={i + 3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
