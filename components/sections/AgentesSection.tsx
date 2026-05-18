'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ArrowRight, Cpu, Zap } from 'lucide-react'
import { AGENTES_IA } from '@/config/site'

const TERMINAL_LINES: Record<string, string[]> = {
  sdr: [
    '> Analizando lead entrante: empresa_xyz...',
    '> Score: 87/100 — Alta calificación',
    '> Enviando propuesta personalizada...',
    '> CRM actualizado. Próximo follow-up: mañana 9am',
    '> [✓] Procesados: 247 leads hoy',
  ],
  onboarding: [
    '> Nuevo empleado detectado: María López',
    '> Iniciando protocolo de onboarding...',
    '> Módulo 1/5 completado en 2.3 min',
    '> Generando plan personalizado de capacitación',
    '> [✓] 12 empleados en proceso activo',
  ],
  contabilidad: [
    '> Escaneando facturas pendientes: 34 docs',
    '> Categorización automática completada',
    '> Anomalía detectada: gasto fuera de rango',
    '> Alerta enviada al CFO vía WhatsApp',
    '> [✓] Reporte financiero generado: Q4-2026',
  ],
  soporte: [
    '> Ticket #4821 recibido: problema de acceso',
    '> Clasificación: Nivel 1 — Auto-resolución',
    '> Solución aplicada. Tiempo: 23 segundos',
    '> Ticket cerrado. CSAT: 5/5',
    '> [✓] 89% tickets resueltos sin escalación',
  ],
  'customer-success': [
    '> Health score: Cliente Acero MX → 72 → ⚠️',
    '> Señal de churn detectada: -3 logins/semana',
    '> Iniciando protocolo de retención...',
    '> QBR programado: viernes 15h con CEO',
    '> [✓] Churn reducido 35% este trimestre',
  ],
  propuestas: [
    '> Procesando auditoría de fricción: TechPyME',
    '> Calculando ROI proyectado... 4.2x',
    '> Generando propuesta personalizada...',
    '> Contrato draft listo para revisión',
    '> [✓] Propuesta enviada en 14 minutos',
  ],
}

function TerminalLine({ line, delay }: { line: string; delay: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  if (!visible) return null

  return (
    <motion.p
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="terminal-text text-xs leading-relaxed"
    >
      {line}
    </motion.p>
  )
}

function AgentCard({ agente, index }: { agente: (typeof AGENTES_IA)[0]; index: number }) {
  const [active, setActive] = useState(false)
  const [terminalKey, setTerminalKey] = useState(0)

  const handleEnter = () => {
    setActive(true)
    setTerminalKey(k => k + 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setActive(false)}
      className="relative glass rounded-2xl overflow-hidden cursor-hover flex flex-col transition-all duration-300"
      style={{
        borderColor: active ? `${agente.color}35` : 'rgba(255,255,255,0.08)',
        boxShadow: active ? `0 0 40px ${agente.color}0D` : 'none',
      }}
    >
      {/* Terminal overlay de fondo */}
      <div className="absolute inset-0 bg-[#020508]/60 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header del agente */}
      <div className="relative p-6 pb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300"
            style={{ background: `${agente.color}12`, border: `1px solid ${agente.color}25` }}
          >
            {agente.icon}
          </div>
          <div>
            <p className="text-zyvo-white font-semibold text-base">{agente.nombre}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-mono text-green-400/80 tracking-wider">ACTIVO</span>
            </div>
          </div>
        </div>
        <Cpu size={16} className="text-zyvo-white/20 mt-1" />
      </div>

      {/* Descripción */}
      <div className="relative px-6 pb-4">
        <p className="text-zyvo-white/45 text-sm leading-relaxed">{agente.descripcion}</p>
      </div>

      {/* Métricas */}
      <div className="relative px-6 pb-4 flex flex-wrap gap-2">
        {agente.metricas.map(m => (
          <span
            key={m}
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              color: agente.color,
              background: `${agente.color}10`,
              border: `1px solid ${agente.color}20`,
            }}
          >
            {m}
          </span>
        ))}
      </div>

      {/* Terminal — se activa en hover */}
      <AnimatePresence>
        {active && (
          <motion.div
            key={terminalKey}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative mx-6 mb-6 bg-[#010306] rounded-xl border border-white/[0.06] p-4 overflow-hidden"
          >
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="ml-2 text-zyvo-white/20 text-xs font-mono">zyvo-agent — live</span>
            </div>
            <div className="space-y-1.5 min-h-[80px]">
              {(TERMINAL_LINES[agente.id] ?? []).map((line, i) => (
                <TerminalLine key={`${terminalKey}-${i}`} line={line} delay={i * 600} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stack técnico */}
      <div className="relative px-6 pb-6 mt-auto flex items-center justify-between">
        <div className="flex gap-1.5">
          {agente.stack.map(s => (
            <span key={s} className="text-xs font-mono text-zyvo-white/25 px-2 py-0.5 rounded border border-white/[0.05]">
              {s}
            </span>
          ))}
        </div>
        <Zap size={12} style={{ color: agente.color }} />
      </div>
    </motion.div>
  )
}

export default function AgentesSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section id="agentes" className="section-padding relative overflow-hidden">
      {/* Fondo oscuro con gradiente misión-control */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(10,36,99,0.10)_0%,transparent_70%)]" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-green-400/70 font-medium tracking-widest uppercase">
              Operando en tiempo real
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-6xl font-normal text-zyvo-white"
          >
            Agentes IA trabajando{' '}
            <span className="text-gradient-gold italic">ahora mismo</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-xl mx-auto text-zyvo-white/45 text-lg"
          >
            No son bots. Son empleados digitales con memoria, razonamiento y autonomía.
          </motion.p>
        </div>

        {/* Grid de agentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {AGENTES_IA.map((agente, i) => (
            <AgentCard key={agente.id} agente={agente} index={i} />
          ))}
        </div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-zyvo-white/40 text-sm mb-6">
            ¿Qué agente necesita tu empresa?
          </p>
          <motion.a
            href="#auditoria"
            whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}
            whileTap={{ scale: 0.98 }}
            onClick={e => {
              e.preventDefault()
              document.getElementById('auditoria')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-zyvo-gold text-zyvo-dark font-semibold text-sm rounded-full"
          >
            Descubrirlo con una auditoría
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
