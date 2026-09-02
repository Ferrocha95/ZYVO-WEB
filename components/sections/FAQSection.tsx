'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

const FAQS = [
  {
    q: '¿La información de mi empresa está segura? ¿Dónde vive?',
    a: 'Tu información se aloja en infraestructura cloud de nivel empresarial, con aislamiento estricto por cliente (cada empresa opera en su propio espacio lógico, sin cruce de datos entre cuentas), credenciales y tokens cifrados en bóveda —nunca en texto plano— y sin acceso humano de terceros a tu operación. No es un servidor físico dedicado a tu empresa: es una arquitectura cloud diseñada para que tus datos estén aislados, cifrados y bajo control de acceso en todo momento. Si necesitas el detalle técnico completo para tu área legal o de compliance, lo compartimos bajo NDA.',
  },
  {
    q: '¿Qué pasa si después de la implementación algo no funciona como se esperaba?',
    a: 'El proceso incluye una fase de estabilización continua. Si algo no opera como debe, lo corregimos — sin costo adicional. ZYVO no entrega un sistema y desaparece: acompañamos la operación real hasta que los resultados sean consistentes.',
  },
  {
    q: '¿Cuánto tiempo tarda en verse el primer resultado?',
    a: 'Los primeros resultados visibles aparecen dentro de las primeras dos semanas de implementación. La reducción de carga operativa es inmediata; el impacto financiero medible suele consolidarse en los primeros 30 a 90 días.',
  },
  {
    q: '¿Necesito personal técnico interno para operar los sistemas?',
    a: 'No. Los sistemas de ZYVO están diseñados para que cualquier persona de tu equipo pueda interactuar con ellos sin formación técnica. Si se necesita mantenimiento o actualización, ZYVO lo gestiona directamente.',
  },
  {
    q: '¿Qué pasa si mi empresa crece o cambia de necesidades?',
    a: 'Los sistemas de ZYVO se construyen para escalar. Si tu operación crece, cambia de enfoque o necesitas nuevas áreas automatizadas, el sistema se extiende — no se reemplaza. Esto es infraestructura diseñada para crecer contigo.',
  },
  {
    q: '¿Cómo se garantiza el retorno de inversión?',
    a: 'Antes de cualquier implementación, la auditoría de fricción cuantifica el impacto financiero esperado. El roadmap se prioriza por ROI, no por complejidad técnica. Y el resultado mínimo que garantizamos es 3x sobre la inversión — o devolvemos lo invertido.',
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
          className="mask-[radial-gradient(circle_at_center,rgba(255,255,255,0.9),rgba(255,255,255,0.2)_55%,transparent_75%)]"
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
          <span className="font-mono text-xs text-zyvo-white/25 shrink-0">
            {String(index).padStart(2, '0')}
          </span>
          <h3 className="text-zyvo-white/85 text-sm md:text-base font-medium leading-snug">{q}</h3>
        </div>
        <span className="text-zyvo-gold/60 group-hover:text-zyvo-gold transition-colors text-lg shrink-0 leading-none">
          {open ? '−' : '+'}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
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
