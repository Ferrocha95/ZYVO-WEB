'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewportOnce } from '@/lib/animations'
const paises = [{ code:'+52',flag:'🇲🇽' },{ code:'+1',flag:'🇺🇸' },{ code:'+57',flag:'🇨🇴' },{ code:'+54',flag:'🇦🇷' },{ code:'+34',flag:'🇪🇸' }]
const incluye = ['Diagnóstico completo de tus procesos operativos','Mapa de fricción: dónde pierdes tiempo y dinero','Roadmap de automatización priorizado por ROI','Presentación de resultados en videollamada de 45 min','Sin compromiso de implementación posterior']
const inp = { width:'100%', backgroundColor:'#0D0D14', border:'1px solid rgba(108,92,231,0.2)', borderRadius:12, padding:'12px 16px', color:'#F0F0FF', fontFamily:'Inter,sans-serif', fontSize:14, outline:'none', transition:'border-color .2s' }
export default function Auditoria() {
  const [pais,setPais] = useState('+52')
  const [submitted,setSubmitted] = useState(false)
  const [form,setForm] = useState({ nombre:'',empresa:'',email:'',whatsapp:'',facturacion:'' })
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/contact', { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ ...form, pais }) })
    } catch(err) { console.error(err) }
    setSubmitted(true)
  }
  return (
    <section id="auditoria" className="py-32 w-full" style={{ backgroundColor:'#050508' }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div className="text-center mb-14" variants={stagger} initial="hidden" whileInView="visible" viewport={viewportOnce}>
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 text-sm font-medium" style={{ background:'linear-gradient(135deg,rgba(108,92,231,0.25),rgba(168,85,247,0.2))', border:'1px solid rgba(108,92,231,0.4)', color:'#A855F7' }}>✦ LANZAMIENTO — Auditoría gratuita por tiempo limitado</motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily:'Space Grotesk,sans-serif' }}>Descubre exactamente dónde está<br/><span className="gradient-text">perdiendo dinero tu empresa.</span></motion.h2>
          <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color:'#8888A8' }}>Normalmente la Auditoría de Fricción Operativa tiene un costo. Durante nuestro lanzamiento, la ofrecemos sin cargo para empresas calificadas en México y LATAM.</motion.p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <p className="section-label mb-5">Lo que incluye</p>
            <ul className="space-y-4 mb-8">{incluye.map((item,i)=><li key={i} className="flex items-start gap-3 text-sm" style={{ color:'#F0F0FF' }}><span style={{ color:'#6C5CE7',marginTop:2 }}>✓</span>{item}</li>)}</ul>
            <div className="glass-card p-5"><p className="text-xs mb-1" style={{ color:'#8888A8',fontFamily:'JetBrains Mono,monospace' }}>Resultado esperado</p><p className="text-sm" style={{ color:'#F0F0FF' }}>Un roadmap claro de qué automatizar primero, cuánto recuperas y en cuánto tiempo — sin tecnicismos, sin promesas vacías.</p></div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            {submitted ? (
              <div className="glass-card p-10 text-center" style={{ borderColor:'rgba(108,92,231,0.4)' }}>
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily:'Space Grotesk,sans-serif' }}>¡Solicitud recibida!</h3>
                <p style={{ color:'#8888A8' }}>Respondemos en menos de 24 horas hábiles.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs mb-1.5" style={{ color:'#8888A8' }}>Nombre completo *</label><input required style={inp} placeholder="Tu nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} onFocus={e=>(e.target.style.borderColor='#6C5CE7')} onBlur={e=>(e.target.style.borderColor='rgba(108,92,231,0.2)')}/></div>
                  <div><label className="block text-xs mb-1.5" style={{ color:'#8888A8' }}>Empresa *</label><input required style={inp} placeholder="Tu empresa" value={form.empresa} onChange={e=>setForm({...form,empresa:e.target.value})} onFocus={e=>(e.target.style.borderColor='#6C5CE7')} onBlur={e=>(e.target.style.borderColor='rgba(108,92,231,0.2)')}/></div>
                </div>
                <div><label className="block text-xs mb-1.5" style={{ color:'#8888A8' }}>Email *</label><input required type="email" style={inp} placeholder="tu@empresa.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} onFocus={e=>(e.target.style.borderColor='#6C5CE7')} onBlur={e=>(e.target.style.borderColor='rgba(108,92,231,0.2)')}/></div>
                <div><label className="block text-xs mb-1.5" style={{ color:'#8888A8' }}>WhatsApp (opcional)</label><div className="flex gap-2"><select value={pais} onChange={e=>setPais(e.target.value)} style={{ ...inp,width:90,flexShrink:0,cursor:'pointer' }}>{paises.map(p=><option key={p.code} value={p.code}>{p.flag} {p.code}</option>)}</select><input style={inp} placeholder="Número" value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} onFocus={e=>(e.target.style.borderColor='#6C5CE7')} onBlur={e=>(e.target.style.borderColor='rgba(108,92,231,0.2)')}/></div></div>
                <div><label className="block text-xs mb-1.5" style={{ color:'#8888A8' }}>Facturación mensual *</label><select required style={{ ...inp,cursor:'pointer' }} value={form.facturacion} onChange={e=>setForm({...form,facturacion:e.target.value})} onFocus={e=>(e.target.style.borderColor='#6C5CE7')} onBlur={e=>(e.target.style.borderColor='rgba(108,92,231,0.2)')}><option value="">Selecciona un rango</option><option>$100K – $500K MXN/mes</option><option>$500K – $2M MXN/mes</option><option>$2M – $10M MXN/mes</option><option>+$10M MXN/mes</option></select></div>
                <button type="submit" className="btn-primary w-full justify-center" style={{ padding:'14px 28px',fontSize:15 }}>Agendar mi Auditoría Gratuita →</button>
                <p className="text-xs text-center" style={{ color:'#8888A8' }}>Respondemos en menos de 24 horas hábiles. Solo empresas que ya operan y facturan activamente.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
