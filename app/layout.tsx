import type { Metadata } from 'next'
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navbar                 from '@/components/layout/Navbar'
import Footer                 from '@/components/layout/Footer'
import LenisProvider          from '@/components/providers/LenisProvider'
import GrainOverlay           from '@/components/ui/GrainOverlay'
import CustomCursor           from '@/components/ui/CustomCursor'
import GlobalBackground       from '@/components/ui/GlobalBackground'
import TechGrid               from '@/components/ui/TechGrid'
import FloatingContactButtons from '@/components/ui/FloatingContactButtons'
import CookieBanner           from '@/components/ui/CookieBanner'
import { Toaster }            from 'sonner'

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ZYVO — Arquitectura de sistemas inteligentes para PyMEs',
  description:
    'Diseñamos sistemas de IA y automatización que eliminan la fuga operativa en PyMEs mexicanas. Menos trabajo manual, más control, mejores márgenes.',
  keywords: ['automatización empresarial', 'agentes IA', 'n8n', 'PyMEs México', 'ERP agéntico'],
  openGraph: {
    title: 'ZYVO — Arquitectura de sistemas inteligentes',
    description: 'Erradicamos la fuga operativa de tu empresa con sistemas inteligentes.',
    type: 'website',
    locale: 'es_MX',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://zyvo.ai' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full bg-zyvo-dark text-zyvo-white antialiased overflow-x-hidden">
        <LenisProvider>
          <GlobalBackground />
          <TechGrid />
          <GrainOverlay />
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingContactButtons />
          <CookieBanner />
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: 'rgba(8,12,20,0.95)',
                border: '1px solid rgba(0,170,255,0.25)',
                color: '#F5F5F5',
              },
            }}
          />
        </LenisProvider>
      </body>
    </html>
  )
}
