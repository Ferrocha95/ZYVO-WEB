'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

type Consent = 'accepted' | 'rejected' | 'custom'

type Prefs = {
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'zyvo-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible]       = useState(false)
  const [configOpen, setConfigOpen] = useState(false)
  const [prefs, setPrefs]           = useState<Prefs>({ analytics: true, marketing: false })

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  const save = (consent: Consent) => {
    localStorage.setItem(STORAGE_KEY, consent)
    setVisible(false)
    setConfigOpen(false)
  }

  const acceptAll  = () => { setPrefs({ analytics: true, marketing: true }); save('accepted') }
  const rejectAll  = () => { setPrefs({ analytics: false, marketing: false }); save('rejected') }
  const saveCustom = () => save('custom')

  const toggle = (key: keyof Prefs) =>
    setPrefs(p => ({ ...p, [key]: !p[key] }))

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="fixed bottom-0 inset-x-0 z-99998 px-4 pb-4 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto pointer-events-auto">
            {/* Panel de configuración */}
            <AnimatePresence>
              {configOpen && (
                <motion.div
                  key="config-panel"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="mb-2 rounded-2xl border border-white/8 bg-[#080C14]/95 backdrop-blur-xl px-5 py-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-zyvo-white/70 text-sm font-medium">Configurar preferencias</p>
                    <button
                      onClick={() => setConfigOpen(false)}
                      className="text-zyvo-white/30 hover:text-zyvo-white/70 transition-colors"
                      aria-label="Cerrar configuración"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="space-y-3 mb-4">
                    <CookieToggle
                      label="Esenciales"
                      description="Necesarias para el funcionamiento del sitio."
                      checked
                      disabled
                    />
                    <CookieToggle
                      label="Analíticas"
                      description="Nos ayudan a entender cómo se usa el sitio."
                      checked={prefs.analytics}
                      onChange={() => toggle('analytics')}
                    />
                    <CookieToggle
                      label="Marketing"
                      description="Para mostrarte contenido relevante."
                      checked={prefs.marketing}
                      onChange={() => toggle('marketing')}
                    />
                  </div>
                  <button
                    onClick={saveCustom}
                    className="w-full py-2 rounded-xl border border-zyvo-gold/30 text-zyvo-gold text-xs font-medium hover:bg-zyvo-gold/8 transition-colors"
                  >
                    Guardar preferencias
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Banner principal */}
            <div className="rounded-2xl border border-white/8 bg-[#080C14]/95 backdrop-blur-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <Cookie size={18} className="text-zyvo-gold/60 shrink-0 mt-0.5" />
                <div>
                  <p className="text-zyvo-white/80 text-sm font-medium">Usamos cookies</p>
                  <p className="text-zyvo-white/40 text-xs mt-0.5 leading-relaxed">
                    Para mejorar tu experiencia y analizar el uso del sitio. Consulta nuestro{' '}
                    <a href="/privacidad" className="text-zyvo-gold/70 hover:text-zyvo-gold underline-offset-2 hover:underline transition-colors">
                      aviso de privacidad
                    </a>.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 rounded-xl border border-white/10 text-zyvo-white/50 text-xs hover:border-white/25 hover:text-zyvo-white/70 transition-colors"
                >
                  Rechazar
                </button>
                <button
                  onClick={() => setConfigOpen(v => !v)}
                  className="px-4 py-2 rounded-xl border border-white/10 text-zyvo-white/50 text-xs hover:border-white/25 hover:text-zyvo-white/70 transition-colors"
                >
                  Configurar
                </button>
                <button
                  onClick={acceptAll}
                  className="btn-glow-nav px-4 py-2 text-xs"
                >
                  Aceptar todo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CookieToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange?: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-zyvo-white/70 text-xs font-medium">{label}</p>
        <p className="text-zyvo-white/35 text-xs">{description}</p>
      </div>
      <button
        onClick={!disabled ? onChange : undefined}
        disabled={disabled}
        aria-pressed={checked}
        className={`relative flex-shrink-0 w-9 h-5 rounded-full border transition-colors duration-200 ${
          checked
            ? 'bg-zyvo-gold/20 border-zyvo-gold/40'
            : 'bg-transparent border-white/15'
        } ${disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all duration-200 ${
            checked ? 'bg-zyvo-gold translate-x-4' : 'bg-white/30 translate-x-0'
          }`}
        />
      </button>
    </div>
  )
}
