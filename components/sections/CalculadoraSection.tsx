'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Users, AlertTriangle, ChevronRight } from 'lucide-react'

// ─── Constantes financieras MX 2026 ──────────────────────────────────────────
const SALARIO_DIARIO_MIN    = 315.04         // pesos / día (SMG 2026)
const DIAS_MES              = 30
const CARGA_SOCIAL          = 0.48           // 48% promedio sobre salario bruto
const PCT_IMPRODUCTIVO      = 0.40           // 40% del tiempo en tareas manuales

function useFmt(value: number, decimals = 0) {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

function AnimatedNumber({
  target,
  prefix = '',
  suffix = '',
  className = '',
}: {
  target: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: false })
  const prev   = useRef(0)

  useEffect(() => {
    if (!ref.current) return
    const from = prev.current
    prev.current = target
    const ctrl = animate(from, target, {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate(v) {
        if (ref.current)
          ref.current.textContent =
            prefix +
            new Intl.NumberFormat('es-MX', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(Math.round(v)) +
            suffix
      },
    })
    return () => ctrl.stop()
  }, [target, prefix, suffix])

  // suppress inView lint — used to trigger re-render when visible
  void inView

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>
}

export default function CalculadoraSection() {
  const [empleados, setEmpleados] = useState(5)
  const titleRef  = useRef<HTMLDivElement>(null)
  const inView    = useInView(titleRef, { once: true, margin: '-80px' })

  // ─── Cálculos ─────────────────────────────────────────────────────────────
  const salarioBase    = SALARIO_DIARIO_MIN * DIAS_MES                      // ~$9,451 MXN/mes
  const costoReal      = salarioBase * (1 + CARGA_SOCIAL)                   // ~$13,988 MXN/mes
  const costoMensual   = costoReal * empleados
  const fugaMensual    = costoMensual * PCT_IMPRODUCTIVO                    // 40% malgastado
  const fugaAnual      = fugaMensual * 12

  const ahorroMin        = fugaAnual   * 0.70
  const ahorroMax        = fugaAnual   * 0.80
  const ahorroMensualMin = fugaMensual * 0.70
  const ahorroMensualMax = fugaMensual * 0.80

  const EASE = [0.25, 0.46, 0.45, 0.94] as const

  return (
    <section id="calculadora" className="section-pad relative overflow-hidden">
      {/* Fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(0,170,255,0.04)_0%,transparent_70%)]" />
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zyvo-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} className="mb-14 space-y-3">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest"
          >
            Calculadora de fuga operativa
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.65, ease: EASE }}
            className="font-(family-name:--font-instrument-serif) text-3xl md:text-5xl font-normal text-zyvo-white"
          >
            ¿Cuánto le cuesta el desorden
            <br className="hidden md:block" />
            <span className="text-gradient-gold italic"> a tu empresa?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.16, duration: 0.55 }}
            className="text-zyvo-white/40 text-sm max-w-lg"
          >
            Basado en el salario mínimo general 2026 ($315.04/día) más carga social del 48%.
            Ajusta el número de empleados para ver tu caso real.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ─── Columna izquierda: slider + desglose ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: EASE }}
            className="space-y-6"
          >
            {/* Slider de empleados */}
            <div className="glass rounded-2xl p-7 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-zyvo-gold" />
                  <span className="text-zyvo-white/70 text-sm font-medium">
                    Empleados administrativos
                  </span>
                </div>
                <span className="text-2xl font-bold text-zyvo-gold tabular-nums">{empleados}</span>
              </div>

              {/* Slider custom */}
              <div className="relative">
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={empleados}
                  onChange={e => setEmpleados(Number(e.target.value))}
                  className="w-full h-1 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00AAFF ${((empleados - 1) / 19) * 100}%, rgba(255,255,255,0.08) ${((empleados - 1) / 19) * 100}%)`,
                    outline: 'none',
                  }}
                />
                <style>{`
                  input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 18px; height: 18px;
                    border-radius: 50%;
                    background: #00AAFF;
                    border: 2px solid #080C14;
                    box-shadow: 0 0 10px rgba(0,170,255,0.5);
                    cursor: pointer;
                  }
                  input[type=range]::-moz-range-thumb {
                    width: 18px; height: 18px;
                    border-radius: 50%;
                    background: #00AAFF;
                    border: 2px solid #080C14;
                    box-shadow: 0 0 10px rgba(0,170,255,0.5);
                    cursor: pointer;
                  }
                `}</style>
                <div className="flex justify-between mt-2">
                  {[1, 5, 10, 15, 20].map(n => (
                    <span key={n} className="text-zyvo-white/20 text-xs">{n}</span>
                  ))}
                </div>
              </div>

              {/* Desglose por empleado */}
              <div className="space-y-2 pt-2 border-t border-white/6">
                <p className="text-zyvo-white/30 text-xs uppercase tracking-wider mb-3">
                  Costo real por empleado · salario mínimo
                </p>
                {[
                  { label: 'Salario base mensual',        value: salarioBase,           color: 'text-zyvo-white/60' },
                  { label: 'Carga social (IMSS, INFONAVIT, SAR…)', value: salarioBase * CARGA_SOCIAL, color: 'text-zyvo-white/60' },
                  { label: 'Costo real total / empleado',  value: costoReal,             color: 'text-zyvo-gold' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-zyvo-white/35 text-xs">{row.label}</span>
                    <span className={`text-xs font-mono font-medium ${row.color}`}>
                      ${useFmt(row.value)} MXN
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerta de fuga */}
            <motion.div
              key={empleados}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-2xl p-6 border border-red-500/15 bg-red-500/3"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle size={14} className="text-red-400" />
                </div>
                <div>
                  <p className="text-zyvo-white/70 text-sm font-medium">Lo que pierdes hoy sin hacer nada</p>
                  <p className="text-zyvo-white/35 text-xs mt-0.5">
                    {empleados} empleado{empleados > 1 ? 's' : ''} · 40% tiempo improductivo
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zyvo-white/30 text-xs mb-1">Mensual</p>
                  <AnimatedNumber
                    target={fugaMensual}
                    prefix="$"
                    suffix=" MXN"
                    className="text-xl font-bold text-red-400 tabular-nums"
                  />
                </div>
                <div>
                  <p className="text-zyvo-white/30 text-xs mb-1">Anual</p>
                  <AnimatedNumber
                    target={fugaAnual}
                    prefix="$"
                    suffix=" MXN"
                    className="text-xl font-bold text-red-400 tabular-nums"
                  />
                </div>
              </div>

              <p className="text-red-400/55 text-xs mt-4 leading-relaxed">
                Ese dinero ya sale de tu empresa cada mes — en tiempo pagado que no produce. No es una proyección: es lo que ya está pasando.
              </p>
            </motion.div>
          </motion.div>

          {/* ─── Columna derecha: impacto potencial ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.1, duration: 0.65, ease: EASE }}
            className="space-y-5"
          >

            {/* Card principal de impacto */}
            <div className="glass rounded-2xl p-7 space-y-6">
              <div className="space-y-1">
                <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">
                  Lo que recuperas con ZYVO
                </p>
                <p className="text-zyvo-white/50 text-sm leading-relaxed">
                  Empresas similares recuperan entre el 70% y 80% de su fuga operativa en los primeros 3 meses de implementación
                </p>
              </div>

              {/* Dos números grandes */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-zyvo-white/30 text-xs mb-2">ahorro mínimo anual</p>
                  <AnimatedNumber
                    target={ahorroMin}
                    prefix="$"
                    suffix=" MXN"
                    className="text-2xl font-bold text-zyvo-white tabular-nums leading-tight"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-zyvo-white/30 text-xs mb-2">ahorro máximo anual</p>
                  <AnimatedNumber
                    target={ahorroMax}
                    prefix="$"
                    suffix=" MXN"
                    className="text-2xl font-bold text-zyvo-gold tabular-nums leading-tight"
                  />
                </div>
              </div>

              {/* Barra visual de rango 70–80% */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-zyvo-white/30">
                  <span>70%</span>
                  <span>80%</span>
                </div>
                <div className="relative h-2 w-full rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-white/5 rounded-full" />
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: 0.3, ease: EASE }}
                    className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-zyvo-white/20 to-zyvo-electric/60"
                  />
                </div>
              </div>
            </div>

            {/* Card de impacto mensual */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <p className="text-zyvo-white/50 text-sm leading-relaxed">
                Mensualmente, tu equipo podría liberar entre:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <AnimatedNumber
                    target={ahorroMensualMin}
                    prefix="$"
                    suffix=" MXN/mes"
                    className="text-lg font-semibold text-zyvo-white/70 tabular-nums"
                  />
                </div>
                <div>
                  <AnimatedNumber
                    target={ahorroMensualMax}
                    prefix="$"
                    suffix=" MXN/mes"
                    className="text-lg font-semibold text-zyvo-gold/80 tabular-nums"
                  />
                </div>
              </div>
            </div>

            {/* Card de ventajas de tiempo */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-zyvo-white/30 font-medium uppercase tracking-widest">
                  Optimización del talento humano
                </p>
                <p className="text-zyvo-white/65 text-sm font-medium">Tu equipo hace más, en menos tiempo</p>
                <p className="text-zyvo-white/35 text-xs leading-relaxed">
                  Los empleados digitales absorben el trabajo repetitivo para que tus colaboradores se enfoquen en lo que realmente importa.
                </p>
              </div>
              <div className="space-y-2">
                {/* Encabezado tabla */}
                <div className="grid grid-cols-3 gap-2 pb-2 border-b border-white/6">
                  <span className="text-zyvo-white/25 text-xs">Tarea</span>
                  <span className="text-zyvo-gold/50 text-xs font-medium text-center">Empleado digital</span>
                  <span className="text-zyvo-white/25 text-xs text-right">Equipo humano</span>
                </div>
                {[
                  { tarea: 'Respuesta a mensajes', digital: '< 10 seg', humano: '2–4 hrs' },
                  { tarea: 'Registro de datos',    digital: 'Instantáneo', humano: '1–2 hrs/día' },
                  { tarea: 'Seguimiento a leads',  digital: 'Automático 24/7', humano: 'Solo en horario' },
                ].map(row => (
                  <div key={row.tarea} className="grid grid-cols-3 gap-2 items-center py-1.5">
                    <span className="text-zyvo-white/45 text-xs">{row.tarea}</span>
                    <span className="text-zyvo-gold text-xs font-medium text-center">{row.digital}</span>
                    <span className="text-zyvo-white/35 text-xs text-right">{row.humano}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nota legal */}
            <p className="text-zyvo-white/20 text-xs leading-relaxed px-1">
              * Estimado basado en empresas del mismo perfil. El resultado exacto varía según número de agentes, procesos a automatizar y complejidad de la operación.
            </p>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 8px 40px rgba(255,94,247,0.45), 0 0 60px rgba(2,245,255,0.25)' }}
              whileTap={{ scale: 0.9, rotate: 3 }}
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full flex items-center justify-center gap-2 py-4 btn-glow text-sm cursor-hover"
            >
              Agendar auditoría gratuita
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
