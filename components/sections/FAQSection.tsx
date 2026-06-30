'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const FAQS = [
  {
    q: '¿Qué es ZYVO?',
    a: 'ZYVO diseña sistemas inteligentes para que tu empresa opere con menos fricción, menos trabajo manual y más control.',
  },
  {
    q: '¿Qué tipo de soluciones construyen?',
    a: 'Automatizaciones, agentes de IA, CRM inteligentes, ERP agénticos y LMS inteligentes, según lo que tu operación realmente necesite.',
  },
  {
    q: '¿ZYVO sustituye a mi equipo?',
    a: 'No. ZYVO ayuda a que tu equipo trabaje mejor, quitando tareas repetitivas y ordenando procesos que hoy consumen tiempo.',
  },
  {
    q: '¿Esto sirve si ya usamos WhatsApp, Excel o un CRM?',
    a: 'Sí. ZYVO se integra con lo que ya usas para conectar procesos y evitar que la información se quede dispersa.',
  },
  {
    q: '¿Qué problema resuelve ZYVO?',
    a: 'Resuelve fugas operativas: leads perdidos, respuestas lentas, seguimiento desordenado, errores manuales y falta de trazabilidad.',
  },
  {
    q: '¿Cómo es el proceso de trabajo?',
    a: 'Primero detectamos la fricción, luego entendemos el problema, diseñamos la solución, la implementamos y después damos seguimiento.',
  },
  {
    q: '¿Dónde se instala la solución?',
    a: 'Puede vivir en la nube con un VPS o dentro de la empresa con una caja física ZYVO, según el nivel de control que necesites.',
  },
  {
    q: '¿Qué pasa después de la entrega?',
    a: 'ZYVO no solo entrega el sistema: también acompaña la estabilización, el soporte y las mejoras para que siga dando resultados.',
  },
]

