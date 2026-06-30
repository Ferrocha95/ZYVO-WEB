'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Server, Lock } from 'lucide-react'
import { TECH_STACK } from '@/config/site'

const TECH_ICONS: Record<string, string> = {
  'n8n':        '⚡',
  'Docker':     '🐳',
  'PostgreSQL': '🐘',
  'Redis':      '🔴',
  'Qdrant':     '🔵',
  'Supabase':   '💚',
  'Claude AI':  '🧠',
  'Next.js':    '▲',
}

const CATEGORIAS: Record<string, string> = {
  'Orquestación':    'rgba(212,175,55,0.15)',
  'Infraestructura': 'rgba(74,127,212,0.15)',
  'Datos':           'rgba(38,70,83,0.15)',
  'IA':              'rgba(212,175,55,0.15)',
  'Backend':         'rgba(29,53,87,0.15)',
  'Frontend':        'rgba(127,140,141,0.15)',
}

export default function TechStack() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="tech" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(29,53,87,0.08)_0%,transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zyvo-teal/30 bg-zyvo-teal/10 mb-4"
          >
            <Server size={12} className="text-zyvo-teal" style={{ color: '#264653' }} />
            <span className="text-xs text-zyvo-white/40 font-medium tracking-widest uppercase">
              Self-hosted · Open Source · Sin vendor lock-in
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-6xl font-normal text-zyvo-white"
          >
            Infraestructura soberana.{' '}
            <span className="text-gradient-gold italic block md:inline">Sin dependencias.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl mx-auto text-zyvo-white/45 text-base leading-relaxed"
          >
            Cada sistema que construimos vive en tus servidores. Tus datos nunca salen de tu empresa.
            Control total, soberanía digital total.
          </motion.p>
        </div>

        {/* Grid de tecnologías */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.nombre}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass rounded-2xl p-6 flex flex-col items-center gap-3 text-center cursor-hover group transition-all duration-300 hover:border-zyvo-gold/20"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl transition-all duration-300"
                style={{ background: CATEGORIAS[tech.categoria] ?? 'rgba(255,255,255,0.04)' }}
              >
                {TECH_ICONS[tech.nombre] ?? '⚙️'}
              </div>
              <div>
                <p className="text-zyvo-white font-semibold text-sm">{tech.nombre}</p>
                <p className="text-zyvo-white/35 text-xs mt-0.5">{tech.descripcion}</p>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full text-zyvo-white/30 border border-white/[0.06] font-mono"
              >
                {tech.categoria}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Props de soberanía */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Shield,
              titulo: 'Soberanía de datos',
              desc: 'Tus datos nunca van a servidores de terceros. Todo corre en tu infraestructura o en VPS dedicado de tu propiedad.',
            },
            {
              icon: Lock,
              titulo: 'Sin vendor lock-in',
              desc: 'Stack 100% open source. Si mañana decides cambiarnos por otro proveedor, te quedas con todo el código y los sistemas.',
            },
            {
              icon: Server,
              titulo: 'Control total',
              desc: 'Acceso completo al código fuente, bases de datos, logs y configuraciones. Nada es una caja negra.',
            },
          ].map((prop, i) => (
            <motion.div
              key={prop.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass rounded-xl p-6 flex gap-4"
            >
              <div className="w-10 h-10 rounded-lg glass-gold flex items-center justify-center shrink-0">
                <prop.icon size={18} className="text-zyvo-gold" />
              </div>
              <div>
                <h3 className="text-zyvo-white font-semibold text-sm mb-1">{prop.titulo}</h3>
                <p className="text-zyvo-white/40 text-xs leading-relaxed">{prop.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
