'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'

// ─── Constantes financieras MX 2026 (sin tocar) ───────────────────────────────
const SALARIO_DIARIO_MIN  = 315.04
const DIAS_MES            = 30
const CARGA_SOCIAL        = 0.48
const PCT_IMPRODUCTIVO    = 0.40

function AnimatedNumber({ target, prefix = '', suffix = '', className = '', style }: { target: number; prefix?: string; suffix?: string; className?: string; style?: React.CSSProperties }) {
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
          ref.current.textContent = prefix + new Intl.NumberFormat('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(v)) + suffix
      },
    })
    return () => ctrl.stop()
  }, [target, prefix, suffix])
  void inView
  return <span ref={ref} className={className} style={style}>{prefix}0{suffix}</span>
}

export default function Calculadora() {
  const [empleados, setEmpleados] = useState(5)

  // ─── Cálculos (sin cambiar fórmulas) ──────────────────────────────────────
  const salarioBase      = SALARIO_DIARIO_MIN * DIAS_MES
  const costoReal        = salarioBase * (1 + CARGA_SOCIAL)
  const costoMensual     = costoReal * empleados
  const fugaMensual      = costoMensual * PCT_IMPRODUCTIVO
  const fugaAnual        = fugaMensual * 12
  const ahorroMin        = fugaAnual   * 0.70
  const ahorroMax        = fugaAnual   * 0.80
  const ahorroMensualMin = fugaMensual * 0.70
  const ahorroMensualMax = fugaMensual * 0.80

  const fmt = (n: number) => new Intl.NumberFormat('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Math.round(n))

  return (
    <section id="calculadora" className="py-28" style={{ backgroundColor:'#0A0A12' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.p variants={fadeUp} className="section-label mb-3">Calculadora de fuga operativa</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily:'Space Grotesk,sans-serif' }}>
            ¿Cuánto le cuesta el desorden<br/><span className="gradient-text">a tu empresa?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto" style={{ color:'#8888A8' }}>
            Basado en el salario mínimo general 2026 ($315.04/día) más carga social del 48%.
          </motion.p>
        </motion.div>

        <div className="glass-card max-w-4xl mx-auto p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* Columna izquierda: slider + desglose */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium" style={{ color:'#F0F0FF' }}>Empleados administrativos</span>
                  <span className="text-2xl font-bold gradient-text tabular-nums" style={{ fontFamily:'JetBrains Mono,monospace' }}>{empleados}</span>
                </div>
                <input
                  type="range" min={1} max={20} value={empleados}
                  onChange={e => setEmpleados(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ background:`linear-gradient(to right,#6C5CE7 ${((empleados-1)/19)*100}%,rgba(255,255,255,0.08) ${((empleados-1)/19)*100}%)`, outline:'none' }}
                />
                <style>{`
                  input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:#6C5CE7; border:2px solid #0A0A12; box-shadow:0 0 10px rgba(108,92,231,0.5); cursor:pointer; }
                  input[type=range]::-moz-range-thumb { width:18px; height:18px; border-radius:50%; background:#6C5CE7; border:2px solid #0A0A12; box-shadow:0 0 10px rgba(108,92,231,0.5); cursor:pointer; }
                `}</style>
                <div className="flex justify-between mt-2">
                  {[1,5,10,15,20].map(n=><span key={n} className="text-xs" style={{ color:'rgba(255,255,255,0.2)' }}>{n}</span>)}
                </div>
              </div>

              {/* Desglose por empleado */}
              <div className="space-y-2 pt-4" style={{ borderTop:'1px solid rgba(108,92,231,0.15)' }}>
                <p className="section-label mb-3">Costo real por empleado</p>
                {[
                  { label:'Salario base mensual', value:salarioBase },
                  { label:'Carga social (IMSS, INFONAVIT, SAR…)', value:salarioBase*CARGA_SOCIAL },
                  { label:'Costo real total / empleado', value:costoReal, highlight:true },
                ].map(row=>(
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color:'#8888A8' }}>{row.label}</span>
                    <span className="text-xs font-medium" style={{ fontFamily:'JetBrains Mono,monospace', color:row.highlight?'#6C5CE7':'rgba(255,255,255,0.5)' }}>${fmt(row.value)} MXN</span>
                  </div>
                ))}
              </div>

              {/* Fuga operativa */}
              <motion.div key={empleados} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.4 }} className="rounded-xl p-5" style={{ backgroundColor:'rgba(255,80,80,0.06)', border:'1px solid rgba(255,80,80,0.15)' }}>
                <p className="text-xs mb-3" style={{ color:'rgba(255,255,255,0.4)' }}>{empleados} empleado{empleados>1?'s':''} · 40% tiempo improductivo</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs mb-1" style={{ color:'rgba(255,255,255,0.3)' }}>Fuga mensual</p>
                    <AnimatedNumber target={fugaMensual} prefix="$" suffix=" MXN" className="text-xl font-bold tabular-nums" style={{ color:'#FF6B6B' }}/>
                  </div>
                  <div>
                    <p className="text-xs mb-1" style={{ color:'rgba(255,255,255,0.3)' }}>Fuga anual</p>
                    <AnimatedNumber target={fugaAnual} prefix="$" suffix=" MXN" className="text-xl font-bold tabular-nums" style={{ color:'#FF6B6B' }}/>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Columna derecha: impacto potencial */}
            <div className="space-y-5">
              <div className="rounded-xl p-6 space-y-5" style={{ backgroundColor:'rgba(108,92,231,0.06)', border:'1px solid rgba(108,92,231,0.2)' }}>
                <p className="section-label mb-1">Impacto potencial con ZYVO</p>
                <p className="text-sm" style={{ color:'#8888A8' }}>Empresas similares recuperan entre el 70% y 80% de su fuga operativa.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs mb-2" style={{ color:'rgba(255,255,255,0.3)' }}>Ahorro mínimo anual</p>
                    <AnimatedNumber target={ahorroMin} prefix="$" suffix=" MXN" className="text-xl font-bold gradient-text tabular-nums"/>
                  </div>
                  <div>
                    <p className="text-xs mb-2" style={{ color:'rgba(255,255,255,0.3)' }}>Ahorro máximo anual</p>
                    <AnimatedNumber target={ahorroMax} prefix="$" suffix=" MXN" className="text-xl font-bold gradient-text tabular-nums"/>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs" style={{ color:'rgba(255,255,255,0.3)' }}><span>70%</span><span>80%</span></div>
                  <div className="relative h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor:'rgba(255,255,255,0.05)' }}>
                    <motion.div initial={{ width:0 }} whileInView={{ width:'75%' }} viewport={{ once:true }} transition={{ duration:1.0,delay:0.3,ease:[0.25,0.46,0.45,0.94] }} className="absolute inset-y-0 left-0 rounded-full" style={{ background:'linear-gradient(90deg,#6C5CE7,#00D4FF)' }}/>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-5 space-y-3" style={{ backgroundColor:'rgba(255,255,255,0.03)', border:'1px solid rgba(108,92,231,0.1)' }}>
                <p className="text-sm" style={{ color:'#8888A8' }}>Mensualmente podrías liberar entre:</p>
                <div className="grid grid-cols-2 gap-4">
                  <AnimatedNumber target={ahorroMensualMin} prefix="$" suffix="/mes" className="text-base font-semibold gradient-text tabular-nums"/>
                  <AnimatedNumber target={ahorroMensualMax} prefix="$" suffix="/mes" className="text-base font-semibold gradient-text tabular-nums"/>
                </div>
              </div>

              {/* Bloque CTA condicional con fadeIn */}
              {fugaAnual > 0 && (
                <motion.div variants={fadeUp} initial="hidden" animate="visible" className="rounded-xl p-5 text-center" style={{ backgroundColor:'rgba(108,92,231,0.1)', border:'1px solid rgba(108,92,231,0.3)' }}>
                  <p className="text-sm font-semibold mb-4" style={{ color:'#F0F0FF' }}>
                    Tu ahorro estimado: ${fmt(ahorroMin)} – ${fmt(ahorroMax)} MXN/año
                  </p>
                  <a href="#auditoria" className="btn-primary" style={{ padding:'10px 22px', fontSize:14 }}>Agendar auditoría gratuita →</a>
                </motion.div>
              )}

              <p className="text-xs" style={{ color:'#8888A8' }}>* Estimado con carga social real 2026. Varía según operación.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
