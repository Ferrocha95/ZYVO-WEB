'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV = [
  { label: 'Servicios',   href: '#servicios' },
  { label: 'Agentes',     href: '#agentes' },
  { label: 'Proceso',     href: '#proceso' },
  { label: 'Calculadora', href: '#calculadora' },
]

const EASE = [0.25, 0.46, 0.45, 0.94] as const

function scrollTo(href: string) {
  document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [collapsed, setCollapsed]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const collapseAtY = useRef(0)

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY
      if (!collapsed && y > 150) {
        setCollapsed(true)
        collapseAtY.current = y
      } else if (collapsed && y < collapseAtY.current - 80) {
        setCollapsed(false)
      }
    }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [collapsed])

  return (
    <>
      {/* ── Desktop pill ────────────────────────────────────────── */}
      <div className="hidden md:flex fixed top-5 inset-x-0 z-50 justify-center pointer-events-none">
        <motion.div
          layout
          transition={{ layout: { duration: 0.45, ease: EASE } }}
          className="relative flex items-center h-12 pointer-events-auto"
          style={{
            background: 'rgba(8,12,20,0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '9999px',
            overflow: 'hidden',
          }}
        >
          <AnimatePresence mode="popLayout">
            {!collapsed ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="flex items-center"
              >
                {/* Logo */}
                <a
                  href="#"
                  onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="flex items-center gap-1 pl-5 pr-3 shrink-0"
                >
                  <span className="font-(family-name:--font-instrument-serif) text-base text-zyvo-white tracking-tight whitespace-nowrap">
                    ZYVO
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zyvo-gold mb-1.5 shrink-0" />
                </a>

                <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />

                {/* Nav items */}
                <nav className="flex items-center px-1">
                  {NAV.map(link => (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      className="px-4 py-2 text-sm text-zyvo-white/55 hover:text-zyvo-white hover:bg-white/5 rounded-full transition-colors duration-200 whitespace-nowrap"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>

                {/* CTA */}
                <button
                  onClick={() => scrollTo('#cta')}
                  className="flex items-center px-5 py-2 mx-2 text-sm font-semibold bg-zyvo-gold text-zyvo-dark rounded-full hover:bg-[#E8C547] transition-colors duration-200 shrink-0 whitespace-nowrap"
                >
                  Auditoría →
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                onClick={() => setCollapsed(false)}
                className="w-12 h-12 flex items-center justify-center text-zyvo-white/70 hover:text-zyvo-white transition-colors"
                aria-label="Expandir navegación"
              >
                <Menu size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Mobile header ────────────────────────────────────────── */}
      <header className="md:hidden fixed top-0 inset-x-0 z-50 bg-zyvo-dark/90 backdrop-blur-xl border-b border-white/6 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-1"
          >
            <span className="font-(family-name:--font-instrument-serif) text-xl text-zyvo-white tracking-tight">ZYVO</span>
            <span className="w-1.5 h-1.5 rounded-full bg-zyvo-gold mb-2" />
          </a>
          <button
            className="p-2 text-zyvo-white/60 hover:text-zyvo-white transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menú"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* ── Mobile fullscreen menu ───────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-zyvo-dark/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV.map(link => (
              <button
                key={link.href}
                onClick={() => { scrollTo(link.href); setMobileOpen(false) }}
                className="text-2xl font-medium text-zyvo-white/70 hover:text-zyvo-white transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { scrollTo('#cta'); setMobileOpen(false) }}
              className="mt-4 px-8 py-3.5 bg-zyvo-gold text-zyvo-dark font-semibold rounded-full"
            >
              Solicitar auditoría
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
