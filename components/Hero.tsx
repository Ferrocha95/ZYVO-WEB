'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/animations'

const METRICS = [
  { label: 'Tiempo ahorrado',   value: '68%',  icon: '⚡' },
  { label: 'ROI promedio',      value: '3.4x', icon: '📈' },
  { label: 'Fricción eliminada', value: '85%', icon: '🔁' },
  { label: '1ª entrega en',     value: '10d',  icon: '🚀' },
]

const AGENTS = ['Ventas IA', 'Soporte 24/7', 'Admin Digital', 'CRM Agéntico', 'Logística IA']

const LINES = [
  '> Auditando fricción operativa...     ✓',
  '> Detectando procesos manuales...     ✓',
  '> Conectando ZYVO Hub...              ✓',
  '> Sistema activo. Listo.',
]

function Terminal() {
  const [lines, setLines] = useState<string[]>([])
  const [done, setDone] = useState(false)
  useEffect(() => {
    LINES.forEach((line, i) =>
      setTimeout(() => {
        setLines(prev => [...prev, line])
        if (i === LINES.length - 1) setDone(true)
      }, 500 + i * 850)
    )
  }, [])
  return (
    <div className="glass-card p-4 mt-6" style={{ borderColor: 'rgba(108,92,231,0.4)' }}>
      <div className="flex gap-1.5 mb-3">
        {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
        ))}
      </div>
      <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 12, color: '#00D4FF', lineHeight: 2 }}>
        {lines.map((l, i) => <div key={i}>{l}</div>)}
        {!done && <span style={{ animation: 'blink 1s step-end infinite' }}>▮</span>}
      </div>
    </div>
  )
}

function HeroVisual() {
  return (
    /*
      Padding de 32px en el wrapper para que los badges absolutos queden
      dentro del área visual sin clipear contra el borde del contenedor.
    */
    <div className="relative w-full max-w-md mx-auto" style={{ padding: '32px' }}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(108,92,231,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Hub card — centrado dentro del wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-7 relative z-10"
        style={{ borderColor: 'rgba(108,92,231,0.35)' }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs font-medium mb-0.5" style={{ fontFamily: 'JetBrains Mono,monospace', color: '#6C5CE7', letterSpacing: '0.1em' }}>ZYVO HUB</div>
            <div className="text-lg font-bold" style={{ fontFamily: 'Space Grotesk,sans-serif', color: '#F0F0FF' }}>Panel Operativo</div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)', color: '#00D4FF' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#00D4FF', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            En vivo
          </div>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
              className="rounded-xl p-3"
              style={{ backgroundColor: 'rgba(108,92,231,0.08)', border: '1px solid rgba(108,92,231,0.15)' }}
            >
              <div className="text-lg mb-0.5">{m.icon}</div>
              <div className="font-bold text-xl" style={{ fontFamily: 'Space Grotesk,sans-serif', color: '#F0F0FF' }}>{m.value}</div>
              <div className="text-xs" style={{ color: '#8888A8' }}>{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Agent pills */}
        <div>
          <div className="text-xs mb-2.5" style={{ color: '#8888A8', fontFamily: 'JetBrains Mono,monospace' }}>Agentes activos</div>
          <div className="flex flex-wrap gap-2">
            {AGENTS.map((agent, i) => (
              <motion.span
                key={agent}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.9 + i * 0.07 }}
                className="pill"
                style={{ fontSize: 11 }}
              >
                {agent}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Badge — ROI: esquina superior-derecha del wrapper (padding absorbe el overflow) */}
      <motion.div
        initial={{ opacity: 0, x: 12, y: -8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(13,13,20,0.96)',
          border: '1px solid rgba(0,212,255,0.3)',
          borderRadius: 14,
          padding: '10px 14px',
          backdropFilter: 'blur(12px)',
          zIndex: 20,
          animation: 'float 5s ease-in-out infinite',
        }}
      >
        <div className="text-xs" style={{ color: '#8888A8', marginBottom: 2 }}>ROI promedio</div>
        <div className="font-bold text-base" style={{ fontFamily: 'Space Grotesk,sans-serif', color: '#00D4FF' }}>3.4x</div>
      </motion.div>

      {/* Badge — Tiempo: esquina inferior-izquierda del wrapper */}
      <motion.div
        initial={{ opacity: 0, x: -12, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 1.25 }}
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          backgroundColor: 'rgba(13,13,20,0.96)',
          border: '1px solid rgba(168,85,247,0.3)',
          borderRadius: 14,
          padding: '10px 14px',
          backdropFilter: 'blur(12px)',
          zIndex: 20,
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '1s',
        }}
      >
        <div className="text-xs" style={{ color: '#8888A8', marginBottom: 2 }}>1ª entrega</div>
        <div className="font-bold text-base" style={{ fontFamily: 'Space Grotesk,sans-serif', color: '#A855F7' }}>10 días</div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center pt-24 pb-20 overflow-hidden dot-grid-bg">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(108,92,231,0.1) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-20 items-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="pill">✦ Infraestructura inteligente para México y LATAM</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="mt-7 font-bold"
              style={{ fontFamily: 'Space Grotesk,sans-serif', letterSpacing: '-0.025em', lineHeight: 1.08, fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
            >
              La infraestructura que tu empresa necesita para{' '}
              <span className="gradient-text">dejar de operar en modo manual.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg max-w-xl"
              style={{ color: '#8888A8', lineHeight: 1.75 }}
            >
              Diseñamos sistemas de IA, empleados digitales y plataformas agénticas para empresas en México y LATAM que necesitan orden, velocidad y control real.
            </motion.p>
            <motion.div variants={fadeUp}><Terminal /></motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-8">
              <a href="#auditoria" className="btn-primary">Agendar mi Auditoría — Es gratuita</a>
              <a href="#hub" className="btn-ghost">Explorar ZYVO Hub →</a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
