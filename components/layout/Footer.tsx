import { Shield } from 'lucide-react'

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

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/zyvo_ai/',           Icon: InstagramIcon },
  { label: 'Facebook',  href: 'https://www.facebook.com/share/1Cqb4Qrti7/',   Icon: FacebookIcon },
  { label: 'TikTok',    href: 'https://tiktok.com/@zyvo.ai',    Icon: TikTokIcon },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/zyvo-ai', Icon: LinkedInIcon },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/6 bg-[#050810]">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">

        {/* Fila principal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-1">
            <span className="font-(family-name:--font-instrument-serif) text-lg text-zyvo-white/70">
              ZYVO
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-zyvo-gold/60 mb-1.5" />
          </div>

          {/* Filosofía */}
          <p className="text-zyvo-white/25 text-xs text-center">
            Infraestructura inteligente. Resultados medibles.
          </p>

          {/* Redes sociales */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
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

        {/* Fila inferior: uptime + copyright */}
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-zyvo-white/20 text-xs">Sistemas activos</span>
          </div>
          <span className="text-zyvo-white/10">·</span>
          <span className="text-zyvo-white/15 text-xs">© {year} ZYVO</span>
        </div>

        {/* Fila legal */}
        <div className="border-t border-white/4 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-zyvo-white/20 text-xs">
            <Shield size={12} className="text-zyvo-gold/40 shrink-0" />
            <span>
              Tratamiento de datos personales conforme a la{' '}
              <strong className="text-zyvo-white/35 font-medium">
                Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)
              </strong>
              {' '}y su Reglamento vigente.
            </span>
          </div>
          <p className="text-zyvo-white/15 text-xs shrink-0">
            México · IA Ética · Self-Hosted
          </p>
        </div>
      </div>
    </footer>
  )
}
