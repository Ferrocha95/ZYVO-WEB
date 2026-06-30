'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ACRONIMO_ZYVO } from '@/config/site'

export default function SolucionZYVO() {
  const [activeLetra, setActiveLetra] = useState<number | null>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="solucion" className="section-padding relative overflow-hidden">
      {/* Gradiente de fondo — izquierda a derecha */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,36,99,0.08)_0%,transparent_60%,rgba(38,70,83,0.06)_100%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zyvo-gold/20 bg-zyvo-gold/5 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-zyvo-gold" />
            <span className="text-xs text-zyvo-gold/70 font-medium tracking-widest uppercase">
              La arquitectura que lo resuelve
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-6xl font-normal text-zyvo-white"
          >
            El método{' '}
            <span className="text-gradient-gold">ZYVO</span>
          </motion.h2>
        </div>

        {/* Acrónimo interactivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACRONIMO_ZYVO.map((item, index) => (
            <motion.div
              key={item.letra}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              onMouseEnter={() => setActiveLetra(index)}
              onMouseLeave={() => setActiveLetra(null)}
              className="relative glass rounded-2xl p-8 cursor-hover group overflow-hidden transition-all duration-300"
              style={{
                borderColor: activeLetra === index ? `${item.color}40` : 'rgba(255,255,255,0.08)',
              }}
            >
              {/* Fondo con hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse at 30% 30%, ${item.color}08 0%, transparent 70%)` }}
              />

              {/* Letra grande */}
              <div className="relative mb-6">
                <span
                  className="font-[family-name:var(--font-instrument-serif)] text-8xl font-normal leading-none transition-colors duration-300"
                  style={{ color: activeLetra === index ? item.color : 'rgba(255,255,255,0.08)' }}
                >
                  {item.letra}
                </span>
              </div>

              {/* Contenido */}
              <div className="relative space-y-3">
                <h3 className="text-zyvo-white font-semibold text-xl tracking-tight">
                  {item.titulo}
                </h3>
                <p className="text-zyvo-white/50 text-sm leading-relaxed">
                  {item.descripcion}
                </p>
                <AnimatePresence>
                  {activeLetra === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-2 pt-2"
                    >
                      <span
                        className="text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{
                          color: item.color,
                          background: `${item.color}15`,
                          border: `1px solid ${item.color}30`,
                        }}
                      >
                        {item.metrica}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider decorativo */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-zyvo-gold/30 to-transparent"
        />
      </div>
    </section>
  )
}
