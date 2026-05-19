'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X } from 'lucide-react'
import RomeChatWidget from './RomeChatWidget'

export default function FloatingContactButtons() {
  const [romeOpen, setRomeOpen] = useState(false)

  return (
    <>
      <AnimatePresence>
        {romeOpen && <RomeChatWidget onClose={() => setRomeOpen(false)} />}
      </AnimatePresence>

      <div className="fixed bottom-5 right-4 md:right-6 z-99989 flex flex-col items-end gap-3">
        <div className="relative flex items-center gap-3">
          <AnimatePresence>
            {!romeOpen && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25 }}
                className="text-xs font-medium text-zyvo-white/50 bg-zyvo-dark/80 border border-white/8 px-3 py-1.5 rounded-full backdrop-blur-md whitespace-nowrap"
              >
                Rome IA
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setRomeOpen(v => !v)}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-200"
            style={{
              background: romeOpen
                ? 'rgba(212,175,55,0.15)'
                : 'linear-gradient(135deg, rgba(212,175,55,0.9), rgba(180,145,25,0.9))',
              border: '1px solid rgba(212,175,55,0.4)',
              backdropFilter: 'blur(12px)',
              boxShadow: romeOpen
                ? '0 8px 30px rgba(212,175,55,0.15)'
                : '0 8px 30px rgba(212,175,55,0.35)',
            }}
            aria-label={romeOpen ? 'Cerrar Rome' : 'Abrir Rome IA'}
          >
            {!romeOpen && (
              <span className="absolute inset-0 rounded-full animate-ping bg-zyvo-gold/20 pointer-events-none" />
            )}
            <AnimatePresence mode="wait">
              {romeOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X size={20} style={{ color: '#D4AF37' }} />
                </motion.span>
              ) : (
                <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Bot size={20} style={{ color: '#080C14' }} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </>
  )
}
