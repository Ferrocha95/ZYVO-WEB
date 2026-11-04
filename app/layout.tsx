import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'
import ThemeProvider           from '@/components/providers/ThemeProvider'
import Navbar                 from '@/components/layout/Navbar'
import Footer                 from '@/components/layout/Footer'
import LenisProvider          from '@/components/providers/LenisProvider'
import GrainOverlay           from '@/components/ui/GrainOverlay'
import GlobalBackground       from '@/components/ui/GlobalBackground'
import TechGrid               from '@/components/ui/TechGrid'
import FloatingContactButtons from '@/components/ui/FloatingContactButtons'
import CookieBanner           from '@/components/ui/CookieBanner'
import { Toaster }            from 'sonner'

// Títulos
const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

// Texto
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ZYVO — Crece sin perder el control',
  description:
    'ZYVO diseña e implementa sistemas inteligentes (agénticos) para que tu empresa crezca sin perder el control de su operación.',
  keywords: [
    'sistemas inteligentes',
    'agentes IA',
    'automatización empresarial',
    'operación bajo control',
    'consultoría IA',
    'PyMEs México',
  ],
  openGraph: {
    title: 'ZYVO — Crece sin perder el control',
    description:
      'Sistemas inteligentes para crecer sin perder el control de tu operación. Human in the loop, trazabilidad y roadmap por fases.',
    type: 'website',
    locale: 'es_MX',
    // TODO (fase SEO): agregar og:image (1200×630) en public/ y registrarla aquí
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZYVO — Crece sin perder el control',
    description:
      'Sistemas inteligentes para crecer sin perder el control de tu operación.',
    // TODO (fase SEO): agregar twitter:image
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://zyvo.com.mx' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full antialiased overflow-x-hidden">
        <ThemeProvider>
          <LenisProvider>
            <GlobalBackground />
            <TechGrid />
            <GrainOverlay />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <FloatingContactButtons />
            <CookieBanner />
            <Toaster
              position="bottom-right"
              theme="system"
              toastOptions={{
                style: {
                  background: 'var(--c-surface)',
                  border: '1px solid rgba(0,229,255,0.25)',
                  color: 'var(--c-text)',
                },
              }}
            />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
