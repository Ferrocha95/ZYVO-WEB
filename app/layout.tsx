import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'
import LenisProvider    from '@/components/providers/LenisProvider'
import GrainOverlay     from '@/components/ui/GrainOverlay'
import GlobalBackground from '@/components/ui/GlobalBackground'
import TechGrid         from '@/components/ui/TechGrid'
import CookieBanner     from '@/components/ui/CookieBanner'
import SmoothScroll     from '@/components/SmoothScroll'
import RomeWidget       from '@/components/RomeWidget'
import { Toaster }      from 'sonner'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ZYVO — Arquitectura de Sistemas Inteligentes · México y LATAM',
  description: 'Diseñamos infraestructura operativa inteligente para empresas en México y LATAM. Empleados digitales, CRM inteligente, ERP agéntico y ZYVO Hub.',
  openGraph: {
    locale: 'es_MX',
    type: 'website',
    url: 'https://zyvo.com.mx',
    title: 'ZYVO — Arquitectura de Sistemas Inteligentes · México y LATAM',
    description: 'Diseñamos infraestructura operativa inteligente para empresas en México y LATAM. Empleados digitales, CRM inteligente, ERP agéntico y ZYVO Hub.',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://zyvo.com.mx' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full`}
    >
      <body className="min-h-full antialiased overflow-x-hidden">
        <SmoothScroll />
        <LenisProvider>
          <GlobalBackground />
          <TechGrid />
          <GrainOverlay />
          <main>{children}</main>
          <RomeWidget />
          <CookieBanner />
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: 'rgba(5,5,8,0.95)',
                border: '1px solid rgba(108,92,231,0.25)',
                color: '#F0F0FF',
              },
            }}
          />
        </LenisProvider>
      </body>
    </html>
  )
}
