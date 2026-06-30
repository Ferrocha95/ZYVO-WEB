'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft, ChevronRight, X, TrendingUp,
  Phone, Bot, Headphones,
  Workflow, GraduationCap, BarChart3,
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
    icon: <Bot size={28} />,
    name: 'Asistente Directiva IA',
    tagline: 'Centro de coordinación de tu empresa: un equipo de agentes especializados que gestiona agenda, correos y prioridades, y aprende el contexto específico de tu negocio 24/7.',
    elimina: 'Las horas perdidas gestionando lo administrativo que le roba foco estratégico a quien dirige.',
    gana: 'Más tiempo para decidir y crear, con toda la operación bajo control desde un solo punto.',
    color: '0,170,255',
  },
  {
    icon: <TrendingUp size={28} />,
    name: 'Área de Ventas',
    tagline: 'Un equipo de agentes de IA especializados que trabaja coordinado para calificar leads, dar seguimiento sin persecución y mover el pipeline comercial en todo momento.',
    elimina: 'El seguimiento desordenado y los leads olvidados que se pierden por falta de atención constante.',
    gana: 'Más cierres, más consistencia y pipeline siempre activo sin depender de que alguien recuerde seguir.',
    color: '74,144,226',
  },
  {
    icon: <Headphones size={28} />,
    name: 'Área de Atención al Cliente',
    tagline: 'Agentes especializados coordinados que responden en todos tus canales al instante, resuelven casos, filtran lo urgente y escalan lo que requiere intervención humana.',
    elimina: 'La saturación del equipo respondiendo siempre las mismas preguntas y los contactos sin respuesta.',
    gana: 'Atención 24/7, respuestas consistentes y clientes mejor atendidos sin aumentar nómina.',
    color: '0,170,255',
  },
  {
    icon: <BarChart3 size={28} />,
    name: 'Área de Marketing',
    tagline: 'Varios agentes coordinados que generan contenido con IA, programan publicaciones en redes y reportan resultados en tiempo real — sin intervención manual constante.',
    elimina: 'El tiempo perdido en contenido manual, publicaciones tardías y reportes dispersos que nadie lee.',
    gana: 'Presencia digital constante, datos claros para decidir y equipo enfocado en estrategia.',
    color: '74,144,226',
  },
  {
    icon: <Phone size={28} />,
    name: 'Área de Recepción',
    tagline: 'Un equipo de agentes que recibe, filtra y dirige cada contacto, responde lo básico y escala lo urgente al canal correcto. Siempre activos, nunca descansan.',
    elimina: 'Los contactos perdidos por lentitud y el tiempo del equipo en llamadas y mensajes de bajo valor.',
    gana: 'Cero oportunidades perdidas y equipo enfocado en lo que realmente mueve el negocio.',
    color: '0,170,255',
  },
  {
    icon: <GraduationCap size={28} />,
    name: 'Área de RRHH',
    tagline: 'Agentes coordinados que gestionan el onboarding de nuevos colaboradores, responden dudas internas sobre políticas y automatizan procesos de personal de forma continua.',
    elimina: 'La carga repetitiva de inducción, responder las mismas preguntas y los procesos manuales de personal.',
    gana: 'Onboarding más rápido, equipo senior libre de gestión operativa y RRHH más ágil.',
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
            Seis áreas multiagente que operan{' '}
            <span className="text-gradient-gold">24/7</span>
          </h2>
          <p className="text-zyvo-white/50 text-base max-w-xl mx-auto leading-relaxed">
            Cada área es un equipo de agentes de IA especializados trabajando coordinados. No reemplazan a tu equipo — potencian su capacidad para que se enfoquen en lo que importa.
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
