'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Problema', href: '#problema' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Agentes', href: '#agentes' },
  { label: 'Proceso', href: '#proceso' },
]

function scrollTo(href: string) {
  const id = href.replace('#', '')
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-zyvo-dark/90 backdrop-blur-xl border-b border-white/6 py-4'
            : 'bg-transparent py-5',
        )}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-1"
          >
            <span className="font-(family-name:--font-instrument-serif) text-xl text-zyvo-white tracking-tight">
              ZYVO
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-zyvo-gold mb-2" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-zyvo-white/50 hover:text-zyvo-white transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA desktop */}
          <button
            onClick={() => scrollTo('#cta')}
            className="hidden md:flex items-center px-5 py-2.5 text-sm font-semibold bg-zyvo-gold text-zyvo-dark rounded-full hover:bg-[#E8C547] transition-colors duration-200"
          >
            Solicitar auditoría
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-zyvo-white/60 hover:text-zyvo-white transition-colors"
            onClick={() => setOpen(v => !v)}
            aria-label="Menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
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
                onClick={() => { scrollTo(link.href); setOpen(false) }}
                className="text-2xl font-medium text-zyvo-white/70 hover:text-zyvo-white transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { scrollTo('#cta'); setOpen(false) }}
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
