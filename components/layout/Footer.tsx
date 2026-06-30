'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Shield } from 'lucide-react'

const EASE = [0.25, 0.46, 0.45, 0.94] as const

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

const LINK_SECTIONS = [
  {
    title: 'Soluciones',
    links: [
      { label: 'ZYVO Hub',          href: '#servicios',   external: false },
      { label: 'CRM Inteligente',   href: '#servicios',   external: false },
      { label: 'ERP Agéntico',      href: '#servicios',   external: false },
      { label: 'Calculadora',       href: '#calculadora', external: false },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Auditoría de Fricción', href: '/auditoria', external: false },
      { label: 'Privacidad',            href: '/privacidad',         external: false },
      { label: 'LFPDPPP',              href: '/privacidad#lfpdppp', external: false },
    ],
  },
  {
    title: 'Redes Sociales',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/zyvo_ai/',         external: true },
      { label: 'Facebook',  href: 'https://www.facebook.com/share/1Cqb4Qrti7/', external: true },
      { label: 'TikTok',    href: 'https://tiktok.com/@zyvo.ai',               external: true },
      { label: 'LinkedIn',  href: 'https://linkedin.com/company/zyvo-ai',      external: true },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'direccion@zyvo.com.mx', href: 'mailto:direccion@zyvo.com.mx', external: true },
      { label: 'WhatsApp',         href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''}`, external: true },
      { label: 'Documentación',    href: '#',                       external: false },
    ],
  },
]

function AnimatedSection({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 14, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

const SOCIAL_ICONS = [
  { label: 'Instagram', href: 'https://www.instagram.com/zyvo_ai/',         Icon: InstagramIcon },
  { label: 'Facebook',  href: 'https://www.facebook.com/share/1Cqb4Qrti7/', Icon: FacebookIcon },
  { label: 'TikTok',    href: 'https://tiktok.com/@zyvo.ai',               Icon: TikTokIcon },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/zyvo-ai',      Icon: LinkedInIcon },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/6 bg-[#050810]">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 xl:gap-16 mb-12">

          {/* Col 1 — Brand */}
          <AnimatedSection delay={0}>
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                <span className="font-(family-name:--font-instrument-serif) text-xl text-zyvo-white tracking-tight">
                  ZYVO
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zyvo-gold/70 mb-1.5" />
              </div>
              <p className="text-zyvo-white/35 text-sm leading-relaxed max-w-xs">
                Infraestructura inteligente. Resultados medibles.
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-zyvo-white/20 text-xs">Sistemas activos</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                {SOCIAL_ICONS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full border border-white/8 flex items-center justify-center text-zyvo-white/30 hover:text-zyvo-gold hover:border-zyvo-gold/30 transition-colors duration-200"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Cols 2-3 — Link sections */}
          <div className="xl:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {LINK_SECTIONS.map((section, i) => (
              <AnimatedSection key={section.title} delay={0.06 + i * 0.07}>
                <div className="space-y-4">
                  <h3 className="text-zyvo-white/60 text-xs font-semibold uppercase tracking-widest">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map(link => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="text-sm text-zyvo-white/40 hover:text-zyvo-white/70 transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/4 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zyvo-white/20 text-xs">
            <Shield size={12} className="text-zyvo-gold/40 shrink-0" />
            <span>
              Datos personales protegidos conforme a la{' '}
              <strong className="text-zyvo-white/35 font-medium">LFPDPPP</strong>
              {' '}y su Reglamento vigente.
            </span>
          </div>
          <p className="text-zyvo-white/15 text-xs shrink-0">
            © {year} ZYVO · México · IA Ética · Self-Hosted
          </p>
        </div>

      </div>
    </footer>
  )
}
