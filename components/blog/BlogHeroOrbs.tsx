'use client'

import { motion } from 'framer-motion'

export default function BlogHeroOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 left-1/4 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,170,255,0.18) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
      />
      <motion.div
        animate={{ y: [0, 16, 0], opacity: [0.05, 0.10, 0.05] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-40 right-1/4 w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  )
}
