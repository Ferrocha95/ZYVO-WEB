'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'
export default function RomeSection() {
  return (
    <section className="py-32" style={{ backgroundColor:'#0A0A12' }}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div className="glass-card p-14 text-center relative overflow-hidden" style={{ borderColor:'rgba(108,92,231,0.4)', boxShadow:'0 0 60px rgba(108,92,231,0.1)' }} variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at center,rgba(108,92,231,0.08) 0%,transparent 70%)' }}/>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-6">
            <div style={{ width:8,height:8,borderRadius:'50%',backgroundColor:'#00FF88',animation:'pulse-dot 2s ease-in-out infinite' }}/>
            <span style={{ fontFamily:'JetBrains Mono,monospace', fontSize:12, color:'#00FF88' }}>En línea ahora</span>
          </motion.div>
          <motion.div variants={fadeUp} className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl" style={{ background:'linear-gradient(135deg,#6C5CE7,#A855F7)', boxShadow:'0 0 30px rgba(108,92,231,0.4)', animation:'glow-pulse 3s ease-in-out infinite' }}>🤖</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Rome está disponible ahora.</motion.h2>
          <motion.p variants={fadeUp} className="text-lg mb-8" style={{ color:'#8888A8' }}>Nuestro agente comercial responde tus dudas en segundos.<br/>Sin formulario. Sin espera. Sin pitch agresivo.</motion.p>
          <motion.div variants={fadeUp}>
            <button className="btn-primary" style={{ fontSize:16,padding:'14px 32px' }} onClick={()=>document.getElementById('rome-widget-btn')?.click()}>Hablar con Rome →</button>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-5 text-sm" style={{ color:'#8888A8' }}>
            También puedes <a href="#auditoria" style={{ color:'#6C5CE7', textDecoration:'underline' }}>agendar directamente</a> si ya sabes lo que necesitas.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
