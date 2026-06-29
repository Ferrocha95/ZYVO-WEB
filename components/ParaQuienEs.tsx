'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'
const si = ['Tu empresa ya opera y factura activamente','Tienes procesos manuales que consumen tiempo de tu equipo','Tu equipo persigue leads, respuestas o aprobaciones manualmente','La información vive en demasiados lugares a la vez','Dependes de personas clave para que todo funcione','Quieres escalar sin contratar más operación']
const no = ['Estás en fase de idea o pre-revenue','Buscas un bot de WhatsApp genérico','Quieres una agencia tradicional de marketing digital','No tienes procesos definidos aún']
export default function ParaQuienEs() {
  return (
    <section className="py-28" style={{ backgroundColor:'#0A0A12' }}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div className="text-center mb-14" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.p variants={fadeUp} className="section-label mb-3">Perfil ideal</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold" style={{ fontFamily:'Space Grotesk,sans-serif' }}>ZYVO es para ti si...</motion.h2>
        </motion.div>
        <motion.div className="grid md:grid-cols-2 gap-6 mb-14" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="glass-card p-8" style={{ borderTop:'2px solid rgba(0,255,136,0.4)', boxShadow:'0 0 30px rgba(0,255,136,0.05)' }}>
            <p className="section-label mb-5" style={{ color:'#00FF88' }}>✓ Hecho para ti</p>
            <ul className="space-y-3">{si.map((item,i)=><li key={i} className="flex items-start gap-3 text-sm"><span style={{ color:'#00FF88',marginTop:2 }}>✓</span><span style={{ color:'#F0F0FF' }}>{item}</span></li>)}</ul>
          </motion.div>
          <motion.div variants={fadeUp} className="glass-card p-8" style={{ borderTop:'2px solid rgba(255,80,80,0.3)', boxShadow:'0 0 30px rgba(255,80,80,0.03)' }}>
            <p className="section-label mb-5" style={{ color:'#FF6B6B' }}>✗ No es para ti</p>
            <ul className="space-y-3">{no.map((item,i)=><li key={i} className="flex items-start gap-3 text-sm"><span style={{ color:'#FF6B6B',marginTop:2 }}>✗</span><span style={{ color:'#8888A8' }}>{item}</span></li>)}</ul>
          </motion.div>
        </motion.div>
        <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <p className="text-sm italic mb-6" style={{ color:'#8888A8' }}>Si estás en el SÍ, estamos construidos para trabajar juntos.</p>
          <a href="#auditoria" className="btn-primary" style={{ padding:'14px 32px',fontSize:16 }}>Agendar mi Auditoría →</a>
        </motion.div>
      </div>
    </section>
  )
}
