'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'
const sintomas = [
  { icon:'⏱', titulo:'Tiempo drenado en tareas repetitivas', desc:'Horas del equipo perdidas cada semana en captura manual, reenvíos y seguimientos que nadie debería estar haciendo.' },
  { icon:'🔀', titulo:'Seguimiento desordenado y datos dispersos', desc:'Información en WhatsApp, Excel, correo y hojas sueltas. Nadie tiene el panorama completo y los errores se multiplican.' },
  { icon:'🧍', titulo:'Procesos que dependen de personas clave', desc:'Si esa persona falta, la operación se detiene. La empresa funciona por inercia, no por sistema.' },
]
const antes = ['Leads que se pierden sin seguimiento','Respuestas que tardan horas o días','Reportes que alguien tiene que armar','Procesos que dependen de una persona','Información que nadie sabe dónde está']
const con = ['Pipeline que avanza solo','Respuesta automática en segundos','Reportes generados en tiempo real','Operación que funciona sola','Todo trazable y accesible siempre']
export default function Problema() {
  return (
    <section className="py-28" style={{ backgroundColor:'#0A0A12' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.p variants={fadeUp} className="section-label mb-3">El problema</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Tu empresa pierde dinero<br/><span className="gradient-text">todos los días sin saberlo.</span></motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto" style={{ color:'#8888A8' }}>La fuga operativa es el costo silencioso del desorden: tiempo, errores y procesos manuales que drenan el margen mes a mes.</motion.p>
        </motion.div>
        <motion.div className="grid md:grid-cols-3 gap-6 mb-20" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {sintomas.map((s,i)=>(
            <motion.div key={i} variants={fadeUp} className="glass-card p-7">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily:'Space Grotesk,sans-serif' }}>{s.titulo}</h3>
              <p className="text-sm leading-relaxed" style={{ color:'#8888A8' }}>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="grid md:grid-cols-2 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="glass-card p-8" style={{ borderColor:'rgba(255,80,80,0.2)' }}>
            <p className="section-label mb-4" style={{ color:'#8888A8' }}>Sin ZYVO</p>
            {antes.map((item,i)=><div key={i} className="flex items-center gap-3 mb-3"><span style={{ color:'#FF6B6B' }}>✗</span><span className="text-sm" style={{ color:'#8888A8' }}>{item}</span></div>)}
          </motion.div>
          <motion.div variants={fadeUp} className="glass-card p-8" style={{ borderColor:'rgba(108,92,231,0.4)', boxShadow:'0 0 30px rgba(108,92,231,0.1)' }}>
            <p className="section-label mb-4" style={{ color:'#6C5CE7' }}>Con ZYVO</p>
            {con.map((item,i)=><div key={i} className="flex items-center gap-3 mb-3"><span style={{ color:'#6C5CE7' }}>✓</span><span className="text-sm" style={{ color:'#F0F0FF' }}>{item}</span></div>)}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
