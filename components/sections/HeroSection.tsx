'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const

// Partículas flotantes distribuidas alrededor del hero
const PARTICLES = [
  { top: '22%', left: '8%',  delay: 0,   duration: 5.2 },
  { top: '65%', left: '12%', delay: 1.4, duration: 7.1 },
  { top: '30%', right: '9%', delay: 0.7, duration: 6.3 },
  { top: '70%', right: '7%', delay: 2.1, duration: 8.5 },
  { top: '50%', left: '5%',  delay: 3.0, duration: 9.0 },
] as const

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Grid CSS */}
      <div className="absolute inset-0 z-[1] grid-bg opacity-30" />

      {/* Gradiente radial que enfoca el centro */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_80%_55%_at_50%_45%,rgba(10,36,99,0.20)_0%,transparent_70%)]" />

      {/* Viñeta oscura perimetral */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_120%_100%_at_50%_50%,transparent_50%,rgba(8,12,20,0.7)_100%)]" />

      {/* Línea de luz superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-48 bg-gradient-to-b from-zyvo-gold/50 to-transparent z-3" />

      {/* Anillos concéntricos giratorios centrados en el headline */}
      <div className="absolute inset-0 z-[2] pointer-events-none flex items-center justify-center" aria-hidden="true">
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full border border-zyvo-gold/4"
          style={{ width: '520px', height: '520px' }}
        />
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full border border-zyvo-gold/4"
          style={{ width: '750px', height: '750px' }}
        />
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-full border border-zyvo-blue/3"
          style={{ width: '1000px', height: '1000px' }}
        />
      </div>

      {/* Corner brackets — 4 esquinas */}
      <div className="absolute inset-0 z-3 pointer-events-none" aria-hidden="true">
        {/* Esquina superior izquierda */}
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-zyvo-gold/30"
        />
        {/* Esquina superior derecha */}
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
          className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-zyvo-gold/30"
        />
        {/* Esquina inferior izquierda */}
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-zyvo-gold/30"
        />
        {/* Esquina inferior derecha */}
        <motion.div
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2.25 }}
          className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-zyvo-gold/30"
        />
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 z-3 pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
            className="absolute w-1 h-1 rounded-full bg-zyvo-gold/40"
            style={{
              top: p.top,
              left: 'left' in p ? p.left : undefined,
              right: 'right' in p ? (p as { right: string }).right : undefined,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-7 pt-28">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border-zyvo-gold/20"
          style={{ borderColor: 'rgba(212,175,55,0.2)' }}
        >
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-zyvo-gold"
          />
          <span className="text-xs text-zyvo-gold/80 font-medium tracking-[0.18em] uppercase">
            Arquitectura de sistemas inteligentes
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7, ease: EASE }}
          className="font-(family-name:--font-instrument-serif) text-5xl md:text-7xl lg:text-[80px] font-normal leading-[1.12] tracking-tight text-zyvo-white"
        >
          Erradicamos la fuga
          <br className="hidden sm:block" />
          <span className="text-gradient-gold italic"> operativa</span>{' '}
          de tu empresa
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
          className="max-w-xl text-base md:text-lg text-zyvo-white/50 leading-relaxed"
        >
          Diseñamos sistemas de IA y automatización que eliminan el trabajo
          manual, reducen errores y devuelven el control operativo a tu equipo.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.55, ease: EASE }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-1"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(212,175,55,0.35)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('cta')}
            className="flex items-center gap-2 px-8 py-3.5 bg-zyvo-gold text-zyvo-dark font-semibold text-sm rounded-full transition-colors duration-200 cursor-hover"
          >
            Solicitar auditoría
            <ArrowRight size={15} />
          </motion.button>
          <motion.button
            whileHover={{ borderColor: 'rgba(212,175,55,0.35)', color: '#F5F5F5' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('servicios')}
            className="flex items-center gap-2 px-8 py-3.5 border border-white/10 text-zyvo-white/55 text-sm rounded-full transition-all duration-200 cursor-hover"
          >
            Ver servicios
          </motion.button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex items-center gap-10 pt-6 border-t border-white/[0.06] mt-2"
        >
          {[
            { value: 'ROI 3x',  label: 'mínimo garantizado' },
            { value: '10 días', label: 'primera entrega' },
            { value: '85%',     label: 'menos carga manual' },
          ].map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
              className="flex flex-col items-center gap-0.5"
            >
              <span className="text-zyvo-gold font-bold text-base tracking-tight">{s.value}</span>
              <span className="text-zyvo-white/30 text-xs">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-linear-to-b from-zyvo-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
