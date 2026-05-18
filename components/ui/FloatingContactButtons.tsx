'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X } from 'lucide-react'
import RomeChatWidget from './RomeChatWidget'

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.107.546 4.087 1.502 5.814L.057 23.215a.75.75 0 0 0 .916.916l5.401-1.445A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.655-.518-5.17-1.42l-.37-.214-3.83 1.025 1.025-3.83-.214-.37A9.937 9.937 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const

export default function FloatingContactButtons() {
  const [romeOpen, setRomeOpen] = useState(false)

  const waNumber  = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5200000000000'
  const waMessage = encodeURIComponent('Hola, vi ZYVO y me interesa conocer más sobre la auditoría de fricción para mi empresa.')
  const waUrl     = `https://wa.me/${waNumber}?text=${waMessage}`

  return (
    <>
      {/* Chat widget Rome */}
      <AnimatePresence>
        {romeOpen && <RomeChatWidget onClose={() => setRomeOpen(false)} />}
      </AnimatePresence>

      {/* Botones flotantes */}
      <div className="fixed bottom-5 right-4 md:right-6 z-99989 flex flex-col items-end gap-3">

        {/* Rome */}
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
                Habla con Rome IA
              </motion.span>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setRomeOpen(v => !v)}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-200"
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

        {/* WhatsApp */}
        <div className="relative flex items-center gap-3">
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.3, ease: EASE }}
            className="text-xs font-medium text-zyvo-white/50 bg-zyvo-dark/80 border border-white/8 px-3 py-1.5 rounded-full backdrop-blur-md whitespace-nowrap"
          >
            WhatsApp
          </motion.span>

          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              boxShadow: '0 8px 30px rgba(37,211,102,0.3)',
            }}
            aria-label="Contactar por WhatsApp"
          >
            <WhatsAppIcon />
          </motion.a>
        </div>
      </div>
    </>
  )
}
