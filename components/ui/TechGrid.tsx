'use client'

import { motion } from 'framer-motion'

export default function TechGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.07 }}
      aria-hidden="true"
    >
      {/* Patrón de grilla CSS */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,170,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(0,170,255,0.10) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Scan line horizontal */}
      <motion.div
        animate={{ y: ['-2%', '102%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear', repeatDelay: 6 }}
        className="absolute inset-x-0 h-[2px] bg-linear-to-r from-transparent via-zyvo-gold/50 to-transparent"
      />

      {/* Scan line vertical */}
      <motion.div
        animate={{ x: ['-2%', '102%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear', repeatDelay: 8, delay: 3 }}
        className="absolute inset-y-0 w-[2px] bg-linear-to-b from-transparent via-zyvo-gold/35 to-transparent"
      />
    </div>
  )
}
