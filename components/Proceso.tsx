'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'
import { pasos } from '@/lib/constants'
export default function Proceso() {
  return (
    <section id="proceso" className="py-32 w-full" style={{ backgroundColor:'#050508' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div className="text-center mb-20" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.p variants={fadeUp} className="section-label mb-3">Cómo trabajamos</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily:'Space Grotesk,sans-serif' }}>De la auditoría al sistema<br/><span className="gradient-text">en producción.</span></motion.h2>
        </motion.div>
        <div className="hidden lg:block relative">
          <div className="absolute top-8 left-0 right-0 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(108,92,231,0.4) 20%,rgba(108,92,231,0.4) 80%,transparent)' }}/>
          <motion.div className="grid grid-cols-4 gap-8" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            {pasos.map((p,i)=>(
              <motion.div key={i} variants={fadeUp} className="relative pt-16">
                <div className="absolute top-0 left-6 w-16 h-16 rounded-2xl flex items-center justify-center z-10" style={{ background:i===0?'linear-gradient(135deg,#6C5CE7,#A855F7)':'#0D0D14', border:'1px solid rgba(108,92,231,0.4)' }}>
                  <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:13, color:i===0?'white':'#6C5CE7', fontWeight:600 }}>{p.numero}</span>
                </div>
                <div className="glass-card p-7">
                  <h3 className="text-base font-bold mb-2" style={{ fontFamily:'Space Grotesk,sans-serif' }}>{p.titulo}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color:'#8888A8' }}>{p.descripcion}</p>
                  <span className="text-xs" style={{ fontFamily:'JetBrains Mono,monospace', color:'#6C5CE7' }}>{p.tiempo}</span>
                  {p.badge&&<span className="pill ml-2 text-xs">{p.badge}</span>}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div className="lg:hidden space-y-6 relative" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <div className="absolute left-7 top-0 bottom-0 w-px" style={{ background:'linear-gradient(180deg,transparent,rgba(108,92,231,0.4) 10%,rgba(108,92,231,0.4) 90%,transparent)' }}/>
          {pasos.map((p,i)=>(
            <motion.div key={i} variants={fadeUp} className="flex gap-5">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 z-10" style={{ background:i===0?'linear-gradient(135deg,#6C5CE7,#A855F7)':'#0D0D14', border:'1px solid rgba(108,92,231,0.4)' }}>
                <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:i===0?'white':'#6C5CE7', fontWeight:600 }}>{p.numero}</span>
              </div>
              <div className="glass-card p-5 flex-1">
                <h3 className="text-base font-bold mb-1" style={{ fontFamily:'Space Grotesk,sans-serif' }}>{p.titulo}</h3>
                <p className="text-sm leading-relaxed mb-3" style={{ color:'#8888A8' }}>{p.descripcion}</p>
                <span className="text-xs" style={{ fontFamily:'JetBrains Mono,monospace', color:'#6C5CE7' }}>{p.tiempo}</span>
                {p.badge&&<span className="pill ml-2 text-xs">{p.badge}</span>}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.p className="text-center mt-14 text-sm" style={{ color:'#8888A8' }} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={viewportOnce}>ROI mínimo 3x o devolvemos la inversión. Sin letra pequeña.</motion.p>
      </div>
    </section>
  )
}
