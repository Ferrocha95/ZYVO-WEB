'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'
const productos = [
  { glow:'#6C5CE7', badge:'Producto de Entrada', emoji:'🏛️', nombre:'ZYVO Hub', headline:'Tu centro de mando operativo con IA', desc:'Plataforma SaaS donde viven tus empleados digitales. Ves en tiempo real qué hace tu infraestructura y controlas todo desde un solo lugar. La puerta de entrada al ecosistema ZYVO.', pills:['Asistente Directiva IA','Centro de Mando','Marketplace de Agentes'], cta:'Conocer ZYVO Hub →', href:'#hub' },
  { glow:'#00D4FF', badge:'Para equipos comerciales', emoji:'🎯', nombre:'CRM Inteligente', headline:'Tu pipeline comercial con inteligencia artificial', desc:'Sistema de gestión comercial con IA que califica leads, da seguimiento automatizado y mueve el proceso de venta sin que tu equipo lo persiga. Más cierres, menos trabajo manual.', pills:['Calificación automática','Seguimiento 24/7','Reportes en tiempo real'], cta:'Explorar CRM →', href:'#auditoria' },
  { glow:'#A855F7', badge:'Para operación completa', emoji:'⚙️', nombre:'ERP Agéntico', headline:'Tu operación entera en autopiloto', desc:'Sistema empresarial donde agentes de IA coordinan inventario, logística, finanzas, documentación y equipos. No un software más — infraestructura operativa autónoma construida a la medida de tu empresa.', pills:['Coordinación autónoma','Trazabilidad total','Integración nativa'], cta:'Explorar ERP →', href:'#auditoria' },
]
export default function Productos() {
  return (
    <section id="productos" className="py-28" style={{ backgroundColor:'#050508' }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div className="text-center mb-16" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.p variants={fadeUp} className="section-label mb-3">Arquitectura completa</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Una arquitectura completa.<br/><span className="gradient-text">Tres capas de poder.</span></motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto" style={{ color:'#8888A8' }}>No vendemos herramientas aisladas. Construimos la infraestructura completa.</motion.p>
        </motion.div>
        <motion.div className="grid md:grid-cols-3 gap-6" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          {productos.map((p,i)=>(
            <motion.div key={i} variants={fadeUp} whileHover={{ y:-6, transition:{ type:'spring',stiffness:300,damping:20 } }} className="glass-card p-8 flex flex-col relative overflow-hidden" style={{ borderTop:`2px solid ${p.glow}` }}>
              <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background:`radial-gradient(ellipse at top,${p.glow}15 0%,transparent 70%)` }}/>
              <div className="text-4xl mb-4">{p.emoji}</div>
              <span className="pill mb-4 self-start" style={{ fontSize:11 }}>{p.badge}</span>
              <p className="text-xs font-semibold mb-1" style={{ color:p.glow, fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.08em' }}>{p.nombre}</p>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily:'Space Grotesk,sans-serif' }}>{p.headline}</h3>
              <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color:'#8888A8' }}>{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">{p.pills.map((pill,j)=><span key={j} className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor:`${p.glow}15`, border:`1px solid ${p.glow}30`, color:p.glow }}>{pill}</span>)}</div>
              <a href={p.href} className="text-sm font-medium mt-auto" style={{ color:p.glow }}>{p.cta}</a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