export default function FAQSection() {
  const spiralRef = useRef<HTMLDivElement | null>(null)

  const spiralCfg = useMemo(() => ({
    points: 700,
    dotRadius: 1.8,
    duration: 3.2,
    sizeMin: 0.5,
    sizeMax: 1.4,
    opacityMin: 0.25,
    opacityMax: 0.85,
  }), [])

  const gradientColors = ['#0066ff', '#00aaff', '#00e5ff']

  useEffect(() => {
    if (!spiralRef.current) return

    const SIZE = 560
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
    const N = spiralCfg.points
    const DOT = spiralCfg.dotRadius
    const CENTER = SIZE / 2
    const PADDING = 4
    const MAX_R = CENTER - PADDING - DOT

    const svgNS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNS, 'svg')
    svg.setAttribute('width', String(SIZE))
    svg.setAttribute('height', String(SIZE))
    svg.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`)

    const defs = document.createElementNS(svgNS, 'defs')
    const g = document.createElementNS(svgNS, 'linearGradient')
    g.setAttribute('id', 'zyvoSpiralGradient')
    g.setAttribute('gradientUnits', 'userSpaceOnUse')
    g.setAttribute('x1', '0%')
    g.setAttribute('y1', '0%')
    g.setAttribute('x2', '100%')
    g.setAttribute('y2', '100%')
    gradientColors.forEach((color, idx, arr) => {
      const stop = document.createElementNS(svgNS, 'stop')
      stop.setAttribute('offset', `${(idx * 100) / (arr.length - 1)}%`)
      stop.setAttribute('stop-color', color)
      g.appendChild(stop)
    })
    defs.appendChild(g)
    svg.appendChild(defs)

    for (let i = 0; i < N; i++) {
      const idx = i + 0.5
      const frac = idx / N
      const r = Math.sqrt(frac) * MAX_R
      const theta = idx * GOLDEN_ANGLE
      const x = CENTER + r * Math.cos(theta)
      const y = CENTER + r * Math.sin(theta)

      const c = document.createElementNS(svgNS, 'circle')
      c.setAttribute('cx', x.toFixed(3))
      c.setAttribute('cy', y.toFixed(3))
      c.setAttribute('r', String(DOT))
      c.setAttribute('fill', 'url(#zyvoSpiralGradient)')
      c.setAttribute('opacity', '0.6')

      const animR = document.createElementNS(svgNS, 'animate')
      animR.setAttribute('attributeName', 'r')
      animR.setAttribute('values', `${DOT * spiralCfg.sizeMin};${DOT * spiralCfg.sizeMax};${DOT * spiralCfg.sizeMin}`)
      animR.setAttribute('dur', `${spiralCfg.duration}s`)
      animR.setAttribute('begin', `${(frac * spiralCfg.duration).toFixed(3)}s`)
      animR.setAttribute('repeatCount', 'indefinite')
      animR.setAttribute('calcMode', 'spline')
      animR.setAttribute('keySplines', '0.4 0 0.6 1;0.4 0 0.6 1')
      c.appendChild(animR)

      const animO = document.createElementNS(svgNS, 'animate')
      animO.setAttribute('attributeName', 'opacity')
      animO.setAttribute('values', `${spiralCfg.opacityMin};${spiralCfg.opacityMax};${spiralCfg.opacityMin}`)
      animO.setAttribute('dur', `${spiralCfg.duration}s`)
      animO.setAttribute('begin', `${(frac * spiralCfg.duration).toFixed(3)}s`)
      animO.setAttribute('repeatCount', 'indefinite')
      animO.setAttribute('calcMode', 'spline')
      animO.setAttribute('keySplines', '0.4 0 0.6 1;0.4 0 0.6 1')
      c.appendChild(animO)

      svg.appendChild(c)
    }

    spiralRef.current.innerHTML = ''
    spiralRef.current.appendChild(svg)
  }, [spiralCfg])

  return (
    <section id="faq" className="section-pad relative overflow-hidden">
      {/* Decoración superior */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zyvo-blue/40 to-transparent" />

      {/* Espiral de fondo */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-end opacity-20 pr-0 overflow-hidden"
        style={{ mixBlendMode: 'screen' }}
        aria-hidden="true"
      >
        <div
          ref={spiralRef}
          className="[mask-image:radial-gradient(circle_at_center,rgba(255,255,255,0.9),rgba(255,255,255,0.2)_55%,transparent_75%)]"
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-12 space-y-3"
        >
          <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">
            Preguntas frecuentes
          </p>
          <h2 className="font-(family-name:--font-instrument-serif) text-3xl md:text-5xl text-zyvo-white leading-snug">
            Lo que nos preguntan{' '}
            <span className="text-gradient-gold italic">siempre</span>
          </h2>
          <p className="text-zyvo-white/45 text-sm max-w-xl leading-relaxed">
            Si tienes una duda que no está aquí, habla con Rome — nuestro agente comercial está
            disponible ahora mismo.
          </p>
        </motion.div>

        {/* Grid de FAQ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {FAQS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.06, ease: EASE }}
            >
              <FAQItem q={item.q} a={item.a} index={i + 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="group relative overflow-hidden glass rounded-2xl p-5 transition-all duration-200 hover:border-zyvo-gold/30">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex w-full items-center justify-between text-left gap-4"
        aria-expanded={open}
      >
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="font-(family-name:--font-jetbrains-mono) text-xs text-zyvo-white/25 shrink-0">
            {String(index).padStart(2, '0')}
          </span>
          <h3 className="text-zyvo-white/85 text-sm md:text-base font-medium leading-snug">{q}</h3>
        </div>
        <span className="text-zyvo-gold/60 group-hover:text-zyvo-gold transition-colors text-lg shrink-0 leading-none">
          {open ? '−' : '+'}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(.4,0,.2,1)] ${
          open ? 'mt-3 grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="text-sm text-zyvo-white/50 leading-relaxed pl-8">{a}</p>
        </div>
      </div>
    </div>
  )
}
