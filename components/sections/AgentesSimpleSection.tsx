'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, X, TrendingUp,
  Phone, ClipboardList, UserCheck, Headphones,
  Workflow, FolderOpen, Package, GraduationCap, BarChart3,
} from 'lucide-react'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

interface Agent {
  icon: React.ReactNode
  name: string
  tagline: string
  elimina: string
  gana: string
  color: string
}

const agents: Agent[] = [
  {
    icon: <Phone size={28} />,
    name: 'Recepcionista digital',
    tagline: 'Recibe mensajes, responde lo básico, filtra solicitudes y lleva cada caso al canal correcto.',
    elimina: 'La fricción de las respuestas lentas y de perder oportunidades por no contestar a tiempo.',
    gana: 'Rapidez de atención, mejor experiencia para el cliente y más prospectos bien encaminados.',
    color: '0,170,255',
  },
  {
    icon: <ClipboardList size={28} />,
    name: 'Capturista digital',
    tagline: 'Toma datos de formularios, WhatsApp, correo o archivos y los registra automáticamente en CRM, hojas o bases internas.',
    elimina: 'El trabajo manual de copiar y pegar, que suele causar errores y retrasos.',
    gana: 'Precisión, tiempo libre y una operación mucho más ligera.',
    color: '74,144,226',
  },
  {
    icon: <UserCheck size={28} />,
    name: 'Calificador de leads digital',
    tagline: 'Detecta qué prospectos sí tienen potencial y cuáles no están listos todavía.',
    elimina: 'La fricción de que ventas pierda tiempo con contactos fríos o mal calificados.',
    gana: 'Enfoque comercial, mejor conversión y menos desgaste del equipo.',
    color: '0,170,255',
  },
  {
    icon: <TrendingUp size={28} />,
    name: 'Asesor de ventas digital',
    tagline: 'Da seguimiento a prospectos, manda recordatorios y mantiene el pipeline vivo sin persecución manual.',
    elimina: 'La fricción del seguimiento desordenado y los leads olvidados.',
    gana: 'Más cierres, más consistencia y más control comercial.',
    color: '74,144,226',
  },
  {
    icon: <Headphones size={28} />,
    name: 'Agente de atención al cliente',
    tagline: 'Responde preguntas frecuentes, guía a los clientes y consulta información interna cuando hace falta.',
    elimina: 'La fricción de repetir siempre las mismas respuestas y saturar al equipo humano.',
    gana: 'Atención más rápida, respuestas más consistentes y disponibilidad 24/7.',
    color: '0,170,255',
  },
  {
    icon: <Workflow size={28} />,
    name: 'Coordinador operativo digital',
    tagline: 'Mueve tareas entre áreas, avisa pendientes y dispara flujos según reglas del negocio.',
    elimina: 'La fricción de los procesos atorados por seguimiento manual y correos perdidos.',
    gana: 'Orden, trazabilidad y una operación que avanza sin tanto freno.',
    color: '74,144,226',
  },
  {
    icon: <FolderOpen size={28} />,
    name: 'Administrador documental',
    tagline: 'Recibe, clasifica, ordena y distribuye documentos al área correcta.',
    elimina: 'La fricción del caos documental, las búsquedas eternas y la revisión manual de archivos.',
    gana: 'Control, velocidad y menos errores administrativos.',
    color: '0,170,255',
  },
  {
    icon: <Package size={28} />,
    name: 'Supervisor de inventario digital',
    tagline: 'Vigila niveles de inventario, detecta faltantes y activa alertas cuando algo se sale de rango.',
    elimina: 'La fricción de reaccionar tarde cuando ya hay desabasto o desorden.',
    gana: 'Visibilidad, prevención y mejor control de operación.',
    color: '74,144,226',
  },
  {
    icon: <GraduationCap size={28} />,
    name: 'Tutor interno digital',
    tagline: 'Explica procesos, manuales y pasos de trabajo a nuevos colaboradores.',
    elimina: 'La fricción de capacitar una y otra vez al mismo personal en tareas repetitivas.',
    gana: 'Onboarding más rápido, menos carga para el equipo senior y más consistencia operativa.',
    color: '0,170,255',
  },
  {
    icon: <BarChart3 size={28} />,
    name: 'Analista de operación digital',
    tagline: 'Resume información, detecta incidencias y entrega reportes que ayudan a decidir rápido.',
    elimina: 'La fricción de operar con datos dispersos o con decisiones tardías.',
    gana: 'Claridad, mejor control y una lectura más inteligente del negocio.',
    color: '74,144,226',
  },
]

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
}

