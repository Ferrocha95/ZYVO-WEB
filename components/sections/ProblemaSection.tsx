'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { AlertTriangle, TrendingDown, Clock, DollarSign } from 'lucide-react'
import { DATOS_FINANCIEROS } from '@/config/site'

const PROBLEMAS = [
  {
    icon: DollarSign,
    color: '#D4AF37',
    titulo: 'Costo real por empleado',
    valor: DATOS_FINANCIEROS.costoRealEmpleadoMes,
    sufijo: ' MXN/mes',
    descripcion: 'Incluyendo carga social del 46–51%. Lo que crees que pagas y lo que pagas son cosas muy distintas.',
    detalle: 'Salario + IMSS + SAR + vacaciones + aguinaldo + prima + INFONAVIT',
  },
  {
    icon: Clock,
    color: '#4A7FD4',
    titulo: 'Tiempo perdido en tareas manuales',
    valor: DATOS_FINANCIEROS.horasPerdidasManual,
    sufijo: '%',
    descripcion: 'Del tiempo operativo se va en captura de datos, reenvío de correos y búsqueda de información.',
    detalle: 'Estimado conservador. En empresas sin automatización puede llegar al 60%.',
  },
  {
    icon: TrendingDown,
    color: '#264653',
    titulo: 'Fuga operativa anual estimada',
    valor: 173616,
    prefijo: '$',
    sufijo: ' MXN',
    descripcion: 'Lo que una empresa de 5 empleados pierde por ineficiencia operativa en 12 meses.',
    detalle: 'Calculado: $14,468 × 5 empleados × 40% tiempo improductivo × 12 meses',
  },
]

function ProblemCard({
  problema,
  index,
}: {
  problema: (typeof PROBLEMAS)[0]
  index: number
}) {
  const ref   = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon  = problema.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4, boxShadow: `0 20px 60px rgba(${index === 0 ? '212,175,55' : index === 1 ? '74,127,212' : '38,70,83'},0.12)` }}
      className="glass rounded-2xl p-8 flex flex-col gap-6 cursor-hover"
    >
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${problema.color}15`, border: `1px solid ${problema.color}25` }}
        >
          <Icon size={22} style={{ color: problema.color }} />
        </div>
        <span className="text-xs font-mono text-zyvo-white/25 border border-white/[0.06] px-2 py-1 rounded-full">
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div>
        <p className="text-zyvo-white/50 text-sm font-medium mb-2">{problema.titulo}</p>
        <div className="flex items-baseline gap-1">
          {problema.prefijo && (
            <span className="text-2xl font-semibold" style={{ color: problema.color }}>
              {problema.prefijo}
            </span>
          )}
          <span className="text-4xl md:text-5xl font-bold text-zyvo-white tracking-tight">
            {inView ? (
              <CountUp
                end={problema.valor}
                duration={2.5}
                separator=","
                decimals={0}
                useEasing
              />
            ) : (
              '0'
            )}
          </span>
          <span className="text-xl font-medium" style={{ color: problema.color }}>
            {problema.sufijo}
          </span>
        </div>
      </div>

      <div>
        <p className="text-zyvo-white/60 text-sm leading-relaxed mb-3">{problema.descripcion}</p>
        <p className="text-zyvo-white/25 text-xs font-mono leading-relaxed">{problema.detalle}</p>
      </div>
    </motion.div>
  )
}

export default function ProblemaSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true, margin: '-100px' })

  return (
    <section id="problema" className="section-padding relative overflow-hidden">
      {/* Gradiente de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(38,70,83,0.15)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 mb-4"
          >
            <AlertTriangle size={13} className="text-red-400" />
            <span className="text-xs text-red-400/80 font-medium tracking-widest uppercase">
              La realidad financiera de las PyMEs en 2026
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-[family-name:var(--font-instrument-serif)] text-4xl md:text-6xl font-normal text-zyvo-white"
          >
            La pinza financiera que{' '}
            <span className="text-gradient-gold italic">asfixia</span>{' '}
            a tu empresa
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-2xl mx-auto text-zyvo-white/45 text-lg leading-relaxed"
          >
            Costos laborales que suben, márgenes que se comprimen, competencia que automatiza.
            El modelo operativo de 2020 ya no funciona en 2026.
          </motion.p>
        </div>

        {/* Cards de problema */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PROBLEMAS.map((problema, i) => (
            <ProblemCard key={problema.titulo} problema={problema} index={i} />
          ))}
        </div>

        {/* Transición hacia solución */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-gold rounded-full">
            <span className="w-2 h-2 rounded-full bg-zyvo-gold animate-pulse" />
            <span className="text-zyvo-white/60 text-sm">
              La buena noticia: todo esto es{' '}
              <span className="text-zyvo-gold font-semibold">automatizable</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
