'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export default function RomeWidget() {
  const [visible,setVisible] = useState(false)
  const [tooltip,setTooltip] = useState(false)
  useEffect(()=>{ const t=setTimeout(()=>setVisible(true),2000); return ()=>clearTimeout(t) },[])
  const handleClick = () => {
    const el = document.querySelector('[data-rome-trigger]') as HTMLElement
    if(el){ el.click(); return }
    window.dispatchEvent(new CustomEvent('rome:open'))
  }
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ scale:0,opacity:0 }} animate={{ scale:1,opacity:1 }} transition={{ type:'spring',stiffness:260,damping:20 }} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          <AnimatePresence>
            {tooltip && (
              <motion.div initial={{ opacity:0,y:8,scale:0.9 }} animate={{ opacity:1,y:0,scale:1 }} exit={{ opacity:0,y:8,scale:0.9 }} transition={{ duration:0.2 }} className="glass-card px-4 py-3 text-sm max-w-[200px] text-right pointer-events-none" style={{ color:'#F0F0FF' }}>
                Hola, soy Rome. ¿En qué puedo ayudarte?
              </motion.div>
            )}
          </AnimatePresence>
          <button id="rome-widget-btn" onClick={handleClick} onMouseEnter={()=>setTooltip(true)} onMouseLeave={()=>setTooltip(false)} className="relative flex items-center justify-center text-2xl cursor-pointer" style={{ width:56,height:56,borderRadius:16,background:'linear-gradient(135deg,#6C5CE7,#A855F7)',boxShadow:'0 0 25px rgba(108,92,231,0.5)',border:'none',animation:'glow-pulse 3s ease-in-out infinite' }} aria-label="Hablar con Rome">
            🤖
            <div className="absolute" style={{ top:-4,right:-4,width:14,height:14,borderRadius:'50%',backgroundColor:'#00FF88',border:'2px solid #050508',animation:'pulse-dot 2s ease-in-out infinite' }}/>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