export default function AgentesSimpleSection() {
  const [[current, dir], setCurrent] = useState([0, 0])
  const [paused, setPaused] = useState(false)

  const go = useCallback((newIdx: number, direction: number) => {
    setCurrent([newIdx, direction])
  }, [])

  const prev = () => go((current - 1 + agents.length) % agents.length, -1)
  const next = useCallback(() => go((current + 1) % agents.length, 1), [current, go])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 4000)
    return () => clearInterval(t)
  }, [paused, next])

  const agent = agents[current]

  return (
    <section id="agentes" className="section-pad relative overflow-hidden">
      {/* Decoraciones */}
      <motion.div
        animate={{ y: [0, -18, 0], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(74,144,226,0.18) 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <motion.div
        animate={{ y: [0, 14, 0], opacity: [0.05, 0.10, 0.05] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,170,255,0.12) 0%, transparent 70%)', filter: 'blur(36px)' }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-medium tracking-widest text-zyvo-gold/70 uppercase mb-4 px-4 py-1.5 rounded-full border border-zyvo-gold/20 bg-zyvo-gold/5">
            Infraestructura Operativa
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zyvo-white mb-5" style={{ fontFamily: 'var(--font-instrument-serif)' }}>
            Empleados digitales que trabajan{' '}
            <span className="text-gradient-gold">24/7</span>
          </h2>
          <p className="text-zyvo-white/50 text-base max-w-xl mx-auto leading-relaxed">
            No reemplazan a tu equipo — lo potencian. Los empleados digitales de ZYVO absorben el trabajo repetitivo para que tus colaboradores se enfoquen en lo que realmente mueve el negocio.
          </p>
        </motion.div>

        {/* Carrusel */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={current}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: EASE }}
                className="glass rounded-2xl p-8 md:p-12 max-w-2xl mx-auto"
                style={{ borderColor: `rgba(${agent.color},0.18)` }}
              >
                {/* Número e ícono */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: `rgba(${agent.color},0.1)`,
                      border: `1px solid rgba(${agent.color},0.25)`,
                      color: `rgb(${agent.color})`,
                    }}
                  >
                    {agent.icon}
                  </div>
                  <span className="text-5xl font-bold tabular-nums" style={{ color: `rgba(${agent.color},0.12)`, fontFamily: 'var(--font-jetbrains-mono)' }}>
                    {String(current + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-zyvo-white mb-3">
                  {agent.name}
                </h3>
                <p className="text-zyvo-white/50 text-sm leading-relaxed mb-8">
                  {agent.tagline}
                </p>

                {/* Elimina / Gana */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
                    <X size={14} className="mt-0.5 shrink-0" style={{ color: 'rgba(239,68,68,0.7)' }} />
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(239,68,68,0.6)' }}>Elimina</span>
                      <p className="text-zyvo-white/60 text-sm mt-0.5">{agent.elimina}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'rgba(0,170,255,0.06)', border: '1px solid rgba(0,170,255,0.14)' }}>
                    <TrendingUp size={14} className="mt-0.5 shrink-0" style={{ color: 'rgba(0,170,255,0.8)' }} />
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zyvo-gold/60">Gana</span>
                      <p className="text-zyvo-white/60 text-sm mt-0.5">{agent.gana}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flechas */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-8 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10 cursor-hover"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label="Agente anterior"
          >
            <ChevronLeft size={18} className="text-zyvo-white/50" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-8 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-white/10 cursor-hover"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
            aria-label="Siguiente agente"
          >
            <ChevronRight size={18} className="text-zyvo-white/50" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
          {agents.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              className="transition-all duration-300 rounded-full cursor-hover"
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                background: i === current ? '#00AAFF' : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Ir al agente ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
