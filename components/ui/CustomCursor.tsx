'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [hidden,  setHidden]  = useState(true)
  const [isTouch, setIsTouch] = useState(false)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const cfg = { damping: 22, stiffness: 300, mass: 0.35 }
  const rx  = useSpring(mx, cfg)
  const ry  = useSpring(my, cfg)

  useEffect(() => {
    setIsTouch(!window.matchMedia('(hover: hover)').matches)
  }, [])

  useEffect(() => {
    if (isTouch) return
    const move = (e: MouseEvent) => {
      setHidden(false)
      mx.set(e.clientX - 20)
      my.set(e.clientY - 20)
    }
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a,button,[role="button"],.cursor-hover')
      setHovered(!!el)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [isTouch, mx, my])

  if (isTouch || hidden) return null

  const e = 'rgba(0,229,255,'
  const armLen = hovered ? 12 : 6
  const op     = hovered ? 1  : 0.65

  return (
    <motion.div
      style={{ x: rx, y: ry }}
      className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-99999"
      aria-hidden="true"
    >
      {/* Anillo exterior — aparece en hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.4 }}
        transition={{ duration: 0.18 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: '1px solid rgba(0,229,255,0.4)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(0,229,255,0.25)',
        }}
      />

      {/* Brazo izquierdo */}
      <motion.div
        animate={{ width: armLen, opacity: op }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute', top: '50%', right: '50%',
          marginRight: 4, height: 1,
          background: `${e}1)`,
          boxShadow: `0 0 5px ${e}0.7)`,
          transformOrigin: 'right center', transform: 'translateY(-50%)',
        }}
      />
      {/* Brazo derecho */}
      <motion.div
        animate={{ width: armLen, opacity: op }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          marginLeft: 4, height: 1,
          background: `${e}1)`,
          boxShadow: `0 0 5px ${e}0.7)`,
          transformOrigin: 'left center', transform: 'translateY(-50%)',
        }}
      />
      {/* Brazo arriba */}
      <motion.div
        animate={{ height: armLen, opacity: op }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute', left: '50%', bottom: '50%',
          marginBottom: 4, width: 1,
          background: `${e}1)`,
          boxShadow: `0 0 5px ${e}0.7)`,
          transformOrigin: 'bottom center', transform: 'translateX(-50%)',
        }}
      />
      {/* Brazo abajo */}
      <motion.div
        animate={{ height: armLen, opacity: op }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute', left: '50%', top: '50%',
          marginTop: 4, width: 1,
          background: `${e}1)`,
          boxShadow: `0 0 5px ${e}0.7)`,
          transformOrigin: 'top center', transform: 'translateX(-50%)',
        }}
      />
      {/* Punto central */}
      <motion.div
        animate={{ scale: hovered ? 2 : 1, opacity: hovered ? 1 : 0.9 }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 3, height: 3, borderRadius: '50%',
          background: '#00E5FF',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 6px #00E5FF, 0 0 14px rgba(0,229,255,0.5)',
        }}
      />
    </motion.div>
  )
}
