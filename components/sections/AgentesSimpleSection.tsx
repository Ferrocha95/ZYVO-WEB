'use client'

import { motion } from 'framer-motion'
import { Target, ClipboardList, BarChart3, type LucideIcon } from 'lucide-react'

interface Agente {
  Icon: LucideIcon
  nombre: string
  que_hace: string
  friccion: string
  metricas: string[]
}

const AGENTES: Agente[] = [
  {
    Icon: Target,
    nombre: 'Agente SDR',
    que_hace: 'Califica leads entrantes, responde preguntas, agenda llamadas y actualiza el CRM automáticamente.',
    friccion: 'Elimina el seguimiento manual de prospectos. Tu equipo de ventas sólo habla con leads listos para cerrar.',
    metricas: ['200 leads/día sin intervención', 'Respuesta en menos de 1 minuto'],
  },
  {
    Icon: ClipboardList,
    nombre: 'Agente de Onboarding',
    que_hace: 'Guía a nuevos empleados o clientes a través del proceso de incorporación, asigna tareas y reporta avances.',
    friccion: 'Elimina la dependencia de una persona para hacer onboarding. El proceso ocurre solo, siempre igual, sin errores.',
    metricas: ['60% menos tiempo de incorporación', 'Disponible 24/7'],
  },
  {
    Icon: BarChart3,
    nombre: 'Agente Contabilidad',
    que_hace: 'Procesa facturas, categoriza gastos, detecta anomalías y genera reportes financieros sin intervención manual.',
    friccion: 'Elimina la captura de datos y la revisión manual de documentos. El cierre mensual tarda horas, no días.',
    metricas: ['500 documentos/día', 'Alertas automáticas de anomalías'],
  },
]

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export default function AgentesSimpleSection() {
  return (
    <section id="agentes" className="section-pad relative overflow-hidden">
      {/* Separador sutil */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />

      {/* Scan-line decorativa */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ y: ['-10%', '110%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 4 }}
          className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-zyvo-gold/8 to-transparent"
        />
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] right-[5%] w-36 h-36 rounded-full bg-zyvo-blue/6 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 14, 0], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[15%] left-[3%] w-28 h-28 rounded-full bg-zyvo-gold/5 blur-2xl"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mb-12 space-y-3"
        >
          <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">Agentes IA</p>
          <h2 className="font-(family-name:--font-instrument-serif) text-3xl md:text-5xl font-normal text-zyvo-white max-w-xl">
            Empleados digitales que trabajan mientras tu equipo duerme
          </h2>
          <p className="text-zyvo-white/40 text-sm max-w-lg leading-relaxed">
            No son bots con respuestas programadas. Son sistemas con memoria,
            contexto y capacidad de decisión para procesos reales de negocio.
          </p>
        </motion.div>

        {/* 3 agentes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {AGENTES.map((a, i) => (
            <motion.div
              key={a.nombre}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.55, ease: EASE }}
              whileHover={{ y: -4, borderColor: 'rgba(212,175,55,0.22)' }}
              className="glass rounded-2xl p-7 flex flex-col gap-5"
            >
              {/* Cabecera */}
              <div className="flex items-center gap-3">
                {/* Icono con halo gold en hover */}
                <motion.div
                  whileHover={{ borderColor: 'rgba(212,175,55,0.5)', boxShadow: '0 0 14px rgba(212,175,55,0.18)' }}
                  transition={{ duration: 0.25 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ border: '1px solid rgba(212,175,55,0.15)', background: 'rgba(212,175,55,0.06)' }}
                >
                  <a.Icon size={18} className="text-zyvo-gold/70" />
                </motion.div>
                <div>
                  <p className="text-zyvo-white font-semibold text-sm">{a.nombre}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-xs text-green-400/70 font-mono">
                      activo
                      {/* Cursor parpadeante */}
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="ml-0.5"
                      >
                        |
                      </motion.span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Qué hace */}
              <p className="text-zyvo-white/50 text-sm leading-relaxed flex-1">
                {a.que_hace}
              </p>

              {/* Qué fricción elimina */}
              <div className="bg-zyvo-gold/5 border border-zyvo-gold/12 rounded-xl p-4 space-y-1">
                <p className="text-zyvo-white/30 text-xs font-medium uppercase tracking-wider">Qué elimina</p>
                <p className="text-zyvo-white/60 text-xs leading-relaxed">{a.friccion}</p>
              </div>

              {/* Métricas */}
              <div className="space-y-1.5 pt-1">
                {a.metricas.map(m => (
                  <div key={m} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-zyvo-gold/50 shrink-0" />
                    <span className="text-zyvo-white/35 text-xs">{m}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota bajo las cards */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 text-center text-zyvo-white/25 text-xs"
        >
          Cada agente se configura para los procesos específicos de tu empresa.
          No son plantillas genéricas.
        </motion.p>
      </div>
    </section>
  )
}
