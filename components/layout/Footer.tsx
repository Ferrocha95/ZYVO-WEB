import Link from 'next/link'

const WHATSAPP = 'https://wa.me/527291216435'
const EMAIL = 'direccion@zyvo.com.mx'

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/zyvo_ai/',         Icon: InstagramIcon },
  { label: 'Facebook',  href: 'https://www.facebook.com/share/1Cqb4Qrti7/', Icon: FacebookIcon },
  { label: 'TikTok',    href: 'https://tiktok.com/@zyvo.ai',               Icon: TikTokIcon },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/zyvo-ai',      Icon: LinkedInIcon },
]

const COLS = [
  {
    title: 'Navegación',
    links: [
      { label: 'Sistemas',        href: '/#sistemas' },
      { label: 'Cómo trabajamos', href: '/#proceso' },
      { label: 'Control',         href: '/#control' },
      { label: 'FAQ',             href: '/#faq' },
    ],
  },
  {
    title: 'Explora',
    links: [
      { label: 'ConsultorIA', href: '/#contacto' },
      { label: 'Auditoría',   href: '/auditoria' },
      { label: 'Blog',        href: '/blog' },
      { label: 'Partners',    href: '/partners' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: EMAIL,     href: `mailto:${EMAIL}`, external: true },
      { label: 'WhatsApp', href: WHATSAPP,          external: true },
      { label: 'Privacidad', href: '/privacidad' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/8 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2fr] gap-12 mb-12">
          {/* Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="font-display font-semibold text-xl text-ink tracking-tight">ZYVO</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan mb-1.5" />
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">Crece sin perder el control.</p>
            <div className="flex items-center gap-2 pt-1">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-cyan hover:border-cyan/40 transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Columnas de enlaces */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {COLS.map(col => (
              <div key={col.title} className="space-y-4">
                <h3 className="text-ink/70 text-xs font-semibold uppercase tracking-widest">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link.label}>
                      {'external' in link && link.external ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-ink transition-colors">
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-sm text-muted hover:text-ink transition-colors">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted text-xs">
            Datos personales protegidos conforme a la{' '}
            <Link href="/privacidad" className="text-ink/60 hover:text-ink">LFPDPPP</Link>.
          </p>
          <p className="text-muted text-xs">© {year} ZYVO · México</p>
        </div>
      </div>
    </footer>
  )
}
