'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'
const bullets = ['Conectada a Gmail, Outlook, Calendar y Drive desde el primer día','Entrenada con el conocimiento específico de tu empresa','Disponible 24/7 en el Hub y donde la necesites','Desde aquí contratas más empleados digitales cuando los necesites']
const chat = [
  { role:'user', msg:'Resume mis correos importantes de hoy' },
  { role:'ai', msg:'Tienes 3 correos prioritarios: uno sobre un contrato pendiente, una reunión por confirmar el jueves y un lead nuevo que necesita seguimiento.' },
  { role:'user', msg:'Agenda la reunión del jueves a las 10am' },
  { role:'ai', msg:'Listo. Reunión agendada el jueves 10:00am. Invitación enviada a los participantes. ¿Algo más?' },
]
export default function HubSpotlight() {
  return (
    <section id="hub" className="py-32 relative overflow-hidden" style={{ backgroundColor:'#0A0A12' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 60% 60% at 50% 50%,rgba(108,92,231,0.07) 0%,transparent 70%)' }}/>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.div variants={fadeUp}><span className="pill" style={{ backgroundColor:'rgba(108,92,231,0.15)', borderColor:'rgba(108,92,231,0.3)', color:'#A855F7' }}>✦ Precio especial de lanzamiento activo</span></motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mt-6 mb-5" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Empieza con tu<br/><span className="gradient-text">Asistente Directiva IA.</span></motion.h2>
            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8" style={{ color:'#8888A8' }}>ZYVO Hub es la plataforma donde vive tu infraestructura inteligente. Empieza con tu Asistente Directiva — una mano derecha digital que gestiona tu agenda, correos, documentos y contexto de negocio desde el primer día.</motion.p>
            <motion.ul variants={stagger} className="space-y-3 mb-8">
              {bullets.map((b,i)=><motion.li key={i} variants={fadeUp} className="flex items-start gap-3 text-sm" style={{ color:'#F0F0FF' }}><span style={{ color:'#6C5CE7', marginTop:2 }}>✓</span>{b}</motion.li>)}
            </motion.ul>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <a href="https://hub.zyvo.com.mx" className="btn-primary">Comenzar con el Hub →</a>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-3 text-xs" style={{ color:'#8888A8' }}>Sin técnicos. Sin instalación. Activa en minutos.</motion.p>
          </motion.div>
          <motion.div initial={{ opacity:0,x:40 }} whileInView={{ opacity:1,x:0 }} transition={{ duration:0.8,ease:[0.22,1,0.36,1] }} viewport={viewportOnce}>
            <div className="glass-card p-8 relative overflow-hidden" style={{ minHeight:440, borderColor:'rgba(108,92,231,0.3)' }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse at top right,rgba(108,92,231,0.12) 0%,transparent 60%)' }}/>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background:'linear-gradient(135deg,#6C5CE7,#A855F7)', color:'white' }}>Z</div>
                <div><p className="text-xs font-semibold" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Asistente Directiva IA</p><p className="text-xs" style={{ color:'#00D4FF' }}>● En línea</p></div>
              </div>
              {chat.map((m,i)=>(
                <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'} mb-3`}>
                  <div className="max-w-[80%] px-4 py-2.5 text-xs leading-relaxed" style={{ backgroundColor:m.role==='user'?'rgba(108,92,231,0.3)':'rgba(255,255,255,0.05)', color:m.role==='user'?'#F0F0FF':'#8888A8', borderRadius:m.role==='user'?'18px 18px 4px 18px':'18px 18px 18px 4px' }}>{m.msg}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
