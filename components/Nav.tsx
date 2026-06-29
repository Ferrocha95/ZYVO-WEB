'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const links = [
  { label:'Productos', href:'#productos' },
  { label:'Empleados Digitales', href:'#empleados' },
  { label:'Proceso', href:'#proceso' },
  { label:'Calculadora', href:'#calculadora' },
  { label:'Partners', href:'/partners' },
  { label:'Blog', href:'/blog' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const triggerRome = () => document.getElementById('rome-widget-btn')?.click()
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{ backgroundColor: scrolled ? 'rgba(5,5,8,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(108,92,231,0.1)' : 'none' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" style={{ height: 72 }}>
          <Link href="/" className="gradient-text font-bold text-2xl" style={{ fontFamily:'Space Grotesk,sans-serif', letterSpacing:'-0.02em' }}>ZYVO</Link>
          <div className="hidden lg:flex items-center gap-10">
            {links.map(l => <a key={l.label} href={l.href} className="text-sm transition-colors duration-200" style={{ color:'#8888A8', fontFamily:'Inter,sans-serif', fontWeight: 500, letterSpacing:'0.01em' }} onMouseEnter={e=>(e.currentTarget.style.color='#F0F0FF')} onMouseLeave={e=>(e.currentTarget.style.color='#8888A8')}>{l.label}</a>)}
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <button className="btn-ghost" style={{ padding:'8px 20px', fontSize:'14px' }} onClick={triggerRome}>Hablar con Rome</button>
            <a href="#auditoria" className="btn-primary" style={{ padding:'8px 20px', fontSize:'14px' }}>Agendar Auditoría</a>
          </div>
          <button className="lg:hidden p-2 flex flex-col gap-1.5" onClick={()=>setOpen(!open)}>
            <motion.span animate={{ rotate:open?45:0, y:open?8:0 }} className="block w-6 h-0.5 bg-white origin-center"/>
            <motion.span animate={{ opacity:open?0:1 }} className="block w-6 h-0.5 bg-white"/>
            <motion.span animate={{ rotate:open?-45:0, y:open?-8:0 }} className="block w-6 h-0.5 bg-white origin-center"/>
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ x:'100%' }} animate={{ x:0 }} exit={{ x:'100%' }} transition={{ type:'spring', stiffness:300, damping:30 }} className="fixed inset-y-0 right-0 z-40 w-72 flex flex-col gap-6 p-8 pt-24" style={{ backgroundColor:'#0D0D14', borderLeft:'1px solid rgba(108,92,231,0.2)' }}>
            {links.map(l => <a key={l.label} href={l.href} onClick={()=>setOpen(false)} className="text-lg font-medium" style={{ color:'#F0F0FF', fontFamily:'Space Grotesk,sans-serif' }}>{l.label}</a>)}
            <div className="flex flex-col gap-3 mt-4">
              <a href="#auditoria" onClick={()=>setOpen(false)} className="btn-primary text-center">Agendar Auditoría</a>
              <button className="btn-ghost" onClick={()=>{setOpen(false);triggerRome()}}>Hablar con Rome</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
