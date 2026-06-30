'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Workflow, Bot, LayoutDashboard, ArrowRight, type LucideIcon } from 'lucide-react'

const SERVICIOS = [
  {
    icon: LayoutDashboard,
    titulo: 'ZYVO Hub',
    descripcion:
      'Centro de mando operativo donde viven todos los empleados digitales de tu empresa. Desde aquí controlas la infraestructura completa: la Asistente Directiva IA y todos los agentes que operan tu negocio.',
    resultado: 'Toda la operación de tu empresa en un solo lugar',
    tag: 'Plataforma',
  },
  {
    icon: Bot,
    titulo: 'CRM Inteligente',
    descripcion:
      'Sistema de gestión comercial con IA que califica leads automáticamente, da seguimiento sin persecución manual y mueve el pipeline de ventas por ti.',
    resultado: 'Pipeline activo sin que nadie lo persiga',
    tag: 'Comercial',
  },
  {
    icon: Workflow,
    titulo: 'ERP Agéntico',
    descripcion:
      'Sistema empresarial construido a medida donde agentes de IA coordinan inventario, logística, finanzas, documentación y equipos de forma autónoma.',
    resultado: 'Tu operación funciona aunque nadie esté mirando',
    tag: 'Empresarial',
  },
]

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export default function ServiciosSection() {
  return (
    <section id="servicios" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(10,36,99,0.12)_0%,transparent_70%)]" />

      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.10, 0.20, 0.10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[15%] right-[8%] w-48 h-48 rounded-full bg-zyvo-blue/6 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 16, 0], opacity: [0.06, 0.14, 0.06] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[20%] left-[4%] w-36 h-36 rounded-full bg-zyvo-gold/5 blur-2xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 space-y-3"
        >
          <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">Servicios</p>
          <h2 className="font-(family-name:--font-instrument-serif) text-3xl md:text-5xl font-normal text-zyvo-white">
            Lo que construimos para ti
          </h2>
          <p className="text-zyvo-white/55 text-sm max-w-md">
            Cada implementación parte de la auditoría de fricción. Sin diagnóstico no hay propuesta.
          </p>
        </motion.div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICIOS.map((s, i) => {
            const Icon = s.icon
            return (
              <ServiceCard key={s.titulo} s={s} i={i} Icon={Icon} />
            )
          })}
        </div>

        {/* Nota de auditoría incluida */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="flex-1 h-px bg-white/5" />
          <p className="text-zyvo-white/25 text-xs text-center px-4">
            Toda implementación incluye auditoría de fricción previa
          </p>
          <div className="flex-1 h-px bg-white/5" />
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({
  s,
  i,
  Icon,
}: {
  s: (typeof SERVICIOS)[0]
  i: number
  Icon: LucideIcon
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative glass rounded-2xl p-7 flex flex-col gap-5 cursor-hover overflow-hidden"
      style={{
        borderColor: hovered ? 'rgba(0,170,255,0.22)' : 'rgba(255,255,255,0.08)',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        boxShadow: hovered ? '0 16px 50px rgba(0,170,255,0.07)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* Shimmer en hover */}
      {hovered && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-y-0 w-1/2 bg-linear-to-r from-transparent via-white/4 to-transparent pointer-events-none"
        />
      )}

      {/* Tag + ícono */}
      <div className="flex items-start justify-between">
        <motion.div
          animate={{
            backgroundColor: hovered ? 'rgba(0,170,255,0.1)' : 'rgba(255,255,255,0.04)',
            scale: [1, 1.02, 1],
          }}
          transition={{
            backgroundColor: { duration: 0.3 },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ border: hovered ? '1px solid rgba(0,170,255,0.25)' : '1px solid rgba(255,255,255,0.08)' }}
        >
          <Icon size={19} style={{ color: hovered ? '#00AAFF' : 'rgba(255,255,255,0.45)', transition: 'color 0.3s' }} />
        </motion.div>
        <span className="text-xs font-mono text-zyvo-white/25 border border-white/6 px-2 py-1 rounded-full">
          {s.tag}
        </span>
      </div>

      {/* Texto */}
      <div className="flex-1 space-y-2">
        <h3 className="text-zyvo-white font-semibold text-lg leading-snug">{s.titulo}</h3>
        <p className="text-zyvo-white/60 text-sm leading-relaxed">{s.descripcion}</p>
      </div>

      {/* Resultado */}
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <motion.div
            animate={{ backgroundColor: hovered ? '#00AAFF' : 'rgba(0,170,255,0.4)' }}
            className="w-1 h-1 rounded-full mt-1.5 shrink-0"
          />
          <p className="text-zyvo-white/55 text-xs leading-relaxed">{s.resultado}</p>
        </div>
        <div className="pt-3 border-t border-white/6">
          <button
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center gap-1 text-xs font-medium transition-colors duration-200 cursor-hover"
            style={{ color: hovered ? '#00E5FF' : 'rgba(255,255,255,0.35)' }}
          >
            Solicitar <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
