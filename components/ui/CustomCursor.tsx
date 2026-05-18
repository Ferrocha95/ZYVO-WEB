'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false)
  const [hidden,  setHidden]  = useState(true)

  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)

  const cfg  = { damping: 28, stiffness: 380, mass: 0.4 }
  const cfgD = { damping: 48, stiffness: 600, mass: 0.3 }

  const rx = useSpring(mx, cfg)
  const ry = useSpring(my, cfg)
  const dx = useSpring(mx, cfgD)
  const dy = useSpring(my, cfgD)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setHidden(false)
      mx.set(e.clientX - 10)
      my.set(e.clientY - 10)
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

  return (
    <>
      {/* Anillo exterior */}
      <motion.div
        style={{ x: rx, y: ry }}
        animate={{
          scale: hovered ? 1.7 : 1,
          opacity: hovered ? 0.85 : 0.6,
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-5 h-5 rounded-full border border-zyvo-gold/60 pointer-events-none z-99998"
        aria-hidden="true"
      />
      {/* Punto central */}
      <motion.div
        style={{ x: dx, y: dy }}
        className="fixed top-0 left-0 w-5 h-5 flex items-center justify-center pointer-events-none z-99999"
        aria-hidden="true"
      >
        <motion.div
          animate={{ scale: hovered ? 1.5 : 1 }}
          transition={{ duration: 0.15 }}
          className="w-1 h-1 rounded-full bg-zyvo-gold"
        />
      </motion.div>
    </>
  )
}
