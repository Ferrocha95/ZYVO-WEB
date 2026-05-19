'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [hidden,  setHidden]  = useState(true)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const cfg = { damping: 22, stiffness: 280, mass: 0.4 }

  const rx = useSpring(mx, cfg)
  const ry = useSpring(my, cfg)

  useEffect(() => {
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
  }, [mx, my])

  if (hidden) return null

  const armLen = hovered ? 10 : 7
  const opacity = hovered ? 1 : 0.7
  const gold = 'rgba(212,175,55,'

  return (
    <motion.div
      style={{ x: rx, y: ry }}
      className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-99999"
      aria-hidden="true"
    >
      {/* línea horizontal izquierda */}
      <motion.div
        animate={{ width: armLen, opacity }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute',
          top: '50%',
          right: '50%',
          marginRight: 3,
          height: 1,
          background: `${gold}0.9)`,
          transformOrigin: 'right center',
          transform: 'translateY(-50%)',
        }}
      />
      {/* línea horizontal derecha */}
      <motion.div
        animate={{ width: armLen, opacity }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: 3,
          height: 1,
          background: `${gold}0.9)`,
          transformOrigin: 'left center',
          transform: 'translateY(-50%)',
        }}
      />
      {/* línea vertical arriba */}
      <motion.div
        animate={{ height: armLen, opacity }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '50%',
          marginBottom: 3,
          width: 1,
          background: `${gold}0.9)`,
          transformOrigin: 'bottom center',
          transform: 'translateX(-50%)',
        }}
      />
      {/* línea vertical abajo */}
      <motion.div
        animate={{ height: armLen, opacity }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          marginTop: 3,
          width: 1,
          background: `${gold}0.9)`,
          transformOrigin: 'top center',
          transform: 'translateX(-50%)',
        }}
      />
      {/* punto central */}
      <motion.div
        animate={{ scale: hovered ? 1.6 : 1, opacity: hovered ? 1 : 0.85 }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 3,
          height: 3,
          borderRadius: '50%',
          background: '#D4AF37',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 6px rgba(212,175,55,0.8)',
        }}
      />
    </motion.div>
  )
}
