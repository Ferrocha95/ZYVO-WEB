'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'
import { empleados } from '@/lib/constants'
const bc: Record<string,{bg:string,border:string,text:string}> = {
  violet:{ bg:'rgba(108,92,231,0.15)', border:'rgba(108,92,231,0.3)', text:'#A855F7' },
  cyan:{ bg:'rgba(0,212,255,0.12)', border:'rgba(0,212,255,0.3)', text:'#00D4FF' },
  purple:{ bg:'rgba(168,85,247,0.12)', border:'rgba(168,85,247,0.3)', text:'#C084FC' },
}
export default function EmpleadosDigitales() {
  return (
    <section id="empleados" className="py-32" style={{ backgroundColor:'#050508' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.p variants={fadeUp} className="section-label mb-3">Marketplace</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Tu equipo nunca duerme.</motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto" style={{ color:'#8888A8' }}>Empleados digitales listos para trabajar. Cada uno especializado. Todos disponibles desde ZYVO Hub.</motion.p>
        </motion.div>
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {empleados.map(e=>{
            const c=bc[e.badgeColor]
            return (
              <motion.div key={e.id} variants={fadeUp} whileHover={{ y:-5, transition:{ type:'spring',stiffness:300,damping:20 } }} className="glass-card p-8 flex flex-col relative overflow-hidden" style={e.destacado?{ borderColor:'rgba(108,92,231,0.6)', boxShadow:'0 0 40px rgba(108,92,231,0.15)' }:{}}>
                {e.destacado&&<div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ background:'linear-gradient(90deg,#6C5CE7,#00D4FF)' }}/>}
                <div className="text-3xl mb-4">{e.emoji}</div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold" style={{ fontFamily:'Space Grotesk,sans-serif' }}>{e.nombre}</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor:c.bg, border:`1px solid ${c.border}`, color:c.text }}>{e.badge}</span>
                </div>
                <p className="text-sm mb-4" style={{ color:'#8888A8' }}>{e.descripcion}</p>
                <ul className="space-y-2 mb-6 flex-1">{e.capacidades.map((cap,i)=><li key={i} className="flex items-start gap-2 text-sm" style={{ color:'#F0F0FF' }}><span className="mt-0.5 text-xs" style={{ color:'#6C5CE7' }}>✓</span>{cap}</li>)}</ul>
                <div className="pt-4" style={{ borderTop:'1px solid rgba(108,92,231,0.1)' }}>
                  <button className="btn-ghost w-full text-sm" style={{ padding:'8px 16px', fontSize:13 }} onClick={()=>document.getElementById('rome-widget-btn')?.click()}>Ver más →</button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
        <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <p className="mb-5" style={{ color:'#8888A8' }}>¿Necesitas algo más específico para tu operación?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="btn-ghost" onClick={()=>document.getElementById('rome-widget-btn')?.click()}>Hablar con Rome →</button>
            <a href="#auditoria" className="btn-primary">Agendar Auditoría →</a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
