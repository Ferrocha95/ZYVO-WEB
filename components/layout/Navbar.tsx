'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '@/components/ui/ThemeToggle'

// Enlaces provisionales (placeholders Fase 1). Se ajustan cuando el usuario
// confirme los 4 definitivos.
const NAV = [
  { label: 'Sistemas',        href: '#sistemas' },
  { label: 'Cómo trabajamos', href: '#proceso' },
  { label: 'Control',         href: '#control' },
  { label: 'FAQ',             href: '#faq' },
]

const EASE = [0.25, 0.46, 0.45, 0.94] as const

function scrollTo(href: string) {
  document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const pathname = usePathname()
  const isHome   = pathname === '/'

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

  const Logo = (
    <span className="flex items-center gap-1">
      <span className="font-display font-semibold text-base text-ink tracking-tight whitespace-nowrap">
        ZYVO
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-cyan mb-1.5 shrink-0" />
    </span>
  )

  return (
    <>
      {/* ── Desktop pill ────────────────────────────────────────── */}
      <div className="hidden md:flex fixed top-5 inset-x-0 z-50 justify-center pointer-events-none">
        <motion.div
          layout
          transition={{ layout: { duration: 0.45, ease: EASE } }}
          className="relative flex items-center h-12 pointer-events-auto"
          style={{
            background: 'color-mix(in srgb, var(--c-surface) 85%, transparent)',
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
                {isHome ? (
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className="pl-5 pr-3 shrink-0"
                  >
                    {Logo}
                  </a>
                ) : (
                  <Link href="/" className="pl-5 pr-3 shrink-0">{Logo}</Link>
                )}

                <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />

                {/* Nav items */}
                <nav className="flex items-center px-1">
                  {NAV.map(link =>
                    isHome ? (
                      <button
                        key={link.href}
                        onClick={() => scrollTo(link.href)}
                        className="px-4 py-2 text-sm text-ink/55 hover:text-ink hover:bg-white/5 rounded-full transition-colors duration-200 whitespace-nowrap"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        key={link.href}
                        href={`/${link.href}`}
                        className="px-4 py-2 text-sm text-ink/55 hover:text-ink hover:bg-white/5 rounded-full transition-colors duration-200 whitespace-nowrap"
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </nav>

                <div className="w-px h-5 bg-white/10 mx-1 shrink-0" />

                {/* Theme toggle */}
                <div className="px-1 shrink-0">
                  <ThemeToggle />
                </div>

                {/* CTA */}
                {isHome ? (
                  <button
                    onClick={() => scrollTo('#contacto')}
                    className="flex items-center px-5 py-2 mx-2 text-sm shrink-0 whitespace-nowrap btn-primary"
                  >
                    ConsultorIA gratuita
                  </button>
                ) : (
                  <Link
                    href="/#contacto"
                    className="flex items-center px-5 py-2 mx-2 text-sm shrink-0 whitespace-nowrap btn-primary"
                  >
                    ConsultorIA gratuita
                  </Link>
                )}
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                onClick={() => setCollapsed(false)}
                className="w-12 h-12 flex items-center justify-center text-ink/70 hover:text-ink transition-colors"
                aria-label="Expandir navegación"
              >
                <Menu size={18} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Mobile header ────────────────────────────────────────── */}
      <header className="md:hidden fixed top-0 inset-x-0 z-50 bg-base/90 backdrop-blur-xl border-b border-white/6 py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {isHome ? (
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
              {Logo}
            </a>
          ) : (
            <Link href="/">{Logo}</Link>
          )}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 text-ink/60 hover:text-ink transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menú"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
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
            className="fixed inset-0 z-40 bg-base/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV.map(link =>
              isHome ? (
                <button
                  key={link.href}
                  onClick={() => { scrollTo(link.href); setMobileOpen(false) }}
                  className="text-2xl font-medium text-ink/70 hover:text-ink transition-colors"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={`/${link.href}`}
                  onClick={() => setMobileOpen(false)}
                  className="text-2xl font-medium text-ink/70 hover:text-ink transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
            {isHome ? (
              <button
                onClick={() => { scrollTo('#contacto'); setMobileOpen(false) }}
                className="mt-4 px-8 py-3.5 btn-primary"
              >
                ConsultorIA gratuita
              </button>
            ) : (
              <Link
                href="/#contacto"
                onClick={() => setMobileOpen(false)}
                className="mt-4 px-8 py-3.5 btn-primary"
              >
                ConsultorIA gratuita
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
