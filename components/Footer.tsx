'use client'
import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/animations'
const soluciones = [{ label:'ZYVO Hub', href:'#hub' },{ label:'CRM Inteligente', href:'#productos' },{ label:'ERP Agéntico', href:'#productos' },{ label:'Empleados Digitales', href:'#empleados' },{ label:'Calculadora', href:'#calculadora' }]
const empresa = [{ label:'Auditoría de Fricción', href:'/auditoria' },{ label:'Partners', href:'/partners' },{ label:'Blog', href:'/blog' },{ label:'Privacidad', href:'/privacidad' },{ label:'LFPDPPP', href:'/privacidad#lfpdppp' }]
const redes = [{ label:'Instagram', href:'https://www.instagram.com/zyvo_ai/', icon:'📸' },{ label:'Facebook', href:'https://www.facebook.com/share/1Cqb4Qrti7/', icon:'👥' },{ label:'TikTok', href:'https://tiktok.com/@zyvo.ai', icon:'🎵' },{ label:'LinkedIn', href:'https://linkedin.com/company/zyvo-ai', icon:'💼' }]
const ls = { color:'#8888A8', fontSize:14, textDecoration:'none', display:'block', marginBottom:12, transition:'color .2s' }
export default function Footer() {
  return (
    <footer style={{ backgroundColor:'#0D0D14', borderTop:'1px solid rgba(108,92,231,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="gradient-text font-bold text-2xl mb-3" style={{ fontFamily:'Space Grotesk,sans-serif' }}>ZYVO</div>
            <p className="text-sm mb-6" style={{ color:'#8888A8' }}>Infraestructura inteligente.<br/>Resultados medibles.</p>
            <div className="flex gap-3 mb-6">{redes.map(r=><a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-sm transition-all" style={{ width:36,height:36,borderRadius:12,backgroundColor:'rgba(108,92,231,0.1)',border:'1px solid rgba(108,92,231,0.2)' }} title={r.label}>{r.icon}</a>)}</div>
            <div className="glass-card p-4 text-xs space-y-1.5">
              <p style={{ color:'#8888A8' }}>🏢 Empresa legalmente constituida en México</p>
<p style={{ color:'#8888A8' }}>☁️ Infraestructura propia · Google Cloud</p>
              <p style={{ color:'#8888A8' }}>🔒 Self-Hosted · IA Ética</p>
            </div>
          </div>
          <div><p className="section-label mb-4">Soluciones</p>{soluciones.map(l=><a key={l.label} href={l.href} style={ls} onMouseEnter={e=>(e.currentTarget.style.color='#F0F0FF')} onMouseLeave={e=>(e.currentTarget.style.color='#8888A8')}>{l.label}</a>)}</div>
          <div><p className="section-label mb-4">Empresa</p>{empresa.map(l=><a key={l.label} href={l.href} style={ls} onMouseEnter={e=>(e.currentTarget.style.color='#F0F0FF')} onMouseLeave={e=>(e.currentTarget.style.color='#8888A8')}>{l.label}</a>)}</div>
          <div>
            <p className="section-label mb-4">Contacto</p>
            <a href="mailto:direccion@zyvo.com.mx" style={ls} onMouseEnter={e=>(e.currentTarget.style.color='#F0F0FF')} onMouseLeave={e=>(e.currentTarget.style.color='#8888A8')}>direccion@zyvo.com.mx</a>
            <a href="https://wa.me/" style={ls} onMouseEnter={e=>(e.currentTarget.style.color='#F0F0FF')} onMouseLeave={e=>(e.currentTarget.style.color='#8888A8')}>WhatsApp</a>
            <button className="btn-ghost w-full mt-2" style={{ padding:'8px 16px',fontSize:13 }} onClick={()=>document.getElementById('rome-widget-btn')?.click()}>Hablar con Rome →</button>
          </div>
        </motion.div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-6" style={{ borderTop:'1px solid rgba(108,92,231,0.1)' }}>
          <p className="text-xs" style={{ color:'#8888A8' }}>© 2026 ZYVO · México · IA Ética · Self-Hosted</p>
          <p className="text-xs" style={{ fontFamily:'JetBrains Mono,monospace', color:'#8888A8' }}>Sistemas activos: <span style={{ color:'#6C5CE7' }}>12+</span></p>
          <p className="text-xs" style={{ color:'#8888A8' }}>Datos protegidos conforme a la LFPDPPP</p>
        </div>
      </div>
    </footer>
  )
}
