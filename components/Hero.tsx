'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'
import AgentNetworkSVG from './AgentNetworkSVG'

const LINES = [
  '> Analizando fricción operativa...     ✓',
  '> Detectando procesos manuales...      ✓',
  '> Conectando infraestructura ZYVO...   ✓',
  '> Sistema operativo. Listo.',
]

function Terminal() {
  const [lines, setLines] = useState<string[]>([])
  const [done, setDone] = useState(false)
  useEffect(() => {
    LINES.forEach((line,i) => setTimeout(() => { setLines(prev=>[...prev,line]); if(i===LINES.length-1) setDone(true) }, 600+i*900))
  }, [])
  return (
    <div className="glass-card p-4 mt-6" style={{ borderColor:'rgba(108,92,231,0.4)' }}>
      <div className="flex gap-1.5 mb-3">{['#FF5F57','#FEBC2E','#28C840'].map(c=><div key={c} style={{ width:10,height:10,borderRadius:'50%',backgroundColor:c }}/>)}</div>
      <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#00D4FF', lineHeight:2 }}>
        {lines.map((l,i)=><div key={i}>{l}</div>)}
        {!done && <span style={{ animation:'blink 1s step-end infinite' }}>▮</span>}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden dot-grid-bg">
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(108,92,231,0.12) 0%,transparent 70%)' }}/>
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}><span className="pill">✦ Infraestructura inteligente para México y LATAM</span></motion.div>
            <motion.h1 variants={fadeUp} className="mt-6 text-5xl lg:text-6xl font-bold" style={{ fontFamily:'Space Grotesk,sans-serif', letterSpacing:'-0.02em', lineHeight:1.1 }}>
              La infraestructura inteligente que tu empresa necesita para{' '}
              <span className="gradient-text">dejar de operar en modo manual.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 text-lg max-w-xl" style={{ color:'#8888A8', lineHeight:1.7 }}>
              Diseñamos sistemas de IA, empleados digitales y plataformas agénticas para empresas en México y LATAM que necesitan orden, velocidad y control real.
            </motion.p>
            <motion.div variants={fadeUp}><Terminal/></motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-8">
              <a href="#auditoria" className="btn-primary">Agendar mi Auditoría — Es gratuita</a>
              <a href="#hub" className="btn-ghost">Explorar ZYVO Hub →</a>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6">
              {[{i:'⚡',t:'Primera entrega en 10 días'},{i:'📉',t:'85% menos carga operativa'},{i:'🔁',t:'ROI mínimo 3x garantizado'}].map((m,i)=>(
                <span key={i} className="flex items-center gap-2 text-sm" style={{ color:'#8888A8' }}>{m.i} {m.t}{i<2&&<span className="hidden sm:inline ml-4" style={{ color:'rgba(108,92,231,0.3)' }}>|</span>}</span>
              ))}
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity:0,x:40 }} animate={{ opacity:1,x:0 }} transition={{ duration:0.8,delay:0.3,ease:[0.22,1,0.36,1] }} className="hidden lg:flex justify-center items-center">
            <AgentNetworkSVG/>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
